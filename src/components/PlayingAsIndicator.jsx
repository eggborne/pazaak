import React from 'react';
import PropTypes from 'prop-types';

function PlayingAsIndicator(props) {
  console.orange('PlayingAsIndicator rendering');
  let displayName = props.playerName;
  let nameColor = 'yellow';
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
  let playerCredits = props.playerCredits;
  if (props.playerCredits > 1000000) {
    let millions = Math.floor(props.playerCredits / 1000000);
    let remainder = props.playerCredits % 1000000;
    let decimal = (remainder / 1000000).toString().substring(1, 4);
    playerCredits = millions.toString() + (decimal) + 'm';
  }
  return (
    <div id='playing-as-indicator'>
      <style jsx>{`
        #playing-as-indicator {
          font-family: var(--main-font);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #bfb;
          line-height: 175%;
          flex-grow: 1;
          height: 100%;
          font-size: ${nameSize};
          text-shadow:
          -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
        }
        #playing-as-name {
          font-weight: 800;
          color: ${nameColor};                    
        }
        #header-credits-display {
          color: #afa;
          font-size: calc(var(--header-height) / 3);
          display: ${props.playerName || 'none'};
        }
      `}</style>
      <div id='playing-as-name'>{displayName}</div>
      <div id='header-credits-display'><span>${playerCredits}</span></div>
    </div>
  );
}

PlayingAsIndicator.propTypes = {
  playerName: PropTypes.string,
  playerCredits: PropTypes.number,
  uniqueId: PropTypes.number,
};
function areEqual(prevProps, nextProps) {
  return prevProps.playerCredits == nextProps.playerCredits
    && prevProps.playerName == nextProps.playerName;
}
export default React.memo(PlayingAsIndicator, areEqual);