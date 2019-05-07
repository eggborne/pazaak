import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from '../PlayerPortrait';
import Card from '../Card';

function ResultModal(props) {
  console.info('ResultModal rendering', props);
  let userScoreStyle = { color: 'white' };
  let opponentScoreStyle = { color: 'white' };
  let scoresStyle = { display: 'flex' };
  if (!props.matchOver) {
    if (props.winner === 'user') {
      userScoreStyle = { color: 'green' };
      opponentScoreStyle = { color: 'red' };
    } else if (props.winner === 'opponent') {
      userScoreStyle = { color: 'red' };
      opponentScoreStyle = { color: 'green' };
    }
  } else {
    scoresStyle = { display: 'none' };
  }
  let portraitSize = window.innerHeight / 8;
  let winnerIndex = props[`${props.winner}Index`] || 0;
  let winnerName = props.playerNames[props.winner] || null;
  return (
    <div id='result-modal' className='red-panel'>
      <style jsx>{`
        #result-modal {
          font-family: var(--title-font);
          box-sizing: border-box;
          position: absolute;
          width: var(--intro-width);
          min-height: 50vh;
          margin-left: 12.5vmin;
          color: var(--main-text-color);
          border-radius: var(--menu-border-radius);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: space-between;
          padding: 1vh;
          transform: scale(0.9);
          opacity: 0;
          pointer-events: none;   
          transform-origin: center center;
          border-color: var(--trans-black-bg-color) !important;
          transition: transform 600ms ease, opacity 300ms ease;
          will-change: transform, opacity;
        }
        #result-title {
          width: 100%;
          font-size: 2rem;
          display: flex;
          justify-content: ${props.matchOver ? 'space-between' : 'center'};
          align-items: center;
          background: var(--trans-black-bg-color);
          border-color: var(--trans-black-bg-color) !important;
          flex-grow: 1;
          line-height: 100%;
          padding: calc(var(--menu-border-radius) * 2);
        }
        #result-body {
          display: flex;
          flex-direction: column;
          justify-content: end;
          font-size: 1.5rem;
          flex-grow: 1;
        }
        #result-winner {
          font-size: 1.25rem;
        }
        #result-scores {
          flex-direction: column;
          font-family: var(--main-font);
          font-size: 1rem;
          align-items: center;
          justify-content: space-around;
          flex-grow: 1;
          padding: 2vw;
        }
        #result-prize {
          display: grid;
          grid-template-columns: 0.7fr 0.3fr;
          grid-template-rows: 0.25fr 0.25fr 0.5fr;
          align-items: center;
          padding: 3vw;
        }
        #result-prize > div {
          
        }
        #prize-card-list {
          display: flex;
        }
        #result-button-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--trans-black-bg-color);
          border-color: var(--trans-black-bg-color) !important;
          flex-grow: 2;
          padding: calc(var(--menu-border-radius) * 2);
        }
        #result-ok-button, #result-main-menu-button {
          box-sizing: border-box;
          font-size: 1.25rem;
          padding: 1.5rem 2rem 1.5rem 2rem;
        }
        #result-ok-button {          
          margin-bottom: ${props.matchOver && '2vh'};
        }
        #credits-label, #cards-label {
          font-family: var(--main-font);
          font-size: 4vw;
        }
        #prize-amount {
          color: ${props.winner === 'user' ? 'green' : 'red'}
        }
        #result-modal.modal-on {
          transform: scale(1) !important;
          pointer-events: all !important;
          opacity: 1 !important;
        }
      `}
      </style>
      <div className='shadowed-text inner-red-panel' id='result-title'>
        <div>{props.titleText}</div>
        {props.titleText === 'MATCH\nWINNER' &&
          <div>
            <PlayerPortrait cpu={props.winner === 'opponent'} size={portraitSize} spriteIndex={winnerIndex} displayName={winnerName} type={'mini'} />
          </div>
        }
      </div>
      <div className='shadowed-text' id='result-body'>
        <div style={scoresStyle} id='result-scores'>
          <div>{props.playerNames.user}: <span style={userScoreStyle}>{props.finalScores.user}</span></div>
          <div>{props.playerNames.opponent}: <span style={opponentScoreStyle}>{props.finalScores.opponent}</span></div>
        </div>
        {props.titleText === 'MATCH\nWINNER' &&
          <div id='result-prize'>
            <div id='credits-label'>Credits {props.winner === 'user' ? 'won:' : 'lost:'}</div>
            <div id='prize-amount'>{props.currentWager}</div>
            {props.winner === 'user' &&
            <>
              <div id='cards-label'>Cards won:</div>
              <div id='prize-card-list'>
                {props.prizeCards.length > 0 && props.prizeCards.map((card, i) => {
                  // let card = prizeCards[cardIndex];
                  console.info('doing cardindex', i);
                  console.info('doing card', card);
                  let cardName = `value|${card.value} type|${card.type}`;
                  return (
                    <div key={i}>
                      <Card clickFunction={() => null} id={i} context={'prize-card'} size={'prize'} value={card.value} type={card.type} />
                    </div>);
                })}
              </div>
            </>
            }
          </div>
        }
      </div>
      <div id='result-button-area' className='inner-red-panel'>
        {!props.matchOver && <button {...{ [props.clickFunction]: props.onClickResultButton1 }} className='pointer' id='result-ok-button'>{props.buttonText}</button>}
        {props.matchOver &&
          <button {...{ [props.clickFunction]: props.onClickResultButton2 }} className='pointer' id='result-main-menu-button'>{props.buttonText2}</button>
        }
      </div>
    </div>
  );
}

ResultModal.propTypes = {
  titleText: PropTypes.string,
  playerNames: PropTypes.object,
  winner: PropTypes.string,
  currentTurn: PropTypes.string,
  matchOver: PropTypes.bool,
  finalScores: PropTypes.object,
  buttonText: PropTypes.string,
  buttonText2: PropTypes.string,
  userIndex: PropTypes.number,
  opponentIndex: PropTypes.number,
  onClickResultButton1: PropTypes.func,
  onClickResultButton2: PropTypes.func,
  currentWager: PropTypes.number,
  prizeCards: PropTypes.array,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest =
    prevProps.currentTurn == nextProps.currentTurn
    && prevProps.titleText == nextProps.titleText
    && prevProps.winner == nextProps.winner
    ;
  console.log('ResultModal equal:', equalTest);
  return nextProps.currentTurn === null;
}

// export default ResultModal;
export default React.memo(ResultModal, areEqual);