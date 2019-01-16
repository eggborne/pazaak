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
import ConfirmModal from './ConfirmModal';
import OpponentSelectScreen from './OpponentSelectScreen';
import HeaderMenu from './HeaderMenu';
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
const plusMinusSymbol = '±';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.characters = characters.characters;
    this.state = {
      vsCPU: true,
      CPUOpponent: 'jarjarbinks',
      lastWinner: null,
      lastFirstTurn: 'user',
      playerNames: {
        user: 'Guest',
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
        phase: 'splashScreen',
        loggedInAs: '',
        lastLogin: undefined,
        cookieId: undefined,
        initialValues: {
          avatarIndex: 0,
        },
        avatarIndex: 0,
        setWins: 0,
        totalSets: 0,
        matchWins: 0,
        totalMatches: 0,
        credits: 5633,
        cpuDefeated: [],
        messages: [],
        unreadMessages: 0
      },
      portraitSources: {
        user: document.getElementById('avatar-sheet').src,
        opponent: 'https://pazaak.online/assets/images/opponentsheet.jpg'
      },
      userData: {
        id: 0,
        playerName: '',
        setWins: 0,
        totalSets: 0,
        matchWins: 0,
        totalMatches: 0,
        usersDefeated: 0,
        usersFought: 0,
        credits: 5633,
        cpuDefeated: [],
        messages: [],
        avatarIndex: 0,
        phase: 'splashScreen',
        loggedInAs: '',
        cookieId: undefined, // id DB.id
        initialValues: {
          avatarIndex: 0,
        },
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
        buttonText: 'Next Match'
      },
      confirmMessage: {
        showing: false,
        titleText: '',
        bodyText: '',
        buttonText: {
          confirm: '',
          cancel: ''
        }
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
      highScores: this.getPlayerRecords().then((response) => {
        console.log('initial getplayerrec', response);
        Util.checkCookie(this);
      }).catch((reason) => {
        console.error('getPlayerRecords failed because', reason);
      }),
      highScores: [],
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
    this.createNewGuest = this.createNewGuest.bind(this);
    this.incrementPlayerScore = this.incrementPlayerScore.bind(this);
    this.applyStateOptions = this.applyStateOptions.bind(this);
    this.evaluatePlayerName = this.evaluatePlayerName.bind(this);
    this.analyzeEnteredName = this.analyzeEnteredName.bind(this);
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
    this.callConfirmModal = this.callConfirmModal.bind(this);
    this.dismissConfirmModal = this.dismissConfirmModal.bind(this);
    this.callUserInfoModal = this.callUserInfoModal.bind(this);
    this.dismissUserInfoModal = this.dismissUserInfoModal.bind(this);
    this.handleClickRandomize = this.handleClickRandomize.bind(this);
    this.handleClickOKButton = this.handleClickOKButton.bind(this);
    this.handleClickHamburger = this.handleClickHamburger.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.determineWinnerFromTotal = this.determineWinnerFromTotal.bind(this);
    this.handleClickHamburgerQuit = this.handleClickHamburgerQuit.bind(this);
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
    this.handleClickAccountInfo = this.handleClickAccountInfo.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
    this.handleClickSignIn = this.handleClickSignIn.bind(this);
    this.handleClickMoreInfo = this.handleClickMoreInfo.bind(this);
    this.handleClickConfirmButton = this.handleClickConfirmButton.bind(this);
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this);
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this);
    this.getNiceTimeFromSeconds = this.getNiceTimeFromSeconds.bind(this);
  }

  componentDidMount() {
    let startTime = window.performance.now();
    //Util.checkCookie(this);
    Util.sizeElements(this, true);
    window.addEventListener('resize', () => {
      Util.sizeElements(this, true);
    });
    window.addEventListener('fullscreenchange', this.handleFullscreenChange);
    window.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('msfullscreenchange', this.handleFullscreenChange);
    this.upperPingLimit = 18000;
    this.pingFrequency = 3000;
    this.expiredCheckFrequency = 1;
    this.pingCounter = 0;
    console.warn('App.componentDidMount activities done in', (window.performance.now() - startTime));
  }
  getLocalPlayerObjById(userId) {
    for (let i = 0; i < this.state.highScores.length; i++) {
      let recordObj = this.state.highScores[i];
      if (recordObj.id === userId) {
        return Object.assign({}, recordObj);
      }
    }
  }

  getNiceTimeFromSeconds(sessionLengthInSeconds) {
    let output;
    let sessionMinutes = Math.ceil(sessionLengthInSeconds / 60);
    let minutePlural = 's';
    if (sessionMinutes === 1) {
      minutePlural = '';
    }
    if (sessionMinutes >= 60) {
      let wholeHours = Math.floor(sessionMinutes / 60);
      let minutes = (sessionMinutes % 60);
      if (minutes === 1) {
        minutePlural = '';
      }
      let hourPlural = 's';
      if (wholeHours === 1) {
        hourPlural = '';
      }
      if (wholeHours >= 24) {
        let dayPlural = 's';        
        let wholeDays = Math.floor(sessionMinutes / 60);
        if (wholeDays === 1) {
          dayPlural = '';
        }
        output = `${wholeDays} day${dayPlural}`;
      } else {
        if (minutes === 0) {
          output =  `${wholeHours} hour${hourPlural}`;
        } else {
          output = `${wholeHours} hour${hourPlural} ${minutes} min${minutePlural}`;
        }
      }
    } else {
      if (sessionMinutes === 0) {
        output = 'moments'
      } else {
        output = `${sessionMinutes} min${minutePlural}`;
      }
    }
    return output;
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
        this.setState({
          cardSizes: newSizes
        }, () => {
          Util.sizeElements(this);
          //document.getElementById('container').style.backgroundColor = 'green';
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
  getPlayerData(callback) {
    DB.getScores().then((response) => {
      let playerScoreArray = response.data;
      if (!response.data) {
        playerScoreArray = [];
      } else {
        // playerScoreArray.map((playerScore, i) => {
        //   playerScore.cpuDefeated = JSON.parse(playerScore.cpuDefeated);
        //   playerScore.avatarIndex = parseInt(playerScore.avatarIndex);
        // });
      }
      this.setState({
        highScores: playerScoreArray
      }, () => {
        console.log('getplayerData called', response);
        callback;
      });
    });
  }
  getUserAmount() {
    DB.getScores().then((response) => {
      let playerScoreArray = response.data;
      if (!response.data) {
        playerScoreArray = [];
      } else {

      }
      this.setState({

      }, () => {

      });
    });
  }

  getPlayerRecords() {
    return new Promise((resolve, reject) => {
      DB.getScores().then((response) => {
        let playerRecordArray = response.data.slice();
        if (!response.data) {
          playerRecordArray = [];
          reject('No records.');
        } else {
          playerRecordArray.map((playerScore, i) => {
            playerScore.cpuDefeated = JSON.parse(playerScore.cpuDefeated);
            playerScore.preferences = JSON.parse(playerScore.preferences);
            playerScore.messages = JSON.parse(playerScore.messages);
          });
        }
        this.setState({
          highScores: playerRecordArray,
        }, () => {
          resolve(playerRecordArray);
        });
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
  handleClickLogOut() {
    this.callConfirmModal(
      'Log out?',
      `This will log you out permanently and delete all records of ${this.state.userStatus.loggedInAs}.`,
      { confirm: 'Do it', cancel: 'Never mind' },
      () => {
        // setting time limit to 0 destroys cookie
        Util.setCookie('username', `${this.state.userStatus.loggedInAs}||${this.state.userStatus.cookieId}`, 0);
        console.error('Cookie destroyed!');
        let userStatusCopy = Object.assign({}, this.state.userStatus);
        document.getElementById('player-name-input').disabled = false;
        document.getElementById('player-name-input').style.backgroundColor = 'white';
        document.getElementById('player-name-input').value = '';
        document.getElementById('remember-checkbox').disabled = false;
        document.getElementById('remember-checkbox').checked = true;
        document.getElementById('remember-check-area').classList.remove('remembered');
        userStatusCopy = {
          loggedInAs: '',
          cookieId: -1,
          initialValues: {
            avatarIndex: 0
          },
          avatarIndex: 0, // if -1, custom
          totalSetWins: 0,
          matchWins: 0,
          totalSetsPlayed: 0,
          matchesPlayed: 0
        };
        let defaultOptions = {
          sound: false,
          ambience: false,
          darkTheme: false,
          turnInterval: 300,
          flashInterval: 90,
          opponentMoveWaitTime: 1600,
          moveIndicatorTime: 900,
          dealWaitTime: 600,
        };
        this.setState({
          userStatus: userStatusCopy,
          options: defaultOptions,
          phase: 'splashScreen'
        }, () => {
          this.dismissConfirmModal();
          this.applyStateOptions('off');
          // roll up header menu
          let userPanel = document.getElementById('user-info-panel');
          let settingsIcon = document.getElementById('user-account-icon');
          let cornerArea0 = document.getElementById('corner-area-0');
          cornerArea0.style.backgroundColor = 'transparent';
          cornerArea0.style.border = '0';
          settingsIcon.classList.remove('corner-button-on');
          userPanel.classList.add('user-info-panel-off');
          setTimeout(() => {
            document.getElementById('header').classList.remove('no-bottom-border');
          }, 350);
        });
      }
    );
  }
  handleClickSignIn() {
    this.setState({
      phase: 'splashScreen'
    }, () => {
      this.handleClickAccountInfo();
    });
  }
  handleToggleOption(event, forceDirection) {
    let changeState = true;
    let el;
    let eventId;
    if (!forceDirection) {
      el = event.target;
      eventId = event.target.id;
    } else {
      // 1st arg is el id
      console.log(`handleToggleOption w/ ${forceDirection} trying document.getElementById(${event})`);
      eventId = event;
      el = document.getElementById(eventId);
    }
    let optionsCopy = Object.assign({}, this.state.options);
    if ((forceDirection === 'on') || (!forceDirection && el.classList.contains('option-off'))) {
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
    }
    if ((forceDirection === 'off') || (!forceDirection && el.classList.contains('option-on'))) {
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
      }, () => {
        if (this.state.userStatus.cookieId && this.state.userStatus.loggedInAs) {
          let optionsString = JSON.stringify(optionsCopy);
          DB.updatePreferences(this.state.userStatus.cookieId, optionsString);
        }
      });
    }
  }

  applyStateOptions(forceDirection) {
    let optionsCopy = Object.assign({}, this.state.options);
    let optionsArray = Object.keys(optionsCopy);
    optionsArray.map((option, i) => {
      if (i < 3) {
        let eventId;
        if (option === 'sound') {
          eventId = 'sound-fx-toggle';
        }
        if (option === 'ambience') {
          eventId = 'ambience-toggle';
        }
        if (option === 'darkTheme') {
          eventId = 'dark-theme-toggle';
        }
        if (forceDirection === 'on') {
          if (optionsCopy[option]) {
            this.handleToggleOption(eventId, forceDirection);
            // this.setOption(optionName, position);
          }
        } else {
          if (!optionsCopy[option]) {
            this.handleToggleOption(eventId, forceDirection);
          }
        }
      }
    });
  }

  createNewGuest() {
    let promise = new Promise((resolve, reject) => {
      let optionsString = JSON.stringify(this.state.options);
      DB.saveUser('Guest', this.state.userStatus.avatarIndex, optionsString).then((response) => {
        DB.getUserId('Guest').then((response) => {
          console.error('response.data[0] for Guest?', response.data[0].id);
          let guestId = parseInt(response.data[0].id);
          DB.updateLastLoginTime(guestId);
          console.error('type guestId', guestId, typeof guestId);
          DB.updateUserName(guestId, `Guest-${guestId}`).then((response) => {
            console.error('updateUserName to Guest?', `Guest-${response.data[0].id}`, response);
            resolve(`Guest-${guestId}`);
          });
        });
      });
    });
    return promise;
  }

  analyzeEnteredName(enteredName) {
    let validId = this.state.userStatus.id;
    console.error('validId?', validId);
    if (validId) {
      DB.getRecordForUserId(validId).then((response) => {
        if (response.data) {
          let nameFound = response.data.playerName;
          console.error('FOUND A RECORD WITH ID and NAME', validId, nameFound);
          console.error('Matches enteredName?', enteredName);
          if (nameFound === enteredName) {
            console.error('SSSUUUUCCCEEEESSSSS --------------------->>>');
            let userDataCopy = Object.assign({}, response.data);
            console.error('THE DATA |||', userDataCopy);
            this.setState({
              userData: userDataCopy
            }, () => {
              // add to active users...
              resolve('ended with userData', userDataCopy);
            });
          } else {
            reject('record with ID had wrong name', nameFound);
          }
        } else {

        }
      });
    }
  }

  evaluatePlayerName(enteredName) {
    let uniqueId = this.state.userStatus.cookieId;
    let userStatusCopy = Object.assign({}, this.state.userStatus);
    if (this.state.userStatus.loggedInAs) {
      // cookie was recognized and player logged in


    }
    if (uniqueId) {
      // DB.getRecordForUserId(uniqueId).then((response) => {
      //   console.log('resp', response);
      // })
      DB.getDataForPlayer(enteredName).then((response) => {
        if (response.data) {
          console.warn('On evaluatePlayerName after getDataForPlayer, response.data (at least one matching name) is FOUND', response.data);
          // NAME IN DB
          let playerIndex;
          console.warn('response.data found and this.state.userStatus.cookieId EXISTS!', uniqueId);
          console.warn('comparing', parseInt(response.data[0].id), parseInt(uniqueId));
          if (parseInt(response.data[0].id) === parseInt(uniqueId)) {
            console.warn('MATCH FOUND IN DB FOR COOKIE ID! Setting playerIndex to 0.');
            playerIndex = 0;
          }
          if (playerIndex === undefined) {
            console.error('USERNAME TAKEN, and no match found in DB for username/id combination (so you is not him!)');
          } else {
            let playerObj = Object.assign({}, response.data[playerIndex]);
            console.warn('GOT playerObj', playerObj);

            playerObj.preferences = JSON.parse(playerObj.preferences);
            playerObj.cpuDefeated = JSON.parse(playerObj.cpuDefeated);
            // playerObj.messages = JSON.parse(playerObj.messages);
            console.warn('AFTER', playerObj);
            console.error(`Cookie recognized! Logging in player as ${playerObj.playerName}, recording into state.userStatus, highlighting avatar ${playerObj.avatarIndex} and scrolling into view.`);
            playerObj.loggedInAs = playerObj.playerName;
            playerObj.cookieId = playerObj.id;
            document.getElementById(`avatar-thumb-${playerObj.avatarIndex}`).scrollIntoView({ inline: 'center' });
            // playerObj.initialValues.avatarIndex = playerObj.avatarIndex;
            this.setState({
              userStatus: playerObj,
              options: playerObj.preferences
            }, () => {
              console.error('calling applyStateOptions(on) post-cookie found and matched.');
              this.applyStateOptions('on');
            });
            // let newOptions = JSON.parse(playerObj.preferences);
            // console.error('RECEIVED options', newOptions);
            // this.setState({
            //   userStatus: userStatusCopy,
            //   options: newOptions
            // }, () => {
            //   console.error('calling applyStateOptions(on) post-cookie found and matched.');
            //   this.applyStateOptions('on');
            // });
          }
        } else {

          // does this ever occur??

          console.error(`at evaluatePlayerName (NEEDED?): No entry in DB for ${enteredName}.`);

          // let optionsString = JSON.stringify(this.state.options);
          // console.error('saving with options string', optionsString);
          // DB.saveUser(enteredName, this.state.userStatus.avatarIndex, optionsString).then((response) => {
          //   DB.getUserId(enteredName).then((response) => {
          //     let uniqueId = response.data[0].id;
          //     console.error(`Setting new cookie for ${enteredName} with id ${uniqueId}`);
          //     console.error(`Cookie = ${enteredName}||${uniqueId}`);
          //     Util.setCookie('username', `${enteredName}||${uniqueId}`, 365);
          //     userStatusCopy.loggedInAs = enteredName;
          //     userStatusCopy.cookieId = parseInt(uniqueId);
          //     DB.updateLastLoginTime(userStatusCopy.cookieId);
          //     this.setState({
          //       userStatus: userStatusCopy
          //     }, () => {

          //     });
          //   });
          // });
        }
      });
    } else {
      console.error('called evaluatePlayerName without a state.userStatus.cookieId. >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

      console.error('calling DB.saveUser()', enteredName, this.state.userStatus.avatarIndex);
      let optionsString = JSON.stringify(this.state.options);
      console.error('saving with options string', optionsString);
      DB.saveUser(enteredName, this.state.userStatus.avatarIndex, optionsString).then((response) => {
        DB.getUserId(enteredName).then((response) => {
          let uniqueId = response.data[0].id;
          console.error('--------------------------------');
          console.error('new user record id is', uniqueId);
          console.error('--------------------------------');
          if (enteredName !== 'Guest') {
            console.error('Name is not Guest. Setting cookieId to', uniqueId);
            Util.setCookie('username', `${enteredName}||${uniqueId}`, 365);
          } else {
            console.error('Name is Guest. NOT setting cookie');
          }
          userStatusCopy.loggedInAs = enteredName;
          console.error(`setting loggedInAs: ${enteredName}`);
          userStatusCopy.cookieId = parseInt(uniqueId);
          console.error(`setting cookieId: ${parseInt(uniqueId)}`);
          console.error(`setting phase: ${this.state.phase}`);
          this.setState({
            userStatus: userStatusCopy
          }, () => {
            console.error('calling evaluatePlayerName a second time');
            this.evaluatePlayerName(enteredName);
          });
        });
      });
    }

  }
  handleClickAccountInfo() {
    if (this.state.userStatus.loggedInAs) {

      let userPanel = document.getElementById('user-info-panel');
      let settingsIcon = document.getElementById('user-account-icon');
      let cornerArea0 = document.getElementById('corner-area-0');
      if (userPanel.classList.contains('user-info-panel-off')) {
        cornerArea0.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        cornerArea0.style.border = '0.5vw solid rgba(0, 0, 0, 0.2)';
        settingsIcon.classList.add('corner-button-on');
        userPanel.classList.remove('user-info-panel-off');
        document.getElementById('header').classList.add('no-bottom-border');
      } else {
        cornerArea0.style.backgroundColor = 'transparent';
        cornerArea0.style.border = '0';
        settingsIcon.classList.remove('corner-button-on');
        userPanel.classList.add('user-info-panel-off');
        setTimeout(() => {
          document.getElementById('header').classList.remove('no-bottom-border');
        }, 350);
      }
    } else {
      let nameInputField = document.getElementById('player-name-input');
      let checkBoxArea = document.getElementById('remember-check-area');
      document.getElementById('remember-checkbox').checked = true;
      document.getElementById('remember-checkbox').disabled = false;
      nameInputField.classList.add('bouncing');
      checkBoxArea.classList.add('bouncing-inverted');
      setTimeout(() => {
        nameInputField.classList.remove('bouncing');
        checkBoxArea.classList.remove('bouncing-inverted');
      }, 600);
    }
  }
  handleClickStart(event) {
    event.preventDefault();
    // this.playSound('click');
    let enteredName = document.getElementById('player-name-input').value;
    let namesCopy = Object.assign({}, this.state.playerNames);
    let userStatusCopy = Object.assign({}, this.state.userStatus);

    if (!enteredName.length) {
      // playing as Guest
      console.error('NO NAME ENTERED. USING GUEST-XXX');
      // enteredName = document.getElementById('player-name-input').placeholder;
      this.createNewGuest().then((response) => {
        enteredName = response;
        let guestId = parseInt(response.split('-')[1]);
        userStatusCopy.cookieId = guestId;
        this.setState({
          userStatus: userStatusCopy,
          phase: 'selectingOpponent'
        });
      });
    } else {

      if (!this.state.userStatus.loggedInAs) {

        // had no cookie at load

        console.error('Clicked Start while !loggedInAs - enteredName is', enteredName);
        userStatusCopy.loggedInAs = enteredName;

        // make sure it's not too short or too long

        let nameLength = enteredName.length;
        let nameTooShort = false;
        let nameTooLong = false;
        let inputErrorText = '';
        if (nameLength < 3) {
          nameTooShort = true;
          inputErrorText = 'NAME TOO SHORT';
        } else if (nameLength > 24) {
          nameTooLong = true;
          inputErrorText = 'NAME TOO LONG';
        }
        DB.getScores().then((response) => {

          // make sure it's not taken

          let nameTaken = false;
          let scoresArray = response.data;
          if (scoresArray) {
            scoresArray.map((scoreObj, i) => {
              if (scoreObj.playerName === enteredName) {
                inputErrorText = 'NAME TAKEN';
                nameTaken = true;
              }
            });
          }
          if (nameTaken || nameTooLong || nameTooShort) {

            // clear field and show error message

            let yPosition = document.getElementById('player-name-input').offsetTop;
            let inputHeight = document.getElementById('player-name-input').offsetHeight;
            console.log('placing error text at', yPosition);
            document.getElementById('name-input-message').style.top = (yPosition + (inputHeight / 2)) + 'px';
            document.getElementById('name-input-message').innerHTML = inputErrorText;
            document.getElementById('name-input-message').classList.add('slid-on');
            setTimeout(() => {
              document.getElementById('name-input-message').classList.remove('slid-on');
            }, 2000);
            document.getElementById('player-name-input').value = '';
          } else {

            // create a new user record and set cookie

            namesCopy.user = enteredName;
            let optionsString = JSON.stringify(this.state.options);
            DB.saveUser(enteredName, this.state.userStatus.avatarIndex, optionsString).then((response) => {
              DB.getUserId(enteredName).then((response) => {
                Util.setCookie('username', `${enteredName}||${response.data[0].id}`, 365);
                console.error(`SAVED ${enteredName} with ID ${response.data[0].id}`);
                let uniqueId = response.data[0].id;
                userStatusCopy.cookieId = parseInt(uniqueId);
                DB.updateLastLoginTime(userStatusCopy.cookieId);
                this.setState({
                  userStatus: userStatusCopy,
                  playerNames: namesCopy
                }, () => {
                  this.evaluatePlayerName(enteredName);
                  this.setState({
                    phase: 'selectingOpponent'
                  });
                });
              });
            });
          }
        });
      } else {

        // had cookie and matched in DB

        DB.updateLastLoginTime(userStatusCopy.cookieId);
        console.error('Clicked Start while logged in as', this.state.userStatus.loggedInAs);
        if (enteredName !== this.state.userStatus.loggedInAs) {
          console.error('ENTERED DIFFERENT NAME! re-calling with new enteredName(?)', enteredName);
          this.evaluatePlayerName(enteredName);
        }
        // if (this.state.userStatus.avatarIndex !== this.state.userStatus.initialValues.avatarIndex) {
        //   console.error('CHANGED AVATAR! calling DB.saveUserAvatarIndex', this.state.userStatus.avatarIndex);
        //   DB.saveUserAvatarIndex(this.state.userStatus.loggedInAs, this.state.userStatus.avatarIndex);
        // }
        namesCopy.user = enteredName;
        setTimeout(() => {
          this.setState({
            phase: 'selectingOpponent',
            playerNames: namesCopy
          });
        }, this.state.options.flashInterval)

      }

    }
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
    }, this.state.options.turnInterval);
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
    this.setState({
      highScores: this.getPlayerRecords()
    })
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
    console.error('declareWinner()');

    if (winner !== 'TIE') {
      let newWins = this.state[`${winner}Wins`] + 1;
      if (this.state.playerNames.user !== 'Guest' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
        if (winner === 'user') {
          this.incrementPlayerScore(playerName, 'setWins');
          if (newWins === 3) {
            this.incrementPlayerScore(playerName, 'matchWins');
            this.incrementPlayerTotalGames(playerName, 'matches');
          }
        } else {
          if (newWins === 3) {
            this.incrementPlayerTotalGames(playerName, 'matches');
          }
        }
      }
      this.setState({
        turn: null,
        [`${winner}Wins`]: newWins,
        lastWinner: winner
      }, () => {
        this.callResultModal(winner);
        document.getElementById('game-board').style.opacity = 0.3;
      });
    } else {
      // TIE
      if (this.state.playerNames.user !== 'Guest' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
      }
      this.setState({
        turn: null,
        lastWinner: null
      }, () => {
        this.callResultModal('tie');
        document.getElementById('game-board').style.opacity = 0.3;
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
    console.error('determineWinnerFromTotal()');

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
    console.error('changeTurn()', newPlayer);
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
              this.declareWinner('opponent');
            } else {
              console.warn('Both players have stood and are <= 20! Comparing scores to determine winner.');
              this.determineWinnerFromTotal();
            }
          }
        } else {
          console.error('OPPONENT STANDING, USER STILL IN PLAY!');
          // OPPONENT STANDING, USER STILL IN PLAY
          console.warn('swapping turns and dealing card to user after delay', this.state.options.dealWaitTime);
          // this.playSound('click');
          let newTurn = this.swapTurn();
          setTimeout(() => {
            this.dealToPlayerGrid(newTurn);
          }, this.state.options.dealWaitTime);
        }

      } else {
        // OPPONENT IN PLAY

        console.error('OPPONENT STILL IN PLAY');
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
      title = 'MATCH\nWINNER';
      winnerDisplay = this.state.playerNames[winner];
      buttonText = 'New Match';
    }
    let modal = document.getElementById('result-modal');
    modal.style.backgroundColor = bgColor;
    modal.classList.add('modal-on');
    this.setState({
      resultMessage: {
        title: title,
        winner: winnerDisplay,
        buttonText: buttonText
      },
    });
  }
  dismissResultModal() {
    let modal = document.getElementById('result-modal');
    modal.classList.remove('modal-on');
  }
  callConfirmModal(titleText, bodyText, buttonText, confirmAction, noCancel) {
    this.setState({
      confirmMessage: {
        showing: true,
        titleText: titleText,
        bodyText: bodyText,
        buttonText: buttonText
      }
    }, () => {
      document.getElementById('confirm-ok-button').addEventListener('click', confirmAction);
      if (noCancel) {
        document.getElementById('confirm-cancel-button').style.display = 'none';
      }
    });
  }
  dismissConfirmModal() {
    document.getElementById('confirm-modal').classList.remove('confirm-modal-showing');
    this.setState({
      confirmMessage: {
        showing: false,
        titleText: '',
        bodyText: '',
        buttonText: {}
      }
    });
  }
  callUserInfoModal(selectedUserId) {
    this.setState({
      confirmMessage: {
        showing: true,
        titleText: titleText,
        bodyText: bodyText,
        buttonText: buttonText
      }
    }, () => {
      document.getElementById('confirm-ok-button').addEventListener('click', confirmAction);
    });
  }
  dismissUserInfoModal() {
    document.getElementById('user-info-modal').classList.remove('user-info-modal-showing');
    this.setState({
      selectedUser: {}
    });
  }
  handleClickAvatar(event) {
    if (document.getElementsByClassName('selected-avatar')[0]) {
      document.getElementsByClassName('selected-avatar')[0].classList.remove('selected-avatar');
    }
    event.target.classList.add('selected-avatar');
    let userStatusCopy = Object.assign({}, this.state.userStatus);
    let columnNumber = parseInt(event.target.id.split('-')[2]);
    userStatusCopy.avatarIndex = columnNumber;
    this.setState({
      userStatus: userStatusCopy
    });
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
    console.warn('clicked panel opponentName', opponentName);
    let opponentPanel = document.getElementById(`${opponentName}-panel`);
    let opponentSelectButton = document.getElementById(`${opponentName}-select-button`);
    opponentPanel.classList.add('panel-selected');
    opponentSelectButton.classList.add('disabled-select-button');
    Array.from(document.getElementById('opponent-select-area').children).map((panel, i) => {
      console.log('checking panel', panel.id);
      if (panel && panel.id.split('-')[0] !== opponentName) {
        let panelButton = document.getElementById(`${panel.id.split('-')[0]}-select-button`);
        panel.classList.remove('panel-selected');
        if (panelButton) {
          panelButton.classList.remove('disabled-select-button');
        }
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
        vsCPU: true,
        CPUOpponent: opponentName,
        playerNames: namesCopy,
        opponentDeck: opponentDeckCopy
      });
    }, this.state.options.flashInterval * 5);
    event.preventDefault();
  }

  handleClickMoreInfo(event) {
    event.preventDefault();
    console.log('clicked', event.target.id);
    let splitId = event.target.id.split('-');
    let id = parseInt(splitId[splitId.length - 1]);
    if (id === this.state.userStatus.cookieId) {
      this.handleClickAccountInfo();
    }

  }
  handleClickConfirmButton(event) {
    event.preventDefault();
    console.log('clicked', event.target.id);

  }
  handleClickCancelButton(event) {
    event.preventDefault();
    this.dismissConfirmModal();
    console.log('clicked', event.target.id);
  }
  handleClickCloseButton(event) {
    event.preventDefault();
    this.dismissUserInfoModal();
    console.log('clicked', event.target.id);
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
    // let introStyle = { display: 'flex' };
    let instructionsStyle = { display: 'none' };
    let optionsStyle = { display: 'none' };
    let hallOfFameStyle = { display: 'none' };
    // let opponentSelectStyle = { display: 'none' };
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
      // case 'selectingOpponent': opponentSelectStyle = { display: 'flex' }; break;
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
        <Header
          cardSize={this.state.cardSizes.cardSize}
          playerName={this.state.userStatus.loggedInAs}
          uniqueId={this.state.userStatus.cookieId}
          portraitSources={this.state.portraitSources}
          avatarIndex={this.state.userStatus.avatarIndex}
          onClickAccountArea={this.handleClickAccountInfo}
          userStatus={this.state.userStatus}
          onClickSignIn={this.handleClickSignIn}
          onClickLogOut={this.handleClickLogOut} />
        {/* {phase === 'splashScreen' && */}
        <IntroScreen style={introStyle}
          cardSize={this.state.cardSizes.cardSize}
          userAvatarSource={this.state.portraitSources.user}
          userAvatarIndex={this.state.userStatus.avatarIndex}
          onClickAvatar={this.handleClickAvatar}
          onClickStart={this.handleClickStart}
          onClickHow={this.handleClickHow}
          onClickOptions={this.handleClickOptions}
          onClickHallOfFame={this.handleClickHallOfFame}
          onFocusNameInput={this.handleNameInputFocus}
          onUnfocusNameInput={this.handleNameInputUnfocus}
          userStatus={this.state.userStatus}
        />
        {/* } */}
        {phase === 'showingInstructions' &&
          <InstructionsScreen style={instructionsStyle}
            onClickBack={this.handleClickBack} />
        }
        {/* {phase === 'splashScreen' || phase === 'showingOptions' && */}
        <OptionsScreen style={optionsStyle}
          currentOptions={this.state.options}
          onToggleOption={this.handleToggleOption}
          onClickBack={this.handleClickBack} />
        {/* } */}
        {phase === 'showingHallOfFame' &&
          <HallOfFameScreen style={hallOfFameStyle}
            highScores={this.state.highScores}
            userStatus={this.state.userStatus}
            onClickBack={this.handleClickBack}
            getNiceTimeFromSeconds={this.getNiceTimeFromSeconds} />
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
        {phase === 'selectingOpponent' &&
          <OpponentSelectScreen
            portraitSources={this.state.portraitSources}
            userStatus={this.state.userStatus}
            characters={this.characters}
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
          portraitSources={this.state.portraitSources}
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
          showing={phase === 'gameStarted'}
          onClickEndTurn={this.handleClickEndTurn}
          onClickStand={this.handleClickStand}
          onClickHamburger={this.handleClickHamburger}
          onClickSwitchSign={this.handleClickSwitchSign}
        />
        {/* {this.state.userStatus.loggedInAs && */}
        <HeaderMenu playerObject={this.state.userStatus}
          cardSize={this.state.cardSizes.cardSize}
          portraitSources={this.state.portraitSources}
          onClickSignIn={this.handleClickSignIn}
          onClickLogOut={this.handleClickLogOut}
          characters={this.characters} />
        {/* } */}
        {phase === 'gameStarted' &&
          <HamburgerMenu
            currentOptions={this.state.options}
            onClickHamburgerQuit={this.handleClickHamburgerQuit}
            onToggleOption={this.handleToggleOption} />
        }
        {this.state.confirmMessage.showing &&
          <ConfirmModal showing={this.state.confirmMessage.showing}
            messageData={this.state.confirmMessage}
            titleText={this.state.confirmMessage.titleText}
            bodyText={this.state.confirmMessage.bodyText}
            buttonText={this.state.confirmMessage.buttonText}
            onClickConfirmButton={this.handleClickConfirmButton}
            onClickCancelButton={this.handleClickCancelButton}
          />
        }
        <ResultModal onClickOKButton={this.handleClickOKButton}
          titleText={this.state.resultMessage.title}
          playerNames={this.state.playerNames}
          winner={this.state.resultMessage.winner}
          matchOver={(this.state.userWins === 3 || this.state.opponentWins === 3)}
          finalScores={{ user: this.state.userTotal, opponent: this.state.opponentTotal }}
          buttonText={this.state.resultMessage.buttonText} />


      </div>
    );
  }
}

export default App;