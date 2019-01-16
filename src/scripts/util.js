export const shuffle = (arr) => {
  arr.sort(() => Math.random() - 0.5);
  return arr;
};
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const setCookie = (cname, cvalue, exdays) => {
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
export const checkCookie = (app) => {
  let startTime = window.performance.now();
  let response = getCookie('username');
  console.warn('checked cookie in', window.performance.now()-startTime)
  let userStatusCopy = Object.assign({}, app.state.userStatus);
  let playerName;
  let uniqueId;
  if (response != '') {
    playerName = response.split('||')[0];
    uniqueId = response.split('||')[1];
    userStatusCopy.cookieId = parseInt(uniqueId);
    userStatusCopy.id = parseInt(uniqueId);
    userStatusCopy.loggedInAs = playerName;
    console.error(`Recognized user as ${response}. Filling ${playerName} in name input and disabling checkbox etc.`);
    document.getElementById('player-name-input').value = playerName;

    // document.getElementById('player-name-input').disabled = true;
    // document.getElementById('player-name-input').style.backgroundColor = 'gray';
    // document.getElementById('remember-checkbox').checked = true;
    // // document.getElementById('remember-checkbox').disabled = true;
    document.getElementById('remember-check-area').classList.add('remembered');

    app.setState({
      userStatus: userStatusCopy
    }, () => {
      app.evaluatePlayerName(playerName);
    });
  } else {
    console.error('No cookie found. Leaving state.userStatus.cookieId undefined.');
    document.getElementById('player-name-input').disabled = false;
    // document.getElementById('player-name-input').style.backgroundColor = 'white';
    // // document.getElementById('remember-checkbox').disabled = true;
    // document.getElementById('remember-checkbox').checked = false;
    document.getElementById('remember-check-area').classList.remove('remembered');
  }
};

export function getCardSizes() {
  let startTime = window.performance.now();
  let cardSize = {};
  let mediumCardSize = {};
  let miniCardSize = {};
  let microCardSize = {};
  let cardHeight = Math.round((window.innerHeight / 6) * 0.775);
  cardSize.width = Math.round(cardHeight / 1.55);
  let cardsPerWidth = window.innerWidth / cardSize.width;
  if (cardsPerWidth < 6) {
    let marg = window.innerWidth * 0.006;
    let maxWidth = (window.innerWidth / 5) - (marg * 5);
    cardSize.width = Math.round(maxWidth);
  }
  cardSize.height = cardHeight;
  mediumCardSize.width = Math.round(cardSize.width * 0.875);
  mediumCardSize.height = Math.round(cardSize.height * 0.875);
  miniCardSize.width = Math.round(cardSize.width * 0.75);
  miniCardSize.height = Math.round(cardSize.height * 0.75);
  microCardSize.width = Math.round(cardSize.width * 0.6);
  microCardSize.height = Math.round(cardSize.height * 0.6);

  let cardSizes = [cardSize, mediumCardSize, miniCardSize, microCardSize];
  cardSizes.map((sizeObj) => {
    let cardHeight = sizeObj.height;
    sizeObj.borderSize = `${Math.round(cardHeight / 100)}px`;
    sizeObj.arrowBorderSize = `${Math.round(cardHeight / 10)}px`;
    sizeObj.borderRadius = `${Math.round(cardHeight / 18)}px`;
    sizeObj.bandRadius = `${Math.round(cardHeight / 24)}px`;
    sizeObj.badgeRadius = `${Math.round(cardHeight / 36)}px`;
    sizeObj.margin = `${Math.round(cardHeight * 0.015)}px`;
    sizeObj.bubbleSize = `${Math.round(cardHeight * 0.16)}px`;
    sizeObj.backBubbleSize = `${Math.round(cardHeight * 0.18)}px`;
    sizeObj.fontSize = `${(cardHeight * 0.17)}px`;
  });
  let cardsObj = {};
  cardsObj.cardSize = cardSizes[0];
  cardsObj.mediumCardSize = cardSizes[1];
  cardsObj.miniCardSize = cardSizes[2];
  cardsObj.microCardSize = cardSizes[3];
  let endTime = window.performance.now();
  console.warn('sized cards in', (endTime - startTime));
  return cardsObj;
}

export function sizeElements(app, initialStart) {
  if (initialStart) {
    // size button text    
    Array.from(document.getElementsByClassName('intro-button')).map((button) => {
      let buttonTextLength = button.children[0].innerHTML.length;
      if (button.children[0].innerHTML === 'How to Play') {
        buttonTextLength = 7;
      }
      let fontSize = (button.offsetWidth / (buttonTextLength)) + 'px';
      button.style.fontSize = fontSize;
      button.style.height = (window.innerHeight / 10) + 'px';
    });
  }
  // is this needed?
  // document.getElementById('container').style.height = `${window.innerHeight}px`;
}
function fullScreenCall() {
  var root = document.body;
  return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen;
}
function exitFullScreenCall() {
  return document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
}
export function isFullScreen() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}
export function toggleFullScreen() {
  if (!isFullScreen()) {
    fullScreenCall().call(document.getElementById('container'));
  } else {
    exitFullScreenCall().call(document);
  }
}

