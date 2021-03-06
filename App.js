import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, Component } from "react";

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

library.add(faTasks);

import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false
    };
  }

  componentDidMount() {
    // Import Sockets and MAKE SURE to connect!
  }

  setLoadingComplete = () => {
    this.setState({ isLoadingComplete: true });
  };
  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(this.setLoadingComplete)}
        />
      );
    } else {
      return (
        // <DismissKeyboard>
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
        // </DismissKeyboard>
      );
    }
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
      "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
      "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
      "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
      "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
      "OpenSans-LightItalic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
      "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),
      "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
