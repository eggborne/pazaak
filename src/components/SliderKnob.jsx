import React from 'react';

function SliderKnob() {
  return (
    <div className='slider-knob'>
      <style jsx>{`
        .slider-knob {   
          box-sizing: border-box;       
          width: calc(var(--micro-card-width) * 0.9);
          height: calc(var(--micro-card-width) * 0.9);
          background-color: var(--main-text-color);
          border: 1px solid black;
          border-radius: var(--menu-border-width);
          transform: translate(-50%, -25%);
        }
      `}</style>      
    </div>
  );
}

export default SliderKnob;