import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import { getLocalData, setLocalData } from "../../libs/datastorage/useLocalStorage";
import { UserType } from "../../libs/types/UserType";
import NavigationRoutes from "../../navigator/NavigationRoutes";

const IntroController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const { setLanguageCode } = useTranslationContext();
  const continueAsClient = () =>
    navigation.navigate(NavigationRoutes.ClientStack, {
      screen: NavigationRoutes.ClientLogin,
      params: { isClient: true },
    });

  const continueAsProvider = () =>
    navigation.navigate(NavigationRoutes.ProviderStack);

  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);

  const handleLanguageChange = (lng: string) => {
    setLanguageCode(lng);
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

export default IntroController;
