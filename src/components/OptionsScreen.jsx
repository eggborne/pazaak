
import React from 'react';
import PropTypes from 'prop-types';
let Util = require('../scripts/util');

function OptionsScreen(props) {
  let soundOption = 'option-off';
  let ambientOption = 'option-off';
  let quickModeOption = 'option-off';
  let darkThemeOption = 'option-off';
  let fullScreenOption = 'option-off';
  if (props.currentOptions.sound) {
    soundOption = 'option-on'
  }
  if (props.currentOptions.ambience) {
    ambientOption = 'option-on'
  }
  if (props.currentOptions.opponentMoveWaitTime !== 1600) {
    quickModeOption = 'option-on'
  }
  if (props.currentOptions.darkTheme) {
    darkThemeOption = 'option-on'
  }
  if (Util.isFullScreen()) {
    fullScreenOption = 'option-on';
  }
  return (
    <div style={props.style} id='options-screen'>
      <div className='options-instructions-title shadowed-text'>Options</div>
      <div id='options' className='shadowed-text'>
        <div id='options-grid'>
          <div className='option-label'>Sound FX</div><div onClick={props.onToggleOption} id='sound-fx-toggle' className={`option-toggle ${soundOption}`}></div>
          <div className='option-label'>Ambience</div><div onClick={props.onToggleOption} id='ambience-toggle' className={`option-toggle ${ambientOption}`}></div>
          <div className='option-label'>Quick Mode</div><div onClick={props.onToggleOption} id='quick-mode-toggle' className={`option-toggle ${quickModeOption}`}></div>
          <div className='option-label'>Dark Theme</div><div onClick={props.onToggleOption} id='dark-theme-toggle' className={`option-toggle ${darkThemeOption}`}></div>
          <div className='option-label'>Full Screen</div><div onClick={props.onToggleOption} id='full-screen-toggle' className={`option-toggle ${fullScreenOption}`}></div>
        </div>
      </div>
      <div className='option-footer'>
        <button onClick={(event) => props.onClickBack(event, 'splashScreen')} className='back-button' id='options-back-button'>Back</button>
      </div>
    </div>
  );
}
OptionsScreen.propTypes = {
  style: PropTypes.object,
  currentOptions: PropTypes.object,
  onToggleOption: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default OptionsScreen;




















