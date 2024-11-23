#include <FastLED.h>
#define BUTTON_PIN_1 3         // Broche du bouton poussoir
#define BUTTON_PIN_2 4         // Broche du bouton poussoir

#define NUM_LEDS 24
#define DATA_PIN 2

CRGB leds[NUM_LEDS];

const int ledPins[6] = {5, 6, 7, 8, 9, 10}; // Pins des LEDs 1 à 6

int ledStates[6];        // Stocke les états des LEDs
int ringLedStates[24];   // Stocke les états des RING_LEDs

void setup() {
  Serial.begin(57600); // Initialisation du port série

  for (int i = 0; i < 6; i++) {
    pinMode(ledPins[i], OUTPUT); // Configurer les LEDs comme sorties
  }

  // Configuration bouton
  pinMode(BUTTON_PIN_1, INPUT_PULLUP);
  pinMode(BUTTON_PIN_2, INPUT_PULLUP);

  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
}

void loop() {
  // Vérifier si des données sont disponibles sur le port série
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n'); // Lire la ligne entière reçue
    parseSerialInput(input);
  }
}

// Fonction pour découper la chaîne reçue et affecter les valeurs
void parseSerialInput(String input) {
  int segmentIndex = 0; // Compteur pour les segments
  int startIndex = 0;   // Indice de début du segment

  // Découper la chaîne
  for (int i = 0; i <= input.length(); i++) {
    if (input[i] == '/' || i == input.length()) {
      String segment = input.substring(startIndex, i); // Extraire le segment
      int value = segment.toInt(); // Convertir le segment en entier
      assignValue(segmentIndex, value);
      segmentIndex++;
      startIndex = i + 1; // Mettre à jour l'indice de début
    }
  }
}

// Fonction pour assigner les valeurs aux LEDs ou RING_LEDs
void assignValue(int index, int value) {
  if (index < 6) {
    ledStates[index] = value; // Stocker l'état
    digitalWrite(ledPins[index], value); // Allumer/éteindre la LED

  } else if (index < 30) { // Les RING_LEDs commencent à l'indice 6
    int ringIndex = index - 6;
    ringLedStates[ringIndex] = value; // Stocker l'état

    if (value == 1) {
      leds[i] = CRGB::White;
    }
    
    else if (value == 2) {
      leds[i] = CRGB::Yellow;
    }
    
    else if (value == 3) {
      leds[i] = CRGB::Red;
    }

    else if (value == 0) {
      leds[i] = CRGB::Black;
    }
  }
}
