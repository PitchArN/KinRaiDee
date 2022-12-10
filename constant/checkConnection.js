import * as Network from 'expo-network';
import NetInfo from '@react-native-community/netinfo';
//check network status

const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    if(!state.isConnected){
      return (
        <View style={styles.rootscreen}>
          <Text>No Connection</Text>
        </View>
      );
    }
  });

  //import {unsubscribe} from "../constant/checkConnection";
  //import NetInfo from '@react-native-community/netinfo';
  //unsubscribe();

  export {unsubscribe};