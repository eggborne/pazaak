
import React from 'react';
import PropTypes from 'prop-types';
import CPUOpponentPanel from './CPUOpponentPanel';

function OpponentSelectScreen(props) {
  let userStatus = props.userStatus;
  let characterArray = [];
  let loadingIconSource = 'https://pazaak.online/assets/images/loadingicon.png';
 
  Object.entries(props.characters).map((entry, i) => {
    characterArray[i] = entry[0];
  });
  return (
    <div id='opponent-select-screen'>
      <style jsx>{`
        #opponent-select-screen {
          font-size: 1.25rem;
          font-family: 'Nova Square';
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          overflow-y: scroll;
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
          flex-grow: 1;
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
        }
        #opponent-ready-button {
          min-width: 8rem;
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
        #nobody-here-message {
          width: 100%;
          text-align: center;
          margin-top: 1rem;
          margin-bottom: 1rem;
          color: #333;
          text-shadow: none;
        }
      `}</style>
      <div className='pre-header' id='opponent-select-title'>
        <div className='shadowed-text'>Choose Your Opponent</div>
      </div>
      <div id='opponent-select-area' className='shadowed-text'>
        {characterArray.map((character, i) =>
          <CPUOpponentPanel key={i}
            selected={(props.opponentSelected === character)}
            portraitSource={props.portraitSources.opponent}
            cardSize={props.cardSize}
            index={i}
            character={props.characters[character]}
            onClickPanel={props.onClickPanel} />
        )}
      </div>

      <div className='pre-footer' id='opponent-select-footer'>
        <button id='opponent-select-back-button' onClick={(event) => props.onClickBack(event, 'splashScreen')} className='footer-back-button shadowed-text'>{'<'}</button>
        <button className='ready-button' onClick={props.onClickOpponentReady} id='opponent-ready-button'>OK</button>
      </div>
    </div>
  );
}
OpponentSelectScreen.propTypes = {
  portraitSources: PropTypes.object,
  characters: PropTypes.object,
  userStatus: PropTypes.object,
  opponentSelected: PropTypes.string,
  cardSize: PropTypes.object,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
};

export default OpponentSelectScreen;




















