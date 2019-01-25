import React from 'react';

function TurnIndicator(props) {
  
  return (
    <div className='turn-indicator-area'>
      <style jsx>{`
      .turn-indicator-area {
          width: var(--header-height);
          height: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: center;
          justify-self: flex-end;
        }
        .turn-indicator {
          width: 90%;
          height: 90%;
          border-radius: 50%;
          background-color: gray;
          border: 1px solid black;
        }
        .turn-lighted {
          animation: pulse 1200ms infinite;
          
        }
        .standing {
          background-color: rgb(189, 189, 95);
        }
        @keyframes pulse {
          0%, 100% {
            background-color: rgb(124, 0, 0);
          }
          50% {
            background-color: red;
          }                
        }        
      `}</style>
      <div className={`turn-indicator ${props.status}`}></div>
    </div>
  );
}

export default TurnIndicator;
