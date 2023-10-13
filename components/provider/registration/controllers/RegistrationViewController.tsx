import { useNavigation } from '@react-navigation/native'
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { Alert } from 'react-native'
const RegistrationViewController = () => {
  const navigation = useNavigation()
  const { OnProviderCreateSignUp } = AuthServicesProvider()
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const onPressSignUpProvider = async (email: string, password: string) => {
    const response = await OnProviderCreateSignUp({ email, password })
    console.log('kjkghkhgk***+*************',response)
    setUserDataProvider({ ...userDataProvider, isSuccessful: response?.isSuccessful, provider_id: response.provider_id ?? '', token: response?.token ?? '' })
    console.log('response', response)
    if (response.isSuccessful)
      navigation.navigate(
        NavigationRoutes.ProviderRegistration
      )
    else {
      Alert.alert('Email and Password is not correct')
    }
  }
  return { onPressSignUpProvider }
}
export default RegistrationViewController