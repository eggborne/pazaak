import React from 'react';
import PropTypes from 'prop-types';
import { portraitSources } from '../scripts/db';

function PlayerPortrait(props) {
  // console.warn('rendering PlayerPortrait', props.displayName, props.spriteIndex);
  let portraitSize = props.size;
  let sheetWidth = portraitSize * 8;
  let sheetHeight = portraitSize * 3;
  let labelFontSize = portraitSize / 6;
  let wordsInName = props.displayName.split(' ').length;
  let totalLength = props.displayName.length;

  if (wordsInName <= 2 && totalLength > 9
    || wordsInName > 2 && totalLength > 12) {
    labelFontSize = portraitSize / 8;
    if (totalLength > 18) {
      labelFontSize = portraitSize / 9;
    }
  }  
  let borderWidth = Math.ceil(portraitSize * 0.01);
  if (borderWidth > 2) {
    borderWidth = 2;
  }
  let spriteIndex = props.spriteIndex;
  let backgroundPositionX = -spriteIndex * (portraitSize) + 'px';
  let backgroundPositionY = 'top';
  if (spriteIndex > 7) {
    backgroundPositionX = -(spriteIndex % 8) * (portraitSize) + 'px';
    backgroundPositionY = -portraitSize + 'px';
    if (spriteIndex > 15) {
      backgroundPositionY = (-portraitSize * 2) + 'px';
    }
  }
  let nullIndex = spriteIndex === null;
  let source = props.cpu ? portraitSources.opponent : portraitSources.user;
  return (
    <div className={'player-portrait'} style={ props.style }>
      <style jsx>{`
        .player-portrait {
          box-sizing: border-box;
          border-radius: ${props.type === 'header' ? '0' : '10%' };
          border: ${borderWidth}px solid #333;
          display: flex;
          align-items: flex-end;
          background-image: ${!nullIndex && `url(${source})`};
          background-size: ${sheetWidth}px ${sheetHeight}px;
          background-repeat: no-repeat;
          width: ${portraitSize}px;
          height: ${portraitSize}px;
          max-height: ${portraitSize}px;
          background-position-x: ${backgroundPositionX};
          background-position-y: ${backgroundPositionY};
        }
        .player-portrait-label {
          width: 100%;
          height: 32%;
          font-size: ${labelFontSize}px;
          background-color: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 10% 10%;
        }
      `}
      </style>
      {props.displayName &&
        <div className={'player-portrait-label'}>{props.displayName}</div>
      }
    </div>
  );
}
PlayerPortrait.propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
  cpu: PropTypes.bool,
  spriteIndex: PropTypes.number,
  displayName: PropTypes.string,
  readyToShow: PropTypes.bool
};

function areEqual(prevProps, nextProps) {
  return (prevProps.spriteIndex === nextProps.spriteIndex && prevProps.size === nextProps.size);
}
// export default PlayerPortrait;
export default React.memo(PlayerPortrait, areEqual);