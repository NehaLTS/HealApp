import { createStackNavigator } from "@react-navigation/stack";
import { defaultHeaderStyle } from "components/common/Header";
import React, { lazy } from "react";
import OnBoardingView from "../screens/onboarding/OnBoardingView";

const Stack = createStackNavigator();

const IntroStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen name="OnBoarding" component={OnBoardingView} />
      <Stack.Screen
        name="Intro"
        component={lazy(() => import("../screens/intro/IntroScreen"))}
        options={defaultHeaderStyle}
      />
    </Stack.Navigator>
  );
};

export default IntroStackNavigator;
