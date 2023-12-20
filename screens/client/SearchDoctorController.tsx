import { Alert, Linking, DeviceEventEmitter } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  ESTIMATE_ARRIVAL,
  ON_THE_WAY,
  ORDER_ACCEPTED,
  ORDER_CREATED,
  ORDER_STARTED,
  TREATMENTCOMPLETED,
} from 'libs/constants/Constant';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { Location } from 'libs/types/UserType';

const SearchDoctorController = () => {
  const route = useRoute<any>();
  const { BookOrderRequest, providerLocationSearch, orderProvider } =
    ClientOrderServices();
  const { userLocation } = UseClientUserContext();
  const [showRateAlert, setShowRateAlert] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [disabled, setDisable] = useState(false);
  const [providerLocation, setProviderLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const { showToast } = useToast();
  const navigation = useNavigation<any>();
  const [isBookOrder, setIsBookOrder] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [providerNotFound, setProviderNotFound] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [focusOnPath, setFocusOnPath] = useState<Location>()
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

  const focusBetweenClientAndProvider = (providerSetLocation: { latitude: string, longitude: string }) => {
    console.log("providerSetLocation", providerSetLocation)
    setTimeout(() => {


      if (providerSetLocation && userLocation && userLocation?.onboardingLocation && userLocation?.onboardingLocation?.latitude && userLocation?.onboardingLocation?.longitude) {
        const centerPoint = {
          latitude: (parseFloat(providerSetLocation.latitude) + parseFloat(userLocation?.onboardingLocation?.latitude)) / 2,
          longitude: (parseFloat(providerSetLocation.longitude) + parseFloat(userLocation?.onboardingLocation?.longitude)) / 2,
        };

        // Calculate the distance between provider and client for determining zoom level
        const distance = Math.sqrt(
          Math.pow(parseFloat(providerSetLocation.latitude) - parseFloat(userLocation?.onboardingLocation?.latitude), 2) +
          Math.pow(parseFloat(providerSetLocation.longitude) - parseFloat(userLocation?.onboardingLocation?.longitude), 2)
        );

        const bufferFactor = 1.2;
        const region = {
          latitude: centerPoint.latitude,
          longitude: centerPoint.longitude,
          latitudeDelta: distance * bufferFactor,
          longitudeDelta: distance * bufferFactor,
        };

        const boundingBox = {
          latitude: (parseFloat(providerSetLocation.latitude) + parseFloat(userLocation?.onboardingLocation?.latitude)) / 2,
          longitude: (parseFloat(providerSetLocation.longitude) + parseFloat(userLocation?.onboardingLocation?.longitude)) / 2,
          latitudeDelta: Math.abs(parseFloat(providerSetLocation.longitude) - parseFloat(userLocation?.onboardingLocation?.latitude)) * 2,
          longitudeDelta: Math.abs(parseFloat(providerSetLocation.longitude) - parseFloat(userLocation?.onboardingLocation?.longitude)) * 2,
        };


        setFocusOnPath(region)
      } else {
        return null
      }
    }, 1000);
  }

  useEffect(() => {
    if (previousScreen == 'Create Order') {
      createOrder();
    } else if (currentOrder) {
      if (
        currentOrder?.orderStatus === ON_THE_WAY ||
        currentOrder?.orderStatus === ORDER_ACCEPTED
      ) {
        setShowLoader(false);
        setShowDoctor(true);
        setShowTimer(true);
        setProviderStatus(ON_THE_WAY);
      } else if (currentOrder?.orderStatus === ARRIVED) {
        setShowLoader(false);
        setShowDoctor(true);
        setShowTimer(false);
        setProviderStatus(ARRIVED);
      } else if (currentOrder?.orderStatus === ESTIMATE_ARRIVAL) {
        setShowLoader(false);
        setIsBookOrder(true);
        setProviderStatus(ESTIMATE_ARRIVAL);
      }
      setProviderLocation({
        latitude: parseFloat(currentOrder?.providerDetails.currentLatitude),
        longitude: parseFloat(currentOrder?.providerDetails.currentLongitude),
      });
    }

    getEventUpdate();
  }, []);

  const createOrder = async () => {
    setShowLoader(true);

    let orderDetails = route?.params?.orderDetails;
    let heardDetail = route?.params?.heardDetail ?? '';
    console.log('search orderDetails', orderDetails);
    const res = await orderProvider({
      ...orderDetails,
      services: heardDetail ? '1' : orderDetails.services,
    });
    Sentry.captureMessage(
      `Client flow ON PRESS ORDER BUTTON ON SUMMARY SCREEN RESPONSE for:-${JSON.stringify(
        res,
      )}`,
    );
    console.log('RESPINSE+++++', res);

    if (res?.orderId) {
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
      focusBetweenClientAndProvider({ latitude: res.providerDetails.currentLatitude, longitude: res.providerDetails.currentLongitude })

      setProviderLocation({
        latitude: parseFloat(res.providerDetails.currentLatitude),
        longitude: parseFloat(res.providerDetails.currentLongitude),
      });
    } else {
      setShowLoader(false);
      setProviderNotFound(true);
      Alert.alert('No Nearby Doctor found', 'Sorry Please try again later', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const setStatusOnEventFire = (evenTitle: string) => {
    switch (evenTitle) {
      case ORDER_ACCEPTED:
        showToast('Order Accepted!', 'Your order is accepted!', '');
        setLocalData('ORDER', { orderStatus: ON_THE_WAY });
        setProviderStatus(ON_THE_WAY);
        setShowTimer(true);
        break;
      case ON_THE_WAY:
        setLocalData('ORDER', { orderStatus: ON_THE_WAY });
        setProviderStatus(ON_THE_WAY);
        break;
      case ESTIMATE_ARRIVAL:
        setLocalData('ORDER', { orderStatus: ESTIMATE_ARRIVAL });
        setProviderStatus(ESTIMATE_ARRIVAL);
        break;
      case ARRIVED:
        setLocalData('ORDER', {
          orderStatus: ARRIVED,
        });
        // setShowCancelTextButton(false);
        setProviderStatus(ARRIVED);
        break;

      case TREATMENTCOMPLETED:
        navigation.navigate(NavigationRoutes.TreatmentCompleted);
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

    DeviceEventEmitter.addListener('ClientOrderListener', (event) => {
      if (event.data && event.data.status)
        setStatusOnEventFire(event.data.status);

      if (event.data && event.data.latitude) {
        focusBetweenClientAndProvider({ latitude: event.data.latitude, longitude: event.data.longitude })

        setProviderLocation({
          latitude: parseFloat(event.data.latitude),
          longitude: parseFloat(event.data.longitude),
        });
      }
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
      // setProviderLocation({
      //   latitude: parseFloat(event.data.latitude),
      //   longitude: parseFloat(event.data.longitude),
      // });
    });

    return () => {
      console.log('called here 1111111');
      DeviceEventEmitter.removeAllListeners('ClientOrderListener');
    };
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

    //disable order button here Gurpreet

    //TODO:Vandana why we are passing status as accept here
    const orderBookResponse = await BookOrderRequest({
      orderStatus: ORDER_STARTED,
      provider_id: currentOrder?.providerDetails.providerId,
      order_id: currentOrder?.orderId,
      distance: Math.round(calculateDistance()).toString(),
      time: Math.round(calculateTime().minutes).toString(),
    });

    console.log('gurpreet', orderBookResponse);
    if (orderBookResponse?.isSuccessful) {
      Sentry.captureMessage(
        `orderSendResponse ${JSON.stringify(orderBookResponse)}`,
      );
      Alert.alert('orderSendResponse' + JSON.stringify(orderBookResponse));
      setDisable(true);
    } else {
      //Gurpreet to change it to cancel button
      setIsBookOrder(false);
    }
    setLocalData('ORDER', { ...currentOrder, orderStatus: 'Created' });
  };

  const calculateDistance = () => {
    const userCurrentLocation = {
      latitude: parseFloat(
        userLocation?.onboardingLocation?.latitude ??
        userLocation?.currentLocation?.latitude ??
        '0.0',
      ),
      longitude: parseFloat(
        userLocation?.onboardingLocation?.longitude ??
        userLocation?.currentLocation?.longitude ??
        '0.0',
      ),
    };
    const ProviderLocation = {
      latitude: parseFloat(currentOrder?.providerDetails.currentLatitude),
      longitude: parseFloat(currentOrder?.providerDetails.currentLongitude),
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
    permissionHelper: permissionHelper,
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
    isBookOrder,
    setIsBookOrder,
    showDoctor,
    setShowDoctor,
    focusOnPath,
    providerNotFound,
  };
};

export default SearchDoctorController;
