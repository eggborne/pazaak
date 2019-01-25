import React from 'react';
import PropTypes from 'prop-types';

function PlayingAsIndicator(props) {
  let displayName = props.playerName;
  let headerHeight = Math.floor(props.cardSize.height * 0.45);
  let nameColor = 'var(--option-on-color)';
  if (!props.playerName) {
    displayName = '';
  }
  let nameSize = props.cardSize.height/8;
  let nameLength = displayName.length;
  let wordsInName = displayName.split(' ').length;
  if (nameLength > 10 || wordsInName > 1) {
    nameSize = props.cardSize.height/9;
  }
  return (
    <div id='playing-as-indicator'>
      <style jsx>{`
        #playing-as-indicator {
          font-family: 'Nova Square';
          max-height: ${headerHeight}px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
          color: #bfb;
          line-height: 155%;
          flex-grow: 1;
          font-size: ${nameSize * 0.9}px;
          padding-right: ${nameSize / 2}px;
        }
        #playing-as-name {
          font-size: ${nameSize}px;
          font-weight: 600;
          color: ${nameColor};
          text-shadow:
          -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        }
      `}</style>
      <div>Logged in as<br /><span id='playing-as-name'>{displayName}</span></div>
    </div>
  );
}

PlayingAsIndicator.propTypes = {
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
  cardSize: PropTypes.object
};

export default PlayingAsIndicator;