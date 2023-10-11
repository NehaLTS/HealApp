import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { useState } from "react";
import { Alert } from "react-native";

const RegistrationViewController = () => {
  const { onCreateSignUp } = AuthServicesClient();
  const { userData, setUserData } = UseUserContext()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onPressSignUp = async (email: string, password: string) => {
    if (email != '') {
      setIsLoading(true)
      const res = await onCreateSignUp({ email, password });
      setUserData({ ...userData, token: res?.token, client_id: res?.client_id });
      setLocalData('USER', res)
      setIsLoading(false)
      if (res?.isSuccessful) {
        navigation.navigate('BasicInfo')
      }
      else
        Alert.alert('User Already Exist.', "Please try SignIn")
    }
    else {
      setIsLoading(false)
      Alert.alert("please enter email or password");
    }
  }

  return { onPressSignUp, isLoading };
};

export default RegistrationViewController;
