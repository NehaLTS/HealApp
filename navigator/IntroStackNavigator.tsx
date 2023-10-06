import { createStackNavigator } from "@react-navigation/stack";
import React, { lazy } from "react";
import OnBoardingView from "../screens/onboarding/OnBoardingView";
const Stack = createStackNavigator();

const IntroStackNavigator = () => (
  <Stack.Navigator initialRouteName="OnBoarding">
    <Stack.Screen name="OnBoarding" component={OnBoardingView} />
    <Stack.Screen
      name="Intro"
      component={lazy(() => import("../screens/intro/IntroScreen"))}
    />
  </Stack.Navigator>
);

export default IntroStackNavigator;
