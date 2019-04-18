import React from 'react';
import PropTypes from 'prop-types';

function ResultModal(props) {
  console.big('ResultModal rendering');
  let userScoreStyle = { color: 'white' };
  let opponentScoreStyle = { color: 'white' };
  let winnerStyle = { display: 'none' };
  let scoresStyle = { display: 'block' };
  if (!props.matchOver) {
    if (props.winner === 'user') {
      userScoreStyle = { color: 'green' };
      opponentScoreStyle = { color: 'red' };
    } else if (props.winner === 'opponent') {
      userScoreStyle = { color: 'red' };
      opponentScoreStyle = { color: 'green' };
    }
  } else {
    winnerStyle = { display: 'block' };
    scoresStyle = { display: 'none' };
  }
  return (
    <div id='result-modal' className='red-panel'>
      <style jsx>{`
        #result-modal {
          font-family: var(--title-font);
          box-sizing: border-box;
          position: absolute;
          width: var(--intro-width);
          margin-left: 12.5vmin;
          color: var(--main-text-color);
          border-radius: var(--menu-border-radius);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 2.5rem;
          transform: scale(0.75) translateY(-67.5%);
          opacity: 0;
          transition: transform 600ms ease, opacity 300ms ease;
          will-change: transform, opacity;
          padding: 2vh;
          pointer-events: none;   
          top: calc(50vh - (var(--control-footer-height) /2) + var(--top-margin));
          transform-origin: center center;
          border-color: var(--trans-black-bg-color) !important;
        }
        #result-title {
          font-size: 1.75rem;
          text-align: center;
        }
        #result-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 1.5rem;
          padding: 1rem;
        }
        #result-winner {
          font-size: 1.25rem;
        }
        #result-scores {
          font-size: 1rem;
          text-align: center;
        }
        #result-ok-button, #result-main-menu-button {
          box-sizing: border-box;
          font-size: 1.25rem;
          padding: 1.5rem 2rem 1.5rem 2rem;
          margin-bottom: 0.5rem;
        }
      `}
      </style>
      <div className='shadowed-text' id='result-title'>
        {props.titleText}
      </div>
      <div className='shadowed-text' id='result-body'>
        <div style={winnerStyle} id='result-winner'>{props.winner}</div>
        <div style={scoresStyle} id='result-scores'>
          {props.playerNames.user}: <span style={userScoreStyle}>{props.finalScores.user}</span><br />{props.playerNames.opponent}: <span style={opponentScoreStyle}>{props.finalScores.opponent}</span>
        </div>
      </div>
      <button {...{ [props.clickFunction]: props.onClickResultButton1 }} className='pointer' id='result-ok-button'>{props.buttonText}</button>
      {props.matchOver &&
        <button {...{ [props.clickFunction]: props.onClickResultButton2 }} className='pointer' id='result-main-menu-button'>{props.buttonText2}</button>
      }
    </div>
  );
}

ResultModal.propTypes = {
  titleText: PropTypes.string,
  playerNames: PropTypes.object,
  winner: PropTypes.string,
  matchOver: PropTypes.bool,
  finalScores: PropTypes.object,
  buttonText: PropTypes.string,
  buttonText2: PropTypes.string,
  onClickResultButton1: PropTypes.func,
  onClickResultButton2: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps.matchOver === nextProps.matchOver;
}

export default ResultModal;
// export default React.memo(ResultModal, areEqual);