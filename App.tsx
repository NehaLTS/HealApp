/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import IntroScreen from "./screens/IntroScreen";

const App = () => {
  const backgroundStyle = {
    backgroundColor: "#fff",
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <IntroScreen />
    </SafeAreaView>
  );
};

export default App;
