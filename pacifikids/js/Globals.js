const STEPS = {
  WAIT: 0,
  INTRO: 1,
  STEP1_INTRO: 2,
  STEP1_PLAY: 3,
  STEP1_WIN: 4,
  STEP1_LOST: 5,
  STEP1_OUTRO: 6,
  STEP2_PLAY: 7,
  STEP2_WIN: 8,
  STEP2_LOST: 9,
  STEP2_OUTRO: 10,
  STEP3_PLAY: 11,
  STEP3_WIN: 12,
  STEP3_LOST: 13,
  STEP3_OUTRO: 14,
  HANDS: 15,
  OUTRO: 16,
};

const STEPS_ACTIONS = {
  WAIT: "Appuyer sur n'importe quel bouton pour lancer l'intro",
  INTRO: "Écouter l'introduction : la suite se déclenche à la fin de l'audio",
  STEP1_INTRO: "Écouter les instructions : le jeu 1 se lancera à la fin de l'audio",
  STEP1_PLAY: "Appuyer sur le bon bouton du round (jeu 1)",
  STEP1_WIN: "Les 3 boutons ont été trouvés, on passe à la suite",
  STEP1_LOST: "Mauvais bouton pour ce round, on recommence ce round",
  STEP1_OUTRO: "Fin du jeu 1, passage au jeu 2",
  STEP2_PLAY: "Appuyer sur les bons boutons dans l'ordre du jeu 2",
  STEP2_WIN: "Tous les boutons dans l'ordre ont été trouvés",
  STEP2_LOST: "Raté ! Réessayez",
  STEP2_OUTRO: "Fin du jeu 2, passage au jeu 3",
  STEP3_PLAY: "Appuyer sur les bons boutons du jeu 3",
  STEP3_WIN: "Bravo ! Passage à la prochaine étape",
  STEP3_LOST: "Raté ! Réessayez",
  STEP3_OUTRO: "Fin du jeu 3 : la fin se lancera à la fin de l'audio",
  HANDS: "Placer les deux mains sur les capteurs pour lancer l'outro",
  OUTRO: "Écouter la conclusion",
}




let STEP1_CURRENT_ROUND = 1;
const ARDUINO_STRIP1_DURATION = 3000; // durée d'affichage de la strip 1, en ms

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
let STEP2_BUTTONS_ENABLED_ORDER = [];

const ARDUINO_STRIP2_DURATION = 3000; // durée d'affichage de la strip 2, en ms

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
