import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";
import DoubleClicker from "react-native-double-tap";

import {
  Question,
  Ans_up,
  Ans_down,
  Ans_left,
  Ans_right,
} from "../constant/QuestionAndChoiceDirection";
import DisplayResultScreen from "./DisplayResultScreen";

function SwipeScreen() {
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const [questionState, setQuestionState] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(Question[0]);
  const [answerArray, setAnswerArray] = useState("");

  function SwipeUpHandler() {
    setAnswerArray([...answerArray, Ans_up[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeDownHandler() {
    setAnswerArray([...answerArray, Ans_down[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeLeftHandler() {
    setAnswerArray([...answerArray, Ans_left[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeRightHandler() {
    setAnswerArray([...answerArray, Ans_right[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function DoubleTapHandler() {
    if (questionState > 0) {
      answerArray.pop();
      setQuestionState(questionState - 1);
      setCurrentQuestion(Question[questionState - 1]);
    }
  }

  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      onSwipeLeft={SwipeLeftHandler}
      onSwipeRight={SwipeRightHandler}
      config={config}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <DoubleClicker
        doubleTap={DoubleTapHandler}
        style={styles.DoubleTapContainer}
      >
        <View style={styles.container}>
          {/* 
      Test Display Output
      <Text style={styles.text}>{console.log(answerArray)}</Text>
      <Text style={styles.text}>{currentQuestion}</Text>
      <Text style={styles.text}>{questionState}</Text>  
    */}

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

              <View style={styles.midArea} >
                <Text style={styles.text2} >{Ans_up[questionState]}</Text>
              </View>

              <View style={styles.midArea} >
                <Text style={styles.text2}>{Ans_left[questionState]}</Text>
                <Text style={styles.text2}>{Ans_right[questionState]}</Text>
              </View>
      
              <View style={styles.midArea} >
                <Text style={styles.text2}>{Ans_down[questionState]}</Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          <View style={styles.FooterRectangle}>
            <Text Style={styles.whiteText}>Double Tap To Back </Text>
          </View>
        </View>
      </DoubleClicker>
    </GestureRecognizer>
  );

  if (questionState > 3) {
    renderElements = <DisplayResultScreen onSelected={answerArray} />;
  }

  return renderElements;
}

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  whiteText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "top",
    fontFamily: "BaiJam-Bold",
    color: "#ffffff",
  },

  //texts
  text2: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "center",
    fontFamily: "BaiJam-Bold",
    color: "#000000",
  },

  //header and footer rectangle
  HeaderRectangle: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#454545",
    justifyContent: "center",
  },
  FooterRectangle: {
    height: "5%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#454545",
    justifyContent: "center",
  },

  //Area To Swipe
  swipeArea: {
    height: "70%",
    width: "100%",
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
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
