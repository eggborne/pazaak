
import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

function OpponentSelectScreen(props) {
  console.error('OpponentSelectScreen rendering', props);  
  let opponentList = props.characterArray;
  // let opponentList = props.characterArray.slice(0,2);
  return (
    <div id='opponent-select-screen' className={props.phase === 'selectingOpponent' || 'obscured'}>
      <style jsx>{`
        #opponent-select-screen {
          font-size: 1.25rem;
          font-family: 'Nova Square';
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;         
          flex-grow: 1;
        }
        #opponent-select-title {
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-bottom: 1px solid black;
        }
        #opponent-select-area {
          overflow-y: scroll;
        }
        .opponent-type-label {
          font-size: 1em;
          line-height: 100%;
          width: 100%;
          height: 1rem;
          text-align: center;
        }
        .pre-footer {
          border-top: 1px solid black;
          box-sizing: border-box;
        }
        #opponent-ready-button {
          min-width: 8rem;
        }
        #nobody-here-message {
          width: 100%;
          text-align: center;
          margin-top: 1rem;
          margin-bottom: 1rem;
          color: #333;
          text-shadow: none;
        }
        .obscured {
          max-height: 0;
          pointer-events: none;
        }
      `}</style>
      <div className='pre-header' id='opponent-select-title'>
        <div className='shadowed-text'>Choose Your Opponent</div>
      </div>
      {true &&
        <div id='opponent-select-area' className='shadowed-text'>
          {opponentList.map((character, i) =>
            // let selected = (props.opponentSelected === character.name);
            <OpponentPanel key={i}
              selected={props.opponentSelected === character.name}
              portraitSource={props.portraitSources.opponent}
              cardSize={props.cardSize}
              index={i}
              character={props.characters[character.name]}
              onClickPanel={props.onClickPanel}
              clickFunction={props.clickFunction}
            />
          )}
        </div>
      }
      <div className='pre-footer' id='opponent-select-footer'>
        <button id='opponent-select-back-button' {...{ [props.clickFunction]: (event) => props.onClickBack(event, 'splashScreen') }} className='footer-back-button shadowed-text'>{'<'}</button>
        <button {...{ [props.clickFunction]: props.onClickOpponentReady }} className='ready-button' id='opponent-ready-button'>OK</button>
      </div>
    </div>
  );
}
OpponentSelectScreen.propTypes = {
  phase: PropTypes.string,
  readyToList: PropTypes.bool,
  portraitSources: PropTypes.object,
  characters: PropTypes.object,
  characterArray: PropTypes.array,
  opponentSelected: PropTypes.string,
  cardSize: PropTypes.object,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  let equalTest = prevProps.phase != 'selectingOpponent' && nextProps.phase != 'selectingOpponent';
  console.warn('MMMMMMMMMMMMMMMMMMMMMM <><><><><><><><><><><><><> OpponentSelectScreen areEqual', equalTest);
  return (equalTest);
}

// export default OpponentSelectScreen;
export default React.memo(OpponentSelectScreen, areEqual);




















