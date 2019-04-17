import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import Card from './Card';
import { characters, prizeCards } from '../scripts/characters';

function UserCard(props) {
  console.info('userccard rnderein', props);
  let portraitSize = window.innerWidth / 3;
  let nameSize = '1.4rem';
  let loggedIn = false;
  let logButtons = true;
  let displayName = props.loggedInAs;
  if (props.loggedInAs !== 'Guest') {
    loggedIn = props.loggedInAs;
    logButtons = true;
  }
  let defeatedArray = props.playerObj.cpuDefeated;
  if (!defeatedArray) {
    defeatedArray = [];
  }
  let wonArray = props.wonCards;
  console.info(wonArray)
  let originalDefeatedList = [...props.playerObj.cpuDefeated];
  let entryCpuDefeated = [];
  let entryDefeatCounts = {};
  originalDefeatedList.map((opponentName, i, arr) => {
    let isOriginal = arr.indexOf(opponentName) === i;
    if (isOriginal) {
      entryCpuDefeated.push(opponentName)
      entryDefeatCounts[opponentName] = 1;
    } else {
      entryDefeatCounts[opponentName] += 1;
    }    
  });
  return (
    <div id='user-info-grid' className='shadowed-text'>
      <style jsx>{`
        #user-info-grid {
          width: 100%;
          display: grid;
          box-sizing: border-box;
          padding: var(--menu-border-radius);
          font-size: var(--small-font-size);
          margin-top: calc(var(--menu-border-width) * 2);
          grid-template-columns: 1fr auto;
          grid-template-rows: var(--header-height) 0.75fr 0.75fr;
          background-color: var(--medium-red-bg-color);
          border: var(--inner-menu-border);
          border-radius: var(--menu-border-width);
        }
        #user-info-grid > div {
          //padding: 0.25rem;
        }
        #user-info-sign-in-button, #user-info-log-out-button, #info-modal-close-button {
          //padding: 1rem;
          //font-size: var(--small-font-size);
          width: 40%;
        }
        #user-info-sign-in-button, #user-info-log-out-button {
          padding: 1.5vh;
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
          font-size: var(--small-font-size);
          text-align: center;
        }
        #id-display {
          font-size: 0.6rem !important;
          margin-top: 0.25rem;
          text-align: center;
          text-shadow: none;
          color: #ddd;
          display: ${props.loggedInAs !== 'Guest' || 'none'};
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
        #defeated-list, #won-list {
          display: inline-flex;
          width: 100%;
        }
        #defeated-list > div, #won-list > div {
          margin: 0.25rem !important;
          margin-left: 0 !important;
        }
        .user-area-lower {
          grid-column-start: 0;
          grid-column-end: span 2;
        }
        #defeated-list, #won-list {
          padding: 0.25rem;
          display: inline-flex;
          flex-wrap: wrap;          
        }
        #user-info-button-area {
          
        }
      `}</style>
      <div id='user-name'>
        {displayName}<br />
      </div>
      <div id='large-user-portrait'>
        <PlayerPortrait size={portraitSize} spriteIndex={props.playerObj.avatarIndex} displayName={''} type={'mini'} />
        <div id='credits'></div>
        <div id='id-display'>id #{props.userID}</div>
      </div>
      <div>
        Sets won: {props.setWins}<br />
        Sets played: {props.totalSets}
      </div>
      <div>
        Matches won: {props.matchWins}<br />
        Matches played: {props.totalMatches}
      </div>
      <div id='defeated-area' className='user-area-lower'>
        CPU Opponents Defeated:
        <div id='defeated-list' >
          {entryCpuDefeated.length > 0 && entryCpuDefeated.map((opponent, i) => {
            let opponentSpriteIndex = Object.keys(characters).indexOf(opponent);
            return (
              <div key={i}>
                <PlayerPortrait size={portraitSize / 3.5} cpu={true} spriteIndex={opponentSpriteIndex} countDisplay={entryDefeatCounts[opponent]} displayName={''} type={'mini'} />
              </div>);
          })}
          {entryCpuDefeated.length === 0 && <div>None</div>}
        </div>
      </div>
      <div id='won-cards-area' className='user-area-lower'>
        Cards won:
        <div id='won-list' >
          {wonArray.length > 0 && wonArray.map((cardIndex, i) => {
            let card = prizeCards[cardIndex];
            console.info('doing cardindex', cardIndex)
            console.info('doing card', card)
            return (
              <div key={i}>
                <Card id={i} context={'user-card-won'} size={'prize'} value={card.value} type={card.type} />
              </div>);
          })}
          {wonArray.length === 0 && <div>None</div>}
        </div>
      </div>
      <div id='user-info-button-area' className={'user-area-lower'}>
        <div className={!logButtons && 'display-none'}>
          <button {...{ [props.clickFunction]: props.onClickLogOut }} className={!loggedIn && 'display-none'} id='user-info-log-out-button'>Log out</button>
          <button {...{ [props.clickFunction]: props.onClickSignIn }} className={loggedIn && 'display-none'} id='user-info-sign-in-button'>Log in</button>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  playerObj: PropTypes.object,
  totalSets: PropTypes.number,
  totalMatches: PropTypes.number,
  setWins: PropTypes.number,
  matchWins: PropTypes.number,
  wonCards: PropTypes.array,
  onClickLogOut: PropTypes.func,
  onClickSignIn: PropTypes.func,
  onClickCloseButton: PropTypes.func,
};

function areEqual(prevProps, nextProps) {
  let equalTest = prevProps.totalSets == nextProps.totalSets;
  console.log('prevProps.totalSets == nextProps.totalSets', equalTest)
  return equalTest;
}

export default UserCard;