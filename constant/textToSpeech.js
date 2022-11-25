import * as speech from "expo-speech";

function stopPreviousVoice() {
  if (speech.isSpeakingAsync()) {
    speech.stop();
    return true;
  } else {
    return false;
  }
}

function fourWayQuestion(question, up, down, left, right) {
  stopPreviousVoice();
  if (question != null) {
    speech.speak(question);
    speech.speak("swipe up for " + up);
    speech.speak("swipe down for " + down);
    speech.speak("swipe left for " + left);
    speech.speak("swipe right for " + right);
    speech.speak("\n Tap twice to back to previous question");
  }
}

function confirmQuestion(question) {
  stopPreviousVoice();
  // confirm question
  if (question != null) {
    speech.speak(question);
    speech.speak("swipe up to cancel");
    speech.speak("swipe down to confirm");
  }
}

function twoWayQuestion(question) {
  stopPreviousVoice();
  if (question != null) {
    speech.speak(question);
    speech.speak("swipe up for no");
    speech.speak("swipe down for yes");
  }
}

function resultReading(name,dist,score,phone) {
  stopPreviousVoice();
  if(name!=null){
    speech.speak("Here is the result");
    speech.speak(name);
    speech.speak("\nscore "+score);
    speech.speak(dist+"kilometers away from you");
    speech.speak("swipe up for next result");
    speech.speak("swipe down to start search again");
    if(phone!=null){
        speech.speak("swipe left to make a call");
    }
    speech.speak("swipe right to see map pin");
    

  }
}

export {
  stopPreviousVoice,
  fourWayQuestion,
  twoWayQuestion,
  resultReading,
  confirmQuestion,
};
