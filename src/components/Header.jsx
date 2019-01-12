import React from 'react';
import PropTypes from 'prop-types';
import PlayingAsIndicator from './PlayingAsIndicator';
import PlayerPortrait from './PlayerPortrait';

function Header(props) {
  let headerHeight = Math.floor(props.cardSize.height * 0.5);
  let portraitSize = headerHeight * 0.8;
  let outerMargin = (headerHeight - portraitSize) / 2;
  let mailColorThrobbing = '';
  let mailSizeThrobbing = '';
  let loggedIn = '';
  let messageCount = 0;
  if (props.userStatus.messages) {
    messageCount = props.userStatus.unreadMessages;
  }
  let messagesOff = 'minimized';
  if (props.userStatus.loggedInAs) {
    loggedIn = true;
  }
  if (messageCount > 0) {
    mailColorThrobbing = 'throb-mail-color';
    mailSizeThrobbing = 'throb-mail-size';
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
        #players-here-display {          
          font-family: 'Nova Square';
          font-size: 0.55em;
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
        #user-message-icon-container, #user-message-icon {
          height: ${headerHeight}px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
        }
        #user-message-icon {
          background-clip: text !important;
          font-size: ${headerHeight}px;
          opacity: 0.75;
          transform-origin: center;
          transform: scale(0.85);
          transition: 400ms ease;
          color: #aaa;
        }
        .minimized {
          transform: scale(0.75);
          opacity: 0.5;
        }
        #user-message-count::after {
          content: ${messageCount};
        }
        #user-message-count {
          box-sizing: border-box;
          position: absolute;
          transform-origin: center;
          transform: scale(0.85);
          padding-bottom: 1vh;
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
        .throb-mail-size {
          animation: throb-mail-size var(--pulse-speed) infinite;
        }
        .throb-mail-color {
          animation: throb-mail-color var(--pulse-speed) infinite;
        }
        @keyframes throb-mail-size {
          0% {
            transform: scale(0.85);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.85);
          }
        }
        @keyframes throb-mail-color {
          0% {
            color: #ffa;
          }
          50% {
            color: #ff8c0a;
          }
          100% {
            color: #ffa;
          }
        }
        .no-bottom-border {
          clip-path: inset(0px 0px 0.75vw 0px);
        }
      `}</style>
      <div id='header'>

        <div id='header-title' className='shadowed-text'>
          <div>Pazaak.online</div>
          <div id='players-here-display'><span className='bigger'>{props.usersHere.length}</span> users here now</div>
        </div>

        <div id='user-info-area'>

          <PlayingAsIndicator playerName={props.playerName} uniqueId={props.uniqueId} cardSize={props.cardSize} />

          <div id='corner-area-1' onClick={props.onClickMessageArea} className={`corner-button-area ${!loggedIn && 'no-pointer'}`} >
            <div id='user-message-icon-container' className={`${mailSizeThrobbing} ${messagesOff}`}>
              <i id='user-message-icon' className={`material-icons shadowed-text ${mailColorThrobbing}`}>
                chat_bubble
              </i>
              <span id='user-message-count' className='shadowed-text'>{messageCount}</span>
            </div>
          </div>

          <div id='corner-area-0' onClick={props.onClickAccountArea} className='corner-button-area'>
            <PlayerPortrait size={portraitSize} source={props.portraitSource} spriteIndex={portraitIndex} displayName={''} type={'micro'} />
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
  portraitSource: PropTypes.string,
  avatarIndex: PropTypes.number,
  userStatus: PropTypes.object,
  onClickAccountArea: PropTypes.func,
  onClickMessageArea: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickLogOut: PropTypes.func,
  usersHere: PropTypes.array
};
export default Header;