/* Simon's game
   Semidan Robaina Estevez
*/

let drum1 = document.getElementById("drum1");
let drum2 = document.getElementById("drum2");
let plate1 = document.getElementById("plate1");
let plate2 = document.getElementById("plate2");
let chimp = document.getElementById("chimp");
let fullScreen = false;
let numberOfBits = 4;
let counter, button_sequence;
let pressedStart = false;
let buttonIDs = ["up", "down", "left", "right"];

let buttons = {};
for(let id of buttonIDs) {
  let elem = document.getElementById(id);
  elem.addEventListener("click", checkOrder);
  elem.addEventListener("touch", checkOrder);
  buttons[id] = elem;
}

function playDrum1() {
  buttons["up"].style.filter = "brightness(140%)";
  drum1.currentTime = 0;
  drum1.play();
  setTimeout(function() {
    buttons["up"].style.filter = "brightness(100%)";
  }, 500);
}
function playDrum2() {
  buttons["down"].style.filter = "brightness(140%)";
  drum2.currentTime = 0;
  drum2.play();
  setTimeout(function() {
    buttons["down"].style.filter = "brightness(100%)";
  }, 500);
}
function playPlate1() {
  buttons["left"].style.filter = "brightness(140%)";
  plate1.currentTime = 0;
  plate1.play();
  setTimeout(function() {
    buttons["left"].style.filter = "brightness(100%)";
  }, 500);
}
function playPlate2() {
  buttons["right"].style.filter = "brightness(140%)";
  plate2.currentTime = 0;
  plate2.play();
  setTimeout(function() {
    buttons["right"].style.filter = "brightness(100%)";
  }, 500);
}

let playSound = {"up": playDrum1, "down": playDrum2, "left": playPlate1, "right": playPlate2};

// Select a sequence randomly
function playSoundSequence() {
  pressedStart = true;
  let index_sequence = sampleWithRepetition(0, 3, numberOfBits);
  button_sequence = [];

  for (let index of index_sequence) {
    button_sequence.push(buttonIDs[index]);
  }

  let delay = 0;
  counter = 0;
  for (let id of button_sequence) {

    setTimeout(function() {
      playSound[id]();
      counter++;
    }, delay);

    delay += 800;
  }
}

function checkOrder(event) {
  // checks whether user follows correct order
  if (pressedStart){
    let correct_counts = 0;
    let buttonID = button_sequence.shift();

    if (typeof buttonID !== "undefined") {

      if (event.target.id !== buttonID) {
        chimp.play();
      } else {correct_counts++}
      
    } else {
      pressedStart = false;
      console.log(correct_counts, numberOfBits);
      if (correct_counts === numberOfBits) {plate2.play()}
    }


  }
}

function sampleWithRepetition(minInt=0, maxInt=3, size=4) {
  let randomSample = [];
  let randomInt;

  for (let i = 0; i < size; i++) {
    randomInt = Math.round((maxInt - minInt) * Math.random() + minInt);
    randomSample.push(randomInt);
  }
  return randomSample
}

function openFullscreen() {
  fullScreen = !fullScreen;
  fullScreenButton = document.getElementById("full-screen");
  let elem = document.documentElement;

  if (fullScreen) {
    fullScreenButton.style["background-color"] = "rgb(12, 165, 170)";
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    fullScreenButton.style["background-color"] = "rgb(159, 159, 159)";
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  }
}
