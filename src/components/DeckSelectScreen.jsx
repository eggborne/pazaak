import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

function DeckSelectionScreen(props) {
  console.big('DeckSelectionScreen rendering');
  console.info(props);
  console.big('DeckSelectionScreen rendering');
  setTimeout(() => {
    document.getElementById('deck-select-screen').style.opacity = 1;
    document.getElementById('deck-select-screen').style.transform = 'none';
  }, 1);

  let selectionCardSize = 'mini';
  let selectedCardSize = 'mini';
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
    if (cardsLeft < 10) {
      chooseText = `choose ${cardsLeft} more card${cardPlural}`;
    } else {
      chooseText = `choose ${cardsLeft} card${cardPlural}`;
    }
    requestAnimationFrame(() => {
      document.getElementById('deck-ready-button').classList.remove('throbbing');
      document.getElementById('deck-ready-button').classList.add('disabled-button');
    });
  }
  let cardSelectionGrid = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
  props.cardSelection.map((card, i) => {
    console.log('card', i, 'is', card)
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
  
  if (!props.userDeck) {
    props.userDeck = [];
  }
  props.userDeck.map((card, i) => {
    console.log('inserting')
    console.info(card)
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
  console.info('userSelectedGrid')
  console.info(userSelectedGrid)
  return (
    <div id="deck-select-screen">
      <style jsx>
        {`
          #deck-select-screen {          
            font-size: calc(var(--header-height) / 2);
            font-family: var(--main-font);
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            align-items: center;
            opacity: 0.5;
            transform: scale(1.05);
            transition: transform 300ms ease, opacity 300ms ease;
            will-change: transform, opacity;
          }
          #cards-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
          }
          #deck-selection-area {
            border: var(--inner-menu-border);
            border-color: var(--dark-red-bg-color);
            border-radius: var(--menu-border-radius);
            text-align: center;
            padding: calc(var(--menu-border-radius) * 2);
            padding-top: 0;
          }
          #deck-selection-grid {                            
            display: grid;
            grid-template-columns: ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth} ${cardWidth};
            grid-template-rows: ${cardHeight} ${cardHeight} ${cardHeight} ${cardHeight};
            grid-column-gap: var(--card-buffer-size);
            grid-row-gap: var(--card-buffer-size);
          }
          #deck-select-title {
            font-family: var(--title-font);height: calc(var(--header-height) / 1.5);
            font-size: calc(var(--header-height) / 2);
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: calc(var(--header-height) / 1.25);
          }
          #preview-deck-area {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #preview-deck-title, #available-deck-title {
            height: calc(var(--menu-border-radius) * 4);
            display: flex;
            align-items: center;
            justify-content: center;
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
            border-radius: var(--menu-border-width);
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--card-spot-bg-color) !important;
          }
          #preview-deck-grid > div {
            border-radius: calc(${cardRadius} * 2) !important;
            background-color: var(--card-spot-bg-color) !important;
          }
          #choose-text {
            font-family: var(--main-font);
          }
        `}
      </style>
      <div id="deck-select-title">
        <div className="shadowed-text">Create deck</div>
      </div>
      <div id="choose-text" style={chooseStyle} className="smaller shadowed-text">
        {chooseText}
      </div>
      <div id="cards-area">
        <div id="deck-selection-area">
          <div id='available-deck-title' className="smaller shadowed-text">AVAILABLE CARDS</div>
          <div id="deck-selection-grid">
            {cardSelectionGrid.map((card, i) => {
              let cardKey = card.props ? card.props.id : i;
              console.log('laying cardSelectionGrid card', cardKey);
              return <div key={'selection-'+cardKey}>{card}</div>;
            })}
          </div>
        </div>
        <div id="preview-deck-area">
          <div id="preview-deck-title" className="smaller shadowed-text">
            YOUR DECK:
          </div>
          <div id="preview-deck-grid">
            {userSelectedGrid.map((card, i) => {
              let cardKey = card.props ? card.props.id : i;
              console.log('laying userSelectedGrid card', cardKey);
              return <div key={'selected-'+cardKey}>{card}</div>;
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
