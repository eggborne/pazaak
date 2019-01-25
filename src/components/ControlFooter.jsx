import React from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from './HamburgerMenu';
import Hamburger from './Hamburger';

function ControlFooter(props) {

  return (
    <div id='control-footer'>
      <style jsx>{`
        #control-footer {
          width: 100%;
          box-sizing: border-box;
          padding: var(--menu-border-width);
          height: var(--control-footer-height);
          min-height: var(--control-footer-height);
          max-height: var(--control-footer-height);
          background-color: var(--red-bg-color);
          display: inline-flex;          
          justify-content: space-between;
          align-items: stretch;
          border: ${props.cardSize.badgeRadius} solid var(--dark-red-bg-color);
        }
        #control-footer-button-area {
          display: inline-flex;
          justify-content: space-between;
          flex-grow: 1; 
        }
        .move-button {
          width: 49%;
          font-size: 3vmax;
        }
        #stand-button {
          margin-left: var(--menu-border-width);
          margin-right: var(--menu-border-width);
        }
        #switch-sign-button {
          width: 20%;
          font-size: 1rem;
        }
      `}</style>
      <HamburgerMenu
        borderRadiusSize={parseInt(props.cardSize.arrowBorderSize)}
        currentOptions={props.currentOptions}
        onClickHamburgerQuit={props.onClickHamburgerQuit}
        onToggleOption={props.onToggleOption}
        clickFunction={props.clickFunction} />
      <div id='control-footer-button-area'>
        <button {...{[props.clickFunction]: props.onClickEndTurn}} className='move-button' id='end-turn-button'>End Turn</button>
        <button {...{[props.clickFunction]: props.onClickSwitchSign}} className='move-button disabled-button hidden-button' id='switch-sign-button'>+/-</button>
        <button {...{[props.clickFunction]: props.onClickStand}} className='move-button' id='stand-button'>Stand</button>
      </div>
      <Hamburger onClickHamburger={props.onClickHamburger}
        clickFunction={props.clickFunction} />
    </div>
  );
}

ControlFooter.propTypes = {
  cardSize: PropTypes.object,
  currentOptions: PropTypes.object,
  onClickHamburgerQuit: PropTypes.func,
  onToggleOption: PropTypes.func,
  showing: PropTypes.bool,
  style: PropTypes.object,
  onClickEndTurn: PropTypes.func,
  onClickSwitchSign: PropTypes.func,
  onClickStand: PropTypes.func,
  onClickHamburger: PropTypes.func,
  clickFunction: PropTypes.string
};


export default ControlFooter;