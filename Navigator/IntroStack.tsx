import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy } from "react";
import IntroScreen from "../screens/IntroScreen";
console.log("IntroStack *********");
const Stack = createStackNavigator();

const IntroStack = () => (
  <Stack.Navigator initialRouteName="Intro">
    <Stack.Screen name="Intro" component={IntroScreen} />
    <Stack.Screen name="Screen1" component={lazy(() => import("../screens/Screen1"))} />
  </Stack.Navigator>
);

export default IntroStack;
