import React from 'react';
import PropTypes from 'prop-types';

function Hamburger(props) {
  return (
    <div onClick={props.onClickHamburger} id='hamburger'>
      <style jsx>{`
        #hamburger {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 10vmax;
          background-color: var(--button-bg-color);
          border: solid #222;
          cursor: pointer;
        }
        .hamburger-bar {
          width: 7vmax;
          height: 1.1vmax;
          background-color: #222;
          transition: all 200ms ease;
        }
        #top-hamburger-bar {
          transform-origin: 50% 50%;
        }
        #bottom-hamburger-bar {
          transform-origin: 50% 50%;
        }
        #middle-hamburger-bar-2 {
          position: absolute;
          width: 7vmax;
        }
      `}
      </style>
      <div className='hamburger-bar' id='top-hamburger-bar'></div>
      <div className='hamburger-bar' id='middle-hamburger-bar'></div>
      <div className='hamburger-bar' id='middle-hamburger-bar-2'></div>
      <div className='hamburger-bar' id='bottom-hamburger-bar'></div>
    </div>
  );
}
Hamburger.propTypes = {
  onClickHamburger: PropTypes.func
};


export default Hamburger;