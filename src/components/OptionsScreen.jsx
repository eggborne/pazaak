
import React from 'react';
import PropTypes from 'prop-types';

function OptionsScreen(props) {
  return (
    <div style={props.style} id='options-screen'>
      <div className='options-instructions-title shadowed-text'>Options</div>
      <div id='options' className='shadowed-text'>
        <div id='options-grid'>
          <div className='option-label'>Sound FX</div><div onClick={props.onToggleOption} id='sound-fx-toggle' className='option-toggle option-off'>OFF</div>
          <div className='option-label'>Ambience</div><div onClick={props.onToggleOption} id='ambience-toggle' className='option-toggle option-off'>OFF</div>
          <div className='option-label'>Quick Mode</div><div onClick={props.onToggleOption} id='quick-mode-toggle' className='option-toggle option-off'>OFF</div>
          <div className='option-label'>Dark Theme</div><div onClick={props.onToggleOption} id='dark-theme-toggle' className='option-toggle option-off'>OFF</div>
          <div className='option-label'>Full Screen</div><div onClick={props.onToggleOption} id='full-screen-toggle' className='option-toggle option-off'>OFF</div>
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
  onToggleOption: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default OptionsScreen;




















