import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";

import {
  RestaurantQuestion,
  CafeQuestion,
  BakeryQuestion,
  BarQuestion,
  BarKey,
  CafeKey,
  BakeryKey,
  RestaurantKey,
} from "../constant/FilterQuestion";

import DisplayResultScreen from "./DisplayResultScreen";
import DoubleTap from "../components/DoubleTap";

function YesNoChoiceScreen({ onSelected }) {
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const [questionState, setQuestionState] = useState(0);
  
  const [answerArray, setAnswerArray] = useState("");

  let QuestionArray = [''];
  let FilterSelectedChoice = [''];

  if (onSelected[0] === "Restaurant") {
    QuestionArray = RestaurantQuestion;
    FilterSelectedChoice = RestaurantKey;

  } else if (onSelected[0] === "Bar") {
    QuestionArray = BarQuestion;
    FilterSelectedChoice = BarKey;

  } else if (onSelected[0] === "Bakery") {
    QuestionArray = BakeryQuestion;
    FilterSelectedChoice = BakeryKey;

  } else {
    QuestionArray = CafeQuestion;
    FilterSelectedChoice = CafeKey;

  }

  const [currentQuestion, setCurrentQuestion] = useState(QuestionArray[questionState]);

  function SwipeLeftHandler() {
    //Select No
    setAnswerArray([...answerArray,","+ "-"]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(QuestionArray[questionState + 1]);
  }

  function SwipeRightHandler() {
    //Select Yes
    setAnswerArray([...answerArray,","+ FilterSelectedChoice[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(QuestionArray[questionState + 1]);
  }

  function DoubleTapHandler() {
    //back to previous question
    if (questionState > 0) {
      answerArray.pop();
      setQuestionState(questionState - 1);
      setCurrentQuestion(QuestionArray[questionState - 1]);
    }
  }

  let renderElements = (
    <GestureRecognizer
      onSwipeLeft={SwipeLeftHandler}
      onSwipeRight={SwipeRightHandler}
      config={config}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <DoubleTap doubleTap={DoubleTapHandler} style={styles.DoubleTapContainer}>
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

              <View style={styles.midArea}>
                <Text style={styles.text2}>{}</Text>
              </View>

              <View style={styles.midArea}>
                <Text style={styles.text2}>No</Text>
                <Text style={styles.text2}>Yes</Text>
              </View>

              <View style={styles.midArea}>
                <Text style={styles.text2}>{}</Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          <View style={styles.FooterRectangle}>
            <Text Style={styles.whiteText}>Double Tap To Back </Text>
          </View>
        </View>
      </DoubleTap>
    </GestureRecognizer>
  );

  if (questionState > QuestionArray.length - 1) {
    renderElements = <DisplayResultScreen onSelected={answerArray} type={onSelected[0]} sortBy={onSelected[1]}  />;
  }

  return renderElements;
}

export default YesNoChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  //texts
  whiteText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "top",
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
