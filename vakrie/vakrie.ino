#include <Adafruit_NeoPixel.h>

#define BUTTON_PIN 7         // Broche du bouton poussoir
#define SOUND_SENSOR A0      // Broche du capteur sonore
#define RING_PIN 8           // Broche pour l'anneau NeoPixel
#define NUM_LEDS_RING 24     // Nombre de LEDs sur l'anneau
#define LED_PINS {1, 2, 3, 4, 5, 6}  // Broches des LEDs simples

// Configuration des NeoPixels
Adafruit_NeoPixel ring = Adafruit_NeoPixel(NUM_LEDS_RING, RING_PIN, NEO_GRB + NEO_KHZ800);

// Définition des états
bool processActive = false;
unsigned long lastActionTime = 0;

// Broches des LEDs simples
int ledPins[] = LED_PINS;

// Fonction pour configurer les pins
void setup() {
  // Initialisation des LEDs simples
  for (int i = 0; i < 6; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
  }
  
  // Configuration bouton
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  // Initialisation des NeoPixels
  ring.begin();
  ring.show(); // Éteint toutes les LEDs
  
  // Initialisation du port série
  Serial.begin(9600);
}

// Fonction principale
void loop() {
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
}

// Compte à rebours sur l'anneau NeoPixel
void countdownRing() {
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
}
