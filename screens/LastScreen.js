import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
//import StartScreen from "./StartScreen";
import App from "../App";

import {unsubscribe} from "../constant/checkConnection";
import NetInfo from '@react-native-community/netinfo';


function LastScreen() {
  const [userState, setUserState] = useState();
  const PressStartHandler = () => {
    setUserState(1);
  };

  unsubscribe();

  let renderElements = (
    <Pressable
      android_disableSound={true}
      onPress={PressStartHandler}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <View style={styles.HeaderRectangle}>
        <Text style={styles.whiteText}></Text>
      </View>

      <LinearGradient
        colors={["#ff8f8f8c", "#FFFFFFFF", "#FFFFFFFF", "#ffdb808c"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.swipeArea}
      >
        <LinearGradient
          colors={["#8fffbc8c", "#FFFFFF00", "#FFFFFF00", "#97e0ff8c"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.swipeFillArea}
        >
          <View style={styles.logoSpace}>
            <Text style={styles.answer}>
              Not found your restaurant yet?{"\n"}
            </Text>
            <Image
              style={styles.logo}
              source={require("../assets/sorry.png")}
            />
            <Text style={styles.answer}>{"\n\n"}Try search again</Text>
          </View>
        </LinearGradient>
      </LinearGradient>

      <View style={styles.FooterRectangle}>
        <Text style={styles.whiteText}></Text>
      </View>
    </Pressable>
  );
  if (userState == 1) {
    renderElements = <App />;
  }

  return renderElements;
}

export default LastScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSpace: {
    width: "100%",
    height: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  text: {
    fontSize: 32,
    paddingTop: 300,
    color: "#00000085",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
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
    height: "35%",
    maxWidth: "40%",
    resizeMethod: "auto",
    resizeMode: "cover",
    borderColor: "#ffffffff",
  },
  //Area To Swipe
  swipeArea: {
    height: "75%",
    width: "100%",
    borderWidth: 10,
    borderLeftColor: "#8fffbc",
    borderBottomColor: "#ffdb80",
    borderRightColor: "#97e0ff",
    borderTopColor: "#ff8f8f",
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
