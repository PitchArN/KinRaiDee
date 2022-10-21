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
      <View style={styles.HeaderRectangle}><Text style={styles.text}>{currentQuestion}</Text></View>

      <View style={styles.upArea}>
        <Text Style={styles.text2}>Swipe Up Answer</Text>
      </View>

      <View style={styles.leftAndRightArea}>
        <View style={styles.rightArea}><Text Style={styles.text2}>Swipe Right Answer</Text></View>
        <View style={styles.leftArea}><Text Style={styles.text2}>Swipe Left Answer</Text></View>
      </View>



      <View style= {styles.downArea}><Text Style={styles.text2}>Swipe Down Answer</Text></View>


      <View style={styles.FooterRectangle}><Text Style={styles.text}>Double Tap To Back </Text></View>
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 18,
    color: "white",
  },

//texts
  text1: {
    textAlign: 'center',
    verticalAlign: 'center',
    fontSize: 18,
    //fontFamily: 'Inter',
    lineHeight: 'auto',
    color: '#ffffff',
  },
  text2: {
    textAlign: 'center',
    verticalAlign: 'top',
    fontSize: 12,
    //fontFamily: 'Inter',
    lineHeight: 'auto',
    color: '#000000',
  },
 
//header and footer rectangle
HeaderRectangle:{
  height: '15%',
  width: '100%',
  alignItems: "center",
  backgroundColor: '#454545',
},
FooterRectangle:{
  height: '10%',
  width: '100%',
  alignItems: "center",
  backgroundColor: '#454545',
},

//Area To Swipe
  centerQuestion:{
    height: '100%',
    width: '40%',
    backgroundColor: '#454545',
  },
  leftAndRightArea:{
    height: '50%',
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
  },
  rightArea: {
    alignSelf: 'flex-end',
    height: '100%',
    width: '50%',
    backgroundColor: '#97e0ff',
  },
  leftArea: {
    alignSelf: 'flex-start',
    height: '100%',
    width: '50%',
    backgroundColor: '#8fffbc',
  },
  downArea: {
    alignSelf: 'flex-end',
    height: '15%',
    width: '100%',
    backgroundColor: '#ffdb80',
  },
  upArea: {
    alignSelf: 'flex-start',
    height: '15%',
    width: '100%',
    backgroundColor: '#ff8f8f',
  }
});