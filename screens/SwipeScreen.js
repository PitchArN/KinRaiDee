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


  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const [questionState, setQuestionState] = useState(0);
  const [currentQuestion,setCurrentQuestion] = useState(Question[0]);
  const [answerArray, setAnswerArray] = useState('');

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

      {/* <Text style={styles.text}>{console.log(answerArray)}</Text>  */}
      
    </GestureRecognizer>
  );

  if (questionState > 3 ) {
    

    renderElements = <DisplayResultScreen onSelected={answerArray}/>;
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
