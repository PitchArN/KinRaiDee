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
  //-----------------------------------------  GPS PERMISSION SECTION 
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
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
    
      if(!hasPermission){ //check if dont have permission -> do nothing
        return;
      }
  
      const location = await getCurrentPositionAsync(); //to get location need some wait
      console.log(location);
    }

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
      setConfirmAnswer(1);
    }
  //----------------------------------------- TEXT TO SPEECH
  // List to speak (in order)
  // Do you want to search {type} sorted by {sortBy}
  // "swipe up to"     cancel
  // "swipe down to"   confirm

  //-----------------------------------------  SCREEN APPEARANCE 
  let renderElements = (
    <GestureRecognizer
      onSwipeUp={SwipeUpHandler}
      onSwipeDown={SwipeDownHandler}
      config={config}
      style={styles.container}
    >
    {/* Header Question */}
    <View style={styles.HeaderRectangle} >
            <Text style={styles.whiteText} >Do you want to search {type}</Text>
            <Text style={styles.whiteText} >sorted by {sortBy}</Text>
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
      
      {/* 
      <Text style={styles.answer}>{type}</Text>
      <Text style={styles.text}>sorted by</Text>
      <Text style={styles.answer}>{sortBy}</Text>
      */
      }


      <View style={styles.midArea}>
        <Text style={styles.text2}>Confirm!</Text>
      </View>

    </LinearGradient>
    </LinearGradient>
    <View style={styles.FooterRectangle} >
            <Text style={styles.whiteText} ></Text>
    </View>
    </GestureRecognizer>
  );
  //-----------------------------------------  SCREEN CHANGING
  //forward to filter question 
  if (ConfirmAnswer > 0) {
    renderElements = <YesNoChoiceScreen type={type} sortBy={sortBy}  />;
  //back to ask essential question again
  }else if(ConfirmAnswer <0){
    renderElements = <SwipeScreen/>;
  };

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
