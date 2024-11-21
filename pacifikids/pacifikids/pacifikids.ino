const int buttonPins[9] = {2, 3, 4, 5, 6, 7, 8, 9, 10};
const int touchPins[2] = {11, 12}; // Modifier pour utiliser `touchRead` sur une carte compatible

int buttonStates[9];
int touchStates[2];

void setup() {
  // Initialisation du port série
  Serial.begin(57600);
  
  // Configurer les pins des boutons en entrée
  for (int i = 0; i < 9; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP); // INPUT_PULLUP pour éviter les résistances externes
  }

  // Configurer les pins des bandes de cuivre (en entrée si non capacitif)
  for (int i = 0; i < 2; i++) {
    pinMode(touchPins[i], INPUT); 
  }
}

void loop() {
  // Lire l'état des boutons
  for (int i = 0; i < 9; i++) {
    buttonStates[i] = !digitalRead(buttonPins[i]); // Inverser car INPUT_PULLUP
  }

  // Lire l'état des bandes de cuivre
  for (int i = 0; i < 2; i++) {
    touchStates[i] = digitalRead(touchPins[i]); // Remplacez par `touchRead(touchPins[i])` si capacitif
  }

  // Afficher les données sur le port série
  for (int i = 0; i < 9; i++) {
    Serial.print(buttonStates[i]);
    Serial.print("/");
  }
  for (int i = 0; i < 2; i++) {
    Serial.print(touchStates[i]);
    if (i < 1) Serial.print("/");
  }
  Serial.println();

  delay(100); // Petit délai pour lisibilité (ajustable)
}
