import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import YesNoChoiceScreen from "./YesNoChoiceScreen";
import SwipeScreen from "./SwipeScreen";

function ConfirmBeforeFetch({ sortBy, type }) {
  //-----------------------------------------  GPS PERMISSION SECTION

  const [currentLocation, setCurrentLocation] = useState("");

  //check and request GPS permission
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });
    setCurrentLocation(location);
  }

  //console.log(currentLocation);

  //-----------------------------------------  SWIPE SECTION
  //config for the swipe speed
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };
  //state checker
  //if yes= 1 forward to the filter question asking
  //if no= -1 forward to the essential question asking (again)
  const [ConfirmAnswer, setConfirmAnswer] = useState(0);

  function SwipeUpHandler() {
    //Select No
    setConfirmAnswer(-1);
  }

  function SwipeDownHandler() {
    //Select Yes
    getLocation();
    setConfirmAnswer(1);
  }
  //----------------------------------------- TEXT TO SPEECH
  // List to speak (in order)
  // Do you want to search {type} sorted by {sortBy}
  // "swipe up to"     cancel
  // "swipe down to"   confirm

  //-----------------------------------------  SCREEN APPEARANCE
  // set icon show on the screen

  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      config={config}
      style={styles.container}
    >
      {/* Header Question */}
      <View style={styles.HeaderRectangle}>
        {/* 
        <Text style={styles.whiteText}>
          Search <Text style={styles.answer}>{type + "\n"}</Text>
          sorted by <Text style={styles.answer}>{sortBy}</Text> ?
        </Text>
        */}
      </View>

      <LinearGradient
        colors={["#8fffbc8c", "#FFFFFF", "#FFFFFF", "#ff8f8f"]}
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
          <StatusBar style="auto" />
          <View style={styles.midArea}>
            <Text style={styles.text2}>Cancel</Text>
          </View>

          <View style={styles.resultArea}>
            <Text style={styles.text2}>
              Search <Text style={styles.answer}>{type + " \n"} </Text>
              sorted by <Text style={styles.answer}>{sortBy}</Text>
              {" ? "}
            </Text>
            <View style={styles.logoSpace}>
              <Image
                ImageSource={require("../assets/kinraideelogoNotext.png")}
                style={styles.logo}
                source={require("../assets/kinraideelogoNotext.png")}
              ></Image>
            </View>
          </View>

          <View style={styles.midArea}>
            <Text style={styles.text2}>Confirm!</Text>
          </View>
        </LinearGradient>
      </LinearGradient>
      <View style={styles.FooterRectangle}>
        <Text style={styles.whiteText}></Text>
      </View>
    </GestureRecognizer>
  );
  //-----------------------------------------  SCREEN CHANGING
  //forward to filter question
  if (ConfirmAnswer > 0) {
    renderElements = (
      <Image
        style={styles.logo}
        source={require("../assets/kinraideelogoNotext.png")}
      />
    ); //waiting for gps location

    if (currentLocation) {
      //done get location go to next screen
      renderElements = (
        <YesNoChoiceScreen
          type={type}
          sortBy={sortBy}
          lat={currentLocation.coords.latitude}
          lng={currentLocation.coords.longitude}
        />
      );
    }
    //back to ask essential question again
  } else if (ConfirmAnswer < 0) {
    renderElements = <SwipeScreen />;
  }

  return renderElements;
}

export default ConfirmBeforeFetch;
//-----------------------------------------  CSS
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 26,
    //paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  answer: {
    fontSize: 36,
    color: "#F4722B",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },

  //Area To Swipe
  resultArea: {
    maxWidth: "60%",
    maxHeight: "100%",
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
  swipeArea: {
    maxHeight: "75%",
    maxWidth: "100%",
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderBottomColor: "#8fffbc",
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
    width: "100%",
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
