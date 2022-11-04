import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking"
function DisplayResultScreen({onSelected , sortBy, type}) {

  

  

  const ansArray = String(onSelected).split(',');
  


  return (
    <LinearGradient 
      colors={["#ff8f8f", "#FFFFFF", "#FFFFFF", "#ffdb80"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text} onPress={() => Linking.openURL('tel:+66982725713')}>Do you want to search</Text>
      <Text style={styles.answer}>{type}</Text>
      <Text style={styles.text}>sorted by</Text>
      <Text style={styles.answer}>{sortBy}</Text>
      <Text style={styles.text}>Key Search</Text>
      <Text style={styles.answer}>{onSelected}</Text>
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
    fontSize: 26,
    //paddingTop: 300,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  },
  answer:{
    fontSize: 36,
    color: "#000000",
    fontFamily: "BaiJamBold",
    fontWeight: "bold",
    textAlign: "center",
  }
});
