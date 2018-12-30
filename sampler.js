/* Simon's game
   Semidan Robaina Estevez
*/

let Sound1 = document.getElementById("Sound1");
let Sound2 = document.getElementById("Sound2");
let Sound3 = document.getElementById("Sound3");
let Sound4 = document.getElementById("Sound4");
let chimp = document.getElementById("chimp");
let fullScreen = false;
let numberOfBits = 6;
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

function playSound1() {
  buttons["up"].style.filter = "brightness(140%)";
  Sound1.currentTime = 0;
  Sound1.play();
  setTimeout(function() {
    buttons["up"].style.filter = "brightness(100%)";
  }, 500);
}
function playSound2() {
  buttons["down"].style.filter = "brightness(250%)";
  Sound2.currentTime = 0;
  Sound2.play();
  setTimeout(function() {
    buttons["down"].style.filter = "brightness(100%)";
  }, 500);
}
function playSound3() {
  buttons["left"].style.filter = "brightness(250%)";
  Sound3.currentTime = 0;
  Sound3.play();
  setTimeout(function() {
    buttons["left"].style.filter = "brightness(100%)";
  }, 500);
}
function playSound4() {
  buttons["right"].style.filter = "brightness(250%)";
  Sound4.currentTime = 0;
  Sound4.play();
  setTimeout(function() {
    buttons["right"].style.filter = "brightness(100%)";
  }, 500);
}

let playSound = {"up": playSound1, "down": playSound2, "left": playSound3, "right": playSound4};

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
      if (correct_counts === numberOfBits) {Sound4.play()}
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
