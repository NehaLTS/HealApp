import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import IntroScreen from "../screens/intro/IntroScreen";
const Stack = createStackNavigator();

const IntroStackNavigator = () => (
  <Stack.Navigator initialRouteName="Intro">
    <Stack.Screen name="Intro" component={IntroScreen} />
  </Stack.Navigator>
);

export default IntroStackNavigator;
