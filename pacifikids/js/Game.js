let audio_intro;
let audio_intro2;
let audio_fail;


function setStep(newStep) {
  GAME_STEP = newStep;

  console.log('Set step: ' + newStep);


  if (GAME_STEP == STEPS.WAIT) {
    // ARDUINO :
    // activer le LED RING
    // mettre la strip à 0
    console.log('Send a/0 to Arduino');
    port.write('a/0');

    // SOFTWARE:

    // on démarre du premier tour du jeu
    STEP1_CURRENT_ROUND = 1;
  }

  if (GAME_STEP == STEPS.INTRO) {
    // ARDUINO :
    // activer le LED RING

    // SOFTWARE:

    // jouer l'audio INTRO
    audio_intro.currentTime = 0.00001;
    audio_intro.play();

    audio_intro.addEventListener('ended', function () {
      // on lance l'intro du premier jeu
      setStep(STEPS.STEP1_INTRO);
    })

  } else {
    audio_intro.pause();
    audio_intro.addEventListener('ended', function () { });
  }



  if (GAME_STEP == STEPS.STEP1_INTRO) {
    // ARDUINO :
    // désactiver le LED RING

    // SOFTWARE:

    // jouer l'audio INTRO2
    audio_intro2.currentTime = 0.00001;
    audio_intro2.play();

    audio_intro2.addEventListener('ended', function () {
      // on démarre le premier jeu après l'intro
      setStep(STEPS.STEP1_PLAY);
    })

  } else {
    audio_intro2.pause();
    audio_intro2.addEventListener('ended', function () { });
  }





  if (GAME_STEP == STEPS.STEP1_PLAY) {
    // wait for buttons
  }


  if (GAME_STEP == STEPS.STEP1_WIN) {
    console.log('Step1: round ' + STEP1_CURRENT_ROUND + ' won');


    // jouer l'audio SUCCESS
    audio_success.currentTime = 0.00001;
    audio_success.play();

    STEP1_CURRENT_ROUND++;

    if (STEP1_CURRENT_ROUND > 3) {
      setStep(STEPS.STEP1_OUTRO);
    } else {
      setTimeout(function () {
        setStep(STEPS.STEP1_PLAY);
      }, 1000);
    }
  }


  if (GAME_STEP == STEPS.STEP1_LOST) {
    // SOFTWARE:

    // jouer l'audio FAIL
    audio_fail.currentTime = 0.00001;
    audio_fail.play();

    // relancer le tour dans quelques secondes
    setTimeout(function () {
      setStep(STEPS.STEP1_PLAY);
    }, 10);
  }

  if (GAME_STEP == STEPS.STEP1_OUTRO) {
    console.log('Step1 ended!');

    // ARDUINO :
    // désactiver le LED RING
    // mettre la strip à 1
    console.log('Send a/1 to Arduino');
    port.write('a/1');

    // jouer l'audio PROGRESS
    audio_progress.currentTime = 0.00001;
    audio_progress.play();

    // SOFTWARE:
    // on attend que la strip soit entièrement éclairée
    setTimeout(function () {
      setStep(STEPS.STEP2_PLAY);
    }, ARDUINO_STRIP1_DURATION);
  }







  if (GAME_STEP == STEPS.STEP2_PLAY) {
    // wait for buttons

    STEP2_BUTTONS_ENABLED = {
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,
      button8: false,
      button9: false,
    };

    STEP2_BUTTONS_ENABLED_ORDER = [];
  }


  if (GAME_STEP == STEPS.STEP2_WIN) {
    console.log('Step2: won');

    // jouer l'audio SUCCESS
    audio_success.currentTime = 0.00001;
    audio_success.play();

    setTimeout(function () {
      setStep(STEPS.STEP2_OUTRO);
    }, 1000);
  }


  if (GAME_STEP == STEPS.STEP2_LOST) {
    // SOFTWARE:

    // jouer l'audio FAIL
    audio_fail.currentTime = 0.00001;
    audio_fail.play();

    // relancer le jeu n°2 dans quelques secondes
    setTimeout(function () {
      setStep(STEPS.STEP2_PLAY);
    }, 10);
  }

  if (GAME_STEP == STEPS.STEP2_OUTRO) {
    console.log('Step2 ended!');

    // ARDUINO :
    // désactiver le LED RING
    // mettre la strip à 2
    console.log('Send a/2 to Arduino');
    port.write('a/2');

    // jouer l'audio PROGRESS
    audio_progress.currentTime = 0.00001;
    audio_progress.play();

    // SOFTWARE:
    // on attend que la strip soit entièrement éclairée
    setTimeout(function () {
      setStep(STEPS.STEP3_PLAY);
    }, ARDUINO_STRIP2_DURATION);
  }










  if (GAME_STEP == STEPS.STEP3_PLAY) {
    // wait for buttons

    STEP3_BUTTONS_ENABLED = {
      button1: false,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,
      button8: false,
      button9: false,
    };
  }




  if (GAME_STEP == STEPS.STEP3_WIN) {
    console.log('Step3: won');

    // jouer l'audio SUCCESS
    audio_success.currentTime = 0.00001;
    audio_success.play();

    setTimeout(function () {
      setStep(STEPS.STEP3_OUTRO);
    }, 1000);
  }


  if (GAME_STEP == STEPS.STEP3_LOST) {
    // SOFTWARE:

    // jouer l'audio FAIL
    audio_fail.currentTime = 0.00001;
    audio_fail.play();

    // relancer le jeu n°3 dans quelques secondes
    setTimeout(function () {
      setStep(STEPS.STEP3_PLAY);
    }, 10);
  }

  if (GAME_STEP == STEPS.STEP3_OUTRO) {
    console.log('Step3 ended!');

    // ARDUINO :
    // désactiver le LED RING
    // mettre la strip à 3
    console.log('Send a/3 to Arduino');
    port.write('a/3');

    // jouer l'audio PROGRESS
    audio_progress.currentTime = 0.00001;
    audio_progress.play();

    // SOFTWARE:
    // on attend que la strip soit entièrement éclairée
    setTimeout(function () {
      setStep(STEPS.HANDS);
    }, ARDUINO_STRIP3_DURATION);
  }






  if (GAME_STEP == STEPS.HANDS) {
    // ARDUINO :

    // SOFTWARE:

    // jouer l'audio HANDS
    audio_hands.currentTime = 0.00001;
    audio_hands.play();

    audio_hands.addEventListener('ended', function () {
      // on attend les boutons pour lancer la fin du jeu
      //setStep(STEPS.OUTRO);
    })

  } else {
    audio_hands.pause();
    audio_hands.addEventListener('ended', function () { });
  }





  if (GAME_STEP == STEPS.OUTRO) {
    // ARDUINO :

    // SOFTWARE:

    // jouer l'audio HANDS
    audio_outro.currentTime = 0.00001;
    audio_outro.play();

    audio_outro.addEventListener('ended', function () {
      // on lance la fin du jeu
      setStep(STEPS.WAIT);
    })

  } else {
    audio_outro.pause();
    audio_outro.addEventListener('ended', function () { });
  }
}


function checkStep() {
  if (GAME_STEP == STEPS.WAIT) {
    if (
      isButtonActive('BUTTON_1')
      || isButtonActive('BUTTON_2')
      || isButtonActive('BUTTON_3')
      || isButtonActive('BUTTON_4')
      || isButtonActive('BUTTON_5')
      || isButtonActive('BUTTON_6')
      || isButtonActive('BUTTON_7')
      || isButtonActive('BUTTON_8')
      || isButtonActive('BUTTON_9')) {
      setStep(STEPS.INTRO);
    }
  }

  if (GAME_STEP == STEPS.INTRO) {
    // wait for audio_intro ended
  }

  if (GAME_STEP == STEPS.STEP1_PLAY) {

    console.log('Step1: playing round ' + STEP1_CURRENT_ROUND);

    if (STEP1_CURRENT_ROUND == 1) {
      if (BUTTONS.BUTTON_2.value == true) {
        setStep(STEPS.STEP1_WIN);
      } else if (
        isButtonActive('BUTTON_1')
        || isButtonActive('BUTTON_3')
        || isButtonActive('BUTTON_4')
        || isButtonActive('BUTTON_5')
        || isButtonActive('BUTTON_6')
        || isButtonActive('BUTTON_7')
        || isButtonActive('BUTTON_8')
        || isButtonActive('BUTTON_9')) {
        setStep(STEPS.STEP1_LOST);
      }
    }

    else if (STEP1_CURRENT_ROUND == 2) {
      if (isButtonActive('BUTTON_3')) {
        setStep(STEPS.STEP1_WIN);
      } else if (
        isButtonActive('BUTTON_1')
        || isButtonActive('BUTTON_2')
        || isButtonActive('BUTTON_4')
        || isButtonActive('BUTTON_5')
        || isButtonActive('BUTTON_6')
        || isButtonActive('BUTTON_7')
        || isButtonActive('BUTTON_8')
        || isButtonActive('BUTTON_9')) {
        setStep(STEPS.STEP1_LOST);
      }
    }

    else if (STEP1_CURRENT_ROUND == 3) {
      if (isButtonActive('BUTTON_8')) {
        setStep(STEPS.STEP1_WIN);
      } else if (
        isButtonActive('BUTTON_1')
        || isButtonActive('BUTTON_2')
        || isButtonActive('BUTTON_3')
        || isButtonActive('BUTTON_4')
        || isButtonActive('BUTTON_5')
        || isButtonActive('BUTTON_6')
        || isButtonActive('BUTTON_7')
        || isButtonActive('BUTTON_9')) {
        setStep(STEPS.STEP1_LOST);
      }
    }
  }



  if (GAME_STEP == STEPS.STEP2_PLAY) {

    console.log('Step2: playing');

    if (isButtonActive('BUTTON_1')) {
      STEP2_BUTTONS_ENABLED.button1 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(1)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(1);
      }
    }
    if (isButtonActive('BUTTON_2')) {
      STEP2_BUTTONS_ENABLED.button2 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(2)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(2);
      }
    }
    if (isButtonActive('BUTTON_3')) {
      STEP2_BUTTONS_ENABLED.button3 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(3)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(3);
      }
    }
    if (isButtonActive('BUTTON_4')) {
      STEP2_BUTTONS_ENABLED.button4 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(4)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(4);
      }
    }
    if (isButtonActive('BUTTON_5')) {
      STEP2_BUTTONS_ENABLED.button5 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(5)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(5);
      }
    }
    if (isButtonActive('BUTTON_6')) {
      STEP2_BUTTONS_ENABLED.button6 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(6)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(6);
      }
    }
    if (isButtonActive('BUTTON_7')) {
      STEP2_BUTTONS_ENABLED.button7 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(7)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(7);
      }
    }
    if (isButtonActive('BUTTON_8')) {
      STEP2_BUTTONS_ENABLED.button8 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(8)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(8);
      }
    }
    if (isButtonActive('BUTTON_9')) {
      STEP2_BUTTONS_ENABLED.button9 = true;
      if (!STEP2_BUTTONS_ENABLED_ORDER.includes(9)) {
        STEP2_BUTTONS_ENABLED_ORDER.push(9);
      }
    }

    let STEP2_NB_BUTTONS_ENABLED = 0;

    if (STEP2_BUTTONS_ENABLED.button1 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button2 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button3 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button4 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button5 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button6 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button7 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button8 == true) STEP2_NB_BUTTONS_ENABLED++;
    if (STEP2_BUTTONS_ENABLED.button9 == true) STEP2_NB_BUTTONS_ENABLED++;

    if (STEP2_NB_BUTTONS_ENABLED >= 3) {
      if (STEP2_BUTTONS_ENABLED.button8 == true
        && STEP2_BUTTONS_ENABLED.button3 == true
        && STEP2_BUTTONS_ENABLED.button5 == true) {
        setStep(STEPS.STEP2_WIN);
      } else {
        setStep(STEPS.STEP2_LOST);
      }
    }

  }



  if (GAME_STEP == STEPS.STEP3_PLAY) {

    console.log('Step3: playing');

    if (isButtonActive('BUTTON_1')) STEP3_BUTTONS_ENABLED.button1 = true;
    if (isButtonActive('BUTTON_2')) STEP3_BUTTONS_ENABLED.button2 = true;
    if (isButtonActive('BUTTON_3')) STEP3_BUTTONS_ENABLED.button3 = true;
    if (isButtonActive('BUTTON_4')) STEP3_BUTTONS_ENABLED.button4 = true;
    if (isButtonActive('BUTTON_5')) STEP3_BUTTONS_ENABLED.button5 = true;
    if (isButtonActive('BUTTON_6')) STEP3_BUTTONS_ENABLED.button6 = true;
    if (isButtonActive('BUTTON_7')) STEP3_BUTTONS_ENABLED.button7 = true;
    if (isButtonActive('BUTTON_8')) STEP3_BUTTONS_ENABLED.button8 = true;
    if (isButtonActive('BUTTON_9')) STEP3_BUTTONS_ENABLED.button9 = true;

    let STEP3_NB_BUTTONS_ENABLED = 0;

    if (STEP3_BUTTONS_ENABLED.button1 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button2 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button3 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button4 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button5 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button6 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button7 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button8 == true) STEP3_NB_BUTTONS_ENABLED++;
    if (STEP3_BUTTONS_ENABLED.button9 == true) STEP3_NB_BUTTONS_ENABLED++;

    if (STEP3_NB_BUTTONS_ENABLED >= 3) {
      if (STEP3_BUTTONS_ENABLED.button1 == true
        && STEP3_BUTTONS_ENABLED.button2 == true
        && STEP3_BUTTONS_ENABLED.button3 == true) {
        setStep(STEPS.STEP3_WIN);
      } else {
        setStep(STEPS.STEP3_LOST);
      }
    }

  }


  if (GAME_STEP == STEPS.HANDS) {
    if (HAND_1 == true && HAND_2 == true) {
      setStep(STEPS.OUTRO);
    }
  }
}