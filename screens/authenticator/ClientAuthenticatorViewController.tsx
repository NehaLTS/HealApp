import { useNavigation } from "@react-navigation/native";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";

const ClientAuthenticatorView = () => {
  const navigation = useNavigation();
  const [isSigninSelected, setIsSigninSelected] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1)

  const OnSwitchToProvider = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderStack }],
    })
  }
  const onPressGuestEntrance = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ClientHome }],
      })
      setIsLoading(false)
    }, 2000)
  }
  return {
    loginRegisterToggle,
    isSigninSelected,
    OnSwitchToProvider,
    onPressGuestEntrance,
    isLoading
  };
};

export default ClientAuthenticatorView;
