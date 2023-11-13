import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getLocalData,
  setLocalData,
} from '../../libs/datastorage/useLocalStorage';
import { UserType } from '../../libs/types/UserType';
import NavigationRoutes from '../../navigator/NavigationRoutes';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const LocalizationController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const { t, i18n } = useTranslation();
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
    setCurrentLanguage(lng);
    if (lng == ('en' || 'ru') && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    } else if (lng == ('he' || 'ar') && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);

    if (lng == ('en' || 'ru') && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      RNRestart.restart();
    } else if (lng == ('he' || 'ar') && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.restart();
    }

    setCurrentLanguage(lng);
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
    currentLanguage,
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
