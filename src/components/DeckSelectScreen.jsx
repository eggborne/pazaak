
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  console.error('------------------------------------------- DeckSelectionScreen rendering', props);
  requestAnimationFrame(() => {
    document.getElementById('deck-select-screen').style.opacity = 1;
    document.getElementById('deck-select-screen').style.transform = 'none';
  });
  let selectionCardSize = 'medium';
  let selectedCardSize = 'normal';
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
    throbbing = 'throbbing';
  } else {
    chooseText = `choose ${cardsLeft} card${cardPlural}`;
  }
  let cardSelectionGrid = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  props.cardSelection.map((card, i) => {
    cardSelectionGrid[i] = (<Card id={card.id} context={'deck-selection-option'} onClickCard={props.onClickCard} size={selectionCardSize} value={card.value} type={card.type} inDeck={false} clickFunction={props.clickFunction} />);
  });
  let userSelectedGrid = ['', '', '', '', '', '', '', '', '', ''];
  props.userDeck.map((card, i) => {
    userSelectedGrid[i] = (<Card id={card.id} context={'deck-selected'} onClickCard={props.onClickCard} size={selectedCardSize} value={card.value} type={card.type} inDeck={true} clickFunction={props.clickFunction} />);
  });
  // let cardWidth = getComputedStyle(element).getPropertyValue(`--${selectionCardSize}-card-width)`);
  // let cardHeight = getComputedStyle(element).getPropertyValue(`--${selectionCardSize}-card-height)`);
  let cardWidth = `var(--${selectionCardSize}-card-width)`;
  let cardHeight = `var(--${selectionCardSize}-card-height)`;
  let previewCardWidth = `var(--${selectedCardSize}-card-width)`;
  let previewCardHeight = `var(--${selectedCardSize}-card-height)`;
  let cardRadius = `calc(var(--${selectionCardSize}-card-width) / 18)`;
  let cardBorder = `calc(var(--${selectionCardSize}-card-height) / 100)`;
  let previewGridWidth = `calc(${previewCardWidth} + ${cardBorder})`;
  let previewGridHeight = `calc(${previewCardHeight} + ${cardBorder})`;
  let gridWidth = cardWidth;
  let gridHeight = cardHeight;
  return (
    <div style={props.style} id='deck-select-screen'>
      <style jsx>{`
        #deck-select-screen {
          font-size: 1.5rem;
          font-family: var(--main-font);
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;

          opacity: 0;
          transform: scale(1.05);
          transition: opacity 300ms ease, transform 300ms ease;
        }
        #deck-selection-grid {
          display: grid;
          grid-template-columns: ${gridWidth} ${gridWidth} ${gridWidth} ${gridWidth} ${gridWidth} ${gridWidth};
          grid-template-rows: ${gridHeight} ${gridHeight} ${gridHeight};
          grid-column-gap: var(--card-buffer-size);
          grid-row-gap: var(--card-buffer-size);
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
        }
        #preview-deck-title {
          margin-bottom: 1.5vh;
        }
        #preview-deck-grid {
          display: grid;
          grid-template-columns: ${previewGridWidth} ${previewGridWidth} ${previewGridWidth} ${previewGridWidth} ${previewGridWidth};
          grid-template-rows: ${previewGridHeight} ${previewGridHeight};
          grid-column-gap: var(--card-buffer-size);
          grid-row-gap: var(--card-buffer-size);
        }
        #preview-deck-grid  > div, #deck-selection-grid  > div {
          display: flex;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          background-color: var(--card-spot-bg-color) !important;
        }
        #deck-selection-grid  > div {
          box-sizing: content-box;
          border: ${cardBorder} inset var(--card-spot-border-color);
          border-radius: calc(${cardRadius} * 2) !important;
          background-color: var(--card-spot-bg-color) !important;
        }
        #preview-deck-grid  > div {
          border: ${cardBorder} inset var(--card-spot-border-color);
          border-radius: calc(${cardRadius} * 2) !important;
          background-color: var(--card-spot-bg-color) !important;
        }
        #randomize-button {
          width: 80%;
          height: 65%;
          border-radius: 0.75rem;
          font-size: 2vh;
          background-color: rgba(51, 82, 5, 0.5) !important;
          border-color: rgba(51, 51, 0, 0.75) !important;
        }
        .pre-footer {
          border-color: transparent;
          background-color: transparent;
        }
        .throbbing {
          animation: throb 1000ms infinite;
        }
        @keyframes throb {
          0% {
            //transform: scale(1)
          }
          50% {
            //transform: scale(1.05);
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
            // return <div key={i} id={`card-selection-space-${i}`}>{card}</div>;
            return <div className='card-select-outline' key={i + 20}>{card}</div>;
          })}
        </div>
      </div>
      <div id='preview-deck-area'>
        <div id='preview-deck-title' className='smaller shadowed-text'>YOUR DECK:</div>
        <div id='preview-deck-grid'>
          {userSelectedGrid.map((card, i) => {
            // return <div id={`player-deck-space-${i}`} key={i}>{card}</div>;
            return <div className='card-select-outline' key={i + 60}>{card}</div>;
          })}
        </div>
      </div>
      <div className='pre-footer' id='deck-select-footer'>
        <button {...{[props.clickFunction]: (event) => props.onClickBack(event, 'selectingOpponent')}} id='deck-select-back-button' className='footer-back-button shadowed-text'>{'<'}</button>
        <button {...{[props.clickFunction]: props.onClickPlay}} className={`ready-button ${buttonDisabled} ${throbbing}`} id='deck-ready-button'>Start!</button>
        <button {...{[props.clickFunction]: props.onClickRandomize}} className='shadowed-text' id='randomize-button'>Random</button>
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
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

function areEqual(prevProps, nextProps) {
  console.log('prevProps', prevProps);
  console.log('nextProps', nextProps);
  return false;
}

export default React.memo(DeckSelectionScreen);




















