import { randomInt } from './util';
const plusMinusSymbol = '±';
export function makeOpponentMove(app) {

  /**
   * WORKING:
   * user stands, ai draws until over 20
   * 
   * 
   * 
   * 
   * 
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
   * When total-largestMinusValue <= 14, is willing to draw rather than use a hand card
   * When total-largestMinusValue > 14, would rather use a hand card to reach 17+ than draw
   * 
   * Always receives new card at beginning of turn, so deals with that new information first!
   * 
   * 
   * 
   */

  setTimeout(() => {
    let stood = false;
    let newTotal;
    let extraDelay = 0;
    /**
     * Done whether user is standing or not
     * 
     * Establishes highestMinusValue and safeToDraw
     */
    let highestMinusValue = 0;
    let safeToDraw = true;
    let acceptTie = randomInt(0, 10) < app.characters[app.state.CPUOpponent].strategy.tie.chanceToBreak;
    let standAt = app.characters[app.state.CPUOpponent].strategy.stand.standAt;
    // console.warn(`acceptTie: ${acceptTie}, standAt: ${standAt}`);
    for (let i = 0; i < app.state.opponentHand.length; i++) {
      let card = app.state.opponentHand[i];
      // console.log(`checking hand card ${i}: #card-${card.id} ${card.value} ${card.type}`);
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

      // USER STANDING ///////////////////////////////////////////////////////////////////////////////////////////////////

      console.warn('Player stood! Beginning CPU standoff sequence........ totals', app.state.userTotal, app.state.opponentTotal);

      if (app.state.userTotal > 20 || app.state.userTotal < app.state.opponentTotal) {
        // cpu already wins, just needs to stand
        if (app.state.userTotal > 20) {
          console.warn('userTotal > 20!')
        } else if (app.state.userTotal < app.state.opponentTotal) {
          console.warn('app.state.userTotal < app.state.opponentTotal')
        }
        console.error('CPU STAND');
        standCPU(app);
        stood = true;
      } else if (app.state.opponentTotal < 20) {
        // see if a card can beat or tie user total

       
        let addedValueTally = 0;
        console.warn('opponentTotal < 20');
        let dealInterval = app.state.options.turnInterval * 2;
        console.warn('Seeing if a hand card can beat userTotal');
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          let card = app.state.opponentHand[i];
          let totalComparison;
          if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
            let potentialScore = app.state.opponentTotal + card.value;
            if (acceptTie) {
              totalComparison = potentialScore >= app.state.userTotal;
            } else {
              totalComparison = potentialScore > app.state.userTotal;
            }
            if (totalComparison && potentialScore <= 20 && !app.state.turnStatus.opponent.playedCard) {
              app.playHandCard('opponent', { id: card.id, value: card.value, type: card.type });
              app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
              extraDelay += app.state.options.moveIndicatorTime;
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
            app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
            extraDelay += app.state.options.moveIndicatorTime;
            let newCardValue = app.dealToPlayerGrid('opponent', extraDelay);
            // addedValueTally += newCardValue;
            // console.log(`increasing addedValueTally to ${addedValueTally}`);
            console.error('CPU DRAW CARD');
            console.warn(`Right after dealing opponentTotal+newCardValue is ${app.state.opponentTotal + newCardValue}`);
            newTotal = app.state.opponentTotal + newCardValue;
            if ((app.state.opponentTotal + newCardValue) >= app.state.userTotal) {
              console.error(`REACHED APPROPRIATE TOTAL! Set newTotal to ${newTotal} and breaking`);
              break;
            }
          }
          // newTotal = app.state.opponentTotal + addedValueTally;
        }

        console.warn(`Done drawing cards. newTotal is ${newTotal}`);

        if (newTotal > 20) {
          console.warn('BROKE 20!! Must see if hand cards can reduce total!');

          // CHECK HAND MINUSES
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            let totalComparison;
            if (app.state.opponentHand[i].type === '-' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = newTotal + card.value;
              if (acceptTie) {
                totalComparison = potentialScore >= app.state.userTotal;
              } else {
                totalComparison = potentialScore > app.state.userTotal;
              }
              if (totalComparison && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
                extraDelay += app.state.options.moveIndicatorTime;
                console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore} (under 20 and beats/ties ${app.state.userTotal}), so CPU is playing it!`);
                if (potentialScore >= standAt) {
                  standCPU(app);
                  stood = true;
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
        } else if (newTotal < 20) {
          console.warn('Didn\'t break 20. No need to check hand cards for minuses.');
        } else {
          console.warn('Reached EXACTLY 20!');
        }

        // compare scores and declare a winner
        // console.warn(`Determining winner with delay ${dealInterval + extraDelay}`);
        // setTimeout(() => {
        //   app.determineWinnerFromTotal();
        // }, (dealInterval + extraDelay));
        // return;
      } else if (app.state.opponentTotal > 20) {
        console.warn('CPU total > 20  and user <= 20 when user standing!');
        let newTotal;
        let totalComparison;
        console.log('Checking minus cards to try to get <= 20...')
        // see if minus cards can get total below 20
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          if (app.state.opponentHand[i].type === '-' || app.state.opponentHand[i].type === plusMinusSymbol) {
            let card = app.state.opponentHand[i];
            let potentialScore = app.state.opponentTotal + card.value;
            if (potentialScore <= 20) {
              console.log('found a good one! playing hand card', cardToPlay)
              let cardToPlay = card;
              app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
              app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
              extraDelay += app.state.options.moveIndicatorTime;
              newTotal = potentialScore;
            }
          }
        }
        console.log('checked cards, now total is', newTotal);
        console.log('Accept tie?', acceptTie);
        if (acceptTie) {
          totalComparison = newTotal < app.state.userTotal;
        } else {
          totalComparison = newTotal <= app.state.userTotal;
          // will draw again after a tie
        }
        if (totalComparison) {
          console.warn('Under 20, but still too low to win! Drawing a card');

          app.dealToPlayerGrid('opponent');
          console.error('CPU DRAW CARD');
          app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
          extraDelay += app.state.options.moveIndicatorTime;
          console.warn(`After dealing but before a delay, opponentTotal is ${app.state.opponentTotal}`);

          setTimeout(() => {
            console.warn(`After a delay, opponentTotal is ${app.state.opponentTotal}`);
          }, app.state.options.dealInterval);
        } else {
          if (acceptTie) {
            console.warn('That was enough to win or tie! Ending turn.');
          } else {
            console.warn('That was enough to win! Ending turn.');
          }
        }

        // setTimeout(() => {
        //   app.determineWinnerFromTotal();
        // }, (app.state.options.turnInterval * 2));
        // return;
      } else {
        // is 20
        console.error('CPU STANDING at exactly 20!');
        standCPU(app);
        stood = true;
      }
      console.error('after operations, newTotal and stood =', newTotal, stood)
    } else {

      // USER STILL IN PLAY ///////////////////////////////////////////////////////////////////////////////////////////////

      if (app.state.opponentTotal >= standAt && app.state.opponentTotal < 20) {
        standCPU(app);
        stood = true;
        console.error('CPU is over stand limit and immediately STANDS after initial draw!');
      } else if (app.state.opponentTotal < 20) {

        // UNDER 20
        if (!safeToDraw) {
          // CHECK HAND PLUSES
          console.warn('Because UNSAFE TO DRAW, checking hand pluses');
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            console.log(`${app.state.playerNames.opponent} is considering card ${card.id} value ${card.value} type ${card.type}...`)
            if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = app.state.opponentTotal + card.value;
              if (!app.state.turnStatus.opponent.playedCard && potentialScore >= standAt && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
                extraDelay += app.state.options.moveIndicatorTime;
                standCPU(app);
                stood = true;
                console.log(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it and STANDING!`);
                console.error('CPU STANDS after playing a hand card!');
                break;
              } else {
                console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
              }
            } else if (card) {
              console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          ///////////////////
        } else {
          console.warn('SAFE TO DRAW: checking hand pluses for stand+ score...');
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            console.log(`Considering card ${card.id} value ${card.value} type ${card.type}...`)
            if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = app.state.opponentTotal + card.value;
              if (!app.state.turnStatus.opponent.playedCard && potentialScore >= standAt && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
                extraDelay += app.state.options.moveIndicatorTime;
                standCPU(app);
                stood = true;
                console.log(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it and STANDING!`);
                console.error('CPU STANDS after playing a hand card!');
                break;
              } else {
                console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
              }
            } else if (card) {
              console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          console.warn(`CPU total ${app.state.opponentTotal} low enough that it's safe to end turn and draw, rather than use a hand card.`);
        }
      } else if (app.state.opponentTotal > 20) {

        // OVER 20

        // CHECK HAND MINUSES
        for (let i = 0; i < app.state.opponentHand.length; i++) {
          let card = app.state.opponentHand[i];
          if (app.state.opponentHand[i].type === '-' || app.state.opponentHand[i].type === plusMinusSymbol) {
            let potentialScore = app.state.opponentTotal + card.value;
            if (potentialScore <= 20) {
              let cardToPlay = card;
              app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
              console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it!`);
              app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2)
              extraDelay += app.state.options.moveIndicatorTime;
              if (potentialScore >= standAt) {
                standCPU(app);
                stood = true;
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
        stood = true;
      }
      // console.error('CPU TURN OVER');
      // setTimeout(() => {
      //   if (stood) {
      //     app.callMoveIndicator('opponent', 'Stand', app.state.options.moveIndicatorTime);
      //   } else {
      //     app.callMoveIndicator('opponent', 'End Turn', app.state.options.moveIndicatorTime);
      //   }
      // }, extraDelay);
      // //must delay or app.state.opponentTotal is wrong in changeTurn()!
      // console.log('changing turns with delay', app.state.options.moveIndicatorTime + extraDelay)
      // setTimeout(() => {
      //   app.changeTurn('user');
      // }, app.state.options.moveIndicatorTime + extraDelay);
    }

    console.error('CPU TURN OVER');
    setTimeout(() => {
      if (stood) {
        app.callMoveIndicator('opponent', 'Stand', app.state.options.moveIndicatorTime);
      } else {
        app.callMoveIndicator('opponent', 'End Turn', app.state.options.moveIndicatorTime);
      }
    }, extraDelay);
    //must delay or app.state.opponentTotal is wrong in changeTurn()!
    if (stood) {
      if (app.state.turnStatus.user.standing) {
        console.error('BOTH STANDING! detemining winner...')
        // both standing
        setTimeout(() => {
          app.determineWinnerFromTotal();
        }, (app.state.options.turnInterval + extraDelay));
      } else {
        console.error('ONLY CPU STANDING!')
        console.log('changing turns with delay', app.state.options.moveIndicatorTime + extraDelay)
        setTimeout(() => {
          app.changeTurn('user');
        }, app.state.options.moveIndicatorTime + extraDelay);
      }
    } else {
      console.error('CPU ENDED TURN!');
      if (app.state.turnStatus.user.standing) {
        console.error('CPU ENDED TURN WHILE USER STANDING??');
      } else {
        console.log('BOTH PLAYERS STILL IN PLAY. CHANGING TURNS')
        setTimeout(() => {
          app.changeTurn('user');
        }, app.state.options.moveIndicatorTime + extraDelay);
      }
    }
    
  }, app.state.options.opponentMoveWaitTime);
}

function standCPU(app) {
  let turnStatusCopy = Object.assign({}, app.state.turnStatus);
  turnStatusCopy.opponent.standing = true;
  app.setState({
    turnStatus: turnStatusCopy
  });
}