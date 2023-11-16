import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import {
  getLocalData,
  setLocalData,
} from '../../libs/datastorage/useLocalStorage';
import { UserType } from '../../libs/types/UserType';
import NavigationRoutes from '../../navigator/NavigationRoutes';
import SplashScreen from 'react-native-splash-screen';

const LocalizationController = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);

  const continueAsClient = () => {
    navigation.navigate(NavigationRoutes.ClientStack, {
      screen: NavigationRoutes.ClientLogin,
      params: { isClient: true },
    });
  };

  const continueAsProvider = () =>
    navigation.navigate(NavigationRoutes.ProviderStack);

  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);

  const setAppLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (lng == ('en' || 'ru') && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    } else if (lng == ('he' || 'ar') && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    if (lng == 'en' || lng === 'ru') {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      SplashScreen.show();
      RNRestart.restart();
    } else if (lng == 'he' || lng == 'ar') {
      SplashScreen.show();
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      RNRestart.restart();
    }

    // if(lng=="he" || lng=='ar'){
    //  I18nManager.forceRTL(true);
    //  RNRestart.restart();
    // }
    setLocalData('USER', {
      ...getLocalData('USER')?.user,
      user: {
        language: lng,
      },
    }) as unknown as UserType;
  };

  return {
    currentLanguage: i18n?.language,
    isLanguageChanged,
    onChangeLanguage,
    continueAsClient,
    handleLanguageChange,
    continueAsProvider,
    setIsLanguageChanged,
    setAppLanguage,
  };
};

export default LocalizationController;
