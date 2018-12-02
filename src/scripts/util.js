export function pointWithinBounds(pointX, pointY, boundsX, boundsY, boundsWidth, boundsHeight = boundsWidth) {
  return pointX > boundsX && pointX < boundsX + boundsWidth
    && pointY > boundsY && pointY < boundsY + boundsHeight;
}