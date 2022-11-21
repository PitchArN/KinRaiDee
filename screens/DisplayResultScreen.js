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

function DisplayResultScreen({ answerArray, sortBy, type, data }) {
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
  function SwipeUpHandler() {
    SetresultState(resultState+1);
    setInfo(resultToDisplay[resultState+1]);
  }
  //todo when swipe down
  function SwipeDownHandler() {
    setsearchAgain(1);
  }

  //swipe left to call to the restaurant
  function SwipeLeftHandler() {
    Linking.openURL("tel:" + info.phone);
  }

  //todo when swipe right
  function SwipeRightHandler() {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=" +
        info.lat +
        "%2C" +
        info.lon
    );
    console.log(info.lat);
    console.log(info.lon);
  }
  //-----------------------------------------  TEXT TO SPEECH
  // List to speak (in order)
  // {restauarantName}[index]
  // {restaurantInfo}[index]
  // "swipe up to see next result"
  // "swipe down to do search again"
  // "swipe left to call"
  // "swipe right to open map"

  //----------------------------------------- Filter
  //answerArray
  //data

  //diplay data check
  //console.log("data:");
  //console.log(data);
  //console.log("data results:");
  //console.log(data.results);

  let resultList = [];
  var jmespath = require("jmespath");
  console.log(answerArray);
  //check the result length
  let to = jmespath.search(data, "length(results)");
  console.log(to);
  //create array that contain all answer index
  resultList = Array.from(Array(to).keys());

  if (answerArray != null) {
    for (const filterKey of answerArray) {
      resultList = filterResult(resultList, data, filterKey);
      console.log(resultList.length);
    }
    /*
    answerArray.forEach((filterKey) => {
      resultList = filterResult(resultList, data, filterKey);
      console.log(resultList.length);
    });
    */
  }

  //filter trough every index in resultList
  //reuseable when update the result list
  function filterResult(list, data, filterKey) {
    let tempList = [];
    //run through every index in result list
    for (var i = 0; i < list.length; i++) {
      if (filterKey != "phone") {
        //return array of categories
        let a = jmespath.search(
          data,
          "results[" + list[i] + "].poi.categories"
        );
        //console.log(a);
        //loop into categories and check
        if (!a.includes(filterKey)) {
          tempList.push(list[i]);
          //var toPush = jmespath.search(data, "{results :results[" + i + "]}");
          //resultList.push(toPush);
        } else {
          console.log(a);
          console.log(data.results[list[i]].poi.name + " -- removed");
        }
        //phone filter
      } else {
        let a = jmespath.search(data, "results[" + list[i] + "].poi.phone");
        if (a != null) {
          tempList.push(list[i]);
        } else {
          console.log(
            data.results[list[i]].poi.name + " -- removed due no phone"
          );
        }
      }
    }
    return tempList;
  }

  //brute force test
  //loop into every results
  /*
  for (var i = 0; i < to; i++) {
    //return array of categories
    let a = jmespath.search(data, "results[" + i + "].poi.categories");
    console.log(a);
    //loop into categories and check
    if (!a.includes("fast food")) {
      console.log(data.results[i].poi.name + " -- not contain fast food");
      //var toPush = jmespath.search(data, "{results :results[" + i + "]}");
      //resultList.push(toPush);
    }
  }
  */
  console.log(resultList);
  //----------------------------------------- RESULT REARRANGE FOR DISPLAY
  //use every result(index) from resultList
  //use resultList.foreach() to list all the index we will show
  //then put all in a struct array below
  let resultToDisplay = [];
  resultList.forEach((re) => {
    //use jmespath to reach each data
    //let a = jmespath.search(data,"results["+re+"].poi.phone");
    //data need:
    // id,score,dist
    //  poi. name,phone
    //  position. lat, lon
    //  address. all

    let name = jmespath.search(data, "results[" + re + "].poi.name");
    let id = jmespath.search(data, "results[" + re + "].id");
    let dist = jmespath.search(data, "results[" + re + "].dist");
    let score = jmespath.search(data, "results[" + re + "].score");
    let phone = jmespath.search(data, "results[" + re + "].poi.phone");
    //position
    let lat = jmespath.search(data, "results[" + re + "].position.lat");
    let lon = jmespath.search(data, "results[" + re + "].position.lon");
    resultToDisplay.push({
      name: name,
      id: id,
      phone: phone,
      score: score,
      dist: dist,
      lat: lat,
      lon: lon,
    });
  });

  //console.log(resultToDisplay);
  const [resultState,SetresultState] = useState(0);
  const [info, setInfo] = useState(resultToDisplay[resultState]);
  

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
            {/* for showing search result one by one */}
            <View style={styles.resultArea}>
              <View style={styles.swipeFillArea}>
                <Text style={styles.answer}>{" " + info.name + " "}</Text>
                <Text style={styles.text2}>
                  {" " + (info.score / 20).toFixed(1) + " "}
                </Text>
                <Text style={styles.text2}>
                  {" " + (info.dist / 1000).toFixed(2) + "km. "}
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
