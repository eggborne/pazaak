import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
let characters = require('../scripts/characters');

function HallOfFameEntry(props) {
  console.error('entry', props.entry)
  let bgColor = 'rgba(0, 0, 0, 0.1)';
  let isSelf = props.entry.playerName === props.loggedInAs;
  if (isSelf) {
    bgColor = 'rgba(0, 200, 0, 0.1)';
  }
  let portraitSize = window.innerHeight * 0.12;
  let matchWinPercent = Math.round((props.entry.matchWins / props.entry.totalMatches) * 100);
  let setWinPercent = Math.round((props.entry.setWins / props.entry.totalSets) * 100);
  if (props.entry.totalMatches == 0) {
    matchWinPercent = '0';
  }
  if (props.entry.totalSets == 0) {
    setWinPercent = '0';
  }
  let characterArray = Object.keys(characters.characters);
  let lastLogin = props.getNiceTimeFromSeconds(parseInt(props.now)-parseInt(props.entry.lastLogin));
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
          padding-top: 1rem;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          grid-template-rows:  auto;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.5rem;
        }
        .main-body > div {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-area {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
        .name-tab {
          border: 1px solid #333;
          border-bottom: none;
          color: gold;
          font-size: 1.1rem;
          background-color: ${bgColor};
          padding: 0.5rem 0.75rem 0.25rem 0.75rem;
          border-radius: 0.5rem 0.5rem 0rem 0;
        }
        .last-login-tab {
          margin-right: 0.5rem;
        }
        .portrait-area {
          grid-row-start: 0;
          grid-row-end: span 6;
          flex-direction: column;
          justify-content: flex-start !important;
          text-align: center;
        }
        .under-portrait {
          font-size: 0.9em;
          margin: 0.5rem;
          max-width: ${portraitSize}px;
        }
        .cpu-opponents-header, .credits-header {
          grid-column-start: 2;
          grid-column-end: span 2;
          justify-content: flex-start !important;
        }
        .credits-header {
          justify-content: flex-end !important;
        }
        .credit-amount {
          color: var(--option-on-color);
          font-size: 1.2em;
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
      <div className='tab-area'>
        <div className='name-tab'>{props.entry.playerName}{isSelf && ' (you)'}</div>        
      </div>
      <div className='main-body'>
        <div className='portrait-area'>
          <PlayerPortrait isSelf={isSelf} size={portraitSize} source={document.getElementById('avatar-sheet').src} spriteIndex={props.entry.avatarIndex} displayName={''} type={'mini'} />
          <div className='under-portrait'>Last login:<br />{lastLogin} ago</div>
        </div>
        <div className='credits-header rate-header'>Credits:&nbsp;<span className='credit-amount'>{props.entry.credits}</span></div>

        <div className='rate-header'>Sets won</div>
        <div className='rate-header'>Matches won</div>
        <div>{props.entry.setWins} / {props.entry.totalSets}</div>
        <div>{props.entry.matchWins} / {props.entry.totalMatches}</div>
        <div>{setWinPercent}%</div>
        <div>{matchWinPercent}%</div>
        <div className='cpu-opponents-header rate-header'>CPU opponents defeated</div>
        <div className='defeated-opponents-list'>
          {props.entry.cpuDefeated.length > 0 && props.entry.cpuDefeated.map((cpuName, i) => {
            let portraitIndex = characterArray.indexOf(cpuName);
            return <PlayerPortrait key={i} isSelf={false} size={Math.ceil(window.innerWidth * 0.11)} source={'https://pazaak.online/assets/images/opponentsheet.jpg'} spriteIndex={portraitIndex} displayName={''} type={''} />;
          })}
          {props.entry.cpuDefeated.length === 0 && <div>None</div>}
        </div>
      </div>

    </div>);
}
HallOfFameEntry.propTypes = {
  now: PropTypes.string,
  entry: PropTypes.object,
  loggedInAs: PropTypes.string,
  getNiceTimeFromSeconds: PropTypes.func
};

export default HallOfFameEntry;




















