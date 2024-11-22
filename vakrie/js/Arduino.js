let port;
let connectBtn;

let BUTTON_1 = false;
let BUTTON_2 = false;

function initArduino() {
  if (!USE_ARDUINO) return;

  port = createSerial();



  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(80, 200);
  connectBtn.mousePressed(connectBtnClick);


  // in setup, we can open ports we have used previously
  // without user interaction

  let usedPorts = usedSerialPorts();

  console.log('usedPorts', usedPorts);



  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
    if (connectBtn) {
      connectBtn.remove();
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
    connectBtn.remove();
  } else {
    //port.close();
  }
}

function listenToArduino() {
  if (!USE_ARDUINO) return;
  if (!port) return;

  if (!port.opened()) {
    console.log('Waiting for Arduino');
  } else {
    //console.log('Connected');


    let value = port.readUntil("\n");

    console.log('Serial value:', value);

    if (value.length > 0) {
      handleSerialData(value);
    }
  }
}

function handleSerialData(value) {
  let values = value.split('/');
  
  if (values[0] == 'none') return;
  // if (values[0] == 'a') return;

  if (value == '1/1') {
    BUTTON_1 = true;
    BUTTON_2 = true;
  } else {

    BUTTON_1 = false;
    BUTTON_2 = false;
  }
  /*

  console.log('value1: ', int(values[0]));
  console.log('value2: ', int(values[1]));

  if (int(values[0]) == 1) {
    BUTTON_1 = true;
  } else {
    BUTTON_1 = false;
  }

  if (int(values[1]) == 1) {
    BUTTON_2 = true;
  } else {
    BUTTON_2 = false;
  }
    */

}

function hud() {
  background(220);

  push();
  translate(100, 100);

  fill(buttonColor(BUTTON_1));
  rect(150, 0, 50, 50);

  fill(buttonColor(BUTTON_2));
  rect(150, 70, 50, 50);
  pop();

}



function buttonColor(state) {
  if (state == true) return color(0, 255, 0);
  else return color(0, 0, 0);
}


function checkMic() {
  let vol = input.getLevel();

  // intensity
  let level = int(map(vol * 100, SEUIL_MIN, SEUIL_MAX, 1, 7));

  console.log(level);
  
  console.log('send l/'+level);
  port.write('l/'+level);


  // duration
  // if (vol > 0.5) {
  //   intensity++;

  //   if (intensity >= stepIntensity) {
  //     ledState++;
  //     intensity = 0;
  //   }
  // }


  // console.log(vol);
  // console.log(intensity);
  // console.log('ledState', ledState);
}