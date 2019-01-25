import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import { characters } from '../scripts/characters';

function UserCard(props) {
  let portraitSize = window.innerWidth / 4;
  let borderSize = '1px';
  let nameSize = '1.4rem';
  let loggedIn =  true;
  let logButtons = true;
  let displayName;
  if (props.playerObj.loggedInAs) {
    loggedIn = props.playerObj.loggedInAs;
    logButtons = true;
    displayName = props.playerObj.loggedInAs;
  }
  if (props.playerObj.playerName) {
    displayName = props.playerObj.playerName;
  }
  let defeatedArray = props.playerObj.cpuDefeated;
  if (!defeatedArray) {
    defeatedArray = [];
  }
  return (
    <div id='user-info-grid' className='shadowed-text'>
      <style jsx>{`
        #user-info-grid {
          width: 100%;
          display: grid;
          box-sizing: border-box;
          padding: 1rem;
          grid-template-columns: 1fr auto;
          grid-template-rows: 1.5fr 1fr 1fr 1.25fr;
          background: var(--medium-red-bg-color);
          border-radius: var(--menu-border-radius);
        }
        #user-info-grid > div {
          padding: 0.25rem;
        }
        #user-info-sign-in-button, #user-info-log-out-button, #info-modal-close-button {
          padding: 1rem;
          font-size:1rem;
          width: 40%;
        }
        #user-info-sign-in-button, #user-info-log-out-button {
          padding: 1rem;
          font-size:1rem;
          width: 100%;
        }
        #user-info-button-area {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        #user-info-grid > div {
          box-sizing: border-box;
        }
        #user-name {
          font-size: ${nameSize};
          color: var(--option-on-color);
        }
        #credits {
          margin-top: 0.5rem;
          font-size: 1rem !important;
          text-align: center;
        }
        #id-display {
          font-size: 0.6rem !important;
          margin-top: 0.25rem;
          text-align: center;
          text-shadow: none;
          color: #ddd;
        }
        #large-user-portrait {
          grid-row-start: 0;
          grid-row-end: span 3;
        }
        #defeated-area {
          display: flex;
          flex-direction: column;
          justify-content: space-between
        }
        #defeated-list {
          display: inline-flex;
          width: 100%;
        }
        #defeated-list > div {
          margin: 0.25rem !important;
          margin-left: 0 !important;
        }
        .user-area-lower {
          grid-column-start: 0;
          grid-column-end: span 2;
        }
        #defeated-list {
          padding: 0.25rem;
          display: inline-flex;
          flex-wrap: wrap
        }
      `}</style>
      <div id='user-name'>
        {displayName}<br />

      </div>
      <div id='large-user-portrait'>
        <PlayerPortrait size={portraitSize} spriteIndex={props.playerObj.avatarIndex} displayName={''} type={'mini'} />
        <div id='credits'>{props.playerObj.credits} credits</div>
        {/* <div id='id-display'>id #{props.playerObj.cookieId}</div> */}
      </div>
      <div>
        Sets won: {props.playerObj.setWins}<br />
        Sets played: {props.playerObj.totalSets}
      </div>
      <div>
        Matches won: {props.playerObj.matchWins}<br />
        Matches played: {props.playerObj.totalMatches}
      </div>
      <div id='defeated-area' className='user-area-lower'>
        CPU Opponents Defeated
        <div id='defeated-list' >
          {defeatedArray.length > 0 && defeatedArray.map((opponent, i) => {
            let opponentSpriteIndex = Object.keys(characters).indexOf(opponent);
            return (
              <div key={i}>
                <PlayerPortrait size={portraitSize / 3.5} cpu={true} spriteIndex={opponentSpriteIndex} displayName={''} type={'mini'} />
              </div>);
          })}
          {defeatedArray.length === 0 && <div>None</div>}
        </div>
      </div>
      <div id='user-info-button-area' className={'user-area-lower'}>
        <div className={!logButtons && 'display-none'}>
          <button {...{ [props.clickFunction]: props.onClickLogOut }} className={!loggedIn && 'display-none'} id='user-info-log-out-button'>Log out</button>
          <button {...{ [props.clickFunction]: props.onClickSignIn }} className={loggedIn && 'display-none'} id='user-info-sign-in-button'>Sign in</button>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  playerObj: PropTypes.object,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickCloseButton: PropTypes.func,
};

function areEqual(prevProps, nextProps) {
  return prevProps.playerObj.cookieId == nextProps.cookieId;
}

export default React.memo(UserCard, areEqual);