

export const getPageLoadInfo = () => {
  let perfEntries = performance.getEntriesByType('navigation');
  perfEntries.map((p, i) => {
    document.getElementById('debug-display').innerHTML += ('connect duration = ' + (p.connectEnd - p.connectStart).toPrecision(6) + '<br />');

    document.getElementById('debug-display').innerHTML += ('domainLookupStart = ' + (p.domainLookupStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('domContentLoadedEventStart = ' + (p.domContentLoadedEventStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('loadEventStart = ' + (p.loadEventStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('domContentLoadedEvent = ' + (p.domContentLoadedEventEnd - p.domContentLoadedEventStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('domComplete = ' + (p.domComplete).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('domInteractive = ' + (p.domInteractive).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('duration = ' + (p.duration).toPrecision(6) + '<br />');

    document.getElementById('debug-display').innerHTML += ('loadEvent = ' + (p.loadEventEnd - p.loadEventStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('unloadEvent = ' + (p.unloadEventEnd - p.unloadEventStart).toPrecision(6) + '<br />');
    document.getElementById('debug-display').innerHTML += ('domainLookup = ' + (p.domainLookupEnd - p.domainLookupStart).toPrecision(6) + '<br />');

    document.getElementById('debug-display').innerHTML += ('transferSize = ' + p.transferSize + '<br />');
    document.getElementById('debug-display').innerHTML += ('encodedBodySize = ' + p.encodedBodySize + '<br />');
    document.getElementById('debug-display').innerHTML += ('decodedBodySize = ' + p.decodedBodySize + '<br />');

    document.getElementById('debug-display').innerHTML += ('redirectCount = ' + p.redirectCount + '<br />');
    document.getElementById('debug-display').innerHTML += ('time now = ' + (window.performance.now()) + '<br />');
    document.getElementById('debug-display').innerHTML += ('type = ' + p.type + '<br />');
    // document.getElementById('debug-display').innerHTML += ('= Navigation entry[' + i + ']<br />');
  });
};
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
  console.warn('checked cookie in', window.performance.now() - startTime);
  let userStatusCopy = Object.assign({}, app.state.userStatus);
  let playerName;
  let uniqueId;
  if (response != '') {
    playerName = response.split('||')[0];
    uniqueId = response.split('||')[1];
    userStatusCopy.cookieId = parseInt(uniqueId);
    userStatusCopy.id = parseInt(uniqueId);
    userStatusCopy.loggedInAs = playerName;
    console.warn(`Recognized user as ${response}`);
    app.setState({
      userStatus: userStatusCopy,
    }, () => {         
      app.evaluatePlayerName(playerName);
    });
  } else {
    app.setState({
      checkedCookie: true
    });
    document.getElementById('avatar-row').style.opacity = 1;
    console.error('No cookie found. Leaving state.userStatus.cookieId undefined.');
    document.getElementById('player-name-input').disabled = false;
    // document.getElementById('initial-loading-message').innerHTML += `<br />User not recognized.`;
  }
};

export function getCardSizes() {
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
  
  console.error('GOT CARDSIZES', cardsObj.cardSize.height);

  return cardsObj;
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

