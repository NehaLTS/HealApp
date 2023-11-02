import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useState } from 'react';

const ProviderAuthenticatorViewController = () => {
  const navigation = useNavigation();
  const [isSigninSelected, setIsSigninSelected] = useState(true);

  const loginRegisterToggle = (val: number) => setIsSigninSelected(val === 1);

  const OnSwitchToClient = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ClientStack }],
    });
  };
  return {
    loginRegisterToggle,
    isSigninSelected,
    OnSwitchToClient,
  };
};

export default ProviderAuthenticatorViewController;
