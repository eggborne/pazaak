import style from '../css/styles.css';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Card from './Card';
import CardBack from './CardBack';
import createGame from '../scripts/init';
let Util = require('../scripts/util');

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

let cardSize = {};
let mediumCardSize = {};
let miniCardSize = {};

let cardHeight = (window.innerHeight / 6) * 0.8;

cardSize.width = (cardHeight / 1.66);
cardSize.height = cardHeight;
mediumCardSize.width = cardSize.width * 0.85;
mediumCardSize.height = cardSize.height * 0.85;
miniCardSize.width = cardSize.width * 0.75;
miniCardSize.height = cardSize.height * 0.75;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'splashScreen',
      deck: [],
      cardSelection: [
        { id: 11111, value: 1, type: 'plus' },
        { id: 22222, value: 2, type: 'plus' },
        { id: 33333, value: 3, type: 'plus' },
        { id: 44444, value: 4, type: 'plus' },
        { id: 55555, value: 5, type: 'plus' },
        { id: 66666, value: 6, type: 'plus' },
        { id: 77777, value: -1, type: 'minus' },
        { id: 88888, value: -2, type: 'minus' },
        { id: 99999, value: -3, type: 'minus' },
        { id: 101010, value: -4, type: 'minus' },
        { id: 111111, value: -5, type: 'minus' },
        { id: 121212, value: -6, type: 'minus' },
      ],
      userDeck: [
        // { id: 1, value: 1, type: 'plus' },
        // { id: 2, value: 2, type: 'plus' },
        // { id: 3, value: 3, type: 'plus' },
        // { id: 4, value: 3, type: 'plus' },
        // { id: 5, value: 4, type: 'plus' },
        // { id: 6, value: 5, type: 'plus' },
        // { id: 7, value: 6, type: 'plus' },
        // { id: 8, value: -2, type: 'minus' },
        // { id: 9, value: -3, type: 'minus' },
        // { id: 10, value: -5, type: 'minus' },
      ],
      opponentDeck: [
        { id: 1, value: 1, type: 'plus' },
        { id: 2, value: 3, type: 'plus' },
        { id: 3, value: 3, type: 'plus' },
        { id: 4, value: 4, type: 'plus' },
        { id: 5, value: 5, type: 'plus' },
        { id: 6, value: -1, type: 'minus' },
        { id: 7, value: -2, type: 'minus' },
        { id: 8, value: -4, type: 'minus' },
        { id: 9, value: -4, type: 'minus' },
        { id: 10, value: -6, type: 'minus' },
      ],
      idCount: 11,
      userHand: [],
      opponentHand: [],
      userGrid: [],
      opponentGrid: [],
      userTotal: 0,
      opponentTotal: 0
    };

    let deck = [];
    for (let i = 1; i < 41; i++) {
      deck[i - 1] = {};
      let currentValue = i;
      if (i > 10) {
        if (i.toString()[1] === '0') {
          currentValue = 10;
        } else {
          currentValue = parseInt(i.toString()[1]);
        }
      }
      deck[i - 1].value = currentValue;
      deck[i - 1].type = 'house';
    }

    this.state.deck = this.shuffleDeck(deck);

    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.getPlayerHands = this.getPlayerHands.bind(this);
    this.dealToPlayerGrid = this.dealToPlayerGrid.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickHow = this.handleClickHow.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
    this.getCardIndexById = this.getCardIndexById.bind(this);
  }

  componentDidMount() {
    document.getElementById('container').style.height = window.innerHeight + 'px';
    Array.from(document.getElementsByClassName('deal-grid')).map((el) => {
      el.style.width = `${(cardSize.width * 4) + (cardSize.height * 0.42)}px`;
      el.style.height = `${cardSize.height * 2.2}px`;
      el.style.paddingTop = `${cardSize.height * 0.05}px`;
    });
  }

  shuffleDeck(deck) {
    let deckCopy = deck.slice();
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    return deckCopy;
  }

  getPlayerHands() {
    let userDeckCopy = Util.shuffle(this.state.userDeck.slice());
    let opponentDeckCopy = Util.shuffle(this.state.opponentDeck.slice());
    let newUserHand = [];
    let newOpponentHand = [];
    let newUserHandSlice = userDeckCopy.slice(0, 4);
    let newOpponentHandSlice = opponentDeckCopy.slice(0, 4);
    let userPlus = [];
    let userMinus = [];
    let opponentPlus = [];
    let opponentMinus = [];
    // separate pluses and minuses into their own arrays
    newUserHandSlice.map((card) => {
      if (card.type === 'plus') {
        userPlus.push(card);
      } else {
        userMinus.push(card);
      }
    });
    newOpponentHandSlice.map((card) => {
      if (card.type === 'plus') {
        opponentPlus.push(card);
      } else {
        opponentMinus.push(card);
      }
    });
    // sort those arrays by value (negatives in reverse order)
    userPlus.sort((a, b) => a.value - b.value);
    userMinus.sort(function (a, b) { return b.value - a.value; });
    opponentPlus.sort((a, b) => a.value - b.value);
    opponentMinus.sort(function (a, b) { return b.value - a.value; });
    // put them back in the array, pluses first
    userPlus.map(card => newUserHand.push(card));
    userMinus.map(card => newUserHand.push(card));
    opponentPlus.map(card => newOpponentHand.push(card));
    opponentMinus.map(card => newOpponentHand.push(card));
    this.setState({
      userHand: newUserHand,
      opponentHand: newOpponentHand
    });
  }

  dealToPlayerGrid(player) {
    if (player === 'user') {
      let newGridCards = this.state.userGrid.slice();
      let deckCopy = this.state.deck.slice();
      let newCard = Util.shuffle(deckCopy)[0];
      newGridCards.push(newCard);
      let newTotal = 0;
      newTotal += this.state.userTotal + newCard.value;
      if (newTotal === 20) {
        document.getElementById('user-total').style.color = 'green';
      } else if (newTotal > 20) {
        document.getElementById('user-total').style.color = 'red';
      }
      this.setState({
        userGrid: newGridCards,
        userTotal: newTotal
      });
    } else {
      let newGridCards = this.state.opponentGrid.slice();
      let deckCopy = this.state.deck.slice();
      let newCard = Util.shuffle(deckCopy)[0];
      newGridCards.push(newCard);
      let newTotal = 0;
      newTotal += this.state.opponentTotal + newCard.value;
      if (newTotal === 20) {
        document.getElementById('opponent-total').style.color = 'green';
      } else if (newTotal > 20) {
        document.getElementById('opponent-total').style.color = 'red';
      }
      this.setState({
        opponentGrid: newGridCards,
        opponentTotal: newTotal
      });
    }
  }

  handleClickStart(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');

    document.getElementById('deck-select-footer').style.transform = 'translateY(0%)';

    setTimeout(() => {
      this.setState({
        phase: 'selectingDeck'
      });
    }, 150);
  }
  handleClickPlay(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');

    let hands = this.getPlayerHands();
    // this.state.userHand = hands[0];
    // this.state.opponentHand = hands[1];

    document.getElementById('deck-select-footer').style.transform = 'transform: translateY(100%)';

    setTimeout(() => {
      this.setState({
        phase: 'gameStarted'
      });
    }, 150);
  }
  handleClickHow(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
    let self = this;
    setTimeout(() => {
      this.setState({
        phase: 'showingInstructions'
      });
    }, 150);
  }
  handleClickOptions(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
    setTimeout(() => {
      this.setState({
        phase: 'showingOptions'
      });
    }, 150);
  }
  handleClickEndTurn(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
    if (this.state.userTotal < 20 && this.state.userGrid.length < 9) {
      this.dealToPlayerGrid('user');
    }
  }
  handleClickStand(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
    if (this.state.opponentTotal < 20 && this.state.opponentGrid.length < 9) {
      this.dealToPlayerGrid('opponent');
    }
  }
  handleClickCard(value, type) {
    event.preventDefault();
    if (this.state.phase === 'selectingDeck') {
      if (event.target.id.toString().length > 9) {
        // it's a selection card, so put it in player deck
        if (this.state.userDeck.length < 10) {
          let deckCopy = this.state.userDeck.slice();
          let newCard = { id: this.state.idCount, value: value, type: type };
          deckCopy.push(newCard);
          let newCount = this.state.idCount;
          if (deckCopy.length === 10) {
            document.getElementById('play-button').classList.remove('disabled-button');
          }
          this.setState({
            userDeck: deckCopy,
            idCount: (this.state.idCount + 1)
          });
        }
      } else {
        // it's already in the player deck, so take it out
        let clickedCardId = event.target.id;
        let deckCopy = this.state.userDeck.slice();
        let indextoRemove = this.getCardIndexById(deckCopy, clickedCardId);
        deckCopy.splice(indextoRemove, 1);
        if (deckCopy.length === 9) {
          document.getElementById('play-button').classList.add('disabled-button');
        }
        this.setState({
          userDeck: deckCopy
        });
      }
    }
  }
  getCardIndexById(arr, id) {
    let match = undefined;
    arr.forEach((card, i) => {
      if (`card-${card.id}` === id) {
        match = i;
      }
    });
    return match;
  }

  render() {
    let footerOn = { position: 'absolute', bottom: '-3rem' };
    let gameStarted = { display: 'none' };
    let introScreen = { display: 'none' };
    let instructionsScreen = { display: 'none' };
    let optionsScreen = { display: 'none' };
    let deckSelectScreen = { display: 'none' };
    let cardsLeft = 10 - this.state.userDeck.length;
    let chooseStyle = {
      transition: 'all 300ms ease'
    };
    if (this.state.phase === 'gameStarted') {
      gameStarted = { display: 'flex' };
      footerOn = { position: 'relative', bottom: '0' };
    } else if (this.state.phase === 'selectingDeck') {
      deckSelectScreen = { display: 'flex' };
    } else if (this.state.phase === 'showingOptions') {
      optionsScreen = { display: 'flex' };
    } else if (this.state.phase === 'showingInstructions') {
      instructionsScreen = { display: 'flex' };
    } else if (this.state.phase === 'splashScreen') {
      introScreen = { display: 'flex' };
    }
    let cardPlural = 's';
    if (cardsLeft === 1) {
      cardPlural = '';
    }
    if (cardsLeft === 0) {
      cardsLeft = 1;
      cardPlural = '';
      chooseStyle.opacity = 0;
    }
    return (
      <div id='container'>
        <Header />

        {/* INTRO */}
        <div style={introScreen} id='intro-screen'>
          <button onClick={this.handleClickStart} className='intro-button' id='start-button'>Start Game</button>
          <button onClick={this.handleClickHow} className='intro-button' id='how-button'>How to Play</button>
          <button onClick={this.handleClickOptions} className='intro-button' id='options-button'>Options</button>
        </div>

        {/* INSTRUCTIONS */}
        <div style={instructionsScreen} id='instructions-screen'>
          How to play
        </div>

        {/* OPTIONS */}
        <div style={optionsScreen} id='options-screen'>
          Options
        </div>

        {/* DECK SELECT */}
        <div style={deckSelectScreen} id='deck-select-screen'>
          <div id='deck-select-title'>
            <div className='shadowed-text'>Create deck</div>
            <div style={chooseStyle} className='smaller shadowed-text'>choose {cardsLeft} card{cardPlural}</div>
          </div>
          <div id='deck-selection-area'>
            <div id='deck-selection-grid'>
              {this.state.cardSelection.map((card, i) =>
                <Card key={card.id} id={card.id} onClickCard={this.handleClickCard} size={mediumCardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>
          <div className='smaller shadowed-text'>YOUR DECK:</div>
          <div id='preview-deck-area'>
            <div id='preview-deck-grid'>
              {this.state.userDeck.map((card, i) =>
                <Card className='cock' key={card.id} id={card.id} onClickCard={this.handleClickCard} size={cardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>
          <div id='deck-select-footer'>
            <button className='disabled-button' onClick={this.handleClickPlay} id='play-button'>Ready!</button>
          </div>
        </div>

        {/* GAME BOARD */}
        <div style={gameStarted} id='game-board'>
          <div id='opponent-hand' className='hand'>
            {this.state.opponentHand.map((card, i) =>
              <CardBack key={i} size={miniCardSize} />
            )}
          </div>
          <div id='grids'>
            <div id='opponent-area' className='player-area'>
              <div id='opponent-grid' className='deal-grid'>
                {this.state.opponentGrid.map((card, i) => {
                  return <Card key={i} size={cardSize} value={card.value} type={card.type} />;
                })}
              </div>
              <div className='total-display'>
                <div className='total-outline'>
                  <div id='opponent-total'>{this.state.opponentTotal}</div>
                </div>
              </div>
            </div>
            <div id='user-area' className='player-area'>
              <div id='user-grid' className='deal-grid'>
                {this.state.userGrid.map((card, i) => {
                  return <Card key={i} size={cardSize} value={card.value} type={card.type} />;
                })}
              </div>
              <div className='total-display'>
                <div className='total-outline'>
                  <div id='user-total'>{this.state.userTotal}</div>
                </div>
              </div>
            </div>
          </div>
          <div id='player-hand' className='hand'>
            {this.state.userHand.map((card, i) => {
              return <Card key={i} id={card.id} size={cardSize} value={card.value} type={card.type}
                onClickCard={this.handleClickCard} />;
            })}
          </div>
        </div>

        <Footer display={footerOn} onClickEndTurn={this.handleClickEndTurn} onClickStand={this.handleClickStand} />
      </div>
    );
  }
}

export default App;