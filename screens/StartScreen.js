import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import {useState} from 'react';
import { LinearGradient } from "expo-linear-gradient";


function StartScreen({onStart}) {
  const [userState,setUserState] = useState('');
  const PressStartHandler = () => {
    let state = '1';
    onStart(state);
  };


  return (
    <LinearGradient 
      colors={["#ff8f8f", "#FFFFFF", "#FFFFFF", "#ffdb80"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}>
      <StatusBar style="auto" />
      <Pressable android_disableSound={true} onPress={PressStartHandler}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/kinraideelogo.png")}
          />
          <Text style={styles.text}>Tap to start</Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#FFFFFFFF",
  },
  text: {
    fontSize: 32,
    paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJam-Bold",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    maxWidth: "100%" ,
    resizeMode: "contain",
  }
});
