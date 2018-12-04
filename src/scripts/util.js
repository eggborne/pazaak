export function flash(elementId, property, origColor, flashColor) {
  let el = document.getElementById(elementId);
  el.style[property] = flashColor;
  setTimeout(() => {
    el.style[property] = origColor;
    setTimeout(() => {
      el.style[property] = flashColor;
      setTimeout(() => {
        el.style[property] = origColor;
      }, 50);
    }, 50);
  }, 50);
}

export function shuffle(arr) {
  arr.sort(() => Math.random() - 0.5);
  return arr;
}