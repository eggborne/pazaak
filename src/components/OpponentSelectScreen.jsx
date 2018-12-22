
import React from 'react';
import PropTypes from 'prop-types';
import OpponentPanel from './OpponentPanel';

function OpponentSelectScreen(props) {
  let characterArray = [];
  Object.entries(props.characters).map((entry, i) => {
    characterArray[i] = entry[0];
  });
  return (
    <div style={props.style} id='opponent-select-screen'>
      <style jsx>{`
        #opponent-select-screen {
          font-size: 1.5rem;
          font-family: 'Nova Square';
          display: flex;
          flex-direction: column;
          // flex-grow: 1;
          justify-content: space-between;
          align-items: center;
          overflow-y: scroll;
        }
        #opponent-select-title {
          align-items: center;
          justify-content: center;
          width: 100%;
          border-bottom: 1px solid black;
        }
        #opponent-select-area {
          overflow-y: scroll;
          margin-bottom: 10.25vmax;
        }
        .pre-footer {
          border-top: 1px solid black;
        }
        #opponent-ready-button {
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
      <div className='pre-header' id='opponent-select-title'>
        <div className='shadowed-text'>Choose Your Opponent</div>
      </div>
      <div id='opponent-select-area' className='shadowed-text'>
        {characterArray.map((character, i) =>
          <OpponentPanel key={i}
            selected={(props.opponentSelected === character)}
            cardSize={props.cardSize}
            index={i}
            character={props.characters[character]}
            onClickPanel={props.onClickPanel} />
        )}
      </div>
      <div className='pre-footer' id='opponent-select-footer'>
        <button id='opponent-select-back-button' onClick={(event) => props.onClickBack(event, 'splashScreen')} className='footer-back-button shadowed-text'>{'<'}</button>
        <button className='ready-button' onClick={props.onClickOpponentReady} id='opponent-ready-button'>Ready!</button>
      </div>
    </div>
  );
}
OpponentSelectScreen.propTypes = {
  style: PropTypes.object,
  characters: PropTypes.object,
  opponentSelected: PropTypes.string,
  cardSize: PropTypes.object,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func
};

export default OpponentSelectScreen;




















