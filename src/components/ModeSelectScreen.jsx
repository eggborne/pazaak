
import React from 'react';
import PropTypes from 'prop-types';
import { isFullScreen } from '../scripts/util';

function ModeSelectScreen(props) {
  requestAnimationFrame(() => { 
    document.getElementById('mode-select-screen').style.opacity = '1';
    document.getElementById('mode-select-screen').style.transform = 'none';
  });
  // if (props.phase !== 'selectingMode') {
  //   document.getElementById('mode-select-screen').style.opacity = '0';
  //   document.getElementById('mode-select-screen').style.transform = 'scale(1.05)';
  // }
  return (
    <div id='mode-select-screen' className='shadowed-text'>
      <style jsx>{`
        #mode-select-screen {
          height: 100%;
          background-color: var(--trans-blue-bg-color);
          font-size: 2.75vh;
          font-family: var(--title-font);
          line-height: 100%;
          align-items: center;

          opacity: 0;
          transform: scale(1.1);
          transition: transform 300ms ease, opacity 300ms ease;
        }
        #mode-select-choices {
          display: flex;
          flex-flow: column;
          flex-wrap: wrap;
          align-items: center;
          height: 100%;
          padding: var(--header-height);

        }
        .mode-row {
          background: rgba(0, 0, 0, 0.1);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 3vh;
          padding: 1vh;
          border: 1px solid #444;
          border-radius: var(--button-radius);
        }
        .mode-button {
          width: 100%;
          padding: 3vh 2vh 3vh 2vh;
          font-size: 2.5vh;
        }
        .mode-description {
          font-family: var(--main-font);
          font-size: var(--small-font-size);
          width: 80%;
          padding: 5vw;
        }
      `}</style>
      <div className='options-instructions-title'>Select Game Mode</div>
      <div id='mode-select-choices'>
        <div className='mode-row'>
          <button {...{ [props.clickFunction]: props.onClickCampaign }} className='mode-button' id='campaign-button'>Campaign Mode</button>
          <div className='mode-description'>
            Climb a roster of outlandish villains
          </div>
        </div>
        <div className='mode-row'>
          <button {...{ [props.clickFunction]: props.onClickQuickMatch }} className='mode-button' id='quick-match-button'>Quick Match</button>
          <div className='mode-description'>
            Single match with a random CPU opponent
          </div>
        </div>
      </div>
      <div className='pre-footer' id='deck-select-footer'>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'selectingOpponent') }} id='deck-select-back-button' className='footer-back-button shadowed-text'>{'<'}</button>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
ModeSelectScreen.propTypes = {
  phase: PropTypes.string,  
  onClickCampaign: PropTypes.func,
  onClickQuickMatch: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ModeSelectScreen;




















