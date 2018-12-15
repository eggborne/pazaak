import React from 'react';
import PropTypes from 'prop-types';

function HamburgerMenu(props) {
  return (
    <div id='hamburger-menu'>
      <style jsx>{`
        #hamburger-menu {
          position: absolute;
          width: 60vmin;
          background-color: rgba(0, 0, 0, 0.85);
          right: -60vw;
          bottom: 10vmax;
          font-size: 4vw;
          font-family: 'Nova Square';
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: space-between;
          flex-direction: column;
          transition: right 400ms ease;
          padding: 1rem;
          box-sizing: border-box;
          z-index: 20;
        }
        #hamburger-options-area {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex-grow: 1;
        }
        .mini-option-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 1rem;
        }
        .mini-option-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bungee';
          background-color: var(--option-on-color);
          height: 6vh;
          width: 40%;
          transition: background 200ms ease;
        }
        .hamburger-button {
          position: relative;
          font-size: inherit;
          width: 100%;
          padding: 1rem;
        }
        .hamburger-on {
          right: 0 !important;
        }
      `}</style>
      <div id='hamburger-options-area'>
        <div className='mini-option-row'>
          <div className='mini-option-label'>
            Sound FX
          </div>
          <div onClick={props.onToggleOption} id='hamburger-sound-fx-toggle' className='mini-option-toggle option-off shadowed-text'>OFF</div>
        </div>
        <div className='mini-option-row'>
          <div className='mini-option-label'>
            Ambience
          </div>
          <div onClick={props.onToggleOption} id='hamburger-ambience-toggle' className='mini-option-toggle option-off shadowed-text'>OFF</div>
        </div>
        <div className='mini-option-row'>
          <div className='mini-option-label'>
            Quick Mode
          </div>
          <div onClick={props.onToggleOption} id='hamburger-quick-mode-toggle' className='mini-option-toggle option-off shadowed-text'>OFF</div>
        </div>
        <div className='mini-option-row'>
          <div className='mini-option-label'>
            Dark Theme
          </div>
          <div onClick={props.onToggleOption} id='hamburger-dark-theme-toggle' className='mini-option-toggle option-off shadowed-text'>OFF</div>
        </div>
        <div className='mini-option-row'>
          <div className='mini-option-label'>
            Full Screen
          </div>
          <div onClick={props.onToggleOption} id='hamburger-full-screen-toggle' className='mini-option-toggle option-off shadowed-text'>OFF</div>
        </div>
      </div>
      <div><button onClick={props.onClickHamburgerQuit} id='hamburger-quit-button' className='hamburger-button'>Quit to Main</button></div>
    </div>
  );
}
HamburgerMenu.propTypes = {
  onClickHamburgerQuit: PropTypes.func,
  onToggleOption: PropTypes.func,
};

export default HamburgerMenu;