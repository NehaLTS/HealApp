import { useNavigation } from '@react-navigation/native'
import { useApiContext } from "contexts/useApiContext"
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { Alert } from 'react-native'
import { useState } from "react";

const RegistrationViewController = () => {
  const { onAuthSignInProvider } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigation = useNavigation()
  const { OnProviderCreateSignUp } = AuthServicesProvider()
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const onPressSignUpProvider = async (email: string, password: string) => {
    setIsLoading(true)
    const response = await OnProviderCreateSignUp({ email, password })
    
    setUserDataProvider({ ...userDataProvider, isSuccessful: response?.isSuccessful, provider_id: response.provider_id ?? '', token: response?.token ?? '' })
    console.log('response', response)
   
    if (response.isSuccessful)
      navigation.navigate(
        NavigationRoutes.ProviderRegistration
      )
    else {
      Alert.alert('Email and Password is not correct')
    }
    setIsLoading(false)
  }
  return { onPressSignUpProvider,isLoading }
}
export default RegistrationViewController