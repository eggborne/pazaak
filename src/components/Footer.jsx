import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  return (
    <div id='footer'>
      <button className='move-button' onClick={props.onClickEndTurn} id='end-turn-button'>End Turn</button>
      <button className='move-button' onClick={props.onClickStand} id='stand-button'>Stand</button>
    </div>
  );
}

Footer.propTypes = {
  onClickEndTurn: PropTypes.func,
  onClickStand: PropTypes.func
};


export default Footer;