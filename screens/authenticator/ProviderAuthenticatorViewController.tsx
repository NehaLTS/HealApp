import { useState } from "react";

const ProviderAuthenticatorViewController = () => {
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  const loginRegisterToggle = () => setIsSigninSelected(!isSigninSelected);
  return {
    loginRegisterToggle,
    isSigninSelected,
  };
};

export default ProviderAuthenticatorViewController;
