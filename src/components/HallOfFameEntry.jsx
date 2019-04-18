import React from 'react';
import PropTypes from 'prop-types';
import PlayerPortrait from './PlayerPortrait';
import { getTimeSinceFromSeconds } from '../scripts/util';
import { characters } from '../scripts/characters';

function HallOfFameEntry(props) {
  console.warn('rendering HallOfFameEntry', props.entry);
  let bgColor = '#58717a';
  let isSelf = props.entry.playerName === props.loggedInAs;
  if (isSelf) {
    bgColor = '#587a58';
  }
  let matchWinPercent = Math.round((props.entry.matchWins / props.entry.totalMatches) * 100);
  let setWinPercent = Math.round((props.entry.setWins / props.entry.totalSets) * 100);
  if (props.entry.totalMatches == 0) {
    matchWinPercent = '0';
  }
  if (props.entry.totalSets == 0) {
    setWinPercent = '0';
  }
  let characterArray = Object.keys(characters);
  let lastLogin = getTimeSinceFromSeconds(parseInt(props.now) - parseInt(props.entry.lastLogin));
  let rowHeight = props.portraitSize / 3;
  let originalDefeatedList = [...props.entry.cpuDefeated];
  let entryCpuDefeated = [];
  let entryDefeatCounts = {};
  originalDefeatedList.map((opponentName, i, arr) => {
    let isOriginal = arr.indexOf(opponentName) === i;
    if (isOriginal) {
      entryCpuDefeated.push(opponentName);
      entryDefeatCounts[opponentName] = 1;
    } else {
      entryDefeatCounts[opponentName] += 1;
    }    
  });
  entryCpuDefeated = entryCpuDefeated.sort((a, b) => Object.keys(characters).indexOf(a) - Object.keys(characters).indexOf(b));
  return (
    <div id={`high-score-entry-${props.entry.id}`} className='high-score-entry red-panel'>
      <style jsx>{`
        .high-score-entry {
          box-sizing: border-box;         
          width: 100%;
          max-width: calc(var(--mini-card-width) * 8);
          display: ${props.hidden && 'none'};
          font-size: 1.65vh;
          transition: opacity 300ms ease;
          will-change: opacity;
          border: ${isSelf && '5px groove white'};
        }
        .main-body {
          box-sizing: border-box;
          padding: calc(var(--menu-border-width) * 2);
          padding-bottom: var(--menu-border-width);
          //padding-top: calc(var(--menu-border-width) * 2);
          width: 100%;
          display: grid;
          grid-template-columns: auto 3fr 1fr;
          grid-template-rows: ${rowHeight}px ${rowHeight}px ${rowHeight}px auto;
          //grid-row-gap: var(--menu-border-width);
        }
        .name-header {      
          grid-column-start: 0;
          grid-column-end: span 3;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--menu-border-width);
          margin-bottom: var(--menu-border-width);
          font-size: 3vh;
        }
        .last-login {
          font-size: 1.2vh;
        }
        .portrait-area {                    
          grid-row-start: 0;
          grid-row-end: span 4;
          flex-direction: column;
          justify-content: flex-start !important;
          align-items: center;
          text-align: center;
          margin-right: calc(var(--menu-border-width) * 2);
          height: ${props.portraitSize}px;          
        }
        .credits-header {
          box-sizing: border-box;
          background-color: transparent !important;
          border: 0 !important;
          grid-column-end: 4;
        }
        .credit-amount {
          color: var(--option-on-color);
          font-size: 2.5vh;
          padding: var(--menu-border-width);
        }
        .rate-header {
          grid-column-start: 2;      
          background: var(--trans-black-bg-color);
          border-radius: var(--menu-border-width) 0 0 var(--menu-border-width);
          padding: var(--menu-border-width);
          border: 1px solid var(--dark-red-bg-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .rate-result {
          grid-column-start: 3;
          display: flex;   
          justify-content: flex-end;
          align-items: center;
          border-radius: 0 var(--menu-border-width) var(--menu-border-width) 0;
          border: 1px solid var(--dark-red-bg-color);
          border-left: 0;
          padding: var(--menu-border-width);
          color: var(--special-button-text-color);
        }
        .cpu-opponents-header {
          grid-column-end: span 3;
          margin-top: ${'var(--menu-border-width)'};
          padding: var(--menu-border-width);
        }
        .defeated-opponents-list {
          padding-top: ${props.entry.cpuDefeated.length > 0 && 'var(--menu-border-width)'};
          padding-bottom: ${props.entry.cpuDefeated.length > 0 && 'var(--menu-border-width)'};
          grid-column-end: span 3;
          justify-content: flex-start !important;
          display: inline-flex;
          flex-wrap: wrap;
        }
        .obscured-entry {
          opacity: 0;
        }        
      `}</style>
      <div className='name-header'>
        {props.entry.playerName}
        <div className='last-login'>Last login:<br />{lastLogin} ago</div>
      </div>
      <div className='main-body inner-red-panel'>
        <div className='portrait-area'>
          <PlayerPortrait isSelf={isSelf} size={props.portraitSize} spriteIndex={props.entry.avatarIndex} displayName={''} type={'mini'} />
        </div>
        <div className='credits-header rate-header'>Credits: <div className='credit-amount'>{props.entry.credits}</div></div>
        <div className='rate-header'>
          <div>Sets won: </div>
          <div>{props.entry.setWins}/{props.entry.totalSets}</div>
        </div>
        <div className='rate-result'>{setWinPercent}%</div>

        <div className='rate-header'>
          <div>Matches won:</div>
          <div>{props.entry.matchWins}/{props.entry.totalMatches}</div> 
        </div>
        <div className='rate-result'>{matchWinPercent}%</div>

        <div className='cpu-opponents-header'>CPU opponents defeated: {props.entry.cpuDefeated.length === 0 &&  ' None'}</div>
        <div className='defeated-opponents-list'>
          {entryCpuDefeated.length > 0 &&
            entryCpuDefeated.map((cpuName, i) => {
              let portraitIndex = characterArray.indexOf(cpuName);
              return <PlayerPortrait key={i} isSelf={false} size={props.portraitSize / 2.5} cpu={true} spriteIndex={portraitIndex} countDisplay={entryDefeatCounts[cpuName]} displayName={''} type={'mini'} />;
            })
          }          
        </div>
      </div>
    </div>);
}

HallOfFameEntry.defaultProps = {
  hidden: false
};

HallOfFameEntry.propTypes = {
  now: PropTypes.string,
  hidden: PropTypes.bool,
  entry: PropTypes.object,
  portraitSize: PropTypes.number,
  loggedInAs: PropTypes.string,
};

// function areEqual(prevProps, nextProps) {
//   return prevProps.entry.id === nextProps.entry.id;
// }

export default HallOfFameEntry;
// export default React.memo(HallOfFameEntry);




















