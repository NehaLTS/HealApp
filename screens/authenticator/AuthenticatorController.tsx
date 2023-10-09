import { useNavigation } from "@react-navigation/native";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";

const AuthenticatorController = () => {
  const navigation = useNavigation();
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  
  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1)

  const OnSwitchToProvider = () => {
    navigation.reset({
      index: 0,
      routes: [{name: NavigationRoutes.ProviderStack}],
    })
  }

  return {
    loginRegisterToggle,
    isSigninSelected,
    OnSwitchToProvider
  };
};

export default AuthenticatorController;
