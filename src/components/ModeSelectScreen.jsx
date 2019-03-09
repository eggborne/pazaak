import React from 'react';
import PropTypes from 'prop-types';

function ModeSelectScreen(props) {
  requestAnimationFrame(() => {
    if (document.getElementById('mode-select-screen')) {
      document.getElementById('mode-select-screen').style.transform = 'none';
    }
  });
  let modeSelected = props.modeSelected;
  return (
    <div id="mode-select-screen" className="shadowed-text">
      <style jsx>{`
        #mode-select-screen {
          position: absolute;
          height: 100%;
          font-family: var(--title-font);
          line-height: 100%;
          align-items: center;
          transform: translateY(calc(var(--shift-distance) / -2));
          transition: transform var(--shift-duration) ease, opacity var(--shift-duration) ease;
          will-change: transform, opacity;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        #mode-select-choices {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }
        .mode-panel {
          box-sizing: border-box;
          max-width: 70vmin;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: border 300ms ease,  opacity 300ms ease, transform 200ms ease;
          will-change: transform, opacity, border;
        }
        .mode-panel:first-of-type {
          margin-top: 3vh;
          margin-bottom: 3vh;
        }
        .mode-panel > div {
          width: 100%;          
        }
        .mode-button {
          line-height: 100%;
          box-sizing: border-box;
          min-height: 10vh;
          padding: var(--menu-border-radius);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: calc(var(--header-height) / 2);
          border: var(--inner-menu-border);
          border-radius: var(--menu-border-width);
          margin: var(--menu-border-radius);
          background-color: var(--trans-black-bg-color);
          color: gray;
          transition: background-color 300ms ease, color 300ms ease;
        }
        .mode-description {
          box-sizing: border-box;
          padding: var(--menu-border-radius);
          font-family: var(--main-font);
          font-size: var(--small-font-size);
          width: 100%;
          display: flex;
          padding-top: var(--small-font-size);
          padding-bottom: var(--small-font-size);
        }
        .mode-selected-button {          
          background-color: var(--option-on-color);
          color: white;
        }
        .mode-panel.mode-selected-panel {    
          opacity: 1;      
          transform: scale(1.1);
          border: var(--menu-border-width) double var(--option-on-color) !important;
        }
        ul {
          position: relative;
          list-style: square;
          padding-inline-start: calc(var(--menu-border-width) * 5);
          margin-block-start: 0;
          margin-block-end: 0;
        }
        .progress-message {
          font-family: var(--main-font);
          font-size: var(--small-font-size);
          color: yellow;
          line-height: 150%;
        }
        .progress-message:first-of-type {
          margin-top: var(--menu-border-width);
        }
      `}</style>
      <div className="options-instructions-title">Game Mode</div>
      <div id="mode-select-choices">
        {/* <div  {...{ [props.clickFunction]: props.onClickCampaign }} className={'mode-panel' + (modeSelected === 'campaign') && ' mode-selected-panel' }> */}
        <div {...{ [props.clickFunction]: props.onClickCampaign }} className={`mode-panel red-panel ${modeSelected === 'campaign' && 'mode-selected-panel'}`}>
          <div className='inner-red-panel'>
            <div className={`mode-button ${modeSelected === 'campaign' && 'mode-selected-button'}`} id="campaign-button">
              Campaign
              <div className='progress-message'>{props.cpuDefeated} opponent{props.cpuDefeated !== 1 && 's'} defeated</div>
              <div className='progress-message'>{props.cardsWon} card{props.cardsWon !== 1 && 's'} won</div>
            </div>
            <div className="mode-description">
              <ul>
                <li>Defeat a roster of crafty AI opponents</li>
                <li>Win credits / special cards to progress</li>
              </ul>
            </div>
          </div>
        </div>
        <div {...{ [props.clickFunction]: props.onClickQuickMatch }} className={`mode-panel red-panel ${modeSelected === 'quick' && 'mode-selected-panel'}`}>
          <div className='inner-red-panel'>
            <div className={`mode-button ${modeSelected === 'quick' && 'mode-selected-button'}`} id="quick-match-button">
              Quick Match
            </div>
            <div className="mode-description">
              <ul>
                <li>Single match with a random opponent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ModeSelectScreen.propTypes = {
  phase: PropTypes.string,
  cpuDefeated: PropTypes.number,
  cardsWon: PropTypes.number,
  modeSelected: PropTypes.string,
  onClickCampaign: PropTypes.func,
  onClickQuickMatch: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ModeSelectScreen;
