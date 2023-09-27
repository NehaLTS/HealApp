/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import IntroScreen from "./screens/IntroScreen";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEBVIEW_CLIENT_ID } from "./libs/Utils";
const App = () => {
  const backgroundStyle = {
    backgroundColor: "#fff",
    flex: 1,
  };
  GoogleSignin.configure({
    webClientId: GOOGLE_WEBVIEW_CLIENT_ID,
  });
  return (
    <SafeAreaView style={backgroundStyle}>
      <IntroScreen />
    </SafeAreaView>
  );
};

export default App;
