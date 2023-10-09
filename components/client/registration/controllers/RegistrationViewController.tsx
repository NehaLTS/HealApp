import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { Alert } from "react-native";

const RegistrationViewController = () => {
  const { onCreateSignUp } = AuthServicesClient();
  const { userData, setUserData } = UseUserContext()
  const navigation = useNavigation()
  const onPressSignUp = async (email: string, password: string) => {
    const res = await onCreateSignUp({ email, password });
    setUserData({ ...userData, token: res?.token, client_id: res?.client_id });
    setLocalData('USER', res)
    if (res?.isSuccessful) {
      navigation.navigate('BasicInfo')

    }
    else
      Alert.alert('User Already Exist.', "Please try SignIn")
  }
  return { onPressSignUp };
};

export default RegistrationViewController;
