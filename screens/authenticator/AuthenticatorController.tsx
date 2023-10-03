import { useState } from "react";

const AuthenticatorController = () => {
  const [isSignInButton, setIsSignInButton] = useState(false);
  const loginRegisterToggle = () => setIsSignInButton(!isSignInButton);
  return {
    loginRegisterToggle,
    isSignInButton,
  };
};

export default AuthenticatorController;
