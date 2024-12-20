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

let SEUILS = [
  [0, 20],
  [21, 30],
  [31, 40],
  [41, 50],
  [51, 70],
  [71, 100000],
];

let maxLevel = 0;

let stepIntensity = 10

let SEUIL_MIN = 40;
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
    if (BUTTON_1 == true || BUTTON_2 == true) {
      // port.write('s/1');

      setStep(1);
    }
  }

  if (STEP == 1) {
    //  checkMic();
    checkTapote();
  }

  if (STEP == 2) {
    envoiRegulier = null;
  }
}

let envoiRegulier = null;

function setStep(newStep) {
  STEP = newStep;

  if (STEP == 0) {
    // send led state: 0
    console.log('send led state: 0');
    port.write('0');
  }

  if (STEP == 1) {
    // console.log('send led state: 1');
    ledState = 0;
    intensity = 0;
    maxLevel = 0;

    // detect mic
    // launch timer


    // port.write('3');


    countButton1On = 0;
    countButton1Off = 0;
    countButton2On = 0;
    countButton2Off = 0;

    antiFlood1 = false;
    antiFlood2 = false;


    envoiRegulier = setInterval(function () {
      if (STEP == 1) {
        sendToArduino();
      } else {
        envoiRegulier = null;
        clearInterval(envoiRegulier);
      }
    }, 200);



    setTimeout(function () {
      setStep(2);
    }, duration + 2000);
  }

  if (STEP == 2) {
    console.log('setstep 2');
    clearInterval(envoiRegulier);
    envoiRegulier = null;

    sendToArduino();

    const delay = 500;

    setTimeout(function () {
      port.write('0');

      setTimeout(function () {
        sendToArduino();

        setTimeout(function () {
          port.write('0');

          setTimeout(function () {
            sendToArduino();

            setTimeout(function () {
              port.write('0');

              setTimeout(function () {
                sendToArduino();

                setTimeout(function () {
                  port.write('0');

                  setTimeout(function () {
                    setStep(0);
                  }, 1000);
                }, delay);
              }, delay);
            }, delay);
          }, delay);
        }, delay);
      }, delay);
    }, delay);

    // setTimeout(function () {
    //   port.write('7');
    // }, 100);

    // setTimeout(function () {
    //   setStep(0);
    // }, 1000);
  }
}


function checkKeyPressed() {

  if (keyIsDown(66)) { // 'b'
    port.open("Arduino", 9600);
  }

  if (keyIsDown(65)) { BUTTON_1 = true; } // 'a'
  if (keyIsDown(90)) { BUTTON_2 = true; } // 'z'
}

function keyReleased() {
  BUTTON_1 = false;
  BUTTON_2 = false;
}

