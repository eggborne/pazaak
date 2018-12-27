import React from 'react';
import PropTypes from 'prop-types';
let Util = require('../scripts/util');

function HamburgerMenu(props) {
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
  if (props.currentOptions.opponentMoveWaitTime !== 1600) {
    quickModeOption = 'option-on';
  }
  if (props.currentOptions.darkTheme) {
    darkThemeOption = 'option-on';
  }
  if (Util.isFullScreen()) {
    fullScreenOption = 'option-on';
  }
  return (
    <div id='hamburger-menu'>
      <style jsx>{`
        #hamburger-menu {
          position: fixed;
          height: 56vh;
          background-color: var(--red-bg-color);
          right: 0;
          bottom: 10vmax;
          font-size: 4.5vw;
          font-family: 'Nova Square';    
          padding: 3vw 4vw 3vw 2vw;
          box-sizing: border-box;
          border: 0.5vw solid var(--dark-red-bg-color);
          border-bottom: 0;
          border-radius: 0.5rem 0 0 0;
          z-index: 30;
          transform: translateX(100%);
          transition: transform 300ms ease;
        }
        #hamburger-options-grid {
          height: 100%;
          display: grid;
          grid-template-columns: 32vw 26vw;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1.5fr;
          grid-row-gap: 2vw;
          box-sizing: border-box;
        }
        .mini-option-label {
          border: 1px solid var(--dark-red-bg-color);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.5rem;
          background-color: rgba(0, 0, 0, 0.1);
        }
        .mini-option-toggle {
          border: 1px solid #222;
          font-size: 1.25em;
          font-family: 'Bungee';
          line-height: 100%;
          background-color: var(--option-on-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          transition: background 200ms ease;
          width: 90%;
          height: 100%;
          justify-self: end;
        }
        #hamburger-button-area {
          grid-column-start: 1;
          grid-column-end: 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hamburger-button {
          position: relative;
          font-size: 2.5vh;
          width: 100%;
          height: 100%;
          margin-top: 2vw;
          margin-bottom: 0;
        }
        .hamburger-on {
          transform: translateX(0) !important;
        }
      `}</style>
      <div className='shadowed-text' id='hamburger-options-grid'>
        <div className='mini-option-label'> Sound FX </div>
        <div onClick={props.onToggleOption} id='hamburger-sound-fx-toggle' className={`mini-option-toggle ${soundOption}`}></div>
        <div className='mini-option-label'>Ambience </div>
        <div onClick={props.onToggleOption} id='hamburger-ambience-toggle' className={`mini-option-toggle ${ambientOption}`}></div>
        <div className='mini-option-label'> Quick Mode </div>
        <div onClick={props.onToggleOption} id='hamburger-quick-mode-toggle' className={`mini-option-toggle ${quickModeOption}`}></div>
        <div className='mini-option-label'> Dark Theme </div>
        <div onClick={props.onToggleOption} id='hamburger-dark-theme-toggle' className={`mini-option-toggle ${darkThemeOption}`}></div>
        <div className='mini-option-label'> Full Screen </div>
        <div onClick={props.onToggleOption} id='hamburger-full-screen-toggle' className={`mini-option-toggle ${fullScreenOption}`}></div>
        <div id='hamburger-button-area'>
          <button onClick={props.onClickHamburgerQuit} id='hamburger-quit-button' className='hamburger-button'>Quit to Main Menu</button>
        </div>
      </div>
    </div>
  );
}
HamburgerMenu.propTypes = {
  currentOptions: PropTypes.object,
  onClickHamburgerQuit: PropTypes.func,
  onToggleOption: PropTypes.func,
};

export default HamburgerMenu;