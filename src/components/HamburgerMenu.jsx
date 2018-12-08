import React from 'react';
import PropTypes from 'prop-types';

function HamburgerMenu(props) {
  return (
    <div id='hamburger-menu'>
      {/* <div><button onClick={props.onClickHamburgerOptions} id='hamburger-options-button' className='hamburger-button'>Options</button></div> */}
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