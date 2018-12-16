import React from 'react';

function MoveIndicator() {
  return (
    <div className='shadowed-text' id='move-indicator'>
      <style jsx>{`
        #move-indicator {
          position: fixed;
          background-color: rgba(107, 7, 7, 0.5);
          width: 100%;
          height: 42vmax;
          top: 6vmax;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bungee';
          font-size: 9vw;
          z-index: 4;
          pointer-events: none;
          opacity: 0;
          transition: opacity 400ms ease, font-size 100ms ease;
        }
        #move-message {

        }
      `}</style>
      <div id='move-message'></div>
    </div>
  );
}

export default MoveIndicator;