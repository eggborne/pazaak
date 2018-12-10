
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CardBack from './CardBack';

function GameBoard(props) {
  let ninthCards = {
    user: [],
    opponent: []
  };
  if (props.grids.user.length === 9) {
    let ninthCard = props.grids.user[8];
    ninthCards.user.push(ninthCard);
  }
  if (props.grids.opponent.length === 9) {
    let ninthCard = props.grids.opponent[8];
    ninthCards.opponent.push(ninthCard);
  }
  let userWins = ['', '', ''];
  let opponentWins = ['', '', ''];
  if (props.wins.user === 1) {
    userWins[0] = 'win-symbol-lighted';
  }
  if (props.wins.user === 2) {
    userWins[0] = userWins[1] = 'win-symbol-lighted';
  }

  if (props.wins.opponent === 1) {
    opponentWins[0] = 'win-symbol-lighted';
  }
  if (props.wins.opponent === 2) {
    opponentWins[0] = opponentWins[1] = 'win-symbol-lighted';
  }
  let userTurn = '';
  let opponentTurn = '';
  if (props.turn === 'user') {
    if (props.turnStatus.user.standing) {
      userTurn = 'standing';
    } else {
      userTurn = 'turn-lighted';
    }
    if (props.turnStatus.opponent.standing) {
      opponentTurn = 'standing';
    }
  } else if (props.turn === 'opponent') {
    if (props.turnStatus.opponent.standing) {
      opponentTurn = 'standing';
    } else {
      opponentTurn = 'turn-lighted';
    }
    if (props.turnStatus.user.standing) {
      userTurn = 'standing';
    }
  }
  if (document.getElementById('end-turn-button')) {
    if (props.turnStatus.opponent.standing && !props.turnStatus.user.highlightedCard.element) {
      document.getElementById('end-turn-button').innerHTML = 'Draw';
    } else if (props.turnStatus.user.highlightedCard.element) {
      document.getElementById('end-turn-button').innerHTML = 'Play Card';
    } else {
      document.getElementById('end-turn-button').innerHTML = 'End Turn';

    }
  }
  return (
    <div style={props.style} id='game-board'>
      <div id='opponent-hand' className='player-hand-area'>
        <div id='opponent-cards' className='player-cards'>
          {props.hands.opponent.map((card, i) =>
            <CardBack key={i} size={props.miniCardSize} />
          )}
        </div>
        <div className={`turn-indicator ${opponentTurn}`}></div>
      </div>
      <div id='grids'>
        <div id='opponent-area' className='player-area'>
          <div id='opponent-grid' className='deal-grid'>
            {props.grids.opponent.map((card, i) => {
              if (i < 8) {
                return <Card key={i} size={props.cardSize} value={card.value} type={card.type} />;
              }
            })}
            <div className='ninth-card' id='opponent-ninth-card'>
              {ninthCards.opponent.map((card, i) =>
                <Card key={i} size={props.cardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>

          <div className='stats-area'>
            <div className='total-display'>
              <div id='opponent-total-outline' className='total-outline'>
                <div id='opponent-total'>{props.totals.opponent}</div>
              </div>
            </div>
            <div className='win-symbol-area'>
              <div className={`win-symbol-bg ${opponentWins[0]}`}><div className={`win-symbol ${opponentWins[0]}`}></div></div>
              <div className={`win-symbol-bg ${opponentWins[1]}`}><div className={`win-symbol ${opponentWins[1]}`}></div></div>
              <div className={`win-symbol-bg ${opponentWins[2]}`}><div className={`win-symbol ${opponentWins[2]}`}></div></div>
            </div>
          </div>
        </div>
        <div id='user-area' className='player-area'>
          <div id='user-grid' className='deal-grid'>
            {props.grids.user.map((card, i) => {
              if (i < 8) {
                return <Card key={i} size={props.cardSize} value={card.value} type={card.type} />;
              }
            })}
            <div className='ninth-card' id='user-ninth-card'>
              {ninthCards.user.map((card, i) =>
                <Card key={i} size={props.cardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>
          <div className='stats-area'>
            <div className='total-display'>
              <div id='user-total-outline' className='total-outline'>
                <div id='user-total'>{props.totals.user}</div>
              </div>
            </div>
            <div className='win-symbol-area'>
              <div className={`win-symbol-bg ${userWins[0]}`}><div className={`win-symbol ${userWins[0]}`}></div></div>
              <div className={`win-symbol-bg ${userWins[1]}`}><div className={`win-symbol ${userWins[1]}`}></div></div>
              <div className={`win-symbol-bg ${userWins[2]}`}><div className={`win-symbol ${userWins[2]}`}></div></div>
            </div>
          </div>
        </div>
      </div>
      <div id='user-hand' className='player-hand-area'>
        <div id='user-cards' className='player-cards'>
          {props.hands.user.map((card, i) =>
            <Card key={i} id={card.id} size={props.mediumCardSize} value={card.value} type={card.type}
              onClickCard={props.onClickCard} />
          )}
        </div>
        <div className={`turn-indicator ${userTurn}`}></div>
      </div>
    </div>
  );
}
GameBoard.propTypes = {
  style: PropTypes.object,
  hands: PropTypes.object,
  grids: PropTypes.object,
  totals: PropTypes.object,
  wins: PropTypes.object,
  turn: PropTypes.string,
  turnStatus: PropTypes.object,
  cardSize: PropTypes.object,
  mediumCardSize: PropTypes.object,
  miniCardSize: PropTypes.object,
  onClickCard: PropTypes.func,
};

export default GameBoard;




















