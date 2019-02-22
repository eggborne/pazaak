import React from 'react';
import HeaderMenu from './HeaderMenu';
import Header from './Header';
import IntroScreen from './IntroScreen';
import OpponentSelectScreen from './OpponentSelectScreen';
import ControlFooter from './ControlFooter';
import HamburgerMenu from './HamburgerMenu';
import InstructionsScreen from './InstructionsScreen';
import OptionsScreen from './OptionsScreen';
import HallOfFameScreen from './HallOfFameScreen';
import DeckSelectScreen from './DeckSelectScreen';
import GameBoard from './GameBoard';
import ResultModal from './modals/ResultModal';
import ConfirmModal from './modals/ConfirmModal';
import ModeSelectScreen from './ModeSelectScreen';
import VersusScreen from './VersusScreen';
import Toast from './modals/Toast';
let DB = require('../scripts/db');
// import * as DB from '../scripts/db';
import * as AI from '../scripts/ai';
import * as Util from '../scripts/util';
import { characters } from '../scripts/characters';
import { EventEmitter } from 'events';

let clickFunction = window.PointerEvent ? 'onPointerDown' : window.TouchEvent ? 'onTouchStart' : 'onClick';

console.error('USING CLICK -------', clickFunction, ' ------------------------');

const ROOT = document.documentElement;
const DEVICE_PIXEL_RATIO = window.devicePixelRatio;
const RULES = {
  cardRatio: {
    min: 1.475,
    max: 1.525
  }
};

let sounds = {};

let lastGotRecords = 0;
let fullScreenAttempts = 3;
let lastResize = 0;

const hideDebug = () => {
  event.target.removeEventListener('touchstart', hideDebug);
  event.target.remove();
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debug: false,
      checkedCookie: false,
      lazyTime: [],
      gameMode: 'campaign',
      vsCPU: true,
      cpuOpponent: 'jarjarbinks',
      lastWinner: null,
      lastFirstTurn: 'user',
      playerNames: {
        user: undefined,
        opponent: 'Jar Jar Binks'
      },
      initialValues: {
        viewWidth: window.innerWidth,
        viewHeight: window.innerHeight,
        outerHeight: window.outerHeight
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
        { id: 86, value: 1, type: '±' },
        { id: 85, value: 2, type: '±' },
        { id: 84, value: 3, type: '±' },
        { id: 83, value: 4, type: '±' },
        { id: 82, value: 5, type: '±' },
        { id: 81, value: 6, type: '±' }
      ],
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
          avatarIndex: null
        },
        avatarIndex: null,
        setWins: 0,
        totalSets: 0,
        matchWins: 0,
        totalMatches: 0,
        credits: 200,
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
      toastMessage: 'Suck a cock.',
      options: {
        sound: false,
        soundVolume: 1,
        ambience: false,
        ambienceVolume: 1,
        music: false,
        musicVolume: 0.75,
        turnSpeed: 0.2,
        panelSize: 0.5,
        quickTurns: false,
        headerVisible: true,
        darkTheme: false,
        solidBackground: false,
        backgroundColor: 'rgba(255, 121, 138, 1)',
        panelColor: 'rgba(255, 0, 0, 1)',
        panelShade: 0.4,
        autoStand: false,
        darkCards: false,
        fullScreen: false,
        turnInterval: 800,
        gameStartDelay: 2000,
        flashInterval: 90,
        opponentMoveWaitTime: 1600,
        moveIndicatorTime: 900,
        dealWaitTime: 600,
        animatedStarfield: true,
      },
      inputHasFocus: true,
      keyboardShowing: false,
      highScores: this.getPlayerRecords()
        .then(response => {
          Util.checkCookie(this);
        }),
      lastWidth: window.innerWidth,
      lastHeight: window.innerHeight,
      lastChangedSlider: 0
    };

    this.delayEvents = {
      domLoaded: false,
      pageLoaded: false,
      postLoad1: false,
      postLoad2: false,
      postLoad3: false
    };

    this.postLoadDelayTimes = [300, 1200, 2400];

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
    this.state.deck = this.shuffleDeck(deck);
  }

  displayError = error => {
    //document.getElementById('debug-touch-display').innerHTML += '<p>' + error + '</p>';
  };

  componentDidMount() {
    // if (this.state.options.ambience) {
    //   document.getElementById('ambience').play();
    // }
    console.big('App MOUNTED.', 'white');    
    this.lazyTimeouts = [];
    this.lazyTimeouts[0] = setTimeout(() => {
      // document.getElementById('footer').style.transform = 'none';
      this.delayEvents.postLoad1 = true;
      this.setState({
        lazyTime: [true]
      });
      console.big('LAZY 0', 'yellow');
    }, this.postLoadDelayTimes[0]);
    this.lazyTimeouts[1] = setTimeout(() => {
      this.delayEvents.postLoad2 = true;
      this.setState({
        lazyTime: [true, true]
      });
      if (this.state.headerVisible) {
        document.getElementById('header').classList.remove('intact');
      }
      console.big('LAZY 1', 'orange');
    }, this.postLoadDelayTimes[1]);
    this.lazyTimeouts[2] = setTimeout(() => {
      this.delayEvents.postLoad3 = true;
      this.setState({
        lazyTime: [true, true, true]
      });
      console.big('LAZY 2', 'lightgreen');      
      
    }, this.postLoadDelayTimes[2]);

    

    

    if (document.readyState === 'loading') {
      // Loading hasn't finished yet
      
      setTimeout(() => {
        document.getElementById('starfield').style.opacity = 1;
      }, 2);
      document.addEventListener('DOMContentLoaded', () => {           
        console.big('DOM LOADED');        
        this.sizeCards();
        this.delayEvents.domLoaded = true;


        // setTimeout(() => {
        //   document.getElementById('starfield').style.opacity = 1;
        // }, 2);

        // if (this.state.debug) {
        //   Util.getPageLoadInfo();
        //   this.displayError(
        //     `<p>|</p><p>at DOM LOADED: ------------------> <p>DEVICE_PIXEL_RATIO: ${DEVICE_PIXEL_RATIO}</p><p> innerW: ${window.innerWidth} innerH: ${window.innerHeight} - outerH ${
        //       window.outerHeight
        //     } - scrH ${window.screen.height} scrAv - ${window.screen.availHeight} body rect (${document.body.getBoundingClientRect().width}, ${
        //       document.body.getBoundingClientRect().height
        //     }) - body offsetHeight ${document.body.offsetHeight} <p>-</p><p>-</p>`
        //   );
        // }
      });
      window.addEventListener('load', () => {
        console.big('PAGE LOADED');
        this.delayEvents.pageLoaded = true;
        
      });
    } else {
      // `DOMContentLoaded` has already fired
      console.info('already loaded at App mount');
    }
    window.addEventListener('fullscreenchange', this.handleFullscreenChange);
    window.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    window.addEventListener('msfullscreenchange', this.handleFullscreenChange);

    // window.addEventListener('resize', this.sizeCards);

    //debug ? document.getElementById('debug-display').addEventListener('click', hideDebug) : null;
  }

  sizeCards = () => {
    let cardRatio = 1.4;
    let newWidth;
    let newHeight;
    let extraX;
    let extraY;
    let availableHeight = window.innerHeight;
    if (document.getElementById('intro-screen-body') && (this.state.phase === 'splashScreen' || this.state.phase === 'showingOptions')) {
      availableHeight = document.getElementById('intro-screen-body').getBoundingClientRect().height;
    } else if (this.state.phase === 'gameStarted') {
      availableHeight = document.getElementById('game-board').offsetHeight;
    }
    availableHeight = document.getElementById('content-area').getBoundingClientRect().height;
    let availableWidth = window.innerWidth;
    // assume the ideal situation (room for both maximum card width and height at 1:1)
    let perfectWidth = availableWidth / 5.55;
    // let perfectHeight = availableHeight / 7.8;
    let perfectHeight = availableHeight / 6.5;

    //this.callToast('availheight ' + availableHeight, 'vertical');

    let proposedRatio = perfectHeight / perfectWidth;

    // keep ratio within RULES.range if the cards are violating
    if (proposedRatio < RULES.cardRatio.min) {
      cardRatio = RULES.cardRatio.min;
    } else if (proposedRatio > RULES.cardRatio.max) {
      cardRatio = RULES.cardRatio.max;
    }

    // test the new ratio

    // try keeping perfectWidth and changing height
    newHeight = perfectWidth * cardRatio;

    // see if height is too great
    let cardsPerHeight = availableHeight / newHeight;
    if (cardsPerHeight > 8) {
      // it fits... but check the extra space?
      extraY = availableHeight - newHeight * 5;
    } else {
      newHeight = perfectHeight;
      newWidth = newHeight / cardRatio;
    }

    // see if width is too great
    newWidth = perfectHeight / cardRatio;
    let cardsPerWidth = window.innerWidth / newWidth;
    if (cardsPerWidth > 5.6) {
      extraX = window.innerWidth - newWidth * 5.6;
    } else {
      newWidth = perfectWidth;
      newHeight = newWidth * cardRatio;
    }

    if (extraX && extraY) {
      console.log('both extraX and extraY?? >>>>>>>>>>>>>>>>>');
    }
    newWidth ? ROOT.style.setProperty('--normal-card-width', `${newWidth}px`) : null;
    newHeight ? ROOT.style.setProperty('--normal-card-height', `${newHeight}px`) : null;
  };
  handleResize = () => {
    if (!lastResize || window.performance.now() - lastResize > 5000) {
      // this.sizeCards();
      lastResize = window.performance.now();
    }
  };
  createRandomDeck = () => {
    let deck = [];
    for (let i = 0; i < 10; i++) {
      let type = '+';
      if (!Util.randomInt(0, 2)) {
        type = '-';
      }
      let value = Util.randomInt(1, 6);
      let newCardObj = {
        id: i,
        value: value,
        type: type,
        inDeck: true
      };
      deck.push(newCardObj);
    }
    return deck;
  }
  getRandomOpponent = () => {
    let upperLimit = 18;
    if (!Util.randomInt(0, 4)) {
      upperLimit = Object.keys(characters).length - 1;
    }
    let characterArray = Object.keys(characters).slice(16, upperLimit);
    let rando = characterArray[Util.randomInt(0, characterArray.length - 1)];
    return rando;
  }
  handleFullscreenChange = () => {
    console.log('calling handleFullscreenChange with fullScreenAttempts', fullScreenAttempts);
    if (fullScreenAttempts === 2) {
      document.getElementById('header').style.backgroundColor = 'yellow';
    }
    if (fullScreenAttempts === 1) {
      document.getElementById('header').style.backgroundColor = 'blue';
    }
    this.checkIfViewHeightChangedInMs(250).then(changed => {
      let currentHeight = window.innerHeight;
      console.log(`##################### ------------------ CHANGED from ${this.state.lastHeight} to ${currentHeight}`);
      console.log('after initial checkIfViewHeightChangedInMs promise, changed is: --> ' + changed);
      let full = Util.isFullScreen() ? true : false;
      let newOptions = { ...this.state.options };
      console.log(`############ now full? ${full}`);
      newOptions.fullScreen = full
      if (changed) {
        this.setState({
          options: newOptions
        }, () => {
            this.forceUpdate();
          // setTimeout(this.sizeCards, 500)
        });
      }
    });
  };

  checkIfViewHeightChangedInMs = waitTime => {
    fullScreenAttempts--;
    let attempt = new Promise(resolve => {
      setTimeout(() => {
        let currentHeight = window.innerHeight;
        let viewChanged = currentHeight !== this.state.lastHeight;
        let completelyOff = currentHeight === this.state.initialValues.viewHeight;
        let completelyOn = currentHeight > this.state.initialValues.outerHeight;
        if (!completelyOff && !completelyOn) {
          console.green(currentHeight + ' is not > current window.outerHeight ' + window.outerHeight + ' or === this.state.initialValues.viewHeight ' + this.state.initialValues.viewHeight);
        }
        if (viewChanged) {
          this.setState(
            {
              lastHeight: currentHeight,
            },
            () => {
              setTimeout(this.sizeCards, 250)
              fullScreenAttempts = 3;
            });
          resolve(viewChanged);
        } else {
          if (fullScreenAttempts > 0) {
            this.checkIfViewHeightChangedInMs(250);
          }
          console.log('////////// not changed yet!! fullScreenAttempts now --> ', fullScreenAttempts);
          resolve(viewChanged);
        }
      }, waitTime);
    });
    return attempt;
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('APP UPDATED....................');
  }

  handleShadeClick = () => {
    if (this.state.phase === 'gameStarted') {
      if (document.getElementById('hamburger-menu').classList.contains('hamburger-on')) {
        this.handleClickHamburger();
      }
    }
    if (!document.getElementById('user-info-panel').classList.contains('user-info-panel-off')) {
      this.handleClickAccountInfo();
    }
  };

  handleClickSelectMode = () => {
    if (this.state.gameMode === 'campaign') {
      this.setState({
        phase: 'selectingOpponent'
      })
    } else {
      let randomDeck = this.createRandomDeck();
      let randomOpponent = this.getRandomOpponent();
      let namesCopy = { ...this.state.playerNames };
      if (randomOpponent === 'random' || randomOpponent === 'random2') {
        let randomName = Util.getStarWarsName();
        characters[randomOpponent].name = randomOpponent;
        characters[randomOpponent].displayName = randomName;
      }
      namesCopy.opponent = characters[randomOpponent].displayName;
      this.setState({
        userDeck: randomDeck,
        cpuOpponent: randomOpponent,
        playerNames: namesCopy
      }, () => {
        this.initiateGame();          
      })
    }  
  };  
  getPlayerRecords() {
    let sinceLastGot = Date.now() - lastGotRecords;
    if (lastGotRecords === 0 || sinceLastGot >= 60000) {
      console.big('RETRIEVING HIGH SCORES FROM DB', 'brown');
      return new Promise((resolve, reject) => {
        DB.getScores().then(response => {
          let playerRecordArray = response.data.slice();
          if (!response.data) {
            playerRecordArray = [];
            reject('No records.');
          } else {
            playerRecordArray.map((playerScore, i) => {
              playerScore.cpuDefeated = JSON.parse(playerScore.cpuDefeated);
              playerScore.preferences = JSON.parse(playerScore.preferences);
            });
          }
          this.setState(
            {
              highScores: playerRecordArray
            },
            () => {
              lastGotRecords = Date.now();
              resolve(playerRecordArray);
            }
          );
        });
      });
    } else {
      console.error('TOO SOON TO GET NEW PLAYER RECORDS, using old')
      return new Promise((resolve, reject) => {
        resolve(this.state.highScores);
      });
    }
  }

  incrementPlayerTotalGames = (playerName, type) => {
    console.log('type?', type)
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    console.log('trying to call funcName', funcName);

    eval(funcName)(playerName);
  };

  incrementPlayerScore = (playerName, type) => {
    console.log('type?', type)
    let funcName = `DB.increment${type[0].toUpperCase()}${type.slice(1, type.length)}`;
    console.log('tryiong to call funcName', funcName);

    eval(funcName)(playerName);
  };

  playSound = sound => {
    if (this.state.options.sound) {
      sounds[sound].play();
    }
  };

  loadSounds = () => {
    sounds = {
      click: new Audio('https://pazaak.online/assets/sounds/click.wav'),
      draw: new Audio('https://pazaak.online/assets/sounds/drawcard.wav'),
      turn: new Audio('https://pazaak.online/assets/sounds/startturn.wav'),
      lose: new Audio('https://pazaak.online/assets/sounds/lose.wav'),
      win: new Audio('https://pazaak.online/assets/sounds/win.wav')
    };
    this.setState({
      sounds: sounds
    });
  };

  shuffleDeck = deck => {
    let deckCopy = deck.slice();
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    Util.shuffle(deckCopy);
    return deckCopy;
  };

  getNewPlayerHands = () => {
    let userDeckCopy = Util.shuffle(this.state.userDeck.slice());
    let opponentDeckCopy = Util.shuffle(this.state.opponentDeck.slice());
    let newUserHand = [];
    let newOpponentHand = [];
    if (!opponentDeckCopy.length) {
      opponentDeckCopy = characters.jarjarbinks.deck;
    }
    let newUserHandSlice = userDeckCopy.slice(0, 4);
    let newOpponentHandSlice = opponentDeckCopy.slice(0, 4);
    let userPlus = [];
    let userMinus = [];
    let opponentPlus = [];
    let opponentMinus = [];
    // separate pluses and minuses into their own arrays
    newUserHandSlice.map(card => {
      if (card.type === '+') {
        userPlus.push(card);
      } else {
        userMinus.push(card);
      }
    });
    newOpponentHandSlice.map(card => {
      if (card.type === '+') {
        opponentPlus.push(card);
      } else {
        opponentMinus.push(card);
      }
    });
    // sort those arrays by value (negatives in reverse order)
    userPlus.sort((a, b) => a.value - b.value);
    userMinus.sort(function(a, b) {
      return b.value - a.value;
    });
    opponentPlus.sort((a, b) => a.value - b.value);
    opponentMinus.sort(function(a, b) {
      return b.value - a.value;
    });
    // put them back in the array, pluses first
    userPlus.map(card => newUserHand.push(card));
    userMinus.map(card => newUserHand.push(card));
    opponentPlus.map(card => newOpponentHand.push(card));
    opponentMinus.map(card => newOpponentHand.push(card));

    this.setState({
      userHand: newUserHand,
      opponentHand: newOpponentHand
    });
  };


  handleClickLogOut = event => {
    if (event) {
      event.preventDefault();
    }
    this.callConfirmModal('Log out?', `This will log you out permanently and delete all records of ${this.state.userStatus.loggedInAs}.`, { confirm: 'Do it', cancel: 'Never mind' }, () => {
      // setting time limit to 0 destroys cookie
      let doomedId = this.state.userStatus.cookieId;
      Util.setCookie('username', `${this.state.userStatus.loggedInAs}||${doomedId}`, 0);
      console.big('Cookie destroyed!');
      let userStatusCopy = Object.assign({}, this.state.userStatus);
      userStatusCopy = {
        loggedInAs: '',
        cookieId: undefined,
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
        music: false,
        darkTheme: false,
        quickTurns: false,
        turnSpeed: 0.5,
        panelSize: 1,
        darkCards: false,
        autoStand: false,
        solidBackground: false,
        backgroundColor: null,
        panelColor: 'rgba(255, 0, 0, 1)',
        panelShade: 0.4,
        animatedStarfield: true,
        headerVisible: true,
        turnInterval: 300,
        flashInterval: 90,
        opponentMoveWaitTime: 1600,
        moveIndicatorTime: 900,
        dealWaitTime: 600
      };
      this.setState(
        {
          userStatus: userStatusCopy,
          options: defaultOptions,
          phase: 'splashScreen'
        },
        () => {
          this.dismissConfirmModal();
          this.applyStateOptions('off');
          DB.deleteUserRecord(doomedId).then(response => {
            console.big('DELETED ' + doomedId);
          });
          // roll up header menu
          setTimeout(() => {
            this.handleClickAccountInfo();
          },1)
        }
      );
    });
  };
  handleClickSignIn = () => {
    this.setState(
      {
        phase: 'splashScreen'
      },
      () => {
        this.handleClickAccountInfo();
      }
    );
  };
  handleToggleOption = (event, forceDirection) => {
    console.pink('CLICKED TOGGLE');
    let changeState = true;
    let el;
    let eventId;
    if (!forceDirection) {
      el = event.target;
      eventId = event.target.id;
    } else {
      // 1st arg is el id
      eventId = event;
      el = document.getElementById(eventId);
    }
    console.info(eventId)
    let optionsCopy = Object.assign({}, this.state.options);
    if (forceDirection === 'on' || (!forceDirection && el.classList.contains('toggle-off'))) {
      if (eventId === 'solid-background-toggle' || eventId === 'hamburger-solid-background-toggle') {
        optionsCopy.solidBackground = true;
        document.getElementById('starfield').style.display = 'none';
        document.getElementById('container').style.backgroundColor = this.state.options.backgroundColor;
      }
      if (eventId === 'starfield-toggle' || eventId === 'hamburger-starfield-toggle') {
        
        optionsCopy.solidBackground = false;
        document.getElementById('starfield').style.display = 'block';
        document.getElementById('container').style.backgroundColor = 'transparent';
      }
      if (eventId === 'auto-stand-toggle' || eventId === 'hamburger-auto-stand-toggle') {
        optionsCopy.autoStand = true;
      }
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = true;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = true;
        document.getElementById('ambience').play();
      }
      if (eventId === 'music-toggle' || eventId === 'hamburger-music-toggle') {
        optionsCopy.music = true;
        document.getElementById('music').play();
      }
      if (eventId === 'quick-turns-toggle' || eventId === 'hamburger-quick-turns-toggle') {       
        ROOT.style.setProperty('--pulse-speed', '500ms');
        optionsCopy.turnInterval = 200;
        optionsCopy.opponentMoveWaitTime = 300;
        optionsCopy.quickTurns = true;
      }
      if (eventId === 'header-visible-toggle' || eventId === 'hamburger-header-visible-toggle') {       
        this.setHeaderVisible(true);
        optionsCopy.headerVisible = true;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {      
        ROOT.style.setProperty('--main-text-color', '#ababbb');
        ROOT.style.setProperty('--red-bg-color', '#141414');
        ROOT.style.setProperty('--medium-red-bg-color', '#111111');
        ROOT.style.setProperty('--dark-red-bg-color', '#090909');
        ROOT.style.setProperty('--button-bg-color', '#020202');
        ROOT.style.setProperty('--button-border-color', '#111');
        ROOT.style.setProperty('--button-text-color', '#437222');
        ROOT.style.setProperty('--special-button-text-color', '#e49f51');
        optionsCopy.darkTheme = true;
      }
      if (eventId === 'dark-cards-toggle' || eventId === 'hamburger-dark-cards-toggle') {
        ROOT.style.setProperty('--card-bg-color', '#010101');
        ROOT.style.setProperty('--house-card-color', '#313100');
        ROOT.style.setProperty('--plus-card-color', '#02001f');
        ROOT.style.setProperty('--minus-card-color', '#240001');
        ROOT.style.setProperty('--card-back-color', '#252525');
        ROOT.style.setProperty('--card-back-bg-color', '#111');
        ROOT.style.setProperty('--card-border-color', '#151515');
        ROOT.style.setProperty('--card-text-color', '#666');
        optionsCopy.darkCards = true;
      }
      if (eventId === 'full-screen-toggle' || eventId === 'hamburger-full-screen-toggle') {
        // el.classList.add('disabled-button');
        Util.toggleFullScreen(this);
        changeState = false;
      }
      if (eventId === 'animated-starfield-toggle' || eventId === 'hamburger-animated-starfield-toggle') {
        document.getElementById('starfield').play();
        optionsCopy.animatedStarfield = true;
      }
    }
    if (forceDirection === 'off' || (!forceDirection && el.classList.contains('toggle-on'))) {
      if (eventId === 'solid-background-toggle' || eventId === 'hamburger-solid-background-toggle') {
        optionsCopy.solidBackground = false;
        document.getElementById('starfield').style.display = 'block';
        document.getElementById('container').style.backgroundColor = 'transparent';
      }
      if (eventId === 'starfield-toggle' || eventId === 'hamburger-starfield-toggle') {
        optionsCopy.solidBackground = true;
        document.getElementById('starfield').style.display = 'none';
        document.getElementById('container').style.backgroundColor = this.state.options.backgroundColor;
      }
      if (eventId === 'auto-stand-toggle' || eventId === 'hamburger-auto-stand-toggle') {
        optionsCopy.autoStand = false;
      }
      if (eventId === 'sound-fx-toggle' || eventId === 'hamburger-sound-fx-toggle') {
        optionsCopy.sound = false;
      }
      if (eventId === 'ambience-toggle' || eventId === 'hamburger-ambience-toggle') {
        optionsCopy.ambience = false;
        document.getElementById('ambience').pause();
      }
      if (eventId === 'music-toggle' || eventId === 'hamburger-music-toggle') {
        optionsCopy.music = false;
        document.getElementById('music').pause();
      }
      if (eventId === 'quick-turns-toggle' || eventId === 'hamburger-quick-turns-toggle') {
        ROOT.style.setProperty('--pulse-speed', '900ms');
        optionsCopy.turnInterval = 800;
        optionsCopy.opponentMoveWaitTime = 1600;
        optionsCopy.quickTurns = false;
      }
      if (eventId === 'header-visible-toggle' || eventId === 'hamburger-header-visible-toggle') {       
        this.setHeaderVisible(false);
        optionsCopy.headerVisible = false;
      }
      if (eventId === 'dark-theme-toggle' || eventId === 'hamburger-dark-theme-toggle') {
        ROOT.style.setProperty('--main-text-color', 'rgb(255, 247, 213)');
        ROOT.style.setProperty('--red-bg-color', '#560000');
        ROOT.style.setProperty('--medium-red-bg-color', '#490000');
        ROOT.style.setProperty('--dark-red-bg-color', '#380000');
        ROOT.style.setProperty('--button-bg-color', 'black');
        ROOT.style.setProperty('--button-border-color', 'rgb(25, 24, 39)');
        ROOT.style.setProperty('--button-text-color', '#5cb3ff');
        ROOT.style.setProperty('--special-button-text-color', '#529e4b');
        optionsCopy.darkTheme = false;
      }
      if (eventId === 'dark-cards-toggle' || eventId === 'hamburger-dark-cards-toggle') {
        ROOT.style.setProperty('--card-bg-color', '#ccc');
        ROOT.style.setProperty('--house-card-color', '#d3d300');
        ROOT.style.setProperty('--plus-card-color', '#0c00b2');
        ROOT.style.setProperty('--minus-card-color', '#a70003');
        ROOT.style.setProperty('--card-back-color', '#ccc');
        ROOT.style.setProperty('--card-back-bg-color', 'gray');
        ROOT.style.setProperty('--card-border-color', 'black');
        ROOT.style.setProperty('--card-text-color', '#ffffff');
        optionsCopy.darkCards = false;
      }
      if (eventId === 'full-screen-toggle' || eventId === 'hamburger-full-screen-toggle') {
        // el.classList.add('disabled-button');
        Util.toggleFullScreen(this);
        changeState = false;
      }
      if (eventId === 'animated-starfield-toggle' || eventId === 'hamburger-animated-starfield-toggle') {
        document.getElementById('starfield').pause();
        optionsCopy.animatedStarfield = false;
      }
    }
    if (changeState) {
      if (this.state.sounds === null && optionsCopy.sound) {
        this.loadSounds();
      }
      this.setState(
        {
          options: optionsCopy
        },
        () => {
          if (this.state.userStatus.cookieId) {
            let optionsString = JSON.stringify(optionsCopy);
            DB.updatePreferences(this.state.userStatus.cookieId, optionsString).then((response) => {
              if (this.state.phase === 'showingOptions' || this.state.phase === 'gameStarted') {
                this.callToast('Setting saved.', 'vertical');
              }
            });
          }
        }
      );
    } else {
      this.forceUpdate();
    }
  };

  callToast = (message, direction) => {
    let el = document.getElementById(`toast-${direction}`);
    if (el.timeout) {
      clearTimeout(el.timeout);
    }
    el.style.transitionDuration = '200ms';
    el.classList.add('toast-on');
    el.timeout = setTimeout(() => {
      el.style.transitionDuration = '1000ms';
      el.classList.remove('toast-on');
      
    }, 1600);
    this.setState({
      toastMessage: message
    });
  }

  applyStateOptions = forceDirection => {
    // togglable
    let optionsCopy = Object.assign({}, this.state.options);
    let optionsArray = Object.keys(optionsCopy);
    let togglableOptions = [
      'darkTheme',
      'animatedStarfield',
      'solidBackground',
      'autoStand',
    ] 
    optionsArray.map((option, i) => {
      if (togglableOptions.indexOf(option) > -1) {
        let eventId;
        if (option === 'darkTheme') {
          eventId = 'dark-theme-toggle';
        }
        if (option === 'animatedStarfield') {
          eventId = 'animated-starfield-toggle';
        }
        if (option === 'solidBackground') {
          eventId = 'solid-background-toggle';
        }
        if (option === 'autoStand') {
          eventId = 'auto-stand-toggle';
        }
        if (forceDirection === 'on') {
          if (optionsCopy[option]) {
            this.handleToggleOption(eventId, forceDirection);
          } 
        } else {          
          if (!optionsCopy[option]) {           
            this.handleToggleOption(eventId, forceDirection);
          }
          if (eventId === 'animated-starfield-toggle' && optionsCopy[option]) {
            this.handleToggleOption(eventId, 'on')
          }
        }
      } else {
        // non-togglable
        if (option === 'panelSize') {
          this.setControlFooterSize(this.state.options.panelSize);
        }
        if (option === 'headerVisible') {
          if (!optionsCopy[option]) {
            this.setHeaderVisible(false);
          } else {
            ROOT.style.setProperty('--top-margin', '0');
            this.setHeaderVisible(true);
          }
        }
      }
    });
  };

  evaluatePlayerName = enteredName => {
    console.warn('calling evaluatePlayerName -------------------------------------->');
    let uniqueId = this.state.userStatus.cookieId;
    let userStatusCopy = Object.assign({}, this.state.userStatus);

    if (uniqueId) {
      DB.getDataForPlayer(enteredName).then(response => {
        if (response.data) {
          // NAME IN DB
          let playerIndex;
          if (parseInt(response.data[0].id) === parseInt(uniqueId)) {
            playerIndex = 0;
          }
          if (playerIndex === undefined) {
            console.error('USERNAME TAKEN, and no match found in DB for username/id combination (so you is not him!)');
          } else {
            // document.getElementById('initial-loading-message').innerHTML += `<div class='loading-event-text'>User recognized as</div><div class='loading-event-text green-text'>${enteredName}</div>`;
            let playerObj = Object.assign({}, response.data[playerIndex]);
            let oldOptionsArr = this.state.options;
            let newOptionsArr = JSON.parse(playerObj.preferences);
            let nonDefaultOptions = false;
            for (let option in newOptionsArr) {
              if (oldOptionsArr[option] !== newOptionsArr[option]) {
                nonDefaultOptions = true;
              }
            }
            playerObj.cpuDefeated = JSON.parse(playerObj.cpuDefeated);
            playerObj.loggedInAs = playerObj.playerName;
            playerObj.cookieId = playerObj.id;
            console.log('checkedCookie at 00000000000000000000000000000000000------------ ', Date.now());
            if (nonDefaultOptions) {
              if (sounds === {} && playerObj.preferences.sound) {
                this.loadSounds();
              }              
              playerObj.preferences = JSON.parse(playerObj.preferences);
              console.info('got preferences', playerObj.preferences)
              playerObj.preferences.fullScreen = false;
              ROOT.style.setProperty('--main-bg-color', playerObj.preferences.backgroundColor);
              let newPanelColor = Util.shadeRGBAColor(playerObj.preferences.panelColor, -(1 - playerObj.preferences.panelShade));
              ROOT.style.setProperty('--red-bg-color', newPanelColor);
              ROOT.style.setProperty('--medium-red-bg-color', Util.shadeRGBAColor(newPanelColor, -0.2));
              ROOT.style.setProperty('--dark-red-bg-color', Util.shadeRGBAColor(newPanelColor, -0.4));
              let metaThemeColor = document.querySelector("meta[name=theme-color]");
              metaThemeColor.setAttribute('content', newPanelColor);
              playerObj.preferences.soundVolume = parseFloat(playerObj.preferences.soundVolume);
              playerObj.preferences.ambienceVolume = parseFloat(playerObj.preferences.ambienceVolume);
              playerObj.preferences.musicVolume = parseFloat(playerObj.preferences.musicVolume);
              playerObj.preferences.turnSpeed = parseFloat(playerObj.preferences.turnSpeed);
              playerObj.preferences.panelSize = parseFloat(playerObj.preferences.panelSize);
              console.info(playerObj.preferences)
              this.setState({
                  userStatus: playerObj,
                  checkedCookie: true,
                  options: playerObj.preferences
                }, () => {                  
                  this.applyStateOptions('on');
                }
              );
            } else {
              document.getElementById('starfield').play();
              this.setState({
                userStatus: playerObj,
                checkedCookie: true
              });
            }
          }
        } else {
          // would this ever occur??
          console.error(`at evaluatePlayerName: No entry in DB for ${enteredName}.`);
        }
      });
    } else {
      let optionsString = JSON.stringify(this.state.options);
      DB.saveUser(enteredName, this.state.userStatus.avatarIndex, optionsString).then(response => {
        DB.getUserId(enteredName).then(response => {
          let uniqueId = response.data[0].id;
          if (enteredName !== 'Guest') {
            Util.setCookie('username', `${enteredName}||${uniqueId}`, 365);
          }
          userStatusCopy.loggedInAs = enteredName;
          userStatusCopy.cookieId = parseInt(uniqueId);
          this.setState(
            {
              userStatus: userStatusCopy,
              checkedCookie: true
            },
            () => {
              this.evaluatePlayerName(enteredName);
            }
          );
        });
      });
    }
  };

  handleClickAccountInfo = () => {
    let userPanel = document.getElementById('user-info-panel');
    let settingsIcon = document.getElementById('user-account-icon');
    if (userPanel.classList.contains('user-info-panel-off')) {
      // open
      this.toggleShade('on');
      settingsIcon.classList.add('corner-button-on');
      userPanel.classList.remove('user-info-panel-off');
    } else {
      // close
      settingsIcon.classList.remove('corner-button-on');
      userPanel.classList.add('user-info-panel-off');
      if (!(this.state.phase === 'gameStarted' && document.getElementById('hamburger-menu').classList.contains('hamburger-on'))) {
        this.toggleShade('off');
      }
    }
  };
  handleClickStart = event => {
    event.preventDefault();
    if (this.lazyTimeouts.map) {
      this.lazyTimeouts.map(timeout => {
        clearTimeout(timeout);
      });
    }
    Object.keys(this.delayEvents).map(event => {
      this.delayEvents[event] = true;
    });
    // this.playSound('click');
    let enteredName = document.getElementById('player-name-input').value;
    let namesCopy = Object.assign({}, this.state.playerNames);
    let userStatusCopy = Object.assign({}, this.state.userStatus);
    if (!enteredName.length) {
      // playing as Guest
      userStatusCopy.playerName = 'Guest';
      this.setState({
        userStatus: userStatusCopy,
        phase: 'selectingMode',
        lazyTime: [true, true, true]
      });
      // });
    } else {
      if (!this.state.userStatus.cookieId) {
        // had no cookie at load

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
        DB.getScores().then(response => {
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
            document.getElementById('name-input-message').style.top = yPosition + inputHeight / 2 + 'px';
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
            DB.saveUser(enteredName, this.state.userStatus.avatarIndex, optionsString).then(response => {
              DB.getUserId(enteredName).then(response => {
                Util.setCookie('username', `${enteredName}||${response.data[0].id}`, 365);
                let uniqueId = response.data[0].id;
                userStatusCopy.cookieId = parseInt(uniqueId);
                DB.updateLastLoginTime(userStatusCopy.cookieId);
                this.setState(
                  {
                    userStatus: userStatusCopy,
                    playerNames: namesCopy,
                    lazyTime: [true, true, true]
                  },
                  () => {
                    this.evaluatePlayerName(enteredName);
                    this.setState({
                      // phase: 'selectingOpponent'
                      phase: 'selectingMode'
                    });
                  }
                );
              });
            });
          }
        });
      } else {
        // had cookie and matched in DB
        namesCopy.user = enteredName;
        this.setState(
          {
            phase: 'selectingMode',
            playerNames: namesCopy,
            lazyTime: [true, true, true]
          },
          () => {
            DB.updateLastLoginTime(userStatusCopy.cookieId).then(() => {});
          }
        );
      }
    }
  };
  handleClickSwitchSign = event => {
    event.preventDefault();
    let turnStatusCopy = Object.assign({}, this.state.turnStatus);
    let displaySign = turnStatusCopy.user.highlightedCard.element.children[3].innerHTML[0];
    if (displaySign === '±' || displaySign === '-') {
      turnStatusCopy.user.highlightedCard.obj.value = Math.abs(turnStatusCopy.user.highlightedCard.obj.value);
    } else if (displaySign === '+') {
      turnStatusCopy.user.highlightedCard.obj.value = Math.abs(turnStatusCopy.user.highlightedCard.obj.value) * -1;
    }
    let displayValue = turnStatusCopy.user.highlightedCard.obj.value;
    if (displayValue > 0) {
      displayValue = `+${displayValue.toString()}`;
    }
    turnStatusCopy.user.highlightedCard.element.children[3].innerHTML = displayValue;
    this.setState({
      turnStatus: turnStatusCopy
    });
  };
  handleClickOpponentReady = (event) => {
    event.preventDefault();
    this.setState({
      phase: 'selectingDeck',
    });
  };
  initiateGame = () => {
    this.getNewPlayerHands();
    this.setState({
      phase: 'versusScreen'
    }, () => {
      setTimeout(() => {
        document.getElementById('versus-screen').classList.add('leaving');
      }, 2000);
      setTimeout(() => {
        this.setState({
          phase: 'gameStarted'
        }, () => {
            setTimeout(() => {
              this.dealToPlayerGrid('user');
            }, 600);
          this.sizeCards();
        });
      }, 2500);
    });
  }
  handleClickPlay = event => {
    // this.playSound('click');
    event.preventDefault();
    this.initiateGame();
  };
  handleClickBack = (event, newPhase) => {
    // this.playSound('click');
    event.preventDefault();
    this.setState({
      phase: newPhase
    });
  };
  handleClickHow = event => {
    // this.playSound('click');
    this.setState({
      phase: 'showingInstructions'
    });
    event.preventDefault();
  };
  handleClickOptions = event => {
  // this.playSound('click');
    this.setState({
      phase: 'showingOptions'
    });
    event.preventDefault();
  };
  handleClickHallOfFame = event => {
    // this.playSound('click');
    document.getElementById('hall-of-fame-button').classList.add('hof-loading-message');
    setTimeout(() => {
      this.getPlayerRecords().then(response => {
        document.getElementById('hall-of-fame-button').classList.remove('hof-loading-message');
        this.setState({
          highScores: response,
          phase: 'showingHallOfFame'            
        }); 
      });
    },5);
    event.preventDefault();
  };
  handleClickEndTurn = event => {
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
  };
  handleClickStand = event => {
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
  };
  handleClickCard = (event, value, type, inDeck) => {
    let target = event.target;
    let elementId = event.target.id;
    let cardId = parseInt(elementId.split('-').reverse()[0]);
    if (this.state.phase === 'selectingDeck') {
      // SELECTING DECK

      if (!inDeck) {
        // it's a selection card, so put it in player deck
        if (this.state.userDeck.length < 10) {
          // there's room still
          if (!this.arrayContainsCardWithId(this.state.userDeck, cardId)) {
            // it's not there already
            let deckCopy = this.state.userDeck.slice();
            let newCardObj = {
              id: cardId,
              context: 'selected-deck',
              value: value,
              type: type,
              inDeck: true
            };
            deckCopy.push(newCardObj);
            target.style.opacity = 0.1;
            this.setState({
              userDeck: deckCopy
            });
          }
        }
      } else {
        // it's already in the player deck, so take it out
        let deckCopy = this.state.userDeck.slice();
        let indexToRemove = this.getCardIndexById(deckCopy, cardId);
        let selectionHomeId = 'deck-selection-option-card-' + cardId;
        document.getElementById(selectionHomeId).style.opacity = 1;
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
          turnStatusCopy.user.highlightedCard.obj = {
            id: cardId,
            context: 'user-hand',
            value: value,
            type: type
          };
          this.setState({
            turnStatus: turnStatusCopy
          });
          let cardObj = this.state.userHand[this.getCardIndexById(this.state.userHand, cardId)];
          if (cardObj.type === '±') {
            document.getElementById('switch-sign-button').classList.remove('hidden-button');
            document.getElementById('switch-sign-button').classList.remove('disabled-button');
          } else {
            document.getElementById('switch-sign-button').classList.add('disabled-button');
            document.getElementById('switch-sign-button').classList.add('hidden-button');
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
  };
  arrayContainsCardWithId = (arr, id) => {
    let contains = false;
    arr.map(card => {
      if (card.id === id) {
        contains = true;
      }
    });
    return contains;
  };
  dealToPlayerGrid = player => {
    console.log('DEALING TO PLAYER', player)
    this.playSound('draw');
    
    let deckCopy = [ ...this.state.deck ];
    let newCard = Util.shuffle(deckCopy)[0];
    this.addCardToGrid(player, newCard.value, newCard.type);
    let newTotal = 0;
    newTotal += this.state[`${player}Total`] + newCard.value;
    this.changeCardTotal(player, newTotal);
  };
  playHandCard = (player, cardObject) => {
    this.removeCardFromHand(player, cardObject.id);
    this.addCardToGrid(player, cardObject.value, cardObject.type);
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
  };
  removeCardFromHand = (player, cardId) => {
    let handCopy = this.state[`${player}Hand`].slice();
    let indexToRemove = this.getCardIndexById(handCopy, cardId);
    handCopy.splice(indexToRemove, 1);
    this.setState({
      [`${player}Hand`]: handCopy
    });
  };
  addCardToGrid = (player, value, type) => {
    console.info('adding card', player, value, type)

    let gridCopy = [ ...this.state[`${player}Grid`]];
    let newCard = { value: value, type: type };
    newCard.id = 500 + this.state.userGrid.length + this.state.opponentGrid.length;
    gridCopy.push(newCard);
    this.setState({
      [`${player}Grid`]: gridCopy
    });
  };
  changeCardTotal = (player, newTotal) => {
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
  };
  getCardIndexById = (arr, id) => {
    let match = -1;
    arr.forEach((card, i) => {
      if (card.id === id) {
        match = i;
      }
    });
    return match;
  };
  declareWinner = winner => {
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
      this.setState(
        {
          turn: null,
          [`${winner}Wins`]: newWins,
          lastWinner: winner
        },
        () => {
          this.callResultModal(winner);
          document.getElementById('game-board').style.opacity = 0.3;
        }
      );
    } else {
      // TIE
      if (this.state.playerNames.user !== 'Guest' && this.state.userStatus.loggedInAs) {
        let playerName = this.state.userStatus.loggedInAs;
        this.incrementPlayerTotalGames(playerName, 'sets');
      }
      this.setState(
        {
          turn: null,
          lastWinner: null
        },
        () => {
          this.callResultModal('tie');
          document.getElementById('game-board').style.opacity = 0.3;
        }
      );
    }
  };
  swapTurn = () => {
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
    return newTurn;
  };

  determineWinnerFromTotal = () => {
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
  };
  changeTurn = newPlayer => {
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
  };
  callResultModal = winner => {
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
      title = "It's a tie";
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
      }
    });
  };
  dismissResultModal = () => {
    let modal = document.getElementById('result-modal');    
    modal.classList.remove('modal-on');
  };
  callConfirmModal = (titleText, bodyText, buttonText, confirmAction, noCancel) => {
    let okButton = document.getElementById('confirm-ok-button');
    let newOkButton = okButton.cloneNode(true);
    okButton.parentNode.prepend(newOkButton);
    okButton.parentNode.removeChild(okButton);
    newOkButton.innerHTML = buttonText.confirm;
    this.setState(
      {
        confirmMessage: {
          showing: true,
          titleText: titleText,
          bodyText: bodyText,
          buttonText: buttonText
        }
      },
      () => {
        newOkButton.addEventListener('click', confirmAction);
        if (noCancel) {
          document.getElementById('confirm-cancel-button').style.display = 'none';
        }
      }
      );
    };
    dismissConfirmModal = () => {
    document.getElementById('confirm-modal').classList.remove('confirm-modal-showing');
    this.setState({
      confirmMessage: {
        showing: false,
        titleText: '',
        bodyText: '',
        buttonText: {}
      }
    });
  };
  callUserInfoModal = selectedUserId => {
    this.setState(
      {
        confirmMessage: {
          showing: true,
          titleText: titleText,
          bodyText: bodyText,
          buttonText: buttonText
        }
      },
      () => {
        document.getElementById('confirm-ok-button').addEventListener('click', confirmAction);
      }
    );
  };
  dismissUserInfoModal = () => {
    document.getElementById('user-info-modal').classList.remove('user-info-modal-showing');
    this.setState({
      selectedUser: {}
    });
  };
  handleClickAvatar = event => {
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
  };
  handleClickRandomize = event => {
    if (event) { event.preventDefault() };
    let selectionCopy = Util.shuffle(this.state.cardSelection.slice());
    let newRandomDeck = [];
    selectionCopy.map((selectionCard, i) => {
      let newCard = {
        id: selectionCard.id,
        context: 'deck-selected',
        value: selectionCard.value,
        type: selectionCard.type,
        inDeck: true
      };
      if (i < 10) {
        newRandomDeck.push(newCard);
        document.getElementById(`deck-selection-option-card-${newCard.id}`).style.opacity = 0.1;
      } else {
        document.getElementById(`deck-selection-option-card-${newCard.id}`).style.opacity = 1;
      }
    });
    this.setState({
      userDeck: newRandomDeck
    });
  };
  handleClickOKButton = event => {
    event.preventDefault();
    if (this.state.userWins === 3 || this.state.opponentWins === 3) {
      this.getNewPlayerHands();
      this.setState({
        userWins: 0,
        opponentWins: 0
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
          opponentGrid: []
        });
        this.setState({
          turn: newTurn
        });
        this.dealToPlayerGrid(this.state.turn);
        if (this.state.vsCPU && newTurn === 'opponent') {
          AI.makeOpponentMove(this);
        }
      }, this.state.options.turnInterval);
    }, this.state.options.turnInterval);
  };
  toggleHamburgerAppearance = position => {
    let topBar = document.getElementById('top-hamburger-bar');
    let bottomBar = document.getElementById('bottom-hamburger-bar');
    let middleBar = document.getElementById('middle-hamburger-bar');
    let middleBar2 = document.getElementById('middle-hamburger-bar-2');
    if (position === 'hamburger') {
      // un-rotate middle bars to flat
      middleBar.style.transform = middleBar2.style.transform = 'rotate(0) scaleX(1)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 1;
        // un-collapse top and bottom bars from middle
        topBar.style.transform = bottomBar.style.transform = 'translateY(0)';
      }, 150);
    } else {
      // collapse top and bottom bars to middle
      topBar.style.transform = 'translateY(200%)';
      bottomBar.style.transform = 'translateY(-200%)';
      setTimeout(() => {
        topBar.style.opacity = bottomBar.style.opacity = 0;
        // rotate middle bars to an X shape
        middleBar.style.transform = 'rotate(40deg) scaleX(1.1)';
        middleBar2.style.transform = 'rotate(-40deg) scaleX(1.1)';
      }, 150);
    }
  };
  handleClickHamburger = () => {
    if (!document.getElementById('hamburger-menu').classList.contains('hamburger-on')) {
      if (document.getElementById('starfield').display !== 'none') {
        document.getElementById('starfield').pause();
      }
      this.toggleShade('on');
      document.getElementById('hamburger-menu').classList.add('hamburger-on');
      this.toggleHamburgerAppearance('close');
    } else {  
      if (document.getElementById('starfield').display !== 'none') {
        document.getElementById('starfield').play();
      }
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');
      this.toggleHamburgerAppearance('hamburger');
      if (!this.state.headerVisible || document.getElementById('user-info-panel').classList.contains('user-info-panel-off')) {
        this.toggleShade('off');
      }
    }
  };

  toggleShade = direction => {
    document.getElementById('shade').style.transitionProperty = 'opacity';
    let switching = 'off';
    if (direction) {
      switching = direction;
    } else {
      if (!document.getElementById('shade').classList.contains('shade-on')) {
        switching = 'on';
      }
    }
    if (switching === 'off') {
      document.getElementById('shade').classList.remove('shade-on');
      if (this.state.phase === 'gameStarted') {
        Array.from(document.getElementsByClassName('move-button')).map(button => {
          button.classList.remove('disabled-button');
        });
      }
    } else {
      document.getElementById('shade').classList.add('shade-on');
      if (this.state.phase === 'gameStarted') {
        Array.from(document.getElementsByClassName('move-button')).map(button => {
          button.classList.add('disabled-button');
        });
      }
    }
  };

  handleClickOpponentPanel = opponentName => {
    this.setState(
      {
        cpuOpponent: opponentName
      },
      () => {
        let namesCopy = Object.assign({}, this.state.playerNames);
        namesCopy.opponent = characters[opponentName].displayName;
        let opponentDeckCopy = Util.shuffle(characters[opponentName].deck);
        // let opponentDeckCopy = characters[opponentName].deck;
        this.setState({
          playerNames: namesCopy,
          opponentDeck: opponentDeckCopy
        });
      }
    );
  };
  handleClickConfirmButton = event => {
    event.preventDefault();
  };
  handleClickCancelButton = event => {
    event.preventDefault();
    this.dismissConfirmModal();
  };
  handleClickCloseButton = event => {
    event.preventDefault();
    this.dismissUserInfoModal();
  };
  resetBoard = (newTurn, total) => {
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
      }
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
      if (document.getElementById('starfield').style.display !== 'none') {
        document.getElementById('starfield').play();
      }
    }
  };
  handleClickHamburgerQuit = event => {
    this.callConfirmModal('Quit match?', 'You will forfeit and your progress will be lost.', { confirm: 'Do it', cancel: 'Never mind' }, () => {
      document.getElementById('hamburger-menu').classList.remove('hamburger-on');
      this.resetBoard('user', true);
      this.dismissConfirmModal();
      document.getElementById('shade').classList.remove('shade-on');
      
      // setTimeout(() => {
      // this.toggleHamburgerAppearance('hamburger');
      // }, 400);
    });
  };
  callMoveIndicator = (player, message, duration) => {
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
    indicator.style.height = document.getElementById('user-area').offsetHeight + document.getElementById('user-hand').offsetHeight + 'px';
    if (player === 'user') {
      // indicator.style.top = Math.round(window.innerHeight / 20) + (document.getElementById('user-area').offsetHeight + document.getElementById('user-hand').offsetHeight) + 'px';
      indicator.style.top = document.getElementById('user-area').offsetTop + 'px';
    } else {
      indicator.style.top = document.getElementById('opponent-hand').offsetTop + 'px';
    }
    indicator.classList.remove('indicator-on');
    void indicator.offsetWidth;
    indicator.classList.add('indicator-on');
  };

  handleClickCampaign = () => {
    this.setState({
      gameMode: 'campaign'
    });
  };

  handleClickQuickMatch = () => {
    this.setState({
      gameMode: 'quick'
    });
  };

  handleChangeBackgroundColor = (newColor, elementType) => {
    let newOptions = { ...this.state.options };
    let finalColorString = newColor;
    if (elementType === 'panel') {
      finalColorString = newColor[0];
      newOptions.panelShade = parseFloat(newColor[1]);
    }
    // newColor.a = parseFloat(newColor.a);
    // if (newColor.a > 0) {
    //   let decimalSplit = newColor.a.toString().split('.');
    //   if (decimalSplit[0].length > 1) {
    //     newColor.a = decimalSplit[0][0].toString() + '.' + decimalSplit[1];
    //     newColor.a = parseFloat(newColor.a);
    //   } 
    // }
    // let finalColorString = `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`;
    newOptions[`${elementType}Color`] = finalColorString;
    this.setState({
      options: newOptions
    }, () => {
        if (elementType === 'background') {
          ROOT.style.setProperty('--main-bg-color', finalColorString);
        }
        if (elementType === 'panel') {

          let newPanelColor = Util.shadeRGBAColor(finalColorString, -(1 - this.state.options.panelShade));
          ROOT.style.setProperty('--red-bg-color', newPanelColor);
          ROOT.style.setProperty('--medium-red-bg-color', Util.shadeRGBAColor(newPanelColor, -0.2));
          ROOT.style.setProperty('--dark-red-bg-color', Util.shadeRGBAColor(newPanelColor, -0.4));
          let metaThemeColor = document.querySelector("meta[name=theme-color]");
          metaThemeColor.setAttribute("content", newPanelColor);
          // this.callToast('set newoptions.panelColor ' + finalColorString + ' to shade ' + this.state.options.panelShade + ' for newPanelColor ' + newPanelColor, 'vertical');

        }

        if (newOptions.solidBackground) {
          document.getElementById('container').style.backgroundColor = 'var(--main-bg-color)';
        }
        if (window.performance.now() - this.state.lastChangedSlider > 200) {
          if (this.state.userStatus.cookieId) {
            let optionsCopy = { ...this.state.options };
            let optionsString = JSON.stringify(optionsCopy);
            DB.updatePreferences(this.state.userStatus.cookieId, optionsString).then((response) => {
              if (this.state.phase === 'showingOptions' || this.state.phase === 'gameStarted') {
               this.callToast(`Color saved.`, 'vertical');
              }
            });
          }
          this.setState({
            lastChangedSlider: window.performance.now()
          });
        }
    })
  }
  setHeaderVisible = (visible) => {
    if (visible) {
      ROOT.style.setProperty('--top-margin', 'var(--header-height');
      setTimeout(() => {
        document.getElementById('header').classList.remove('intact');
      }, 1)
    } else {
      ROOT.style.setProperty('--top-margin', '0px');
    }
    setTimeout(this.sizeCards, 10);
  }
  setControlFooterSize = (newValue) => {
    let newHeight;
    newValue = parseFloat(newValue);
    if (newValue === 0) {
      newHeight = 'var(--header-height)';
      ROOT.style.setProperty('--control-footer-height', newHeight);
      ROOT.style.setProperty('--hamburger-height', 'var(--full-hamburger-height)');      
    } else if (newValue === 0.5) {
      newHeight = '10.5vh'
      ROOT.style.setProperty('--control-footer-height', newHeight);
      ROOT.style.setProperty('--hamburger-height', 'var(--full-hamburger-height)');
    } else if (newValue === 1) {
      newHeight = '13vh';
      ROOT.style.setProperty('--control-footer-height', newHeight);
      ROOT.style.setProperty('--hamburger-height', 'calc(var(--control-footer-height) * 0.65)');      
    }
    setTimeout(this.sizeCards, 10);      
  }
  handleSliderChange = (type, newValue, forceSave) => {
    let typeName = type.split('-')[0];
    let newOptions = { ...this.state.options };
    if (document.getElementById(typeName)) {
        document.getElementById(typeName).volume = newValue;
        newOptions[`${typeName}Volume`] = newValue;
      } else if (typeName === 'sound') {
        for (let sound in sounds) {
          sounds[sound].volume = newValue;
        };
        newOptions[`${typeName}Volume`] = newValue;
      } else if (type === 'turn-speed') {
        newOptions.turnSpeed = newValue;
      } else if (type === 'panel-size') {
        newOptions.panelSize = newValue;
        this.setControlFooterSize(newValue);
      } else if (type === 'bg-alpha-control') {
        newOptions.backgroundColor = newValue;
        this.handleChangeBackgroundColor(newValue, 'background');
      } else if (type === 'panel-alpha-control') {
        newOptions.panelColor = newValue[0];
        newOptions.panelShade = parseFloat(newValue[1]);
      }
      let optionsString = JSON.stringify(newOptions);
      this.setState({
        options: newOptions
      }, () => {
          if (forceSave || (window.performance.now() - this.state.lastChangedSlider > 250)) {
            if (typeName === 'sound') {
              this.playSound('click');
            }
            DB.updatePreferences(this.state.userStatus.cookieId, optionsString).then((response) => {
              if (type === 'panel-alpha-control') {
                if (type === 'panel-alpha-control') {
                  this.handleChangeBackgroundColor([newOptions.panelColor, newOptions.panelShade], 'panel');
                }
              }
              // if (this.state.phase === 'showingOptions' || this.state.phase === 'gameStarted') {
              //   this.callToast(`${typeName[0].toUpperCase()}${typeName.substr(1, typeName.length)} setting saved.`, 'vertical');
              // }
          });
          this.setState({
            lastChangedSlider: window.performance.now()
          });
        }
      })
    // }
  }
  render() {
    console.big('APP RENDERING', 'green');
    let phase = this.state.phase;
    let onIntroPhase = phase === 'showingOptions' || phase === 'showingInstructions' || phase === 'showingHallOfFame';
    let characterArray = [];
    Object.keys(characters).map((entry, i) => {
      characterArray[i] = characters[entry];
    });
    let domLoaded = this.delayEvents.domLoaded;
    let pageLoaded = this.delayEvents.pageLoaded;
    let lazyTime1 = this.delayEvents.postLoad1;
    let lazyTime2 = this.delayEvents.postLoad2;
    let lazyTime3 = this.delayEvents.postLoad3;
    return (      
      <div id="container">          
        <Toast message={this.state.toastMessage} />
        <video id='starfield' loop={true} muted={true}>
          <source src="https://pazaak.online/assets/images/starfieldlq.mp4" type="video/mp4" />
        </video>
        <audio id='ambience' loop={true}>
          <source src="https://pazaak.online/assets/sounds/ambience.mp3" type="audio/mp3" />
        </audio>
        <audio id='music' loop={true}>
          <source src="https://eggborne.com/music/keepyourheadup.ogx" type="audio/mp3" />
        </audio>
        {domLoaded && this.state.options.headerVisible && (
          <HeaderMenu
            playerObject={this.state.userStatus}
            onClickSignIn={this.handleClickSignIn}
            onClickLogOut={this.handleClickLogOut}
            onClickCloseButton={this.handleClickCloseButton}
            clickFunction={clickFunction}
          />
        )}
        {this.state.options.headerVisible &&
          <Header
            readyToFill={this.state.checkedCookie}
            userStatus={this.state.userStatus}
            playerName={this.state.userStatus.playerName}
            playerCredits={this.state.userStatus.credits}
            uniqueId={this.state.userStatus.cookieId}
            avatarIndex={this.state.userStatus.avatarIndex}
            onClickAccountArea={this.handleClickAccountInfo}
            onClickSignIn={this.handleClickSignIn}
            onClickLogOut={this.handleClickLogOut}
            clickFunction={clickFunction}
          />
        }
        <div id="content-area">
          {this.state.checkedCookie && (phase === 'splashScreen' || onIntroPhase) && (
            <>
            <IntroScreen
              phase={phase}
              readyToShow={this.state.checkedCookie}
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
            <OptionsScreen
              phase={phase}
              currentOptions={this.state.options}
              onToggleOption={this.handleToggleOption}
              onClickBack={event => {
                this.handleClickBack(event, 'splashScreen');
              }}
              onChangeBackgroundColor={this.handleChangeBackgroundColor}
              onChangePanelColor={this.handleChangePanelColor}
              changeSliderValue={this.handleSliderChange}
              clickFunction={clickFunction}
            />
            <InstructionsScreen
              phase={phase}
              onClickBack={this.handleClickBack}
              clickFunction={clickFunction} />
            </>
          )}
          {pageLoaded && this.state.checkedCookie && phase === 'selectingMode' && (
            <ModeSelectScreen
              phase={phase}
              modeSelected={this.state.gameMode}
              onClickCampaign={this.handleClickCampaign}
              onClickQuickMatch={this.handleClickQuickMatch}
              onClickBack={event => {
                this.handleClickBack(event, 'splashScreen');
              }}
              clickFunction={clickFunction}
            />
          )}
          {pageLoaded && this.state.checkedCookie && (phase === 'showingHallOfFame') && (
            <HallOfFameScreen
              phase={phase}
              readyToList={lazyTime2}
              highScores={this.state.highScores}
              userStatus={this.state.userStatus}
              onClickBack={this.handleClickBack}
              clickFunction={clickFunction}
            />
          )}
          {this.state.checkedCookie && phase === 'selectingDeck' && (
            <DeckSelectScreen
              cardSelection={this.state.cardSelection}
              userDeck={this.state.userDeck}
              onClickPlay={this.handleClickPlay}
              onClickCard={this.handleClickCard}
              onClickBack={this.handleClickBack}
              clickFunction={clickFunction}
            />
          )}
          {pageLoaded && (
            <OpponentSelectScreen
              phase={phase}
              readyToList={false}
              listRange={{
                begin: 0,
                end: characterArray.length
              }}
              userCredits={this.state.userStatus.credits}
              portraitSources={this.state.portraitSources}
              characters={characters}
              characterArray={characterArray}
              onClickPanel={this.handleClickOpponentPanel}
              onClickOpponentReady={this.handleClickOpponentReady}
              onClickBack={this.handleClickBack}
              clickFunction={clickFunction}
            />
          )}
          {pageLoaded && phase === 'gameStarted' && (
            <GameBoard
              phase={phase}
              playerNames={{
                user: this.state.userStatus.playerName,
                opponent: this.state.playerNames.opponent
              }}
              opponentNames={Object.keys(characters)}
              cpuOpponent={this.state.cpuOpponent}
              portraitSources={this.state.portraitSources}
              avatarIndex={this.state.userStatus.avatarIndex}
              hands={{
                user: this.state.userHand,
                opponent: this.state.opponentHand
              }}
              grids={{
                user: this.state.userGrid,
                opponent: this.state.opponentGrid
              }}
              totals={{
                user: this.state.userTotal,
                opponent: this.state.opponentTotal
              }}
              wins={{
                user: this.state.userWins,
                opponent: this.state.opponentWins
              }}
              turn={this.state.turn}
              turnStatus={this.state.turnStatus}
              onClickCard={this.handleClickCard}
              clickFunction={clickFunction}
            />
          )}
        </div>
      
        <ControlFooter
          phase={phase}
          readyToShow={domLoaded}
          currentOptions={this.state.options}
          onToggleOption={this.handleToggleOption}
          onClickEndTurn={this.handleClickEndTurn}
          onClickStand={this.handleClickStand}
          onClickHamburger={this.handleClickHamburger}
          onClickSwitchSign={this.handleClickSwitchSign}
          onClickBack={this.handleClickBack}
          onClickSelectMode={this.handleClickSelectMode}
          onClickOpponentReady={this.handleClickOpponentReady}
          onClickPlay={this.handleClickPlay}
          onClickRandomize={this.handleClickRandomize}
          clickFunction={clickFunction}
        />
        {phase === 'gameStarted' && (
          <ResultModal
            onClickOKButton={this.handleClickOKButton}
            titleText={this.state.resultMessage.title}
            playerNames={this.state.playerNames}
            winner={this.state.resultMessage.winner}
            matchOver={this.state.userWins === 3 || this.state.opponentWins === 3}
            finalScores={{
              user: this.state.userTotal,
              opponent: this.state.opponentTotal
            }}
            buttonText={this.state.resultMessage.buttonText}
            clickFunction={clickFunction}
          />
        )}
        
        <div {...{ [clickFunction]: this.handleShadeClick }} id="shade" />
        {phase === 'gameStarted' && (
          <HamburgerMenu
            currentOptions={this.state.options}
            onClickHamburgerQuit={this.handleClickHamburgerQuit}
            onToggleOption={this.handleToggleOption}            
            onChangeBackgroundColor={this.handleChangeBackgroundColor}
            changeSliderValue={this.handleSliderChange}
            clickFunction={clickFunction} />
        )}
        {pageLoaded && (
          <ConfirmModal
            showing={this.state.confirmMessage.showing}
            messageData={this.state.confirmMessage}
            buttonText={this.state.confirmMessage.buttonText}
            onClickConfirmButton={this.handleClickConfirmButton}
            onClickCancelButton={this.handleClickCancelButton}
            clickFunction={clickFunction}
          />
        )}
        {(phase === 'versusScreen' || phase === 'gameStarted') &&
          <VersusScreen phase={phase} userData={this.state.userStatus} opponentData={characters[this.state.cpuOpponent]} opponentAvatarIndex={characterArray.indexOf(characters[this.state.cpuOpponent])} />
        }
      </div>
    );
  }
}

export default App;
