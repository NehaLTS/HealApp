import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import notifee from '@notifee/react-native';
const App = () => {
  useEffect(() => {
    // Configure and register your background task
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 1, // in minutes
        stopOnTerminate: false, // continue background task even if the app is terminated
        startOnBoot: true, // start background task when the device is rebooted
      },
      async (taskId) => {
        // Fetch the current location or perform any background task
        const currentLocation = await fetchCurrentLocation();
        // Display a notification with the current location
        await notifee.displayNotification({
          title: 'Location Update',
          body: `Current Location: ${currentLocation}`,
        });
        // Don't forget to call finish to indicate the task is done.
        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log('[BackgroundFetch] failed to start', error);
      }
    );
    // Optional: Start the background task immediately
    BackgroundFetch.start();
    return () => {
      // Unregister the task when the component unmounts
      BackgroundFetch.stop();
    };
  }, []);
  const fetchCurrentLocation = async () => {
    // Implement logic to fetch current location here
    // You might want to use a location library or the device's native APIs
    // Return a string representation of the location
    return 'Latitude: xx.xxxxx, Longitude: yy.yyyyy';
  };
  return (
    <View>
      <Text>Your App Content Goes Here</Text>
    </View>
  );
};
export default App;