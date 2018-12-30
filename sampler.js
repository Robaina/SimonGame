/* Simon's game
   Semidan Robaina Estevez
   Digital font by Jakob Fischer www.pizzadude.dk
*/

let Sound1 = document.getElementById("Sound1");
let Sound2 = document.getElementById("Sound2");
let Sound3 = document.getElementById("Sound3");
let Sound4 = document.getElementById("Sound4");
let wrong = document.getElementById("wrong");
let numberOfBeats = 6;
let maximumNumberOfBeats = 10;
let numberOfPlayedBeats = 1;
let counter, button_sequence;
let pressedStart = false;
let isOff = false;
let buttonIDs = ["up", "right", "down", "left"];
let strict = false;
let counterButton = document.getElementById("counter");
let startButton = document.getElementById("start");
let strictButton = document.getElementById("strict");

let buttons = {};
for(let id of buttonIDs) {
  let elem = document.getElementById(id);
  elem.addEventListener("click", checkOrder);
  elem.addEventListener("touch", checkOrder);
  buttons[id] = elem;
}

function playStrict() {
  strict = !strict;
  if (strict) {
    strictButton.style.filter = "brightness(140%)";
  } else {
    strictButton.style.filter = "brightness(100%)";
  }
  playWinTheme();
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

function lightUpButtons(IDs, delay=500){
  if(!Array.isArray(IDs)){IDs = [IDs]}

  for (let id of IDs) {
    buttons[id].style.filter = "brightness(250%)";
  }
  setTimeout(function() {
    for (let id of IDs) {
      buttons[id].style.filter = "brightness(100%)";
    }
  }, delay);
}

let playSound = {"up": playSound1, "down": playSound2, "left": playSound3, "right": playSound4};

function initializeSimon() {
  isOff = !isOff;
  if (isOff) {
    let updown = ["up", "down"];
    let rightleft = ["right", "left"];
    let sequence = buttonIDs.concat(buttonIDs).concat(buttonIDs).concat(
      [updown, rightleft, updown, rightleft, "all"]);
    let delay = 0;
    counterButton.innerHTML = "--";
    for (let i=0; i<sequence.length;i++){
      setTimeout(function() {
        id = sequence[i];
        if (id === "all") {
          lightUpButtons(buttonIDs, 1000);
          counterButton.innerHTML = "0";
        } else {
          lightUpButtons(id, 100);
        }
      }, delay);
      delay += 200;
    }
  } else {
    turnOffSimon();
  }
}

function turnOffSimon() {
  counterButton.innerHTML = "--";
  setTimeout(function() {
    counterButton.innerHTML = "";
  }, 1000);
  strictButton.style.filter = "brightness(100%)";
  startButton.style.filter = "brightness(100%)";
}

function startGame() {
  startButton.style.filter = "brightness(140%)";
  button_sequence = getRandomButtonSequence(maximumNumberOfBeats);
  updateCounter(0);
  playSoundSequence(numberOfPlayedBeats);

}

// Select a sequence randomly
function playSoundSequence(n_beats) {
  pressedStart = true;
  let delay = 0;
  counter = 0;

  for (let i=0; i<n_beats; i++) {
    let id = button_sequence[i];
    setTimeout(function() {
      playSound[id]();
      counter++;
      updateCounter(counter);
    }, delay);

    delay += 600;
  }
}

function updateCounter(counter) {
  counterButton.innerHTML = counter.toString();
}

function checkOrder(event) {
  // checks whether user follows correct order
  if (pressedStart){
    let correct_counts = 0;
    let buttonID = button_sequence.shift();

    if (typeof buttonID !== "undefined") {

      if (event.target.id !== buttonID) {
        playWrong();
      } else {correct_counts++}

    } else {
      pressedStart = false;
      if (correct_counts === numberOfBeats) {Sound4.play()}
    }


  }
}

function playWinTheme() {
  let sequence = ["right", "down", "up", "left"];
  let delay_times = [0, 200, 400, 600];
  for (let i=0; i<sequence.length; i++) {
    setTimeout(function() {
      playSound[sequence[i]]();
    }, delay_times[i]);
  }
}

function playWrong() {
  lightUpButtons(buttonIDs, 700);
  wrong.play();
}

function getRandomButtonSequence(size) {
  let randomSample = [];
  let button_sequence = [];
  let randomInt;
  let minInt = 0;
  let maxInt = 3;

  for (let i = 0; i < size; i++) {
    randomInt = Math.round((maxInt - minInt) * Math.random() + minInt);
    randomSample.push(randomInt);
  }

  for (let index of randomSample) {
    button_sequence.push(buttonIDs[index]);
  }
  return button_sequence
}

// function openFullscreen() {
//   fullScreen = !fullScreen;
//   fullScreenButton = document.getElementById("full-screen");
//   let elem = document.documentElement;
//
//   if (fullScreen) {
//     fullScreenButton.style["background-color"] = "rgb(12, 165, 170)";
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) {
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//   } else {
//     fullScreenButton.style["background-color"] = "rgb(159, 159, 159)";
//     if (document.exitFullscreen) {
//         document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//     } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//     }
//   }
// }
