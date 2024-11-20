let HAND_1 = false;
let HAND_2 = false;

let BUTTONS = {
  BUTTON_1: {
    locked: false,
    value: false,
  },
  BUTTON_2: {
    locked: false,
    value: false,
  },
  BUTTON_3: {
    locked: false,
    value: false,
  },
  BUTTON_4: {
    locked: false,
    value: false,
  },
  BUTTON_5: {
    locked: false,
    value: false,
  },
  BUTTON_6: {
    locked: false,
    value: false,
  },
  BUTTON_7: {
    locked: false,
    value: false,
  },
  BUTTON_8: {
    locked: false,
    value: false,
  },
  BUTTON_9: {
    locked: false,
    value: false,
  },
};


let port;
let connectBtn;


function initArduino() {
  if (!USE_ARDUINO) return;
  
  port = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

  
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  /*
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);
  */
}

function listenToArduino() {
  if (!USE_ARDUINO) return;
  if (!port) return;
  
  let value = port.readUntil("\n");
  
  if (value.length > 0) {
    
    let values = value.split('/');

    if (int(values[0]) == 1) {
      setButtonToActive('BUTTON_1');
    } else {
      setButtonToInactive('BUTTON_1', true);
    }

    if (int(values[1]) == 1) {
      setButtonToActive('BUTTON_2');
    } else {
      setButtonToInactive('BUTTON_2', true);
    }

    if (int(values[2]) == 1) {
      setButtonToActive('BUTTON_3');
    } else {
      setButtonToInactive('BUTTON_3', true);
    }

    if (int(values[3]) == 1) {
      setButtonToActive('BUTTON_4');
    } else {
      setButtonToInactive('BUTTON_4', true);
    }

    if (int(values[4]) == 1) {
      setButtonToActive('BUTTON_5');
    } else {
      setButtonToInactive('BUTTON_5', true);
    }

    if (int(values[5]) == 1) {
      setButtonToActive('BUTTON_6');
    } else {
      setButtonToInactive('BUTTON_6', true);
    }

    if (int(values[6]) == 1) {
      setButtonToActive('BUTTON_7');
    } else {
      setButtonToInactive('BUTTON_7', true);
    }

    if (int(values[7]) == 1) {
      setButtonToActive('BUTTON_8');
    } else {
      setButtonToInactive('BUTTON_8', true);
    }

    if (int(values[8]) == 1) {
      setButtonToActive('BUTTON_9');
    } else {
      setButtonToInactive('BUTTON_9', true);
    }
    
    HAND_1 = int(values[9]);
    HAND_2 = int(values[10]);
  }

  // changes button label based on connection status
  if (!port.opened()) {
    //console.log('Waiting for Arduino');
  } else {
    //console.log('Connected');
  }
}

function hud() {
  background(220);
  text('Step : ' + GAME_STEP, 50, 50);
  
  push();
  translate(100,100);
  fill(buttonColor(BUTTONS.BUTTON_1.value));
  ellipse(25, -15, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_2.value));
  ellipse(55, 5, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_3.value));
  ellipse(70, 40, 20, 20);
  
  
  fill(buttonColor(BUTTONS.BUTTON_4.value));
  ellipse(35, 95, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_5.value));
  ellipse(0, 105, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_6.value));
  ellipse(-35, 95, 20, 20);
  
  
  fill(buttonColor(BUTTONS.BUTTON_7.value));
  ellipse(-70, 40, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_8.value));
  ellipse(-55, 5, 20, 20);
  
  fill(buttonColor(BUTTONS.BUTTON_9.value));
  ellipse(-25, -15, 20, 20);
  
  fill(buttonColor(HAND_1));
  rect(150, 0, 50, 50);
  
  fill(buttonColor(HAND_2));
  rect(150, 70, 50, 50);
  pop();
}



function buttonColor(state) {
  if (state == true) return color(0,255,0);
  else return color(0,0,0);
}