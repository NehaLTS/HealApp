<<<<<<< HEAD
import { useState } from "react";

const ProviderAuthenticatorViewController = () => {
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  const loginRegisterToggle = () => setIsSigninSelected(!isSigninSelected);
  return {
    loginRegisterToggle,
    isSigninSelected,
=======
import { useNavigation } from "@react-navigation/native";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";

const ProviderAuthenticatorViewController = () => {
  const navigation = useNavigation();
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  
  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1)

  const OnSwitchToClient = () => {
    navigation.reset({
      index: 0,
      routes: [{name: NavigationRoutes.ClientStack}],
    })
  }
  return {
    loginRegisterToggle,
    isSigninSelected,
    OnSwitchToClient
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
  };
};

export default ProviderAuthenticatorViewController;
