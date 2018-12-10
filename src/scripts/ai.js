
export function makeOpponentMove(app) {
  /**
   * Stands at 17
   * - only if userTotal < 17
   * 
   * Will use hand cards to:
   * - beat or tie user total when user standing
   * - reach >= 17, and STAND, when user not standing
   * -- only if CPU has 1 or more wins?
   * 
   * When holding minus cards, largest minus value is subtracted from 
   * total when calculating whether to use a hand card:
   * 
   * When total <= 14, is willing to draw rather than use a hand card
   * When total > 14, would rather use a hand card to reach 17+ than draw
   * 
   * Always receives new card at beginning of turn, so deals with that new information first!
   * 
   * 
   * 
   */
  setTimeout(() => {
    let extraDelay = 150;
    /**
     * Done whether user is standing or not
     * 
     * Establishes highestMinusValue and safeToDraw
     */

    let highestMinusValue = 0;
    let safeToDraw = true;

    for (let i = 0; i < app.state.opponentHand.length; i++) {
      let card = app.state.opponentHand[i];
      console.log(`checking hand card ${i}: #card-${card.id} ${card.value} ${card.type}`);
      if (card.type === '-' || card.type === '±') {
        if (Math.abs(card.value) > highestMinusValue) {
          highestMinusValue = Math.abs(card.value);
        }
      }
    }
    console.log('highest value minus card is', highestMinusValue);

    // decide if it's safe to draw, with the minus card in mind
    if ((app.state.opponentTotal - highestMinusValue) <= 14) {
      // safe to draw!
      safeToDraw = true;
      console.warn(`CPU decided it's safe to draw at total ${app.state.opponentTotal}, with minus potential of ${highestMinusValue}`);
    } else {
      safeToDraw = false;
      console.warn(`CPU decided it's UNSAFE to draw at total ${app.state.opponentTotal}, with minus potential of ${highestMinusValue}`);
    }

    /**
     * 
     */

    if (app.state.turnStatus.user.standing) {

      // USER STANDING
      console.warn('Player stood! Beginning CPU standoff sequence...........................................................');

      if (app.state.opponentTotal <= 20 && app.state.opponentTotal > app.state.userTotal) {
        console.warn('CPU already beats userTotal at beginning of turn!');
        console.error('CPU STAND');
        setTimeout(() => {
          app.determineWinnerFromTotal();
        }, (app.state.options.turnInterval * 2));
        return;
      }

      // see if a card can beat or tie user total

      if (app.state.opponentTotal < 20) {
        let newTotal;
        let addedValueTally = 0;
        console.warn('opponentTotal < 20');
        let dealInterval = app.state.options.turnInterval * 2;
        console.warn('Seeing if a hand card can beat userTotal');
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          let card = app.state.opponentHand[i];
          if (app.state.opponentHand[i].type === '+') {
            let potentialScore = app.state.opponentTotal + card.value;
            if (potentialScore >= app.state.userTotal && potentialScore <= 20 && !app.state.turnStatus.opponent.playedCards) {
              app.playHandCard('opponent', { id: card.id, value: card.value, type: card.type });
              console.warn(`PLAYING #card-${card.id} (${card.value} ${card.type}) for winning total ${potentialScore}!`);
              newTotal = potentialScore;
              break;
            } else {
              console.warn(`index ${i} #card-${card.id} value ${card.value} NO GOOD; potentialScore ${potentialScore} TOO LOW`);
            }
          } else {
            console.warn(`index ${i} #card-${card.id} is type ${card.type} and can't help!`);
          }
        }
        if (newTotal) {
          console.warn(`CPU played a card to get total to ${newTotal}, beating or tieing ${app.state.userTotal}`);
        } else {
          console.warn('CPU failed to find a useful card. Must draw instead.');
          // draw until total beats or ties user
          let openSlots = 9 - (app.state.opponentGrid.length);
          console.warn(`CPU open slots ${openSlots}, trying that many times max to draw`);
          for (let i = 0; i < openSlots; i++) {
            console.log('pre-setTimeout, total is', app.state.opponentTotal);
            extraDelay = i * 500;
            console.warn(`drawing card ${i} with delay ${(i * 500)}`);
            console.warn(`Right before dealing opponentTotal is ${app.state.opponentTotal}`);
            let newCardValue = app.dealToPlayerGrid('opponent', extraDelay);
            addedValueTally += newCardValue;
            console.log(`increasing addedValueTally to ${addedValueTally}`);
            console.error('CPU DRAW CARD');
            console.warn(`Right after dealing opponentTotal+newCardValue is ${app.state.opponentTotal + addedValueTally}`);
            newTotal = app.state.opponentTotal + addedValueTally;
            if ((app.state.opponentTotal + addedValueTally) >= app.state.userTotal) {
              console.error(`REACHED APPROPRIATE TOTAL! Set newTotal to ${newTotal} and breaking`);
              break;
            }
          }
          newTotal = app.state.opponentTotal + addedValueTally;
        }

        console.warn(`Done drawing cards. newTotal is ${newTotal}`);
        
        if (newTotal > 20) {
          console.warn('BROKE 20!! Must see if hand cards can reduce total!');

          // CHECK HAND MINUSES
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            if (app.state.opponentHand[i].type === '-') {
              let potentialScore = newTotal + card.value;
              if (potentialScore <= 20 && potentialScore >= app.state.userTotal) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type }, app.state.options.dealInterval);
                console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore} (under 20 and beats/ties ${app.state.userTotal}), so CPU is playing it!`);
                if (potentialScore >= 17) {
                  standCPU(app);
                }
                break;
              } else {
                console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too high!`);
              }
            } else {
              console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          ///////////////////
          console.warn('Afer hand check for minuses, total is', app.state.opponentTotal);
        } else if (newTotal < 20){
          console.warn('Didn\'t break 20. No need to check hand cards for minuses.');
        } else {
          console.warn('Reached EXACTLY 20!');
        }
        
        // compare scores and declare a winner
        console.warn(`Determining winner with delay ${dealInterval + extraDelay}`);
        setTimeout(() => {
          app.determineWinnerFromTotal();
        }, (dealInterval + extraDelay));
        return;
      } else if (app.state.opponentTotal > 20) {
        console.warn('CPU total > 20 when user standing');
        let newTotal;
        // see if minus cards can get total below 20
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          if (app.state.opponentHand[i].type === '-') {
            let card = app.state.opponentHand[i];
            let potentialScore = app.state.opponentTotal + card.value;
            if (potentialScore <= 20) {
              let cardToPlay = card;
              app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
              newTotal = potentialScore;
            }
          }
        }

        console.warn(`CPU played a card to get total to ${newTotal}`);

        if (newTotal < app.state.userTotal) {
          console.warn('Under 20, but still too low to win! Draw a card?');

          app.dealToPlayerGrid('opponent');
          console.error('CPU DRAW CARD');
          console.warn(`After dealing but before a delay, opponentTotal is ${app.state.opponentTotal}`);

          setTimeout(() => {
            console.warn(`After a delay, opponentTotal is ${app.state.opponentTotal}`);
          }, app.state.options.dealInterval);
        } else {
          console.warn('That was enough to win! Ending turn.');
        }

        setTimeout(() => {
          app.determineWinnerFromTotal();
        }, (app.state.options.turnInterval * 2));
        return;
      } else {
        // is 20
        console.error('CPU STANDING at exactly 20!');
        standCPU(app);

      }
      // ...then, if did not reach a stand state, End Turn
      app.changeTurn('user');
    } else {

      // USER STILL IN PLAY

      if ((app.state.opponentTotal >= 17 && app.state.opponentTotal >= app.state.userTotal) && app.state.opponentTotal < 20) {
        standCPU(app);
        console.error('CPU immediately STANDS after initial draw!');
      } else if (app.state.opponentTotal < 20) {

        // UNDER 20

        let scoreMinimum = 17;
        if (!safeToDraw) {

          // CHECK HAND PLUSES
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            if (app.state.opponentHand[i].type === '+') {
              let potentialScore = app.state.opponentTotal + card.value;
              if (!app.state.turnStatus.opponent.playedCards && potentialScore >= scoreMinimum && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                standCPU(app);
                console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it and STANDING!`);
                console.error('CPU STANDS after playing a hand card!');
                break;
              } else {
                console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
              }
            } else if (card) {
              console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          ///////////////////

        } else {
          console.warn(`CPU total ${app.state.opponentTotal} low enough that it's safe to end turn and draw, rather than use a hand card.`);
        }
      } else if (app.state.opponentTotal > 20) {

        // OVER 20

        // CHECK HAND MINUSES
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          let card = app.state.opponentHand[i];
          if (app.state.opponentHand[i].type === '-') {
            let potentialScore = app.state.opponentTotal + card.value;
            if (potentialScore <= 20) {
              let cardToPlay = card;
              app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
              console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it!`);
              if (potentialScore >= 17) {
                standCPU(app);
              }
              break;
            } else {
              console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too high!`);
            }
          } else {
            console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
          }
        }
        ///////////////////

      } else {
        // is 20
        console.error('TOTAL IS EXACTLY 20! Standing.');
        standCPU(app);
      }
      console.error('CPU TURN OVER');
      //must delay or app.state.opponentTotal is wrong in changeTurn()!
      console.error(`Switching turns with delay ${extraDelay}`);
      setTimeout(() => {
        app.changeTurn('user');
      }, 150 + extraDelay);
    }
  }, app.state.options.opponentMoveInterval);
}

function standCPU(app) {
  let turnStatusCopy = Object.assign({}, app.state.turnStatus);
  turnStatusCopy.opponent.standing = true;
  app.setState({
    turnStatus: turnStatusCopy
  });
}