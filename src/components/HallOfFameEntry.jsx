import React from 'react';
import PropTypes from 'prop-types';

function HallOfFameEntry(props) {
  let bgColor = 'rgba(0, 0, 0, 0.1)';
  if (props.entry.playerName === props.currentUser) {
    bgColor = 'rgba(0, 255, 0, 0.3)';
  }
  let setWinPercent = Math.round((props.entry.setWins / props.entry.totalSets) * 100);
  let roundWinPercent = Math.round((props.entry.roundWins / props.entry.totalRounds) * 100);
  if (props.entry.totalRounds == 0) {
    roundWinPercent = '0';
  }
  if (props.entry.totalRounds == 0) {
    setWinPercent = '0';
  }
  return (
    <div id={`high-score-entry-${props.entry.id}`} className='high-score-entry'>
      <style jsx>{`
        .high-score-entry {
          position: relative;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1.5fr 1.25fr 1.25fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          width: 95vw;
          height: 6rem;
          background-color: ${bgColor};
          border-bottom: 1px solid #333;
          border-radius: 1rem;
          margin: 1rem;
          padding: 0 1rem 0 1rem;
          justify-items: end;
          align-items: center;
        }
        .high-score-entry > div {
          //justify-self: center;
        }
        .high-score-entry > div:nth-child(1), .high-score-entry > div:nth-child(6) {
          justify-self: start;
        }
      `}</style>
      <div>{props.entry.playerName}</div>
      <div>{props.entry.usersDefeated}</div>
      <div>{props.entry.cpuDefeated.length}/6</div>
      <div>{props.entry.setWins}/{props.entry.totalSets}</div>
      <div>{props.entry.roundWins}/{props.entry.totalRounds}</div>
      <div>{props.entry.credits} credits</div>
      <div>{}</div>
      <div>{`${Math.round((props.entry.cpuDefeated.length/6)*100)}%`}</div>
      <div>{`${setWinPercent}%`}</div>
      <div>{`${roundWinPercent}%`}</div>
    </div>);
}
HallOfFameEntry.propTypes = {
  entry: PropTypes.object,
  currentUser: PropTypes.string
};

export default HallOfFameEntry;




















