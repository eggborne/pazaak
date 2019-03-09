import React from 'react';
import PropTypes from 'prop-types';

function TurnIndicator(props) {
  console.log('ti props', props);
  return (
    <div id={`${props.owner}-turn-indicator`} className={`turn-indicator ${props.status}`}>
      <style jsx>{`      
        .turn-indicator {
          min-width: var(--micro-card-width);
          height: var(--micro-card-width);
          border-radius: 50%;
          background-color: gray;
          border: 1px solid black;
          animation-duration: var(--pulse-speed);
          animation-iteration-count: infinite;
          z-index: 0;
        }
        .turn-lighted {
          animation-name: pulse;
          background-color: red;
        }
        .entering {
          animation-name: enter;
        }
        .leaving {
          animation-name: leave;
        }
        .standing {
          background-color: rgb(189, 189, 95);
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }                
        }
        @keyframes enter {
          0% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;            
          }
        }
        @keyframes leave {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

TurnIndicator.propTypes = {
  owner: PropTypes.string,
  status: PropTypes.string
};

export default React.memo(TurnIndicator);
