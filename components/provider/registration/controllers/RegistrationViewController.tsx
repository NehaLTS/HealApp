import { useNavigation } from '@react-navigation/native'
import { useApiContext } from "contexts/useApiContext"
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { Alert } from 'react-native'
import { useState } from "react";
import useToast from 'components/common/useToast'

const RegistrationViewController = () => {
  const { onAuthSignInProvider } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation()
  const { OnProviderCreateSignUp } = AuthServicesProvider()
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const { showToast, renderToast } = useToast();

  const onPressSignUpProvider = async (email: string, password: string) => {
    setIsLoading(true)
    if (email !== undefined && password != undefined) {
      const response = await OnProviderCreateSignUp({ email, password })

      setUserDataProvider({ ...userDataProvider, isSuccessful: response?.isSuccessful, provider_id: response.provider_id ?? '', token: response?.token ?? '' })
      if (response.isSuccessful)
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationRoutes.ProviderRegistration }],
        })
      else {
        showToast("User already exist", "Please try SignIn", "error")
      }
    }
    else {
      showToast("", "Please enter email or password", "warning")
    }
    setIsLoading(false)
  }
  return { onPressSignUpProvider, isLoading, renderToast }
}
export default RegistrationViewController