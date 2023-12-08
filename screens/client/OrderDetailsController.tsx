import { useNavigation, useRoute } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { treatment } from 'libs/types/ProvierTypes';
import { ClientProfile, OrderDetail } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react-native';

const OrderDetailsController = () => {
  const { t } = useTranslation();
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { treatmentMenu, orderProvider } = ClientOrderServices();
  const userData = getLocalData('USER');
  const userProfile = getLocalData?.('USERPROFILE');
  const navigation = useNavigation();
  const {
    currentLocationOfUser,
    orderDetails,
    userProfile: user,
    userId,
  } = UseClientUserContext();
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>();

  const route = useRoute<any>();
  const supplier = route?.params?.supplier ?? '';
  console.log('supplier', supplier);
  const [order, setOrder] = useState<OrderDetail>({
    client_id: '',
    patient_type: { type: 'me', age: '' },
    patient_name: (userProfile as ClientProfile)?.firstName ?? '',
    address: (userProfile as ClientProfile)?.address ?? '',
    city: (userProfile as ClientProfile)?.city ?? '',
    phonenumber: (userProfile as ClientProfile)?.phoneNumber ?? '',
    Date_of_birth: '',
    services: [],
    symptoms: '',
    Additional_notes: '',
    Estimate_arrival: '60',
    Instructions_for_arrival: '',
    Payment_mode: '',
    TotalCost: '',
    menu_id: '',
    reason: [],
    isOrderForOther: false,
  });

  const treatmentReasons = async () => {
    try {
      const res = await treatmentMenu({ provider_type_id: '1' });
      setTreatmentReason(res);
    } catch (error) {
      console.error(error);
    }
  };

  console.log('currentLocationOfUser', currentLocationOfUser);
  useEffect(() => {
    treatmentReasons();
  }, []);

  const symptoms = order.reason.map((item: any) => {
    return {
      name: item.name.en, // Assuming you want the English name
      id: item.reason_id,
    };
  });
  const DAAT = {
    client_id: userId,
    patient_type: order.patient_type.type ?? '',
    patient_name: order.patient_name,
    address: order?.address ?? '',
    city: order.city,
    phone_number: order?.phonenumber,
    Date_of_birth: !order?.isOrderForOther
      ? user?.date_of_birth ?? ''
      : order?.patient_type?.age ?? '',
    services: order.services,
    symptoms: JSON.stringify(symptoms),
    Additional_notes: order.Additional_notes,
    Estimate_arrival: order.Estimate_arrival,
    Instructions_for_arrival: order?.Instructions_for_arrival,
    Payment_mode: order.Payment_mode,
    TotalCost: order?.services.reduce(
      (total, item) => total + parseInt(item.price, 10),
      0,
    ),
    latitude: currentLocationOfUser?.latitude,
    longitude: currentLocationOfUser?.longitude,
    provider_type_id: supplier?.provider_type_id,
  };
  Sentry.captureMessage(
    `Client Flow  ORDER ALL DETAILS FOR:-${user?.firstName}---- ${DAAT}`,
  );
  console.log('DAATAAA ', DAAT);
  // console.log('order.  transformedItems', symptoms)
  const handleNextButtonPress = async () => {
    if (
      order.isOrderForOther &&
      (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
      order?.services?.length > 0 &&
      order?.patient_type?.age?.length > 0 &&
      order?.address?.length
    ) {
      setShowSummary(true);
    }
    if (
      order.isOrderForOther === false &&
      (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
      order?.services?.length > 0 &&
      order?.address?.length
    ) {
      setShowSummary(true);
    }
    console.log('currentLocationOfUser.latitude,', currentLocationOfUser);
    if (showSummary) {
      setIsLoading(true);
      const res = await orderProvider({
        client_id: userId.toString(),
        patient_type: order.patient_type.type ?? '',
        patient_name: order.patient_name,
        address: order?.address ?? '',
        city: order.city,
        phonenumber: order?.phonenumber,
        Date_of_birth: !order?.isOrderForOther
          ? user?.date_of_birth ?? ''
          : order?.patient_type?.age ?? '',
        services: order.services[0].menu_id.toString(),
        symptoms: JSON.stringify(symptoms),
        Additional_notes: order?.Additional_notes,
        Estimate_arrival: order?.Estimate_arrival,
        Instructions_for_arrival: order?.Instructions_for_arrival,
        Payment_mode: order?.Payment_mode,
        TotalCost: order?.services
          .reduce((total, item) => total + parseInt(item.price, 10), 0)
          .toString(),
        latitude: currentLocationOfUser?.latitude,
        longitude: currentLocationOfUser?.longitude,
        provider_type_id: supplier?.provider_type_id?.toString(),
      });

      Sentry.captureMessage(
        `Client flow ON PRESS ORDER BUTTON ON SUMMARY SCREEN RESPONSE for:-${
          user?.firstName ?? ''
        }---- ${res}`,
      );
      console.log(' RESPINSE+++++', res);

      if (res?.orderId) {
        setIsLoading(false);

        // navigation.reset({
        //   index: 0,
        //   routes: [{
        //     name: NavigationRoutes.SearchDoctor, params: {
        //       providerData: res?.closestProvider,
        //       orderId: res?.orderId,
        //     },
        //   }],
        // });
        navigation.navigate(NavigationRoutes.SearchDoctor, {
          providerData: res?.closestProvider,
          orderId: res?.orderId,
        });
      } else {
        Sentry.captureMessage(
          `Client flow ON PRESS END ORDER API ERROR for:-${
            user?.firstName ?? ''
          }---- ${res?.message}`,
        );
        Alert.alert(res?.message);
        setIsLoading(false);
      }
    } else {
      if (orderDetails.services.length && orderDetails.reason.length)
        setShowSummary(true);
      else {
        Alert.alert('please select reasons and treatment menu');
      }
    }
  };
  return {
    handleNextButtonPress,
    showSummary,
    setShowSummary,
    treatmentReason,
    navigation,
    supplier,
    order,
    setOrder,
    isLoading,
  };
};

export default OrderDetailsController;
