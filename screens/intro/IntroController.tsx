import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const IntroController = () => {
  const navigation = useNavigation();
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const continueAsClient = () => navigation.navigate("SignIn");
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  return {
    isChangeLanguage,
    onChangeLanguage,
    continueAsClient,
  };
};

export default IntroController;
