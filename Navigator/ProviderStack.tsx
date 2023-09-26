import { createStackNavigator } from '@react-navigation/stack';
import React, { lazy } from 'react';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';
console.log('ProviderStack *********')
const Stack = createStackNavigator();

 const ProviderStack = () => (
    <Stack.Navigator initialRouteName="Screen3">
      <Stack.Screen
        name="Screen4"
        component={lazy(() => import("../screens/Screen4"))}
      />
      <Stack.Screen
        name="Screen3"
        component={lazy(() => import("../screens/Screen3"))}
      />
    </Stack.Navigator>
  );
  export default ProviderStack