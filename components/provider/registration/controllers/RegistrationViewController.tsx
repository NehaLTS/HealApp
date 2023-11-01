import { useNavigation } from '@react-navigation/native'
import { useApiContext } from "contexts/useApiContext"
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { Alert } from 'react-native'
import { useState } from "react";
import useToast from 'components/common/useToast'
import { setLocalData } from 'libs/datastorage/useLocalStorage'
import { ProviderUserContext, UseProviderUserContext } from 'contexts/UseProviderUserContext'

const RegistrationViewController = () => {
  const { onAuthSignInProvider } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation()
  const { OnProviderCreateSignUp } = AuthServicesProvider()
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const { showToast, renderToast } = useToast();
const  {setToken,setUserId} =UseProviderUserContext()
  const onPressSignUpProvider = async (email: string, password: string) => {
    setIsLoading(true)
    if (email !== undefined && password != undefined) {
      const response = await OnProviderCreateSignUp({ email, password })  //api
      console.log("res is ", response);

      if (response && response.token && response.provider_id) {
        setToken(response.token);
        setUserId(response.provider_id);
      }

      setLocalData("USER", {
        token: response?.token,
        userId: response?.provider_id,
        isClient: false,
      });
      setLocalData("USERPROVIDERPROFILE", {
        email: email,
      });

      setUserDataProvider({ ...userDataProvider, isSuccessful: response?.isSuccessful, provider_id: response.provider_id ?? '', token: response?.token ?? '' })
      if (response.isSuccessful)
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationRoutes.ProviderRegistration }],
        })
      else {
        showToast("User already exist","Please try SignIn", "error")
      }
    }
    else {
      showToast("","Please enter email or password", "warning")
    }
    setIsLoading(false)
  }
  return { onPressSignUpProvider, isLoading,renderToast }
}
export default RegistrationViewController