import React from 'react';
import PropTypes from 'prop-types';

function Slider(props) {
  console.pink('Slider rendering - ' + props.home + ' ' + props.type + ' value: ' + props.value);
  if (typeof props.value !== 'number') {
    console.orange( props.home + ' ' + props.type + ' had not a number');
  }
  const handleTouch = (event) => {
    let touches = event;
    if (event.touches) {
      touches = event.touches[0];
    }
    let touch = {x: touches.clientX, y: touches.clientY};
    let knobWidth = document.getElementById(`${props.home}-${props.type}-slider-knob`).getBoundingClientRect().width;
    let grooveWidth = document.getElementById(`${props.home}-${props.type}-slider-groove`).getBoundingClientRect().width;
    let offsetX = document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().x;
    let margin = (document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().height - knobWidth) / 2;
    let homeX = document.getElementById(`${props.home}-${props.type}-slider-container`).getBoundingClientRect().x;
    homeX = 0;
    let endX = (homeX + grooveWidth - knobWidth);
    let newX = (touch.x - offsetX - (knobWidth/2));
    if (newX > endX) {
      newX = endX;
    }
    if (newX < homeX) {
      newX = homeX;
    }
    // document.getElementById(`${props.home}-${props.type}-slider-knob`).style.marginLeft = newX + 'px';
    let newValue = newX / endX;
    if (newValue < 0) { 
      newValue = 0;
    }
    if (props.steps < 100) {
      newValue = (Math.round(newValue * props.steps) / props.steps);
    }
    newValue = newValue.toPrecision(2);
    console.info(props.type, newValue);
    props.changeSliderValue(props.type, newValue, true);
  };
  const handleTouchMove = (event) => {
    let touches = event;
    if (event.changedTouches) {
      touches = event.changedTouches[0];
    }
    let touch = { x: touches.clientX, y: touches.clientY };
    let knobWidth = document.getElementById(`${props.home}-${props.type}-slider-knob`).getBoundingClientRect().width;
    let grooveWidth = document.getElementById(`${props.home}-${props.type}-slider-groove`).getBoundingClientRect().width;
    let offsetX = document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().x;
    let margin = (document.getElementById(`${props.home}-${props.type}-slider`).getBoundingClientRect().height - knobWidth) / 2;
    let homeX = document.getElementById(`${props.home}-${props.type}-slider-container`).getBoundingClientRect().x;
    homeX = 0;
    let endX = (homeX + grooveWidth - knobWidth);
    let newX = (touch.x - offsetX - (knobWidth / 2));
    if (newX > endX) {
      newX = endX;
    }
    if (newX < homeX) {
      newX = homeX;
    }
    // document.getElementById(`${props.home}-${props.type}-slider-knob`).style.marginLeft = newX + 'px';
    let newValue = newX / endX;
    if (newValue < 0) {
      newValue = 0;
    }
    if (props.steps < 100) {
      newValue = (Math.round(newValue * props.steps) / props.steps);
    }
    newValue = newValue.toPrecision(2);
    console.info(props.type, newValue);
    props.changeSliderValue(props.type, newValue, true);
  };
  if (!document.getElementById(`${props.home}-${props.type}-slider`)) {
    let clickHandler = window.PointerEvent ? ['pointerdown', 'pointermove', 'pointerup'] : window.TouchEvent ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
    setTimeout(() => {
      // document.getElementById(`${props.home}-${props.type}-slider`).addEventListener('pointerdown', handleTouch);
      // document.getElementById(`${props.home}-${props.type}-slider`).addEventListener('pointermove', handleTouchMove);
      // document.getElementById(`${props.home}-${props.type}-slider`).addEventListener('pointerup', handleTouch);
      document.getElementById(`${props.home}-${props.type}-slider`).addEventListener(clickHandler[0], handleTouch, false);
      document.getElementById(`${props.home}-${props.type}-slider`).addEventListener(clickHandler[1], handleTouchMove, false);
      // document.getElementById(`${props.home}-${props.type}-slider`).addEventListener(clickHandler[2], handleTouch);
    }, 5);
  }
  let displayValue = Math.round(props.value * props.steps);
  if (props.steps === 5) {
    displayValue = (Math.round(props.value * props.steps) / props.steps) * props.steps;
  }
  
  if (props.labels) {
    if (props.value <= (1 / props.labels.length)) {
      displayValue = props.labels[0];
    } else if (props.value > (1 / props.labels.length) && props.value <= 0.99) {
      displayValue = props.labels[1];
    } else {
      displayValue = props.labels[2];
    }
  } else {
    if (parseInt(props.value) === 1) {
      displayValue = 'MAX';
    }
    if (parseFloat(props.value) === 0) {
      displayValue = 'OFF';
    }
    if (props.type === 'bg-alpha-control' || props.type === 'panel-alpha-control') {
      displayValue = '';
    }
  }
  return (
    <div id={`${props.home}-${props.type}-slider-container`} className='slider-container'>
      <style jsx>{`
        .slider {  
          --knob-size: calc(var(--micro-card-width) * 0.9);
          position: relative;
          box-sizing: border-box;       
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          opacity: ${props.showing || 0.4};
          pointer-events: ${props.showing || 'none'};
          transition: opacity 300ms ease;
        }
        .slider-container {      
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }
        .slider-knob {
          box-sizing: border-box;
          width: var(--knob-size);
          height: var(--knob-size);
          background-color: ${props.showing ? 'var(--main-text-color)' : '#555'};
          border: 1px solid black;
          border-radius: var(--menu-border-width);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 4;
          margin-left: calc(${Math.round(props.value * 100)}% - (var(--knob-size) / 2));
          color: black;
          text-shadow: none;
          font-size: calc(var(--micro-card-width) * ${(parseFloat(props.value) < 1) && !props.labels ? 0.4 : 0.3});
        }
        .slider-knob-container {
          min-height: 0;
          width: calc(100% - var(--knob-size));
          font-weight: bold;
          z-index: 1;
        }
        .slider-groove {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          width: calc(100%);
          height: calc(var(--micro-card-width) * 0.45);
          background-color: ${(props.type === 'bg-alpha-control' || props.type === 'panel-alpha-control') || props.bgColor};
          border-radius: 2px;
          opacity: 1;
          background-image: ${(props.type === 'bg-alpha-control' || props.type === 'panel-alpha-control') && `linear-gradient(to right, black 0%, ${props.bgColor} 99%)`};
        }
        .slider-groove:last-of-type {
          background-color: var(--option-on-color);
          width: 100%;
          height: 100%;
          clip-path: inset(0 ${100 - (props.value * 100)}% 0 0);
          display: ${(props.type === 'bg-alpha-control' || props.type === 'panel-alpha-control') && 'none'}
        }
      `}</style>
      <div id={`${props.home}-${props.type}-slider`} className='slider'>
        <div id={`${props.home}-${props.type}-slider-groove`} className='slider-groove'>
          <div id={`${props.home}-${props.type}-slider-groove-lit`} className='slider-groove' />
        </div>
        <div className='slider-knob-container'>
          <div id={`${props.home}-${props.type}-slider-knob`} className='slider-knob'>{displayValue}</div>
        </div>
      </div>
    </div>
  );
}

Slider.defaultProps = {
  value: 0,
  bgColor: '#222',
  disabled: false,
  showing: true
};

Slider.propTypes = {
  showing: PropTypes.bool,  
  min: PropTypes.number,
  steps: PropTypes.number,
  bgColor: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  home: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  changeSliderValue: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  return prevProps.value == nextProps.value && prevProps.showing == nextProps.showing && prevProps.bgColor == nextProps.bgColor;
}

export default React.memo(Slider, areEqual);
