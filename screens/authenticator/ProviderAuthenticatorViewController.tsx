import { useNavigation } from "@react-navigation/native";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";

const ProviderAuthenticatorViewController = () => {
  const navigation = useNavigation();
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1)

  const OnSwitchToClient = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ClientStack }],
    })
  }
  const onPressGuestEntrance = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{
          name: NavigationRoutes.ProviderHome
        }],
      })
      setIsLoading(false)
    }, 2000)
  }
  return {
    loginRegisterToggle,
    isSigninSelected,
    OnSwitchToClient,
    isLoading,
    onPressGuestEntrance
  };
};

export default ProviderAuthenticatorViewController;
