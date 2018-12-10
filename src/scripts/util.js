export function flash(elementId, property, origColor, flashColor, interval) {
  interval = Math.round(interval);
  let el = document.getElementById(elementId);
  el.style.pointerEvents = 'none';
  el.style[property] = flashColor;
  setTimeout(() => {
    el.style[property] = origColor;
    setTimeout(() => {
      el.style[property] = flashColor;
      setTimeout(() => {
        el.style[property] = origColor;
        el.style.pointerEvents = 'all';
      }, interval);
    }, interval);
  }, interval);
}

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

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
export const checkCookie = () => {
  var playerName = getCookie('username');
  if (playerName != '') {
    document.getElementById('player-name-input').value = playerName;
    console.warn(`Recognized user as ${playerName}`);
  }
};