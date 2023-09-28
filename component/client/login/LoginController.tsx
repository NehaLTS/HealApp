import { useState } from "react";

const LoginController = () => {
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  return {
    isChangeLanguage,
    onChangeLanguage,
  };
};

export default LoginController;
