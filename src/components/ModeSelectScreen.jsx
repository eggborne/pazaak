import React from 'react';
import PropTypes from 'prop-types';

function ModeSelectScreen(props) {
  requestAnimationFrame(() => {
    if (document.getElementById('mode-select-screen')) {
      document.getElementById('mode-select-screen').style.transform = 'none';
    }
  });
  let modeSelected = props.modeSelected;
  let onlineCount = 0;
  return (
    <div id="mode-select-screen" className="shadowed-text">
      <style jsx>{`
        #mode-select-screen {
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
        #mode-title-area {
          padding-top: 1vh;
          font-size: var(--large-font-size);
          display: grid;
          grid-template-columns: 0.5fr 0.5fr;
          grid-template-rows: 7vh 7vh;
          justify-items: center;
          align-items: center;
          align-content: start;
          grid-column-gap: 5vw;
          grid-row-gap: 2vh;
          max-height: none;
          flex-grow: 0;
        }
        #mode-title {
          grid-column-start: 0;
          grid-column-end: span 2;
        }
        #lower-panel {
          left: 0;
          flex-grow: 1;
          width: 200vw;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
        }
        #cpu-mode-choices, #human-mode-choices {
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;          
          height: 100%;          
          transition: transform 300ms ease;
        }
        #cpu-mode-choices {
          transform: ${props.vsCPU ? 'translateX(50%)' : 'translateX(-100%)'};
          pointer-events: ${props.vsCPU || 'none'};
        }
        #human-mode-choices {
          justify-content: center;
          transform: ${props.vsCPU ? 'translateX(100%)' : 'translateX(-50%)'};
          pointer-events: ${props.vsCPU && 'none'};          
        }
        .mode-panel {
          box-sizing: border-box;
          width: var(--intro-width);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;          
          opacity: 0.75;
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
          padding: var(--menu-border-radius);
          padding-top: 2vh;
          padding-bottom: 2vh;          
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: calc(var(--header-height) / 2);
          border: var(--inner-menu-border);
          border-radius: var(--menu-border-width);
          background-color: var(--trans-black-bg-color);
          color: grey;
          transition: background-color 300ms ease, color 300ms ease;
        }
        .mode-description {
          box-sizing: border-box;
          padding: var(--menu-border-radius);
          font-family: var(--main-font);
          font-size: 0.75rem;
          display: flex;
          flex-direction: column;
          width: 50%;
        }
        .mode-description > div {
          margin-top: 1vh;
          margin-bottom: 1vh;
        }
        .mode-selected-button {          
          //background-color: var(--option-on-color);
          color: white;
        }
        .mode-panel.mode-selected-panel {    
          opacity: 1;      
          transform: scale(1.05);
          border: var(--menu-border-width) double var(--option-on-color) !important;
        }
        .versus-selector {
          padding-left: var(--menu-border-radius);
          padding-right: var(--menu-border-radius);
          font-family: var(--title-font);
          font-size: 1rem;
          font-size: 2vh;
          width: 65%;
          //color: white;
          border-radius: calc(var(--menu-border-radius) * 1.5);
          border: calc(var(--menu-border-width) / 1.5) solid var(--dark-red-bg-color);
          background-color: #44444444;     
          line-height: 120%;     
          align-self: stretch;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: background-color 210ms ease, border-color 210ms ease;
        }
        #ai-selector {
          justify-self: end;
        }
        #humans-selector {
          justify-self: start;          
        }
        #online-indicator {
          font-family: var(--main-font);
          font-size: 0.75em;
          color: ${onlineCount || 'red'};
        }
        .versus-selector.selected {
          background-color: #00ff0066;
          border-color: #00ff00dd;
        }
        .progress-message {
          font-family: var(--main-font);
          font-size: calc(var(--small-font-size) / 1.25);
          color: yellow;
          line-height: 150%;
        }
        .progress-message:first-of-type {
          margin-top: var(--menu-border-width);
        }
      `}</style>
      <div id='mode-title-area' className="options-instructions-title">
        <div id='mode-title'>Game Mode</div>
        <div {...{ [props.clickFunction]: event => props.onClickSwitchVersusMode(event, 'vsCPU') } } id='ai-selector' className={props.vsCPU ? 'versus-selector selected' : 'versus-selector'}>vs. COMPUTER</div>
        <div {...{ [props.clickFunction]: event => props.onClickSwitchVersusMode(event, 'vsHumans') } } id='humans-selector' className={props.vsCPU ? 'versus-selector' : 'versus-selector selected'}>
          <div>vs. HUMANS</div>
          <div id='online-indicator'>{onlineCount} online</div>
        </div>
      </div>

      <div id='lower-panel'>

        <div id="cpu-mode-choices">
          {/* <div  {...{ [props.clickFunction]: props.onClickCampaign }} className={'mode-panel' + (modeSelected === 'campaign') && ' mode-selected-panel' }> */}
          <div {...{ [props.clickFunction]: props.onClickCampaign }} className={`mode-panel red-panel ${modeSelected === 'campaign' && 'mode-selected-panel'}`}>
            <div>
              <div className={`mode-button ${modeSelected === 'campaign' && 'mode-selected-button'}`} id="campaign-button">
                Campaign
                <div className='progress-message'>{props.cpuDefeated} opponent{props.cpuDefeated !== 1 && 's'} defeated</div>
                <div className='progress-message'>{props.cardsWon} card{props.cardsWon !== 1 && 's'} won</div>
              </div>
            </div>
            <div className="mode-description">
              <div>&middot; Climb a roster of crafty AI opponents</div>
              <div>&middot; Win credits / special cards to progress</div>
            </div>
          </div>
          <div {...{ [props.clickFunction]: props.onClickQuickMatch }} className={`mode-panel red-panel ${modeSelected === 'quick' && 'mode-selected-panel'}`}>
            <div>
              <div className={`mode-button ${modeSelected === 'quick' && 'mode-selected-button'}`} id="quick-match-button">
                Quick Match
              </div>
            </div>
            <div className="mode-description">
              <div>&middot; Single match with a random AI opponent</div>
              <div>&middot; Wager any amount of credits</div>
            </div>
          </div>            
        </div>
        <div id='human-mode-choices'>
          <div>
            no humans online :(
          </div>
        </div>        
        
      </div>
    </div>
  );
}
ModeSelectScreen.propTypes = {
  phase: PropTypes.string,
  vsCPU: PropTypes.bool,
  cpuDefeated: PropTypes.number,
  cardsWon: PropTypes.number,
  modeSelected: PropTypes.string,
  onClickCampaign: PropTypes.func,
  onClickQuickMatch: PropTypes.func,
  onClickSwitchVersusMode: PropTypes.func,
  clickFunction: PropTypes.string
};

export default ModeSelectScreen;
