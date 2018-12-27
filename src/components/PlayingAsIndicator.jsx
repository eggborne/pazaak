import React from 'react';
import PropTypes from 'prop-types';

function PlayingAsIndicator(props) {
  let displayName = props.playerName;
  let nameColor = 'var(--option-on-color)';
  let nameSize = '1.2em';
  // let displayId = 'inline-block';
  let displayId = 'none';
  if (!props.playerName) {
    displayName = 'Player';
    nameColor = 'gray';
    nameSize = '1em';
    displayId = 'none';
  }
  return (
    <div id='playing-as-indicator'>
      <style jsx>{`
        #playing-as-indicator {
          font-family: sans-serif;
          font-family: 'Nova Square';
          max-height: var(--header-height);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${props.cardSize.height*0.12}px;
          color: #bfb;
          margin-right: 4%;
          line-height: 1rem;
        }
        #playing-as-name {
          font-size: ${nameSize};
          font-weight: 600;
          color: ${nameColor};
          text-shadow:
          -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        }
        #id-display {
          font-size: 0.9em;
          color: #ddd;
          display: ${displayId}
        }
      `}</style>
      <div>Playing as<br /><span id='playing-as-name'>{displayName}</span> <span id='id-display'>(id #{props.uniqueId})</span></div>
    </div>
  );
}

PlayingAsIndicator.propTypes = {
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
  cardSize: PropTypes.object
};

export default PlayingAsIndicator;