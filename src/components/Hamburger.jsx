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
          width: var(--hamburger-height);
          height: var(--hamburger-height);
          min-width: var(--hamburger-height);
          min-height: var(--hamburger-height);
          background-color: var(--button-bg-color);
          border: solid var(--hamburger-border-color);
          cursor: pointer;
          border-radius: var(--button-radius);
          border-width: var(--button-border-width);
          padding-top: calc(var(--menu-border-width) / 2);
          padding-bottom: calc(var(--menu-border-width) / 2);
          //z-index: 3;
        }
        .hamburger-bar {
          box-sizing: border-box;
          width: calc(var(--inner-hamburger-height) - var(--menu-border-width) * 3);
          height: var(--hamburger-bar-height);
          background-color: var(--hamburger-bar-color);
          transition: transform 150ms ease;
          border-radius: calc(var(--menu-border-width) / 3);
          will-change: transform;
        }
        #middle-hamburger-bar-2 {
          position: absolute;
        }
        #top-hamburger-bar, #bottom-hamburger-bar {
          will-change: opacity;
        }
        #bottom-hamburger-bar {

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