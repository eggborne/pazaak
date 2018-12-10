import React from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';

function Footer(props) {
  return (
    <div style={props.style} id='footer'>
      <div id='footer-button-area'>
        <button className='move-button' onClick={props.onClickEndTurn} id='end-turn-button'>End Turn</button>
        <button className='move-button disabled-button hidden-button' onClick={props.onClickSwitchSign} id='switch-sign-button'>+/-</button>
        <button className='move-button' onClick={props.onClickStand} id='stand-button'>Stand</button>
      </div>
      <Hamburger onClickHamburger={props.onClickHamburger} />
    </div>
  );
}

Footer.propTypes = {
  style: PropTypes.object,
  onClickEndTurn: PropTypes.func,
  onClickSwitchSign: PropTypes.func,
  onClickStand: PropTypes.func,
  onClickHamburger: PropTypes.func,
};


export default Footer;