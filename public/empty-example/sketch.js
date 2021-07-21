

// var song;
// function preload(){
//   //soundFormats('mp3', 'ogg');
//   //song = loadSound('everglow')
// }
// function setup() {
//   createCanvas(100, 100);
// }

// function draw() {
//   background(100);
// }

// // function mouseClicked(){
// //   if(song.isPlaying())
// //   {
// //     song.pause();
// //   }
// //   else
// //   song.play();
// // }

let mySound;
function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('everglow');
}

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  background(220);
  text('tap here to play', 10, 20);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  mySound.play();
}