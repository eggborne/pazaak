
import React from 'react';
import PropTypes from 'prop-types';
import HallOfFameEntry from './HallOfFameEntry';

function HallOfFameScreen(props) {
  return (
    <div style={props.style} id='hall-of-fame-screen'>
      <style jsx>{`
        #hall-of-fame-screen {
          flex-grow: 2;
        }
        #high-score-area {
          width: 100vw;
          flex-grow: 0;
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
        #high-score-list-heading {
          box-sizing: border-box;
          font-size: 0.8rem;
          width: 95vw;
          height: auto;
          display: grid;
          grid-template-columns: 1.5fr 1.25fr 1.25fr 1fr 1fr;
          grid-template-rows: 1fr;
          border-bottom: 1px solid black;
          align-items: end;
          justify-items: end;
          padding: 1rem 1rem 0.5rem 1rem;
        }
        #high-score-list-heading > div {
          justify-self: end;
          text-align: right;
        }
        #high-score-list-heading > div:nth-child(1) {
          justify-self: start;
        }
        #high-score-list-heading > div:nth-child(4) {
         
          text-align: right;
        }
        .heading-label {
          color: yellow;
        }
      `}</style>
      
      <div id='high-score-title' className='options-instructions-title shadowed-text'>Hall of Fame</div>

      <div id='high-score-area'>
        
        <div id='high-score-list-heading' className='shadowed-text'>
          <div className='heading-label'>Name</div>
          <div className='heading-label'>Humans<br />defeated</div>
          <div className='heading-label'>CPU<br />defeated</div>
          <div className='heading-label'>Sets<br />won</div>
          <div className='heading-label'>Rounds<br />won</div>
        </div>

        <div className='shadowed-text' id='high-scores-list'>
          {props.highScores.map((entry, i) => {
            return <HallOfFameEntry key={i} entry={entry} currentUser={props.userStatus.loggedInAs}/>;
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
  style: PropTypes.object,
  highScores: PropTypes.array,
  userStatus: PropTypes.object,
  onClickBack: PropTypes.func,
};

export default HallOfFameScreen;




















