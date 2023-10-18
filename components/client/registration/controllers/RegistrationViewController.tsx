import { useNavigation } from "@react-navigation/native";
import useToast from "components/common/useToast";
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
  const { showToast, renderToast } = useToast();

  const onPressSignUp = async (email: string, password: string) => {
    if (email !== undefined && password !== undefined) {
      setIsLoading(true)
      const res = await onCreateSignUp({ email, password });
      setUserData({ ...userData, token: res?.token, client_id: res?.client_id });
      setLocalData('USER', res)
      setIsLoading(false)
      if (res?.isSuccessful) {
        navigation.navigate('BasicInfo')
      }
      else{
        showToast("User already exist","Please try SignIn", "error")
      }
    }
    else {
      setIsLoading(false)
      showToast("","Please enter email or password", "warning")
    }
  }

  return { onPressSignUp, isLoading,renderToast };
};

export default RegistrationViewController;
