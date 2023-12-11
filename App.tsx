// import notifee, { EventType } from '@notifee/react-native';
// import NavigationRoutes from 'navigator/NavigationRoutes';
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, Text } from 'react-native';

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     return notifee.onForegroundEvent(({ type, detail }) => {
//       switch (type) {
//         case EventType.DISMISSED:
//           console.log('User dismissed notification', detail.notification);
//           break;
//         case EventType.PRESS:
//           console.log('User pressed notification', detail.notification);
//           break;
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const displayNotification = async () => {
//       await notifee.requestPermission();

//       const channelId = await notifee.createChannel({
//         id: 'location',
//         name: 'Default Channel',
//       });

//       const notification = {
//         title: 'Notification Title',
//         body: count.toString(),
//         android: {
//           channelId,
//           smallIcon: 'ic_launcher_foreground',
//           pressAction: {
//             id: 'location',
//           },
//         },
//       };

//       await notifee.displayNotification(notification);
//     };

//     notifee.onForegroundEvent(async ({ type, detail }) => {
//       const { notification, pressAction } = detail;

//       setInterval(() => {
//         setCount((prevCount) => prevCount + 1);
//         displayNotification();
//         console.log('Notification Background Event:', notification);
//       }, 8000);
//       console.log('Notification Pressed:', notification);

//       if (type === EventType.PRESS) {
//         if (pressAction?.id === 'location') {
//           console.log('pressed');
//         }
//       }
//     });

//     notifee.onBackgroundEvent(async ({ type, detail }) => {
//       const { notification, pressAction } = detail;
//       // setInterval(() => {
//       //   setCount((prevCount) => prevCount + 1);
//       //   displayNotification();
//       console.log('Notification Background Event:', notification);
//       // }, 8000);

//       // Handle background event logic here
//     });

//     const interval = setInterval(() => {
//       setCount((prevCount) => prevCount + 1);
//       displayNotification();
//     }, 8000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [count]);

//   return (
//     <SafeAreaView>
//       <Text>hello</Text>
//       <Text style={{ fontSize: 30 }}>{count.toString()}</Text>
//     </SafeAreaView>
//   );
// };

// export default App;


import { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import React from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const setupNotifications = async () => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      notifee.onForegroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        console.log('Notification Pressed:', notification);

        if (type === EventType.PRESS) {
          if (pressAction?.id === 'location') {
            console.log('Notification Action Pressed');
          }
        }
      });

      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { notification, pressAction } = detail;

        console.log('Notification Background Event:', notification);

        // Handle background event logic here
      });
    };

    const displayNotification = async () => {
      const notification = {
        title: 'Notification Title',
        body: `Count: ${count}`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher_foreground',
          pressAction: {
            id: 'location',
          },
        },
      };

      await notifee.displayNotification(notification);
    };

    setupNotifications();

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      displayNotification();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <SafeAreaView>
      <Text>hello</Text>
      <Text style={{ fontSize: 30 }}>{count.toString()}</Text>
    </SafeAreaView>
  );
};

export default App;
