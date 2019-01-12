
import React from 'react';
import PropTypes from 'prop-types';
import CPUOpponentPanel from './CPUOpponentPanel';
import HumanOpponentPanel from './HumanOpponentPanel';

const statuses = {
  splashScreen: 'at title screen',
  selectingOpponent: 'selecting opponent',
  showingOptions: 'at options screen',
  selectingDeck: 'selecting deck',
  showingHallOfFame: 'at Hall of Fame',
  showingInstructions: 'at How to Play',
  gameStarted: 'playing'
};
function OpponentSelectScreen(props) {
  let userStatus = props.userStatus;
  let usersHere = props.usersHere.slice();  
  let highScores = props.highScores.slice();  
  let characterArray = [];
  let loadingIconSource = 'https://pazaak.online/assets/images/loadingicon.png';
  let scoreObj = {};
  highScores.map((recordObj, i) => {
    usersHere.map((userObj, p) => {
      if (recordObj.id === parseInt(userObj.userId)) {
        userObj.highScoresIndex = i;
      }
    });
  });
  Object.entries(props.characters).map((entry, i) => {
    characterArray[i] = entry[0];
  });
  return (
    <div style={props.style} id='opponent-select-screen'>
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
        #human-select-area {
          padding: 2vw;
          //display: none;
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
        <div id='human-select-area'>
          <h3 className='opponent-type-label'>Actual humans</h3>
          {usersHere.length === 0 && <div id='human-opponents-loading-message' className='loading-message'>
            <div id='human-opponents-loading-text' className='loading-text'>LOADING</div>
            <img src={loadingIconSource} id='human-opponents-loading-icon' className='loading-icon' />
          </div>}
          {usersHere.length === 1 && <div id='nobody-here-message'>Nobody else is here :(</div>}
          {usersHere.map((userObj, i) => 
            (parseInt(userObj.userId) !== props.userId) &&
            <HumanOpponentPanel key={i}
              characters={props.characters}
              isSelf={false}
              cardSize={props.cardSize}
              userObject={userObj}
              scoreObject={highScores[userObj.highScoresIndex]}
              opponentSelected={userObj.opponent}
              statuses={statuses}
              onClickMoreInfo={props.onClickMoreInfo}
              onClickSendMessage={props.onClickSendMessage}
              onClickRequestMatch={props.onClickRequestMatch}
            />
          )}
        </div>
        <h3 className='opponent-type-label'>CPU Players</h3>
        {characterArray.map((character, i) =>
          <CPUOpponentPanel key={i}
            selected={(props.opponentSelected === character)}
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
  style: PropTypes.object,
  characters: PropTypes.object,
  userStatus: PropTypes.object,
  highScores: PropTypes.array,
  opponentSelected: PropTypes.string,
  cardSize: PropTypes.object,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func,
  usersHere: PropTypes.array,
  userId: PropTypes.number,
  onClickMoreInfo: PropTypes.func,
  onClickRequestMatch: PropTypes.func
};

export default OpponentSelectScreen;




















