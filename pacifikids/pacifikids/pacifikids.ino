#include <FastLED.h>

const int buttonPins[9] = {13, 7, 27, 35, 43, 51, 34, 42, 26};
const int buttonLights[9] = {8, 22, 2, 30, 46, 38, 39, 47, 11};

const int touchPin1 = 41;
const int touchPin2 = 49;

#define NUM_LEDS 50
#define DATA_PIN 10

CRGB leds[NUM_LEDS];

int buttonStates[9];
int touchState1;
int touchState2;

int strip1[2] = {0, 8};
int strip2[2] = {15, 28};
int strip3[2] = {40, 50};

int stripMillisStart = 0;
int stripMillisCount = 0;
int stripAnimationIndex = 0;

int currentStripState;
int newStripState;

int test = 0;

String value;

void setup() {
  // Initialisation du port série
  Serial.begin(57600);

  // Configurer les pins des boutons en entrée
  for (int i = 0; i < 9; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP); // INPUT_PULLUP pour éviter les résistances externes
    pinMode(buttonLights[i], OUTPUT);
  }

  pinMode(touchPin1, INPUT);
  pinMode(touchPin2, INPUT);

  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

  doStripOff();

  FastLED.show();

}


void loop() {
  // used to make variables work...
  // what a shame...

  /*
    Serial.print("none/");
    Serial.print(stripMillisCount);
    Serial.print(stripAnimationIndex);
    Serial.println("");

  */




  while (Serial.available()) {
    char c = Serial.read();  //gets one byte from serial buffer
    value += c; //makes the String readString
    delay(2);  //slow looping to allow buffer to fill with next character
  }

  if (value.length() > 0) {
    // Serial.print("Recu : ");
    // Serial.println(value);

    if (value == "a/0") {
      newStripState = 0;
    }

    if (value == "a/1") {
      newStripState = 1;
    }

    if (value == "a/2") {
      newStripState = 2;
    }

    if (value == "a/3") {
      newStripState = 3;
    }

    // detect currentStripState change

    if (currentStripState != newStripState) {
      currentStripState = newStripState;
      //  resetStripAnimation();


      if (currentStripState == 0) {
        doStripOff();
      }

      if (currentStripState == 1) {
        doStrip1();
      }

      if (currentStripState == 2) {
        doStrip2();
      }

      if (currentStripState == 3) {
        doStrip3();
      }


      FastLED.show();
    }


    value = "";

  }





  // Lire l'état des boutons
  for (int i = 0; i < 9; i++) {
    buttonStates[i] = !digitalRead(buttonPins[i]); // Inverser car INPUT_PULLUP

    if (buttonStates[i] == HIGH) {
      digitalWrite(buttonLights[i], HIGH);
    } else {
      digitalWrite(buttonLights[i], LOW);
    }
  }

  // Lire l'état des bandes de cuivre
  touchState1 = digitalRead(touchPin1);
  touchState2 = digitalRead(touchPin2);


  // Afficher les données sur le port série
  for (int i = 0; i < 9; i++) {
    Serial.print(buttonStates[i]);
    Serial.print("/");
  }

  Serial.print(touchState1);
  Serial.print("/");
  Serial.print(touchState2);
  Serial.println("/");

  delay(50); // Petit délai pour lisibilité (ajustable)
}

void doStrip1() {

  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::White;
  }

  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::Black;
  }

  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
}


void doStrip2() {

  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::White;
  }

  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::White;
  }

  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
}


void doStrip3() {

  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::White;
  }

  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::White;
  }

  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::White;
  }
}



/*

  void doStrip1() {
  stripMillisCount++;

  if (stripMillisCount % 2 == 0) {
    stripAnimationIndex++;
  }

  int nbLedsInThisStrip = strip1[1] - strip1[0];

  if (stripAnimationIndex >= nbLedsInThisStrip) {
    stripAnimationIndex = nbLedsInThisStrip;
  }


  for (int i = strip1[0]; i <= strip1[0] + stripAnimationIndex; i++) {
    leds[i] = CRGB::Yellow;
  }


  for (int i = strip1[0] + stripAnimationIndex + 1; i <= strip1[1]; i++) {
    leds[i] = CRGB::Black;
  }


  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::Black;
  }

  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
  }


  void doStrip2() {
  stripMillisCount++;

  if (stripMillisCount % 2 == 0) {
    stripAnimationIndex++;
  }

  int nbLedsInThisStrip = strip1[1] - strip1[0];

  if (stripAnimationIndex >= nbLedsInThisStrip) {
    stripAnimationIndex = nbLedsInThisStrip;
  }

  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::Yellow;
  }

  for (int i = strip2[0]; i <= strip2[0] + stripAnimationIndex; i++) {
    leds[i] = CRGB::Yellow;
  }


  for (int i = strip2[0] + stripAnimationIndex + 1; i <= strip2[1]; i++) {
    leds[i] = CRGB::Black;
  }


  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
  }



  void doStrip3() {
  stripMillisCount++;

  if (stripMillisCount % 2 == 0) {
    stripAnimationIndex++;
  }

  int nbLedsInThisStrip = strip1[1] - strip1[0];

  if (stripAnimationIndex >= nbLedsInThisStrip) {
    stripAnimationIndex = nbLedsInThisStrip;
  }

  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::Yellow;
  }

  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::Yellow;
  }

  for (int i = strip3[0]; i <= strip3[0] + stripAnimationIndex; i++) {
    leds[i] = CRGB::Yellow;
  }


  for (int i = strip3[0] + stripAnimationIndex + 1; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
  }
*/

void doStripOff() {
  for (int i = strip1[0]; i <= strip1[1]; i++) {
    leds[i] = CRGB::Black;
  }

  for (int i = strip2[0]; i <= strip2[1]; i++) {
    leds[i] = CRGB::Black;
  }

  for (int i = strip3[0]; i <= strip3[1]; i++) {
    leds[i] = CRGB::Black;
  }
}


void resetStripAnimation() {
  stripMillisStart = 0;
  stripMillisCount = 0;
  stripAnimationIndex = 0;
}
