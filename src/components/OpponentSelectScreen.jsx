
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
      <div id='opponent-select-title'>
        <div className='shadowed-text'>Choose Your Opponent</div>
      </div>
      <div id='opponent-select-area' className='shadowed-text'>
        {characterArray.map((character, i) =>
          <OpponentPanel key={i}
            cardSize={props.cardSize}
            index={i}
            character={props.characters[character]}
            onClickPanel={props.onClickPanel} />
        )}
      </div>
      <div id='opponent-select-footer'>
        <button id='opponent-select-back-button' onClick={(event) => props.onClickBack(event, 'splashScreen')} className='footer-back-button shadowed-text'>{'<'}</button>
        <button className='ready-button' onClick={props.onClickOpponentReady} id='opponent-ready-button'>Ready!</button>
      </div>
    </div>
  );
}
OpponentSelectScreen.propTypes = {
  style: PropTypes.object,
  characters: PropTypes.object,
  cardSize: PropTypes.object,
  onClickOpponentReady: PropTypes.func,
  onClickPanel: PropTypes.func,
  onClickBack: PropTypes.func
};

export default OpponentSelectScreen;




















