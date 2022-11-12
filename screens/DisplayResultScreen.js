import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function DisplayResultScreen({ answerArray, sortBy, type }) {
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80,
  };

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

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

  async function getLocation() {
    const hasPermission = await verifyPermission();
  
    if(!hasPermission){ //check if dont have permission -> do nothing
      return;
    }

    const location = await getCurrentPositionAsync(); //to get location need some wait
    console.log(location);
  }

  function SwipeUpHandler() {

  }

  function SwipeDownHandler() {
    
  }

  //swipe left to call to the restaurant
  function SwipeLeftHandler() {
    Linking.openURL("tel:+66982725713");
  }

  function SwipeRightHandler() {

  }

  return (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      onSwipeLeft={SwipeLeftHandler}
      onSwipeRight={SwipeRightHandler}
      config={config}
      style={styles.container}
    >
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
      <StatusBar style="auto" />
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
      <Text style={styles.answer}>{type}</Text>
      <Text style={styles.text}>sorted by</Text>
      <Text style={styles.answer}>{sortBy}</Text>
      <Text style={styles.text}>Key Search</Text>
      <Text style={styles.answer}>{answerArray}</Text>
    </LinearGradient>
    </LinearGradient>
    </GestureRecognizer>
  );


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
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
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
