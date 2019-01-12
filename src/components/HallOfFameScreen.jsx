
import React from 'react';
import PropTypes from 'prop-types';
import HallOfFameEntry from './HallOfFameEntry';

function HallOfFameScreen(props) {
  console.error('HOFS PROPS', props);
  let scoresExist = props.highScores.length ? true : false;
  return (
    <div style={props.style} id='hall-of-fame-screen'>
      <style jsx>{`
        #hall-of-fame-screen {
          flex-grow: 2;
        }
        #high-score-area {
          width: 100vw;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: scroll;
          font-family: 'Nova Square';
          font-size: 1rem;
        }
        #high-scores-list {
          overflow-y: scroll;
          font-size: 0.8rem;
        }
        #empty-list-message {
          padding: 2rem;
          font-size: 1.5rem;
          text-align: center;
        }
      `}</style>
      <div id='high-score-title' className='options-instructions-title shadowed-text'>Hall of Fame</div>
      <div id='high-score-area'>        
        <div className='shadowed-text' id='high-scores-list'>
          {scoresExist && props.highScores.map((entry, i) => {
            return <HallOfFameEntry key={i} entry={entry} loggedInAs={props.userStatus.loggedInAs}/>;
          })}
          {!scoresExist && <div id='empty-list-message'>No records found :(</div>}
        </div>        
      </div>
      <div className='option-footer'>
        <button onClick={(event) => props.onClickBack(event, 'splashScreen')} className='back-button' id='hall-of-fame-back-button'>Back</button>
      </div>
    </div>
  );
}
HallOfFameScreen.propTypes = {
  style: PropTypes.object,
  highScores: PropTypes.array,
  userStatus: PropTypes.object,
  onClickBack: PropTypes.func,
};

export default HallOfFameScreen;




















