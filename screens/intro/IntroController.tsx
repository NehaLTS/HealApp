import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import { storeData } from "../../src/DataStorage/DataStorage";

const IntroController = () => {
  const navigation = useNavigation();
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const { setLanguageCode } = useTranslationContext();
  const continueAsClient = () => navigation.navigate("Login");
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const handleLanguageChange = (lng: string) => {
    setLanguageCode(lng);
    storeData('lng', lng)
    setIsChangeLanguage(!isChangeLanguage);
  };

  return {
    isChangeLanguage,
    onChangeLanguage,
    continueAsClient,
    handleLanguageChange
  };
};

export default IntroController;
