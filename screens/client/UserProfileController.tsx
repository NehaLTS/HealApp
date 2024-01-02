import { Alert, I18nManager, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  deleteLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import { ClientProfile, PaymentHistoryType, ProviderProfile } from 'libs/types/UserType';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

export default function UserProfileController() {
  const { userProfile, setUserProfile, userId } = UseClientUserContext();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const languageRef = React.useRef<any>(i18n.language);
  const [paymentHistoryData, setPaymentHistoryData] = useState<
    PaymentHistoryType[]
  >([]);
  const { PaymentHistory } = ClientOrderServices();
  useEffect(() => {
    PaymentHistory({ client_id: userId })
      .then((res: PaymentHistoryType[]) => {
        setPaymentHistoryData(res);
        console.log('paymentHaitory', res);
      })
      .catch((error) => {
        Alert.alert('Error occured: ', error.tosString());
      });
  }, []);

  const onLogoutButtonPress = () => {
    deleteLocalData();
    setUserProfile({} as ProviderProfile);
    setLocalData('USER', {
      user: {
        language: languageRef.current,
      },
    });
    navigation.navigate(NavigationRoutes.IntroStack);


    if (
      I18nManager.isRTL &&
      (languageRef.current == 'en' || languageRef.current == 'ru')
    ) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      RNRestart.restart();
    } else if (
      !I18nManager.isRTL &&
      (languageRef.current == 'he' || languageRef.current == 'ar')
    ) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
    // RNRestart.restart();
  };
  return {
    onLogoutButtonPress,
    userProfile,
    paymentHistoryData,
  };
}
