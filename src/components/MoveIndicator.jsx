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
        }
        .indicator-on {
          animation: show-move 1000ms 1;
        }
        @keyframes show-move {
          0%, 100% {
            opacity: 0;
          }
          15% { 
            opacity: 1;
            transform: scaleX(1.1);
          }
          30% {
            opacity: 1;
            transform: scaleX(1);
          }
          80% {
            opacity: 1;
          }
        }
      `}</style>
      <div id='move-message'></div>
    </div>
  );
}

export default MoveIndicator;