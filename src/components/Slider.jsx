import React from 'react';
import PropTypes from 'prop-types';

function Slider(props) {
  let sliderWidth = 0;
  if (document.getElementById(`${props.home}-${props.type}-slider`)) {
    sliderWidth = document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().width;
  }
  function handleTouch() {
    let touch = {x: event.targetTouches[0].clientX, y: event.targetTouches[0].clientY};
    let knobWidth = document.getElementById(`${props.home}-${props.type}-slider-knob`).getBoundingClientRect().width;
    let grooveWidth = this.parentElement.getBoundingClientRect().width;
    let offsetX = this.getBoundingClientRect().x;
    let margin = (document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().height - knobWidth) / 2;
    let homeX = this.parentElement.getBoundingClientRect().x - offsetX;
    let newX = (touch.x - offsetX - (knobWidth / 2));
    if (newX < (homeX + margin)) {
      newX = (homeX + margin);
    }
    if (newX > (homeX + grooveWidth - knobWidth - margin)) {
      newX = (homeX + grooveWidth - knobWidth - margin);
    }
    document.getElementById(`${props.home}-${props.type}-slider-knob`).style.marginLeft = `${newX}px`;
    let newValue = newX / (homeX + grooveWidth - knobWidth - margin);
    props.changeSliderValue(props.type, newValue);
  }
  function handleTouchMove() {
    let touch = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
    let knobWidth = document.getElementById(`${props.home}-${props.type}-slider-knob`).getBoundingClientRect().width;
    let grooveWidth = this.parentElement.getBoundingClientRect().width;
    let offsetX = this.getBoundingClientRect().x;
    let margin = (document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().height - knobWidth) / 2;
    let homeX = this.parentElement.getBoundingClientRect().x - offsetX;
    let newX = (touch.x - offsetX - (knobWidth / 2));
    if (newX < (homeX + margin)) {
      newX = (homeX + margin);
    }
    if (newX > (homeX + grooveWidth - knobWidth - margin)) {
      newX = (homeX + grooveWidth - knobWidth - margin);
    }
    document.getElementById(`${props.home}-${props.type}-slider-knob`).style.marginLeft = `${newX}px`;
    let newValue = newX / (homeX + grooveWidth - knobWidth - margin);
    props.changeSliderValue(props.type, newValue);
  }
  setTimeout(() => {
    document.getElementById(`${props.home}-${props.type}-slider`).addEventListener('touchstart', handleTouch);
    document.getElementById(`${props.home}-${props.type}-slider`).addEventListener('touchmove', handleTouchMove);
  }, 1);
  let startingMargin = parseFloat(props.value) * sliderWidth;
  return (
    <div id={`${props.home}-${props.type}-slider-container`} className='slider-container'>
      <style jsx>{`
        .slider {   
          position: relative;
          box-sizing: border-box;       
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid black;
          border-radius: var(--menu-border-width);
          background-color: var(--trans-black-bg-color);
          width: 100%;
          height: 100%;          
          padding-left: calc(var(--micro-card-width) * 0.45);
          padding-right: calc(var(--micro-card-width) * 0.45);
        }
        .slider-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 100%;
        }
        .slider-knob {
          align-self: flex-start;
          box-sizing: border-box;       
          width: calc(var(--micro-card-width) * 0.9);
          height: calc(var(--micro-card-width) * 0.9);
          background-color: var(--main-text-color);
          border: 1px solid black;
          border-radius: var(--menu-border-width);
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translateX(-50%);
          transform-origin: 50% 50%;
          z-index: 4;     
          margin-left: ${startingMargin}px;
          transition: all 50ms ease;
        }
        .slider-groove {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          width: 90%;
          height: var(--small-font-size);
          background-color: #222;
          border-radius: inherit;
          opacity: 0.4;
          justify-self: flex-end;
        }
        .slider-groove:first-of-type {
          background-color: green;
          clip-path: inset(0 0 0 ${(1-props.value) * sliderWidth}%);
        }
        .slider-value-display {
          position: relative;
          height: 100%;
          width: 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: var(--medium-font-size);
          background-color: salmon;
          text-shadow: 0 !important;
          color: black;

        }
      `}</style>
      {/* <div id={`${props.home}-${props.type}-slider-value-display`} className='slider-value-display'></div> */}
      <div id={`${props.home}-${props.type}-slider`} className='slider'>
        <div id={`${props.home}-${props.type}-slider-groove`} className='slider-groove'>
          <div id={`${props.home}-${props.type}-slider-groove-lit`} className='slider-groove' />
        </div>
        <div id={`${props.home}-${props.type}-slider-knob`} className='slider-knob'>{props.value}</div>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  value: 0
};

Slider.propTypes = {
  value: PropTypes.number,
  home: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string
};

// function areEqual(prevProps, nextProps) {

// }

export default Slider;
// export default React.memo(Slider, areEqual);
