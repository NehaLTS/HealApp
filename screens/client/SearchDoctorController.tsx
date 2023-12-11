import { Alert, Linking, DeviceEventEmitter } from 'react-native';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { useEffect, useState } from 'react';
import haversine from 'haversine';
import { useRoute } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { Order } from 'libs/types/OrderTypes';
import useToast from 'components/common/useToast';

const SearchDoctorController = () => {
  const route = useRoute<any>();
  const { BookOrderRequest, providerLocationSearch, orderProvider } =
    ClientOrderServices();
  const { currentLocationOfUser } = UseClientUserContext();
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [providerLocation, setProviderLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const { showToast } = useToast();

  const [showTimer, setShowTimer] = useState(false);

  const previousScreen = route?.params?.previousScreen;
  const [stausOfArriving, setStausOfArriving] = useState<string>(
    previousScreen !== 'HOME_CLIENT' ? 'Estimated arrival' : '',
  );
  const [currentOrder, setCurrentOrder] = useState<Order>(
    route?.params?.currentOrder,
  );
  // const orderData = getLocalData('ORDER')?.providerDetail
  // const orderDetails:Order=route?.params?.orderDetails;
  // const orderId = route?.params?.orderId ?? '';
  // const providerData = route?.params?.providerData ?? '';

  useEffect(() => {
    if (previousScreen == 'Create Order') {
      createOrder();
    } else if (currentOrder) {
      setProviderLocation({
        latitude: parseFloat(currentOrder.providerDetails.currentLatitude),
        longitude: parseFloat(currentOrder.providerDetails.currentLongitude),
      });
    }

    getEventUpdate();
  }, []);

  const createOrder = async () => {
    setShowLoader(true);

    let orderDetails = route?.params?.orderDetails;
    const res = await orderProvider(orderDetails);
    Sentry.captureMessage(
      `Client flow ON PRESS ORDER BUTTON ON SUMMARY SCREEN RESPONSE for:-${JSON.stringify(
        res,
      )}`,
    );
    console.log(' RESPINSE+++++', res);



    if (res?.orderId) {
      Sentry.captureMessage(
        `First order button for Search the  Provider:-${JSON.stringify(res)}}`,
      );

      setCurrentOrder({
        orderId: res?.orderId,
        providerDetails: {
          providerId: res.closestProvider.provider_id,
          providerName:
            res.closestProvider.firstname + ' ' + res.closestProvider.lastname,
          providerAddress: res.closestProvider.address,
          providerProfilePicture: res.closestProvider.profile_picture,
          providerRating: res.closestProvider.ratings,
          phoneNumber: res.closestProvider.phone_number,
          currentLatitude: res.closestProvider.latitude,
          currentLongitude: res.closestProvider.longitude,
        },
        orderPrice: res.closestProvider.price,
        orderStatus: '',
        orderServices: '',
      });
      setTimeout(() => {
        setShowLoader(false);
      }, 10000);
      setProviderLocation({
        latitude: parseFloat(res.closestProvider.latitude),
        longitude: parseFloat(res.closestProvider.longitude),
      });
    } else {
      Sentry.captureMessage(
        `Client flow ON PRESS END ORDER API ERROR for:- ${JSON.stringify(
          res?.message,
        )}`,
      );
      Alert.alert(res?.message);
    }

    console.log('orderId..', res.orderId);
  };

  /**
   * Listener to get event updates
   */
  const getEventUpdate = () => {
    DeviceEventEmitter.addListener('DoctorNotification', (event) => {
      calculateDistance();
      // setLocalData('ORDER', {
      //   orderStatus:
      //     event.notification.title === 'Accept Order'
      //       ? 'On the way'
      //       : event.notification.title === 'Arrived Order'
      //       ? 'Arrived'
      //       : 'Estimated arrival',
      // });
      console.log('DoctorNotification', JSON.stringify(event));
      if (event.notification.title === 'Accept Order') {
        console.log('called here 222222');
        showToast('Order Accepted!', 'Your order is accepted!', '');
        // setShowCancelTextButton(false);
        // setShowCancelButton(true);

        setLocalData('ORDER', { orderStatus: 'Accepted By Provider' });

        //TODO:Vandana why and how to set data here

        // setLocalData('ORDER', {
        // providerName: providerData.firstname+' '+providerData.lastname,
        // providerAddress: providerData.address,
        // orderPrice: providerData.price,
        // orderStatus: 'Started',
        // providerProfilePicture: providerData.profile_picture,
        // providerRating: providerData.ratings,
        // orderServices: '',
        //   orderId: orderId,
        // });
        setShowTimer(true);
        setStausOfArriving('On the way');
      }
      if (event.notification.title === 'Arrived Order') {
        console.log('called here 11111');
        setLocalData('ORDER', {
          orderStatus: 'Arrived',
        });
        // setShowCancelTextButton(false);
        setStausOfArriving('Arrived');
      }

      // setTimeout(() => {
      //   setShowCancelButton(false);
      // }, 300000);
      setProviderLocation({
        latitude: parseFloat(event.data.latitude),
        longitude: parseFloat(event.data.longitude),
      });
    });
  };

  const permissionHelper = {
    title: 'Location Permission',
    message: 'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  };

  // functions
  const forceAlert = () => {
    Alert.alert(
      'Location access required',
      'Kindly allow location access in settings or turn on gps and restart app',
      [{ text: 'OK', onPress: () => Linking.openSettings() }],
      { cancelable: false },
    );
  };

  const handleNextButtonPress = async () => {
    console.log('  orderData..', currentOrder);

    //TODO:Vandana why we are passing status as accept here
    const orderBookResponse = await BookOrderRequest({
      status: 'accept',
      provider_id: currentOrder?.providerDetails.providerId,
      order_id: currentOrder.orderId,
      latitude: currentLocationOfUser.latitude,
      longitude: currentLocationOfUser.longitude,
      distance: Math.round(calculateDistance()).toString(),
      time: Math.round(calculateTime().minutes).toString(),
    });

    if (orderBookResponse) {
      Sentry.captureMessage(
        `orderSendResponse ${JSON.stringify(orderBookResponse)}`,
      );
      Alert.alert('orderSendResponse' + JSON.stringify(orderBookResponse));
      setDisable(true);
    }
    setLocalData('ORDER', { ...currentOrder, orderStatus: 'Created' });
  };

  const calculateDistance = () => {
    const userCurrentLocation = {
      latitude: parseFloat(currentLocationOfUser?.latitude),
      longitude: parseFloat(currentLocationOfUser?.longitude),
    };
    const ProviderLocation = {
      latitude: parseFloat(currentOrder.providerDetails.currentLatitude),
      longitude: parseFloat(currentOrder.providerDetails.currentLongitude),
    };
    const distance = haversine(ProviderLocation, userCurrentLocation, {
      unit: 'km',
    });
    console.log('Distance...', distance);
    return distance;
  };

  const calculateTime = () => {
    const DISTANCE = calculateDistance();
    const AVERAGE_SPEED = 40;
    const TIME = DISTANCE / AVERAGE_SPEED;
    const travelTimeInMinutes = TIME * 60;
    const travelTimeInHours = Math.floor(TIME / 60);
    const remainingMinutes = Math.round(TIME % 60);
    const travelTimeInSeconds = TIME * 3600;
    const time = {
      hour: travelTimeInHours,
      minutes: travelTimeInMinutes,
      seconds: TIME,
      remainig: remainingMinutes,
    };
    return time;
  };

  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress,
    showRateAlert,
    calculateDistance,
    calculateTime,
    showLoader,
    disabled,
    currentOrder,
    providerLocation,
    setProviderLocation,
    showTimer,
    stausOfArriving,
  };
};

export default SearchDoctorController;
