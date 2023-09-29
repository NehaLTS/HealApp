import { useState } from "react";
import { useTranslationContext } from "../../../contexts/UseTranslationsContext";

const LoginController = () => {
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const { setLanguageCode } = useTranslationContext();
  const handleLanguageChange = (lng: string) => {
    setLanguageCode(lng);
    setIsChangeLanguage(!isChangeLanguage);
  };
  return {
    isChangeLanguage,
    onChangeLanguage,
    handleLanguageChange,
  };
};

export default LoginController;
