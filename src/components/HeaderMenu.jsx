import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';

function HeaderMenu(props) {
  let headerHeight = Math.floor(props.cardSize.height * 0.5);
  let topY = Math.floor(props.cardSize.height * 0.5);
  let portraitSize = props.cardSize.height * 1.3;
  return (
    <div id='user-info-panel' className='shadowed-text user-info-panel-off'>
      <style jsx>{`
        #user-info-panel {
          position: absolute;
          width: 100%;
          //max-height: ${portraitSize * 3.5}px;
          left: 0;
          top: ${topY}px;
          background-color: var(--red-bg-color);
          font-size: 0.8rem;
          font-family: 'Nova Square';    
          box-sizing: border-box;
          border: 0.5vw solid rgba(0, 0, 0, 0.2);
          border-top: 0;
          border-radius: 0 0 0.5rem 0.5rem;
          transform: translateY(0%);
          display: flex;
          flex-direction: column;
          //padding: ${portraitSize / 12}px;
          padding: ${headerHeight * 0.1}px;
          padding-top: ${portraitSize / 24}px;
          transition: all 400ms ease;
          z-index: 18;
          opacity: 0;
        }
        .user-info-panel-off {
          transform: translateY(-100%) !important;
          border-radius: 0 !important;
        }
        .off-y {
          //transform: translateY(calc(-100% - ${Math.floor(props.cardSize.height * 0.5)}px)) !important;
          transform: translateY(-100%) !important;
        }
      `}</style>
      <UserCard playerObj={props.playerObject}
        cardSize={props.cardSize}
        portraitSources={props.portraitSources}
        onClickCloseButton={props.onClickCloseButton}
        onClickLogOut={props.onClickLogOut}
        onClickSignIn={props.onClickSignIn} />
    </div>
  );
}
HeaderMenu.propTypes = {
  mode: PropTypes.string,
  playerObject: PropTypes.object,
  cardSize: PropTypes.object,
  characters: PropTypes.object,
  portraitSources: PropTypes.object,
  onClickCloseButton: PropTypes.func,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func
};

export default HeaderMenu;