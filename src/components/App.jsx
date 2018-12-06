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

let cardHeight = (window.innerHeight / 6) * 0.825;

let instructionsText = `${''}And what of the Rebellion? If the Rebels have obtained a complete technical readout of this station, it is possible, however unlikely, that they might find a weakness and exploit it. The plans you refer to will soon be back in our hands. Any attack made by the Rebels against this station would be a useless gesture, no matter what technical data they've obtained. This station is now the ultimate power in the universe. I suggest we use it! Are they away? They have just made the jump into hyperspace. You're sure the homing beacon is secure aboard their ship? I'm taking an awful risk, Vader. This had better work. Aren't you a little short to be a stormtrooper? What? Oh...the uniform. I'm Luke Skywalker. I'm here to rescue you. You're who? I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi. Ben Kenobi is here! Where is he? Come on! The ship's all yours. If the scanners pick up anything, report it immediately. All right, let's go. Hey down there, could you give us a hand with this? TX-four-one-two. Why aren't you at your post? TX-four-one-two, do you copy? Take over. We've got a bad transmitter. I'll see what I can do. You know, between his howling and your blasting everything in sight, it's a wonder the whole station doesn't know we're here. Bring them on! I prefer a straight fight to all this sneaking around. We found the computer outlet, sir. Plug in. He should be able to interpret the entire Imperial computer network. That malfunctioning little twerp. This is all his fault! He tricked me into going this way, but he'll do no better. Wait, what's that? A transport! I'm saved! Over here! Help! Please, help! Artoo-Detoo! It's you! It's you!`;

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
      userDeck: [],
      opponentDeck: [
        { id: 1, value: 1, type: 'plus' },
        { id: 2, value: 2, type: 'plus' },
        { id: 3, value: 3, type: 'plus' },
        { id: 4, value: 3, type: 'plus' },
        { id: 5, value: 4, type: 'plus' },
        { id: 5, value: 5, type: 'plus' },
        { id: 5, value: 5, type: 'plus' },
        { id: 6, value: -1, type: 'minus' },
        { id: 7, value: -2, type: 'minus' },
        { id: 9, value: -4, type: 'minus' },
      ],
      idCount: 11,
      userHand: [],
      opponentHand: [],
      userGrid: [],
      opponentGrid: [],
      userTotal: 0,
      opponentTotal: 0,
      turn: 'user',
      userWins: 0,
      opponentWins: 0
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

    this.buttonTextColor = window.getComputedStyle(document.body).getPropertyValue('--button-text-color');
    this.buttonBgColor = window.getComputedStyle(document.body).getPropertyValue('--button-bg-color');

    this.state.deck = this.shuffleDeck(deck);

    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.getPlayerHands = this.getPlayerHands.bind(this);
    this.dealToPlayerGrid = this.dealToPlayerGrid.bind(this);
    this.handleToggleOption = this.handleToggleOption.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickHeader = this.handleClickHeader.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickHow = this.handleClickHow.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
    this.removeCardFromHand = this.removeCardFromHand.bind(this);
    this.addCardtoGrid = this.addCardtoGrid.bind(this);
    this.changeCardTotal = this.changeCardTotal.bind(this);
    this.getCardIndexById = this.getCardIndexById.bind(this);
  }

  componentDidMount() {
    document.getElementById('container').style.height = `${window.innerHeight}px`;
    document.getElementById('user-hand').style.height = `${cardSize.height * 1.1}px`;
    document.getElementById('opponent-hand').style.height = `${miniCardSize.height * 1.1}px`;
    Array.from(document.getElementsByClassName('turn-indicator')).map((el) => {
      el.style.height = el.style.width = `${cardSize.height / 2.75}px`;
    });
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
    let newGridCards = this.state[`${player}Grid`].slice();
    let deckCopy = this.state.deck.slice();
    let newCard = Util.shuffle(deckCopy)[0];
    newGridCards.push(newCard);
    let newTotal = 0;
    newTotal += this.state[`${player}Total`] + newCard.value;
    if (newTotal === 20) {
      document.getElementById(`${player}-total`).style.color = 'green';
      document.getElementById(`${player}-total-outline`).style.borderColor = '#933500';

    } else if (newTotal > 20) {
      document.getElementById(`${player}-total`).style.color = 'red';
      document.getElementById(`${player}-total-outline`).style.borderColor = 'red';
    }
    this.setState({
      [`${player}Grid`]: newGridCards,
      [`${player}Total`]: newTotal
    });
  }
  handleToggleOption(event) {
    var el = event.target;
    if (el.classList.length > 1) {
      el.classList.remove('option-off');
      el.innerHTML = 'ON';
      if (event.target.id === 'sound-fx-toggle') {
        // sound fx on
      }
      if (event.target.id === 'ambience-toggle') {
        // ambience on
      }
      if (event.target.id === 'dark-mode-toggle') {
        // dark mode on
      }
    } else {
      el.classList.add('option-off');
      el.innerHTML = 'OFF';
      if (event.target.id === 'sound-fx-toggle') {
        // sound fx off
      }
      if (event.target.id === 'ambience-toggle') {
        // ambience off
      }
      if (event.target.id === 'dark-mode-toggle') {
        // dark mode off
      }
    }
  }
  handleClickHeader() {
    this.setState({
      phase: 'splashScreen'
    });
  }
  handleClickStart(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
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
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');

    let hands = this.getPlayerHands();

    document.getElementById('deck-select-footer').style.transform = 'transform: translateY(100%)';

    setTimeout(() => {
      this.setState({
        phase: 'gameStarted'
      });
    }, 150);
  }
  handleClickBack(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
    setTimeout(() => {
      this.setState({
        phase: 'splashScreen'
      });
    }, 150);
  }
  handleClickHow(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
    setTimeout(() => {
      this.setState({
        phase: 'showingInstructions'
      });
    }, 150);
  }
  handleClickOptions(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
    setTimeout(() => {
      this.setState({
        phase: 'showingOptions'
      });
    }, 150);
  }
  handleClickEndTurn(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
    if (this.state.userTotal < 20 && this.state.userGrid.length < 9) {
      this.dealToPlayerGrid('user');
    }
  }
  handleClickStand(event) {
    event.preventDefault();
    let clicked = event.target.id;
    Util.flash(clicked, 'color', this.buttonTextColor, '#cc0');
    Util.flash(clicked, 'background-color', this.buttonBgColor, '#111');
    if (this.state.opponentTotal < 20 && this.state.opponentGrid.length < 9) {
      this.dealToPlayerGrid('opponent');
    }
  }
  handleClickCard(event, value, type) {
    event.preventDefault();

    // SELECTING DECK

    if (this.state.phase === 'selectingDeck') {
      if (event.target.id.toString().length > 9) {
        // it's a selection card, so put it in player deck
        if (this.state.userDeck.length < 10) {
          let deckCopy = this.state.userDeck.slice();
          let newCard = { id: this.state.idCount, value: value, type: type };
          deckCopy.push(newCard);
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

    // GAME STARTED

    if (this.state.phase === 'gameStarted') {
      if ((this.state.userTotal + value < 20) && this.state.userGrid.length < 9) {
        this.removeCardFromHand('user', event.target.id);
        this.addCardtoGrid('user', value, type);
        this.changeCardTotal('user', this.state.userTotal + value);
      }
    }

  }
  removeCardFromHand(player, cardId) {
    let handCopy = this.state[`${player}Hand`].slice();
    let indextoRemove = this.getCardIndexById(handCopy, cardId);
    handCopy.splice(indextoRemove, 1);
    this.setState({
      [`${player}Hand`]: handCopy
    });
  }
  addCardtoGrid(player, value, type) {
    let gridCopy = this.state[`${player}Grid`].slice();
    let newCard = { value: value, type: type };
    gridCopy.push(newCard);
    this.setState({
      [`${player}Grid`]: gridCopy
    });
  }
  changeCardTotal(player, newTotal) {
    if (newTotal === 20) {
      document.getElementById('user-total').style.color = 'green';
      document.getElementById('user-total').style.borderColor = 'red';
    } else if (newTotal > 20) {
      document.getElementById('user-total').style.color = 'red';
      document.getElementById('user-total').style.borderColor = 'red';
    } else {
      document.getElementById('user-total').style.color = 'white';
      document.getElementById('user-total').style.borderColor = '#933500';
    }
    this.setState({
      [`${player}Total`]: newTotal
    });
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
      chooseStyle.color = 'green';
      document.getElementById('choose-text').innerHTML = 'Ready to play!';
    }
    let userTurn = '';
    let opponentTurn = '';
    if (this.state.turn === 'user') {
      userTurn = 'turn-lighted';
    } else {
      opponentTurn = 'turn-lighted';
    }
    let userWins = ['', '', ''];
    let opponentWins = ['', '', ''];
    if (this.state.userWins === 1) {
      userWins[0] = 'win-symbol-lighted';
    }
    if (this.state.userWins === 2) {
      userWins[0] = userWins[1] = 'win-symbol-lighted';
    }
    if (this.state.opponentWins === 1) {
      opponentWins[0] = 'win-symbol-lighted';
    }
    if (this.state.opponentWins === 2) {
      opponentWins[0] = opponentWins[1] = 'win-symbol-lighted';
    }

    return (
      <div id='container'>
        <Header onClickHeader={this.handleClickHeader} />

        {/* INTRO */}
        <div style={introScreen} id='intro-screen'>
          <button onClick={this.handleClickStart} className='intro-button' id='start-button'>Start Game</button>
          <button onClick={this.handleClickHow} className='intro-button' id='how-button'>How to Play</button>
          <button onClick={this.handleClickOptions} className='intro-button' id='options-button'>Options</button>
        </div>

        {/* INSTRUCTIONS */}
        <div style={instructionsScreen} id='instructions-screen'>
          <div className='options-instructions-title shadowed-text'>How to play</div>
          <div id='instructions' className='shadowed-text'>
            {instructionsText}
          </div>
          <button onClick={this.handleClickBack} className='back-button' id='instructions-back-button'>Back</button>

        </div>

        {/* OPTIONS */}
        <div style={optionsScreen} id='options-screen'>
          <div className='options-instructions-title shadowed-text'>Options</div>
          <div id='options' className='shadowed-text'>
            <div id='options-grid'>
              <div className='option-label'>Sound FX</div><div onClick={this.handleToggleOption} id='sound-fx-toggle' className='option-toggle option-off'>OFF</div>
              <div className='option-label'>Ambience</div><div onClick={this.handleToggleOption} id='ambience-toggle' className='option-toggle option-off'>OFF</div>
              <div className='option-label'>Dark Mode</div><div onClick={this.handleToggleOption} id='dark-mode-toggle' className='option-toggle option-off'>OFF</div>
            </div>
          </div>
          <button onClick={this.handleClickBack} className='back-button' id='options-back-button'>Back</button>

        </div>

        {/* DECK SELECT */}
        <div style={deckSelectScreen} id='deck-select-screen'>

          <div id='deck-select-title'>
            <div className='shadowed-text'>Create deck</div>
            <div id='choose-text' style={chooseStyle} className='smaller shadowed-text'>choose {cardsLeft} card{cardPlural}</div>
          </div>

          <div id='deck-selection-area'>
            <div id='deck-selection-grid'>
              {this.state.cardSelection.map((card, i) =>
                <Card key={card.id} id={card.id} onClickCard={this.handleClickCard} size={mediumCardSize} value={card.value} type={card.type} />
              )}
            </div>
          </div>

          <div id='preview-deck-area'>
            <div id='preview-deck-title' className='smaller shadowed-text'>YOUR DECK:</div>
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
          <div id='opponent-hand' className='player-hand-area'>
            <div id='opponent-cards' className='player-cards'>
              {this.state.opponentHand.map((card, i) =>
                <CardBack key={i} size={miniCardSize} />
              )}
            </div>
            <div className={`turn-indicator ${opponentTurn}`}></div>
          </div>
          <div id='grids'>
            <div id='opponent-area' className='player-area'>
              <div id='opponent-grid' className='deal-grid'>
                {this.state.opponentGrid.map((card, i) => {
                  return <Card key={i} size={cardSize} value={card.value} type={card.type} />;
                })}
              </div>
              <div className='stats-area'>
                <div className='total-display'>
                  <div id='opponent-total-outline' className='total-outline'>
                    <div id='opponent-total'>{this.state.opponentTotal}</div>
                  </div>
                </div>
                <div className='win-symbol-area'>
                  <div className={`win-symbol-bg ${opponentWins[0]}`}><div className={`win-symbol ${opponentWins[0]}`}></div></div>
                  <div className={`win-symbol-bg ${opponentWins[1]}`}><div className={`win-symbol ${opponentWins[1]}`}></div></div>
                  <div className={`win-symbol-bg ${opponentWins[2]}`}><div className={`win-symbol ${opponentWins[2]}`}></div></div>
                </div>
              </div>
            </div>
            <div id='user-area' className='player-area'>
              <div id='user-grid' className='deal-grid'>
                {this.state.userGrid.map((card, i) => {
                  return <Card key={i} size={cardSize} value={card.value} type={card.type} />;
                })}
              </div>
              <div className='stats-area'>
                <div className='total-display'>
                  <div id='user-total-outline' className='total-outline'>
                    <div id='user-total'>{this.state.userTotal}</div>
                  </div>
                </div>
                <div className='win-symbol-area'>
                  <div className={`win-symbol-bg ${userWins[0]}`}><div className={`win-symbol ${userWins[0]}`}></div></div>
                  <div className={`win-symbol-bg ${userWins[1]}`}><div className={`win-symbol ${userWins[1]}`}></div></div>
                  <div className={`win-symbol-bg ${userWins[2]}`}><div className={`win-symbol ${userWins[2]}`}></div></div>
                </div>
              </div>
            </div>
          </div>
          <div id='user-hand' className='player-hand-area'>
            <div id='user-cards' className='player-cards'>
              {this.state.userHand.map((card, i) => {
                return <Card key={i} id={card.id} size={cardSize} value={card.value} type={card.type}
                  onClickCard={this.handleClickCard} />;
              })}
            </div>
            <div className={`turn-indicator ${userTurn}`}></div>
          </div>
        </div>

        <Footer display={footerOn} onClickEndTurn={this.handleClickEndTurn} onClickStand={this.handleClickStand} />
      </div>
    );
  }
}

export default App;