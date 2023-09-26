/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import IntroStack from "./Navigator/IntroStack";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="IntroStack"
      >
        <Stack.Screen
          name="IntroStack"
          component={IntroStack}
        />
        <Stack.Screen
          name="ClientStack"
          component={lazy(() => import("./Navigator/ClientStack"))}
        />
        <Stack.Screen
          name="ProviderStack"
          component={lazy(() => import("./Navigator/ProviderStack"))}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
