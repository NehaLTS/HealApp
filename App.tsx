import notifee from '@notifee/react-native';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const backgroundEventSubscription = React.useRef<any>(null);

  // Function to display a notification
  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.requestPermission();

    const notificationId = await notifee.displayNotification({
      id: '123',
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      },
    });

    // Sometime later...
    await notifee.displayNotification({
      id: '124', // Use a different ID for the updated notification
      title: 'Updated Notification Title',
      body: 'Updated main body content of the notification' + count.toString(),
      android: {
        channelId,
      },
    });
  }

  useEffect(() => {
    backgroundEventSubscription.current = notifee.onBackgroundEvent(
      async ({ type, detail }) => {
        const { notification } = detail;

        setCount((prevCount) => prevCount + 1);
        await onDisplayNotification();
        console.log('Notification Background Event:', notification);
      }
    );

    // Set up a periodic interval to trigger notifications in the foreground
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      onDisplayNotification();
    }, 10000);

    // Cleanup: clear the interval and remove the background event subscription
    return () => {
      clearInterval(interval);

      // Check if the subscription exists before trying to remove
      // if (backgroundEventSubscription.current) {
      //   backgroundEventSubscription.current.remove();
      // }
    };
  }, [count]);

  return (
    <SafeAreaView>
      <Text>hello</Text>
      <Text style={{ fontSize: 30 }}>{count.toString()}</Text>
      <Button title='Trigger Notification' onPress={onDisplayNotification} />
    </SafeAreaView>
  );
};

export default App;
