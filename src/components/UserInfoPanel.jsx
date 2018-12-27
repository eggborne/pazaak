import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

function UserInfoPanel(props) {
  let topY = Math.floor(props.cardSize.height * 0.5);
  let portraitSize = props.cardSize.height * 1.4;
  let displayName = props.playerObj.loggedInAs;
  let nameSize = '2rem';
  let signInShowing = 'disabled-button';
  let logOutShowing = '';
  if (!displayName) {
    displayName = 'Player';
    nameSize = '1.2rem';
    signInShowing = '';
    logOutShowing = 'disabled-button';
  }
  return (
    <div id='user-info-panel' className='shadowed-text user-info-panel-off'>
      <style jsx>{`
        #user-info-panel {
          position: absolute;
          width: 100%;
          max-height: ${portraitSize * 3.5}px;
          left: 0;
          top: ${topY}px;
          background-color: var(--red-bg-color);
          font-size: 4.5vw;
          font-family: 'Nova Square';    
          box-sizing: border-box;
          border: 0.5vw solid rgba(0, 0, 0, 0.2);
          border-top: 0;
          border-radius: 0 0 0.5rem 0.5rem;
          transform: translateY(0%);
          display: flex;
          flex-direction: column;
          padding: ${portraitSize / 12}px;
          padding-top: ${portraitSize / 24}px;
          //transition: all 400ms ease;
          display: none;
          z-index: 32;
        }
        #user-info-grid {
          width: 100%;
          //height: 80%;
          display: grid;
          box-sizing: border-box;
          padding: ${portraitSize/12}px;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr ${portraitSize*0.6}px ${portraitSize*0.6}px 2fr;
          align-items: stretch;
          justify-content: center;
          border: 1px solid var(--dark-red-bg-color);
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.1);
        }
        #user-info-sign-in-button {
          font-size:1.25rem;
          height: 65%;
          width: 40%;
        }
        #user-info-log-out-button {
          font-size:1.25rem;
          height: 65%;
          width: 40%;
        }
        #user-info-button-area {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border: 0 !important;
        }
        #user-info-grid > div {
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.25);
        }
        #user-name {
          font-size: ${nameSize};
        }
        #large-user-portrait {
          grid-row-start: 0;
          grid-row-end: span 3;
          justify-self: end;
        }
        .user-area-lower {
          grid-column-start: 0;
          grid-column-end: span 2;
        }
        .user-info-panel-off {
          transform: translateY(-100%) !important;
          border-radius: 0 !important;
        }
        .off-y {
          transform: translateY(calc(-100% - ${Math.floor(props.cardSize.height * 0.5)}px)) !important;
        }
      `}</style>
      <div id='user-info-grid'>
        <div id='user-name'>
          {displayName}
        </div>
        <div id='large-user-portrait'>
          <PlayerPortrait size={portraitSize} source={props.portraitSource} spriteIndex={props.playerObj.avatarIndex} displayName={''} type={'mini'} />
        </div>
        <div>Bong</div>
        <div>Schlong</div>
        <div className='user-area-lower'>Schlong</div>
        <div className='user-area-lower'>Schlong</div>
        <div id='user-info-button-area' className='user-area-lower'>
          <button onClick={props.onClickLogOut} className={`${logOutShowing}`} id='user-info-log-out-button'>Log out</button>
          <button onClick={props.onClickSignIn} className={`${signInShowing}`} id='user-info-sign-in-button'>Sign in</button>
        </div>      
      </div>
    </div>
  );
}
UserInfoPanel.propTypes = {
  playerObj: PropTypes.object,
  cardSize: PropTypes.object,
  portraitSource: PropTypes.string,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func
};

export default UserInfoPanel;