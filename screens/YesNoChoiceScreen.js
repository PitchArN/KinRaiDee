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

function YesNoChoiceScreen({ type,sortBy }) {
  

  //-----------------------------------------  QUESTION SELECTION SECTION
  const [questionState, setQuestionState] = useState(0);
  
  const [answerArray, setAnswerArray] = useState("");

  let QuestionArray = [''];
  let FilterSelectedChoice = [''];

  if (type === "Restaurant") {
    QuestionArray = RestaurantQuestion;
    FilterSelectedChoice = RestaurantKey;

  } else if (type === "Bar") {
    QuestionArray = BarQuestion;
    FilterSelectedChoice = BarKey;

  } else if (type === "Bakery") {
    QuestionArray = BakeryQuestion;
    FilterSelectedChoice = BakeryKey;

  } else {
    QuestionArray = CafeQuestion;
    FilterSelectedChoice = CafeKey;

  }

  const [currentQuestion, setCurrentQuestion] = useState(QuestionArray[questionState]);

//-----------------------------------------  SWIPE SCREEN SECTION 
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  function SwipeUpHandler() {
    //Select No
    setAnswerArray([...answerArray,"-"+FilterSelectedChoice[questionState]]);
    setQuestionState(questionState + 1);
    setCurrentQuestion(QuestionArray[questionState + 1]);
  }

  function SwipeDownHandler() {
    //Select Yes
    setAnswerArray([...answerArray,"+"+FilterSelectedChoice[questionState]]);
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
//-----------------------------------------  API FETCH SECTION 

//----------------------------------------- TEXT TO SPEECH
// List to speak (in order)
// {currentQuestion}
// "swipe up for"    no
// "swipe down for"   yes

//-----------------------------------------  SCREEN APPEARANCE 

  let renderElements = (
    
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      config={config}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <DoubleTap doubleTap={DoubleTapHandler} style={styles.DoubleTapContainer}>
        <View style={styles.container}>
        <View style={styles.HeaderRectangle} >
            <Text style={styles.whiteText} >{currentQuestion}</Text>
        </View>
          <LinearGradient
            colors={["#8fffbc8c", "#ffffffff", "#ffffffff", "#ff8f8f"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.swipeArea}
          >

            <LinearGradient
              colors={["#8fffbc8c", "#FFFFFF00", "#FFFFFF00", "#ff8f8f"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.swipeFillArea}
            >
            
              {/* All Elements in swipe area are here*/}

              <View style={styles.midArea}>
                <Text style={styles.text2}>No</Text>
              </View>
              {/* 
              <View style={styles.midArea}>
                <Text style={styles.text2}>{currentQuestion}</Text>
              </View>
              */}
              

              <View style={styles.midArea}>
                <Text style={styles.text2}>Yes</Text>
              </View>
              </LinearGradient>
          </LinearGradient>

          <View style={styles.FooterRectangle}>
            <Text style={styles.whiteText}>Double Tap To Back </Text>
          </View>
        </View>
      </DoubleTap>
    </GestureRecognizer>
  );
//-----------------------------------------  SCREEN CHANGING 
  if (questionState > QuestionArray.length - 1) {
    renderElements = <DisplayResultScreen answerArray={answerArray} type={type} sortBy={sortBy}  />;
  }

  return renderElements;
}

export default YesNoChoiceScreen;
//-----------------------------------------  CSS 
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
    height: "20%",
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
