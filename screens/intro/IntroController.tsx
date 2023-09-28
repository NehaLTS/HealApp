import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";

const IntroController = () => {
  const navigation = useNavigation();
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const { setLanguageCode } = useTranslationContext();
  const continueAsClient = () => navigation.navigate("SignIn");
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const handleLanguageChange = (lng: string) => {
    setLanguageCode(lng);
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
