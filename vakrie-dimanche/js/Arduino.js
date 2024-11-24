let port;
let connectBtn;

let BUTTON_1 = false;
let BUTTON_2 = false;

let countButton1On = 0;
let countButton1Off = 0;
let countButton2On = 0;
let countButton2Off = 0;

let antiFlood1 = false;
let antiFlood2 = false;

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
    port.open(usedPorts[0], 9600);
    if (connectBtn) {
      connectBtn.remove();
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
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

    if (value.length > 0) {
      handleSerialData(value);
    }
  }

}

function handleSerialData(value) {

  let values = value.split('/');

  console.log('[ Arduino ] ' + value);

  if (values[0] == 'none') return;
  // if (values[0] == 'a') return;

  if (value == "1/1\r\n") { // dirty but okay-ish
    BUTTON_1 = true;
    BUTTON_2 = true;
  }
  else if (value == "1/0\r\n") { // dirty but okay-ish
    BUTTON_1 = true;
    BUTTON_2 = false;
  }
  else if (value == "0/1\r\n") { // dirty but okay-ish
    BUTTON_1 = false;
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


function checkTapote() {
  if (BUTTON_1 == true) {
    if (!antiFlood1) {
      antiFlood1 = true;
      countButton1On++;
    }
  }

  if (BUTTON_1 == false) {
    antiFlood1 = false;
  }

  if (BUTTON_2 == true) {
    if (!antiFlood2) {
      antiFlood2 = true;
      countButton2On++;
    }
  }

  if (BUTTON_2 == false) {
    antiFlood2 = false;
  }

  console.log(countButton1On, countButton2On);

  let val = countButton1On + countButton2On;

  if (val >= SEUILS[0][0] && val <= SEUILS[0][1]) {
    ledState = 1;
  }
  if (val >= SEUILS[1][0] && val <= SEUILS[1][1]) {
    ledState = 2;
  }
  if (val >= SEUILS[2][0] && val <= SEUILS[2][1]) {
    ledState = 3;
  }
  if (val >= SEUILS[3][0] && val <= SEUILS[3][1]) {
    ledState = 4;
  }
  if (val >= SEUILS[4][0] && val <= SEUILS[4][1]) {
    ledState = 5;
  }
  if (val >= SEUILS[5][0] && val <= SEUILS[5][1]) {
    ledState = 6;
  }
}

/*
function checkMic() {
  let vol = input.getLevel();

  // intensity
  let level = int(map(vol * 100, SEUIL_MIN, SEUIL_MAX, 1, 7));

  console.log('VOL ' + (vol * 100));
  console.log('LEVEL ' + level);

  level = Math.abs(level);

  if (level > maxLevel) {
    maxLevel = level;

    // setTimeout(function () {
    //   // send max level
    //  // port.write('m/' + maxLevel);
    // }, 10);
  }


  // duration

  if (vol >= 0.45) {
    intensity++;
    console.log('intensity', intensity);

    if (intensity >= stepIntensity) {
      ledState++;
      intensity = 0;
    }

    if (ledState > 6) ledState = 6;
  }


  // console.log(vol);
  // console.log(intensity);
  // console.log('ledState', ledState);
}
  */

function sendToArduino() {

  console.log('send maxlevel: ' + maxLevel);

  //port.write(parseInt(maxLevel));
  // port.write(""+maxLevel+"");
  port.write("" + ledState + "");
}