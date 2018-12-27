import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import PlayerPortrait from './PlayerPortrait';
import UserInfoPanel from './UserInfoPanel';

function Header(props) {
  let headerHeight = Math.floor(props.cardSize.height * 0.5);
  let portraitSize = headerHeight * 0.8;
  return (
    <div>
      <style jsx>{`
        #header {
          position: relative;
          font-family: 'Bungee';
          min-height: ${headerHeight}px;
          max-height: ${headerHeight}px;
          min-width: 300px;
          background-color: var(--red-bg-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: ${headerHeight * 0.4}px;
          transform: translateY(-100%);
          color: white;
          transition: color 1000ms, transform 600ms;
          border: 0.5vw solid rgba(0, 0, 0, 0.2);
          z-index: 33;
        }
        #user-info-area {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          text-align: right;
          width: 45%;
          margin-right: ${(headerHeight - portraitSize) / 2}px;
        }
        #header-title {
          margin-left: ${headerHeight * 0.2}px;
        }
        .no-bottom-border {
          clip-path: inset(0px 0px 0.75vw 0px);
        }
      `}</style>
      <div id='header'>
        <div id='header-title' className='shadowed-text'>Pazaak.online</div>
        <div id='user-info-area' onClick={props.onClickInfoArea}>
          <PlayingAsIndicator playerName={props.playerName} uniqueId={props.uniqueId} cardSize={props.cardSize} />
          <PlayerPortrait size={portraitSize} source={props.portraitSource} spriteIndex={props.avatarIndex} displayName={''} type={'mini'} />
        </div>
      </div>
    </div>
  );
}
Header.propTypes = {
  cardSize: PropTypes.object,
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
  portraitSource: PropTypes.string,
  avatarIndex: PropTypes.number,
  userStatus: PropTypes.object,
  onClickInfoArea: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickLogOut: PropTypes.func
};
export default Header;