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
          //height: 100vh;
          height: var(--inner-height);
          top: var(--header-height);
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
          //margin-top: var(--control-footer-height);
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .mode-panel {
          box-sizing: border-box;
          width: 80vmin;
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
          height: 10vh;
          display: flex;
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
          margin: var(--menu-border-radius);
          font-family: var(--main-font);
          font-size: 1.8vh;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
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
          list-style: square;
          margin: 0;
          padding-inline-start: 0;
          margin-block-start: 0;
          margin-block-end: 0;
        }

      `}</style>
      <div className="options-instructions-title">Game Mode</div>
      <div id="mode-select-choices">
        {/* <div  {...{ [props.clickFunction]: props.onClickCampaign }} className={'mode-panel' + (modeSelected === 'campaign') && ' mode-selected-panel' }> */}
        <div {...{ [props.clickFunction]: props.onClickCampaign }} className={`mode-panel red-panel ${modeSelected === 'campaign' && 'mode-selected-panel'}`}>
          <div className='inner-red-panel'>
            <div className={`mode-button ${modeSelected === 'campaign' && 'mode-selected-button'}`} id="campaign-button">
              Campaign
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
  modeSelected: PropTypes.string,
  onClickCampaign: PropTypes.func,
  onClickQuickMatch: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ModeSelectScreen;
