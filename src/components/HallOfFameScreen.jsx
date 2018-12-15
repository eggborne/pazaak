
import React from 'react';
import PropTypes from 'prop-types';

function HallOfFameScreen(props) {
  return (
    <div style={props.style} id='hall-of-fame-screen'>
      
      <div id='high-score-title' className='options-instructions-title shadowed-text'>Hall of Fame</div>

      <div id='high-score-area'>
        
        <div id='high-score-heading' className='shadowed-text'>
          <div className='heading-label'>Name</div>
          <div className='heading-label'>Sets<br />won</div>
          <div className='heading-label'>Rounds<br />won</div>
        </div>

        <div className='shadowed-text' id='high-scores-list'>
          {props.highScores.map((entry, i) => {
            return (
              <div key={i} id={entry.id} className='high-score-entry'>
                <div>{entry.playerName}</div>
                <div>{entry.setWins} / {entry.totalSets}</div>
                <div>{entry.roundWins} / {entry.totalRounds}</div>
              </div>);
          })}
        </div>
        
      </div>

      <div className='option-footer'>
        <button onClick={(event) => props.onClickBack(event, 'splashScreen')} className='back-button' id='hall-of-fame-back-button'>Back</button>
      </div>
    </div>
  );
}
HallOfFameScreen.propTypes = {
  highScores: PropTypes.array,
  style: PropTypes.object,
  onToggleOption: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default HallOfFameScreen;




















