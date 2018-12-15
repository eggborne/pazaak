
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  let cardsLeft = 10 - props.userDeck.length;
  let chooseStyle = { transition: 'all 300ms ease' };
  let chooseText = 'Ready to play!';
  let cardPlural = 's';
  if (cardsLeft === 1) {
    cardPlural = '';
  }
  if (cardsLeft === 0) {
    cardsLeft = 1;
    cardPlural = '';
    chooseStyle.color = 'green';

    // document.getElementById('choose-text').innerHTML = ;
  } else {
    chooseText = `choose ${cardsLeft} card${cardPlural}`;
    // document.getElementById('choose-text').innerHTML = 
  }
  let deckSelectGrid = [];
  props.userDeck.map((card, i) => {
    deckSelectGrid.push(<Card key={i} id={card.id} onClickCard={props.onClickCard} size={props.cardSize} value={card.value} type={card.type} />);
  });
  let gridWidth = props.mediumCardSize.width + (parseFloat(props.mediumCardSize.borderSize) * 2);
  let gridHeight = props.mediumCardSize.height + (parseFloat(props.mediumCardSize.borderSize) * 2);
  let previewGridWidth = props.cardSize.width + (parseFloat(props.cardSize.borderSize) * 2);
  let previewGridHeight = props.cardSize.height + (parseFloat(props.cardSize.borderSize) * 2);
  return (
    <div style={props.style} id='deck-select-screen'>
      <style jsx>{`
        #deck-selection-grid {
          /* box-sizing: border-box; */
          display: grid;
          grid-template-columns: ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px;
          grid-template-rows: ${gridHeight}px ${gridHeight}px;
          grid-column-gap: 1vw;
          grid-row-gap: 1vh;
          margin-top: 0.5rem;
        }
        #preview-deck-grid {
          display: grid;
          grid-template-columns: ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px;
          grid-template-rows: ${previewGridHeight}px ${previewGridHeight}px;
          grid-row-gap: 0.25rem;
          grid-column-gap: 0.75vh;
        }
        #preview-deck-grid  > div {
          border-radius: ${props.cardSize.borderRadius};
          background-color: rgb(105, 115, 128) !important;
        }
      `}
      </style>
      <div id='deck-select-title'>
        <div className='shadowed-text'>Create deck</div>
        <div id='choose-text' style={chooseStyle} className='smaller shadowed-text'>{chooseText}</div>
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
          <div>{deckSelectGrid[0]}</div>
          <div>{deckSelectGrid[1]}</div>
          <div>{deckSelectGrid[2]}</div>
          <div>{deckSelectGrid[3]}</div>
          <div>{deckSelectGrid[4]}</div>
          <div>{deckSelectGrid[5]}</div>
          <div>{deckSelectGrid[6]}</div>
          <div>{deckSelectGrid[7]}</div>
          <div>{deckSelectGrid[8]}</div>
          <div>{deckSelectGrid[9]}</div>
        </div>
      </div>
      <div id='randomize-area'><button onClick={props.onClickRandomize} id='randomize-button'>Randomize</button></div>
      <div id='deck-select-footer'>
        <div>
          <button id='deck-select-back-button' onClick={(event) => props.onClickBack(event, 'selectingOpponent')} className='footer-back-button shadowed-text'>{'<'}</button>
          <button className='ready-button disabled-button' onClick={props.onClickPlay} id='play-button'>Ready!</button>
        </div>
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
  mediumCardSize: PropTypes.object,
  onClickBack: PropTypes.func
};

export default DeckSelectionScreen;




















