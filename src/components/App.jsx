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

let cardHeight = (window.innerHeight / 6) * 0.75;

cardSize.width = (cardHeight / 1.66);
cardSize.height = cardHeight;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: 'splashScreen',
      deck: [],
      userDeck: [
        { id: 1, value: 1, type: 'plus' },
        { id: 2, value: 2, type: 'plus' },
        { id: 3, value: 3, type: 'plus' },
        { id: 4, value: 3, type: 'plus' },
        { id: 5, value: 4, type: 'plus' },
        { id: 6, value: 5, type: 'plus' },
        { id: 7, value: 6, type: 'plus' },
        { id: 8, value: 2, type: 'minus' },
        { id: 9, value: 3, type: 'minus' },
        { id: 10, value: 5, type: 'minus' },
      ],
      opponentDeck: [
        { id: 11, value: 1, type: 'plus' },
        { id: 12, value: 3, type: 'plus' },
        { id: 13, value: 3, type: 'plus' },
        { id: 14, value: 4, type: 'plus' },
        { id: 15, value: 5, type: 'plus' },
        { id: 16, value: 1, type: 'minus' },
        { id: 17, value: 2, type: 'minus' },
        { id: 18, value: 4, type: 'minus' },
        { id: 19, value: 4, type: 'minus' },
        { id: 20, value: 6, type: 'minus' },
      ],
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
    let hands = this.getPlayerHands();
    this.state.userHand = hands[0];
    this.state.opponentHand = hands[1];

    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.getPlayerHands = this.getPlayerHands.bind(this);
    this.dealToMainDeck = this.dealToMainDeck.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickHow = this.handleClickHow.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.dealToMainDeck = this.dealToMainDeck.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
  }

  componentDidMount() {
    document.getElementById('container').style.height = window.innerHeight + 'px';
    document.getElementById('deck-selection-grid').style.minWidth = `${cardSize.width*6}px`;
    document.getElementById('deck-selection-grid').style.maxWidth = `${cardSize.width*6}px`;
    // document.getElementById('deck-selection-grid').style.maxWidth = '300px';
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
    // sort those arrays by value
    userPlus.sort((a, b) => a.value - b.value);
    userMinus.sort(function (a, b) { return a.value - b.value; });
    opponentPlus.sort((a, b) => a.value - b.value);
    opponentMinus.sort(function (a, b) { return a.value - b.value; });
    // put them back in the array, pluses first
    userPlus.map(card => newUserHand.push(card));
    userMinus.map(card => newUserHand.push(card));
    opponentPlus.map(card => newOpponentHand.push(card));
    opponentMinus.map(card => newOpponentHand.push(card));
    return [newUserHand, newOpponentHand];
  }

  dealToMainDeck(player) {
    if (player === 'user') {
      let newGridCards = this.state.userGrid.slice();
      let deckCopy = this.state.deck.slice();
      let newCard = Util.shuffle(deckCopy)[0];
      newGridCards.push(newCard);
      let newTotal = 0;
      newTotal += this.state.userTotal + newCard.value;
      console.log(`new ${player} total ${newTotal}`);
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
      console.log(`new ${player} total ${newTotal}`);
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
    setTimeout(() => {
      this.setState({
        phase: 'gameStarted'
      });
    }, 100);
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

  handleClickCard(event) {
    event.preventDefault();

  }
  handleClickEndTurn(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');
    if (this.state.userTotal < 20 && this.state.userGrid.length < 9) {
      this.dealToMainDeck('user');
    }
  }
  handleClickStand(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');


    if (this.state.opponentTotal < 20 && this.state.opponentGrid.length < 9) {
      this.dealToMainDeck('opponent');
    }
  }

  render() {
    let footerOn = { position: 'absolute', bottom: '-3rem' };
    let gameStarted = { display: 'none' };
    let introScreen = { display: 'none' };
    let instructionsScreen = { display: 'none' };
    let optionsScreen = { display: 'none' };
    let deckSelectScreen = { display: 'none' };
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
    return (
      <div id='container'>
        <Header />
        <div style={introScreen} id='intro-screen'>
          <button onClick={this.handleClickStart} className='intro-button' id='start-button'>Start Game</button>
          <button onClick={this.handleClickHow} className='intro-button' id='how-button'>How to Play</button>
          <button onClick={this.handleClickOptions} className='intro-button' id='options-button'>Options</button>
        </div>
        <div style={instructionsScreen} id='instructions-screen'>
          How to play
        </div>
        <div style={optionsScreen} id='options-screen'>
          Options
        </div>
        <div style={deckSelectScreen} id='deck-select-screen'>
          <div id='deck-select-title'>
            Create deck
            <div className='smaller'>choose 4 cards</div>
            </div>
          
          <div id='deck-selection-area'>
            <div id='deck-selection-grid'>
              {this.state.userDeck.map((card, i) => 
                <Card key={card.id} id={card.id} size={cardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>
          <div id='preview-deck'>
            HAND
          </div>
          <div id='deck-select-footer'>
            <button onClick={this.handleClickPlay} className='intro-button' id='options-button'>Play!</button>
          </div>
        </div>
        <div style={gameStarted} id='game-board'>
          <div id='opponent-hand' className='hand'>
            {this.state.opponentHand.map((card, i) => 
              <CardBack key={i} size={cardSize} />
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