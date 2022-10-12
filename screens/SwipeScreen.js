import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer from "react-native-swipe-gestures";

import {
  Question,
  Ans_up,
  Ans_down,
  Ans_left,
  Ans_right,
} from "../constant/QuestionAndChoiceDirection";
import DisplayResultScreen from "./DisplayResultScreen";

function SwipeScreen() {
  let selection = [];

  
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const [questionState, setQuestionState] = useState(0);
  const [currentQuestion,setCurrentQuestion] = useState(Question[0]);

  function SwipeUpHandler() {
    selection[questionState] = Ans_up[questionState];
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeDownHandler() {
    selection[questionState] = Ans_down[questionState];
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeLeftHandler() {
    selection[questionState] = Ans_left[questionState];
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
  }

  function SwipeRightHandler() {
    selection[questionState] = Ans_right[questionState];
    setQuestionState(questionState + 1);
    setCurrentQuestion(Question[questionState + 1]);
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
      <Text style={styles.text}>{currentQuestion}</Text>
      <Text style={styles.text}>{questionState}</Text>
      <Text style={styles.text}>{}</Text>
    </GestureRecognizer>
  );

  if (questionState > 3 || questionState < 0) {

    renderElements = <DisplayResultScreen />;
  }

  return renderElements;
}

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
