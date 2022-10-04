import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

function StartScreen() {
  const StartHandler = () => {
    
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Pressable onPress={StartHandler}>
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
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    paddingTop: 300,
  },
  logo: {
    maxHeight: 50,
    resizeMode: "contain",
  },
  screenpress: {
    opacity: 0,
  },
});
