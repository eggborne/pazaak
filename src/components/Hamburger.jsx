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
          border: solid var(--button-border-color);
          cursor: pointer;
          border-radius: 0.5rem;
          border-width: 0.25rem;
        }
        .hamburger-bar {
          width: 7vmax;
          height: 1.1vmax;
          background-color: rgb(59, 107, 150);
          transition: all 200ms ease;
          border-radius: 0.1rem;
        }
        #top-hamburger-bar {
          transform-origin: 50% 50%;
        }
        #bottom-hamburger-bar {
          transform-origin: 50% 50%;
        }
        #middle-hamburger-bar-2 {
          position: absolute;
          // width: 7vmax;
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