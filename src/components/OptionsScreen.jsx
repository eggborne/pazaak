
import React from 'react';
import PropTypes from 'prop-types';
import { isFullScreen } from '../scripts/util';

function OptionsScreen(props) {
  let soundOption = 'option-off';
  let ambientOption = 'option-off';
  let quickModeOption = 'option-off';
  let darkThemeOption = 'option-off';
  let fullScreenOption = 'option-off';
  if (props.currentOptions.sound) {
    soundOption = 'option-on';
  }
  if (props.currentOptions.ambience) {
    ambientOption = 'option-on';
  }
  if (props.currentOptions.opponentMoveWaitTime === 300) {
    quickModeOption = 'option-on';
  }
  if (props.currentOptions.darkTheme) {
    darkThemeOption = 'option-on';
  }
  if (isFullScreen()) {
    fullScreenOption = 'option-on';
  }
  return (
    <div id='options-screen'>
      <style jsx>{`
        #options-screen {
          background-color: var(--trans-blue-bg-color);
          font-size: 2.75vh;
          font-family: 'Bungee';
          line-height: 100%;
          align-items: center;
          justify-content: space-between;
        }
        #options {
          box-sizing: border-box;
          padding: 15vw;
          display: flex;
          flex-grow: 1;
          width: 100%;
        }
        #options-grid {
          position: relative;
          box-sizing: border-box;
          display: grid;
          width: 100vw;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
          align-items: center;
          flex-grow: 1;
        }
        .option-label {
          width: 100%;
        }
        .option-toggle {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
          background-color: var(--option-on-color);
          font-size: 2rem;
          border-radius: 0.25rem;
          transition: background 200ms ease;
          content: 'OFF';
          justify-self: end;
          width: 80%;
          height: 80%;
        }
      `}</style>
      <div className='options-instructions-title shadowed-text'>Options</div>
      <div id='options' className='shadowed-text'>
        <div id='options-grid'>
          <div className='option-label'>Sound FX</div><div {...{ [props.clickFunction]: props.onToggleOption }} id='sound-fx-toggle' className={`option-toggle ${soundOption}`}></div>
          <div className='option-label'>Ambience</div><div {...{ [props.clickFunction]: props.onToggleOption }} id='ambience-toggle' className={`option-toggle ${ambientOption}`}></div>
          <div className='option-label'>Quick Mode</div><div {...{ [props.clickFunction]: props.onToggleOption }} id='quick-mode-toggle' className={`option-toggle ${quickModeOption}`}></div>
          <div className='option-label'>Dark Theme</div><div {...{ [props.clickFunction]: props.onToggleOption }} id='dark-theme-toggle' className={`option-toggle ${darkThemeOption}`}></div>
          <div className='option-label'>Full Screen</div><div onClick={props.onToggleOption} id='full-screen-toggle' className={`option-toggle ${fullScreenOption}`}></div>
        </div>
      </div>
      <div className='pre-footer'>
        <div></div>
        <button {...{ [props.clickFunction]: props.onClickBack }} className='ready-button' id='options-back-button'>Back</button>
        <div></div>
      </div>
    </div>
  );
}
OptionsScreen.propTypes = {
  style: PropTypes.object,
  currentOptions: PropTypes.object,
  onToggleOption: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default OptionsScreen;




















