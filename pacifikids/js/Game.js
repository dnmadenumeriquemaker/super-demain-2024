let audio_intro;
let audio_intro2;
let audio_fail;


function setStep(newStep) {
  GAME_STEP = newStep;
  
  console.log('Set step: '+newStep);
  
  
  if (GAME_STEP == STEP_WAIT) {
    // ARDUINO :
    // activer le LED RING
    // mettre la strip à 0
    
    // SOFTWARE:
    
    // on démarre du premier tour du jeu
    STEP1_CURRENT_ROUND = 1;
  }
  
  if (GAME_STEP == STEP_INTRO) {
    // ARDUINO :
    // activer le LED RING
    
    // SOFTWARE:
    
    // jouer l'audio INTRO
    audio_intro.currentTime = 0.00001;
    audio_intro.play();
    
    audio_intro.addEventListener('ended',function(){
      // on lance l'intro du premier jeu
      setStep(STEP1_INTRO);
    })
    
  } else {
    audio_intro.pause();
    audio_intro.addEventListener('ended',function(){});
  }
  
  
  
  if (GAME_STEP == STEP1_INTRO) {
    // ARDUINO :
    // désactiver le LED RING
    
    // SOFTWARE:
    
    // jouer l'audio INTRO2
    audio_intro2.currentTime = 0.00001;
    audio_intro2.play();
    
    audio_intro2.addEventListener('ended',function(){
      // on démarre le premier jeu après l'intro
      setStep(STEP1_PLAY);
    })
    
  } else {
    audio_intro2.pause();
    audio_intro2.addEventListener('ended',function(){});
  }
  
  
  
  
  
  if (GAME_STEP == STEP1_PLAY) {
    // wait for buttons
  }
  
  
  if (GAME_STEP == STEP1_WIN) {
    console.log('Step1: round '+STEP1_CURRENT_ROUND+' won');
    
    STEP1_CURRENT_ROUND++;
    
    if (STEP1_CURRENT_ROUND > 3) {
      setStep(STEP1_OUTRO);
    } else {
      setTimeout(function() {
        setStep(STEP1_PLAY);
      },1000);
    }
  }
  
  
  if (GAME_STEP == STEP1_LOST) {
    // SOFTWARE:
    
    // jouer l'audio FAIL
    audio_fail.currentTime = 0.00001;
    audio_fail.play();
    
    // relancer le tour dans quelques secondes
    setTimeout(function() {
      setStep(STEP1_PLAY);
    },10);
  }
  
  if (GAME_STEP == STEP1_OUTRO) {
    console.log('Step1 ended!');
    
    // ARDUINO :
    // désactiver le LED RING
    // mettre la strip à 1
    
    // SOFTWARE:
    // on attend que la strip soit entièrement éclairée
    setTimeout(function() {
      setStep(STEP2_PLAY);
    }, ARDUINO_STRIP1_DURATION);
  }  
  
  
  
  
  
  
  
  if (GAME_STEP == STEP2_PLAY) {
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
  }
  
  
  if (GAME_STEP == STEP2_WIN) {
    console.log('Step2: won');
    
    setTimeout(function() {
      setStep(STEP2_OUTRO);
    },1000);
  }
  
  
  if (GAME_STEP == STEP2_LOST) {
    // SOFTWARE:
    
    // jouer l'audio FAIL
    audio_fail.currentTime = 0.00001;
    audio_fail.play();
    
    // relancer le jeu n°2 dans quelques secondes
    setTimeout(function() {
      setStep(STEP2_PLAY);
    },10);
  }
  
  if (GAME_STEP == STEP2_OUTRO) {
    console.log('Step2 ended!');
    
    // ARDUINO :
    // désactiver le LED RING
    // mettre la strip à 2
    
    // SOFTWARE:
    // on attend que la strip soit entièrement éclairée
    setTimeout(function() {
      setStep(STEP3_PLAY);
    }, ARDUINO_STRIP2_DURATION);
  }  
  
  
  
  
  
  
  
  
  
  
  if (GAME_STEP == STEP3_PLAY) {
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
}


function checkStep() {
  if (GAME_STEP == STEP_WAIT) {
    if (
        BUTTONS.BUTTON_1.value == true
     || BUTTONS.BUTTON_2.value == true
     || BUTTONS.BUTTON_3.value == true
     || BUTTONS.BUTTON_4.value == true
     || BUTTONS.BUTTON_5.value == true
     || BUTTONS.BUTTON_6.value == true
     || BUTTONS.BUTTON_7.value == true
     || BUTTONS.BUTTON_8.value == true
     || BUTTONS.BUTTON_9.value == true) {
      setStep(STEP_INTRO);
    }
  }
  
  if (GAME_STEP == STEP_INTRO) {
    // wait for audio_intro ended
  }
  
  if (GAME_STEP == STEP1_PLAY) {
    
    console.log('Step1: playing round '+STEP1_CURRENT_ROUND);
    
    if (STEP1_CURRENT_ROUND == 1) {
      if (BUTTONS.BUTTON_2.value == true) {
        setStep(STEP1_WIN);
      } else if (
          BUTTONS.BUTTON_1.value == true
       || BUTTONS.BUTTON_3.value == true
       || BUTTONS.BUTTON_4.value == true
       || BUTTONS.BUTTON_5.value == true
       || BUTTONS.BUTTON_6.value == true
       || BUTTONS.BUTTON_7.value == true
       || BUTTONS.BUTTON_8.value == true
       || BUTTONS.BUTTON_9.value == true) {
        setStep(STEP1_LOST);
      }
    }
    
    else if (STEP1_CURRENT_ROUND == 2) {
      if (BUTTONS.BUTTON_3.value == true) {
        setStep(STEP1_WIN);
      } else if (
          BUTTONS.BUTTON_1.value == true
       || BUTTONS.BUTTON_2.value == true
       || BUTTONS.BUTTON_4.value == true
       || BUTTONS.BUTTON_5.value == true
       || BUTTONS.BUTTON_6.value == true
       || BUTTONS.BUTTON_7.value == true
       || BUTTONS.BUTTON_8.value == true
       || BUTTONS.BUTTON_9.value == true) {
        setStep(STEP1_LOST);
      }
    }
    
    else if (STEP1_CURRENT_ROUND == 3) {
      if (BUTTONS.BUTTON_8.value == true) {
        setStep(STEP1_WIN);
      } else if (
          BUTTONS.BUTTON_1.value == true
       || BUTTONS.BUTTON_2.value == true
       || BUTTONS.BUTTON_3.value == true
       || BUTTONS.BUTTON_4.value == true
       || BUTTONS.BUTTON_5.value == true
       || BUTTONS.BUTTON_6.value == true
       || BUTTONS.BUTTON_7.value == true
       || BUTTONS.BUTTON_9.value == true) {
        setStep(STEP1_LOST);
      }
    }
  }
  
  
  
  if (GAME_STEP == STEP2_PLAY) {
    
    console.log('Step2: playing');
    
    if (BUTTONS.BUTTON_1.value == true) STEP2_BUTTONS_ENABLED.button1 = true;
    if (BUTTONS.BUTTON_2.value == true) STEP2_BUTTONS_ENABLED.button2 = true;
    if (BUTTONS.BUTTON_3.value == true) STEP2_BUTTONS_ENABLED.button3 = true;
    if (BUTTONS.BUTTON_4.value == true) STEP2_BUTTONS_ENABLED.button4 = true;
    if (BUTTONS.BUTTON_5.value == true) STEP2_BUTTONS_ENABLED.button5 = true;
    if (BUTTONS.BUTTON_6.value == true) STEP2_BUTTONS_ENABLED.button6 = true;
    if (BUTTONS.BUTTON_7.value == true) STEP2_BUTTONS_ENABLED.button7 = true;
    if (BUTTONS.BUTTON_8.value == true) STEP2_BUTTONS_ENABLED.button8 = true;
    if (BUTTONS.BUTTON_9.value == true) STEP2_BUTTONS_ENABLED.button9 = true;
    
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
    
    console.log(STEP2_BUTTONS_ENABLED);
    console.log(STEP2_NB_BUTTONS_ENABLED);
    
    if (STEP2_NB_BUTTONS_ENABLED >= 3) {
      if (STEP2_BUTTONS_ENABLED.button8 == true
       && STEP2_BUTTONS_ENABLED.button2 == true
       && STEP2_BUTTONS_ENABLED.button3 == true) {
        // TODO: order!! (this code is OK for game 3)
      } else {
        setStep(STEP2_LOST);
      }
    }
    
  }
  
  
  
  if (GAME_STEP == STEP3_PLAY) {
    
    console.log('Step3: playing');
    
    if (BUTTONS.BUTTON_1.value == true) STEP3_BUTTONS_ENABLED.button1 = true;
    if (BUTTONS.BUTTON_2.value == true) STEP3_BUTTONS_ENABLED.button2 = true;
    if (BUTTONS.BUTTON_3.value == true) STEP3_BUTTONS_ENABLED.button3 = true;
    if (BUTTONS.BUTTON_4.value == true) STEP3_BUTTONS_ENABLED.button4 = true;
    if (BUTTONS.BUTTON_5.value == true) STEP3_BUTTONS_ENABLED.button5 = true;
    if (BUTTONS.BUTTON_6.value == true) STEP3_BUTTONS_ENABLED.button6 = true;
    if (BUTTONS.BUTTON_7.value == true) STEP3_BUTTONS_ENABLED.button7 = true;
    if (BUTTONS.BUTTON_8.value == true) STEP3_BUTTONS_ENABLED.button8 = true;
    if (BUTTONS.BUTTON_9.value == true) STEP3_BUTTONS_ENABLED.button9 = true;
    
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
      if (STEP3_BUTTONS_ENABLED.button8 == true
       && STEP3_BUTTONS_ENABLED.button2 == true
       && STEP3_BUTTONS_ENABLED.button3 == true) {
        // TODO: order!! (this code is OK for game 3)
      }
    }
    
  }
}