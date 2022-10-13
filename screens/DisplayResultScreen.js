import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

function DisplayResultScreen({onSelected}) {
  const [userState, setUserState] = useState("");

  function SelectedHandler(select) {
    setUserState(select);
  }



  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Screen DisplayResultScreen</Text>
      <Text style={styles.text}>{onSelected}</Text>
    </View>
  );
}

export default DisplayResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
