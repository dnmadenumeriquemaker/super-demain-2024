const USE_ARDUINO = true;

let GAME_STEP;

let GAME_STARTING_STEP = STEPS.WAIT;
// GAME_STARTING_STEP = STEPS.STEP1_OUTRO;

let IS_READY = false;



function setup() {
  createCanvas(350, 250);

  initArduino();
  initAudios();

  // wait for mouse user interaction
  // (to be able to play audios)
}

function init() {
  IS_READY = true;
  setStep(GAME_STARTING_STEP);
}

function draw() {
  if (!IS_READY) {
    if (mouseIsPressed) {
      init();
    } else {
      return;
    }
  }
  
  // reset all buttons states (keep the lock)
  setAllButtonsToInactive(false);

  // listen to Arduino inputs
  listenToArduino();

  // detect keyboard inputs (debug)
  checkKeyPressed();

  // do something accordingly to the current step
  checkStep();

  // some HUD to debug
  hud();
}



function checkKeyPressed() {

  if (keyIsDown(66)) { // 'b'
    port.open("Arduino", 57600);
  }

  if (keyIsDown(49) || keyIsDown(38)) { setButtonToActive('BUTTON_1'); } // '1' or '&'
  if (keyIsDown(50) || keyIsDown(233)) { setButtonToActive('BUTTON_2'); } // '2' or 'é'
  if (keyIsDown(51) || keyIsDown(34)) { setButtonToActive('BUTTON_3'); } // '3' or '"'
  if (keyIsDown(52) || keyIsDown(39)) { setButtonToActive('BUTTON_4'); } // '4' or '''
  if (keyIsDown(53) || keyIsDown(40)) { setButtonToActive('BUTTON_5'); } // '5' or '('
  if (keyIsDown(54) || keyIsDown(167)) { setButtonToActive('BUTTON_6'); } // '6' or '§'
  if (keyIsDown(55) || keyIsDown(232)) { setButtonToActive('BUTTON_7'); } // '7' or 'è'
  if (keyIsDown(56) || keyIsDown(33)) { setButtonToActive('BUTTON_8'); } // '8' or '!'
  if (keyIsDown(57) || keyIsDown(231)) { setButtonToActive('BUTTON_9'); } // '9' or 'ç'
  if (keyIsDown(65)) { HAND_1 = true; } // 'a'
  if (keyIsDown(90)) { HAND_2 = true; } // 'z'
}

function keyReleased() {
  setAllButtonsToInactive(true);

  HAND_1 = false;
  HAND_2 = false;
}

function setButtonToActive(buttonName) {
  if (BUTTONS[buttonName].locked == false) {
    BUTTONS[buttonName].value = true;
    BUTTONS[buttonName].locked = true;
  }
}

function isButtonActive(buttonName) {
  return BUTTONS[buttonName].value;
}

function setButtonToInactive(buttonName, unlock = false) {
  BUTTONS[buttonName].value = false;
  if (unlock) {
    BUTTONS[buttonName].locked = false;
  }
}

function unlockButton(buttonName) {
  BUTTONS[buttonName].locked = false;
}

function setAllButtonsToInactive(unlock = false) {
  setButtonToInactive('BUTTON_1', unlock);
  setButtonToInactive('BUTTON_2', unlock);
  setButtonToInactive('BUTTON_3', unlock);
  setButtonToInactive('BUTTON_4', unlock);
  setButtonToInactive('BUTTON_5', unlock);
  setButtonToInactive('BUTTON_6', unlock);
  setButtonToInactive('BUTTON_7', unlock);
  setButtonToInactive('BUTTON_8', unlock);
  setButtonToInactive('BUTTON_9', unlock);
}

