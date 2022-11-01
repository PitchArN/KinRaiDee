import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import {useState, useEffect, useCallback } from 'react';
import SwipeScreen from "./screens/SwipeScreen";
import { useFonts } from 'expo-font';
import {fontToLoad} from "./LoadFont";

export default function App() {
  const [userState,setUserState] = useState('');
  //Font Setup
  const [fontsLoaded] = useFonts(
    //import from LoadFont - List all of font used in the project
    fontToLoad
  );
  
  //define state of the app
  function StartHandler(state) {
    setUserState(state);
  };


  let screen =  <StartScreen onStart={StartHandler}/>;

  if (userState) {
    screen = <SwipeScreen/>;
  }

  //report Error when fonts not loaded
  if(!fontsLoaded){
    return (
      <View style={styles.rootscreen}>
        <Text>Fonts Not Loaded</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootscreen}>
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  rootscreen:{
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',

  }
});
