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
import { checkLocationPermission } from 'libs/utility/Utils';

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
    treatmentsMenu,
    setTreatmentsMenu,
  } = UseClientUserContext();
  const [treatmentReason, setTreatmentReason] = useState<treatment>();

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
    provider_type_id: 0,
  });

  const treatmentReasons = async () => {
    try {
      const res = await treatmentMenu({
        provider_type_id: supplier?.provider_type_id?.toString(),
      });
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

  // console.log('order.  transformedItems', symptoms)
  const handleNextButtonPress = async () => {
    let isLocationPermissionOn = await checkLocationPermission();
    if (isLocationPermissionOn) {
      if (
        order?.isOrderForOther &&
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
        };
        Sentry.captureMessage(
          `Client Flow  ORDER ALL DETAILS FOR:-${user?.firstName}---- ${orderDetails}`,
        );
        console.log('DAATAAA ', orderDetails);
        navigation.navigate(NavigationRoutes.SearchDoctor, {
          orderDetails: orderDetails,
          previousScreen: 'Create Order',
        });
      } else {
        if (orderDetails.services.length && orderDetails.reason.length)
          setShowSummary(true);
        else {
          Alert.alert('please select reasons and treatment menu');
        }
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
  };
};

export default OrderDetailsController;
