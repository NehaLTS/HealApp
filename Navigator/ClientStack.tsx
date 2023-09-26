import { createStackNavigator } from '@react-navigation/stack';
import React, { lazy } from 'react';

console.log('ClientStack *******')

const Stack = createStackNavigator();

 const ClientStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Screen2"
      component={lazy(() => import("../screens/Screen2"))}
    />
  </Stack.Navigator>
);

export default ClientStack