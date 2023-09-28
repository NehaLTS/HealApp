/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import { colors } from "./designToken/colors";
import { dimens } from "./designToken/dimens";
import { getWidth } from "./libs/StyleHelper";
import IntroScreen from "./screens/IntroScreen";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{headerShown: false,}}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="SignIn" component={lazy(() => import("./component/client/login/LoginView"))} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
