import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import {useState} from 'react';


function StartScreen({onStart}) {
  const [userState,setUserState] = useState('');
  const PressStartHandler = () => {
    let state = '1';
    onStart(state);
  };


  return (
    <View style={styles.container}>
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
    </View>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A257B",
  },
  text: {
    fontSize: 18,
    paddingTop: 300,
    color: 'white'
  },
  logo: {
    maxHeight: 50,
    resizeMode: "contain",
  }
});
