import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  return (
    <div style={props.style} id='footer'>
      <div id='footer-button-area'>
        <button className='move-button' onClick={props.onClickEndTurn} id='end-turn-button'>End Turn</button>
        <button className='move-button' onClick={props.onClickStand} id='stand-button'>Stand</button>
      </div>
      <div onClick={props.onClickHamburger} id='hamburger'>
        <div className='hamburger-bar' id='top-hamburger-bar'></div>
        <div className='hamburger-bar'></div>
        <div className='hamburger-bar' id='bottom-hamburger-bar'></div>
      </div>
    </div>
  );
}

Footer.propTypes = {
  style: PropTypes.object,
  onClickEndTurn: PropTypes.func,
  onClickStand: PropTypes.func,
  onClickHamburger: PropTypes.func
};


export default Footer;