
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  let cardsLeft = 10 - props.userDeck.length;
  let chooseStyle = {
    transition: 'all 300ms ease'
  };
  let cardPlural = 's';
  if (cardsLeft === 1) {
    cardPlural = '';
  }
  if (cardsLeft === 0) {
    cardsLeft = 1;
    cardPlural = '';
    chooseStyle.color = 'green';
    document.getElementById('choose-text').innerHTML = 'Ready to play!';
  }
  return (
    <div style={props.style} id='deck-select-screen'>
      <div id='deck-select-title'>
        <div className='shadowed-text'>Create deck</div>
        <div id='choose-text' style={chooseStyle} className='smaller shadowed-text'>choose {cardsLeft} card{cardPlural}</div>
      </div>
      <div id='deck-selection-area'>
        <div id='deck-selection-grid'>
          {props.cardSelection.map((card) =>
            <Card key={card.id} id={card.id} onClickCard={props.onClickCard} size={props.mediumCardSize} value={card.value} type={card.type} />
          )}
        </div>
      </div>
      <div id='preview-deck-area'>
        <div id='preview-deck-title' className='smaller shadowed-text'>YOUR DECK:</div>
        <div id='preview-deck-grid'>
          {props.userDeck.map((card) =>
            <Card className='cock' key={card.id} id={card.id} onClickCard={props.onClickCard} size={props.cardSize} value={card.value} type={card.type} />
          )}
        </div>
      </div>
      <div id='deck-select-footer'>
        <button onClick={props.onClickRandomize} id='randomize-button'>Randomize</button>
        <button className='disabled-button' onClick={props.onClickPlay} id='play-button'>Ready!</button>
      </div>
    </div>
  );
}
DeckSelectionScreen.propTypes = {
  style: PropTypes.object,
  cardSelection: PropTypes.array,
  userDeck: PropTypes.array,
  onClickRandomize: PropTypes.func,
  onClickPlay: PropTypes.func,
  onClickCard: PropTypes.func,
  cardSize: PropTypes.object,
  mediumCardSize: PropTypes.object
};

export default DeckSelectionScreen;




















