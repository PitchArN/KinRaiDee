import { useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Linking from "expo-linking";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

function DisplayResultScreen({ onSelected, sortBy, type }) {
  const ansArray = String(onSelected).split(",");
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

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

  async function getLocation() {
    const hasPermission = await verifyPermission();
  
    if(!hasPermission){ //check if dont have permission -> do nothing
      return;
    }

    const location = await getCurrentPositionAsync(); //to get location need some wait
    console.log(location);
  }

  return (
    <LinearGradient
      colors={["#ff8f8f", "#FFFFFF", "#FFFFFF", "#ffdb80"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <StatusBar style="auto" />
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
});
