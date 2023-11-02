import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getLocalData,
  setLocalData,
} from '../../libs/datastorage/useLocalStorage';
import { UserType } from '../../libs/types/UserType';
import NavigationRoutes from '../../navigator/NavigationRoutes';

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
  useEffect(() => {
    const data = getLocalData?.('USER');
    const userLanguage = data?.user?.language ?? 'en';
    setCurrentLanguage(userLanguage);
  }, [getLocalData?.('USER')]);

  const continueAsProvider = () =>
    navigation.navigate(NavigationRoutes.ProviderStack);

  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
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
  };
};

export default LocalizationController;
