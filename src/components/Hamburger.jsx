import React from 'react';
import PropTypes from 'prop-types';

function Hamburger(props) {
  return (
    <div onClick={props.onClickHamburger} id='hamburger'>
      <div className='hamburger-bar' id='top-hamburger-bar'></div>
      <div className='hamburger-bar'></div>
      <div className='hamburger-bar' id='bottom-hamburger-bar'></div>
    </div>
  );
}
Hamburger.propTypes = {
  onClickHamburger: PropTypes.func
};


export default Hamburger;