
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CardBack from './CardBack';
import MoveIndicator from './MoveIndicator';
import PlayerPortrait from './PlayerPortrait';
import TurnIndicator from './TurnIndicator';

class GameBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // playerNames: { user: this.props.playerNames.user, opponent: this.props.playerNames.opponent },
      // userHand: [],
      // opponentHand: [],
      // userGrid: [],
      // opponentGrid: [],
      // handCardSize: 0,
    };        
    this.readyToStartGame = false;
    console.error('CONSTRUCTED GAMEBOARD');
  }

  componentDidMount() {
    // document.getElementById('hamburger-menu').addEventListener('transitionend', () => {
    //   document.getElementById('hamburger-menu').transition = 'none';
    //   console.log('transition ended!');      
    // });
    setTimeout(() => {
      document.getElementById('game-board').style.opacity = 1;
      document.getElementById('game-board').style.transform = 'none';
    }, 10);
    setTimeout(() => {
      this.readyToStart = true;
      this.forceUpdate();
    }, 600);
  }

  // shouldComponentUpdate(nextProps) {
  //   return (
  //     nextProps.turn != this.props.turn
  //     || nextProps.grids.user.length != this.props.grids.user.length
  //     || nextProps.grids.opponent.length != this.props.grids.opponent.length
  //     || nextProps.hands.user.length != this.props.hands.user.length
  //     || nextProps.hands.opponent.length != this.props.hands.opponent.length
  //     || nextProps.totals.user != this.props.totals.user
  //     || nextProps.totals.opponent != this.props.totals.opponent
  //   );
  // }

  render() {
    console.big('Rendering GameBoard', 'forestgreen');
    let userWins = ['', '', ''];
    let opponentWins = ['', '', ''];
    if (this.props.wins.user === 1) {
      userWins[0] = 'win-symbol-lighted';
    }
    if (this.props.wins.user === 2) {
      userWins[0] = userWins[1] = 'win-symbol-lighted';
    }
    if (this.props.wins.opponent === 1) {
      opponentWins[0] = 'win-symbol-lighted';
    }
    if (this.props.wins.opponent === 2) {
      opponentWins[0] = opponentWins[1] = 'win-symbol-lighted';
    }
    let userTurn = '';
    let opponentTurn = '';
    if (this.props.turn === 'user') {
      if (this.props.turnStatus.user.standing) {
        userTurn = 'standing';
      } else {
        userTurn = 'turn-lighted';
      }
      if (this.props.turnStatus.opponent.standing) {
        opponentTurn = 'standing';
      }
    } else if (this.props.turn === 'opponent') {
      if (this.props.turnStatus.opponent.standing) {
        opponentTurn = 'standing';
      } else {
        opponentTurn = 'turn-lighted';
      }
      if (this.props.turnStatus.user.standing) {
        userTurn = 'standing';
      }
    }
    if (document.getElementById('end-turn-button')) {
      if (this.props.turnStatus.opponent.standing && !this.props.turnStatus.user.highlightedCard.element) {
        document.getElementById('end-turn-button').innerHTML = 'Draw';
      } else if (this.props.turnStatus.user.highlightedCard.element) {
        document.getElementById('end-turn-button').innerHTML = 'Play Card';
      } else {
        document.getElementById('end-turn-button').innerHTML = 'End Turn';
      }
    }
    let opponentGrid = [];
    let userGrid = [];
    this.props.grids.opponent.map((card, i) => {
      opponentGrid.push(<Card key={i} id={card.id} context={'opponent-grid'} size={'normal'} value={card.value} type={card.type} clickFunction={this.props.clickFunction} />);
    });
    this.props.grids.user.map((card, i) => {
      userGrid.push(<Card key={i} id={card.id} context={'user-grid'} size={'normal'} value={card.value} type={card.type} clickFunction={this.props.clickFunction} />);
    });
    let cardWidth = 'var(--normal-card-width)';
    let cardHeight = 'var(--normal-card-height)';
    let cardRadius = `calc(${cardWidth} / 18)`;
    let cardBorder = `calc(${cardHeight} / 100)`;

    let gridWidth = cardWidth;
    let gridHeight = cardHeight;
    let handCardSize = 'medium';

    let actualCardWidth = window.getComputedStyle(document.documentElement).getPropertyValue('--normal-card-width');
    let cardsPerWidth = (window.innerWidth * 0.9) / (parseFloat(actualCardWidth) * 0.875);
    console.log('cardsPerWidth', cardsPerWidth);
    let portraitSize =  parseFloat(actualCardWidth) * 1.1;
    if (cardsPerWidth >= 6.4) {
      console.info('okay for medium - cardsPerWidth', cardsPerWidth);
      handCardSize = 'medium';
      if (cardsPerWidth) {

      }
    } else {
      portraitSize =  parseFloat(actualCardWidth) * 0.9;
      handCardSize = 'mini';
      console.info('too big - cardsPerWidth', cardsPerWidth);
    }
    let userHand = [];
    let opponentHand = [];
    this.props.hands.opponent.map((card, i) => {
      opponentHand.push(<CardBack key={i} context={'opponent-hand'} size={handCardSize} />);
    });
    this.props.hands.user.map((card, i) => {
      userHand.push(<Card key={i} id={card.id} context={'user-hand'} size={handCardSize} value={card.value} type={card.type}
        onClickCard={this.props.onClickCard} clickFunction={this.props.clickFunction} />);
    });
    let handCardWidth = `var(--${handCardSize}-card-width)`;
    let handCardHeight = `var(--${handCardSize}-card-height)`;
    let handGridWidth = handCardWidth;
    let handGridHeight = handCardHeight;
    
    // let portraitSize = Math.round(parseInt(handCardSize.width * 1.75));
    let opponentPortraitIndex = this.props.opponentNames.indexOf(this.props.cpuOpponent);

    return (
      <div id='game-board'>
        <style jsx>{`
        #game-board {
          box-sizing: border-box;
          position: absolute;
          top: var(--header-height);
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: var(--inner-height);
          z-index: 0;          
          transform: scale(0.4);
          opacity: 0;
          display: flex;
          transition: transform 600ms ease-out, opacity 300ms ease-out;
          will-change: transform, opacity;
        }
        .player-area {
          box-sizing: border-box;
          display: inline-flex;          
          justify-content: center;
          width: 100%;
          flex-grow: 1;
          padding-top: var(--menu-border-width);
          padding-bottom: var(--menu-border-width);
          //background: plum !important;
          //transition: background-color 800ms ease;
        }
        .player-hand-area {
          box-sizing: border-box;
          display: inline-flex;
          justify-content: center;          
          align-items: center;
          width: 100%;  
          flex-grow: 1;
          padding-top: var(--menu-border-width);
          padding-bottom: var(--menu-border-width);
          transition: background-color 800ms ease;

          //background: purple !important;
        }        
        #user-area, #user-hand {
          background-color: ${this.readyToStart && 'var(--trans-blue-bg-color)'};
        }        
        #opponent-area, #opponent-hand {
          background-color: ${this.readyToStart && 'var(--trans-red-bg-color)'};
        }
        #opponent-area {
          border-bottom: calc(var(--menu-border-width) / 6) solid #222;
          //border-bottom: 1px solid red;
        }
        #user-area {
          border-top: calc(var(--menu-border-width) / 6) solid #333;
          //border-top: 1px solid #5f5;
          //background: green !important;
        }
        .deal-grid {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: ${gridWidth} ${gridWidth} ${gridWidth} ${gridWidth} ${gridWidth};
          grid-template-rows: ${gridHeight} ${gridHeight};
          grid-column-gap: calc(var(--menu-border-width));
          grid-row-gap: calc(var(--menu-border-width));
          align-self: center;
        }
        .player-cards {
          display: grid;
          grid-template-columns: ${handCardWidth} ${handCardWidth} ${handCardWidth} ${handCardWidth};
          grid-template-rows: ${handCardHeight};
          grid-column-gap: calc(var(--menu-border-width) / 2);
          align-items: center;
        }
        .player-cards > div {
          
          border-radius: calc(${cardRadius} * 1.25) !important;
          background-color: var(--card-spot-bg-color);
          display: flex;
          box-sizing: content-box;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .deal-grid > div {
          border-radius: calc(${cardRadius} * 1.25) !important;
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
          box-sizing: border-box;
          font-size: calc(${cardHeight} / 4);
          border-radius: calc(${cardHeight} / 4);
          background-color: black;
          padding: calc(${cardWidth} / 16);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90%;
        }
        .total-outline {
          width: 100%;
          padding-top: var(--card-buffer-size);
          padding-bottom: var(--card-buffer-size);
          border-radius: calc(${cardWidth} * 3);
          background-color: transparent;
          border: ${cardRadius} solid #933500;
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
        .turn-indicator-area, .portrait-area {
          width: ${handGridHeight};
          height: ${handGridHeight};
          display: flex;          
          align-items: center;
          justify-content: center;
          padding-left: 0.5vw;
          padding-right: 0.5vw;
        }
        .win-symbol-area {
          box-sizing: border-box;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin-top: ${gridWidth * 0.2}px;
          //justify-self: center;
        }
        .win-symbol-bg {
          box-sizing: border-box;
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          width: calc(${cardHeight} / 5);
          height: calc(${cardHeight} /5);
          display: flex;
          align-items: center;
          justify-content: center;
          border: ${cardBorder} solid black;
        }
        .win-symbol {
          border-radius: 50%;
          background-color: rgb(163, 163, 163);
          border: var(--card-buffer-size) solid #222;
          width: calc(${cardHeight} / 10);
          height: calc(${cardHeight} / 10);
        }
        .win-symbol-lighted {
          background-color: orange;
        }
      `}
        </style>
        <MoveIndicator />
        <div id='opponent-hand' className='player-hand-area'>          
          <div className='portrait-area'>
            <PlayerPortrait size={portraitSize} cpu={true} spriteIndex={opponentPortraitIndex} displayName={this.props.playerNames.opponent} type={'mini'} />
          </div>
          <div id='opponent-cards' className='player-cards'>
            <div>{opponentHand[0]}</div>
            <div>{opponentHand[1]}</div>
            <div>{opponentHand[2]}</div>
            <div>{opponentHand[3]}</div>
          </div>
          <div className='turn-indicator-area'>
            <TurnIndicator status={opponentTurn} />
          </div>
        </div>
        <div id='opponent-area' className='player-area'>
          <div id='opponent-grid' className='deal-grid'>
            <div>{opponentGrid[0]}</div>
            <div>{opponentGrid[1]}</div>
            <div>{opponentGrid[2]}</div>
            <div>{opponentGrid[3]}</div>
            <div className='stats-area'>
              <div className='total-display'>
                <div id='opponent-total-outline' className='total-outline'>
                  <div id='opponent-total'>{this.props.totals.opponent}</div>
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
                  <div id='user-total'>{this.props.totals.user}</div>
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
        <div id='user-hand' className='player-hand-area'>
          <div className='portrait-area'>
            <PlayerPortrait size={portraitSize} spriteIndex={this.props.avatarIndex} displayName={this.props.playerNames.user} type={'mini'} />
          </div>
          <div id='user-cards' className='player-cards'>
            <div>{userHand[0]}</div>
            <div>{userHand[1]}</div>
            <div>{userHand[2]}</div>
            <div>{userHand[3]}</div>
          </div>
          <div className='turn-indicator-area'>
            <TurnIndicator status={userTurn} />
          </div>
        </div>
      </div>
    );
  }
}
GameBoard.propTypes = {
  phase: PropTypes.string,
  hands: PropTypes.object,
  grids: PropTypes.object,
  totals: PropTypes.object,
  wins: PropTypes.object,
  turn: PropTypes.string,
  turnStatus: PropTypes.object,
  playerNames: PropTypes.object,
  portraitSources: PropTypes.object,
  onClickCard: PropTypes.func,
  opponentNames: PropTypes.array,
  cpuOpponent: PropTypes.string,
  avatarIndex: PropTypes.number,
  clickFunction: PropTypes.string
};

export default GameBoard;




















