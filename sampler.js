/* Sound sampler
Sound clips:
Tick: recorded by DeepFrozenApps (soundbible.com)
Applause: recorded by Yannick Lemieux (soundbible.com)
   Semidan Robaina Estevez
*/

// let tick = document.getElementById("tick");
// let applause = document.getElementById("applause");
let drum1 = document.getElementById("drum1");
let drum2 = document.getElementById("drum2");
let plate1 = document.getElementById("plate1");
let plate2 = document.getElementById("plate2");
let voice1 = document.getElementById("voice1");
let voice2 = document.getElementById("voice2");
let applause = document.getElementById("applause");
let tick = document.getElementById("tick");
let fullScreen = false;


function playDrum1() {
  drum1.currentTime = 0;
  drum1.play();
}
function playDrum2() {
  drum2.currentTime = 0;
  drum2.play();
}
function playPlate1() {
  plate1.currentTime = 0;
  plate1.play();
}
function playPlate2() {
  plate2.currentTime = 0;
  plate2.play();
}
function playVoice1() {
  voice1.currentTime = 0;
  voice1.play();
}
function playVoice2() {
  voice2.currentTime = 0;
  voice2.play();
}
function playTick() {
  tick.currentTime = 0;
  tick.play();
}
function playApplause() {
  applause.currentTime = 0;
  applause.play();
}


// function changeCSSproperty(elements=NULL, property="visibility",
//  value="visible") {
//   for (id_name of elements) {
//     document.getElementById(id_name).style[property] = value;
//   }
// }

function openFullscreen() {

  tick.play();
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
