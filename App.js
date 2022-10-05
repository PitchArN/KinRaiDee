import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import {useState} from 'react';
import SwipeScreen from "./screens/SwipeScreen";

export default function App() {
  const [userState,setUserState] = useState('');
  
  function StartHandler(state) {
    setUserState(state);
  };


  let screen =  <StartScreen onStart={StartHandler}/>;

  if (userState) {
    screen = <SwipeScreen/>;
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
    backgroundColor: '#0A257B'
  }
});
