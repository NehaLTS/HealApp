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
  TREATMENTCOMPLETED,
} from 'libs/constants/Constant';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { Location, OrderCancelByClientRespnse } from 'libs/types/UserType';
import { paymentsendToApi } from 'libs/OrderPayment';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const SearchDoctorController = () => {
  const route = useRoute<any>();
  const { t } = useTranslation();
  const { BookOrderRequest, OrderCancelFromClient, orderProvider } =
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
  const [focusOnPath, setFocusOnPath] = useState<Location>();
  const previousScreen = route?.params?.previousScreen;
  const [providerStatus, setProviderStatus] = useState<string>(
    previousScreen !== 'HOME_CLIENT' ? 'Estimated arrival' : '',
  );
  const payment = getLocalData('WALLETDETAIL');
  const [currentOrder, setCurrentOrder] = useState<Order>(
    route?.params?.currentOrder,
  );
  const [orderTime, setOrderTime] = useState<string>('');
  const [showAddToWallet, setShowAddToWallet] = useState<boolean>(false);
  const [nowEnableCancelApi, setNowEnableCancelApi] = useState<boolean>(false);
  console.log('currentOrder', currentOrder);
  const focusBetweenClientAndProvider = (providerSetLocation: {
    latitude: string;
    longitude: string;
  }) => {
    console.log('providerSetLocation', providerSetLocation);
    setTimeout(() => {
      if (
        providerSetLocation &&
        userLocation &&
        userLocation?.onboardingLocation &&
        userLocation?.onboardingLocation?.latitude &&
        userLocation?.onboardingLocation?.longitude
      ) {
        const centerPoint = {
          latitude:
            (parseFloat(providerSetLocation.latitude) +
              parseFloat(userLocation?.onboardingLocation?.latitude)) /
            2,
          longitude:
            (parseFloat(providerSetLocation.longitude) +
              parseFloat(userLocation?.onboardingLocation?.longitude)) /
            2,
        };

        // Calculate the distance between provider and client for determining zoom level
        const distance = Math.sqrt(
          Math.pow(
            parseFloat(providerSetLocation.latitude) -
              parseFloat(userLocation?.onboardingLocation?.latitude),
            2,
          ) +
            Math.pow(
              parseFloat(providerSetLocation.longitude) -
                parseFloat(userLocation?.onboardingLocation?.longitude),
              2,
            ),
        );

        const bufferFactor = 1.2;
        const region = {
          latitude: centerPoint.latitude,
          longitude: centerPoint.longitude,
          latitudeDelta: distance * bufferFactor,
          longitudeDelta: distance * bufferFactor,
        };

        const boundingBox = {
          latitude:
            (parseFloat(providerSetLocation.latitude) +
              parseFloat(userLocation?.onboardingLocation?.latitude)) /
            2,
          longitude:
            (parseFloat(providerSetLocation.longitude) +
              parseFloat(userLocation?.onboardingLocation?.longitude)) /
            2,
          latitudeDelta:
            Math.abs(
              parseFloat(providerSetLocation.longitude) -
                parseFloat(userLocation?.onboardingLocation?.latitude),
            ) * 2,
          longitudeDelta:
            Math.abs(
              parseFloat(providerSetLocation.longitude) -
                parseFloat(userLocation?.onboardingLocation?.longitude),
            ) * 2,
        };

        setFocusOnPath(region);
      } else {
        return null;
      }
    }, 1000);
  };

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
    setShowAddToWallet(false);
    let totalCost = route?.params?.orderDetails.TotalCost;
    const shotAmounts = parseFloat(totalCost) - 500;
    const amount = paymentsendToApi(500, shotAmounts);
    let orderDetails = route?.params?.orderDetails;
    let heardDetail = route?.params?.heardDetail ?? '';
    console.log('search orderDetails', amount);
    const clientBalance = parseFloat(payment?.wallet_amount ?? '0');

    if (amount.walletMinimumAmount > clientBalance) {
      Alert.alert(
        `You should have minimum amount of ${amount.walletMinimumAmount.toString()} in your wallet`,
      );
      setShowAddToWallet(true);
    } else {
      setShowAddToWallet(false);

      const res = await orderProvider({
        ...orderDetails,
        total_order_price: amount.totalAmount.toString(),
        service_charge: amount.appAmount.toString(),
        services: heardDetail ? '1' : orderDetails.services,
        currency: 'NIS',
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
        focusBetweenClientAndProvider({
          latitude: res.providerDetails.currentLatitude,
          longitude: res.providerDetails.currentLongitude,
        });

        setProviderLocation({
          latitude: parseFloat(res.providerDetails.currentLatitude),
          longitude: parseFloat(res.providerDetails.currentLongitude),
        });
      } else {
        setShowLoader(false);
        setProviderNotFound(true);
        Alert.alert(t('no_nearby_provider'), t('try_again_later'), [
          {
            text: t('ok'),
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    }
  };

  const setStatusOnEventFire = (evenTitle: string) => {
    switch (evenTitle) {
      case ORDER_ACCEPTED:
        showToast(t('order_accepted'), t('order_is_accepted'), '');
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
        focusBetweenClientAndProvider({
          latitude: event.data.latitude,
          longitude: event.data.longitude,
        });

        setProviderLocation({
          latitude: parseFloat(event.data.latitude),
          longitude: parseFloat(event.data.longitude),
        });
      }
      console.log('DoctorNotification', JSON.stringify(event));
    });

    return () => {
      console.log('called here 1111111');
      DeviceEventEmitter.removeAllListeners('ClientOrderListener');
    };
  };

  const permissionHelper = {
    title: t('location_permission'),
    message: t('location_permission_text'),
    buttonNeutral: 'ask_me_later',
    buttonNegative: t('cancel'),
    buttonPositive: t('ok'),
  };

  // functions
  const forceAlert = () => {
    Alert.alert(
      t('location_required'),
      t('location_required_text'),
      [{ text: t('ok'), onPress: () => Linking.openSettings() }],
      { cancelable: false },
    );
  };

  const handleNextButtonPress = async () => {
    const TIME = new Date().toLocaleTimeString();
    const newDate = new Date().toLocaleDateString();
    const formatDate = moment(newDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const ORDER_TIME = formatDate + ' ' + TIME;
    const orderBookResponse = await BookOrderRequest({
      orderStatus: 'accept',
      provider_id: currentOrder?.providerDetails?.providerId?.toString(),
      order_id: currentOrder?.orderId?.toString(),
      time: TIME,
      distance: '',
    });
    console.log('gurpreet', orderBookResponse);
    orderBookResponse;
    if (orderBookResponse?.isSuccessful) {
      console.log(
        'ORDER_TIMEHome',
        ORDER_TIME,
        'newDate',
        newDate,
        'formatDate',
        formatDate,
        'format',
        new Date(),
      );

      console.log('ORDER_TIME', ORDER_TIME);
      setOrderTime(ORDER_TIME);
      setNowEnableCancelApi(true);
      Sentry.captureMessage(
        `orderSendResponse ${JSON.stringify(orderBookResponse)}`,
      );
      console.log(
        'insidee',
        JSON.stringify(orderBookResponse),
        JSON.stringify(orderBookResponse.services[0].name),
      );
      setDisable(true);
    } else {
      setIsBookOrder(false);
      console.log('clientOrderElse');
    }
    setLocalData('ORDER', { ...currentOrder, orderStatus: 'Created' });
  };

  const orderCancel = () => {
    if (nowEnableCancelApi) {
      OrderCancelFromClient({
        order_id: currentOrder?.orderId,
        orderTime: orderTime,
      })
        .then((res: OrderCancelByClientRespnse) => {
          console.log('cancel reaposnse', res);
          setLocalData('ORDER', {
            orderId: '',
          });
          if (res.isSuccessful) {
            // const newAmount = parseFloat(payment?.wallet_amount ?? '0') + parseFloat(res.clientAmount)
            // setLocalData('WALLETDETAIL', {
            //   wallet_amount: newAmount.toString()
            // })
          }
        })
        .catch((error) => {
          Alert.alert('Error Occured', error.toString());
        });
    }
    navigation.goBack();
  };
  return {
    permissionHelper: permissionHelper,
    forceAlert,
    handleNextButtonPress,
    showRateAlert,
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
    showAddToWallet,
    orderCancel,
  };
};

export default SearchDoctorController;
