import React from 'react';
import PropTypes from 'prop-types';

function PlayerPortrait(props) {
  let sheetWidth = props.size * 6;
  let portraitSize = Math.floor(props.size);
  let extraClass = 'left-side';
  let displayLabel = '';
  if (props.type === 'mini') {
    extraClass = '';
  }
  if (!props.displayName) {
    displayLabel = 'display-none';
  }
  let backgroundPositionX = -props.spriteIndex * (props.size);
  let userPortrait = '';
  if (props.spriteIndex === -1) { // custom avatar
    backgroundPositionX = 0;
  }
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
          background-size: ${sheetWidth}px ${portraitSize}px;
          background-repeat: no-repeat;
          width: ${portraitSize}px;
          height: ${portraitSize}px;
          background-position-x: ${backgroundPositionX}px;
          background-position-y: center;
        }
        .player-portrait-label {
          font-family: 'Nova Square';
          font-size: ${props.size/7}px;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          border-radius: 0 0 0.5rem 0.5rem;
          display: flex;
          align-items: center;
          padding: 5%;
          justify-content: center;
        }
        .mini-portrait-label {
          box-sizing: border-box;
          padding: 0.1rem 0.25rem;
          font-size: 0.8rem;
          font-family: 'Nova Square';
          width: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          border-radius: 0 0 0.25rem 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
      </style>
      <div className={`player-portrait-label ${displayLabel}`}>{props.displayName}</div>
    </div>
  );
}
PlayerPortrait.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
  source: PropTypes.string,
  spriteIndex: PropTypes.number,
  displayName: PropTypes.string,
};


export default PlayerPortrait;