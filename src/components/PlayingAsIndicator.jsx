import React from 'react';
import PropTypes from 'prop-types';

function PlayingAsIndicator(props) {
  let displayName = props.playerName;
  let nameColor = 'var(--option-on-color)';
  if (!props.playerName) {
    displayName = '';
  }
  let nameSizeDivisor = 8;
  let nameLength = displayName.length;
  let wordsInName = displayName.split(' ').length;
  if (nameLength > 10 || wordsInName > 1) {
    nameSizeDivisor = 9;
  }
  let nameSize = `calc(var(--normal-card-height) / ${nameSizeDivisor})`;
  // let nameSize = '1rem';
  return (
    <div id='playing-as-indicator'>
      <style jsx>{`
        #playing-as-indicator {
          font-family: var(--main-font);
          max-height: var(--header-height);
          display: flex;
          justify-content: flex-end;
          align-items: center;
          align-self: stretch;
          color: #bfb;
          line-height: 155%;
          flex-grow: 1;
          font-size: ${nameSize};
        }
        #playing-as-name {
          font-weight: 600;
          color: ${nameColor};
          text-shadow:
          -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        }
      `}</style>
      <div>Playing as<br /><span id='playing-as-name'>{displayName}</span></div>
    </div>
  );
}

PlayingAsIndicator.propTypes = {
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
};

export default PlayingAsIndicator;