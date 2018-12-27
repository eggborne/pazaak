
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CardBack from './CardBack';
import MoveIndicator from './MoveIndicator';
import PlayerPortrait from './PlayerPortrait';

function GameBoard(props) {
  let startTime = window.performance.now();
  let opponentSpriteIndex = props.opponentNames.indexOf(props.CPUOpponent);
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
  let gridWidth = props.cardSize.width + (parseFloat(props.cardSize.borderSize) * 3);
  let gridHeight = props.cardSize.height + (parseFloat(props.cardSize.borderSize) * 3);
  let handCardSize = props.mediumCardSize;
  let cardsPerWidth = window.innerWidth / handCardSize.width;
  if (cardsPerWidth < 6.8) {
    handCardSize = props.miniCardSize;
  }
  let opponentHand = [];
  let userHand = [];
  props.hands.opponent.map((card, i) => {
    opponentHand.push(<CardBack key={i} size={handCardSize} />);
  });
  props.hands.user.map((card, i) => {
    userHand.push(<Card key={i} id={card.id} size={handCardSize} value={card.value} type={card.type}
      onClickCard={props.onClickCard} />);
  });
  let handGridwidth = handCardSize.width + Math.round(parseFloat(handCardSize.borderSize) * 3);
  let handGridHeight = handCardSize.height + Math.round(parseFloat(handCardSize.borderSize) * 3);
  let portraitSize = Math.round(parseInt(handCardSize.height * 0.9));
  return (
    <div style={props.style} id='game-board'>
      <style jsx>{`
        #game-board {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: opacity 400ms ease;
          flex-grow: 1;
          background: transparent;
        }
        .player-area {
          display: inline-flex;
          align-items: flex-end;
          justify-content: space-around;
          box-sizing: border-box;
          flex-grow: 2;
        }
        .player-hand-area {
          box-sizing: border-box;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-grow: 0;
        }
        #user-area, #user-hand {
          background-color: var(--trans-blue-bg-color);
        }
        #opponent-area, #opponent-hand {
          background-color: var(--trans-red-bg-color);
        }
        #opponent-area {
          border-bottom: ${gridWidth*0.025}px outset rgba(0, 0, 0, 0.2);
        }
        #user-area {
          border-top: ${gridWidth*0.025}px outset rgba(0, 0, 0, 0.15);
        }
        #opponent-area {
          border-bottom: ${gridWidth*0.02}px solid #555;
        }
        #user-area {
          border-top: ${gridWidth*0.02}px solid #444;
        }
        .deal-grid {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px;
          grid-template-rows: ${gridHeight}px ${gridHeight}px;
          grid-column-gap: 1vw;
          grid-row-gap: 0.5vh;
          align-self: center;
        }
        .player-cards {
          display: grid;
          grid-template-columns: ${handGridwidth}px ${handGridwidth}px ${handGridwidth}px ${(handGridwidth)}px;
          grid-template-rows: ${handGridHeight}px;
        }
        
        .player-hand-area > div:nth-child(1) {
          
        }
        .player-cards > div {
          position: relative;
          border: ${handCardSize.borderSize} inset var(--card-spot-border-color);
          border-radius: ${parseFloat(handCardSize.borderRadius) + 2}px !important;
          background-color: var(--card-spot-bg-color);
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .deal-grid > div {
          border: ${props.cardSize.borderSize} inset var(--card-spot-border-color);
          border-radius: ${parseFloat(props.cardSize.borderRadius) + 2}px !important;
          background-color: var(--card-spot-bg-color);
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .deal-grid .stats-area {
          background-color: transparent;
          border: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        }
        .ninth-card {
          width: ${gridWidth}px;
        }
        .total-display {
          postition: absolute;
          box-sizing: border-box;
          font-family: 'Nova Square';
          font-size: ${props.cardSize.height / 4}px;
          border-radius: ${props.cardSize.height / 4}px;
          background-color: black;
          padding: ${props.cardSize.width / 16}px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90%;
        }
        .total-outline {
          width: 100%;
          padding-top: ${props.cardSize.margin};
          padding-bottom: ${props.cardSize.margin};
          border-radius: ${props.cardSize.width / 3}px;
          background-color: transparent;
          border: ${props.cardSize.width / 32}px solid #933500;
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
        .player-portrait-area {
          width: ${handCardSize.height}px;
          height: ${handCardSize.height}px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1vw;
        }
        .turn-indicator-area {
          width: ${handCardSize.height}px;
          height: ${handCardSize.height}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .turn-indicator {
          width: ${props.cardSize.width / 1.35}px;
          height: ${props.cardSize.width / 1.35}px;
          border-radius: 50%;
          background-color: gray;
          border: 1px solid black;
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
          box-sizing: border-box;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin-top: ${gridWidth * 0.2}px;
          justify-self: center;
        }
        .win-symbol-bg {
          box-sizing: border-box;
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          width: ${props.cardSize.height / 5}px;
          height: ${props.cardSize.height / 5}px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: ${props.cardSize.borderSize} solid black;
        }
        .win-symbol {
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          border: ${props.miniCardSize.borderSize} solid #222;
          width: ${props.cardSize.height / 10}px;
          height: ${props.cardSize.height / 10}px;
        }
        .win-symbol-lighted {
          background-color: orange;
        }
      `}
      </style>
      <MoveIndicator />
      <div id='opponent-hand' className='player-hand-area'>
        <div className='player-portrait-area'>
          <PlayerPortrait size={portraitSize} source={props.portraitSources.opponent} spriteIndex={opponentSpriteIndex} displayName={props.playerNames.opponent} type={'mini'} />
        </div>
        <div id='opponent-cards' className='player-cards'>
          <div>{opponentHand[0]}</div>
          <div>{opponentHand[1]}</div>
          <div>{opponentHand[2]}</div>
          <div>{opponentHand[3]}</div>
        </div>
        <div className='turn-indicator-area'>
          <div id='opponent-turn-indicator' className={`turn-indicator ${opponentTurn}`}></div>
        </div>
      </div>
      {/* <div id='grids'> */}
        
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
          <div className='ninth-card'>{opponentGrid[8]}</div>
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
          <div className='ninth-card'>{userGrid[8]}</div>
        </div>
      </div>

      {/* </div> */}
      <div id='user-hand' className='player-hand-area'>
        <div className='player-portrait-area'>
          <PlayerPortrait size={portraitSize} source={props.portraitSources.user} spriteIndex={props.avatarIndex} displayName={props.playerNames.user} type={'mini'} />
        </div>
        <div id='user-cards' className='player-cards'>
          <div>{userHand[0]}</div>
          <div>{userHand[1]}</div>
          <div>{userHand[2]}</div>
          <div>{userHand[3]}</div>
        </div>
        <div className='turn-indicator-area'>
          <div id='user-turn-indicator' className={`turn-indicator ${userTurn}`}></div>
        </div>
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
  portraitSources: PropTypes.object,
  cardSize: PropTypes.object,
  mediumCardSize: PropTypes.object,
  miniCardSize: PropTypes.object,
  onClickCard: PropTypes.func,
  opponentNames: PropTypes.array,
  CPUOpponent: PropTypes.string,
  avatarIndex: PropTypes.number
};

export default GameBoard;




















