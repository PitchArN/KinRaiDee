import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Linking from "expo-linking";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import YesNoChoiceScreen from "./YesNoChoiceScreen";
import SwipeScreen from "./SwipeScreen";


function ConfirmBeforeFetch({ sortBy, type }) {
  const [ConfirmAnswer, setConfirmAnswer] = useState(0);

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
      //Select No
      setConfirmAnswer(-1);
    }
  
    function SwipeDownHandler() {
      //Select Yes
      setConfirmAnswer(1);
    }


  
  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      config={config}
      style={styles.container}
    >
    <LinearGradient
      colors={["#8fffbc8c", "#FFFFFF", "#FFFFFF", "#ff8f8f"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >

    <LinearGradient
      colors={["#8fffbc8c", "#FFFFFF00", "#FFFFFF00", "#ff8f8f"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View style={styles.midArea}>
                <Text style={styles.text2}>No</Text>
      </View>
      <Text
        style={styles.text}
        onPress={() => Linking.openURL("tel:+66982725713")}
      >
        Do you want to search
      </Text>
      
      <Text style={styles.answer}>{type}</Text>
      <Text style={styles.text}>sorted by</Text>
      <Text style={styles.answer}>{sortBy}</Text>

      <View style={styles.midArea}>
                <Text style={styles.text2}>Yes</Text>
              </View>
    </LinearGradient>
    </LinearGradient>
    </GestureRecognizer>
  );
  
  if (ConfirmAnswer > 0) {
    renderElements = <YesNoChoiceScreen type={type} sortBy={sortBy}  />;

  }else if(ConfirmAnswer <0){
    renderElements = <SwipeScreen/>;
  };

  return renderElements;
}

export default ConfirmBeforeFetch;

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
  text2: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "center",
    fontFamily: "BaiJamBold",
    color: "#000000",
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
