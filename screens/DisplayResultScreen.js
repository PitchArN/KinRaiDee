import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import GestureRecognizer from "react-native-swipe-gestures";
import {stopPreviousVoice, resultReading} from "../constant/textToSpeech";
import App from "../App";
import LastScreen from "./LastScreen";
import arrayShuffle from "../components/array-shuffle";
import {filterResult,filter,resultArrange,preSortArrange} from "../constant/ResultToDisplay";
import {unsubscribe} from "../constant/checkConnection";
import NetInfo from '@react-native-community/netinfo';


function DisplayResultScreen({ answerArray, sortBy, type, data }) {
  //-----------------------------------------  SWIPE SCREEN SECTION
  //config for the swipe speed
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };
  //todo when swipe up
  function SwipeUpHandler() {
    SetresultState(resultState + 1);
    setInfo(resultToDisplay[resultState + 1]);
  }
  //todo when swipe down
  function SwipeDownHandler() {
    setsearchAgain(1);
  }

  //swipe left to call to the restaurant
  function SwipeLeftHandler() {
    if (info.phone != null) {
      Linking.openURL("tel:" + info.phone);
    }
  }

  //todo when swipe right
  function SwipeRightHandler() {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${info.lat}%2C${info.lon}`
    );
  }
 
  

  //----------------------------------------- Filter
  //answerArray
  //data

  //diplay data check
  //console.log("data:");
  //console.log(data);
  //console.log("data results:");
  //console.log(data.results);
  let resultList = filter(answerArray, data);
  console.log(resultList);
  //----------------------------------------- RESULT REARRANGE FOR DISPLAY
  //use every result(index) from resultList
  //use resultList.foreach() to list all the index we will show
  //then put all in a struct array below
  let resultToSort = preSortArrange(resultList,data);

  //----------------------------------------SORTING SECTION
  let resultToDisplay = resultArrange(sortBy,resultToSort);
  console.log(resultToDisplay.length);
  //-----------------------------------------  TEXT TO SPEECH
  // List to speak (in order)
  // {restauarantName}[index]
  // {restaurantScore}[index]
  // {restaurantDistance}[index]
  // "swipe up to see next result"
  // "swipe down to do search again"
  // "swipe left to call"
  // "swipe right to open map"
  const [resultState, SetresultState] = useState(0);
  const [info, setInfo] = useState(resultToDisplay[resultState]);
  stopPreviousVoice();
  resultReading(info.name,info.dist,info.score,info.phone);
  
  //-----------------------------------------  SCREEN APPEARANCE
  
  unsubscribe();

  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      onSwipeLeft={SwipeLeftHandler}
      onSwipeRight={SwipeRightHandler}
      config={config}
      style={styles.container}
    >
      <View style={styles.HeaderRectangle}>
        <Text style={styles.answer}>
          <Text style={styles.whiteText}>Search {" | "}</Text>
          {type}
        </Text>
      </View>
      <LinearGradient
        colors={["#97e0ff8c", "#FFFFFF00", "#FFFFFF00", "#8fffbc8c"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.swipeArea}
      >
        <LinearGradient
          colors={["#ff8f8f8c", "#FFFFFF00", "#FFFFFF00", "#ffdb808c"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.swipeFillArea}
        >
          <StatusBar style="auto" />

          <View style={styles.midArea}>
            <Text style={styles.text2}>{"Next Choice"}</Text>
          </View>

          <View style={styles.midArea}>
            <Text style={styles.text2}>{"Call"}</Text>
            {/* for showing search result one by one */}
            <View style={styles.resultArea}>
              <View style={styles.swipeFillArea}>
                <Text style={styles.answer}>{" " + info.name + " "}</Text>
                <Text style={styles.text2}>
                  {" " + info.score + " "}
                </Text>
                <Text style={styles.text2}>
                  {" " + info.dist + " km. "}
                </Text>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
            <Text style={styles.text2}>{"Map"}</Text>
          </View>

          <View style={styles.midArea}>
            <Text style={styles.text2}>{"Search Again"}</Text>
          </View>
        </LinearGradient>
      </LinearGradient>
      <View style={styles.FooterRectangle}>
        <Text style={styles.whiteText}>
          Sort By{" | "}
          <Text style={styles.answer}>{sortBy}</Text>
        </Text>
      </View>
    </GestureRecognizer>
  );
  //-----------------------------------------  SCREEN CHANGING
  const [searchAgain, setsearchAgain] = useState(0);
  //setting for start search again
  //send state to start screen
  if (searchAgain > 0) {
    renderElements = <App />;
  }
  if (resultState > resultToDisplay.length - 2) {
    renderElements = <LastScreen />;
  }

  return renderElements;
}

export default DisplayResultScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  //text
  text: {
    fontSize: 26,
    //paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
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
    textBreakStrategy: "simple",
  },
  logo: {
    maxHeight: "100%",
    resizeMethod: "scale",
    resizeMode: "contain",
    borderColor: "#ffffffff",
  },

  //Area To Swipe
  resultArea: {
    maxWidth: "60%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
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

  swipeArea: {
    maxHeight: "75%",
    maxWidth: "100%",
    borderWidth: 10,
    borderLeftColor: "#8fffbc",
    borderBottomColor: "#ffdb80",
    borderRightColor: "#97e0ff",
    borderTopColor: "#ff8f8f",
    alignSelf: "center",
  },
  swipeFillArea: {
    height: "100%",
    maxWidth: "100%",
    flexDirection: "column",
    flex: 3,
    justifyContent: "space-around",
  },
  midArea: {
    maxHeight: "60%",
    width: "100%",
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
