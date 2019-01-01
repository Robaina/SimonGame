/* Simon's game
   Semidan Robaina Estevez
*/

let sound1 = document.getElementById("sound1");
let sound2 = document.getElementById("sound2");
let sound3 = document.getElementById("sound3");
let sound4 = document.getElementById("sound4");
let wrong = document.getElementById("wrong");
let win = document.getElementById("win");
let intro = document.getElementById("intro");
let maximumNumberOfBeats = 20;
let numberOfPlayedBeats = 1;
let button_sequence;
let sequence_ended = false;
let isOff = true;
let buttonIDs = ["up", "right", "down", "left"];
let strict = false;
let counterButton = document.getElementById("counter");
let startButton = document.getElementById("start");
let strictButton = document.getElementById("strict");
let onButton = document.getElementById("on-off");
let n_beats;
let current_sequence;


let buttons = {};
for (let id of buttonIDs) {
  let elem = document.getElementById(id);
  elem.addEventListener("click", checkOrder);
  elem.addEventListener("touch", checkOrder);
  buttons[id] = elem;
}

function playStrict() {
  if (!isOff) {
    strict = !strict;
    if (strict) {
      strictButton.style["background-color"] = "rgb(115, 213, 55)";
    } else {
      strictButton.style["background-color"] = "rgb(129, 129, 129)";
    }
  }
}

function playSound1(delay=500) {
  if (!isOff) {
    buttons["up"].style.filter = "brightness(140%)";
    buttons["up"].style["-webkit-filter"] = "brightness(140%)";
    sound1.currentTime = 0;
    sound1.play();
    setTimeout(function() {
      buttons["up"].style.filter = "brightness(100%)";
      buttons["up"].style["-webkit-filter"] = "brightness(100%)";
    }, delay);
  }
}
function playSound2(delay=500) {
  if (!isOff) {
    buttons["down"].style.filter = "brightness(250%)";
    sound2.currentTime = 0;
    sound2.play();
    setTimeout(function() {
      buttons["down"].style.filter = "brightness(100%)";
    }, delay);
  }
}
function playSound3(delay=500) {
  if (!isOff) {
    buttons["left"].style.filter = "brightness(250%)";
    sound3.currentTime = 0;
    sound3.play();
    setTimeout(function() {
      buttons["left"].style.filter = "brightness(100%)";
    }, delay);
  }
}
function playSound4(delay=500) {
  if (!isOff) {
    buttons["right"].style.filter = "brightness(250%)";
    sound4.currentTime = 0;
    sound4.play();
    setTimeout(function() {
      buttons["right"].style.filter = "brightness(100%)";
    }, delay);
  }
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
  if (!isOff) {
    correct_counts = 0;
    onButton.style["background-color"] = "rgb(115, 213, 55)";
    playIntro();
    setTimeout(standBySimon, 2500);

  } else {
    turnOffSimon();
    return;
  }
}

function playIntro() {
  let updown = ["up", "down"];
  let rightleft = ["right", "left"];
  let sequence = buttonIDs.concat(buttonIDs).concat([updown, rightleft]);
  let delay = 0;

  intro.play();
  for (let i=0; i<sequence.length;i++){
    setTimeout(function() {
      id = sequence[i];
      lightUpButtons(id, 100);
    }, delay);
    delay += 200;
  }
}

function standBySimon() {
  startButton.style['animation-iteration-count'] = "infinite";
  counterButton.innerHTML = "--";

}

function turnOffSimon() {
  counterButton.innerHTML = "--";
  setTimeout(function() {
    counterButton.innerHTML = "";
  }, 1000);
  strictButton.style["background-color"] = "rgb(129, 129, 129)";
  startButton.style['animation-iteration-count'] = 0;
  startButton.style["background-color"] = "rgb(129, 129, 129)";
  onButton.style["background-color"] = "rgb(129, 129, 129)";
}

function startGame() {
  if (!isOff) {
    n_beats = 0;
    correct_counts = 0;
    startButton.style["background-color"] = "rgb(115, 213, 55)";
    startButton.style['animation-iteration-count'] = 0;
    startButton.style['-webkit-animation-iteration-count'] = 0;
    counterButton.innerHTML = "--";
    button_sequence = getRandomButtonSequence(maximumNumberOfBeats);
    setTimeout(mainGame, 2000);
  }
}

function mainGame() {
  n_beats++;
  correct_counts = 0;
  current_sequence = button_sequence.slice(0, n_beats);
  updateCounter(n_beats);
  playSoundSequence(current_sequence);
}

// Select a sequence randomly
function playSoundSequence(sequence) {
  sequence_ended = false;
  let delay = 0;

  for (let i=0; i<sequence.length; i++) {
    let id = sequence[i];

    setTimeout(function() {
      playSound[id]();
      if (i === sequence.length - 1) {
        sequence_ended = true;
      }
    }, delay);

    delay += 600;
  }
}

let correct_counts;
// probably you can use switch/case
function checkOrder(event) {
  if (!isOff) {
    if (sequence_ended) {
      let buttonID = current_sequence.shift();

      if (typeof buttonID !== "undefined") {

        if (event.target.id !== buttonID) {
          playWrong();
          if (strict) {
            setTimeout(standBySimon, 2500);
            return;
          } else {
             n_beats--;
             setTimeout(mainGame, 2000);
             return;
          }
        } else {
          correct_counts++;

          if (correct_counts === maximumNumberOfBeats) {
            playWinTheme();
            setTimeout(standBySimon, 2500);
            return;
          }
          if (correct_counts === n_beats) {
            setTimeout(mainGame, 1000);
            return;
          }

        }
      }
    }
  }
}

function updateCounter(counter) {
  counterButton.innerHTML = counter.toString();
}

function playWinTheme() {
  let delay_times = [0, 600, 1200];
  win.play();
  for (let i=0; i<delay_times.length; i++) {
    setTimeout(function() {
      lightUpButtons(buttonIDs, 400);
    }, delay_times[i]);
  }
}

function playWrong() {
  if (!isOff) {
    lightUpButtons(buttonIDs, 500);
    wrong.play();
  }
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
