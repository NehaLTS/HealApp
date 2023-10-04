import { useState } from "react";

const AuthenticatorController = () => {
  const [isSigninSelected, setIsSigninSelected] = useState(false);
  const loginRegisterToggle = () => setIsSigninSelected(!isSigninSelected);
  return {
    loginRegisterToggle,
    isSigninSelected,
  };
};

export default AuthenticatorController;
