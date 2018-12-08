
import React from 'react';
import PropTypes from 'prop-types';

function IntroScreen(props) {
  return (
    <div style={props.style} id='intro-screen'>
      <div id='name-input-label' className='shadowed-text' >Player name</div>
      <input name='player-name' id='player-name-input' placeholder='Player'></input>
      <button onClick={props.onClickStart} className='intro-button' id='start-button'>Start Game</button>
      <button onClick={props.onClickOptions} className='intro-button' id='options-button'>Options</button>
      <button onClick={props.onClickHow} className='intro-button' id='how-button'>How to Play</button>
      <button onClick={props.onClickHallOfFame} className='intro-button' id='hall-of-fame-button'>Hall of Fame</button>
    </div>
  );
}
IntroScreen.propTypes = {
  style: PropTypes.object,
  onClickStart: PropTypes.func,
  onClickHow: PropTypes.func,
  onClickOptions: PropTypes.func,
  onClickHallOfFame: PropTypes.func
};

export default IntroScreen;




















