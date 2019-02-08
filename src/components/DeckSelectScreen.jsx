import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  setTimeout(() => {
    document.getElementById('deck-select-screen').style.opacity = 1;
    document.getElementById('deck-select-screen').style.transform = 'none';
  }, 1);

  console.error('------------------------------------------- DeckSelectionScreen rendering', props);
  let selectionCardSize = 'medium';
  let selectedCardSize = 'normal';
  let cardsLeft = 10 - props.userDeck.length;
  let chooseStyle = {};
  let chooseText = 'Ready to play!';
  let cardPlural = 's';

  if (cardsLeft === 1) {
    cardPlural = '';
  }
  if (cardsLeft === 0) {
    cardsLeft = 1;
    cardPlural = '';
    chooseStyle.color = 'green';
    requestAnimationFrame(() => {
      document.getElementById('deck-ready-button').classList.remove('disabled-button');
      document.getElementById('deck-ready-button').classList.add('throbbing');
    });
  } else {
    chooseText = `choose ${cardsLeft} card${cardPlural}`;
    requestAnimationFrame(() => {
      document.getElementById('deck-ready-button').classList.remove('throbbing');
      document.getElementById('deck-ready-button').classList.add('disabled-button');
    });
  }
  let cardSelectionGrid = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  props.cardSelection.map((card, i) => {
    cardSelectionGrid[i] = (
      <Card
        id={card.id}
        context={'deck-selection-option'}
        onClickCard={props.onClickCard}
        size={selectionCardSize}
        value={card.value}
        type={card.type}
        inDeck={false}
        clickFunction={props.clickFunction}
      />
    );
  });
  let userSelectedGrid = ['', '', '', '', '', '', '', '', '', ''];
  props.userDeck.map((card, i) => {
    userSelectedGrid[i] = (
      <Card id={card.id} context={'deck-selected'} onClickCard={props.onClickCard} size={selectedCardSize} value={card.value} type={card.type} inDeck={true} clickFunction={props.clickFunction} />
    );
  });
  // let cardWidth = getComputedStyle(element).getPropertyValue(`--${selectionCardSize}-card-width)`);
  // let cardHeight = getComputedStyle(element).getPropertyValue(`--${selectionCardSize}-card-height)`);
  let cardWidth = `var(--${selectionCardSize}-card-width)`;
  let cardHeight = `var(--${selectionCardSize}-card-height)`;
  let previewCardWidth = `var(--${selectedCardSize}-card-width)`;
  let previewCardHeight = `var(--${selectedCardSize}-card-height)`;
  let cardRadius = `calc(var(--${selectionCardSize}-card-width) / 18)`;
  let cardBorder = `calc(var(--${selectedCardSize}-card-height) / 100)`;

  return (
    <div id="deck-select-screen">
      <style jsx>
        {`
          #deck-select-screen {
            margin-top: var(--header-height);
            margin-bottom: var(--control-footer-height);
            font-size: calc(var(--header-height) / 2);
            font-family: var(--main-font);
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: space-between;
            align-items: center;
            opacity: 0.5;
            transform: scale(1.05);
            //display: ${props.phase === 'selectingDeck' ? 'flex' : 'none'};
            transition: transform 300ms ease, opacity 300ms ease;
            will-change: transform, opacity;
          }
          #cards-area {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            flex-grow: 1;
          }
          #deck-selection-grid {
            display: grid;
            grid-template-columns: ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth};
            grid-template-rows: ${cardHeight} ${cardHeight} ${cardHeight};
            grid-column-gap: var(--card-buffer-size);
            grid-row-gap: var(--card-buffer-size);
          }
          #deck-select-title {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100vw;
          }
          #deck-select-title > div {
            width: 95%;
            text-align: center;
            box-sizing: border-box;
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
            box-sizing: content-box;
            display: grid;
            grid-template-columns: ${previewCardWidth} ${previewCardWidth} ${previewCardWidth} ${previewCardWidth} ${previewCardWidth};
            grid-template-rows: ${previewCardHeight} ${previewCardHeight};
            grid-column-gap: var(--menu-border-width);
            grid-row-gap: var(--menu-border-width);
          }
          #preview-deck-grid > div,
          #deck-selection-grid > div {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--card-spot-bg-color) !important;
          }
          #preview-deck-grid > div {
            border: ${cardBorder} inset var(--card-spot-border-color);
            border-radius: calc(${cardRadius} * 2) !important;
            background-color: var(--card-spot-bg-color) !important;
          }
          #choose-text {
            font-family: var(--main-font);
          }
        `}
      </style>
      <div className="pre-header" id="deck-select-title">
        <div className="shadowed-text">Create deck</div>
      </div>
      <div id="choose-text" style={chooseStyle} className="smaller shadowed-text">
        {chooseText}
      </div>
      <div id="cards-area">
        <div id="deck-selection-area">
          <div id="deck-selection-grid">
            {cardSelectionGrid.map((card, i) => {
              // return <div key={i} id={`card-selection-space-${i}`}>{card}</div>;
              return <div key={i}>{card}</div>;
            })}
          </div>
        </div>
        <div id="preview-deck-area">
          <div id="preview-deck-title" className="smaller shadowed-text">
            YOUR DECK:
          </div>
          <div id="preview-deck-grid">
            {userSelectedGrid.map((card, i) => {
              return <div key={i}>{card}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
DeckSelectionScreen.propTypes = {
  cardSelection: PropTypes.array,
  userDeck: PropTypes.array,
  onClickCard: PropTypes.func,
  onClickBack: PropTypes.func,
  clickFunction: PropTypes.string
};

export default DeckSelectionScreen;
