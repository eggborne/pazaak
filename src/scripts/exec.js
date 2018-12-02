export default function mainLoop(app) {

  app.listenForTouchInput();
  if (app.buttons.currentlyPressed.indexOf('left') > -1) {
    app.stage.x += app.newPixelSize * 2;
  }
  if (app.buttons.currentlyPressed.indexOf('right') > -1) {
    app.stage.x -= app.newPixelSize * 2;
  }

  app.showDPadPresses();

  if (app.counter % 45 === 0) {
    if (document.getElementById('level-indicator-1').classList.contains('level-filled')) {
      document.getElementById('level-indicator-1').classList.remove('level-filled');
    } else {
      document.getElementById('level-indicator-1').classList.add('level-filled');

    }
  }

  document.getElementById('debug').innerHTML = app.buttons.currentlyPressed.join(', ');
}