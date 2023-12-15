import { useNavigation, useRoute } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { treatment } from 'libs/types/ProvierTypes';
import { ClientProfile, OrderDetail, userLocation } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react-native';
import { checkLocationPermission } from 'libs/utility/Utils';

const OrderDetailsController = () => {
  const { t } = useTranslation();
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { treatmentMenu, orderProvider } = ClientOrderServices();
  const userData = getLocalData('USER');
  const userProfile = getLocalData?.('USERPROFILE');
  const navigation = useNavigation<any>();
  const {
    userLocation,
    orderDetails,
    userProfile: user,
    userId,
    treatmentsMenu,
    setTreatmentsMenu,
  } = UseClientUserContext();
  const [treatmentReason, setTreatmentReason] = useState<treatment>({
    treatmentMenu: [],
    reason: [],
  });
  console.log('userProfile0', userProfile);
  const route = useRoute<any>();
  const supplier = route?.params?.supplier ?? '';
  const heardDetail = route?.params?.selectedHealerServices ?? '';
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
    provider_type_id: 0,
  });

  const treatmentReasons = async () => {
    const PROVIDER_TYPE_ID =
      supplier.name === 'Alternative medicine'
        ? '1'
        : supplier?.provider_type_id.toString();

    try {
      const res = await treatmentMenu({
        provider_type_id: PROVIDER_TYPE_ID,
      });
      console.log('TreatmentRespons', res);
      setTreatmentReason(res);
      setTreatmentsMenu(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      treatmentsMenu !== null &&
      treatmentsMenu?.treatmentMenu !== undefined
    ) {
      console.log('treatmentsMenu', treatmentsMenu);
      const checkExisting = treatmentsMenu?.treatmentMenu?.some((item) => {
        return item.provider_type_id;
      });
      if (checkExisting) {
        setTreatmentReason(treatmentsMenu);
      } else {
        treatmentReasons();
      }
      // if(treatmentsMenu.)
    } else {
      treatmentReasons();
    }
  }, []);

  const symptoms = order.reason.map((item: any) => {
    return {
      name: item?.name.en, // Assuming you want the English name
      id: item?.reason_id,
    };
  });

  const concatenatedIds = order.services.map((item) => item.menu_id).join(',');
  const TotalCost = order?.services
    .reduce((total, item) => total + parseInt(item.price, 10), 0)
    .toString();
  // console.log('order.  transformedItems', symptoms)
  const handleNextButtonPress = async () => {
    console.log('order111', order);
    let isLocationPermissionOn = await checkLocationPermission();
    if (isLocationPermissionOn) {
      if (
        (order.isOrderForOther === false &&
          (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
          order?.services?.length > 0 &&
          order?.address?.length &&
          supplier.name !== 'Alternative medicine') ||
        (supplier.name === 'Alternative medicine' &&
          order?.reason?.length > 0) ||
        order?.Additional_notes?.length
      ) {
        setShowSummary(true);
      } else if (
        (order?.isOrderForOther &&
          order?.patient_type?.age !== '' &&
          (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
          order?.services?.length > 0 &&
          order?.address?.length &&
          supplier.name !== 'Alternative medicine') ||
        (supplier.name === 'Alternative medicine' &&
          order?.reason?.length > 0) ||
        order?.Additional_notes?.length
      ) {
        setShowSummary(true);
      } else if (
        (order.isOrderForOther === false &&
          supplier.name !== 'Alternative medicine' &&
          orderDetails?.services?.length &&
          orderDetails?.reason?.length) ||
        (supplier.name === 'Alternative medicine' &&
          orderDetails?.reason?.length)
      ) {
        setShowSummary(true);
      } else {
        if (
          !order?.address?.length ||
          !order?.reason?.length ||
          !order?.services?.length
        ) {
          Alert.alert(
            `please select${!order?.address?.length ? ' address,' : ''} ${!order.reason?.length ? 'reasons' : ''
            } ${!order?.services?.length ? 'treatment menu' : ''}`,
          );
        }
      }
      console.log('userLocation.latitude,', userLocation, "user", user);
      console.log("(userProfile as ClientProfile)?.address?.address", (userProfile as ClientProfile), order, (userProfile as ClientProfile)?.address?.address)

      if (showSummary) {
        let orderDetails = {
          client_id: userId.toString(),
          patient_type: order.patient_type.type ?? '',
          patient_name: order.patient_name,
          address: order?.address ?? '',
          city: order.city,
          phonenumber: order?.phonenumber,
          Date_of_birth: !order?.isOrderForOther
            ? user?.date_of_birth ?? ''
            : order?.patient_type?.age ?? '',
          // services: order.services[0].menu_id.toString(),

          services: concatenatedIds.toString(),
          symptoms: JSON.stringify(symptoms),
          Additional_notes: order?.Additional_notes,
          Estimate_arrival: order?.Estimate_arrival,
          Instructions_for_arrival: order?.Instructions_for_arrival,
          Payment_mode: order?.Payment_mode,
          TotalCost: order?.services
            .reduce((total, item) => total + parseInt(item.price, 10), 0)
            .toString(),
          latitude: userLocation.onboardingLocation?.latitude ?? userLocation.currentLocation?.latitude,
          longitude: userLocation.onboardingLocation?.longitude ?? userLocation.currentLocation?.longitude,
          provider_type_id: supplier?.provider_type_id?.toString(),
        };
        console.log("(userProfile userLocation", userLocation)
        Sentry.captureMessage(
          `Client Flow  ORDER ALL DETAILS FOR:-${user?.firstName}---- ${orderDetails}`,
        );
        console.log('DAATAAA ', orderDetails);
        navigation.navigate(NavigationRoutes.SearchDoctor, {
          orderDetails: orderDetails,
          previousScreen: 'Create Order',
          heardDetail: heardDetail,
        });
      }
      if (order?.isOrderForOther && order?.patient_type?.age === '') {
        Alert.alert('Please submit Age and phone number.');
      }
    } else {
      Alert.alert('Please Enable Location Permission');
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
    heardDetail,
  };
};

export default OrderDetailsController;
