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
    <div id='result-modal'>
      <style jsx>{`
        #result-modal {
          font-family: var(--title-font);
          box-sizing: border-box;
          position: absolute;
          width: 75vmin;
          margin-left: 12.5vmin;
          color: var(--main-text-color);
          border-radius: var(--menu-border-radius);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          line-height: 2.5rem;
          transform: translateY(-95vw);
          opacity: 0;
          transition: transform 600ms ease, opacity 300ms ease;
          will-change: transform, opacity;
          padding: 2vh;
          pointer-events: none;
          box-shadow:
          -2px -2px 0 #000,  
          2px -2px 0 #000,
          -2px 2px 0 #000,
            1px 1px 2px #000;
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
        #result-ok-button {
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
      <button {...{[props.clickFunction]: props.onClickOKButton}} className='balls' id='result-ok-button'>{props.buttonText}</button>
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
  onClickOKButton: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps.matchOver === nextProps.matchOver;
}

export default ResultModal;
// export default React.memo(ResultModal, areEqual);