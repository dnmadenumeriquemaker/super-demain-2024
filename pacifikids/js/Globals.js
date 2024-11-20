const STEP_WAIT = 0;
const STEP_INTRO = 1;

const STEP1_INTRO = 2;
const STEP1_PLAY = 3;
const STEP1_WIN = 4;
const STEP1_LOST = 5;
const STEP1_OUTRO = 6;

let STEP1_CURRENT_ROUND = 1;
const ARDUINO_STRIP1_DURATION = 3000; // durée d'affichage de la strip 1, en ms

const STEP2_PLAY = 7;
const STEP2_WIN = 8;
const STEP2_LOST = 9;
const STEP2_OUTRO = 10;
let STEP2_BUTTONS_ENABLED = {
  button1: false,
  button2: false,
  button3: false,
  button4: false,
  button5: false,
  button6: false,
  button7: false,
  button8: false,
  button9: false,
};
const ARDUINO_STRIP2_DURATION = 3000; // durée d'affichage de la strip 2, en ms

const STEP3_PLAY = 11;
const STEP3_WIN = 12;
const STEP3_LOST = 13;
const STEP3_OUTRO = 14;
let STEP3_BUTTONS_ENABLED = {
  button1: false,
  button2: false,
  button3: false,
  button4: false,
  button5: false,
  button6: false,
  button7: false,
  button8: false,
  button9: false,
};
const ARDUINO_STRIP3_DURATION = 3000; // durée d'affichage de la strip 3, en ms

const STEP_HANDS = 15;
const STEP_OUTRO = 16;