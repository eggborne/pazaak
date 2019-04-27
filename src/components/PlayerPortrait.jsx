import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { portraitSources } from '../scripts/db';
import { randomInt } from '../scripts/util';

const staticSource = 'https://pazaak.online/assets/images/statictv.webm';

function PlayerPortrait(props) {
  console.orange('PlayerPortrait rendering - ' + props.displayName);  
  let unhiddenStatic = 0.4 + randomInt(-2, 1) / 10;
  let staticFadeTime = 500 + randomInt(-200, 800);  
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
    useEffect(() => {
      if (props.type === 'opponent-panel' && !props.hidden) {
        requestAnimationFrame(() => { document.getElementById(coverId).style.opacity = 0; });        
      }
    });
  }
  return (
    <div className={'player-portrait'} style={ props.style }>
      <style jsx>{`
        .player-portrait {
          position: relative;
          box-sizing: border-box;
          border-radius: 10%;
          border: ${borderWidth}px solid var(--dark-red-bg-color);
          display: flex;
          align-items: flex-end;
          background-image: ${props.spriteIndex > -1 ? `url(${source})` : 'none'};
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
          font-family: var(--main-font);
          background-color: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 10% 10%;
        }
        .opponent-defeat-count {
          position: absolute;
          width: ${props.size / 3}px;
          //height: ${props.size / 5};
          font-size: ${props.size / 3}px;
          background: #00000099;
          color: white;
          display: flex;
          align-content: center;
          justify-content: center;
          right: 0;
          bottom: 0;
          padding: calc(var(--small-font-size) / 8);
          border-top-left-radius: calc(var(--small-font-size) / 3);
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
      {props.countDisplay && props.countDisplay > 1 && 
        <div className='opponent-defeat-count'>{props.countDisplay}</div>
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
  countDisplay: PropTypes.number,
  displayName: PropTypes.string,
  readyToShow: PropTypes.bool
};

function areEqual(prevProps, nextProps) {
  return (prevProps.spriteIndex == nextProps.spriteIndex && prevProps.size == nextProps.size && prevProps.hidden == nextProps.hidden);
}
// export default PlayerPortrait;
export default React.memo(PlayerPortrait);