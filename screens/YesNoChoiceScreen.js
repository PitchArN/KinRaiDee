import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer from "react-native-swipe-gestures";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import arrayShuffle from "../components/array-shuffle";

import { Restaurant, Cafe, Bakery, Bar } from "../constant/FilterQuestion";

import DisplayResultScreen from "./DisplayResultScreen";
import DoubleTap from "../components/DoubleTap";

function YesNoChoiceScreen({ type, sortBy, lat, lng }) {
  //-----------------------------------------  QUESTION SELECTION SECTION
  const [questionState, setQuestionState] = useState(0);

  const [answerArray, setAnswerArray] = useState("");

  let QuestionArray = [""];
  let length = 0;
  //rearrange question
  function returnQuestionArray(anArray) {
    return arrayShuffle(anArray);
  }
  //set the question array

  if (type === "Restaurant") {
    //ask 5 question
    length = 5;
    const temp = useMemo(() => returnQuestionArray(Restaurant), [length]);
    QuestionArray = temp;
  } else if (type === "Bar") {
    //ask 3 question
    length = 3;
    const temp = useMemo(() => returnQuestionArray(Bar), [length]);
    QuestionArray = temp;
    //prevent error when update state
    QuestionArray[length] = { Question: "", Key: "" };
  } else if (type === "Bakery") {
    //ask 1 question
    length = 1;
    //const temp = useMemo(()=> returnQuestionArray(Bakery), length);
    QuestionArray = Bakery;
    //prevent error when update state
    QuestionArray[length] = { Question: "", Key: "" };
  } else {
    //ask 3 question
    length = 3;
    const temp = useMemo(() => returnQuestionArray(Cafe), [length]);
    QuestionArray = temp;
    //prevent error when update state
    QuestionArray[length] = { Question: "", Key: "" };
  }

  const [currentQuestion, setCurrentQuestion] = useState(
    QuestionArray[questionState]
  );

  //-----------------------------------------  SWIPE SCREEN SECTION
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  function SwipeUpHandler() {
    //Select No
    if (QuestionArray[questionState].Key != "phone") {
      setAnswerArray([...answerArray, QuestionArray[questionState].Key]);
    }
    setQuestionState(questionState + 1);
    setCurrentQuestion(QuestionArray[questionState + 1]);
  }

  function SwipeDownHandler() {
    //Select Yes
    if (QuestionArray[questionState].Key == "phone") {
      setAnswerArray([...answerArray, QuestionArray[questionState].Key]);
    }
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

  // -------------------------------- API FETCH SECTION
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const API_KEY = "iH9pB0bmpwepXVcXaGC6uNRKvhl8emRg";

  if (type === "Restaurant") {
    var CategoriesSet = "7315";
  } else if (type === "Cafe") {
    var CategoriesSet = "9376";
  } else if (type === "Bar") {
    var CategoriesSet = "9379";
  } else {
    var CategoriesSet = "9361018";
  }

  const API_REQUEST_URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lng}
                            &limit=50&radius=10000&categorySet=${CategoriesSet}&view=Unified&key=${API_KEY}`;

  useEffect(() => {
    fetch(API_REQUEST_URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  /*
  data = data.filter(function(item){
     return item.poi.name == 'wine bar';
  }).map(function({id, name, city}){
      return {id, name, city};
  });
  */

  //----------------------------------------- TEXT TO SPEECH
  // List to speak (in order)
  // {currentQuestion}
  // "swipe up for"    no
  // "swipe down for"   yes

  //-----------------------------------------  SCREEN APPEARANCE

  //console.log("Question Array:\n");
  //console.log(QuestionArray);
  // console.log("CurrentQuestion:\n");
  // console.log(currentQuestion);

  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      config={config}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <DoubleTap doubleTap={DoubleTapHandler} style={styles.container}>
        <View style={styles.container}>
          <View style={styles.HeaderRectangle}>
            <Text style={styles.whiteText}>{currentQuestion.Question}</Text>
          </View>
          <LinearGradient
            colors={["#8fffbc", "#ffffff00", "#ffffff00", "#ff8f8f"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.swipeArea}
          >
            <LinearGradient
              colors={["#8fffbc", "#FFFFFF00", "#FFFFFF00", "#ff8f8f"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.swipeFillArea}
            >
              {/* All Elements in swipe area are here*/}

              <View style={styles.midArea}>
                <Text style={styles.text2}>No</Text>
              </View>

              <View style={styles.midArea}>
                <View style={styles.resultArea}>
                  <Text>
                    {/*QuestionArray.length - 1} | {questionState} | {length - 1*/}
                  </Text>
                  <Text style={styles.answer}>
                    {" " + QuestionArray[questionState].Key.toUpperCase() + " "}
                  </Text>

                  <Image
                    ImageSource={require("../assets/kinraideelogoNotext.png")}
                    style={styles.logo}
                    source={require("../assets/request.png")}
                  ></Image>
                </View>
              </View>

              <View style={styles.midArea}>
                <Text style={styles.text2}>Yes</Text>
              </View>
            </LinearGradient>
          </LinearGradient>

          <View style={styles.FooterRectangle}>
            <Text style={styles.whiteText}>Tap Twice To Back </Text>
          </View>
        </View>
      </DoubleTap>
    </GestureRecognizer>
  );
  //-----------------------------------------  SCREEN CHANGING

  if (questionState > length - 1) {
    if (isLoading != true) {
      renderElements = (
        <DisplayResultScreen
          answerArray={answerArray}
          type={type}
          sortBy={sortBy}
          data={data}
        />
      );
    }

    //console.log(data);
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
  answer: {
    fontSize: 36,
    color: "#F4722B",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    maxWidth: "60%",
    maxHeight: "60%",
    resizeMode: "contain",
    borderColor: "#ffffffff",
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
  //Area To Swipe
  resultArea: {
    maxWidth: "60%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 5,
    borderColor: "#F4722B",
    backgroundColor: "#FFFFFF",
  },
  //Area To Swipe
  swipeArea: {
    maxHeight: "75%",
    maxWidth: "100%",
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderBottomColor: "#8fffbc",
    borderTopColor: "#ff8f8f",
  },
  swipeFillArea: {
    height: "100%",
    maxWidth: "100%",
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
