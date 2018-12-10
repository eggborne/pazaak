import React from 'react';
import Header from './Header';
import Footer from './Footer';
import IntroScreen from './IntroScreen';
import InstructionsScreen from './InstructionsScreen';
import OptionsScreen from './OptionsScreen';
import HallOfFameScreen from './HallOfFameScreen';
import DeckSelectionScreen from './DeckSelectionScreen';
import GameBoard from './GameBoard';
import HamburgerMenu from './HamburgerMenu';
import ResultModal from './ResultModal';
let Util = require('../scripts/util');
let DB = require('../scripts/db');
let AI = require('../scripts/ai');

let cardSize = {};
let mediumCardSize = {};
let miniCardSize = {};
let cardHeight = (window.innerHeight / 6) * 0.825;
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
      vsCPU: true,
      playerNames: {
        user: 'Player',
        opponent: 'CPU'
      },
      phase: 'splashScreen',
      menuShowing: false,
      deck: [],
      cardSelection: [],
      idCount: 0,
      userDeck: [],
      opponentDeck: [],
      userHand: [],
      opponentHand: [],
      userGrid: [],
      opponentGrid: [],
      userTotal: 0,
      opponentTotal: 0,
      userWins: 0,
      opponentWins: 0,
      turn: 'user',
      userStatus: {
        loggedInAs: '',
        totalSetWins: 0,
        totalRoundWins: 0,
        totalSetsPlayed: 0,
        totalRoundsPlayed: 0,
        deck: { user: [], opponent: [] },
        hand: { user: [], opponent: [] },
        grid: { user: [], opponent: [] },
        total: { user: [], opponent: [] },
        wins: { user: [], opponent: [] },
      },
      turnStatus: {
        user: {
          playedCards: 0,
          highlightedCard: {
            element: null,
            obj: null
          },
          standing: false
        },
        opponent: {
          playedCards: 0,
          highlightedCard: {
            element: null,
            obj: null
          },
          standing: false
        }
      },
      resultMessage: {
        title: 'Winner',
        winner: '',
        buttonText: 'Next Round'
      },
      options: {
        sound: false,
        ambience: false,
        darkTheme: false,
        turnInterval: 300,
        flashInterval: 180,
        opponentMoveInterval: 1000,
      },
      highScores: []
    };

    // make the selection deck (12 dummy cards 1-6, plus and minus)
    let cardSelection = [];
    for (let i = 1; i <= 12; i++) {
      let value = i;
      let sign = '+';
      if (i > 6 && i < 11) {
        value -= 6;
        value *= -1;
        sign = '-';
      } else if (i >= 11) {
        value = i - 8;
        sign = '±';
      }
      cardSelection.push({ id: i * 1111, value: value, type: sign });
    }
    // make a deck of 40, 4 each of value 1-10...
    let deck = [];
    for (let i = 1; i <= 40; i++) {
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
    // make a random 10-card deck for opponent...
    let opponentDeck = [];
    let selectionCopy = Util.shuffle(cardSelection.slice());
    for (let i = 0; i < 10; i++) {
      let deckCard = selectionCopy[i];
      let newCard = { id: i, value: deckCard.value, type: deckCard.type };
      if (newCard.type === '±') {
        newCard.type = '-';
        newCard.value = Math.abs(newCard.value) * -1;
      }
      opponentDeck.push(newCard);
    }
    // ...put them all in state
    this.state.opponentDeck = opponentDeck;
    this.state.idCount = 10; // these are the 10 opponent deck cards
    this.state.cardSelection = cardSelection;
    this.state.deck = this.shuffleDeck(deck);

    // get these for easy reference when calling Util.flash()
    this.buttonTextColor = window.getComputedStyle(document.body).getPropertyValue('--button-text-color');
    this.buttonBgColor = window.getComputedStyle(document.body).getPropertyValue('--button-bg-color');

    // are all of these necessary?
    this.playSound = this.playSound.bind(this);
    this.getHighScores = this.getHighScores.bind(this);
    this.incrementPlayerScore = this.incrementPlayerScore.bind(this);
    this.evaluatePlayerName = this.evaluatePlayerName.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.getNewPlayerHands = this.getNewPlayerHands.bind(this);
    this.dealToPlayerGrid = this.dealToPlayerGrid.bind(this);
    this.handleToggleOption = this.handleToggleOption.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickHeader = this.handleClickHeader.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickHow = this.handleClickHow.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickHallOfFame = this.handleClickHallOfFame.bind(this);
    this.handleClickPlay = this.handleClickPlay.bind(this);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleClickEndTurn = this.handleClickEndTurn.bind(this);
    this.handleClickSwitchSign = this.handleClickSwitchSign.bind(this);
    this.handleClickStand = this.handleClickStand.bind(this);
    this.removeCardFromHand = this.removeCardFromHand.bind(this);
    this.addCardtoGrid = this.addCardtoGrid.bind(this);
    this.changeCardTotal = this.changeCardTotal.bind(this);
    this.getCardIndexById = this.getCardIndexById.bind(this);
    this.swapTurn = this.swapTurn.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.callResultModal = this.callResultModal.bind(this);
    this.dismissResultModal = this.dismissResultModal.bind(this);
    this.handleClickRandomize = this.handleClickRandomize.bind(this);
    this.handleClickOKButton = this.handleClickOKButton.bind(this);
    this.handleClickHamburger = this.handleClickHamburger.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.determineWinnerFromTotal = this.determineWinnerFromTotal.bind(this);
    this.handleClickHamburgerOptions = this.handleClickHamburgerOptions.bind(this);
    this.handleClickHamburgerQuit = this.handleClickHamburgerQuit.bind(this);
  }

  componentDidMount() {
    this.sizeElements();
    Util.checkCookie();
    this.getHighScores();
  }

  getHighScores() {
    DB.getScores().then((response) => {
      let scoreArray = response.data;
      if (!response.data) {
        scoreArray = [];
      }
      this.setState({
        highScores: scoreArray
      });
    });
  }

  evaluatePlayerName(playerName) {
    /**
     * Loads player data into this.state.userStatus from database if found
     * OR:
     * - sets a new cookie for user
     * - saves the new player name in DB
     */
    DB.getScoresForPlayer(playerName).then((response) => {
      let userStatusCopy = Object.assign({}, this.state.userStatus);
      if (response.data) {
        let playerObj = response.data[0];
        userStatusCopy.loggedInAs = playerObj.playerName;
        userStatusCopy.totalSetWins = playerObj.setWins;
        userStatusCopy.totalRoundWins = playerObj.roundWins;
      } else {
        userStatusCopy.loggedInAs = playerName;
        Util.setCookie('username', playerName, 365);
        DB.saveUser(playerName);
      }
      this.setState({
        userStatus: userStatusCopy
      });
    });
  }

  incrementPlayerTotalGames(playerName, type) {
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    eval(funcName)(playerName);
  }

  incrementPlayerScore(playerName, type) {
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    eval(funcName)(playerName);
  }

  sizeElements() {
    document.getElementById('container').style.height = `${window.innerHeight}px`;
    document.getElementById('user-hand').style.height = `${mediumCardSize.height * 1.1}px`;
    document.getElementById('opponent-hand').style.height = `${miniCardSize.height * 1.1}px`;
    Array.from(document.getElementsByClassName('turn-indicator')).map((el) => {
      el.style.height = el.style.width = `${cardSize.height / 2.7}px`;
    });
    Array.from(document.getElementsByClassName('deal-grid')).map((el) => {
      el.style.width = `${(cardSize.width * 4) + (cardSize.height * 0.42)}px`;
      el.style.height = `${cardSize.height * 2.2}px`;
      el.style.paddingTop = `${cardSize.height * 0.05}px`;
    });
  }

  playSound(sound) {
    if (this.state.options.sound) {
      document.getElementById(`${sound}-sound`).play();
    }
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

  getNewPlayerHands() {
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
      if (card.type === '+') {
        userPlus.push(card);
      } else {
        userMinus.push(card);
      }
    });
    newOpponentHandSlice.map((card) => {
      if (card.type === '+') {
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

    // newOpponentHand = [];

    this.setState({
      userHand: newUserHand,
      opponentHand: newOpponentHand
    });
    console.warn('hands', newUserHand, newOpponentHand);
  }

  dealToPlayerGrid(player, delay) {
    let deckCopy = this.state.deck.slice();
    let newCard = Util.shuffle(deckCopy)[0];
    setTimeout(() => {
      let newGridCards = this.state[`${player}Grid`].slice();
      newGridCards.push(newCard);
      let newTotal = 0;
      newTotal += this.state[`${player}Total`] + newCard.value;
      this.changeCardTotal(player, newTotal);
      this.playSound('draw');
      this.setState({
        [`${player}Grid`]: newGridCards,
      });
    }, delay);
    return newCard.value;
  }
  handleToggleOption(event) {
    let el = event.target;
    let el2;
    let eventId = event.target.id;
    if (eventId.slice(0, 3) === 'ham') {
      el2 = document.getElementById(eventId.slice(10, eventId.length));
    } else {
      el2 = document.getElementById(`hamburger-${eventId}`);
    }
    let optionsCopy = Object.assign({}, this.state.options);
    if (el.classList.contains('option-off')) {
      el.classList.remove('option-off');
      el2.classList.remove('option-off');
      el.innerHTML = 'ON';
      el2.innerHTML = 'ON';
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = true;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = true;
      }
      if (eventId === 'quick-mode-toggle' || eventId === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '400ms');
        optionsCopy.turnInterval = 90;
        optionsCopy.flashInterval = 3;
        optionsCopy.opponentMoveInterval = 100;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', '#050505');
        document.body.style.setProperty('--main-text-color', '#999');
        document.body.style.setProperty('--card-bg-color', '#333');
        document.body.style.setProperty('--house-card-color', '#330');
        document.body.style.setProperty('--plus-card-color', '#003');
        document.body.style.setProperty('--minus-card-color', '#300');
        document.body.style.setProperty('--card-back-color', '#555');
        document.body.style.setProperty('--card-back-bg-color', '#333');
        document.body.style.setProperty('--card-back-border-color', '#222');
        document.body.style.setProperty('--modal-shadow-color', 'black');
        optionsCopy.darkTheme = true;
      }

    } else {
      el.classList.add('option-off');
      el2.classList.add('option-off');
      el.innerHTML = 'OFF';
      el2.innerHTML = 'OFF';
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = false;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = false;
      }
      if (eventId === 'quick-mode-toggle' || eventId === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '900ms');
        optionsCopy.turnInterval = 300;
        optionsCopy.flashInterval = 180;
        optionsCopy.opponentMoveInterval = 1000;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', 'rgb(107, 121, 138)');
        document.body.style.setProperty('--main-text-color', 'rgb(255, 247, 213)');
        document.body.style.setProperty('--card-bg-color', '#ccc');
        document.body.style.setProperty('--house-card-color', '#D3D300');
        document.body.style.setProperty('--plus-card-color', '#0C00B2');
        document.body.style.setProperty('--minus-card-color', '#A70003');
        document.body.style.setProperty('--card-back-color', '#ccc');
        document.body.style.setProperty('--card-back-bg-color', 'grey');
        document.body.style.setProperty('--card-back-border-color', '#444');
        document.body.style.setProperty('--modal-shadow-color', 'rgb(46, 46, 46)');

        optionsCopy.darkTheme = false;
      }
    }
    this.setState({
      options: optionsCopy
    });
  }
  handleClickHeader() {
    this.setState({
      phase: 'splashScreen'
    });
  }
  handleClickStart(event) {
    event.preventDefault();
    this.playSound('click');
    let playerName = document.getElementById('player-name-input').value;
    if (!playerName.length) {
      playerName = 'Player';
    } else {
      this.evaluatePlayerName(playerName);
    }
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    document.getElementById('deck-select-footer').style.transform = 'translateY(0%)';
    let namesCopy = this.state.playerNames;
    namesCopy.user = playerName;
    setTimeout(() => {
      this.setState({
        playerNames: namesCopy,
        phase: 'selectingDeck'
      });
    }, this.state.options.flashInterval);
  }
  handleClickSwitchSign(event) {
    event.preventDefault();
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    let displaySign = turnStatusCopy.user.highlightedCard.element.children[0].innerHTML[0];
    if (displaySign === '±' || displaySign === '-') {
      turnStatusCopy.user.highlightedCard.obj.value = Math.abs(turnStatusCopy.user.highlightedCard.obj.value);
    } else if (displaySign === '+') {
      turnStatusCopy.user.highlightedCard.obj.value = Math.abs(turnStatusCopy.user.highlightedCard.obj.value) * -1;
    }
    let displayValue = turnStatusCopy.user.highlightedCard.obj.value;
    if (displayValue > 0) {
      displayValue = `+${displayValue.toString()}`;
    }
    turnStatusCopy.user.highlightedCard.element.children[0].innerHTML = displayValue;
    this.setState({
      turnStatus: turnStatusCopy
    });
  }
  handleClickPlay(event) {
    event.preventDefault();
    this.playSound('click');
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    this.getNewPlayerHands();
    document.getElementById('deck-select-footer').style.transform = 'transform: translateY(100%)';
    setTimeout(() => {
      setTimeout(() => {
        this.dealToPlayerGrid(this.state.turn);
      }, this.state.options.turnInterval);
      this.setState({
        phase: 'gameStarted'
      });
    }, this.state.options.flashInterval);
  }
  handleClickBack(event) {
    event.preventDefault();
    this.playSound('click');
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    setTimeout(() => {
      this.setState({
        phase: 'splashScreen'
      });
    }, this.state.options.flashInterval);
  }
  handleClickHow(event) {
    this.playSound('click');
    // window.open('https://starwars.wikia.com/wiki/Pazaak/Legends', '_blank');
    event.preventDefault();
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    setTimeout(() => {
      this.setState({
        phase: 'showingInstructions'
      });
    }, this.state.options.flashInterval);
  }
  handleClickOptions(event) {
    event.preventDefault();
    this.playSound('click');
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    setTimeout(() => {
      this.setState({
        phase: 'showingOptions'
      });
    }, this.state.options.flashInterval);
  }
  handleClickHallOfFame(event) {
    event.preventDefault();
    this.playSound('click');
    Util.flash(event.target.id, 'color', 'rgb(255, 255, 163)', '#f00', this.state.options.flashInterval / 3);
    this.getHighScores();
    setTimeout(() => {
      this.setState({
        phase: 'showingHallOfFame'
      });
    }, this.state.options.flashInterval);
  }
  handleClickEndTurn(event) {
    event.preventDefault();
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    this.playSound('click');
    let buttonText = document.getElementById('end-turn-button').innerHTML;
    if (buttonText === 'End Turn') {
      if (!this.state.turnStatus.opponent.standing) {
        this.changeTurn('opponent');
      }
    } else if (buttonText === 'Draw') {
      // can continuously draw cards, or play ONE hand card
      if (this.state.userGrid.length < 9) {
        if (this.state.userGrid.length === 8) {
          document.getElementById('end-turn-button').innerHTML = 'End Turn';
        }
        this.dealToPlayerGrid('user');
      }
    } else if (buttonText === 'Play Card') {
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      let handCardElement = this.state.turnStatus.user.highlightedCard.element;
      let handCardObj = turnStatusCopy.user.highlightedCard.obj;
      this.playHandCard('user', handCardObj);
      this.state.turnStatus.user.highlightedCard.element.classList.remove('highlighted-card');
      turnStatusCopy.user.highlightedCard.element = null;
      turnStatusCopy.user.highlightedCard.obj = null;
      this.setState({
        turnStatus: turnStatusCopy
      });
      if (!this.state.turnStatus.opponent.standing) {
        document.getElementById('end-turn-button').innerHTML = 'End Turn';
      } else {
        document.getElementById('end-turn-button').innerHTML = 'Draw';
      }
      document.getElementById('stand-button').innerHTML = 'Stand';
    }
  }
  handleClickStand(event) {
    event.preventDefault();
    this.playSound('click');
    let buttonText = document.getElementById('stand-button').innerHTML;
    if (buttonText === 'Stand') {
      Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      turnStatusCopy.user.standing = true;
      this.setState({
        turnStatus: turnStatusCopy
      });
      this.changeTurn('opponent');
    } else if (buttonText === 'Cancel') {
      this.state.turnStatus.user.highlightedCard.element.classList.remove('highlighted-card');
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      turnStatusCopy.user.highlightedCard.element = null;
      turnStatusCopy.user.highlightedCard.obj = null;
      this.setState({
        turnStatus: turnStatusCopy
      });
      document.getElementById('switch-sign-button').classList.add('hidden-button');
      document.getElementById('end-turn-button').innerHTML = 'End Turn';
      document.getElementById('stand-button').innerHTML = 'Stand';
    }
  }
  handleClickCard(event, value, type) {
    event.preventDefault();

    // SELECTING DECK

    if (this.state.phase === 'selectingDeck') {
      if (event.target.id.toString().length > 8) {
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
      // highlight card and change footer buttons
      if (!this.state.turnStatus.user.playedCards && this.state.userGrid.length < 9) {
        // no card played and room on grid for a card
        if (!event.target.classList.contains('highlighted-card')) {
          // card clicked is not highlighted
          event.target.classList.add('highlighted-card');
          // unhighlight currently highlighted card, if it exists
          if (this.state.turnStatus.user.highlightedCard.element) {
            this.state.turnStatus.user.highlightedCard.element.classList.remove('highlighted-card');
          }
          // add highlighted card to state
          let turnStatusCopy = Object.assign({}, this.state.turnStatus);
          turnStatusCopy.user.highlightedCard.element = event.target;
          turnStatusCopy.user.highlightedCard.obj = { id: event.target.id, value: value, type: type };
          this.setState({
            turnStatus: turnStatusCopy
          });
          // show the switch sign button...
          document.getElementById('switch-sign-button').classList.remove('hidden-button');
          let cardObj = this.state.userHand[this.getCardIndexById(this.state.userHand, event.target.id)];
          // ... but only enable it if the card is a plus-minus
          if (cardObj.type === '±') {
            document.getElementById('switch-sign-button').classList.remove('disabled-button');
          } else {
            document.getElementById('switch-sign-button').classList.add('disabled-button');
          }
          // change the button texts
          document.getElementById('stand-button').innerHTML = 'Cancel';
          document.getElementById('end-turn-button').innerHTML = 'Play Card';
        } else {
          // card clicked was already highlighted
          event.target.classList.remove('highlighted-card');
          let turnStatusCopy = Object.assign({}, this.state.turnStatus);
          turnStatusCopy.user.highlightedCard.element = null;
          turnStatusCopy.user.highlightedCard.obj = null;
          this.setState({
            turnStatus: turnStatusCopy
          });
          document.getElementById('switch-sign-button').classList.add('hidden-button');
          document.getElementById('end-turn-button').innerHTML = 'End Turn';
          document.getElementById('stand-button').innerHTML = 'Stand';
        }
      }
    }
  }
  playHandCard(player, cardObject, delay) {
    setTimeout(() => {
      this.removeCardFromHand(player, cardObject.id);
      this.addCardtoGrid(player, cardObject.value, cardObject.type);
      this.changeCardTotal(player, this.state[`${player}Total`] + cardObject.value);
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      turnStatusCopy.user.playedCards = this.state.turnStatus[player].playedCards + 1;
      turnStatusCopy.user.highlightedCard.element = null;
      turnStatusCopy.user.highlightedCard.obj = null;
      this.setState({
        turnStatus: turnStatusCopy
      });
      document.getElementById('switch-sign-button').classList.add('hidden-button');
      if (!this.state.turnStatus.opponent.standing) {
        document.getElementById('end-turn-button').innerHTML = 'End Turn';
      } else {
        document.getElementById('end-turn-button').innerHTML = 'Draw';
      }
      document.getElementById('stand-button').innerHTML = 'Stand';
    }, delay);
  }

  removeCardFromHand(player, cardId) {
    let handCopy = this.state[`${player}Hand`].slice();
    let indexToRemove = this.getCardIndexById(handCopy, cardId);
    handCopy.splice(indexToRemove, 1);
    this.setState({
      [`${player}Hand`]: handCopy
    });
  }
  addCardtoGrid(player, value, type) {
    let gridCopy = this.state[`${player}Grid`].slice();
    if (type === '±') {
      if (value > 0) {
        value = `+${value.toString()}`;
      }
    }
    let newCard = { value: value, type: type };
    gridCopy.push(newCard);
    this.setState({
      [`${player}Grid`]: gridCopy
    });
  }
  changeCardTotal(player, newTotal) {
    if (newTotal === 20) {
      document.getElementById(`${player}-total`).classList.add('green-total');
    } else if (newTotal > 20) {
      document.getElementById(`${player}-total`).classList.add('red-total');
    } else {
      document.getElementById(`${player}-total`).classList.remove('red-total');
      document.getElementById(`${player}-total`).classList.remove('green-total');
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
  declareWinner(winner, delay) {
    if (winner !== 'TIE') {
      let newWins = this.state[`${winner}Wins`] + 1;
      if (this.state.playerNames.user !== 'Player' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
        if (winner === 'user') {
          this.incrementPlayerScore(playerName, 'setWins');
          if (newWins === 3) {
            this.incrementPlayerScore(playerName, 'roundWins');
            this.incrementPlayerTotalGames(playerName, 'rounds');
          }
        } else {
          if (newWins === 3) {
            this.incrementPlayerTotalGames(playerName, 'rounds');
          }
        }
      }
      this.setState({
        turn: null,
        [`${winner}Wins`]: newWins
      });
      setTimeout(() => {
        document.getElementById('game-board').style.opacity = 0.3;
        this.callResultModal(winner);
      }, delay);
    } else {
      // TIE
      if (this.state.playerNames.user !== 'Player' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
      }
      this.setState({
        turn: null,
      });
      setTimeout(() => {
        document.getElementById('game-board').style.opacity = 0.3;
        this.callResultModal('tie');
      }, delay);
    }

  }
  swapTurn() {
    let newTurn;
    if (this.state.turn === 'user') {
      newTurn = 'opponent';
      setTimeout(() => {
        Array.from(document.getElementsByClassName('move-button')).map((el, i) => {
          el.classList.add('disabled-button');
        });
      }, this.state.options.flashInterval);
    } else {
      newTurn = 'user';
      Array.from(document.getElementsByClassName('move-button')).map((el, i) => {
        el.classList.remove('disabled-button');
      });
    }
    this.setState({
      turn: newTurn
    });
    this.playSound('turn');
    return newTurn;
  }

  determineWinnerFromTotal() {
    console.error(`app.determineWinnerFromTotal is comparing userTotal ${this.state.userTotal} - opponentTotal ${this.state.opponentTotal}`);
    let winner;
    if (this.state.userTotal > this.state.opponentTotal) {
      if (this.state.userTotal <= 20) {
        winner = 'user';
      } else {
        winner = 'opponent';
      }
      this.declareWinner(winner, this.state.options.turnInterval);
    } else if (this.state.userTotal < this.state.opponentTotal) {
      if (this.state.opponentTotal <= 20) {
        winner = 'opponent';
      } else {
        winner = 'user';
      }
      this.declareWinner(winner, this.state.options.turnInterval);
    } else {
      this.declareWinner('TIE', this.state.options.turnInterval);
    }
  }
  changeTurn(newPlayer) {
    if (newPlayer === 'user') {
      if (this.state.turnStatus.opponent.standing) {
        // see if opponent has losing score
        if (this.state.opponentTotal > 20 || this.state.turnStatus.user.standing) {
          this.declareWinner('user', this.state.options.turnInterval);
        } else {
          this.playSound('click');
          let newTurn = this.swapTurn();
          setTimeout(() => {
            this.dealToPlayerGrid(newTurn);
          }, this.state.options.turnInterval);
        }
      } else {
        // see if opponent has losing score
        if (this.state.opponentTotal > 20) {
          this.declareWinner('user', this.state.options.turnInterval);
        } else {
          // if not, deal card to user
          this.playSound('click');
          setTimeout(() => {
            let newTurn = this.swapTurn();
            setTimeout(() => {
              this.dealToPlayerGrid(newTurn);
            }, this.state.options.turnInterval);
          }, this.state.options.turnInterval);
        }
      }
    } else {
      // changing to opponent
      if (this.state.userTotal > 20) {
        // user clicked Stand with losing total
        this.declareWinner('opponent', this.state.options.turnInterval);
      } else {
        if (!this.state.turnStatus.opponent.standing) {
          let newTurn = this.swapTurn();
          setTimeout(() => {
            if (this.state[`${newTurn}Grid`].length < 9) {
              this.dealToPlayerGrid(newTurn);
            }
            if (this.state.vsCPU) {
              // this.makeOpponentMove();
              AI.makeOpponentMove(this);
            }
          }, this.state.options.turnInterval);
        } else {
          this.determineWinnerFromTotal();
        }
      }
    }
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    turnStatusCopy.user.playedCards = 0;
    turnStatusCopy.opponent.playedCards = 0;
    this.setState({
      turnStatus: turnStatusCopy
    });
  }
  callResultModal(winner) {
    let bgColor = 'var(--red-bg-color)';
    let title;
    let winnerDisplay = winner;
    let buttonText = 'Next Set';
    if (winner === 'user') {
      this.playSound('win');
      title = 'YOU WIN';
      bgColor = 'green';
    } else if (winner === 'opponent') {
      this.playSound('lose');
      title = 'YOU LOSE';
    } else {
      title = 'It\'s a tie';
      bgColor = 'var(--main-bg-color)';
    }
    if (this.state.userWins === 3 || this.state.opponentWins === 3) {
      bgColor = 'var(--house-card-color)';
      title = 'ROUND\nWINNER';
      winnerDisplay = this.state.playerNames[winner];
      buttonText = 'New Round';
    }
    let modal = document.getElementById('result-modal');
    modal.style.backgroundColor = bgColor;
    this.setState({
      resultMessage: {
        title: title,
        winner: winnerDisplay,
        buttonText: buttonText
      }
    });
    modal.classList.add('onscreen');
  }
  dismissResultModal() {
    let modal = document.getElementById('result-modal');
    modal.classList.remove('onscreen');
  }
  handleClickRandomize(event) {
    event.preventDefault();
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    let selectionCopy = Util.shuffle(this.state.cardSelection.slice());
    let userDeckCopy = [];
    for (let i = 0; i < 10; i++) {
      let deckCard = selectionCopy[i];
      let newCard = { id: this.state.idCount + (i + 1), value: deckCard.value, type: deckCard.type };
      userDeckCopy.push(newCard);
    }
    this.setState({
      userDeck: userDeckCopy,
      idCount: (this.state.idCount + 11)
    });
    document.getElementById('play-button').classList.remove('disabled-button');
  }
  handleClickOKButton(event) {
    event.preventDefault();
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    document.getElementById('game-board').style.opacity = 1;
    if (this.state.userWins === 3 || this.state.opponentWins === 3) {
      this.getNewPlayerHands();
      this.setState({
        userWins: 0,
        opponentWins: 0,
      });
    }
    this.setState({
      userGrid: [],
      opponentGrid: [],
    });
    setTimeout(() => {
      this.setState({
        turn: 'user'
      });
      this.dismissResultModal();
      this.resetBoard('user');
      setTimeout(() => {
        this.dealToPlayerGrid(this.state.turn);
      }, this.state.options.turnInterval);
    }, this.state.options.flashInterval);
  }
  toggleHamburgerAppearance() {
    let topBar = document.getElementById('top-hamburger-bar');
    let bottomBar = document.getElementById('bottom-hamburger-bar');
    if (this.state.menuShowing) {
      topBar.style.transform = 'none';
      bottomBar.style.transform = 'none';
    } else {
      topBar.style.transform = 'rotate(29deg) scaleX(0.675) translateX(55%) translateY(-215%)';
      bottomBar.style.transform = 'rotate(-29deg) scaleX(0.675) translateX(55%) translateY(215%)';
    }
  }
  handleClickHamburger() {
    this.toggleHamburgerAppearance();
    if (!this.state.menuShowing) {
      document.getElementById('hamburger-menu').classList.add('hamburger-on');
    } else {
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');
    }
    this.setState({
      menuShowing: !this.state.menuShowing
    });
  }
  resetBoard(newTurn, total) {
    document.getElementById('user-total').classList.remove('red-total');
    document.getElementById('user-total').classList.remove('green-total');
    document.getElementById('opponent-total').classList.remove('red-total');
    document.getElementById('opponent-total').classList.remove('green-total');
    document.getElementById('end-turn-button').classList.remove('disabled-button');
    document.getElementById('stand-button').classList.remove('disabled-button');
    // this.getNewPlayerHands();
    this.setState({
      userGrid: [],
      opponentGrid: [],
      userTotal: 0,
      opponentTotal: 0,
      turn: newTurn,
      turnStatus: {
        user: {
          playedCards: 0,
          standing: false,
          highlightedCard: {
            element: null,
            obj: null
          }
        },
        opponent: {
          playedCards: 0,
          standing: false,
          highlightedCard: {
            element: null,
            obj: null
          }
        }
      },
    });
    if (total) {
      // only disable if clearing player deck
      // document.getElementById('play-button').classList.add('disabled-button');
      this.getNewPlayerHands();
      this.setState({
        phase: 'splashScreen',
        userWins: 0,
        opponentWins: 0,
        // must disable button if this is reset
        // userDeck: []
      });
    }
  }
  handleClickHamburgerOptions(event) {
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);

  }
  handleClickHamburgerQuit(event) {
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    this.setState({
      menuShowing: false
    });
    this.toggleHamburgerAppearance();
    setTimeout(() => {
      this.resetBoard('user', true);
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');
    }, this.state.options.flashInterval);
  }
  render() {
    let roundOver = (this.state.userWins === 3 || this.state.opponentWins === 3);
    // default styles are hidden...
    let footerStyle = { pointerEvents: 'none', opacity: 0, position: 'absolute', bottom: '-3rem' };
    let gameBoardStyle = { display: 'none' };
    let introStyle = { display: 'none' };
    let instructionsStyle = { display: 'none' };
    let optionsStyle = { display: 'none' };
    let hallOfFameStyle = { display: 'none' };
    let deckSelectStyle = { display: 'none' };
    // but shown if proper state.phase
    if (this.state.phase === 'gameStarted') {
      gameBoardStyle = { display: 'flex' };
      footerStyle = { pointerEvents: 'all', opacity: 1, position: 'relative', bottom: '0' };
    } else if (this.state.phase === 'selectingDeck') {
      deckSelectStyle = { display: 'flex' };
    } else if (this.state.phase === 'showingOptions') {
      optionsStyle = { display: 'flex' };
    } else if (this.state.phase === 'showingHallOfFame') {
      hallOfFameStyle = { display: 'flex' };
    } else if (this.state.phase === 'showingInstructions') {
      instructionsStyle = { display: 'flex' };
    } else if (this.state.phase === 'splashScreen') {
      introStyle = { display: 'flex' };
    }
    return (
      <div id='container'>
        <Header onClickHeader={this.handleClickHeader} />
        <IntroScreen style={introStyle}
          onClickStart={this.handleClickStart}
          onClickHow={this.handleClickHow}
          onClickOptions={this.handleClickOptions}
          onClickHallOfFame={this.handleClickHallOfFame}
        />
        <InstructionsScreen style={instructionsStyle}
          onClickBack={this.handleClickBack} />
        <OptionsScreen style={optionsStyle}
          onToggleOption={this.handleToggleOption}
          onClickBack={this.handleClickBack} />
        <HallOfFameScreen style={hallOfFameStyle}
          highScores={this.state.highScores}
          onClickBack={this.handleClickBack} />
        <DeckSelectionScreen style={deckSelectStyle}
          cardSelection={this.state.cardSelection}
          userDeck={this.state.userDeck}
          onClickRandomize={this.handleClickRandomize}
          onClickPlay={this.handleClickPlay}
          onClickCard={this.handleClickCard}
          cardSize={cardSize}
          mediumCardSize={mediumCardSize} />
        <GameBoard style={gameBoardStyle}
          hands={{ user: this.state.userHand, opponent: this.state.opponentHand }}
          grids={{ user: this.state.userGrid, opponent: this.state.opponentGrid }}
          totals={{ user: this.state.userTotal, opponent: this.state.opponentTotal }}
          wins={{ user: this.state.userWins, opponent: this.state.opponentWins }}
          turn={this.state.turn}
          turnStatus={this.state.turnStatus}
          cardSize={cardSize}
          mediumCardSize={mediumCardSize}
          miniCardSize={miniCardSize}
          onClickCard={this.handleClickCard} />
        <Footer style={footerStyle}
          onClickEndTurn={this.handleClickEndTurn}
          onClickStand={this.handleClickStand}
          onClickHamburger={this.handleClickHamburger}
          onClickSwitchSign={this.handleClickSwitchSign}
        />
        <HamburgerMenu onClickHamburgerOptions={this.handleClickHamburgerOptions}
          onClickHamburgerQuit={this.handleClickHamburgerQuit}
          onToggleOption={this.handleToggleOption} />
        <ResultModal onClickOKButton={this.handleClickOKButton}
          titleText={this.state.resultMessage.title}
          playerNames={this.state.playerNames}
          winner={this.state.resultMessage.winner}
          roundOver={roundOver}
          finalScores={{ user: this.state.userTotal, opponent: this.state.opponentTotal }}
          buttonText={this.state.resultMessage.buttonText} />
      </div>
    );
  }
}

export default App;