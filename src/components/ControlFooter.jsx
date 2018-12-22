import React from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';

function Footer(props) {
  let extraClass;
  if (props.showing) {
    extraClass = 'control-footer-on';
  }
  return (
    <div id='control-footer' className={extraClass}>
      <style jsx>{`
        #control-footer {
          width: 100%;
          box-sizing: border-box;
          padding: 0.5vmax;
          height: 10vmax;
          min-height: 10vmax;
          max-height: 10vmax;
          background-color: var(--red-bg-color);
          display: inline-flex;
          justify-content: space-between;
          align-items: stretch;
          position: absolute;
          bottom: -10vmax;
          transition: all 300ms ease;
        }
        #control-footer-button-area {
          display: inline-flex;
          align-items: stretch;
          justify-content: space-between;
          flex-grow: 1; 
        }
        .control-footer-on {
          position: relative !important;
          bottom: 0 !important;
        }
      `}</style>
      <div id='control-footer-button-area'>
        <button className='move-button' onClick={props.onClickEndTurn} id='end-turn-button'>End Turn</button>
        <button className='move-button disabled-button hidden-button' onClick={props.onClickSwitchSign} id='switch-sign-button'>+/-</button>
        <button className='move-button' onClick={props.onClickStand} id='stand-button'>Stand</button>
      </div>
      <Hamburger onClickHamburger={props.onClickHamburger} />
    </div>
  );
}

Footer.propTypes = {
  showing: PropTypes.bool,
  style: PropTypes.object,
  onClickEndTurn: PropTypes.func,
  onClickSwitchSign: PropTypes.func,
  onClickStand: PropTypes.func,
  onClickHamburger: PropTypes.func,
};


export default Footer;