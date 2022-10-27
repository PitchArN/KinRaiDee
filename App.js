import { StyleSheet, Text, View } from "react-native";
import StartScreen from "./screens/StartScreen";
import {useState } from 'react';
import SwipeScreen from "./screens/SwipeScreen";
import { useFonts } from 'expo-font';


export default function App() {
  const [userState,setUserState] = useState('');
  //Font Setup
  //Main Font is BaiJamjuree
  const [fontsLoaded] = useFonts({
    'BaiJam-Bold': require('./assets/fonts/BaiJamjuree-Bold.ttf'),

    'BaiJam-BoldItalic': require('./assets/fonts/BaiJamjuree-BoldItalic.ttf'),
    'BaiJam-ExtraLight': require('./assets/fonts/BaiJamjuree-ExtraLight.ttf'),
    'BaiJam-ExtraLightItalic': require('./assets/fonts/BaiJamjuree-ExtraLightItalic.ttf'),
    'BaiJam-Italic': require('./assets/fonts/BaiJamjuree-Italic.ttf'),

    'BaiJam-Light': require('./assets/fonts/BaiJamjuree-Light.ttf'),
    'BaiJam-LightItalic': require('./assets/fonts/BaiJamjuree-LightItalic.ttf'),
    'BaiJam-Medium': require('./assets/fonts/BaiJamjuree-Medium.ttf'),
    'BaiJam-Medium': require('./assets/fonts/BaiJamjuree-MediumItalic.ttf'),

    'BaiJam-Regular': require('./assets/fonts/BaiJamjuree-Regular.ttf'),
    'BaiJam-SemiBold': require('./assets/fonts/BaiJamjuree-SemiBold.ttf'),
    'BaiJam-SemiBoldItalic': require('./assets/fonts/BaiJamjuree-SemiBoldItalic.ttf'),
  });

  
  
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
