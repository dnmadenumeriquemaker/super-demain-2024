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

let maxLevel = 0;

let stepIntensity = 10;

let SEUIL_MIN = 20;
let SEUIL_MAX = 100;



let waveWait = 0;

function setup() {
  createCanvas(350, 250);

  initArduino();
  initAudios();

  ring = new Ring(24, 100); // Créer un anneau de 24 LEDs avec un rayon de 100


  // wait for mouse user interaction
  // (to be able to play audios)

}

function init() {
  IS_READY = true;

  input = new p5.AudioIn();
  input.start();
  getAudioContext().resume();

  setStep(0);

  setInterval(raf, 100);
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
  drawJauge();

  ring.update(); // Mettre à jour l'anneau
  ring.draw(); // Dessiner l'anneau
}


function raf() {
  updateArduino();
}

function checkStep() {
  if (STEP == 0) {


    updateJaugeWait();

    if (BUTTON_1 == true && BUTTON_2 == true) {
      //port.write('s/1');

      setTimeout(function () {
        setStep(1);
      }, 10);
    }
  }

  if (STEP == 1) {
    checkMic();
  }
}

function setStep(newStep) {
  STEP = newStep;

  if (STEP == 0) {
    // wait for joysticks
    console.log('Send state 0');
    //port.write('0/0/0/0/0/0');
  }

  if (STEP == 1) {
    // console.log('send led state: 1');
    ledState = 0;
    intensity = 0;
    maxLevel = 0;
    // detect mic
    // launch timer

    

    setTimeout(function () {
      setStep(2);
    }, duration);
  }

  if (STEP == 2) {
    ring.startTimer(3);

    setTimeout(function () {
      // send max level
      port.write('m/' + maxLevel);
    }, 10);

    port.write('s/2');

    setTimeout(function () {
      setStep(0);
    }, 7000);
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




let numLeds = 6;
let ledStates = []; // Tableau pour stocker l'état ON/OFF des LEDs
let direction = 1; // 1 pour avancer, -1 pour reculer
let currentLed = 0; // Index de la LED active
let timer = 0; // Minuterie pour contrôler la vitesse
let delay = 100; // Délai entre chaque changement d'état (en millisecondes)

function updateJaugeWait() {
  // Mettre à jour les états des LEDs selon le temps écoulé
  if (millis() - timer > delay) {
    updateLedStates();
    timer = millis(); // Réinitialiser la minuterie
  }
}

function drawJauge() {

  background(30); // Couleur de fond
  // Dessiner les LEDs
  for (let i = 0; i < numLeds; i++) {
    fill(ledStates[i] === 1 ? color(255, 204, 0) : color(50)); // Jaune si ON, gris si OFF
    ellipse(50 + i * 60, height / 2, 50); // Dessiner un cercle représentant la LED
  }
}

// Fonction pour mettre à jour les états des LEDs
function updateLedStates() {
  // Désactiver toutes les LEDs
  for (let i = 0; i < numLeds; i++) {
    ledStates[i] = 0;
  }

  // Activer la LED courante
  ledStates[currentLed] = 1;

  // Mettre à jour l'index de la LED active
  currentLed += direction;

  // Inverser la direction si on atteint les extrémités
  if (currentLed >= numLeds || currentLed < 0) {
    direction *= -1;
    currentLed += direction; // Corriger l'index pour rester dans les limites
  }
}






class Led {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isOn = false; // État de la LED (ON ou OFF)
  }

  // Dessiner la LED
  draw() {
    fill(this.isOn ? color(255, 204, 0) : color(50)); // Jaune si ON, gris si OFF
    ellipse(this.x, this.y, this.radius);
  }

  // Allumer ou éteindre la LED
  setState(state) {
    this.isOn = state;
  }
}

class Ring {
  constructor(numLeds, radius) {
    this.numLeds = numLeds; // Nombre de LEDs dans l'anneau
    this.radius = radius; // Rayon de l'anneau
    this.leds = []; // Tableau pour stocker les LEDs
    this.currentLed = 0; // Index de la LED active
    this.timer = 0; // Minuterie pour contrôler la vitesse
    this.delay = 50; // Délai entre les changements (en ms)
    this.createLeds();
    this.timerMode = false; // Indique si le mode timer est actif
    this.timerCountdown = 0; // Temps restant pour le timer
    this.ledTurnOffInterval = 0; // Temps entre l'extinction de chaque LED
  }

  // Créer les LEDs sur le cercle
  createLeds() {
    for (let i = 0; i < this.numLeds; i++) {
      let angle = (TWO_PI / this.numLeds) * i;
      let x = width / 2 + cos(angle) * this.radius;
      let y = height / 2 + sin(angle) * this.radius;
      this.leds.push(new Led(x, y, 20));
    }
  }

  getSerialData() {
    let string = '';

    for (let i = 0; i < this.numLeds; i++) {
      string += parseInt(this.leds[i].isOn);
      string += '/';
    }

    return string;
  }

  // Mettre à jour l'anneau
  update() {
    if (this.timerMode) {
      this.updateTimer(); // Mettre à jour le mode timer
    } else {
      this.updateAnimation(); // Animation normale
    }
  }

  // Activer le mode timer (compte à rebours)
  startTimer(duration) {
    this.timerMode = true;
    this.timerCountdown = duration; // Durée du compte à rebours en secondes
    this.ledTurnOffInterval = (duration * 1000) / this.numLeds; // Temps entre l'extinction de chaque LED (ms)
    this.timer = millis(); // Initialiser la minuterie
    this.allOn(); // Allumer toutes les LEDs
  }

  // Mettre à jour le timer
  updateTimer() {
    let elapsedTime = millis() - this.timer; // Temps écoulé depuis la dernière mise à jour
    if (elapsedTime > this.ledTurnOffInterval) {
      this.timer = millis(); // Réinitialiser la minuterie
      this.turnOffStep(); // Éteindre progressivement les LEDs
    }

    if (this.timerCountdown <= 0) {
      this.timerMode = false; // Désactiver le mode timer
      this.allOff(); // Éteindre toutes les LEDs
    }
  }

  // Éteindre une LED par étape (timer)
  turnOffStep() {
    let index = this.numLeds - Math.ceil((this.timerCountdown * 1000) / this.ledTurnOffInterval); // Calculer l'indice à éteindre
    console.log(index);
    if (index >= 0 && index < this.numLeds) {
      this.leds[index].setState(false); // Éteindre la LED
    }
    this.timerCountdown -= this.ledTurnOffInterval / 1000; // Réduire le temps restant
  }

  // Animation normale (rotation circulaire)
  updateAnimation() {
    if (millis() - this.timer > this.delay) {
      this.timer = millis(); // Réinitialiser la minuterie
      this.switchLed();
    }
  }

  // Activer la LED suivante (mode normal)
  switchLed() {
    this.leds[this.currentLed].setState(false); // Éteindre la LED actuelle
    this.currentLed = (this.currentLed + 1) % this.numLeds; // Passer à la suivante
    this.leds[this.currentLed].setState(true); // Allumer la nouvelle LED
  }

  // Allumer toutes les LEDs
  allOn() {
    for (let led of this.leds) {
      led.setState(true);
    }
  }

  // Éteindre toutes les LEDs
  allOff() {
    for (let led of this.leds) {
      led.setState(false);
    }
  }

  // Dessiner toutes les LEDs
  draw() {
    for (let led of this.leds) {
      led.draw();
    }
  }
}

let ring; // Instance de l'anneau


// Lancer le timer de 5 secondes avec la touche 'T'
function keyPressed() {
  if (key === 'T' || key === 't') {
    ring.startTimer(3);
  }
}

function updateArduino() {
  let string = '';

  ledsString = ledStates.join('/');

  string = string + ledsString;
  string = string + '/' + ring.getSerialData();

  console.log(ledsString);

  port.write(string);
}