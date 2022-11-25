import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";
import * as speech from "expo-speech";
import { stopPreviousVoice, fourWayQuestion } from "../constant/textToSpeech";
import {
  Question,
  Icon,
  Ans_up,
  Ans_down,
  Ans_left,
  Ans_right,
} from "../constant/EssentialQuestion";

//import DisplayResultScreen from "./DisplayResultScreen";
import DoubleTap from "../components/DoubleTap";
//import YesNoChoiceScreen from "./YesNoChoiceScreen";
import ConfirmBeforeFetch from "./ConfirmBeforeFetch";

function SwipeScreen() {
  //-----------------------------------------  SWIPE SECTION
  //config for the swipe speed
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  //declare variables for pass in each state
  //define question number
  const [questionState, setQuestionState] = useState(0);
  //define current question text
  const [currentQuestion, setCurrentQuestion] = useState(Question[0]);
  //define answer array to forward to next screen
  const [answerArray, setAnswerArray] = useState("");

  //swipe to add the answer to answer array
  //todo when swipe up
  function SwipeUpHandler() {
    setAnswerArray([...answerArray, Ans_up[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
    stopPreviousVoice();
  }
  //todo when swipe down
  function SwipeDownHandler() {
    setAnswerArray([...answerArray, Ans_down[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
    stopPreviousVoice();
  }

  //todo when swipe left
  function SwipeLeftHandler() {
    setAnswerArray([...answerArray, Ans_left[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
    stopPreviousVoice();
  }

  //todo when swipe right
  function SwipeRightHandler() {
    setAnswerArray([...answerArray, Ans_right[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
    stopPreviousVoice();
  }

  //double tap to back to previous question
  function DoubleTapHandler() {
    if (questionState > 0) {
      answerArray.pop();
      setQuestionState(questionState - 1);
      setCurrentQuestion(Question[questionState - 1]);
      stopPreviousVoice();
    }
  }
  //----------------------------------------- TEXT TO SPEECH
  // List to speak (in order)
  // currentQuestion
  // "swipe up for"     Ans_up[questionState]
  // "swipe down for"   Ans_down[questionState]
  // "swipe left for"   Ans_left[questionState]
  // "swipe right for"  Ans_right[questionState]
  // "Tap twice to back to previous question"
  fourWayQuestion(
    currentQuestion,
    Ans_up[questionState],
    Ans_down[questionState],
    Ans_left[questionState],
    Ans_right[questionState]
  );
  //----------------------------------------- SCREEN APPEARANCE

  let renderElements = (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeUp={SwipeUpHandler}
        onSwipeDown={SwipeDownHandler}
        onSwipeLeft={SwipeLeftHandler}
        onSwipeRight={SwipeRightHandler}
        config={config}
      >
        <StatusBar style="auto" />
        <DoubleTap doubleTap={DoubleTapHandler} style={styles.container}>
          {/*Header Showing Question*/}
          <View style={styles.HeaderRectangle}>
            <Text style={styles.whiteText}>{currentQuestion}</Text>
          </View>
          <LinearGradient
            colors={["#ff8f8f8c", "#FFFFFF00", "#FFFFFF00", "#ffdb808c"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.swipeArea}
          >
            <LinearGradient
              colors={["#97e0ff8c", "#FFFFFF00", "#FFFFFF00", "#8fffbc8c"]}
              start={{ x: 1, y: 0.5 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.swipeFillArea}
            >
              {/* All Elements in swipe area are here*/}

              <View style={styles.midArea}>
                <Text style={styles.text2}>{Ans_up[questionState]}</Text>
              </View>

              <View style={styles.midArea}>
                <View width="20%" maxWidth="30%">
                  <Text style={styles.text2}>{Ans_left[questionState]}</Text>
                </View>
                <View style={styles.resultArea}>
                  <Text style={styles.answer}> {Icon[questionState]} </Text>
                  <View style={styles.logoSpace}>
                    <Image
                      ImageSource={require("../assets/kinraideelogoNotext.png")}
                      style={styles.logo}
                      source={require("../assets/kinraideelogoNotext.png")}
                    ></Image>
                  </View>
                </View>
                <View width="20%" maxWidth="30%">
                  <Text style={styles.text2}>{Ans_right[questionState]}</Text>
                </View>
              </View>

              <View style={styles.midArea}>
                <Text style={styles.text2}>{Ans_down[questionState]}</Text>
              </View>
            </LinearGradient>
          </LinearGradient>
          <View style={styles.FooterRectangle}>
            <Text style={styles.whiteText}>Tap Twice To Back </Text>
          </View>
        </DoubleTap>
      </GestureRecognizer>
    </View>
  );

  //----------------------------------------- Forward Answer to confirm screen
  if (questionState > Question.length - 1) {
    renderElements = (
      <ConfirmBeforeFetch type={answerArray[0]} sortBy={answerArray[1]} />
    );
  }

  //----------------------------------------- Display the screen
  return renderElements;
}

export default SwipeScreen;

//----------------------------------------- CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFFFF",
  },

  //texts
  whiteText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "center",
    fontFamily: "BaiJamBold",
    color: "#ffffff",
  },
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "center",
    fontFamily: "BaiJamBold",
    color: "#000000",
  },
  answer: {
    fontSize: 36,
    color: "#F4722B",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },

  //header and footer rectangle
  HeaderRectangle: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#454545",
    justifyContent: "center",
  },
  FooterRectangle: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#454545",
    justifyContent: "center",
  },
  resultArea: {
    maxWidth: "50%",
    width: "40%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 5,
    borderColor: "#F4722B",
    backgroundColor: "#FFFFFF",

    //borderLeftColor: "#8fffbc",
    //borderBottomColor: "#ffdb80",
    //borderRightColor: "#97e0ff",
    //borderTopColor: "#ff8f8f",
  },
  //Area To Swipe
  swipeArea: {
    maxHeight: "75%",
    maxWidth: "100%",
    borderWidth: 15,
    borderLeftColor: "#8fffbc",
    borderBottomColor: "#ffdb80",
    borderRightColor: "#97e0ff",
    borderTopColor: "#ff8f8f",
    alignSelf: "center",
  },
  swipeFillArea: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    flex: 3,
    justifyContent: "space-around",
  },
  midArea: {
    width: "100%",
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "center",
    //alignSelf:"center"
  },
});
