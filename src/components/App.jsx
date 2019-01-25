import React from 'react';
import Header from './Header';
import IntroScreen from './IntroScreen';
import OpponentSelectScreen from './OpponentSelectScreen';
import ControlFooter from './ControlFooter';
import InstructionsScreen from './InstructionsScreen';
import OptionsScreen from './OptionsScreen';
import HallOfFameScreen from './HallOfFameScreen';
import DeckSelectScreen from './DeckSelectScreen';
import GameBoard from './GameBoard';
import ResultModal from './ResultModal';
import ConfirmModal from './ConfirmModal';

let Util = require('../scripts/util');
let DB = require('../scripts/db');
let AI = require('../scripts/ai');
let characters = require('../scripts/characters');

const debug = false;

let clickFunction = window.PointerEvent ? 'onPointerDown' : window.TouchEvent ? 'onTouchStart' : 'onClick';
console.error('USING CLICK -------', clickFunction, ' ------------------------');

let initialSize = {
  width: window.innerWidth,
  height: window.innerHeight
};

const plusMinusSymbol = '±';
let lastGotRecords = 0;

const hideDebug = () => {
  event.target.removeEventListener('touchstart', hideDebug);
  event.target.remove();
};

const displayError = error => {
  document.getElementById('debug-touch-display').innerHTML = error;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.characters = characters.characters;
    this.state = {
      checkedCookie: false,
      lazyTime: [],
      vsCPU: true,
      CPUOpponent: 'jarjarbinks',
      lastWinner: null,
      lastFirstTurn: 'user',
      playerNames: {
        user: undefined,
        opponent: 'Jar Jar Binks'
      },
      phase: 'splashScreen',
      deck: [],
      cardSelection: [
        { id: 99, value: 1, type: '+' },
        { id: 98, value: 1, type: '+' },
        { id: 97, value: 2, type: '+' },
        { id: 96, value: 2, type: '+' },
        { id: 94, value: 3, type: '+' },
        { id: 93, value: 3, type: '+' },
        { id: 92, value: -1, type: '-' },
        { id: 91, value: -1, type: '-' },
        { id: 90, value: -2, type: '-' },
        { id: 89, value: -2, type: '-' },
        { id: 88, value: -3, type: '-' },
        { id: 87, value: -3, type: '-' },
        { id: 86, value: 1, type: plusMinusSymbol },
        { id: 85, value: 2, type: plusMinusSymbol },
        { id: 84, value: 3, type: plusMinusSymbol },
        { id: 83, value: 4, type: plusMinusSymbol },
        { id: 82, value: 5, type: plusMinusSymbol },
        { id: 81, value: 6, type: plusMinusSymbol }
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
        playerName: undefined,
        lastLogin: undefined,
        cookieId: undefined,
        initialValues: {
          avatarIndex: null,
        },
        avatarIndex: null,
        setWins: 0,
        totalSets: 0,
        matchWins: 0,
        totalMatches: 0,
        credits: 5633,
        cpuDefeated: [],
        messages: [],
        unreadMessages: 0
      },
      sounds: null,
      portraitSources: DB.portraitSources,
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
        turnInterval: 800,
        flashInterval: 90,
        opponentMoveWaitTime: 1600,
        moveIndicatorTime: 900,
        dealWaitTime: 600,
      },
      cardSizes: Util.getCardSizes(),
      inputHasFocus: true,
      keyboardShowing: false,
      highScores: this.getPlayerRecords().then((response) => {
        Util.checkCookie(this);
        // Util.sizeIntroButtons();
      }).catch((reason) => {
        console.error('getPlayerRecords failed because', reason);
      }),
    };

    this.delayEvents = {
      domLoaded: false,
      pageLoaded: false,
      postLoad1: false,
      postLoad2: false,
      postLoad3: false
    }

    this.postLoadDelays = [300, 1200, 2400];

    this.lazyTimeouts = [];
    this.lazyTimeouts[0] = setTimeout(() => {
      document.getElementById('footer').style.transform = 'none';
      this.delayEvents.postLoad1 = true;
      this.setState({
        lazyTime: [true]
      });
      console.log('lazy0 is at 00000000000000000000000000000000000------------ ', Date.now());
    }, this.postLoadDelays[0]);
    this.lazyTimeouts[1] = setTimeout(() => {
      this.delayEvents.postLoad2 = true;
      this.setState({
        lazyTime: [true, true]
      });
      document.getElementById('user-info-panel').style.transition = 'transform 300ms ease';
      console.log('lazy1 is at 11111111111111111111111111111111111------------ ', Date.now());
    }, this.postLoadDelays[1]);
    this.lazyTimeouts[2] = setTimeout(() => {
      this.delayEvents.postLoad3 = true;
      this.setState({
        lazyTime: [true, true, true]
      });
      console.log('lazy2 is at 22222222222222222222222222222222222------------ ', Date.now());
    }, this.postLoadDelays[2]);

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
    this.handleClickConfirmButton = this.handleClickConfirmButton.bind(this);
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this);
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this);
  }

  componentDidMount() {
    if (document.readyState === 'loading') {  // Loading hasn't finished yet
      document.addEventListener('DOMContentLoaded', () => {
        console.error('DDDDDOOOOOOOOOOOOOOOOOOOOOOOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM');
        this.delayEvents.domLoaded = true;
        if (debug) {
          Util.getPageLoadInfo();
          document.getElementById('debug-touch-display').style.display = 'block';
          displayError(`clickFunction: ${clickFunction}`);
        }
      });
      window.addEventListener('load', () => {
        console.error('LLOOOAODADDADODOODODLLDODOEEDEDDLDLDOOAOOLDALd');
        this.delayEvents.pageLoaded = true;

      });
    } else {  // `DOMContentLoaded` has already fired
      console.info('already loaded');
    }
    window.addEventListener('fullscreenchange', this.handleFullscreenChange);
    window.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('msfullscreenchange', this.handleFullscreenChange);

    document.getElementById('debug-display').addEventListener('click', hideDebug);
  }

  getTimeSinceFromSeconds(sessionLengthInSeconds) {
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
        if (minutes === 0 || wholeHours >= 6) {
          output = `${wholeHours} hour${hourPlural}`;
        } else {
          output = `${wholeHours} hour${hourPlural} ${minutes} min${minutePlural}`;
        }
      }
    } else {
      if (sessionMinutes === 0) {
        output = 'moments';
      } else {
        output = `${sessionMinutes} min${minutePlural}`;
      }
    }
    return output;
  }
  handleFullscreenChange() {
    let hamburgerWasOpen = false;
    if (document.getElementById('hamburger-menu')) {
      hamburgerWasOpen = document.getElementById('hamburger-menu').classList.contains('hamburger-on');
    }
    setTimeout(() => {
      // wait for the fullscreen change to be done
      let newSizes = Util.getCardSizes();
      let isFull = Util.isFullScreen() !== undefined;
      let cardHeightDiff = newSizes.cardSize.height - this.state.cardSizes.cardSize.height;
      let fullHeightDiff = initialSize.height - window.innerHeight;
      let readyToResizeContents = (isFull && fullHeightDiff < 0 && cardHeightDiff) || (!isFull && fullHeightDiff > 0 && cardHeightDiff);
      initialSize = { width: window.innerWidth, height: window.innerHeight };
      if (readyToResizeContents) {
        // document.getElementById('container').style.backgroundColor = 'green';
        this.setState({
          cardSizes: newSizes
        }, () => {
          if (hamburgerWasOpen) {
            document.getElementById('hamburger-menu').classList.add('hamburger-on');
          }
        });
      } else {
        // try again
        setTimeout(() => {
          newSizes = Util.getCardSizes();
          isFull = Util.isFullScreen() !== undefined;
          cardHeightDiff = newSizes.cardSize.height - this.state.cardSizes.cardSize.height;
          fullHeightDiff = initialSize.height - window.innerHeight;
          readyToResizeContents = (isFull && fullHeightDiff < 0 && cardHeightDiff) || (!isFull && fullHeightDiff > 0 && cardHeightDiff);
          initialSize = { width: window.innerWidth, height: window.innerHeight };
          if (readyToResizeContents) {
            newSizes = Util.getCardSizes();
            // document.getElementById('container').style.backgroundColor = 'yellow';
            this.setState({
              cardSizes: newSizes
            }, () => {
              if (hamburgerWasOpen) {
                document.getElementById('hamburger-menu').classList.add('hamburger-on');
              }
            });
          } else {
            // try again
            setTimeout(() => {
              newSizes = Util.getCardSizes();
              // document.getElementById('container').style.backgroundColor = 'red';
              this.setState({
                cardSizes: newSizes
              }, () => {
                if (hamburgerWasOpen) {
                  document.getElementById('hamburger-menu').classList.add('hamburger-on');
                }
              });
              initialSize = { width: window.innerWidth, height: window.innerHeight };
            }, 1000);
          }
        }, 500);
      }
    }, 500);
    // setTimeout(() => {
    //   document.getElementById('container').style.backgroundColor = 'var(--main-bg-color)';
    // }, 1400);
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
  getPlayerRecords() {
    let sinceLastGot = Date.now() - lastGotRecords;
    console.warn('--------- since got ----', sinceLastGot);
    if (sinceLastGot >= 60000) {
      console.error('RETRIEVING HIGH SCORES FROM DB!! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
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
            lastGotRecords = Date.now();
            resolve(playerRecordArray);
          });
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(this.state.highScores);
      });
    }
  }

  incrementPlayerTotalGames(playerName, type) {
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    eval(funcName)(playerName);
  }

  incrementPlayerScore(playerName, type) {
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    eval(funcName)(playerName);
  }

  playSound = (sound) => {
    if (this.state.options.sound) {
      console.warn(`playing ${sound}-sound`);
      // document.getElementById(`${sound}-sound`).play();
      this.state.sounds[sound].play();
    }
  }

  loadSounds = () => {
    console.error('### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###  LOADING SOUNDS ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ')
    let sounds = {
      click: new Audio('https://pazaak.online/assets/sounds/click.wav'),
      draw: new Audio('https://pazaak.online/assets/sounds/drawcard.wav'),
      turn: new Audio('https://pazaak.online/assets/sounds/startturn.wav'),
      lose: new Audio('https://pazaak.online/assets/sounds/lose.wav'),
      win: new Audio('https://pazaak.online/assets/sounds/win.wav')
    }
    this.setState({
      sounds: sounds
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
    //console.warn(`DEALING to ${player}`);
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
  handleClickLogOut(event) {
    if (event) {
      event.preventDefault();
    }
    this.callConfirmModal(
      'Log out?',
      `This will log you out permanently and delete all records of ${this.state.userStatus.loggedInAs}. All of your progress will be lost.`,
      { confirm: 'Do it', cancel: 'Never mind' },
      () => {
        // setting time limit to 0 destroys cookie
        let doomedId = this.state.userStatus.cookieId;
        Util.setCookie('username', `${this.state.userStatus.loggedInAs}||${doomedId}`, 0);
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
          DB.deleteUserRecord(doomedId).then((response) => {
            console.error('DELETED ' + doomedId);
          });
          // roll up header menu
          let userPanel = document.getElementById('user-info-panel');
          let settingsIcon = document.getElementById('user-account-icon');
          let cornerArea0 = document.getElementById('corner-button-area');
          cornerArea0.style.backgroundColor = 'transparent';
          cornerArea0.style.border = '0';
          settingsIcon.classList.remove('corner-button-on');
          userPanel.classList.add('user-info-panel-off');
          // setTimeout(() => {
          //   document.getElementById('header').classList.remove('no-bottom-border');
          // }, 350);
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
      if (this.state.sounds === null && optionsCopy.sound) {
        this.loadSounds();
      }
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
    // resolves a string of unique Guest-XXX name
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

  evaluatePlayerName(enteredName) {
    console.warn('calling evaluatePlayerName -------------------------------------->');
    let uniqueId = this.state.userStatus.cookieId;
    let userStatusCopy = Object.assign({}, this.state.userStatus);

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
            // document.getElementById('initial-loading-message').innerHTML += `<div class='loading-event-text'>User recognized as</div><div class='loading-event-text green-text'>${enteredName}</div>`;

            let playerObj = Object.assign({}, response.data[playerIndex]);
            let oldOptionsArr = Object.values(this.state.options);
            let newOptionsArr = Object.values(JSON.parse(playerObj.preferences));
            console.warn('GOT playerObj', newOptionsArr);
            console.warn('already had', oldOptionsArr);
            let nonDefaultOptions = false;

            newOptionsArr.map((option, i) => {
              if (oldOptionsArr[i] !== option) {
                console.log(`${option} don't match no ${oldOptionsArr[i]}`);
                nonDefaultOptions = true;
              }
            });

            console.warn('DB options different than default?', nonDefaultOptions);
            playerObj.cpuDefeated = JSON.parse(playerObj.cpuDefeated);
            //console.error(`Cookie recognized! Logging in player as ${playerObj.playerName}, recording into state.userStatus, highlighting avatar ${playerObj.avatarIndex} and scrolling into view.`);
            playerObj.loggedInAs = playerObj.playerName;
            playerObj.cookieId = playerObj.id;

            //document.getElementById(`avatar-thumb-${playerObj.avatarIndex}`).scrollIntoView({ inline: 'center' });
            //document.getElementById('avatar-row').style.opacity = 1;
            console.log('checkedCookie at 00000000000000000000000000000000000------------ ', Date.now());
            if (nonDefaultOptions) {
              if (this.state.sounds === null && playerObj.preferences.sound) {
                this.loadSounds();
              }
              playerObj.preferences = JSON.parse(playerObj.preferences);
              this.setState({
                userStatus: playerObj,
                checkedCookie: true,
                options: playerObj.preferences
              }, () => {
                this.applyStateOptions('on');
              });
            } else {
              console.warn('NOT setting options from DB.');
              this.setState({
                userStatus: playerObj,
                checkedCookie: true,
              });
            }
          }
        } else {
          // would this ever occur??
          console.error(`at evaluatePlayerName (NEEDED?): No entry in DB for ${enteredName}.`);
        }
      });
    } else {
      //console.error('called evaluatePlayerName without a state.userStatus.cookieId. >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      //console.error('calling DB.saveUser()', enteredName, this.state.userStatus.avatarIndex);
      let optionsString = JSON.stringify(this.state.options);
      //console.error('saving with options string', optionsString);
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
            userStatus: userStatusCopy,
            checkedCookie: true
          }, () => {
            console.error('calling evaluatePlayerName a second time');
            this.evaluatePlayerName(enteredName);
          });
        });
      });
    }
  }
  handleClickAccountInfo() {
    let userPanel = document.getElementById('user-info-panel');
    let settingsIcon = document.getElementById('user-account-icon');
    // let settingsIcon = document.getElementById('corner-button-area');
    if (userPanel.classList.contains('user-info-panel-off')) {
      settingsIcon.classList.add('corner-button-on');
      userPanel.classList.remove('user-info-panel-off');
    } else {
      settingsIcon.classList.remove('corner-button-on');
      userPanel.classList.add('user-info-panel-off');
    }

  }
  handleClickStart(event) {
    event.preventDefault();
    if (this.lazyTimeouts.map) {
      this.lazyTimeouts.map(timeout => {
        clearTimeout(timeout);
      });
    }
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
        userStatusCopy.playerName = enteredName;
        this.setState({
          userStatus: userStatusCopy,
          phase: 'selectingOpponent',
          lazyTime: [true, true, true]
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
                  playerNames: namesCopy,
                  lazyTime: [true, true, true]
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

        namesCopy.user = enteredName;
        // setTimeout(() => {
        this.setState({
          phase: 'selectingOpponent',
          playerNames: namesCopy,
          lazyTime: [true, true, true]
        }, () => {
          DB.updateLastLoginTime(userStatusCopy.cookieId).then(() => {
          });
        });
        // }, this.state.options.flashInterval);

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
    this.setState({
      phase: newPhase
    });
  }
  handleClickHow(event) {
    // this.playSound('click');
    // window.open('https://starwars.wikia.com/wiki/Pazaak/Legends', '_blank');
    event.preventDefault();
    // setTimeout(() => {
    this.setState({
      phase: 'showingInstructions'
    });
    // }, this.state.options.flashInterval);
  }
  handleClickOptions(event) {
    console.error('CLICKED OPTIONS');
    //console.error('OPTIONS -------------------------------------------------------', event);
    // this.playSound('click');
    event.preventDefault();
    // setTimeout(() => {
    this.setState({
      phase: 'showingOptions'
    });
    // }, this.state.options.flashInterval);
  }
  handleClickHallOfFame(event) {
    event.preventDefault();
    // this.playSound('click');
    document.getElementById('hall-of-fame-button').classList.add('loading-message');
    this.getPlayerRecords().then((response) => {
      this.setState({
        highScores: response
      }, () => {
        this.setState({
          phase: 'showingHallOfFame'
        });
        document.getElementById('hall-of-fame-button').classList.remove('loading-message');

      });
    });

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
  handleClickCard(elementId, value, type, inDeck) {
    // SELECTING DECK
    let target = event.target || document.getElementById(elementId);
    console.warn('target', target);
    let cardId = parseInt(elementId.split('-').reverse()[0]);
    console.log('cardId', cardId);
    if (this.state.phase === 'selectingDeck') {
      if (!inDeck) {
        // it's a selection card, so put it in player deck
        if (this.state.userDeck.length < 10) {
          // there's room still
          if (!this.arrayContainsCardWithId(this.state.userDeck, cardId)) {
            // it's not there already
            let deckCopy = this.state.userDeck.slice();
            let newElementId = elementId.split('-').slice(1, 3).join('-');
            let newCard = { id: cardId, value: value, type: type, elementId: newElementId, inDeck: true };
            deckCopy.push(newCard);
            console.warn('pushed new card id', cardId);
            console.warn('pushed new card elementId', newElementId);
            console.warn('length is now', deckCopy.length);
            target.style.opacity = 0.1;
            this.setState({
              userDeck: deckCopy
            });
          }
        }
      } else {
        // it's already in the player deck, so take it out        
        let deckCopy = this.state.userDeck.slice();
        console.log('deckCopy before taking out...', deckCopy);
        console.log('elementId before taking out...', cardId);
        let indexToRemove = this.getCardIndexById(deckCopy, cardId);
        // if (deckCopy.length === 1 || indexToRemove === -1) {
        //   indexToRemove = 0;
        //   console.error('got -1, so changed to 0')
        // } else {
        //   console.log('found that it\'s index...', indexToRemove)
        // }
        let selectionHomeId = 'selection-' + elementId;
        console.warn('sending back to', selectionHomeId);
        console.warn('removing index from user deck:', indexToRemove);
        document.getElementById(selectionHomeId).style.opacity = 1;
        console.warn('illumnated original selected', selectionHomeId);
        deckCopy.splice(indexToRemove, 1);
        console.warn('length is now', deckCopy.length);
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
        if (!target.classList.contains('highlighted-card')) {
          // card clicked is not highlighted
          target.classList.add('highlighted-card');
          // unhighlight currently highlighted card, if it exists
          if (this.state.turnStatus.user.highlightedCard.element) {
            this.state.turnStatus.user.highlightedCard.element.classList.remove('highlighted-card');
          }
          // add highlighted card to state
          let turnStatusCopy = Object.assign({}, this.state.turnStatus);
          turnStatusCopy.user.highlightedCard.element = target;
          turnStatusCopy.user.highlightedCard.obj = { id: target.id, value: value, type: type };
          this.setState({
            turnStatus: turnStatusCopy
          });
          // show the switch sign button...
          document.getElementById('switch-sign-button').classList.remove('hidden-button');
          let cardObj = this.state.userHand[this.getCardIndexById(this.state.userHand, target.id)];
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
          target.classList.remove('highlighted-card');
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
    arr.map((card) => {
      if (card.id === id) {
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
    let match = -1;
    arr.forEach((card, i) => {
      console.log('---------------------------- checking card', card);
      if (card.id === id) {
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
    let newRandomDeck = [];
    selectionCopy.map((selectionCard, i) => {
      let newElementId = `card-${selectionCard.id}`;
      let newCard = { id: selectionCard.id, value: selectionCard.value, type: selectionCard.type, elementId: newElementId, inDeck: true };
      if (i < 10) {
        console.log('made new ', newCard);
        newRandomDeck.push(newCard);
        document.getElementById(`selection-${newCard.elementId}`).style.opacity = 0.1;
      } else {
        document.getElementById(`selection-${newCard.elementId}`).style.opacity = 1;
      }
    });
    // for (let i = 0; i < 10; i++) {
    //   let deckCard = selectionCopy[i];
    //   console.log('checking deckCard', deckCard);

    //   // let newCard = { id: deckCard, value: deckCard.value, type: deckCard.type, elementId: `card-${deckCard.id}` };
    //   let newElementId = `card-${deckCard.id}`
    //   let newCard = { id: deckCard.id, value: deckCard.value, type: deckCard.type, elementId: newElementId, inDeck: true };
    //   console.log('made new ', newCard)
    //   newRandomDeck.push(newCard);

    // }
    this.setState({
      userDeck: newRandomDeck
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
      // middleBar.style.transform = middleBar2.style.transform = 'rotate(0) scaleX(1)';
      middleBar.style.transform = middleBar2.style.transform = 'none';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 1;
        // un-collapse top and bottom bars from middle
        // topBar.style.transform = bottomBar.style.transform = 'translateY(0%)';
        topBar.style.transform = bottomBar.style.transform = 'none';
      }, 150);
    } else {
      // collapse top and bottom bars to middle
      topBar.style.transform = 'translateY(225%)';
      bottomBar.style.transform = 'translateY(-225%)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 0;
        // rotate middle bars to an X shape
        middleBar.style.transform = 'rotate(40deg) scaleX(1.1)';
        middleBar2.style.transform = 'rotate(-40deg) scaleX(1.1)';
      }, 150);
    }
    // if (position === 'hamburger') {
    //   // un-rotate middle bars to flat
    //   middleBar.classList.add('mid-1-to-ham');
    //   middleBar.classList.remove('mid-1-to-x');
    // } else {
    //   middleBar.classList.add('mid-1-to-x');
    //   middleBar.classList.remove('mid-1-to-ham');
    //   // middleBar.classList.add('mid-1-to-ham');      
    // }
    // setTimeout(() => {
    //   middleBar.classList.remove('mid-1-to-x');
    //   middleBar.classList.remove('mid-1-to-ham');
    // }, 400)
  }
  handleClickHamburger() {
    if (!document.getElementById('hamburger-menu').classList.contains('hamburger-on')) {
      // if (!document.getElementById('hamburger-menu').classList.contains('hamburger-slide-in')) {
      // document.getElementById('hamburger-menu').classList.add('hamburger-slide-in');
      // document.getElementById('hamburger-menu').classList.remove('hamburger-slide-out');

      requestAnimationFrame(() => this.toggleHamburgerAppearance('close'));
      document.getElementById('hamburger-menu').classList.add('hamburger-on');

    } else {
      // document.getElementById('hamburger-menu').classList.add('hamburger-slide-out');
      // document.getElementById('hamburger-menu').classList.remove('hamburger-slide-in');

      requestAnimationFrame(() => this.toggleHamburgerAppearance('hamburger'));
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');

    }
  }

  handleClickOpponentPanel(opponentName) {
    //event.preventDefault();
    document.getElementById(`${opponentName}-panel`).classList.add('panel-selected');
    document.getElementById(`${this.state.CPUOpponent}-panel`).classList.remove('panel-selected');
    document.getElementById(`${opponentName}-select-button`).classList.add('disabled-select-button');
    document.getElementById(`${this.state.CPUOpponent}-select-button`).classList.remove('panel-selected');
    setTimeout(() => {
      let namesCopy = Object.assign({}, this.state.playerNames);
      namesCopy.opponent = this.characters[opponentName].displayName;
      let opponentDeckCopy = Util.shuffle(this.characters[opponentName].deck);
      // let opponentDeckCopy = this.characters[opponentName].deck;
      this.setState({
        CPUOpponent: opponentName,
        playerNames: namesCopy,
        opponentDeck: opponentDeckCopy
      });
    }, 150);

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
    this.callConfirmModal(
      'Quit match?',
      'You will forfeit and your progress will be lost.',
      { confirm: 'Do it', cancel: 'Never mind' },
      () => {
        document.getElementById('hamburger-menu').classList.remove('hamburger-on');
        this.resetBoard('user', true);
        this.dismissConfirmModal();
        // setTimeout(() => {
        // this.toggleHamburgerAppearance('hamburger');
        // }, 400);
      }
    );

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
    indicator.classList.remove('indicator-on');
    void indicator.offsetWidth;
    indicator.classList.add('indicator-on');

    // indicator.style.opacity = 1;
    // indicator.style.transform = 'scaleX(1.1)';
    // setTimeout(() => {
    //   indicator.style.transform = 'scaleX(1)';
    //   setTimeout(() => {
    //     indicator.style.opacity = 0;
    //   }, duration - 200);
    // }, 200);
    // setTimeout(() => {
    //   indicator.classList.remove('indicator-on');      
    // }, 1000);

  }
  render() {
    let phase = this.state.phase;
    let onIntroPhase = (phase === 'showingOptions' || phase === 'showingInstructions' || phase === 'showingHallOfFame');
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
    // let optionsStyle = { display: 'none' };
    // let introStyle = { display: 'flex' };
    // let instructionsStyle = { display: 'none' };
    // let hallOfFameStyle = { display: 'none' };
    // let opponentSelectStyle = { display: 'none' };
    let deckSelectStyle = { display: 'none' };
    switch (phase) {
      case 'splashScreen': {
        introStyle = { display: 'flex' };
        break;
      }
      // case 'selectingOpponent': opponentSelectStyle = { display: 'flex' }; break;
      case 'selectingDeck': deckSelectStyle = { display: 'flex' }; break;

      // case 'showingHallOfFame': hallOfFameStyle = { display: 'flex' }; break;

      // case 'showingInstructions': instructionsStyle = { display: 'flex' }; break;
      // case 'showingOptions': options = { display: 'flex' }; break;
      case 'gameStarted':
        gameBoardStyle.display = 'flex';
      // footerStyle = { pointerEvents: 'all', opacity: 1, position: 'relative', bottom: '0' }; break;
    }
    let characterArray = [];
    Object.keys(this.characters).map((entry, i) => {
      characterArray[i] = this.characters[entry];
    });

    let charactersToList = characterArray;

    // let lazyTimings = this.state.lazyTime;
    let lazyTimings = this.delayEvents
    // let lazyTime1 = lazyTimings[0];
    // let lazyTime2 = lazyTimings[1];
    // let lazyTime3 = lazyTimings[2];
    let domLoaded = this.delayEvents.domLoaded;
    let pageLoaded = this.delayEvents.pageLoaded;
    let lazyTime1 = this.delayEvents.postLoad1
    let lazyTime2 = this.delayEvents.postLoad2
    let lazyTime3 = this.delayEvents.postLoad3
    return (
      <div id='container'>

        <div id='debug-display' />
        <div id='debug-touch-display'>fuck cock</div>
        <Header
          cardSize={this.state.cardSizes.cardSize}
          readyToFill={this.delayEvents.postLoad1}
          userStatus={this.state.userStatus}
          playerName={this.state.userStatus.playerName}
          uniqueId={this.state.userStatus.cookieId}
          avatarIndex={this.state.userStatus.avatarIndex}
          onClickAccountArea={this.handleClickAccountInfo}
          onClickSignIn={this.handleClickSignIn}
          onClickLogOut={this.handleClickLogOut}
          clickFunction={clickFunction} />
        {/* {(phase === 'splashScreen' || phase === 'showingOptions' || phase === 'showingInstructions' || phase === 'showingHallOfFame') && */}
        {(phase === 'splashScreen' || phase === 'selectingOpponent' || onIntroPhase) &&
          <IntroScreen style={introStyle}
            phase={phase}
            readyToShow={pageLoaded}
            cardSize={this.state.cardSizes.cardSize}
            userAvatarIndex={this.state.userStatus.avatarIndex}
            onClickAvatar={this.handleClickAvatar}
            onClickStart={this.handleClickStart}
            onClickHow={this.handleClickHow}
            onClickOptions={this.handleClickOptions}
            onClickHallOfFame={this.handleClickHallOfFame}
            onClickLogOut={this.handleClickLogOut}
            userStatus={this.state.userStatus}
            clickFunction={clickFunction}
          />
        }
        {(this.state.checkedCookie && phase === 'showingInstructions') &&
          <InstructionsScreen
            onClickBack={this.handleClickBack}
            clickFunction={clickFunction} />
        }
        {(this.state.checkedCookie && (phase === 'showingOptions')) &&
          <OptionsScreen
            currentOptions={this.state.options}
            onToggleOption={this.handleToggleOption}
            onClickBack={(event) => { this.handleClickBack(event, 'splashScreen'); }}
            clickFunction={clickFunction} />
        }
        {(this.state.checkedCookie && (phase === 'splashScreen' || phase === 'selectingOpponent' || onIntroPhase)) &&
          <HallOfFameScreen
            phase={phase}
            readyToList={lazyTime2}
            highScores={this.state.highScores}
            userStatus={this.state.userStatus}
            onClickBack={this.handleClickBack}
            getTimeSinceFromSeconds={this.getTimeSinceFromSeconds}
            clickFunction={clickFunction} />
        }
        {/* {(this.state.checkedCookie && (phase === 'selectingDeck' || phase === 'selectingOpponent')) && */}
        {(this.state.checkedCookie && (phase === 'selectingDeck')) &&
          <DeckSelectScreen style={deckSelectStyle}
            cardSelection={this.state.cardSelection}
            userDeck={this.state.userDeck}
            onClickRandomize={this.handleClickRandomize}
            onClickPlay={this.handleClickPlay}
            onClickCard={this.handleClickCard}
            onClickBack={this.handleClickBack}
            cardSizes={this.state.cardSizes}
            clickFunction={clickFunction} />
        }
        {/* {(phase === 'splashScreen' || phase === 'selectingOpponent') && */}
        {pageLoaded && (phase === 'splashScreen' || phase === 'selectingOpponent' || phase === 'selectingDeck' || onIntroPhase) &&
          // {lazyTime1 &&
          <OpponentSelectScreen phase={phase}
            readyToList={lazyTime2}
            portraitSources={this.state.portraitSources}
            characters={this.characters}
            characterArray={charactersToList}
            opponentSelected={this.state.CPUOpponent}
            cardSize={microCardSize}
            onClickPanel={this.handleClickOpponentPanel}
            onClickOpponentReady={this.handleClickOpponentReady}
            onClickBack={this.handleClickBack}
            clickFunction={clickFunction} />
        }
        {(this.state.checkedCookie && phase === 'gameStarted') &&
          <ResultModal onClickOKButton={this.handleClickOKButton}
            titleText={this.state.resultMessage.title}
            playerNames={this.state.playerNames}
            winner={this.state.resultMessage.winner}
            matchOver={(this.state.userWins === 3 || this.state.opponentWins === 3)}
            finalScores={{ user: this.state.userTotal, opponent: this.state.opponentTotal }}
            buttonText={this.state.resultMessage.buttonText}
            clickFunction={clickFunction} />
        }
        {lazyTime2 && (phase === 'gameStarted') &&
          <GameBoard style={gameBoardStyle}
            phase={phase}
            playerNames={{ user: this.state.userStatus.playerName, opponent: this.state.playerNames.opponent }}
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
            onClickCard={this.handleClickCard}
            clickFunction={clickFunction} />
        }
        {(this.state.checkedCookie && phase === 'gameStarted') &&
          <ControlFooter
            showing={phase === 'gameStarted'}
            cardSize={this.state.cardSizes.cardSize}
            currentOptions={this.state.options}
            onClickHamburgerQuit={this.handleClickHamburgerQuit}
            onToggleOption={this.handleToggleOption}
            onClickEndTurn={this.handleClickEndTurn}
            onClickStand={this.handleClickStand}
            onClickHamburger={this.handleClickHamburger}
            onClickSwitchSign={this.handleClickSwitchSign}
            clickFunction={clickFunction}
          />
        }
        {/* {phase === 'gameStarted' &&
          <HamburgerMenu
            borderSize={parseInt(this.state.cardSizes.cardSize.badgeRadius)}
            borderRadiusSize={parseInt(this.state.cardSizes.cardSize.arrowBorderSize)}
            currentOptions={this.state.options}
            onClickHamburgerQuit={this.handleClickHamburgerQuit}
            onToggleOption={this.handleToggleOption} />
          
        } */}
        {(this.state.checkedCookie && this.state.confirmMessage.showing) &&
          <ConfirmModal showing={this.state.confirmMessage.showing}
            messageData={this.state.confirmMessage}
            buttonText={this.state.confirmMessage.buttonText}
            onClickConfirmButton={this.handleClickConfirmButton}
            onClickCancelButton={this.handleClickCancelButton}
            clickFunction={clickFunction}
          />
        }

        {/* <img id='avatar-sheet' src='https://pazaak.online/assets/images/avatarsheet.jpg' style='display: none' /> */}

      </div>
    );
  }
}

export default App;