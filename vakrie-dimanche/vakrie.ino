// #include <FastLED.h>
#define BUTTON_PIN_1 3         // Broche du bouton poussoir
#define BUTTON_PIN_2 4         // Broche du bouton poussoir

const int LED_PINS[6] = {5, 9, 10, 8, 6, 7};  // Broches des LEDs simples

#define NUM_LEDS 24
#define DATA_PIN 2

// CRGB leds[NUM_LEDS];

// Définition des états
bool processActive = false;
unsigned long lastActionTime = 0;

int currentLed = 0;
bool animate = false;

int count = 0;


// Fonction pour configurer les pins
void setup() {
  // Initialisation des LEDs simples
  for (int i = 0; i < 6; i++) {
    pinMode(LED_PINS[i], OUTPUT);
    digitalWrite(LED_PINS[i], HIGH);
  }

  // 5 = niveau 1
  // 9 = niveau 2
  // 10 = niveau 3
  // 8 = niveau 4
  // 6 = niveau 5
  // 7 = niveau 6


  //digitalWrite(7, HIGH);

  // Configuration bouton
  pinMode(BUTTON_PIN_1, INPUT_PULLUP);
  pinMode(BUTTON_PIN_2, INPUT_PULLUP);

  /*
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);
    FastLED.show();
  */


  // Initialisation du port série
  Serial.begin(57600);
}


// Fonction principale
void loop() {
  Serial.println("OH");

  if (Serial.available()) {
    String value = Serial.readStringUntil('\n'); // Lire la ligne entière reçue

    //  removeTrailingNewline(value);

    // Afficher le message reçu
    Serial.print("ARDUINO Message reçu : ");
    Serial.println(value);
    /*
      Serial.print("COMP1: ");
      Serial.println(value == "l/1");
      Serial.print("COMP2: ");
      Serial.println(value == "l/1 ");
      Serial.print("COMP3: ");
      Serial.println(value == "l/1\r");
      Serial.print("COMP4: ");
      Serial.println(value == "l/1\r\n");
    */




    if (value == "s/0") {
      // éteindre tout
      digitalWrite(LED_PINS[0], LOW);
      digitalWrite(LED_PINS[1], LOW);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "s/1") {
      digitalWrite(LED_PINS[0], LOW);
      digitalWrite(LED_PINS[1], LOW);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
      /*
        currentLed = 0;
        animate = true;

        count = 0;
      */
    }

    if (value == "l/1") {

      Serial.print("LEVEL 1");

      // allume LED 1
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], LOW);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/2") {
      Serial.print("LEVEL 2");

      // allume LED 2
      digitalWrite(LED_PINS[0], HIGH);
      digitalWrite(LED_PINS[1], HIGH);
      digitalWrite(LED_PINS[2], LOW);
      digitalWrite(LED_PINS[3], LOW);
      digitalWrite(LED_PINS[4], LOW);
      digitalWrite(LED_PINS[5], LOW);
    }

    if (value == "l/3") {
      Serial.print("LEVEL 3");
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
      animate = false;
      // fin du jeu : clignotement ?
    }
  }




  // animate ring led

  // animate = true; // TODO: remove

  /*
    Serial.println(count);
    Serial.println(currentLed);

    if (animate == true) {
      count++;
      if (count % 10 == 0) {
        currentLed++;
      }
    }

    if (currentLed > NUM_LEDS) {
      currentLed = NUM_LEDS;
    }

    for (int i = 0; i <= NUM_LEDS; i++) {
      leds[i] = CRGB::Black;
    }

    for (int i = 0; i <= currentLed; i++) {
      leds[i] = CRGB::White;
    }


    FastLED.show();
  */


  // send button states

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

  delay(100);
}



// Fonction pour supprimer les caractères de fin comme '\r' ou '\n'
void removeTrailingNewline(char* str) {
  int len = strlen(str);
  while (len > 0 && (str[len - 1] == '\n' || str[len - 1] == '\r')) {
    str[len - 1] = '\0';
    len--;
  }
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
