// import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function ResultModal(props) {
  let userScoreStyle = { color: 'white' };
  let opponentScoreStyle = { color: 'white' };
  let winnerStyle = { display: 'none' };
  let scoresStyle = { display: 'block' };
  if (!props.roundOver) {
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
      <div className='shadowed-text' id='result-title'>
        {props.titleText}
      </div>
      <div className='shadowed-text' id='result-body'>
        <div style={winnerStyle} id='result-winner'>{props.winner}</div>
        <div style={scoresStyle} id='result-scores'>
          {props.playerNames.user}: <span style={userScoreStyle}>{props.finalScores.user}</span><br />{props.playerNames.opponent}: <span style={opponentScoreStyle}>{props.finalScores.opponent}</span>
        </div>
      </div>
      <button onClick={props.onClickOKButton} id='ok-button'>{props.buttonText}</button>
    </div>
  );
}

ResultModal.propTypes = {
  titleText: PropTypes.string,
  playerNames: PropTypes.object,
  winner: PropTypes.string,
  roundOver: PropTypes.bool,
  finalScores: PropTypes.object,
  buttonText: PropTypes.string,
  onClickOKButton: PropTypes.func
};


export default ResultModal;