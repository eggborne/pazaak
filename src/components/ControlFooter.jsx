import React from 'react';
import PropTypes from 'prop-types';
import Hamburger from './Hamburger';

function ControlFooter(props) {
  // let onIntroPhase = (props.phase === 'showingOptions' || props.phase === 'showingInstructions' || props.phase === 'showingHallOfFame');
  requestAnimationFrame(() => {
    if (props.phase === 'splashScreen') {
      document.getElementById('control-footer').classList.add('retracted');

    // } else if (onIntroPhase) {
      // document.getElementById('control-footer').style.transform = 'translateY(20%)';
    } else {
      document.getElementById('control-footer').classList.remove('retracted');
    }
  });
  let backButtonOnly = (props.phase === 'showingOptions' || props.phase === 'showingHallOfFame' || props.phase === 'showingInstructions');
  return (
    <div id='control-footer' className={'red-panel'}>
      <style jsx>{`
        #control-footer {         
          box-sizing: border-box;
          position: fixed;
          bottom: 0;
          width: 100%;
          height: var(--control-footer-height);
          min-height: var(--normal-card-width);
          max-height: var(--control-footer-height);
          //max-height: var(--mini-card-height);
          //max-height: var(--control-footer-height);
          min-width: var(--min-width);
          padding: var(--menu-border-width);
          display: inline-flex;          
          justify-content: space-between;
          //background-color: var(--red-bg-color);
          //border: var(--menu-border);
          //border-radius: var(--menu-border-radius) var(--menu-border-radius) 0 0;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          border-bottom: 0 !important;
          transition: transform 400ms ease;
          will-change: transform;
          z-index: 1;
        }
        #control-footer.hidden {
          transform: translateY(100%);
        }
        #control-footer.retracted {
          transform: translateY(var(--footer-retracted-amount)) !important;
        }
        #control-footer-button-area {
          display: inline-flex;
          justify-content: center;
          flex-grow: 1;          
        }
        .move-button {
          width: 50%;
          font-size: 3vmax;
        }
        #stand-button {
          margin-left: var(--menu-border-width);
          margin-right: var(--menu-border-width);
        }
        #switch-sign-button {
          width: 20%;
          font-size: 1rem;
          margin-left: var(--menu-border-width);
        }
        #pre-button-area {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 32vw 1fr 32vw;
          grid-template-rows: 1fr;
          align-items: center;
          justify-content: center;
          justify-items: center;
          width: 100%;
          min-width: var(--min-width);
          height: var(--control-footer-height);
          min-height: var(--control-footer-height);
          max-height: var(--control-footer-height);
        }
        .back-footer {
          height: 100%;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 32vw 1fr 32vw;
          grid-template-rows: 1fr;
          align-items: center;
          justify-content: center;
          justify-items: center;
          width: 100%;
        }
        .footer-button {
          width: 100%;
          height: 85%;
          //font-size: calc(var(--control-footer-height) / 4);
          font-size:var(--button-text-size);
        }
        .footer-back-button {
          font-size: calc(var(--control-footer-height) / 4);
          background-color: rgba(0, 0, 0, 0.6);
          border-color: rgba(0, 0, 0, 0.5);
          width: 50%;
          height: 65%;
        }
        #randomize-button {
          font-size: 1.5vmax;
          width: 70%;
          height: 65%;
          background-color: rgba(0, 0, 0, 0.5) !important;
          border-color: rgba(0, 0, 0, 0.5);
        }
        #footer-contents {
          font-family: var(--secondary-font);          
          color: var(--main-text-color);
          display: inline-flex;
          align-items: flex-start;
          padding-top: var(--menu-border-radius);
          justify-content: space-around;
          width: 100%;
          font-size: calc(var(--menu-border-width) * 2.25);
        }
        #get-ready-message {
          font-family: var(--title-font);
          line-height: 100%; 
          font-size: var(--medium-font-size);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .throbbing {
          animation: throb 1000ms infinite;
        }
        @keyframes throb {
          0% {
            transform: scale(1)
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
      {(backButtonOnly) &&
      <div className='back-footer'>
        <div></div>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'splashScreen') }} className='footer-button'>BACK</button>
        <div></div>
      </div>
      }
      {(props.phase === 'splashScreen') &&
      <div id='footer-contents' className='shadowed-text'>
        <div><a href='https://github.com/eggborne'>GitHub</a></div>
        <div><a href='mailto:mike@eggborne.com'>Contact</a></div>
      </div>
      }
      {(props.phase === 'selectingMode') &&
      <div className='back-footer'>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'splashScreen') }} className='footer-back-button shadowed-text'>{'<'}</button>
        <button {...{ [props.clickFunction]: props.onClickSelectMode }} className='footer-button'>OK</button>
        <div></div>
      </div>
      }
      {(props.phase === 'selectingOpponent') &&
      <div className='back-footer'>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'selectingMode') }} className='footer-back-button shadowed-text'>{'<'}</button>
        <button id='opponent-ready-button' {...{ [props.clickFunction]: props.onClickOpponentReady }} className='footer-button'>OK</button>
        <div></div>
      </div>
      }

      {(props.phase === 'selectingDeck') &&
      <div className='back-footer'>
        <button {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'selectingOpponent') }} id='deck-select-back-button' className='footer-back-button shadowed-text'>{'<'}</button>
        <button {...{ [props.clickFunction]: props.onClickPlay }} className='footer-button disabled-button' id='deck-ready-button'>Start!</button>
        <button {...{ [props.clickFunction]: props.onClickRandomize }} className='shadowed-text' id='randomize-button'>Random</button><div></div>
      </div>
      }
      {props.phase === 'versusScreen' &&
        <div id='get-ready-message' className='shadowed-text'>Get Ready...</div>
      }
      {props.phase === 'gameStarted' &&
          <>
            <div id='control-footer-button-area'>
              <button {...{ [props.clickFunction]: props.onClickEndTurn }} className='move-button' id='end-turn-button'>End Turn</button>
              <button {...{ [props.clickFunction]: props.onClickSwitchSign }} className='move-button disabled-button hidden-button' id='switch-sign-button'>+/-</button>
              <button {...{ [props.clickFunction]: props.onClickStand }} className='move-button' id='stand-button'>Stand</button>
            </div>
            <Hamburger onClickHamburger={props.onClickHamburger}
              clickFunction={props.clickFunction}
            />
          </>
      }


    </div>
  );
}

ControlFooter.propTypes = {
  phase: PropTypes.string,
  cardSize: PropTypes.object,
  currentOptions: PropTypes.object,
  onClickHamburgerQuit: PropTypes.func,
  onToggleOption: PropTypes.func,
  style: PropTypes.object,
  onClickEndTurn: PropTypes.func,
  onClickSwitchSign: PropTypes.func,
  onClickStand: PropTypes.func,
  onClickHamburger: PropTypes.func,
  onClickBack: PropTypes.func,
  onClickSelectMode: PropTypes.func,
  onClickOpponentReady: PropTypes.func,
  onClickPlay: PropTypes.func,
  onClickRandomize: PropTypes.func,
  clickFunction: PropTypes.string
};


export default ControlFooter;