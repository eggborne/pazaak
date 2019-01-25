import React from 'react';
import PropTypes from 'prop-types';

function Hamburger(props) {
  return (
    <div {...{[props.clickFunction]: props.onClickHamburger}} className='balls' id='hamburger'>
      <style jsx>{`
        #hamburger {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          width: 10vmax;
          background-color: var(--button-bg-color);
          //border: solid var(--button-border-color);
          cursor: pointer;
          border-radius: 0.25rem;
          border-width: 0.25rem;
        }
        #bars {
        }
        .hamburger-bar {
          width: 7vmax;
          height: 1.1vmax;
          background-color: var(--button-text-color);
          border-radius: 0.1rem;
          transition: transform 150ms ease;
          will-change: transform;
        }
        #middle-hamburger-bar-2 {
          position: absolute;
          width: 7vmax;
        }
        #top-hamburger-bar, #bottom-hamburger-bar {
          will-change: opacity;
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
  onClickHamburger: PropTypes.func,
  clickFunction: PropTypes.string
};


export default Hamburger;