import React, { Component, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

import {
  Question,
  Ans_up,
  Ans_down,
  Ans_left,
  Ans_right,
} from "../constant/QuestionAndChoiceDirection";
import DisplayResultScreen from "./DisplayResultScreen";

class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: Question[0],
      questionState: 0,
      selected: "none",
    };
  }

  onSwipeUp() {
    this.setState({
      selected: Ans_up[this.questionState],
      questionState: this.state.questionState + 1,
      myText: Question[this.state.questionState + 1],
    });
  }

  onSwipeDown() {
    this.setState({
      questionState: this.state.questionState + 1,
      myText: Question[this.state.questionState + 1],
    });
  }

  onSwipeLeft() {
    this.setState({
      questionState: this.state.questionState + 1,
      myText: Question[this.state.questionState + 1],
    });
  }

  onSwipeRight() {
    this.setState({
      questionState: this.state.questionState + 1,
      myText: Question[this.state.questionState + 1],
    });
  }

  renderElements() {
    const config = {
      velocityThreshold: 0.2,
      directionalOffsetThreshold: 80,
    };

    if (this.state.questionState < 4) {
      return (
        <GestureRecognizer
          onSwipeUp={() => this.onSwipeUp()}
          onSwipeDown={() => this.onSwipeDown()}
          onSwipeLeft={() => this.onSwipeLeft()}
          onSwipeRight={() => this.onSwipeRight()}
          config={config}
          style={styles.container}
        >
          <StatusBar style="auto" />
          <Text style={styles.text}>{this.state.myText}</Text>
          <Text style={styles.text}>{this.state.questionState}</Text>
          <Text style={styles.text}>{this.state.selected}</Text>
        </GestureRecognizer>
      );
    } else {
      return <DisplayResultScreen />;
    }
  }

  render() {
    return this.renderElements();
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
