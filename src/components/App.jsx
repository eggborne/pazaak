import React from 'react';
import Header from './Header';
import ControlFooter from './ControlFooter';

import IntroScreen from './IntroScreen';
import InstructionsScreen from './InstructionsScreen';
import OptionsScreen from './OptionsScreen';
import HallOfFameScreen from './HallOfFameScreen';
import DeckSelectScreen from './DeckSelectScreen';
import GameBoard from './GameBoard';
import HamburgerMenu from './HamburgerMenu';
import ResultModal from './ResultModal';
import OpponentSelectScreen from './OpponentSelectScreen';
let Util = require('../scripts/util');
let DB = require('../scripts/db');
let AI = require('../scripts/ai');
let characters = require('../scripts/characters');

let initialSize = {
  width: window.innerWidth,
  height: window.innerHeight
};
let portraitMode = false;
if (window.innerWidth < window.innerHeight) {
  portraitMode = true;
}
let portraitSources = {
  user: 'https://pazaak.online/assets/images/avatarsheet.jpg',
  opponent: 'https://pazaak.online/assets/images/opponentssheet.jpg'
}
const plusMinusSymbol = '±';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.state.cardSizes = Util.getCardSizes();
    this.characters = characters.characters;
    this.state = {
      vsCPU: true,
      CPUOpponent: 'jarjarbinks',
      lastWinner: null,
      lastFirstTurn: 'user',
      playerNames: {
        user: 'Player',
        opponent: 'Jar Jar Binks'
      },
      phase: 'splashScreen',
      deck: [],
      cardSelection: [
        { id: 1111, value: 1, type: '+' },
        { id: 2222, value: 1, type: '+' },
        { id: 3333, value: 2, type: '+' },
        { id: 4444, value: 2, type: '+' },
        { id: 5555, value: 3, type: '+' },
        { id: 6666, value: 3, type: '+' },
        { id: 7777, value: -1, type: '-' },
        { id: 8888, value: -1, type: '-' },
        { id: 9999, value: -2, type: '-' },
        { id: 1112, value: -2, type: '-' },
        { id: 1113, value: -3, type: '-' },
        { id: 1114, value: -3, type: '-' },
        { id: 1115, value: 1, type: plusMinusSymbol },
        { id: 1115, value: 2, type: plusMinusSymbol },
        { id: 1116, value: 3, type: plusMinusSymbol },
        { id: 1117, value: 4, type: plusMinusSymbol },
        { id: 1118, value: 5, type: plusMinusSymbol },
        { id: 1119, value: 6, type: plusMinusSymbol }
      ],
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
        avatarIndex: 0,
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
        flashInterval: 90,
        opponentMoveWaitTime: 1600,
        moveIndicatorTime: 900,
        dealWaitTime: 600,
      },
      cardSizes: Util.getCardSizes(),
      inputHasFocus: true,
      keyboardShowing: false,
      highScores: this.getHighScores()
    };

    // this.highScores = [];

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

    // ...put them all in state
    this.state.idCount = 10; // these are the 10 opponent deck cards
    this.state.deck = this.shuffleDeck(deck);

    // are all of these necessary?
    this.playSound = this.playSound.bind(this);
    this.getHighScores = this.getHighScores.bind(this);
    this.incrementPlayerScore = this.incrementPlayerScore.bind(this);
    this.evaluatePlayerName = this.evaluatePlayerName.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.getNewPlayerHands = this.getNewPlayerHands.bind(this);
    this.dealToPlayerGrid = this.dealToPlayerGrid.bind(this);
    this.handleToggleOption = this.handleToggleOption.bind(this);
    this.handleClickAvatar = this.handleClickAvatar.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickHow = this.handleClickHow.bind(this);
    this.handleClickOptions = this.handleClickOptions.bind(this);
    this.handleClickHallOfFame = this.handleClickHallOfFame.bind(this);
    this.handleClickOpponentPanel = this.handleClickOpponentPanel.bind(this);
    this.handleClickOpponentReady = this.handleClickOpponentReady.bind(this);
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
    this.handleClickHamburgerQuit = this.handleClickHamburgerQuit.bind(this);
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
  }

  componentDidMount() {
    let startTime = window.performance.now();
    Util.checkCookie();
    Util.sizeElements(this, true);
    this.getHighScores();

    window.addEventListener('fullscreenchange', this.handleFullscreenChange);
    window.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('msfullscreenchange', this.handleFullscreenChange);
    if (portraitMode) {
      document.getElementById('player-name-input').onfocus = () => {
        document.getElementById('intro-screen').style.justifyContent = 'flex-start';
        document.getElementById('intro-screen').style.marginTop = '4rem';
      }
      document.getElementById('player-name-input').onblur = () => {
        document.getElementById('intro-screen').style.justifyContent = 'center';
        document.getElementById('intro-screen').style.marginTop = '0';
      }
    }

    let endTime = window.performance.now();
    console.error('componentDidMount activities done in', (endTime - startTime));

  }
  handleFullscreenChange() {
    setTimeout(() => {
      let newSizes = Util.getCardSizes();
      let isFull = Util.isFullScreen() !== undefined;
      let cardHeightDiff = newSizes.cardSize.height - this.state.cardSizes.cardSize.height;
      let fullHeightDiff = initialSize.height - window.innerHeight;
      let readyToResizeContents = (isFull && fullHeightDiff < 0 && cardHeightDiff) || (!isFull && fullHeightDiff > 0 && cardHeightDiff);
      initialSize = { width: window.innerWidth, height: window.innerHeight };
      if (readyToResizeContents) {
        newSizes = Util.getCardSizes();
        this.setState({
          cardSizes: newSizes
        }, () => {
          Util.sizeElements(this);
          document.getElementById('container').style.backgroundColor = 'green';
        });
      } else {
        // try again in another 500ms

        setTimeout(() => {
          newSizes = Util.getCardSizes();
          isFull = Util.isFullScreen() !== undefined;
          cardHeightDiff = newSizes.cardSize.height - this.state.cardSizes.cardSize.height;
          fullHeightDiff = initialSize.height - window.innerHeight;
          readyToResizeContents = (isFull && fullHeightDiff < 0 && cardHeightDiff) || (!isFull && fullHeightDiff > 0 && cardHeightDiff);
          initialSize = { width: window.innerWidth, height: window.innerHeight };
          if (readyToResizeContents) {
            newSizes = Util.getCardSizes();
            this.setState({
              cardSizes: newSizes
            }, () => {
              Util.sizeElements(this);
              document.getElementById('container').style.backgroundColor = 'yellow';
            });
          } else {
            setTimeout(() => {
              newSizes = Util.getCardSizes();
              this.setState({
                cardSizes: newSizes
              }, () => {
                Util.sizeElements(this);
                document.getElementById('container').style.backgroundColor = 'red';
              });
              initialSize = { width: window.innerWidth, height: window.innerHeight };
            }, 1000);
          }
        }, 500);
      }
    }, 500);
    setTimeout(() => {
      document.getElementById('container').style.backgroundColor = 'var(--main-bg-color)';
    }, 3000);
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
      // this.highScores = scoreArray;
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
    if (!opponentDeckCopy.length) {
      opponentDeckCopy = this.characters.jarjarbinks.deck;
    }
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
  }

  dealToPlayerGrid(player) {
    this.playSound('draw');
    console.warn(`DEALING to ${player}`);
    let deckCopy = this.state.deck.slice();
    let newCard = Util.shuffle(deckCopy)[0];
    let newGridCards = this.state[`${player}Grid`].slice();
    newGridCards.push(newCard);
    let newTotal = 0;
    newTotal += this.state[`${player}Total`] + newCard.value;
    this.changeCardTotal(player, newTotal);
    this.setState({
      [`${player}Grid`]: newGridCards,
    });
    return newCard.value;
  }
  handleToggleOption(event) {
    let changeState = true;
    let el = event.target;
    let eventId = event.target.id;
    let optionsCopy = Object.assign({}, this.state.options);
    if (el.classList.contains('option-off')) {
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = true;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = true;
      }
      if (eventId === 'quick-mode-toggle' || eventId === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '500ms');
        optionsCopy.turnInterval = 200;
        optionsCopy.opponentMoveWaitTime = 300;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', '#050505');
        document.body.style.setProperty('--main-text-color', '#dfdfff');
        document.body.style.setProperty('--name-input-color', '#112');
        document.body.style.setProperty('--name-input-text-color', '#aaa');
        document.body.style.setProperty('--button-bg-color', '#060606');
        document.body.style.setProperty('--special-button-text-color', '#529e4b');
        document.body.style.setProperty('--button-text-color', '#995');
        document.body.style.setProperty('--card-spot-bg-color', 'rgba(0, 0, 0, 0.125)');
        document.body.style.setProperty('--card-spot-border-color', 'rgba(100, 100, 100, 0.25)');
        document.body.style.setProperty('--red-bg-color', '#340000');
        document.body.style.setProperty('--dark-red-border-color', '#180000');
        optionsCopy.darkTheme = true;
      }
      if (eventId === 'full-screen-toggle' || eventId === 'hamburger-full-screen-toggle') {
        el.classList.add('disabled-button');
        Util.toggleFullScreen();
        changeState = false;
      }

    } else {
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = false;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = false;
      }
      if (eventId === 'quick-mode-toggle' || eventId === 'hamburger-quick-mode-toggle') {
        document.body.style.setProperty('--pulse-speed', '900ms');
        optionsCopy.turnInterval = 800;
        optionsCopy.opponentMoveWaitTime = 1600;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {
        document.body.style.setProperty('--main-bg-color', 'rgb(107, 121, 138)');
        document.body.style.setProperty('--main-text-color', 'rgb(255, 247, 213)');
        document.body.style.setProperty('--name-input-color', '#ccc');
        document.body.style.setProperty('--name-input-text-color', 'black');
        document.body.style.setProperty('--button-bg-color', 'black');
        document.body.style.setProperty('--special-button-text-color', '#ffffa3');
        document.body.style.setProperty('--button-text-color', '#5CB3FF');
        document.body.style.setProperty('--card-spot-bg-color', 'rgba(0, 0, 0, 0.05)');
        document.body.style.setProperty('--card-spot-border-color', '#999');
        document.body.style.setProperty('--red-bg-color', '#560000');
        document.body.style.setProperty('--dark-red-border-color', '#380000');
        optionsCopy.darkTheme = false;
      }
      if (eventId === 'full-screen-toggle' || eventId === 'hamburger-full-screen-toggle') {
        el.classList.add('disabled-button');
        Util.toggleFullScreen();
        changeState = false;
      }
    }
    if (changeState) {
      this.setState({
        options: optionsCopy
      });
    }
  }
  handleClickStart(event) {
    event.preventDefault();
    // this.playSound('click');
    let playerName = document.getElementById('player-name-input').value;
    if (!playerName.length) {
      playerName = 'Player';
    } else {
      this.evaluatePlayerName(playerName);
    }
    let namesCopy = this.state.playerNames;
    namesCopy.user = playerName;
    setTimeout(() => {
      this.setState({
        playerNames: namesCopy,
        phase: 'selectingOpponent'
      });
    }, 0);
  }
  handleClickSwitchSign(event) {
    event.preventDefault();
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    let displaySign = turnStatusCopy.user.highlightedCard.element.children[0].innerHTML[0];
    if (displaySign === plusMinusSymbol || displaySign === '-') {
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
  handleClickOpponentReady(event) {
    event.preventDefault();
    this.setState({
      phase: 'selectingDeck'
    });
  }
  handleClickPlay(event) {
    // this.playSound('click');
    event.preventDefault();
    this.getNewPlayerHands();
    document.getElementById('deck-select-footer').style.transform = 'transform: translateY(100%)';
    this.setState((state, props) => {
      return { phase: 'gameStarted' };
    });
    setTimeout(() => {
      this.dealToPlayerGrid(this.state.turn);
    }, this.state.options.turnInterval)
  }
  handleClickBack(event, newPhase) {
    // this.playSound('click');
    event.preventDefault();
    setTimeout(() => {
      this.setState({
        phase: newPhase
      });
    }, this.state.options.flashInterval);
  }
  handleClickHow(event) {
    // this.playSound('click');
    // window.open('https://starwars.wikia.com/wiki/Pazaak/Legends', '_blank');
    event.preventDefault();
    setTimeout(() => {
      this.setState({
        phase: 'showingInstructions'
      });
    }, this.state.options.flashInterval);
  }
  handleClickOptions(event) {
    // this.playSound('click');
    event.preventDefault();
    setTimeout(() => {
      this.setState({
        phase: 'showingOptions'
      });
    }, this.state.options.flashInterval);
  }
  handleClickHallOfFame(event) {
    event.preventDefault();
    // this.playSound('click');
    this.getHighScores();
    setTimeout(() => {
      this.setState({
        phase: 'showingHallOfFame'
      });
    }, this.state.options.flashInterval);
  }
  handleClickEndTurn(event) {
    // this.playSound('click');
    event.preventDefault();
    let buttonText = document.getElementById('end-turn-button').innerHTML;
    this.callMoveIndicator('user', buttonText, this.state.options.moveIndicatorTime);
    if (buttonText === 'End Turn') {
      if (!this.state.turnStatus.opponent.standing) {
        setTimeout(() => {
          this.changeTurn('opponent');
        }, this.state.options.moveIndicatorTime);
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
    // this.playSound('click');
    let buttonText = document.getElementById('stand-button').innerHTML;
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    if (buttonText === 'Stand') {
      turnStatusCopy.user.standing = true;
      setTimeout(() => {
        this.changeTurn('opponent');
      }, this.state.options.moveIndicatorTime);
    } else if (buttonText === 'Cancel') {
      this.state.turnStatus.user.highlightedCard.element.classList.remove('highlighted-card');
      turnStatusCopy.user.highlightedCard.element = null;
      turnStatusCopy.user.highlightedCard.obj = null;
      document.getElementById('switch-sign-button').classList.add('hidden-button');
      document.getElementById('end-turn-button').innerHTML = 'End Turn';
      document.getElementById('stand-button').innerHTML = 'Stand';
    }
    this.setState({
      turnStatus: turnStatusCopy
    });
    this.callMoveIndicator('user', 'Stand', this.state.options.moveIndicatorTime);
  }
  handleClickCard(event, value, type) {
    event.preventDefault();
    // SELECTING DECK
    if (this.state.phase === 'selectingDeck') {
      if (event.target.id.toString().length > 8) {
        // it's a selection card, so put it in player deck
        if (this.state.userDeck.length < 10) {
          if (!this.arrayContainsCardWithId(this.state.userDeck, event.target.id)) {
            let deckCopy = this.state.userDeck.slice();
            let newCard = { id: this.state.idCount, value: value, type: type, baseId: event.target.id };
            deckCopy.push(newCard);     
            event.target.style.opacity = 0.1;
            this.setState(prevState => {
              return {
                userDeck: deckCopy,
                idCount: prevState.idCount + 1
              };
            });
          }
        }
      } else {
        // it's already in the player deck, so take it out
        let clickedCardId = event.target.id;
        let deckCopy = this.state.userDeck.slice();
        let indexToRemove = this.getCardIndexById(deckCopy, clickedCardId);
        let baseId = deckCopy[indexToRemove].baseId;
        document.getElementById(baseId).style.opacity = 1;
        deckCopy.splice(indexToRemove, 1);
        this.setState({
          userDeck: deckCopy
        });
      }
    }

    // GAME STARTED

    if (this.state.phase === 'gameStarted') {

      // highlight card and change footer buttons
      if (!this.state.turnStatus.user.playedCard && this.state.userGrid.length < 9) {
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
          if (cardObj.type === plusMinusSymbol) {
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
  arrayContainsCardWithId(arr, id) {
    let contains = false;
    arr.map((card, i) => {
      if (card.baseId === id) {
        contains = true;
      }
    });
    return contains;
  }
  playHandCard(player, cardObject) {
    console.log('playing card', cardObject)
    this.removeCardFromHand(player, cardObject.id);
    this.addCardtoGrid(player, cardObject.value, cardObject.type);
    this.changeCardTotal(player, this.state[`${player}Total`] + cardObject.value);
    setTimeout(() => {
      let turnStatusCopy = Object.assign({}, this.state.turnStatus);
      turnStatusCopy.user.playedCard = true;
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
    }, this.state.options.moveIndicatorTime);
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
    if (type === plusMinusSymbol) {
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
  declareWinner(winner) {
    console.error('declareWinner()')

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
      console.warn('SETTING WINS TO', winner, newWins)
      this.setState({
        turn: null,
        [`${winner}Wins`]: newWins,
        lastWinner: winner
      }, () => {
        console.log('aet state and now calling modal')
        this.callResultModal(winner);
        document.getElementById('game-board').style.opacity = 0.3;
      });
    } else {
      // TIE
      if (this.state.playerNames.user !== 'Player' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
      }
      this.setState({
        turn: null,
        lastWinner: null
      }, () => {
        document.getElementById('game-board').style.opacity = 0.3;
        this.callResultModal('tie');
      });
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
    // this.playSound('turn');
    return newTurn;
  }

  determineWinnerFromTotal() {
    console.error('determineWinnerFromTotal()')

    console.warn(`app.determineWinnerFromTotal is comparing userTotal ${this.state.userTotal} - opponentTotal ${this.state.opponentTotal}`);
    let winner;
    if (this.state.userTotal > this.state.opponentTotal) {
      if (this.state.userTotal <= 20) {
        winner = 'user';
      } else {
        winner = 'opponent';
      }
      this.declareWinner(winner);
    } else if (this.state.userTotal < this.state.opponentTotal) {
      if (this.state.opponentTotal <= 20) {
        winner = 'opponent';
      } else {
        winner = 'user';
      }
      this.declareWinner(winner);
    } else {
      this.declareWinner('TIE');
    }
  }
  changeTurn(newPlayer) {
    console.error('changeTurn()', newPlayer)
    this.playSound('turn');
    if (newPlayer === 'user') {
      if (this.state.turnStatus.opponent.standing) {
        // OPPONENT STANDING

        if (this.state.turnStatus.user.standing) {
          // BOTH STANDING

          console.error('BOTH PLAYERS STANDING!');
          if (this.state.opponentTotal > 20) {
            // opponent over 20
            console.warn('Opponent is over 20!');
            if (this.state.userTotal <= 20) {
              console.warn('Only opponent is over 20! User wins!');
              this.declareWinner('user');
            } else {
              console.warn('Both players over 20! tie');
              this.declareWinner('tie');
            }
          } else {
            // opponent under 20
            console.warn('opponent under 20');
            if (this.state.userTotal > 20) {
              console.warn('user is over 20! Opponent wins!');
              this.declareWinner('opponent')
            } else {
              console.warn('Both players have stood and are <= 20! Comparing scores to determine winner.')
              this.determineWinnerFromTotal();
            }
          }
        } else {
          console.error('OPPONENT STANDING, USER STILL IN PLAY!')
          // OPPONENT STANDING, USER STILL IN PLAY
          console.warn('swapping turns and dealing card to user after delay', this.state.options.dealWaitTime)
          // this.playSound('click');
          let newTurn = this.swapTurn();
          setTimeout(() => {
            this.dealToPlayerGrid(newTurn);
          }, this.state.options.dealWaitTime);
        }

      } else {
        // OPPONENT IN PLAY

        console.error('OPPONENT STILL IN PLAY')
        // see if opponent has losing score
        if (this.state.opponentTotal > 20) {
          console.warn('opponent over 20!');
          // if (this.state.userTotal > 20) {
          //   console.warn('Both players over 20! tie')
          //   this.declareWinner('tie');
          // } else {
          //   console.warn('Opponent over 20 while user <= 20! User wins!')
          //   this.declareWinner('user');
          // }
        }
        // deal card to user
        // this.playSound('click');
        let newTurn = this.swapTurn();
        setTimeout(() => {
          this.dealToPlayerGrid(newTurn);
        }, this.state.options.dealWaitTime);

      }
    } else {
      if (this.state.vsCPU) {
        // changing to CPU opponent
        if (this.state.userTotal > 20) {
          // user clicked Stand with losing total
          if (this.state.vsCPU) {
            // this.makeOpponentMove();
            console.log('calling AI.makeOpponentMove when user STOOD with losing total');
            AI.makeOpponentMove(this);
          }
        } else {
          if (!this.state.turnStatus.opponent.standing) {
            let newTurn = this.swapTurn();
            if (this.state[`${newTurn}Grid`].length < 9) {

              setTimeout(() => {
                this.dealToPlayerGrid(newTurn);
              }, this.state.options.dealWaitTime);
            }
            if (this.state.vsCPU) {
              // this.makeOpponentMove();
              AI.makeOpponentMove(this);
            }
          } else {
            this.determineWinnerFromTotal();
          }
        }
      }
    }
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    turnStatusCopy.user.playedCard = false;
    turnStatusCopy.opponent.playedCard = false;
    this.setState({
      turnStatus: turnStatusCopy,
      lastFirstTurn: newPlayer
    });
  }
  callResultModal(winner) {
    console.error('callResultModal()')
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
    modal.classList.add('modal-on');
    let stateTime = window.performance.now();
    this.setState({
      resultMessage: {
        title: title,
        winner: winnerDisplay,
        buttonText: buttonText
      },
    }, () => {
      let cbTime = window.performance.now();
      console.warn('state took', (cbTime - stateTime));
    });
  }
  dismissResultModal() {
    let modal = document.getElementById('result-modal');
    modal.classList.remove('modal-on');
  }
  handleClickAvatar(event) {
    document.getElementsByClassName('selected-avatar')[0].classList.remove('selected-avatar');
    event.target.classList.add('selected-avatar');
    let userStatusCopy = Object.assign({}, this.state.userStatus);
    userStatusCopy.avatarIndex = parseInt(event.target.id.split('-')[2])
    setTimeout(() => {
      this.setState({
        userStatus: userStatusCopy
      });
    }, 200)
  }
  handleClickRandomize(event) {
    event.preventDefault();
    let selectionCopy = Util.shuffle(this.state.cardSelection.slice());
    let userDeckCopy = [];
    Array.from(document.getElementById('deck-selection-grid').children).map((card, i) => {
      if (card.children[0]) {
        card.children[0].style.opacity = 1;
      }
    });
    for (let i = 0; i < 10; i++) {
      let deckCard = selectionCopy[i];
      let newCard = { id: this.state.idCount + (i + 1), value: deckCard.value, type: deckCard.type, baseId: `card-${deckCard.id}` };
      userDeckCopy.push(newCard);
      document.getElementById(newCard.baseId).style.opacity = 0.1;
    }
    this.setState({
      userDeck: userDeckCopy,
    });
  }
  handleClickOKButton(event) {
    event.preventDefault();
    if (this.state.userWins === 3 || this.state.opponentWins === 3) {
      this.getNewPlayerHands();
      this.setState({
        userWins: 0,
        opponentWins: 0,
      });
    }
    let newTurn = this.state.lastWinner;
    if (!newTurn) {
      newTurn = 'user';
      if (this.state.lastFirstTurn === 'user') {
        newTurn === 'opponent';
      }
    }
    this.dismissResultModal();
    setTimeout(() => {
      document.getElementById('game-board').style.opacity = 1;
      this.resetBoard(newTurn);

      setTimeout(() => {
        this.setState({
          userGrid: [],
          opponentGrid: [],
        });
        this.setState({
          turn: newTurn,
        });
        this.dealToPlayerGrid(this.state.turn);
        if (this.state.vsCPU && newTurn === 'opponent') {
          AI.makeOpponentMove(this);
        }
      }, this.state.options.turnInterval);
    }, this.state.options.turnInterval);
  }
  toggleHamburgerAppearance(position) {
    let topBar = document.getElementById('top-hamburger-bar');
    let bottomBar = document.getElementById('bottom-hamburger-bar');
    let middleBar = document.getElementById('middle-hamburger-bar');
    let middleBar2 = document.getElementById('middle-hamburger-bar-2');
    if (position === 'hamburger') {
      // un-rotate middle bars to flat
      middleBar.style.transform = middleBar2.style.transform = 'none';

      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 1;
        // un-collapse top and bottom bars from middle
        topBar.style.transform = bottomBar.style.transform = 'translateY(0%)';
      }, 150);
    } else {
      // collapse top and bottom bards to middle
      topBar.style.transform = 'translateY(225%)';
      bottomBar.style.transform = 'translateY(-225%)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 0;
        // rotate middle bars to an X shape
        middleBar.style.transform = 'rotate(45deg) scaleX(1.1)';
        middleBar2.style.transform = 'rotate(-45deg) scaleX(1.1)';
      }, 150);
    }
  }
  handleClickHamburger() {
    if (!document.getElementById('hamburger-menu').classList.contains('hamburger-on')) {
      this.toggleHamburgerAppearance('close');
      document.getElementById('hamburger-menu').classList.add('hamburger-on');
    } else {
      this.toggleHamburgerAppearance('hamburger');
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');
    }
  }

  handleClickOpponentPanel(event) {
    let eventId = event.target.id;
    let opponentName = eventId.split('-')[0];
    let opponentPanel = document.getElementById(`${opponentName}-panel`);
    let opponentSelectButton = document.getElementById(`${opponentName}-select-button`);
    opponentPanel.classList.add('panel-selected');
    opponentSelectButton.classList.add('disabled-select-button');
    Array.from(document.getElementById('opponent-select-area').children).map((panel, i) => {
      if (panel.id.split('-')[0] !== opponentName) {
        let panelButton = document.getElementById(`${panel.id.split('-')[0]}-select-button`);
        panel.classList.remove('panel-selected');
        panelButton.classList.remove('disabled-select-button');
      }
    });
    // delay setting state until bg changed / flash finished!
    // let opponentIndex = Object.keys(this.characters).indexOf(event.target.id.split('-')[0]);
    setTimeout(() => {
      // document.getElementById('mini-opponent-portrait').style.backgroundPositionX = -opponentIndex * (this.state.cardSizes.miniCardSize.height - 2) + 'px';
      let namesCopy = Object.assign({}, this.state.playerNames);
      namesCopy.opponent = this.characters[opponentName].displayName;
      let opponentDeckCopy = Util.shuffle(this.characters[opponentName].deck);
      this.setState({
        CPUOpponent: opponentName,
        playerNames: namesCopy,
        opponentDeck: opponentDeckCopy
      });
    }, this.state.options.flashInterval * 2);
    event.preventDefault();
  }
  resetBoard(newTurn, total) {
    document.getElementById('user-total').classList.remove('red-total');
    document.getElementById('user-total').classList.remove('green-total');
    document.getElementById('opponent-total').classList.remove('red-total');
    document.getElementById('opponent-total').classList.remove('green-total');
    if (newTurn === 'user') {
      document.getElementById('end-turn-button').classList.remove('disabled-button');
      document.getElementById('stand-button').classList.remove('disabled-button');
    } else {
      document.getElementById('end-turn-button').classList.add('disabled-button');
      document.getElementById('stand-button').classList.add('disabled-button');
    }

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
        lastFirstTurn: 'user',
        lastWinner: null
        // must disable button if this is reset
        // userDeck: []
      });
    }
  }
  handleClickHamburgerQuit(event) {
    document.getElementById('hamburger-menu').classList.remove('hamburger-on');
    this.resetBoard('user', true);
    // setTimeout(() => {
    this.toggleHamburgerAppearance('hamburger');
    // }, 400);
  }
  callMoveIndicator(player, message, duration) {
    this.playSound('click');
    let indicator = document.getElementById('move-indicator');
    if (message === 'End Turn') {
      indicator.style.backgroundColor = 'var(--green-move-color)';
    } else if (message === 'Stand' || message === 'Draw') {
      indicator.style.backgroundColor = 'var(--yellow-move-color)';
    } else {
      indicator.style.backgroundColor = 'var(--red-move-color)';
    }
    if (message === 'Draw') {
      duration = Math.round(duration / 3);
    }
    document.getElementById('move-message').innerHTML = message;
    indicator.style.height = (document.getElementById('user-area').offsetHeight + document.getElementById('user-hand').offsetHeight) + 'px';
    if (player === 'user') {
      // indicator.style.top = Math.round(window.innerHeight / 20) + (document.getElementById('user-area').offsetHeight + document.getElementById('user-hand').offsetHeight) + 'px';
      indicator.style.top = document.getElementById('user-area').offsetTop + 'px';
    } else {
      indicator.style.top = document.getElementById('opponent-hand').offsetTop + 'px';
    }
    indicator.style.opacity = 1;
    indicator.style.transform = 'scaleX(1.1)';
    setTimeout(() => {
      indicator.style.transform = 'scaleX(1)';
      setTimeout(() => {
        indicator.style.opacity = 0;
      }, duration - 200);
    }, 200);

  }
  render() {
    let startTime = window.performance.now();
    let phase = this.state.phase;
    // default styles are hidden...
    // - maybe keep these in state?
    // - or use routing?
    let cardSize = this.state.cardSizes.cardSize;
    let mediumCardSize = this.state.cardSizes.mediumCardSize;
    let miniCardSize = this.state.cardSizes.miniCardSize;
    let microCardSize = this.state.cardSizes.microCardSize;
    // let footerStyle = { pointerEvents: 'none', opacity: 1, position: 'absolute', bottom: '-10vmax' };
    let gameBoardStyle = { display: 'none' };
    let introStyle = { display: 'none' };
    let instructionsStyle = { display: 'none' };
    let optionsStyle = { display: 'none' };
    let hallOfFameStyle = { display: 'none' };
    let opponentSelectStyle = { display: 'none' };
    let deckSelectStyle = { display: 'none' };
    switch (this.state.phase) {
      case 'splashScreen': {
        // if (this.state.inputHasFocus && this.state.keyboardShowing) {
        //   document.getElementById('start-button').classList.add('keyboard-showing-start-button')
        //   introStyle = { display: 'block !important', position: 'fixed', top: '0px', height: '100%' }
        // } else {
        //   introStyle = { display: 'flex' };
        // }
        introStyle = { display: 'flex' };
        break;
      }
      case 'selectingOpponent': opponentSelectStyle = { display: 'flex' }; break;
      case 'showingOptions': optionsStyle = { display: 'flex' }; break;
      case 'selectingDeck': deckSelectStyle = { display: 'flex' }; break;
      case 'showingHallOfFame': hallOfFameStyle = { display: 'flex' }; break;
      case 'showingInstructions': instructionsStyle = { display: 'flex' }; break;
      case 'gameStarted':
        gameBoardStyle.display = 'flex';
      // footerStyle = { pointerEvents: 'all', opacity: 1, position: 'relative', bottom: '0' }; break;
    }
    let endTime = window.performance.now();
    // console.warn('App pre-return activites took', (endTime - startTime));
    return (
      <div id='container'>
        <Header />
        <IntroScreen style={introStyle}
          avatarIndex={this.state.userStatus.avatarIndex}
          cardSize={this.state.cardSizes.cardSize}
          onClickAvatar={this.handleClickAvatar}
          onClickStart={this.handleClickStart}
          onClickHow={this.handleClickHow}
          onClickOptions={this.handleClickOptions}
          onClickHallOfFame={this.handleClickHallOfFame}
          onFocusNameInput={this.handleNameInputFocus}
          onUnfocusNameInput={this.handleNameInputUnfocus}
        />
        {phase === 'showingInstructions' &&
          <InstructionsScreen style={instructionsStyle}
            onClickBack={this.handleClickBack} />
        }
        {phase === 'showingOptions' &&
          <OptionsScreen style={optionsStyle}
            currentOptions={this.state.options}
            onToggleOption={this.handleToggleOption}
            onClickBack={this.handleClickBack} />
        }
        {phase === 'showingHallOfFame' &&
          <HallOfFameScreen style={hallOfFameStyle}
            highScores={this.state.highScores}
            onClickBack={this.handleClickBack} />
        }
        {phase === 'selectingDeck' &&
          <DeckSelectScreen style={deckSelectStyle}
            cardSelection={this.state.cardSelection}
            userDeck={this.state.userDeck}
            onClickRandomize={this.handleClickRandomize}
            onClickPlay={this.handleClickPlay}
            onClickCard={this.handleClickCard}
            onClickBack={this.handleClickBack}
            cardSizes={this.state.cardSizes} />
        }
        {(phase === 'selectingOpponent') &&
          <OpponentSelectScreen style={opponentSelectStyle}
            characters={ this.characters}
            opponentSelected={this.state.CPUOpponent}
            cardSize={microCardSize}
            onClickPanel={this.handleClickOpponentPanel}
            onClickOpponentReady={this.handleClickOpponentReady}
            onClickBack={this.handleClickBack} />
        }

        <GameBoard style={gameBoardStyle}
          playerNames={this.state.playerNames}
          opponentNames={Object.keys(this.characters)}
          CPUOpponent={this.state.CPUOpponent}
          portraitSources={portraitSources}
          avatarIndex={this.state.userStatus.avatarIndex}
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
        <ControlFooter
          showing={this.state.phase === 'gameStarted'}
          onClickEndTurn={this.handleClickEndTurn}
          onClickStand={this.handleClickStand}
          onClickHamburger={this.handleClickHamburger}
          onClickSwitchSign={this.handleClickSwitchSign}
        />
        {phase === 'gameStarted' &&
          <div>
            <HamburgerMenu
              currentOptions={this.state.options}
              onClickHamburgerQuit={this.handleClickHamburgerQuit}
              onToggleOption={this.handleToggleOption} />

            <ResultModal onClickOKButton={this.handleClickOKButton}
              titleText={this.state.resultMessage.title}
              playerNames={this.state.playerNames}
              winner={this.state.resultMessage.winner}
              roundOver={(this.state.userWins === 3 || this.state.opponentWins === 3)}
              finalScores={{ user: this.state.userTotal, opponent: this.state.opponentTotal }}
              buttonText={this.state.resultMessage.buttonText} />
          </div>
        }
      </div>
    );
  }
}

export default App;