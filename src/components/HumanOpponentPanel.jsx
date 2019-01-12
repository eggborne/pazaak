import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';

function HumanOpponentPanel(props) {
  let portraitSize = Math.floor(props.cardSize.height * 1.75);
  let opponent = props.opponentSelected;
  if (opponent) {
    opponent = props.characters[props.opponentSelected].displayName;
  }
  let extraClasses = ['', ''];
  if (props.selected) {
    extraClasses[0] = 'panel-selected';
    extraClasses[1] = 'disabled-select-button';
  }
  let source = document.getElementById('avatar-sheet').src;
  let displayStatus = props.statuses[props.userObject.phase];
  if (displayStatus) {
    displayStatus = displayStatus.toUpperCase();
  }
  let addendum = '';
  if (props.userObject.phase === 'gameStarted') {
    addendum = ` vs. ${opponent}`;
  }
  let portraitIndex = props.scoreObject.avatarIndex;
  let usersDefeated = props.scoreObject.usersDefeated;
  let usersFought = props.scoreObject.usersFought;
  let winPercent = ((usersDefeated / usersFought) * 100).toPrecision(3);
  if (!usersDefeated) {
    winPercent = 0;
  }
  return (
    <div id={`human-panel-${props.userObject.userId}`} className={`human-select-entry ${extraClasses[0]}`}>
      <style jsx>{`
        .human-select-entry {
          box-sizing: border-box;
          margin: 2vh 0 2vh 0;
          border: ${props.isSelf ? '0' : '1px solid #333'};
          display: grid;
          grid-template-columns: ${portraitSize}px 1fr;
          grid-template-rows: 1.35fr ${!props.isSelf && '1fr'};
          border-radius: 0.5rem;
          background-color: ${props.isSelf ? 'transparent' : 'var(--trans-blue-bg-color)'};
          padding: 2vw;
        }
        .human-info-area {
          position: relative;
          box-sizing: border-box;
          height: ${portraitSize}px;
          padding-left: 0.75rem;
          display: grid;
          align-items: center;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 1fr auto 1fr;
        }
        .human-info-area > div {
          font-size: 0.75rem;
        }
        .human-info-area > .human-name-label {
          font-size: 1rem;
          color: ${props.isSelf ? 'white' : 'goid ==ld'}
        }
        .human-info-area > .human-panel-right-side {
          box-sizing: border-box;
          grid-row-start: 0;
          grid-row-end: span 4;
          background-color: ${props.isSelf ? 'transparent' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 0.375rem;
          
          color: lightblue;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .human-info-area > .human-panel-right-side > div {
          padding: 1vw;
        }
        .human-win-percent {
          font-size: 1.1rem;
          color: green;
        }
        .human-panel-button-area {
          display: none;
          display: ${!props.isSelf && 'grid'};;
          grid-template-columns: 1fr 1.2fr 1.2fr;
          grid-template-rows: 1fr;
          grid-column-start: 1;
          grid-column-end: span 2;
          grid-gap: 0.5rem;
          align-items: end;
        }
        .human-panel-button {
          height: 85%;
        }
        .ping-display {
          display: ${props.isSelf && 'none'};
          font-size: 0.65rem;
        }
        .session-display {
          font-size: 0.65rem;
        }
        .status-area {
          color: #afa;
          display: ${props.isSelf && 'none'};
        }
        .chat-button-label {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 1rem;
          pointer-events: none;
        }
      `}
      </style>
      <PlayerPortrait isSelf={props.isSelf} size={portraitSize} source={source} spriteIndex={portraitIndex} displayName={''} type={'humanPanel'} />
      <div id={`human-info-area-${props.userObject.userId}`} className='human-info-area'>
        <div className='human-name-label'>{props.userObject.userName}</div>
        <div className='human-panel-right-side'>
          <div>Win %</div>
          <div className='human-win-percent'>{winPercent}%</div>
          <div className='human-win-count'>{usersDefeated} - {usersFought}</div>
          <div></div>
        </div>
        <div className='status-area'>{`${displayStatus}${addendum}`}</div>
        <div>
          <div className='session-display'>Current session: <span id={`session-display-${props.userObject.userId}`}></span></div>
          <div className='ping-display'>ping: <span id={`ping-display-${props.userObject.userId}`}></span></div>
        </div>
      </div>
      <div className={'human-panel-button-area'}>
        <button onClick={props.onClickMoreInfo} id={`more-info-button-${props.userObject.userId}`} className={'human-panel-button more-info-button'}>More Info</button>
        <button onClick={props.onClickSendMessage} id={`send-message-button-${props.userObject.userId}`} className='human-panel-button send-message-button'><div className='chat-button-label'>Chat <i className='material-icons chat-icon'>chat</i></div></button>
        <button onClick={props.onClickRequestMatch} id={`request-match-button-${props.userObject.userId}`} className={`human-panel-button request-match-button ${props.userObject.phase === 'gameStarted' && 'disabled-button'}`}>Request Match!</button>
      </div>
    </div>
  );
}
HumanOpponentPanel.propTypes = {
  characters: PropTypes.object,
  isSelf: PropTypes.bool,
  opponentSelected: PropTypes.string,
  cardSize: PropTypes.object,
  avatarIndex: PropTypes.number,
  userObject: PropTypes.object,
  scoreObject: PropTypes.object,
  statuses: PropTypes.object,
  onClickMoreInfo: PropTypes.func,
  onClickSendMessage: PropTypes.func,
  onClickRequestMatch: PropTypes.func
};

export default HumanOpponentPanel;




















