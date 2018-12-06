import style from '../css/styles.css';
import React from 'react';
import PropTypes from 'prop-types';

function ResultModal(props) {

  return (
    <div id='result-modal'>
      <div className='shadowed-text' id='result-title'>
        {props.titleText}
      </div>
      <div className='shadowed-text' id='result-body'>
        {props.winner}
      </div>
      <button onClick={(event) => props.onClickOKButton(event)} id='ok-button'>{props.buttonText}</button>
    </div>
  );
}

ResultModal.propTypes = {
  titleText: PropTypes.string,
  winner: PropTypes.string,
  buttonText: PropTypes.string,
  onClickOKButton: PropTypes.string
};


export default ResultModal;