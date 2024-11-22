const USE_ARDUINO = true;

let IS_READY = false;

let input;

let STEP = 0;

let ledState = 0;
let intensity = 0;

let seconds = 3;
let duration = seconds * 1000;
let maxIntensity = seconds * 60;
// let stepIntensity = maxIntensity/12;

let stepIntensity = 10;

let SEUIL_MIN = 20;
let SEUIL_MAX = 100;

function setup() {
  createCanvas(350, 250);

  initArduino();
  initAudios();



  // wait for mouse user interaction
  // (to be able to play audios)
  
}

function init() {
  IS_READY = true;

  input = new p5.AudioIn();
  input.start();
  getAudioContext().resume();

  setStep(0);
}

function draw() {
  if (!IS_READY) {
    if (mouseIsPressed) {
      init();
    } else {
      return;
    }
  }
  

  checkKeyPressed();

  checkStep();

  // listen to Arduino inputs
  listenToArduino();


  // some HUD to debug
  hud();
}


function checkStep() {
  if (STEP == 0) {
    if (BUTTON_1 == true && BUTTON_2 == true) {
      setStep(1);
    }
  }

  if (STEP == 1) {
    checkMic();
  }
}

function setStep(newStep) {
  STEP = newStep;

  if (STEP == 0) {
    // send led state: 0
    console.log('send led state: 0');
    port.write('s/0');
  }

  if (STEP == 1) {
    // console.log('send led state: 1');
    //port.write('s/1');
    ledState = 0;
    intensity = 0;
    // detect mic
    // launch timer

    setTimeout(function(){
      setStep(2);
    }, duration);
  }

  if (STEP == 2) {

    port.write('s/2');

    setTimeout(function(){
      setStep(0);
    }, 3000);
  }
}


function checkKeyPressed() {

  if (keyIsDown(66)) { // 'b'
    port.open("Arduino", 57600);
  }

  if (keyIsDown(65)) { BUTTON_1 = true; } // 'a'
  if (keyIsDown(90)) { BUTTON_2 = true; } // 'z'
}

function keyReleased() {
  BUTTON_1 = false;
  BUTTON_2 = false;
}

