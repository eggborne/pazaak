import React from 'react';
import PropTypes from 'prop-types';
import OptionsPanel from './OptionsPanel';
import { isFullScreen } from '../scripts/util';

function HamburgerMenu(props) {
  return (
    <div id="hamburger-menu" className='red-panel'>
      <style jsx>{`
        #hamburger-menu {
          position: absolute;
          box-sizing: border-box;
          right: 0;
          bottom: calc(var(--control-footer-height) - var(--menu-border-radius));
          //bottom: calc(var(--control-footer-height));
          font-size: var(--small-font-size);
          font-family: var(--main-font);
          padding-bottom: calc(var(--menu-border-width) * 3);       
          border-right: 0;
          border-bottom: 0;
          z-index: 0;
          transform: translateX(100%);
          //transform: var(--hamburger-off-state);
          transition: transform 400ms ease;
          display: flex;
          flex-direction: column;
          will-change: transform;
          padding-right: calc(var(--menu-border-width) * 1.5);
          max-width: calc(var(--normal-card-width) * 3.5);
        }
        #hamburger-menu {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        #hamburger-button-area {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: var(--mini-card-width);
          margin-top: var(--menu-border-width);
        }
        .hamburger-button {
          box-sizing: border-box;
          font-size: var(--small-font-size);
          width: 100%;
          height: 100%;
          color: var(--option-off-color);
          
        }
        .hamburger-on {
          transform: none !important;
        }
      `}</style>
      <OptionsPanel id='hamburger' currentOptions={props.currentOptions} clickFunction={props.clickFunction} onToggleOption={props.onToggleOption} />
      <div id='hamburger-button-area'>
        <button {...{ [props.clickFunction]: props.onClickHamburgerQuit }} id="hamburger-quit-button" className="hamburger-button">
          Quit Match
        </button>
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
