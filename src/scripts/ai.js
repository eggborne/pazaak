import { characters } from '../scripts/characters';
import { randomInt } from './util';
const plusMinusSymbol = '±';

function checkHandPluses(app, standAt) {
  let winnerCard;
  for (let i = 0; i < app.state.opponentHand.length; i++) {
    let card = app.state.opponentHand[i];
    //console.log(`${app.state.playerNames.opponent} is considering card ${card.id} value ${card.value} type ${card.type}...`);
    if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
      let potentialScore = app.state.opponentTotal + card.value;
      if (!app.state.turnStatus.opponent.playedCard && potentialScore >= standAt && potentialScore <= 20) {
        console.warn('FOUND a winning card!')
        winnerCard = { id: card.id, value: card.value, type: card.type };
        break;
      } else {
        console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
      }
    } else if (card) {
      console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
    }
  }
  console.warn('returning', winnerCard)
  return winnerCard;
}

export function makeOpponentMove(app) {

  // working: 
  // - cpu ends turn until !safeToDraw, user stands with losing score
  // - cpu ends turn until !safeToDraw, user stands with losing score
  // 

  setTimeout(() => {


    let stood = false;
    let busted = false;
    let emptyGridSlots = 9 - app.state.opponentGrid.length;
    let autoStand = app.state.options.autoStand;
    let autoEnd = app.state.options.autoEnd;
    let newTotal;
    let extraDelay = 0;
    let acceptTie = randomInt(0, 10) < characters[app.state.cpuOpponent].strategy.tie.chanceToAccept;
    let standAt = characters[app.state.cpuOpponent].strategy.stand.standAt;
    let highestMinusValue = getHighestMinusValue(app);
    let safeToDraw = isSafeToDraw(app, highestMinusValue);

    let userTotal = app.state.userTotal;
    let cpuTotal = app.state.opponentTotal;
    console.warn('------------------------');
    console.warn(`CPU turn started. Totals: User - ${userTotal} | CPU - ${cpuTotal}`);
    console.warn('CPU emptyGridSlots', emptyGridSlots);
    console.warn('CPU safeToDraw?', safeToDraw);
    console.warn('CPU highestMinusValue?', highestMinusValue);
    console.warn('------------------------');

    if (app.state.turnStatus.user.standing) {
      console.warn('User is STANDING.');
      if (userTotal > 20) {
        console.warn('userTotal was over 20!');
        standCPU(app);
        stood = true;
      } else {
        console.warn('userTotal was <= 20!');
        if (cpuTotal < userTotal) {
          console.warn('opponentTotal < userTotal.')
          standAt = userTotal + 1;
          if (standAt > 20) {
            standAt = 20;
          }
          console.warn('standAt changed to', standAt)
          // search hand for winning card
          let cardToPlay = checkHandPluses(app, standAt);
          if (cardToPlay) {
            app.playHandCard('opponent', cardToPlay);
            emptyGridSlots--;
            app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
            standCPU(app);
            stood = true;
          } else {
            console.warn(`No good card found to play. Drawing instead (max ${emptyGridSlots} more times)...`);
            if (emptyGridSlots > 0) {
              extraDelay += 1000;
              setTimeout(() => {
                app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
                app.dealToPlayerGrid('opponent').then((newTotal) => {
                  console.warn('dealToPlayerGrid promise returned', newTotal);
                });
              }, extraDelay);
            }
            console.warn('after draw, opponentTotal is', app.state.opponentTotal);
            if (app.state.opponentTotal > 20) {
              if (autoEnd) {
                busted = true;
                console.warn('cpu busted while autoEnd is on');

              }
            } else {
              console.warn('Did not bust after drawing. Standing');
              standCPU(app);
              stood = true;
            }
            // if (app.state.opponentTotal < standAt) {
            //   console.warn('Total still too low. Drawing again.')
            //   app.dealToPlayerGrid('opponent');
            //   app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
            //   console.warn('after second draw, opponentTotal is', app.state.opponentTotal);
            //   standCPU(app);
            //   stood = true;
            // }
          }
        } else {
          console.warn('CPU score already beats user score. Standing.');
          standCPU(app);
          stood = true;
        }
      }
    } else {
      console.warn('User is still in play.');
      if (safeToDraw) {
        console.warn('safeToDraw = true. Ending turn.')
        

      } else {
        console.warn('safeToDraw = false.');
        console.warn('userTotal is', userTotal);
        
        if (cpuTotal >= standAt) {
          console.warn('cpuTotal >= standAt. CPU Standing.', cpuTotal, standAt)
          standCPU(app);
          stood = true;
        } else {
          console.warn('cpuTotal < standAt. Draw a card?');

        }
      }
    }
    if (stood) {
      setTimeout(() => {
        app.callMoveIndicator('opponent', 'Stand', app.state.options.moveIndicatorTime);
        setTimeout(() => {
          app.changeTurn('user');
        }, app.state.options.moveIndicatorTime);
      }, app.state.options.opponentMoveWaitTime + extraDelay);
    } else if (busted) {
      setTimeout(() => {
        app.callMoveIndicator('opponent', 'BUST', app.state.options.moveIndicatorTime);
        setTimeout(() => {
          app.changeTurn('user');
        }, app.state.options.moveIndicatorTime);
      }, app.state.options.opponentMoveWaitTime + extraDelay);
    } else {
      setTimeout(() => {
        app.callMoveIndicator('opponent', 'End Turn', app.state.options.moveIndicatorTime);
        setTimeout(() => {
          app.changeTurn('user');
        }, app.state.options.moveIndicatorTime);
      }, app.state.options.opponentMoveWaitTime + extraDelay);
    }

  }, app.state.options.dealWaitTime);

}

export function makeOpponentMove2(app) {

  /**
   * WORKING:
   * - user stands, cpu beats after initial draw
   * - cpu draws and plays hand card to stand, user stands
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
    console.log('char is ');
    console.log(characters[app.state.cpuOpponent]);
    let stood = false;
    let newTotal;
    let extraDelay = 0;
    let acceptTie = randomInt(0, 10) < characters[app.state.cpuOpponent].strategy.tie.chanceToAccept;
    let standAt = characters[app.state.cpuOpponent].strategy.stand.standAt;
    /**
     * Done whether user is standing or not
     * 
     * Establishes highestMinusValue and safeToDraw
     */
    // decide if it's safe to draw, with the minus card in mind
    let safeToDraw = isSafeToDraw(app, getHighestMinusValue(app));
    /**
     * 
     */

    if (app.state.turnStatus.user.standing) {

      // USER STANDING ///////////////////////////////////////////////////////////////////////////////////////////////////

      //console.warn('Player standing! Beginning CPU standoff sequence........ totals', app.state.userTotal, app.state.opponentTotal);

      if (app.state.userTotal > 20) {
        // user over 20
        //console.warn('userTotal > 20! doesn\'t matter what opponent score is. Standing');
        standCPU(app);
        stood = true;
      } else if (app.state.userTotal < app.state.opponentTotal) {
        //console.warn('CPU score beats user after initial draw. Standing');
        standCPU(app);
        stood = true;

      } else {
        //console.warn('User stood, and CPU score still doesn\'t beat user even after inital draw');
        if (app.state.opponentTotal < 20) {
          //console.warn('CPU score is less than twenty');
          // see if a card can beat or tie user total
          let addedValueTally = 0;
          let dealInterval = app.state.options.turnInterval * 2;
          //console.warn('Seeing if a hand card can beat userTotal');
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            let totalComparison;
            if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = app.state.opponentTotal + card.value;
              if (acceptTie) {
                totalComparison = potentialScore >= app.state.userTotal;
                //console.log('Willing to accept a tie. potential score with hand card must be >= user score');
              } else {
                totalComparison = potentialScore > app.state.userTotal;
                //console.log('Not willing to accept a tie. potential score with hand card must be > user score');

              }
              if (totalComparison && potentialScore <= 20 && !app.state.turnStatus.opponent.playedCard) {
                app.playHandCard('opponent', { id: card.id, value: card.value, type: card.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
                extraDelay += app.state.options.moveIndicatorTime;
                //console.warn(`PLAYING #card-${card.id} (${card.value} ${card.type}) for winning total ${potentialScore}!`);
                newTotal = potentialScore;
                break;
              } else {
                //console.warn(`index ${i} #card-${card.id} value ${card.value} NO GOOD; potentialScore ${potentialScore} TOO LOW`);
              }
            } else {
              //console.warn(`index ${i} #card-${card.id} is type ${card.type} and can't help!`);
            }
          }
          if (newTotal) { // checking if defined, not if non-zero
            //console.warn(`CPU played a card to get total to ${newTotal}, beating or tying ${app.state.userTotal}`);
          } else {
            //console.warn('CPU failed to find a useful card. Must draw instead.');
            // draw until total beats or ties user
            let openSlots = 9 - (app.state.opponentGrid.length);
            
            //console.warn(`CPU open slots ${openSlots}, trying that many times max to draw`);
            for (let i = 0; i < openSlots; i++) {
              //console.log('pre-setTimeout, total is', app.state.opponentTotal);
              //console.warn(`drawing card ${i} with delay ${(i * 500)}`);
              //console.warn(`Right before dealing opponentTotal is ${app.state.opponentTotal}`);

              // setTimeout(() => {

              app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
              // }, (i * app.state.options.moveIndicatorTime));
              extraDelay += app.state.options.moveIndicatorTime;
              app.dealToPlayerGrid('opponent');
              // addedValueTally += newCardValue;
              //console.log(`increasing addedValueTally to ${addedValueTally}`);
              newTotal = app.state.opponentTotal;
              if ((app.state.opponentTotal) >= app.state.userTotal) {
                //console.error(`REACHED APPROPRIATE TOTAL! Set newTotal to ${newTotal} and breaking`);
                break;
              }
            }
            // newTotal = app.state.opponentTotal + addedValueTally;
          }
  
          //console.warn(`Done drawing cards. newTotal is ${newTotal}`);
  
          if (newTotal > 20) {
            //console.warn('BROKE 20!! Must see if hand cards can reduce total!');
  
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
                  app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
                  extraDelay += app.state.options.moveIndicatorTime;
                  //console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore} (under 20 and beats/ties ${app.state.userTotal}), so CPU is playing it!`);
                  if (potentialScore >= standAt) {
                    standCPU(app);
                    stood = true;
                  }
                  break;
                } else {
                  //console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too high!`);
                }
              } else {
                //console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
              }
            }
            ///////////////////
  
            //console.warn('Afer hand check for minuses, total is', app.state.opponentTotal);
          } else if (newTotal < 20) {
            //console.warn('Didn\'t break 20. No need to check hand cards for minuses.');
          } else {
            //console.warn('Reached EXACTLY 20!');
          }
        } else if (app.state.opponentTotal > 20) {
          //console.warn('CPU total > 20  and user <= 20 when user standing!');
          let newTotal;
          //console.log('Checking minus cards to try to get <= 20...');
          // see if minus cards can get total below 20
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            if (app.state.opponentHand[i].type === '-' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let card = app.state.opponentHand[i];
              let potentialScore = app.state.opponentTotal + card.value;
              if (potentialScore <= 20) {
                //console.log('found a good one! playing hand card', cardToPlay);
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
                extraDelay += app.state.options.moveIndicatorTime;
                newTotal = potentialScore;
              }
            }
          }
          //console.log('checked cards, now total is', newTotal);
          //console.log('Accept tie?', acceptTie);
          let totalTooLow;
          if (acceptTie) {
            totalTooLow = newTotal < app.state.userTotal;
          } else {
            totalTooLow = newTotal <= app.state.userTotal;
            // will draw again after a tie
          }
          if (totalTooLow) {
            //console.warn('Under 20, but still too low to win! Drawing a card');
  
            app.dealToPlayerGrid('opponent');
            //console.error('CPU DRAW CARD');
            app.callMoveIndicator('opponent', 'Draw', app.state.options.moveIndicatorTime / 2);
            extraDelay += app.state.options.moveIndicatorTime;
            //console.warn(`After dealing but before a delay, opponentTotal is ${app.state.opponentTotal}`);
  
            setTimeout(() => {
              //console.warn(`After a delay, opponentTotal is ${app.state.opponentTotal}`);
            }, app.state.options.dealInterval);
          } else {
            if (acceptTie) {
              //console.warn('That was enough to win or tie! Ending turn.');
            } else {
              //console.warn('That was enough to win! Ending turn.');
            }
          }
  
          // setTimeout(() => {
          //   app.determineWinnerFromTotal();
          // }, (app.state.options.turnInterval * 2));
          // return;
      

        } else {
          // is 20
          //console.error('CPU STANDING at exactly 20!');
          standCPU(app);
          stood = true;
        }
      } 
    } else {

      // USER STILL IN PLAY ///////////////////////////////////////////////////////////////////////////////////////////////

      if (app.state.opponentTotal >= standAt && app.state.opponentTotal < 20) {
        standCPU(app);
        stood = true;
        //console.error('CPU is over stand limit and immediately STANDS after initial draw!');
      } else if (app.state.opponentTotal < 20) {

        // UNDER 20
        if (!safeToDraw) {
          // CHECK HAND PLUSES
          //console.warn('Because UNSAFE TO DRAW, checking hand pluses');
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            //console.log(`${app.state.playerNames.opponent} is considering card ${card.id} value ${card.value} type ${card.type}...`);
            if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = app.state.opponentTotal + card.value;
              if (!app.state.turnStatus.opponent.playedCard && potentialScore >= standAt && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
                extraDelay += app.state.options.moveIndicatorTime;
                standCPU(app);
                stood = true;
                //console.log(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it and STANDING!`);
                //console.error('CPU STANDS after playing a hand card!');
                break;
              } else {
                //console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
              }
            } else if (card) {
              //console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          ///////////////////
        } else {
          //console.warn('SAFE TO DRAW: checking hand pluses for stand+ score...');
          for (let i = 0; i < app.state.opponentHand.length; i++) {
            let card = app.state.opponentHand[i];
            //console.log(`Considering card ${card.id} value ${card.value} type ${card.type}...`);
            if (app.state.opponentHand[i].type === '+' || app.state.opponentHand[i].type === plusMinusSymbol) {
              let potentialScore = app.state.opponentTotal + card.value;
              if (!app.state.turnStatus.opponent.playedCard && potentialScore >= standAt && potentialScore <= 20) {
                let cardToPlay = card;
                app.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
                extraDelay += app.state.options.moveIndicatorTime;
                standCPU(app);
                stood = true;
                //console.log(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it and STANDING!`);
                //console.error('CPU STANDS after playing a hand card!');
                break;
              } else {
                //console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too low!`);
              }
            } else if (card) {
              //console.log(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
            }
          }
          //console.warn(`CPU total ${app.state.opponentTotal} low enough that it's safe to end turn and draw, rather than use a hand card.`);
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
              //console.warn(`Card ${i} (#card-${card.id} ${card.value} ${card.type}) makes ${potentialScore}, so CPU is playing it!`);
              app.callMoveIndicator('opponent', 'Play Card', app.state.options.moveIndicatorTime / 2);
              extraDelay += app.state.options.moveIndicatorTime;
              if (potentialScore >= standAt) {
                standCPU(app);
                stood = true;
              }
              break;
            } else {
              //console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but potentialScore ${potentialScore} is too high!`);
            }
          } else {
            //console.warn(`CPU looked at card ${i} (#card-${card.id} ${card.value} ${card.type}), but it can't help because it's a ${card.type} type!`);
          }
        }
        ///////////////////

      } else {
        // is 20
        //console.error('TOTAL IS EXACTLY 20! Standing.');
        standCPU(app);
        stood = true;
      }
      // //console.error('CPU TURN OVER');
      // setTimeout(() => {
      //   if (stood) {
      //     app.callMoveIndicator('opponent', 'Stand', app.state.options.moveIndicatorTime);
      //   } else {
      //     app.callMoveIndicator('opponent', 'End Turn', app.state.options.moveIndicatorTime);
      //   }
      // }, extraDelay);
      // //must delay or app.state.opponentTotal is wrong in changeTurn()!
      // //console.log('changing turns with delay', app.state.options.moveIndicatorTime + extraDelay)
      // setTimeout(() => {
      //   app.changeTurn('user');
      // }, app.state.options.moveIndicatorTime + extraDelay);
    }

    //console.error('CPU TURN OVER');
    setTimeout(() => {
      if (stood || app.state.turnStatus.user.standing) {
        app.callMoveIndicator('opponent', 'Stand', app.state.options.moveIndicatorTime);
      } else {
        app.callMoveIndicator('opponent', 'End Turn', app.state.options.moveIndicatorTime);
      }
    }, extraDelay);

    setTimeout(() => {
      app.changeTurn('user');
    }, ((app.state.options.turnInterval*3) + extraDelay)); 
  }, app.state.options.opponentMoveWaitTime);
}

function getHighestMinusValue(app) {
  // returns value only
  let highest = 0;
  for (let i = 0; i < app.state.opponentHand.length; i++) {
    let card = app.state.opponentHand[i];
    //console.log(`checking hand card ${i}: #card-${card.id} ${card.value} ${card.type}`);
    if (card.type === '-' || card.type === plusMinusSymbol) {
      if (Math.abs(card.value) > highest) {
        highest = Math.abs(card.value);
      }
    }
  }
  return highest;
}
function isSafeToDraw(app, highestMinusValue) {
  // returns boolean
  let safe = false;
  if ((app.state.opponentTotal - highestMinusValue) <= 14) {
    // safe to draw!
    safe = true;
    //console.warn(`CPU decided it's safe to draw at total ${app.state.opponentTotal}, with minus potential of ${highestMinusValue}`);
  } else {
    //console.warn(`CPU decided it's UNSAFE to draw at total ${app.state.opponentTotal}, with minus potential of ${highestMinusValue}`);
  }
  return safe;
}

function standCPU(app) {
  console.warn('calling standCPU');
  let turnStatusCopy = Object.assign({}, app.state.turnStatus);
  turnStatusCopy.opponent.standing = true;
  app.setState({
    turnStatus: turnStatusCopy
  });
}