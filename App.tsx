/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import IntroScreen from "./screens/IntroScreen";
import LoginView from "./component/client/login/LoginView";
import { getWidth, getHeight } from "./libs/StyleHelper";
import { colors } from "./designToken/colors";
import BasicInformation from "./component/client/registration/views/BasicInformation";

const App = () => {
  const backgroundStyle = {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(20),
    // paddingTop: getHeight(10),
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <IntroScreen /> */}
      {/* <LoginView /> */}
      <BasicInformation />
    </SafeAreaView>
  );
};

export default App;
