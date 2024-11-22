#include <FastLED.h>
#define BUTTON_PIN_1 3         // Broche du bouton poussoir
#define BUTTON_PIN_2 4         // Broche du bouton poussoir

const int LED_PINS[6] = {5, 6, 7, 8, 9, 10};  // Broches des LEDs simples

#define NUM_LEDS 24
#define DATA_PIN 2

CRGB leds[NUM_LEDS];

// Définition des états
bool processActive = false;
unsigned long lastActionTime = 0;


String value;

// Fonction pour configurer les pins
void setup() {
  // Initialisation des LEDs simples
  for (int i = 0; i < 6; i++) {
    pinMode(LED_PINS[i], OUTPUT);
    digitalWrite(LED_PINS[i], LOW);
  }

  // Configuration bouton
  pinMode(BUTTON_PIN_1, INPUT_PULLUP);
  pinMode(BUTTON_PIN_2, INPUT_PULLUP);

  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
  FastLED.show();

  // Initialisation du port série
  Serial.begin(57600);
}

// Fonction principale
void loop() {
  Serial.println("YE");

  while (Serial.available()) {
    char c = Serial.read();  //gets one byte from serial buffer
    value += c; //makes the String readString
    delay(2);  //slow looping to allow buffer to fill with next character
  }

  if (value.length() > 0) {
     //Serial.print("Recu : ");
     //Serial.println(value);

    if (value == "s/0") {
      // éteindre tout
    }

    if (value == "l/1") {
      // allume LED 1
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], LOW);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/2") {
      // allume LED 2
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/3") {
      // allume LED 3
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], HIGH);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/4") {
      // allume LED 4
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], HIGH);
      digitalWrite(LED_PINS[3], HIGH);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/5") {
      // allume LED 5
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], HIGH);
      digitalWrite(LED_PINS[3], HIGH);
      digitalWrite(LED_PINS[4], HIGH);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/6") {
      // allume LED 6
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], HIGH);
      digitalWrite(LED_PINS[3], HIGH);
      digitalWrite(LED_PINS[4], HIGH);
      digitalWrite(LED_PINS[5], HIGH);
    }

    if (value == "s/2") {
      // fin du jeu : clignotement ?
    }

  }

  

  Serial.print(!digitalRead(BUTTON_PIN_1));
  Serial.print("/");
  Serial.println(!digitalRead(BUTTON_PIN_2));
  /*
    static bool buttonPressed = false;

    // Lecture de l'état du bouton
    if (digitalRead(BUTTON_PIN) == LOW && !buttonPressed) {
    processActive = !processActive; // Bascule l'état actif
    buttonPressed = true;
    delay(200); // Anti-rebond
    } else if (digitalRead(BUTTON_PIN) == HIGH) {
    buttonPressed = false;
    }

    // Si le processus est actif, lance la séquence
    if (processActive) {
    countdownRing();
    handleSoundSensor();
    }
  */
}

// Compte à rebours sur l'anneau NeoPixel

/*void countdownRing() {
  unsigned long countdownStartTime = millis();
  int stepDuration = 3000 / NUM_LEDS_RING; // Durée pour chaque LED

  for (int i = 0; i < NUM_LEDS_RING; i++) {
    // Détermine la couleur
    uint32_t color;
    if (i < NUM_LEDS_RING / 2) {
      color = ring.Color(0, 255, 0); // Vert
    } else if (i < (3 * NUM_LEDS_RING) / 4) {
      color = ring.Color(255, 165, 0); // Orange
    } else {
      color = ring.Color(255, 0, 0); // Rouge
    }

    ring.setPixelColor(i, color);
    ring.show();
    delay(stepDuration);
  }

  // Clignotement des LEDs pour signaler la fin
  for (int j = 0; j < 5; j++) {
    ring.fill(ring.Color(255, 0, 0)); // Rouge
    ring.show();
    delay(300);
    ring.clear();
    ring.show();
    delay(300);
  }
}

// Lecture du capteur sonore et activation des LEDs simples
void handleSoundSensor() {
  int sensorValue = analogRead(SOUND_SENSOR);
  Serial.println(sensorValue); // Pour déboguer

  // Désactive toutes les LEDs
  for (int i = 0; i < 6; i++) {
    digitalWrite(ledPins[i], LOW);
  }

  // Active les LEDs selon la valeur du capteur
  if (sensorValue > 101 && sensorValue <= 250) {
    digitalWrite(ledPins[0], HIGH);
  } else if (sensorValue > 250 && sensorValue <= 400) {
    digitalWrite(ledPins[1], HIGH);
  } else if (sensorValue > 400 && sensorValue <= 700) {
    digitalWrite(ledPins[2], HIGH);
  } else if (sensorValue > 700 && sensorValue <= 850) {
    digitalWrite(ledPins[3], HIGH);
  } else if (sensorValue > 850 && sensorValue <= 950) {
    digitalWrite(ledPins[4], HIGH);
  } else if (sensorValue > 950) {
    digitalWrite(ledPins[5], HIGH);
  }

  // Éteindre la dernière LED après 10 secondes (si le compte à rebours est terminé)
  if (millis() - lastActionTime > 10000) {
    for (int i = 0; i < 6; i++) {
      digitalWrite(ledPins[i], LOW);
    }
    lastActionTime = millis(); // Réinitialise le temps
  }
}*/
