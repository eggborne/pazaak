import React from 'react';
import PropTypes from 'prop-types';
import OptionsPanel from './OptionsPanel';

function HamburgerMenu(props) {
  return (
    <div id="hamburger-menu" className='red-panel'>
      <style jsx>{`
        #hamburger-menu {
          position: absolute;
          box-sizing: border-box;
          right: 0;
          bottom: calc(var(--control-footer-height) - var(--menu-border-radius));
          font-size: var(--small-font-size);
          font-family: var(--main-font);
          padding-bottom: calc(var(--menu-border-width) * 3);       
          border-right: 0;
          border-bottom: 0;
          z-index: 0;
          transform: translateX(100%);
          transition: transform 400ms ease;
          display: flex;
          flex-direction: column;
          will-change: transform;
          padding-right: calc(var(--menu-border-width) * 1.5);
          width: var(--hamburger-menu-width);
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
      <OptionsPanel id='hamburger-menu' currentOptions={props.currentOptions} clickFunction={props.clickFunction} onToggleOption={props.onToggleOption} onChangeBackgroundColor={props.onChangeBackgroundColor} changeSliderValue={props.changeSliderValue}/>
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
  onChangeBackgroundColor: PropTypes.func,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string
};

// export default HamburgerMenu;
function areEqual(prevProps, nextProps) {

}
export default HamburgerMenu;
// export default React.memo(HamburgerMenu);
