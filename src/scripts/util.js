export function pointWithinBounds(pointX, pointY, boundsX, boundsY, boundsWidth, boundsHeight = boundsWidth) {
  return pointX > boundsX && pointX < boundsX + boundsWidth
    && pointY > boundsY && pointY < boundsY + boundsHeight;
}

export function flash(elementId, property, origColor, flashColor) {
  let el = document.getElementById(elementId);
  el.style[property] = flashColor;
  setTimeout(() => {
    el.style[property] = origColor;
    setTimeout(() => {
      el.style[property] = flashColor;
      setTimeout(() => {
        el.style[property] = origColor;
      }, 50)
    }, 50)
  }, 50);
}