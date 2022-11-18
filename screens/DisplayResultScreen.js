import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Animated,
  PanResponder,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import StartScreen from "./StartScreen";
import App from "../App";


function DisplayResultScreen({ answerArray, sortBy, type }) {
  //-----------------------------------------  GPS PERMISSION SECTION
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  //check and request GPS permission
  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionRespond = await requestPermission();

      return permissionRespond.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission Denied",
        "You need to grant location permission to use this app."
      );

      return false;
    }
    return true;
  }

  // get the current location
  async function getLocation() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      //check if dont have permission -> do nothing
      return;
    }

    const location = await getCurrentPositionAsync(); //to get location need some wait
    console.log(location);
  }

  //-----------------------------------------  SWIPE SCREEN SECTION
  //config for the swipe speed
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };
  //todo when swipe up
  function SwipeUpHandler() {}
  //todo when swipe down
  function SwipeDownHandler() {
    setsearchAgain(1);
  }

  //swipe left to call to the restaurant
  function SwipeLeftHandler() {
    Linking.openURL("tel:+66982725713");
  }

  //todo when swipe right
  function SwipeRightHandler() {}
  //-----------------------------------------  TEXT TO SPEECH
  // List to speak (in order)
  // {restauarantName}[index]
  // {restaurantInfo}[index]
  // "swipe up to see next result"
  // "swipe down to do search again"
  // "swipe left to call"
  // "swipe right to open map"

  //-----------------------------------------  SCREEN APPEARANCE

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
            <View style={styles.resultArea}>
                <View style={styles.swipeFillArea}>
                  <Text style={styles.answer}>{" Restaurant Name "}</Text>
                  <Text style={styles.text2}>{" Type "}</Text>
                  <Text style={styles.text2}>{" Score "}</Text>
                  <Text style={styles.text2}>{" Address? "}</Text>
                  <Text></Text>
                  <Text></Text>
                </View>
            </View>
            <Text style={styles.text2}>{"Map"}</Text>
          </View>

          <View style={styles.midArea}>
            <Text style={styles.text2}>{"Search Again"}</Text>
          </View>
          {/*
      <Text
        style={styles.text}
        onPress={() => Linking.openURL("tel:+66982725713")}
      >
        Do you want to search
      </Text>
      <Text
        style={styles.text}
        onPress={() => getLocation()}
      >
        Test getlocation
      </Text>
      
      <Text style={styles.text}>Key Search</Text>
      <Text style={styles.answer}>{answerArray}</Text>
      */}
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
