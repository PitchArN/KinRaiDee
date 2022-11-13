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
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}>
    <LinearGradient
              colors={["#8fffbc8c", "#FFFFFF00", "#FFFFFF00", "#97e0ff8c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.75 }}
              style={styles.container}
            >
      <StatusBar style="auto" />
      <Pressable android_disableSound={true} onPress={PressStartHandler}>
        <View style={styles.logoSpace}>
          <Image
            style={styles.logo}
            source={require("../assets/kinraideelogo.png")}
          />
          <Text style={styles.text}>Tap to start</Text>
        </View>
      </Pressable>
      </LinearGradient>
    </LinearGradient>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#FFFFFFFF",
  },
  logoSpace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#FFFFFFFF",
  },
  text: {
    fontSize: 32,
    paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    maxWidth: "100%" ,
    resizeMode: "contain",
  }
});
