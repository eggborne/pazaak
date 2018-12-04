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
      userGrid: [
       
      ],
      opponentGrid: [
        
      ]
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
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
  }

  componentDidMount() {
    document.getElementById('container').style.height = window.innerHeight + 'px';
    Array.from(document.getElementsByClassName('deal-grid')).map((el) => {
      el.style.width = `${(cardSize.width * 4) + (cardSize.height * 0.42)}px`;
      el.style.height = `${cardSize.height*2.2}px`;
      el.style.paddingTop = `${cardSize.height*0.05}px`;
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
      this.setState({
        userGrid: newGridCards
      });
    } else {
      let newGridCards = this.state.opponentGrid.slice();
      let deckCopy = this.state.deck.slice();
      let newCard = Util.shuffle(deckCopy)[0];
      newGridCards.push(newCard);
      this.setState({
        opponentGrid: newGridCards
      });
    }
  }

  handleClickCard(event) {
    event.preventDefault();

  }
  handleClickEndTurn(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');

    this.dealToMainDeck('user');
    
  }
  handleClickStand(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', '#5CB3FF', '#cc0');
    Util.flash(clicked, 'background-color', 'black', '#111');

    this.dealToMainDeck('opponent');

  }

  render() {

    return (
      <div id='container'>
        <Header />
        <div id='game-board'>
          <div id='opponent-hand' className='hand'>
            {this.state.opponentHand.map((card, i) => {
              return <CardBack key={i} size={cardSize} />;
            })}
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
                  <div id='opponent-total'>18</div>
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
                  <div id='user-total'>16</div>
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
        <Footer onClickEndTurn={this.handleClickEndTurn} onClickStand={this.handleClickStand} />
      </div>
    );
  }
}

export default App;