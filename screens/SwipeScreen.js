import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "Swipe Screen",
      gestureName: "none",
      backgroundColor: "#fff",
    };
  }

  onSwipeUp(gestureState) {
    this.setState({ myText: "Up" });
  }

  onSwipeDown(gestureState) {
    this.setState({ myText: "Down" });
  }

  onSwipeLeft(gestureState) {
    this.setState({ myText: "Left" });
  }

  onSwipeRight(gestureState) {
    this.setState({ myText: "Right" });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState();
        break;
      case SWIPE_DOWN:
        this.setState();
        break;
      case SWIPE_LEFT:
        this.setState();
        break;
      case SWIPE_RIGHT:
        this.setState();
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.2,
      directionalOffsetThreshold: 80,
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={styles.container}
      >
        <StatusBar style="auto" />
        <Text style={styles.text}>{this.state.myText}</Text>
      </GestureRecognizer>
    );
  }
}

export default SwipeScreen;

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
