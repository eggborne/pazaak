import React from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';

function Footer(props) {
  let extraClass;
  let display = 'none';
  if (props.showing) {
    extraClass = 'control-footer-on';
    display = 'inline-flex';
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
          display: ${display};          
          justify-content: space-between;
          align-items: stretch;
          position: absolute;
          bottom: -10vmax;
          border: 0.5vw solid var(--dark-red-bg-color);
          border-left: 0;
          border-right: 0;
          border-bottom: 0;
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
        .move-button {
          width: 49%;
          font-size: 3vmax;
          transition: background 200ms ease;
        }
        #stand-button {
          margin-right: 1%;
        }
        #switch-sign-button {
          width: 20%;
          font-size: 1rem;
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