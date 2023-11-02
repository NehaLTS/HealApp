import { useNavigation } from '@react-navigation/native'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { useEffect, useState } from 'react'

const ProviderServicesController = () => {
  const { onGetProviderService } = AuthServicesProvider()
  const navigation = useNavigation()
  const { providerProfile, setCurrentStep } = UseProviderUserContext()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPrescriptionSelected, setIsPrescriptionSelected] = useState(false)

  const getProviderServices = async () => {
    setIsLoading(true)
    let response = await onGetProviderService({
      provider_id: '2' ?? providerProfile?.provider?.id,
      specialty_id: '1' ?? providerProfile?.speciality?.id
    })
    if (response && response.services) {
      setServices(response.services)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getProviderServices()
  }, [])
  const onCheckedPress = (index: number) => {
    //TODO: Can Refactor this
    let data = [...services]
    if (data[index] && data[index]?.isChecked) {
      data[index].isChecked = false
    } else {
      data[index].isChecked = true
    }
    setServices(data)
  }

  const onPrescriptionSelected = (isSelected: boolean) => {
    setIsPrescriptionSelected(isSelected)
  }

  const onPressBack = () => setCurrentStep('payment')

  const onPressNext = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderConfirmation }]
    })
  }
  return {
    onPressBack,
    onPressNext,
    services,
    isLoading,
    isPrescriptionSelected,
    onCheckedPress,
    onPrescriptionSelected
  }
}

export default ProviderServicesController
