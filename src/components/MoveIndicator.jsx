import React from 'react';

function MoveIndicator() {
  return (
    <div className='shadowed-text' id='move-indicator'>
      <style jsx>{`
        #move-indicator {
          box-sizing: border-box;
          position: fixed;
          width: 100%;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bungee';
          font-size: 14vw;
          z-index: 4;
          pointer-events: none;
          opacity: 0;
          transition: transform 100ms ease-out, opacity 200ms ease-out;
        }
        
      `}</style>
      <div id='move-message'></div>
    </div>
  );
}

export default MoveIndicator;