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
import {
  ARRIVED,
  ON_THE_WAY,
  ORDER_ACCEPTED,
  ORDER_CREATED,
  ORDER_STARTED,
} from 'libs/constants/Constant';

const SearchDoctorController = () => {
  const route = useRoute<any>();
  const { BookOrderRequest, providerLocationSearch, orderProvider } =
    ClientOrderServices();
  const { currentLocationOfUser } = UseClientUserContext();
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [disabled, setDisable] = useState(false);
  const [providerLocation, setProviderLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const { showToast } = useToast();

  const [showTimer, setShowTimer] = useState(false);

  const previousScreen = route?.params?.previousScreen;
  const [providerStatus, setProviderStatus] = useState<string>(
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
      console.log(' RESPINSE+++++', res);
      setTimeout(() => {
        setShowLoader(false);
      }, 10000);
      setShowRateAlert(false);
      setCurrentOrder({
        orderId: res?.orderId,
        providerDetails: {
          providerId: res.providerDetails.providerId,
          providerName: res.providerDetails.providerName,
          providerAddress: res.providerDetails.providerAddress,
          providerProfilePicture: res.providerDetails.providerProfilePicture,
          providerRating: res.providerDetails.providerRating,
          phoneNumber: res.providerDetails.phoneNumber,
          currentLatitude: res.providerDetails.currentLatitude,
          currentLongitude: res.providerDetails.currentLongitude,
        },
        orderPrice: res.orderPrice,
        orderStatus: res.orderStatus,
        orderServices: res.orderServices,
      });

      setProviderLocation({
        latitude: parseFloat(res.providerDetails.currentLatitude),
        longitude: parseFloat(res.providerDetails.currentLongitude),
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

  const setStatusOnEventFire = (evenTitle: string) => {
    switch (evenTitle) {
      case ORDER_ACCEPTED:
        showToast('Order Accepted!', 'Your order is accepted!', '');
        setLocalData('ORDER', { orderStatus: ORDER_ACCEPTED });
        setProviderStatus('On the way');
        setShowTimer(true);
        break;
      case ON_THE_WAY:
        break;
      case ARRIVED:
        setLocalData('ORDER', {
          orderStatus: ARRIVED,
        });
        // setShowCancelTextButton(false);
        setProviderStatus(ARRIVED);
        break;
      default:
        setProviderStatus('Estimated arrival');
        break;
    }
  };

  /**
   * Listener to get event updates
   */
  const getEventUpdate = () => {
    DeviceEventEmitter.addListener('OrderListener', (event) => {
      setStatusOnEventFire(event.notification.title);
      setProviderLocation({
        latitude: parseFloat(event.data.latitude),
        longitude: parseFloat(event.data.longitude),
      });
      // setLocalData('ORDER', {
      //   orderStatus:
      //     event.notification.title === 'Accept Order'
      //       ? 'On the way'
      //       : event.notification.title === 'Arrived Order'
      //       ? 'Arrived'
      //       : 'Estimated arrival',
      // });
      console.log('DoctorNotification', JSON.stringify(event));

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
      orderStatus: ORDER_STARTED,
      provider_id: currentOrder?.providerDetails.providerId,
      order_id: currentOrder.orderId,
      distance: Math.round(calculateDistance()).toString(),
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
    providerStatus,
  };
};

export default SearchDoctorController;
