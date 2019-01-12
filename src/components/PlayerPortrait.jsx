import React from 'react';
import PropTypes from 'prop-types';

function PlayerPortrait(props) {
  let sheetWidth = props.size * 8;
  let portraitSize = Math.floor(props.size);
  let extraClass = 'left-side';
  let displayLabel = '';
  let labelOpacity = '0.5';
  let labelAlign = 'center';
  let labelFont = 'Nova Square';
  let opacity = 1;
  //let labelFontSize = props.size / 7;
  let labelFontSize;
  if (props.type === 'mini') {
    extraClass = '';
  } else if (props.type === 'micro') {
    extraClass = '';
    opacity = '0.5 !important';
  }
  if (!props.displayName) {
    displayLabel = 'display-none';
  }
  let spriteIndex = props.spriteIndex;
  let backgroundPositionX = -spriteIndex * (props.size) + 'px';
  let backgroundPositionY = 'top';
  if (spriteIndex > 7) {
    backgroundPositionX = -(spriteIndex % 8) * (props.size) + 'px';
    backgroundPositionY = -props.size + 'px';
    if (spriteIndex > 15) {
      backgroundPositionY = (-props.size*2) + 'px';
    }
  }
  let userPortrait = '';
  
  if (spriteIndex === -1) { // not logged in
    backgroundPositionX = portraitSize;
  }
  let labelTextColor = 'white';
  if (props.isSelf) {
    labelTextColor = 'var(--option-on-color)';
  }
  if (props.source)
    return (
      <div className={`player-portrait ${extraClass} ${userPortrait}`}>
        <style jsx>{`
        .player-portrait {
          position: relative;
          border-radius: ${props.size/10}px;
          border: 1px solid black;
          display: flex;
          align-items: flex-end;
          background-image: url(${props.source});
          background-size: ${sheetWidth}px ${portraitSize*3}px;
          background-repeat: no-repeat;
          width: ${portraitSize}px;
          height: ${portraitSize}px;
          background-position-x: ${backgroundPositionX};
          background-position-y: ${backgroundPositionY};
          opacity: ${opacity};
        }
        .player-portrait-label {
          font-family: ${labelFont};
          font-size: ${labelFontSize}px;
          width: 100%;
          background-color: rgba(0, 0, 0, ${labelOpacity});
          box-sizing: border-box;
          display: flex;
          align-items: center;
          padding: 5%;
          justify-content: ${labelAlign};
          border-radius: 0 0 0.5rem 0.5rem;
          color: ${labelTextColor} !important;
        }
      `}
        </style>
        <div className={`player-portrait-label ${displayLabel}`}>{props.displayName}</div>
      </div>
    );
}
PlayerPortrait.propTypes = {
  isSelf: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.string,
  source: PropTypes.string,
  spriteIndex: PropTypes.number,
  displayName: PropTypes.string,
};


export default PlayerPortrait;