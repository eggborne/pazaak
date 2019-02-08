import { displayError } from '../components/App';

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
    console.big(`Recognized user as ${response}`, 'green');
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
    console.error('No cookie found. Leaving state.userStatus.cookieId undefined. Animating starfield.');
    document.getElementById('container').style.backgroundImage = 'url(https://pazaak.online/assets/images/starfield.png)';
    document.getElementById('player-name-input').disabled = false;
    // document.getElementById('initial-loading-message').innerHTML += `<br />User not recognized.`;
  }
};

export const getTimeSinceFromSeconds = sessionLengthInSeconds => {
  let output;
  let sessionMinutes = Math.ceil(sessionLengthInSeconds / 60);
  let minutePlural = 's';
  if (sessionMinutes === 1) {
    minutePlural = '';
  }
  if (sessionMinutes >= 60) {
    let wholeHours = Math.floor(sessionMinutes / 60);
    let minutes = sessionMinutes % 60;
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
};

function fullScreenCall() {
  var root = document.documentElement;
  // var root = document.getElementById('container');
  return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen;
}
function exitFullScreenCall() {
  return document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
}
export function isFullScreen() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}
export function toggleFullScreen(app) {
  let oldHeight = window.innerHeight;
  app.setState({
    lastHeight: oldHeight
  }, () => {
    if (!isFullScreen()) {
      fullScreenCall().call(document.getElementById('container'));
    } else {
      exitFullScreenCall().call(document);
    }
  });
  
}

