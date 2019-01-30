import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import { portraitSources } from '../scripts/db';

let characters = require('../scripts/characters');

function HallOfFameEntry(props) {
  // console.warn('rendering HallOfFameEntry', props.entry)
  let bgColor = '#58717a';
  let isSelf = props.entry.playerName === props.loggedInAs;
  if (isSelf) {
    bgColor = '#587a58';
  }
  let portraitSize = window.innerHeight * 0.1;
  let matchWinPercent = Math.round((props.entry.matchWins / props.entry.totalMatches) * 100);
  let setWinPercent = Math.round((props.entry.setWins / props.entry.totalSets) * 100);
  if (props.entry.totalMatches == 0) {
    matchWinPercent = '0';
  }
  if (props.entry.totalSets == 0) {
    setWinPercent = '0';
  }
  let characterArray = Object.keys(characters.characters);
  let lastLogin = props.getTimeSinceFromSeconds(parseInt(props.now) - parseInt(props.entry.lastLogin));
  return (
    <div id={`high-score-entry-${props.entry.id}`} className='high-score-entry'>
      <style jsx>{`
        .high-score-entry {
          box-sizing: border-box;         
          width: 92vw;          
        }
        .main-body {
          box-sizing: border-box;
          background-color: ${bgColor};
          border: 1px solid #333;
          border-radius: 0 var(--menu-border-radius) var(--menu-border-radius) var(--menu-border-radius);
          padding: 0.5rem;
          padding-top: 1rem;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          grid-column-gap: 0.5rem;
          grid-row-gap: 0.5rem;
        }
        .tab-area {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: flex-end;
        }
        .name-tab {
          border: 1px solid #222;
          border-bottom: none;
          color: gold;
          font-size: 1.1rem;
          background-color: ${bgColor};
          padding: 0.5rem 0.75rem 0.5rem 0.5rem;
          border-radius: var(--menu-border-radius) var(--menu-border-radius) 0 0;
        }
        .last-login-tab {
          border: none;
          background-color: transparent;
          padding: 0.5rem;
          border-radius: var(--menu-border-radius) var(--menu-border-radius) 0 0;
        }
        .portrait-area {
          grid-row-start: 0;
          grid-row-end: span 4;
          flex-direction: column;
          justify-content: flex-start !important;
          text-align: center;
        }
        .credits-header {
          background-color: transparent !important;
          border: 0 none !important;

        }
        .credits-header {
          display: block;
        }
        .credit-amount {
          color: var(--option-on-color);
          font-size: 1.5em;
        }
        .rate-header {          
          border: 1px solid #333;
          padding: 0.25rem;
          background-color: rgba(0, 0, 0, 0.1);
          display: inline-flex:
          justify-content: space-between;
        }  
        .cpu-opponents-header {
          grid-column-end: span 3;
        }
        .defeated-opponents-list {
          min-height: ${portraitSize/2}px;
          grid-column-start: 0;
          grid-column-end: span 3;
          justify-content: flex-start !important;
          display: inline-flex;
          flex-wrap: wrap
        }
      `}</style>
      <div className='tab-area'>
        <div className='name-tab'>{props.entry.playerName}{isSelf && ' (you)'}</div>
        <div className='last-login-tab'>Last login: {lastLogin} ago</div>
      </div>
      <div className='main-body'>
        <div className='portrait-area'>
          <PlayerPortrait isSelf={isSelf} size={portraitSize} spriteIndex={props.entry.avatarIndex} displayName={''} type={'mini'} />
        </div>
        <div className='credits-header rate-header'>Credits:&nbsp;<span className='credit-amount'>{props.entry.credits}</span></div>
        <div></div>
        <div className='rate-header'><div>Sets won</div><div>{setWinPercent}%</div></div>
        <div className='rate-header'><div>Matches won</div> <div>{matchWinPercent}%</div></div>
        <div className='rate-result'>{props.entry.setWins} / {props.entry.totalSets}</div>
        <div className='rate-result'>{props.entry.matchWins} / {props.entry.totalMatches}</div>
        <div></div>
        <div></div>
        <div className='cpu-opponents-header rate-header'>CPU opponents defeated</div>
        <div className='defeated-opponents-list'>
          {props.entry.cpuDefeated.length > 0 && props.entry.cpuDefeated.map((cpuName, i) => {
            let portraitIndex = characterArray.indexOf(cpuName);
            return <PlayerPortrait key={i} isSelf={false} size={portraitSize/2} cpu={true} spriteIndex={portraitIndex} displayName={''} type={'mini'} />;
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
  getTimeSinceFromSeconds: PropTypes.func
};

function areEqual(prevProps, nextProps) {
  return prevProps.entry.id === nextProps.entry.id;
}

// export default HallOfFameEntry;
export default React.memo(HallOfFameEntry, areEqual);




















