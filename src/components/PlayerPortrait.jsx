import React from 'react';
import PropTypes from 'prop-types';

function PlayerPortrait(props) {
  let extraClass = 'left-side'
  if (props.type === 'mini') {
    extraClass = '';
  }
  let backgroundPositionX = -props.spriteIndex * (props.size);
  return (
    <div className={`player-portrait ${extraClass}`}>
      <style jsx>{`
        .player-portrait {
          position: relative;
          border-radius: 0.5rem;
          border: 1px solid black;
          display: flex;
          align-items: flex-end;
          background-image: url(${props.source});
          background-size: cover;
          background-repeat: no-repeat;
          width: ${props.size}px;
          max-width: ${props.size}px;
          height: ${props.size}px;
          background-position-x: ${backgroundPositionX}px;
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
      <div className='player-portrait-label'>{props.displayName}</div>
    </div>
  );
}
PlayerPortrait.propTypes = {
  size: PropTypes.number,
  source: PropTypes.string,
  spriteIndex: PropTypes.number,
  displayName: PropTypes.string,
};


export default PlayerPortrait;