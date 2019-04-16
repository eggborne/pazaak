import React from 'react';
import PropTypes from 'prop-types';
import { portraitSources } from '../scripts/db';
import { randomInt } from '../scripts/util';

const staticSource = 'https://pazaak.online/assets/images/statictv.webm';

function PlayerPortrait(props) {
  console.orange('PlayerPortrait rendering - ' + props.displayName);
  if (props.type === 'opponent-panel' && !props.hidden) {
    setTimeout(() => {
      document.getElementById(`opponent-select-portrait-cover-${props.spriteIndex}`).style.opacity =  0;
    },2);
  }
  let unhiddenStatic = 0.4 + randomInt(-2, 1) / 10;
  let staticFadeTime = 500 + randomInt(-200, 1000);  
  let portraitSize = props.size;
  let sheetWidth = portraitSize * 8;
  let sheetHeight = portraitSize * 3;
  if (props.cpu) {
    sheetHeight = portraitSize * 4;
  }
  let labelFontSize = portraitSize / 6;
  let wordsInName = props.displayName.split(' ').length;
  let totalLength = props.displayName.length;
  if (!props.hidden && wordsInName <= 2 && totalLength > 10
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
    if (spriteIndex > 23) {
      backgroundPositionY = (-portraitSize * 3) + 'px';
    }
  }
  let source = props.cpu ? portraitSources.opponent : portraitSources.user;
  let coverId = '';
  if (props.type === 'opponent-panel') {
    coverId = `opponent-select-portrait-cover-${props.spriteIndex}`;
  }
  return (
    <div className={'player-portrait'} style={ props.style }>
      <style jsx>{`
        .player-portrait {
          box-sizing: border-box;
          border-radius: 10%;
          border: ${borderWidth}px solid var(--dark-red-bg-color);
          display: flex;
          align-items: flex-end;
          background-image: url(${source});
          background-size: ${sheetWidth}px ${sheetHeight}px;
          width: ${portraitSize}px;
          max-width: ${portraitSize}px;
          height: ${portraitSize}px;
          max-height: ${portraitSize}px;
          background-position-x: ${backgroundPositionX};
          background-position-y: ${backgroundPositionY};
          background-color: black;
        }
        .portrait-cover {
          box-sizing: border-box;
          background-clip: padding-box;
          border-radius: 10%;
          position: absolute;
          opacity: ${props.hidden ? 0.9 : props.type === 'opponent-panel' ? unhiddenStatic : 0};
          //display: ${props.hidden || 'none'};
          z-index: 12;
          width: ${portraitSize - (borderWidth)}px;
          transform: translate(-1px, 1px);
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
        video {
          transition: opacity ${staticFadeTime}ms ease;
          transition-delay: 500ms;
        }
      `}
      </style>
      {props.type === 'opponent-panel' &&
        <video id={coverId} autoPlay loop src={staticSource} className='portrait-cover' />
      }
      {props.displayName &&
        <div className={'player-portrait-label'}>{props.displayName}</div>
      }
    </div>
  );
}
PlayerPortrait.propTypes = {
  size: PropTypes.number,
  hidden: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  cpu: PropTypes.bool,
  spriteIndex: PropTypes.number,
  displayName: PropTypes.string,
  readyToShow: PropTypes.bool
};

function areEqual(prevProps, nextProps) {
  return (prevProps.spriteIndex == nextProps.spriteIndex && prevProps.size == nextProps.size && prevProps.hidden == nextProps.hidden);
}
// export default PlayerPortrait;
export default React.memo(PlayerPortrait);