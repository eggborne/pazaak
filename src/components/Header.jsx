import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import PlayerPortrait from './PlayerPortrait';

function Header(props) {
  let headerHeight = Math.floor(props.cardSize.height * 0.5);
  let portraitSize = headerHeight * 0.8;
  let outerMargin = (headerHeight - portraitSize) / 2;
  let loggedIn = '';
  if (props.userStatus.loggedInAs) {
    loggedIn = true;
  }
  let accountIconColor = 'white';
  // let portraitIndex = props.avatarIndex;
  let portraitIndex = props.userStatus.avatarIndex;
  return (
    <div>
      <style jsx>{`
        #header {
          //box-sizing: border-box;
          position: relative;
          font-family: 'Nova Square';
          min-height: ${headerHeight}px;
          max-height: ${headerHeight}px;
          min-width: 300px;
          background-color: var(--red-bg-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--header-text-size);
          color: var(--main-text-color);
          transition: color 1000ms, transform 600ms;
          border: 0.5vw solid rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: all 400ms ease;
          z-index: 33;
        }
        #user-info-area {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          text-align: right;
          flex-grow: 1;
          margin-right: ${outerMargin}px;
        }
        #header-title {
          font-family: 'Bungee';
          line-height: 100%;
          margin-left: ${outerMargin}px;
        }
        .corner-button-area {
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: ${portraitSize * 1.35}px;
          height: ${headerHeight}px;
          margin: 0;
          border-radius: 0.25rem;
          transition: 400ms ease;
        }        
        #user-account-icon {
          position: absolute;
          opacity: 0.7;
          font-size: ${headerHeight * 1}px;
          transform-origin: center;
          transform: scale(0.75);
          transition: 400ms ease;
          color: ${accountIconColor};
        }
        
        .minimized {
          transform: scale(0.75);
          opacity: 0.5;
        }
        #corner-area-1 {
          
        }
        #corner-area-0 {
          
        }
        #user-account-x {
          position: absolute;
          color: gray;
          font-size: 2.25em;
          font-weight: 40px;
          z-index: 3;
          display: ${loggedIn && 'none'};
        }
        .corner-button-on {
          transform: scale(1.05) !important;
          color: #9f9 !important;
          opacity: 0.6 !important;
        }
        .messages-button-on {
          transform: scale(1.05) !important;
          color: #afa !important;
          opacity: 1 !important;
        }
        .no-bottom-border {
          clip-path: inset(0px 0px 0.75vw 0px);
        }
      `}</style>
      <div id='header'>
        <div id='header-title' className='shadowed-text'>
          <div>Pazaak.online</div>
        </div>
        <div id='user-info-area'>
          <PlayingAsIndicator playerName={props.playerName} uniqueId={props.uniqueId} cardSize={props.cardSize} />
          <div id='corner-area-1' className={`corner-button-area ${!loggedIn && 'no-pointer'}`} >

          </div>
          <div id='corner-area-0' onClick={props.onClickAccountArea} className='corner-button-area'>
            <PlayerPortrait size={portraitSize} source={props.portraitSources.user} spriteIndex={portraitIndex} displayName={''} type={'micro'} />
            <i id='user-account-icon' className="material-icons shadowed-text">
              account_box
            </i>
            <i id='user-account-x' className="material-icons md-36">
              clear
            </i>
          </div>

        </div>

      </div>
    </div>
  );
}
Header.propTypes = {
  cardSize: PropTypes.object,
  playerName: PropTypes.string,
  uniqueId: PropTypes.number,
  portraitSources: PropTypes.object,
  avatarIndex: PropTypes.number,
  userStatus: PropTypes.object,
  onClickAccountArea: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickLogOut: PropTypes.func,
  usersHere: PropTypes.array
};
export default Header;