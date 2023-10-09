import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { getLocalData, setLocalData } from "../../libs/datastorage/useLocalStorage";
import { UserType } from "../../libs/types/UserType";
import NavigationRoutes from "../../navigator/NavigationRoutes";
import { useTranslation } from "react-i18next";

const LocalizationController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const { t, i18n } = useTranslation();
  const continueAsClient = () =>
    navigation.navigate(NavigationRoutes.ClientStack, {
      screen: NavigationRoutes.ClientLogin,
      params: { isClient: true },
    });

  const continueAsProvider = () =>
    navigation.navigate(NavigationRoutes.ProviderStack);

  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged)

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)
    // setLocalData('USER', {  })
    // setLocalData('USER', {  })
    setLocalData('USER', {
      ...getLocalData('USER')?.user,
      user: {
        language: lng
      }
    }) as unknown as UserType
  };

  return {
    isLanguageChanged,
    onChangeLanguage,
    continueAsClient,
    handleLanguageChange,
    continueAsProvider,
  };
};

export default LocalizationController;
