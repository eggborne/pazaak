import React from 'react';
import Footer from './Footer';
import Header from './Header';
import IntroScreen from './IntroScreen';
import InstructionsScreen from './InstructionsScreen';
import OptionsScreen from './OptionsScreen';
import HallOfFameScreen from './HallOfFameScreen';
import DeckSelectionScreen from './DeckSelectionScreen';
import GameBoard from './GameBoard';
import HamburgerMenu from './HamburgerMenu';
import ResultModal from './ResultModal';
import { EventEmitter } from 'events';
let Util = require('../scripts/util');
import axios from 'axios';

const getScores = () =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakscores.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });

const getScoresForPlayer = (playerName) =>
  axios({
    method: 'get',
    url: 'https://www.eggborne.com/scripts/getpazaakplayer.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      playerName: playerName,
    }
  });

const saveUser = (playerName, setWins, roundWins) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/savepazaakscore.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
      setWins: setWins,
      roundWins: roundWins
    }
  });
};

const incrementSetWins = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaaksetwins.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};
const incrementRoundWins = (playerName) => {
  return axios({
    method: 'post',
    url: 'https://www.eggborne.com/scripts/updatepazaakroundwins.php',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    params: {
      user: playerName,
    }
  });
};

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};
const getCookie = (cname) => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
const checkCookie = () => {
  var playerName = getCookie('username');
  if (playerName != '') {
    console.log('Welcome again ' + playerName);
    document.getElementById('player-name-input').value = playerName;
  }
};

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
      // opponentDeck: [
      //   { id: 1, value: 1, type: 'plus' },
      //   { id: 2, value: 2, type: 'plus' },
      //   { id: 3, value: 3, type: 'plus' },
      //   { id: 4, value: 4, type: 'plus' },
      //   { id: 5, value: 5, type: 'plus' },
      //   { id: 5, value: -6, type: 'minus' },
      //   { id: 5, value: -5, type: 'minus' },
      //   { id: 6, value: -1, type: 'minus' },
      //   { id: 7, value: -2, type: 'minus' },
      //   { id: 9, value: -4, type: 'minus' },
      // ],
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
        deck: { user: [], opponent: [] },
        hand: { user: [], opponent: [] },
        grid: { user: [], opponent: [] },
        total: { user: [], opponent: [] },
        wins: { user: [], opponent: [] },
      },
      turnStatus: {
        user: { playedCards: 0, standing: false },
        opponent: { playedCards: 0, standing: false }
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

    // make the selection deck (12 dummy cards 1-6, plus and minus)...
    let cardSelection = [];
    for (let i = 1; i <= 12; i++) {
      let value = i;
      let sign = 'plus';
      if (i > 6) {
        value -= 6;
        value *= -1;
        sign = 'minus';
      }
      cardSelection.push({ id: i * 1111, value: value, type: sign });
    }
    // ...make a deck of 40, 4 each of value 1-10...
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
    // ..make a random 10-card deck for opponent...
    let opponentDeck = [];
    let selectionCopy = Util.shuffle(cardSelection.slice());
    for (let i = 0; i < 10; i++) {
      let deckCard = selectionCopy[i];
      let newCard = { id: i, value: deckCard.value, type: deckCard.type };
      opponentDeck.push(newCard);
    }
    // ...put them all in state
    this.state.opponentDeck = opponentDeck;
    this.state.idCount = 10;
    this.state.cardSelection = cardSelection;
    this.state.deck = this.shuffleDeck(deck);

    this.buttonTextColor = window.getComputedStyle(document.body).getPropertyValue('--button-text-color');
    this.buttonBgColor = window.getComputedStyle(document.body).getPropertyValue('--button-bg-color');

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
    this.handleClickStand = this.handleClickStand.bind(this);
    this.removeCardFromHand = this.removeCardFromHand.bind(this);
    this.addCardtoGrid = this.addCardtoGrid.bind(this);
    this.changeCardTotal = this.changeCardTotal.bind(this);
    this.getCardIndexById = this.getCardIndexById.bind(this);
    this.swapTurn = this.swapTurn.bind(this);
    this.changeTurn = this.changeTurn.bind(this);
    this.makeOpponentMove = this.makeOpponentMove.bind(this);
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
    checkCookie();
    this.getHighScores();

  }

  getHighScores() {
    getScores().then((response) => {
      this.setState({
        highScores: response.data
      });
    });
  }

  evaluatePlayerName(playerName) {
    getScoresForPlayer(playerName).then((response) => {
      if (response.data) {
        let playerObj = response.data[0];
        console.warn(`${playerName} FOUND! setWins ${playerObj.setWins} roundWins ${playerObj.roundWins}!`);
        let userStatusCopy = this.state.userStatus;
        userStatusCopy.loggedInAs = playerObj.playerName;
        userStatusCopy.totalSetWins = playerObj.setWins;
        userStatusCopy.totalRoundWins = playerObj.roundWins;
        this.setState({
          userStatus: userStatusCopy
        });
      } else {
        console.warn(`${playerName} NOT FOUND! Creating cookie and new entry in db!`);
        setCookie('username', playerName, 365);
        saveUser(playerName, 0, 0);
      }
    });
  }

  incrementPlayerScore(playerName, type) {
    if (type === 'setWins') {
      incrementSetWins(playerName);
    } else {
      incrementRoundWins(playerName);
    }
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
    this.changeCardTotal(player, newTotal);
    this.playSound('draw');
    this.setState({
      [`${player}Grid`]: newGridCards,
    });
  }
  handleToggleOption(event) {
    let el = event.target;
    let el2;
    if (event.target.id.slice(0, 3) === 'ham') {
      el2 = document.getElementById(event.target.id.slice(10, event.target.id.length));
    } else {
      el2 = document.getElementById(`hamburger-${event.target.id}`);
    }
    let optionsCopy = Object.assign({}, this.state.options);
    if (el.classList.contains('option-off')) {
      el.classList.remove('option-off');
      el2.classList.remove('option-off');
      el.innerHTML = 'ON';
      el2.innerHTML = 'ON';
      if (event.target.id === 'sound-fx-toggle' || event.target.id === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = true;
      }
      if (event.target.id === 'ambience-toggle' || event.target.id === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = true;
      }
      if (event.target.id === 'quick-mode-toggle' || event.target.id === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '400ms');
        optionsCopy.turnInterval = 90;
        optionsCopy.flashInterval = 3;
        optionsCopy.opponentMoveInterval = 100;
      }
      if (event.target.id === 'dark-theme-toggle' || event.target.id === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', '#050505');
        document.body.style.setProperty('--main-text-color', '#999');
        document.body.style.setProperty('--card-bg-color', '#333');
        document.body.style.setProperty('--house-card-color', '#330');
        document.body.style.setProperty('--plus-card-color', '#003');
        document.body.style.setProperty('--minus-card-color', '#300');
        document.body.style.setProperty('--card-back-color', '#555');
        document.body.style.setProperty('--card-back-bg-color', '#333');
        document.body.style.setProperty('--card-back-border-color', '#222');
        optionsCopy.darkTheme = true;
      }

    } else {
      el.classList.add('option-off');
      el2.classList.add('option-off');
      el.innerHTML = 'OFF';
      el2.innerHTML = 'OFF';
      if (event.target.id === 'sound-fx-toggle' || event.target.id === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = false;
      }
      if (event.target.id === 'ambience-toggle' || event.target.id === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = false;
      }
      if (event.target.id === 'quick-mode-toggle' || event.target.id === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '900ms');
        optionsCopy.turnInterval = 300;
        optionsCopy.flashInterval = 180;
        optionsCopy.opponentMoveInterval = 1000;
      }
      if (event.target.id === 'dark-theme-toggle' || event.target.id === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', 'rgb(107, 121, 138)');
        document.body.style.setProperty('--main-text-color', 'rgb(255, 247, 213)');
        document.body.style.setProperty('--card-bg-color', '#ccc');
        document.body.style.setProperty('--house-card-color', '#D3D300');
        document.body.style.setProperty('--plus-card-color', '#0C00B2');
        document.body.style.setProperty('--minus-card-color', '#A70003');
        document.body.style.setProperty('--card-back-color', '#ccc');
        document.body.style.setProperty('--card-back-bg-color', 'grey');
        document.body.style.setProperty('--card-back-border-color', '#444');
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
    this.changeTurn('opponent');
  }
  handleClickStand(event) {
    event.preventDefault();
    this.playSound('click');
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    turnStatusCopy.user.standing = true;
    this.setState({
      turnStatus: turnStatusCopy
    });
    this.changeTurn('opponent');
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
      if (this.state.turnStatus.opponent.standing) {
        // opponent standing
        if (this.state.userGrid.length < 9) {
          this.playHandCard('user', { id: event.target.id, value: value, type: type });
        }
      } else {
        // opponent still in play
        if (!this.state.turnStatus.user.playedCards && this.state.userGrid.length < 9) {
          this.playHandCard('user', { id: event.target.id, value: value, type: type });
        }
      }

      // Util.flash('end-turn-button', 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval/3);
      // Util.flash('end-turn-button', 'background-color', this.buttonBgColor, '#111', this.state.options.flashInterval/3);
      // let newTurn = this.swapTurn();
      // if (this.state[`${newTurn}Grid`].length < 9) {
      //   setTimeout(() => {
      //     this.makeOpponentMove(this.state.options.opponentMoveInterval);
      //     this.dealToPlayerGrid(newTurn);
      //   }, this.state.options.turnInterval);
      // }
    }
  }

  playHandCard(player, cardObject, delay) {
    setTimeout(() => {
      this.removeCardFromHand(player, cardObject.id);
      this.addCardtoGrid(player, cardObject.value, cardObject.type);
      this.changeCardTotal(player, this.state[`${player}Total`] + cardObject.value);
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      turnStatusCopy.user.playedCards = this.state.turnStatus[player].playedCards + 1;
      this.setState({
        turnStatus: turnStatusCopy
      });
    }, delay);
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
    let newWins;
    if (winner !== 'TIE') {
      newWins = this.state[`${winner}Wins`] + 1;
      if (winner === 'user') {
        if (this.state.userStatus.loggedInAs) {
          let user = this.state.userStatus.loggedInAs;
          console.warn('Saving SET win of logged in user', user);
          this.incrementPlayerScore(user, 'setWins');
          if (newWins === 3) {
            console.warn('Saving ROUND win of logged in user', user);
            this.incrementPlayerScore(user, 'roundWins');
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
      newWins = this.state[`${winner}Wins`];
      if (winner === 'opponent') {
        winner = 'CPU';
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

  makeOpponentMove(delay) {
    setTimeout(() => {
      if (this.state.turnStatus.user.standing) {
        // user standing means no limit on playedCards / drawn cards
        // see if cards can improve total
        if (this.state.opponentTotal < 20) {
          let dealInterval = this.state.options.turnInterval * 2;
          let cardsToPlay = [];
          let cardLimit = 4;
          let scoreMinimum = this.state.userTotal;
          let delay = 0;
          for (let i = 0; i < this.state.opponentHand.length; i++) {
            if (this.state.opponentHand[i].type === 'plus') {
              let card = this.state.opponentHand[i];
              let totalValuePlayed = 0;
              cardsToPlay.map((card) => {
                totalValuePlayed += card.value;
              });
              let potentialScore = this.state.opponentTotal + totalValuePlayed + card.value;
              if (((this.state.opponentTotal + totalValuePlayed) < scoreMinimum || (this.state.opponentTotal + totalValuePlayed) === scoreMinimum && Math.random() < 0.5) && this.state.turnStatus.opponent.playedCards < cardLimit && potentialScore >= scoreMinimum && potentialScore <= 20) {
                let cardToPlay = card;
                cardsToPlay.push(cardToPlay);
                this.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type }, delay);
                delay += dealInterval;
              }
            }
          }
          // now just to compare scores and declare a winner
          // wait for card timeouts!
          setTimeout(() => {
            this.determineWinnerFromTotal();
          }, (cardsToPlay.length * dealInterval));
          return;
        } else if (this.state.opponentTotal > 20) {

          // see if minus cards can get total below 20
          let dealInterval = this.state.options.turnInterval * 2;
          let cardsToPlay = [];
          let delay = 0;
          for (let i = 0; i < this.state.opponentHand.length; i++) {
            if (this.state.opponentHand[i].type === 'minus') {
              let card = this.state.opponentHand[i];
              let totalValuePlayed = 0;
              cardsToPlay.map((card) => {
                totalValuePlayed += card.value;
              });
              let currentTally = this.state.opponentTotal + totalValuePlayed;
              let potentialScore = currentTally + card.value;
              if (potentialScore <= 20) {
                let cardToPlay = card;
                cardsToPlay.push(cardToPlay);
                this.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type }, delay);
                delay += dealInterval;
              }
            }
          }
          // now just to compare scores and declare a winner
          // wait for card timeouts!
          setTimeout(() => {
            this.determineWinnerFromTotal();
          }, (cardsToPlay.length * dealInterval));
          return;
        } else {
          // is 20
          let turnStatusCopy = Object.assign({}, this.state.turnStatus);
          turnStatusCopy.opponent.standing = true;
          this.setState({
            turnStatus: turnStatusCopy
          });
        }
        // ...then, if did not reach a stand state, 'click' End Turn
        this.changeTurn('user');
      } else {
        if (this.state.opponentTotal < 20) {
          let cardLimit = 1;
          let scoreMinimum = 17;
          for (let i = 0; i < this.state.opponentHand.length; i++) {
            if (this.state.opponentHand[i].type === 'plus') {
              let card = this.state.opponentHand[i];
              let potentialScore = this.state.opponentTotal + card.value;
              if (this.state.turnStatus.opponent.playedCards < cardLimit && potentialScore >= scoreMinimum && potentialScore <= 20) {
                let cardToPlay = card;
                this.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                let turnStatusCopy = Object.assign({}, this.state.turnStatus);
                turnStatusCopy.opponent.standing = true;
                this.setState({
                  turnStatus: turnStatusCopy
                });
                break;
              }
            }
          }
        } else if (this.state.opponentTotal > 20) {
          for (let i = 0; i < this.state.opponentHand.length; i++) {
            if (this.state.opponentHand[i].type === 'minus') {
              let card = this.state.opponentHand[i];
              let potentialScore = this.state.opponentTotal + card.value;
              if (potentialScore <= 20) {
                let cardToPlay = card;
                this.playHandCard('opponent', { id: cardToPlay.id, value: cardToPlay.value, type: cardToPlay.type });
                break;
              }
            }
          }
        } else {
          // is 20
          let turnStatusCopy = Object.assign({}, this.state.turnStatus);
          turnStatusCopy.opponent.standing = true;
          this.setState({
            turnStatus: turnStatusCopy
          });
        }
        //must delay or this.state.opponentTotal is wrong in changeTurn()!
        setTimeout(() => {
          this.changeTurn('user');
        }, 150);
      }
    }, delay);
  }

  determineWinnerFromTotal() {
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
        if (this.state.opponentTotal > 20) {
          console.warn('CPU STOOD to pass turn to user with TOTAL > 20', this.state.opponentTotal);
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
            this.makeOpponentMove(this.state.options.opponentMoveInterval);
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
      idCount: (this.state.idCount + 1)
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
          standing: false
        },
        opponent: {
          playedCards: 0,
          standing: false
        }
      },
    });
    if (total) {
      this.getNewPlayerHands();
      this.setState({
        phase: 'splashScreen',
        userWins: 0,
        opponentWins: 0,
        userDeck: []
      });
    }
  }

  handleClickHamburgerOptions(event) {
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);

  }

  handleClickHamburgerQuit(event) {
    Util.flash(event.target.id, 'color', this.buttonTextColor, '#f00', this.state.options.flashInterval / 3);
    console.log('clicked quit');
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
    let footerStyle = { position: 'absolute', bottom: '-3rem' };
    let gameBoardStyle = { display: 'none' };
    let introStyle = { display: 'none' };
    let instructionsStyle = { display: 'none' };
    let optionsStyle = { display: 'none' };
    let hallOfFameStyle = { display: 'none' };
    let deckSelectStyle = { display: 'none' };
    // but shown if proper state.phase
    if (this.state.phase === 'gameStarted') {
      gameBoardStyle = { display: 'flex' };
      footerStyle = { position: 'relative', bottom: '0' };
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