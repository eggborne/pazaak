
import React from 'react';
import PropTypes from 'prop-types';
import HallOfFameEntry from './HallOfFameEntry';

function HallOfFameScreen(props) {
  console.error('HallOfFameScreen rendering, new phase is', props.phase);

  let recordList = props.highScores;
  if (recordList.filter) {
    recordList = recordList.filter(record => (record.playerName.slice(0, 5) !== 'Guest' && record.setWins >= 0));
  }
  let timeNow = Math.round(parseInt(Date.now()) / 1000).toString();
  let scoresExist = props.highScores.length ? true : false;
  return (
    <div id='hall-of-fame-screen' className={props.phase === 'showingHallOfFame' || 'obscured'}>
      <style jsx>{`
        #hall-of-fame-screen {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          //justify-content: space-between;
          //flex-grow: 1;
          /* for Firefox! */
          min-height: 0;
          overflow-y: scroll;
        }
        #high-score-area {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          font-family: 'Nova Square';
          font-size: 1rem;          
        }
        #high-scores-list {
          overflow-y: scroll;
          font-size: 0.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #empty-list-message {
          box-sizing: border-box;
          padding: 2rem;
          font-size: 1.5rem;
          text-align: center;
        }
        .obscured {
          display: none !important;
          height: 0;
          pointer-events: none;
        }
      `}</style>
      <div id='high-score-title' className='options-instructions-title shadowed-text'>Hall of Fame</div>
      <div id='high-scores-list' className='shadowed-text'>
        {props.readyToList && scoresExist && recordList.map((entry, i) => {
          return <HallOfFameEntry key={i} now={timeNow} entry={entry} loggedInAs={props.userStatus.loggedInAs} getTimeSinceFromSeconds={props.getTimeSinceFromSeconds} />;
        })}
        {!scoresExist && <div id='empty-list-message'>updating records...</div>}
      </div>
      <div className='pre-footer'>
        <div></div>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'splashScreen') }} className='ready-button' id='hall-of-fame-back-button'>Back</button>
        <div></div>
      </div>
    </div>
  );
}
HallOfFameScreen.propTypes = {
  phase: PropTypes.string,
  readyToList: PropTypes.bool,
  highScores: PropTypes.array,
  userStatus: PropTypes.object,
  onClickBack: PropTypes.func,
  getTimeSinceFromSeconds: PropTypes.func,
  clickFunction: PropTypes.string
};
function areEqual(prevProps, nextProps) {
  console.warn('44444444 -------- prev', prevProps.phase + ' to next ' + nextProps.phase);
  let equalTest =
    (prevProps.readyToList === nextProps.readyToList) &&
    (
      (prevProps.phase != 'showingHallOfFame' && nextProps.phase == 'splashScreen') ||
      (prevProps.phase != 'showingHallOfFame' && nextProps.phase != 'showingHallOfFame')
    );
  return (equalTest);
}
// export default HallOfFameScreen;
export default React.memo(HallOfFameScreen, areEqual);




















