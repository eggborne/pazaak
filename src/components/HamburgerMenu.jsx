import React from 'react';
import PropTypes from 'prop-types';
import { isFullScreen } from '../scripts/util';

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
  if (isFullScreen() || props.currentOptions.fullScreen) {
    fullScreenOption = 'option-on';
  }
  return (
    <div id='hamburger-menu'>
      <style jsx>{`
        #hamburger-menu {
          position: absolute;
          box-sizing: border-box;
          height: 50vh;
          //height: calc(100vh - var(--header-height) - var(--control-footer-height) + var(--menu-border-width));
          background-color: var(--red-bg-color);
          right: 0;
          bottom: calc(var(--control-footer-height) - var(--menu-border-width));
          font-size: var(--small-font-size);
          font-family: var(--main-font);    
          padding: 1.5vw 1.5vw calc(1.5vw + var(--menu-border-width)) 1.5vw;
          padding-bottom: 0;
          border-top-left-radius: var(--menu-border-radius);
          //border-top-right-radius: var(--menu-border-radius);
          border: var(--menu-border);
          border-right: 0;
          border-bottom: 0;
          //border-bottom-color: var(--dark-red-bg-color);
          z-index: 0;
          //transform: translateX(100%);
          transform: var(--hamburger-off-state);
          //transition: transform 400ms ease;
          display: flex;
          align-items: flex-end;
          will-change: transform;
        }
        #hamburger-options-grid {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          //grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr 1.5fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1.5fr;
          grid-row-gap: 1vh;
          box-sizing: border-box;
          //background-color: var(--medium-red-bg-color);
          border-radius: var(--menu-border-width) var(--menu-border-width) 0 0;          
          padding: 1.5vh;
          padding-bottom: calc(3vw + var(--menu-border-width));
          border: 1px solid var(--dark-red-bg-color);
          border-bottom: 0;
        }
        #mini-options-title {
          justify-self: center;
          align-self: center;
          line-height: 100%;
          grid-column-start: 0;
          grid-column-end: span 2;
          font-family: var(--title-font);
          font-size: 4vh;
        }
        .mini-option-toggle {
          border: 1px solid;
          border-radius: var(--menu-border-width);         
        }
        .mini-option-label {
          border-radius: var(--menu-border-width);
          box-sizing: border-box;
          border: 1px solid var(--dark-red-bg-color);
          //width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          //justify-content: center;         
          background-color: var(--medium-red-bg-color);
          padding: 1vh 3vw 1vh 3vw;
        }
        .mini-option-toggle {
          border-color: #222;
          font-size: 3.25vh;
          font-family: var(--title-font);
          line-height: 100%;
          background-color: var(--option-on-color);
          display: flex;
          align-items: center;
          justify-content: center;
          justify-self: end;
          transition: background-color 300ms ease;
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
          //position: relative;
          font-size: var(--small-font-size);
          width: 100%;
          height: 100%;
          margin-top: 2vw;
          margin-bottom: 0;
          color: var(--option-off-color);     
          border-color: var(--dark-red-bg-color);        
        }
        .hamburger-on {
          transform: none !important;
        }
      `}</style>
      <div className='shadowed-text' id='hamburger-options-grid'>
        {/* <div id='mini-options-title'>Options</div> */}
        <div className='mini-option-label'> Sound FX </div>
        <div {...{[props.clickFunction]: props.onToggleOption}} id='hamburger-sound-fx-toggle' className={`mini-option-toggle ${soundOption}`}></div>
        <div className='mini-option-label'>Ambience </div>
        <div {...{[props.clickFunction]: props.onToggleOption}} id='hamburger-ambience-toggle' className={`mini-option-toggle ${ambientOption}`}></div>
        <div className='mini-option-label'> Quick Mode </div>
        <div {...{[props.clickFunction]: props.onToggleOption}} id='hamburger-quick-mode-toggle' className={`mini-option-toggle ${quickModeOption}`}></div>
        <div className='mini-option-label'> Dark Theme </div>
        <div {...{[props.clickFunction]: props.onToggleOption}} id='hamburger-dark-theme-toggle' className={`mini-option-toggle ${darkThemeOption}`}></div>
        <div className='mini-option-label'> Full Screen </div>
        <div onClick={props.onToggleOption} id='hamburger-full-screen-toggle' className={`mini-option-toggle ${fullScreenOption}`}></div>
        <div id='hamburger-button-area'>
          <button {...{[props.clickFunction]: props.onClickHamburgerQuit}} id='hamburger-quit-button' className='hamburger-button'>Quit to Main Menu</button>
        </div>
      </div>
    </div>
  );
}
HamburgerMenu.propTypes = {
  currentOptions: PropTypes.object,
  onClickHamburgerQuit: PropTypes.func,
  onToggleOption: PropTypes.func,
  clickFunction: PropTypes.string
};

// export default HamburgerMenu;
export default React.memo(HamburgerMenu);