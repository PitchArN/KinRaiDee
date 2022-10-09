import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

function DisplayResultScreen (){
    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
          <Text style={styles.text}>Screen DisplayResultScreen</Text>  
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