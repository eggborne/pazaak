import React from 'react';
import PropTypes from 'prop-types';

function Hamburger(props) {
  // setTimeout(() => {
  //   if (document.getElementById('hamburger').getBoundingClientRect().width !== document.getElementById('hamburger').getBoundingClientRect().height) {
  //     document.getElementById('hamburger').style.width = document.getElementById('hamburger').getBoundingClientRect().height + 'px';
  //   }
  // }, 1);
  return (
    <div {...{[props.clickFunction]: props.onClickHamburger}} className='balls' id='hamburger'>
      <style jsx>{`
        #hamburger {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          height: var(--hamburger-height);
          max-height: 100%;
          background-color: var(--button-bg-color);
          border: solid var(--hamburger-border-color);
          cursor: pointer;
          border-radius: var(--button-radius);
          border-width: var(--button-border-width);
        }
        .hamburger-bar {
          box-sizing: border-box;
          width: calc(var(--inner-hamburger-height) * 0.8);
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