
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
  let opponentGrid = [];
  let userGrid = [];
  props.grids.opponent.map((card, i) => {
    opponentGrid.push(<Card key={i} size={props.cardSize} value={card.value} type={card.type} />);
  });
  props.grids.user.map((card, i) => {
    userGrid.push(<Card key={i} size={props.cardSize} value={card.value} type={card.type} />);
  });
  let gridWidth = props.cardSize.width + (parseFloat(props.cardSize.borderSize) * 2);
  let gridHeight = props.cardSize.height + (parseFloat(props.cardSize.borderSize) * 2);
  let handCardSize = props.mediumCardSize;
  if (props.cardSize.width * 6 > window.innerWidth) {
    handCardSize = props.miniCardSize;
  }
  return (
    <div style={props.style} id='game-board'>
      <style jsx>{`
        .deal-grid {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px auto;
          grid-template-rows: ${gridHeight}px ${gridHeight}px;
          align-self: center;
          grid-column-gap: 1vw;
          grid-row-gap: 1vh;
          margin-top: 1vh;
          margin-bottom: 1vh;
          margin-left: auto;
          margin-right: auto;
        }
        .deal-grid > div {
          border-radius: ${props.cardSize.borderRadius} !important;
          background-color: rgb(105, 115, 128);
          height: ${gridHeight}px;
        }
        .deal-grid .stats-area {
          background-color: transparent;
        }
        .stats-area {
          margin-left: 6vw;
        }
        .ninth-card {
          width: ${gridWidth}px;
        }
        .total-display {
          font-family: 'Nova Square';
          width: 3.5rem;
          font-size: 1.75rem;
          border-radius: 0.75rem;
          background-color: black;
          padding: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .total-outline {
          width: 100%;
          border-radius: 0.5rem;
          background-color: transparent;
          border: 2px solid #933500;
          padding: 0.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #user-total, #opponent-total {
          color: white;
          border-color: #933500;
        }
        .red-total {
          color: red !important;
          border-color: red !important;
        }
        .green-total {
          color: green !important;
          border-color: green !important;
        }
        .turn-indicator-area {
          background: green;
          height: 100%;
          width: 100%;
        }
        .turn-indicator {
          width: 5vmax;
          height: 5vmax;
          border-radius: 50%;
          background-color: gray;
          border: 1px solid black;
          align-self: center;
          transition: all 500ms ease;
        }
        .turn-lighted {
          animation: pulse var(--pulse-speed) infinite;
        }
        .standing {
          background-color: rgb(189, 189, 95);
        }
        @keyframes pulse {
          0% {
            background-color: rgb(124, 0, 0);
          }
          50% {
            background-color: red;
          }
          100% {
            background-color: rgb(124, 0, 0);
          }
        }
        .win-symbol-area {
          display: inline-flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          margin-top: 0.5rem;
        }
        .win-symbol-bg {
          /* box-sizing: border-box; */
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0.1rem solid black;
        }
        .win-symbol {
          box-sizing: border-box;
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          border: 0.1rem solid #222;
          width: 0.8rem;
          height: 0.8rem;
        }
        .win-symbol-lighted {
          background-color: orange;
        }
      `}
      </style>
      <div id='opponent-hand' className='player-hand-area'>
        <div className='opponent-portrait' id='mini-portrait'>
          <div className='mini-portrait-label shadowed-text'>{props.playerNames.opponent}</div>
        </div>
        <div id='opponent-cards' className='player-cards'>
          {props.hands.opponent.map((card, i) =>
            <CardBack key={i} size={handCardSize} />
          )}
        </div>
          <div id='opponent-turn-indicator' className={`turn-indicator ${opponentTurn}`}></div>
      </div>
      <div id='grids'>
        <div id='opponent-area' className='player-area'>
          <div id='opponent-grid' className='deal-grid'>
            <div>{opponentGrid[0]}</div>
            <div>{opponentGrid[1]}</div>
            <div>{opponentGrid[2]}</div>
            <div>{opponentGrid[3]}</div>
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
            <div>{opponentGrid[4]}</div>
            <div>{opponentGrid[5]}</div>
            <div>{opponentGrid[6]}</div>
            <div>{opponentGrid[7]}</div>
            <div className='ninth-card' id='opponent-ninth-card'>

            </div>
          </div>
        </div>

        <div id='user-area' className='player-area'>
          <div id='user-grid' className='deal-grid'>
            <div>{userGrid[0]}</div>
            <div>{userGrid[1]}</div>
            <div>{userGrid[2]}</div>
            <div>{userGrid[3]}</div>
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
            <div>{userGrid[4]}</div>
            <div>{userGrid[5]}</div>
            <div>{userGrid[6]}</div>
            <div>{userGrid[7]}</div>
            <div className='ninth-card' id='opponent-ninth-card'>

            </div>
          </div>

        </div>
      </div>
      <div id='user-hand' className='player-hand-area'>
        <div className='opponent-portrait' id='user-portrait'>
          <div className='mini-portrait-label shadowed-text'>{props.playerNames.user}</div>
        </div>
        <div id='user-cards' className='player-cards'>
          {props.hands.user.map((card, i) =>
            <Card key={i} id={card.id} size={handCardSize} value={card.value} type={card.type}
              onClickCard={props.onClickCard} />
          )}
        </div>
          <div id='user-turn-indicator' className={`turn-indicator ${userTurn}`}></div>
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
  playerNames: PropTypes.object,
  cardSize: PropTypes.object,
  mediumCardSize: PropTypes.object,
  miniCardSize: PropTypes.object,
  onClickCard: PropTypes.func,
};

export default GameBoard;




















