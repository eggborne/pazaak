import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
let characters = require('../scripts/characters');

function HallOfFameEntry(props) {
  let bgColor = 'rgba(0, 0, 0, 0.1)';
  if (props.entry.playerName === props.loggedInAs) {
    bgColor = 'rgba(0, 255, 0, 0.3)';
  }
  let matchWinPercent = Math.round((props.entry.matchWins / props.entry.totalMatches) * 100);
  let userWinPercent = Math.round((props.entry.usersDefeated / props.entry.usersFought) * 100);
  if (props.entry.totalMatches == 0) {
    matchWinPercent = '0';
  }
  if (props.entry.usersFought == 0) {
    userWinPercent = '0';
  }
  let characterArray = Object.keys(characters.characters);
  return (
    <div id={`high-score-entry-${props.entry.id}`} className='high-score-entry'>
      <style jsx>{`
        .high-score-entry {
          position: relative;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 2fr;
          width: 95vw;
          margin: 1rem;
        }
        .main-body {
          box-sizing: border-box;
          background-color: ${bgColor};
          border: 1px solid #333;
          border-top: none;
          border-radius: 0rem 0.5rem 0.5rem 0.5rem;
          padding: 0.5rem;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.25rem;
        }
        .main-body > div {
          box-sizing: border-box;
          //border: 1px solid blue;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .name-tab {
          border: 1px solid #333;
          border-bottom: none;
          color: gold;
          font-size: 1.1rem;
          background-color: ${bgColor};
          padding: 0.5rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          justify-self: start;
          border-radius: 0.5rem 0.5rem 0rem 0;
        }
        .portrait-area {
          grid-row-start: 0;
          grid-row-end: span 6;
          flex-direction: column;
          justify-content: flex-start !important;
        }
        .under-portrait {
          color: var(--option-on-color);
          margin: 0.5rem;
        }
        .cpu-opponents-header {
          grid-column-start: 2;
          grid-column-end: span 2;
          justify-content: flex-start !important;
        }
        .rate-header {
          padding: 0.25rem;
          background-color: ${bgColor};
          border-radius: 0.25rem 0.25rem 0 0;
        }
        .defeated-opponents-list {
          padding: 0.25rem;
          grid-column-start: 2;
          grid-column-end: span 2;
          justify-content: flex-start !important;
          display: inline-flex;
          flex-wrap: wrap
        }
      `}</style>
      <div className='name-tab'>{props.entry.playerName}</div>
      <div className='main-body'>
        <div className='portrait-area'>
          <PlayerPortrait isSelf={props.isSelf} size={window.innerHeight * 0.12} source={document.getElementById('avatar-sheet').src} spriteIndex={props.entry.avatarIndex} displayName={''} type={'mini'} />
          <div className='under-portrait'>{props.entry.credits} credits</div>
        </div>        
        <div className='rate-header'>Human win rate</div>
        <div className='rate-header'>CPU win rate</div>
        <div>{props.entry.usersDefeated} / {props.entry.usersFought}</div>
        <div>{props.entry.matchWins} / {props.entry.totalMatches}</div>
        <div>{userWinPercent}%</div>
        <div>{matchWinPercent}%</div>
        <div className='cpu-opponents-header rate-header'>CPU opponents defeated</div>
        <div className='defeated-opponents-list'>
          {props.entry.cpuDefeated.length > 0 && props.entry.cpuDefeated.map((cpuName, i) => {
            let portraitIndex = characterArray.indexOf(cpuName);
            return <PlayerPortrait key={i} isSelf={false} size={Math.ceil(window.innerWidth*0.11)} source={'https://pazaak.online/assets/images/opponentsheet.jpg'} spriteIndex={portraitIndex} displayName={''} type={''} />;
          })}
          {props.entry.cpuDefeated.length === 0 && <div>None</div>}
        </div>      
      </div>
      
    </div>);
}
HallOfFameEntry.propTypes = {
  entry: PropTypes.object,
  loggedInAs: PropTypes.string
};

export default HallOfFameEntry;




















