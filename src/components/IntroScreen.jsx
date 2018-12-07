
import React from 'react';
import PropTypes from 'prop-types';

function IntroScreen(props) {
  return (
    <div style={props.style} id='intro-screen'>
      <button onClick={props.onClickStart} className='intro-button' id='start-button'>Start Game</button>
      <button onClick={props.onClickHow} className='intro-button' id='how-button'>How to Play</button>
      <button onClick={props.onClickOptions} className='intro-button' id='options-button'>Options</button>
    </div>
  );
}
IntroScreen.propTypes = {
  style: PropTypes.object,
  onClickStart: PropTypes.func,
  onClickHow: PropTypes.func,
  onClickOptions: PropTypes.func
};

export default IntroScreen;




















