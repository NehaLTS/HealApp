import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import {
  Location,
  ProviderProfile,
  ProviderServices,
} from 'libs/types/UserType';
import { useEffect, useState } from 'react';
import { Alert, DeviceEventEmitter } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { ProviderHomeDetails } from 'libs/types/ProvierTypes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { getHeight } from 'libs/StyleHelper';
import { ProviderOrderReceive } from 'libs/types/OrderTypes';
import { paymentsendToApi, totalPrice } from 'libs/OrderPayment';
import useToast from 'components/common/useToast';

const HomeScreenControlller = () => {
  const order = getLocalData('PROVIDERORDER');
  const navigation = useNavigation<any>();
  const [servicesFromApi, setServicesFromAPi] = useState<ProviderServices[]>(
    [],
  );
  const { GetProviderProfiles } = AuthServicesProvider();

  const [acceptOrder, setAcceptOrder] = useState(
    order?.extraData?.orderAccepted ?? false,
  );
  const {
    userId,
    providerProfile,
    token,
    setProviderProfile,
    setProviderServices,
  } = UseProviderUserContext();
  const { userLocation, setProviderOrder } = UseProviderUserContext();
  const localData = getLocalData('USERPROFILE');
  const available = getLocalData('USER');
  const { t, i18n } = useTranslation();
  const [isAvailable, setIsAvailable] = useState(
    available?.isProviderAvailable,
  );
  const [providerDaySummary, setProviderDaySummary] =
    useState<ProviderHomeDetails>();
  const [showSidebar, setShowSidebar] = useState(false);
  const [profileOnHold, setProfileOnHold] = useState(
    available?.isOnHold ?? false,
  );
  const [isArrived, setIsArrived] = useState(
    order?.extraData?.isArrived ?? false,
  );
  const [notification, setNotification] = useState(
    order?.extraData?.isNotification ?? false,
  );

  const [isVisibleLicense, setIsVisibleLicense] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isAddDocument, setIsAddDocument] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus ?? '');
  const [isShowModal, setIsShowModal] = useState(false);
  const [totalPricesOfServices, setTotalPricesOfServices] =
    useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showTreatmentFinished, setShowTreatmentFinished] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(
    order?.extraData?.isSeeMore ?? false,
  );
  const { showToast, renderToast } = useToast();
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const modalHeight = useSharedValue(
    getHeight(order?.extraData?.modalHeight ?? 360),
  );
  console.log(notification, 'notification Home Screen');

  React.useMemo(async () => {
    const res = await GetProviderProfiles(userId);
    console.log('gurepreet', res);
    if (res?.firstname) {
      const response = res;
      setProviderServices(response?.modifiedServices);
      setProviderProfile({
        ...providerProfile,
        profilePicture: response?.profile_picture,
      });
      setLocalData('PROVIDERSERVICES', response?.modifiedServices);
      setLocalData('USERPROFILE', {
        profilePicture: response?.profile_picture,
        // firstName: response?.firstname,
        // lastName: response?.lastname,
      } as ProviderProfile);
    }
  }, []);

  const {
    OrderRequst,
    UpdateProviderLocation,
    providerAvailabilityStatus,
    TreatementEnded,
    getProviderDaySummary,
    onGetProviderService,
  } = AuthServicesProvider();

  const sendFCMMessage = async () => {
    const url =
      'https://fcm.googleapis.com/v1/projects/heal-app-ccd03/messages:send';

    const headers = {
      Authorization: `Bearer AAAAxH2Mm_o:APA91bExnW_nsCdGtMb0PM6fQTkzp8P0iHqStuTL7ex-qjRg1CYHV2DEJA5Rud4jPTqMps0t6SoXpnNtoQro4wHI6Y7HezkB6iSMfOU7ARDKbu2ZM3-1tBN0Vy1K78IVKv-e9Fvq32ul`,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      message: {
        topic: 'healApp',
        notification: {
          body: 'This is a Firebase Cloud Messaging Topic Message!',
          title: 'FCM Message',
        },
      },
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('FCM Message sent successfully:', result);
    } catch (error) {
      console.error('Error sending FCM Message:', error);
    }
  };

  const getSummaryofDay = async () => {
    let currentdate = new Date();
    let dateMDY = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()}`;

    let daySummary = await getProviderDaySummary(
      {
        provider_id: userId,
        created_date_time: dateMDY,
      },
      token,
    );
    console.log('daySummary123', daySummary);
    if (!daySummary?.onHold) {
      setProviderDaySummary(daySummary);
    }
    setProfileOnHold(daySummary?.onHold ?? false);
    setLocalData('USER', {
      isOnHold: daySummary?.onHold ?? false,
    });
  };

  useEffect(() => {
    getSummaryofDay();
  }, []);

  const getProviderServices = async () => {
    let response = await onGetProviderService(
      {
        provider_id: providerProfile?.provider?.id,
        specialty_id: providerProfile?.speciality?.id,
      },
      token,
    );
    console.log('newSevices', response);
    if (response && response.services) {
      setServicesFromAPi(response.services);
      Sentry.captureMessage(
        `Provider flow GET ALL RELATED SERVICES onGetProviderService(API) for:-${
          providerProfile?.firstName ?? ''
        }---- ${response.services}`,
      );
    }
  };

  const manuallUpadteLocaion = () => {
    setIsLoading(true);

    Geolocation.getCurrentPosition(
      (position) => {
        // Alert.alert('WatchPostion');
        // setProviderLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.02,
        //   longitudeDelta: 0.02,
        //   timestamp: position.timestamp
        // })
        // Call the function to send the FCM message
        // sendFCMMessage();
        Sentry.captureMessage(
          `Provider notification event watchPosition check for:-${providerProfile?.firstName}---- `,
        );

        UpdateProviderLocation({
          provider_id: userId,
          order_id: order?.orderId ?? '1',
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }).then((res) => {
          if (res.msg) {
            setIsLoading(false);
          }
          Sentry.captureMessage(
            `Provider notification event 'update location api response' for:-${providerProfile?.firstName}---- ${res}`,
          );
          console.log('gurepeet', res);
        });
      },
      (error) => {
        setIsLoading(false);
        Sentry.captureMessage(
          `Provider notification event 'update location api error' for:-${providerProfile?.firstName}---- ${error.message}`,
        );
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 4, // Minimum distance (in meters) to trigger an update
        showLocationDialog: true, // Show a dialog if location services are not enabled
        forceRequestLocation: true, // Force a location request, even if permissions are not granted
        forceLocationManager: false, // Use the LocationManager on Android, even if Google Play Services are available
      },
    );
  };

  const updateArrivedStatusDynamical = () => {
    Geolocation.watchPosition(
      (position) => {
        Sentry.captureMessage(
          `Provider notification event watchPosition check for:-${providerProfile?.firstName}---- `,
        );

        UpdateProviderLocation({
          provider_id: userId,
          order_id: order?.orderId ?? '1',
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }).then((res) => {});
      },
      (error) => {
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 4, // Minimum distance (in meters) to trigger an update
        interval: 1000, // Minimum time interval (in milliseconds) to trigger an update
        fastestInterval: 500, // Maximum time interval (in milliseconds) between updates
        showLocationDialog: true, // Show a dialog if location services are not enabled
        forceRequestLocation: true, // Force a location request, even if permissions are not granted
        forceLocationManager: false, // Use the LocationManager on Android, even if Google Play Services are available
        showsBackgroundLocationIndicator: true,
      },
    );
  };
  const updateLocation = (mannualUpdate?: boolean) => {
    if (mannualUpdate) {
      manuallUpadteLocaion();
    } else {
      updateArrivedStatusDynamical;
    }
  };

  const OnPressTakeOrder = () => {
    setAcceptOrder(true);
    OrderRequst({
      orderStatus: 'accept',
      provider_id: userId,
      order_id: order?.orderId ?? '1',
      latitude: userLocation.currentLocation?.latitude ?? '',
      longitude: userLocation.currentLocation?.longitude ?? '',
    })
      .then((res) => {
        console.log('ordereAcceptedRes', res);
        if (!res?.message) {
          setAcceptOrder(true);
          setLocalData('PROVIDERORDER', {
            extraData: {
              modalHeight: 652,
              isSeeMore: true,
              orderAccepted: true,
            },
          });
        } else {
          Alert.alert('Message:- ', res?.message);
        }
      })
      .catch((error) => {
        Alert.alert('Some error is occur', error);
      });
  };

  const onPressProfileTab = (title: string) => {
    console.log('title', title);
    setShowSidebar(false);
    navigation.navigate(NavigationRoutes.ProviderProfile, {
      screen: title,
    });
  };

  const getImageUrl = (url: string) => setLicensePicture(url);

  const onPressUpload = () => {
    if (licensePicture?.length) {
      setLocalData('USERPROFILE', {
        licensepicture: licensePicture,
      });
      setIsAvailable(true);
      setLocalData('USER', { isProviderAvailable: true });
      setIsAddDocument(false);
      setIsVisibleLicense(false);
    }
  };

  const handleAddDocument = () => {
    setIsAddDocument(true);
  };
  const onConfirmCancelOrder = (pressOn: string) => {
    if (pressOn === 'yes') {
      setIsCancelOrder(false);
      setAcceptOrder(false);
      setIsArrived(false);
      // setIsAvailable(false);
      setNotification(false);
      setIsSeeMore(false);
      modalHeight.value = withSpring(getHeight(360));
      // setLocalData('USER', { isProviderAvailable: false });

      setLocalData('PROVIDERORDER', {
        extraData: {
          modalHeight: 360,
          isCancelOrder: true,
          isArrived: false,
          orderAccepted: false,
          isSeeMore: false,
          isNotification: false,
        },
        orderStatus: '',
        OrderReceive: {} as ProviderOrderReceive,
      });
    } else {
      setIsCancelOrder(false);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isCancelOrder: false,
        },
      });
    }
  };

  useEffect(() => {
    let serviceTotalPrice: string = '';
    // onConfirmCancelOrder('yes');
    DeviceEventEmitter.addListener('ProviderOrderListener', (event) => {
      console.log('status of event', event?.data?.status);
      console.log(
        'providerNotification **** 0000 ***** 00000',
        JSON.stringify(event),
      );

      if (event.data?.status === 'Payment Done') {
        setNotification(false);
        showToast('Payment Done!', 'Your Payment is done ', '');
      }
      if (event.data?.status === 'Order created') {
        setLocalData('PROVIDERORDER', {
          OrderReceive: {
            address: event.data.address,
            firstname: event.data.firstname,
            lastname: event.data.lastname,
            phone_number: event.data.phone_numbe,
            providerId: event.data.providerId,
            distance: event.data.distance,
            symptoms: event.data.symptoms,
            services: event.data.services,
            time: event.data.time,
          },
          latitude: event.data.latitude,
          longitude: event.data.longitude,
          orderId: event.data.orderId,
        });
        setProviderOrder({
          OrderReceive: {
            address: event.data.address,
            firstname: event.data.firstname,
            lastname: event.data.lastname,
            phone_number: event.data.phone_numbe,
            providerId: event.data.providerId,
            distance: event.data.distance,
            symptoms: event.data.symptoms,
            services: event.data.services,
            time: event.data.time,
          },
          latitude: event.data.latitude,
          longitude: event.data.longitude,
          orderId: event.data.orderId,
        });
        serviceTotalPrice = totalPrice(JSON.parse(event?.data?.services));
        console.log(
          'event?.data?.services',
          event?.data?.services,
          JSON.parse(event?.data?.services),
          serviceTotalPrice,
        );
        setNotification(true);
      }
      setOrderStatus(event.data?.status);

      setLocalData('PROVIDERORDER', {
        orderStatus: event.data.status,
      });
      if (event.data.status === 'Arrived' || orderStatus === 'Arrived Order') {
        console.log('event.data.status', event.data.status);

        setTotalPricesOfServices(serviceTotalPrice);
        setIsArrived(true);
        setLocalData('PROVIDERORDER', {
          orderStatus: event.data.status,
          extraData: {
            isArrived: true,
            totalPrice: serviceTotalPrice,
          },
        });
      }
    });

    if (acceptOrder && !isArrived) {
      console.log('accept', acceptOrder);
      updateLocation();
    }

    return () => {
      DeviceEventEmitter.removeAllListeners('OrderListener');
    };
  }, [acceptOrder || isArrived || orderStatus]);

  useEffect(() => {
    getSummaryofDay();
  }, [orderStatus === 'Payment Done']);
  // .toLocaleString()

  const onPressToggle = (available: boolean, isLogout?: boolean) => {
    console.log('available', available);
    //TODO: Uncomment this code to add license number
    // if ((localData as ProviderProfile)?.licensenumber === '') {
    //   setIsVisibleLicense(true);
    // } else {
    setLocalData('USER', {
      isProviderAvailable: available,
    });
    setIsAvailable(available);
    const availability = available ? 1 : 0;

    providerAvailabilityStatus(
      { provider_id: userId, availability: availability.toString() },
      token,
    )
      .then((res) => {
        Sentry.captureMessage(
          `first notification available status for:-${providerProfile?.firstName}---- ${res}`,
        );
        console.log('availabitity status', JSON.stringify(res), available);
      })
      .catch(() => {
        setIsAvailable(false);
      });
    if (!isLogout) {
      getSummaryofDay();
    }
    // }
  };

  const onPressSeeMore = () => {
    if (isSeeMore) {
      modalHeight.value = withSpring(getHeight(360));
      setIsSeeMore(false);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isSeeMore: false,
          modalHeight: 360,
        },
      });
    } else {
      modalHeight.value = withSpring(getHeight(652));
      setIsSeeMore(true);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isSeeMore: true,
          modalHeight: 652,
        },
      });
    }
  };

  const onPressCancelOrder = () => {
    setIsCancelOrder(true);
  };

  const orderAccept = () => {
    OnPressTakeOrder();
    modalHeight.value = withSpring(getHeight(652));
    setIsSeeMore(true);
  };

  const onPressTreatmentEnd = async (services?: any) => {
    console.log('treatemntEndServices', services);
    const shotAmounts = parseFloat(totalPrice(services)) - 500;
    const amount = paymentsendToApi(500, shotAmounts);
    console.log(amount, 'amount at treatment end');
    setIsLoading(true);
    await TreatementEnded({
      order_id: order?.orderId ?? '1',
      total_order_price: amount.totalAmount.toString(),
      TotalCost: amount.orderAmount.toString(),
      service_charge: amount.appAmount.toString(),
      currency: 'NIS',
      treatment_completed: 'completed',
    })
      .then((res) => {
        console.log('Treatement Ended response', res);
        if (res?.isSuccessful) {
          setShowTreatmentFinished(true);
          setAcceptOrder(false);
          setIsArrived(false);
          setNotification(false);
          modalHeight.value = withSpring(getHeight(360));
          setIsSeeMore(false);
          setLocalData('PROVIDERORDER', {
            extraData: {
              modalHeight: 360,
              isSeeMore: false,
              isNotification: false,
              isArrived: false,
              orderAccepted: false,
            },
            orderStatus: '',
            OrderReceive: {} as ProviderOrderReceive,
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          showToast('Failed!', 'Treatment end is failed.', 'error');
        }
      })
      .catch((err) => {
        console.error('treatement ended error', err), setIsLoading(false);
      });
  };

  return {
    acceptOrder,
    updateLocation,
    setAcceptOrder,
    navigation,
    providerDaySummary,
    getSummaryofDay,
    setProviderProfile,
    servicesFromApi,
    getProviderServices,
    onPressProfileTab,
    showSidebar,
    setShowSidebar,
    showTreatmentFinished,
    setShowTreatmentFinished,
    totalPricesOfServices,
    notification,
    modalHeight,
    onPressUpload,
    onPressTreatmentEnd,
    orderAccept,
    onPressCancelOrder,
    onPressSeeMore,
    onPressToggle,
    getImageUrl,
    handleAddDocument,
    onConfirmCancelOrder,
    isAvailable,
    isSeeMore,
    licensePicture,
    isCancelOrder,
    isAddDocument,
    isArrived,
    setIsArrived,
    isLoading,
    setIsLoading,
    profileOnHold,
  };
};

export default HomeScreenControlller;
