import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { Alert } from "react-native";

const RegistrationViewController = () => {
  const { onAuthSignUp } = useApiContext()
  const navigation = useNavigation()
  const onPressSignUp = async (email: string, password: string) => {
    const res = await onAuthSignUp?.(email, password);
    if (res?.isSuccessful)
      navigation.navigate('BasicInfo')
    else
      Alert.alert('User Already Exist.', "Please try SignIn")
  }
  return { onPressSignUp };
};

export default RegistrationViewController;
