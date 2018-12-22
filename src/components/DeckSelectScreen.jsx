
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  let selectedCardSize = props.cardSizes.mediumCardSize;
  let selectionCardSize = props.cardSizes.mediumCardSize;
  let cardsLeft = 10 - props.userDeck.length;
  let chooseStyle = { transition: 'all 300ms ease' };
  let chooseText = 'Ready to play!';
  let cardPlural = 's';
  let buttonDisabled = 'disabled-button';
  let throbbing = '';
  if (cardsLeft === 1) {
    cardPlural = '';
  }
  if (cardsLeft === 0) {
    cardsLeft = 1;
    cardPlural = '';
    chooseStyle.color = 'green';
    buttonDisabled = '';
    throbbing = 'throbbing'
  } else {
    chooseText = `choose ${cardsLeft} card${cardPlural}`;
  }
  let userSelectedGrid = ['', '', '', '', '', '', '', '', '', ''];
  props.userDeck.map((card, i) => {
    userSelectedGrid[i] = (<Card key={i} id={card.id} onClickCard={props.onClickCard} size={selectedCardSize} value={card.value} type={card.type} />);
  });
  let cardSelectionGrid = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  props.cardSelection.map((card, i) => {
    cardSelectionGrid[i] = (<Card key={i} id={card.id} onClickCard={props.onClickCard} size={selectionCardSize} value={card.value} type={card.type} />);
  });
  let gridWidth = selectionCardSize.width + (parseFloat(selectionCardSize.borderSize) * 3);
  let gridHeight = selectionCardSize.height + (parseFloat(selectionCardSize.borderSize) * 3);
  let previewGridWidth = selectedCardSize.width + (parseFloat(selectedCardSize.borderSize) * 3);
  let previewGridHeight = selectedCardSize.height + (parseFloat(selectedCardSize.borderSize) * 3);
  return (
    <div style={props.style} id='deck-select-screen'>
      <style jsx>{`
        #deck-selection-grid {
          display: grid;
          grid-template-columns: ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px ${gridWidth}px;
          grid-template-rows: ${gridHeight}px ${gridHeight}px ${gridHeight}px;
          grid-column-gap: ${gridWidth/20}px;
          grid-row-gap: ${gridHeight/20}px;
        }
        #deck-select-title {
          box-sizing: border-box;
          display: grid;
          align-items: center;
          justify-content: center;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr;
          width: 100vw;
        }
        #deck-select-title > div {
          width: 95%;
          text-align: center;
          box-sizing: border-box;
        }
        #deck-select-title > div:nth-child(1) {
          padding-left: 1rem;
        }
        #preview-deck-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          margin-top: 2vh;
        }
        #preview-deck-title {
          margin-bottom: 1.5vh;
        }
        #preview-deck-grid {
          display: grid;
          grid-template-columns: ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px ${previewGridWidth}px;
          grid-template-rows: ${previewGridHeight}px ${previewGridHeight}px;
          grid-row-gap: 0.75vh;
          grid-column-gap: 0.75vh;
        }
        #preview-deck-grid  > div, #deck-selection-grid  > div {
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          background-color: var(--card-spot-bg-color) !important;
        }
        #deck-selection-grid  > div {
          border: ${selectionCardSize.borderSize} inset var(--card-spot-border-color);
          border-radius: ${parseInt(selectionCardSize.borderRadius)+2}px !important;
          background-color: var(--card-spot-bg-color) !important
        }
        #preview-deck-grid  > div {
          border: ${selectedCardSize.borderSize} inset var(--card-spot-border-color);
          border-radius: ${parseInt(selectedCardSize.borderRadius)+2}px !important;
          background-color: var(--card-spot-bg-color) !important;
        }
        #deck-select-screen {
          font-size: 1.5rem;
          font-family: 'Nova Square';
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: flex-start;
          align-items: center;
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
      `}
      </style>
      <div className='pre-header' id='deck-select-title'>
        <div className='shadowed-text'>Create deck</div>
        <div id='choose-text' style={chooseStyle} className='smaller shadowed-text'>{chooseText}</div>
      </div>
      <div id='deck-selection-area'>
        <div id='deck-selection-grid'>
          {cardSelectionGrid.map((card, i) => {
            return <div key={i} id={`card-selection-space-${i}`}>{card}</div>;
          })}
        </div>
      </div>
      <div id='preview-deck-area'>
        <div id='preview-deck-title' className='smaller shadowed-text'>YOUR DECK:</div>
        <div id='preview-deck-grid'>
          {userSelectedGrid.map((card, i) => {
            return <div id={`player-deck-space-${i}`} key={i}>{card}</div>;
          })}
        </div>
      </div>
      <div id='randomize-area'><button onClick={props.onClickRandomize} className='shadowed-text' id='randomize-button'>Randomize</button></div>
      <div className='pre-footer' id='deck-select-footer'>
        <div>
          <button id='deck-select-back-button' onClick={(event) => props.onClickBack(event, 'selectingOpponent')} className='footer-back-button shadowed-text'>{'<'}</button>
          <button className={`ready-button ${buttonDisabled} ${throbbing}`} onClick={props.onClickPlay} id='deck-ready-button'>Start!</button>
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
  cardSizes: PropTypes.object,
  mediumCardSize: PropTypes.object,
  onClickBack: PropTypes.func
};

export default DeckSelectionScreen;




















