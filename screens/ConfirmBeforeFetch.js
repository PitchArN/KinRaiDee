import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

function DisplayResultScreen({onSelected}) {
  const [userState, setUserState] = useState("");

  function SelectedHandler(select) {
    setUserState(select);
  }



  return (
    <LinearGradient 
      colors={["#ff8f8f", "#FFFFFF", "#FFFFFF", "#ffdb80"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Screen DisplayResultScreen</Text>
      <Text style={styles.text}>{onSelected}</Text>
    </LinearGradient>
  );
}

export default DisplayResultScreen;

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
});
