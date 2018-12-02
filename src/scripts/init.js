export default function createGame() {

  console.log('createGame...')
  

  // touch handling

  // const app = document.getElementById('container');
  // app.touches = [];
  // app.addEventListener('touchstart', (event) => {
  //   console.log(';ticeds')
  //   if (!app.touches.length) {
  //     app.fingerDown = true;
  //   }
  //   app.touches.push(copyTouch(event.changedTouches[0]));
  // });
  // app.addEventListener('touchmove', (event) => {
  //   event.preventDefault();
  //   let touches = event.changedTouches;
  //   for (var i = 0; i < touches.length; i++) {
  //     let matchingId = ongoingTouchIndexById(app.touches, touches[i].identifier);
  //     let touchCopy = copyTouch(touches[i]);
  //     if (matchingId >= 0) {
  //       app.touches.splice(matchingId, 1, touchCopy);
  //     }
  //   }
  //   document.getElementById('game').innerHTML = app.touches[0].pageX
  // });
  // app.addEventListener('touchend', (event) => {
  //   event.preventDefault();
  //   let touches = event.changedTouches;
  //   for (var i = 0; i < touches.length; i++) {
  //     let matchingId = ongoingTouchIndexById(app.touches, touches[i].identifier);
  //     if (matchingId >= 0) {
  //       app.touches.splice(matchingId, 1);
  //     }
  //   }
  //   if (!app.touches.length) {
  //     app.fingerDown = false;
  //   }
  // });
}

// function copyTouch(touch) {
//   return {
//     identifier: touch.identifier,
//     pageX: touch.pageX,
//     pageY: touch.pageY
//   };
// }
// function ongoingTouchIndexById(arr, idToFind) {
//   for (var i = 0; i < arr.length; i++) {
//     var id = arr[i].identifier;

//     if (id == idToFind) {
//       return i;
//     }
//   }
//   return -1;    // not found
// }