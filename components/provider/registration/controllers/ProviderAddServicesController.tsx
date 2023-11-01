import React, { useEffect, useState } from 'react'
import { UseUserContextProvider, UserTypeProvider } from 'contexts/useUserContextProvider'
import { useNavigation } from '@react-navigation/native'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import { Service } from 'libs/types/ProvierTypes'
import { Alert } from 'react-native'
import NavigationRoutes from 'navigator/NavigationRoutes'
import { setLocalData } from 'libs/datastorage/useLocalStorage'

const ProviderAddServicesController = () => {
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const serviceNameRef = React.useRef<any>('')
  const priceRef = React.useRef<any>('')
  const descriptionRef = React.useRef<any>('')
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false)
  const { onCreateProviderServices, onGetUserAllServices } = AuthServicesProvider()
  const [isLoading, setIsLoading] = useState(false)
  const [isServiceLoading, setIsServiceLoading] = useState(false)
  const [services, setServices] = useState([])
  const [service, setService] = useState<Service>()
  ////////TEMP ADDED HERE NEED TO MOVE TO CONTROLLERS
  const [serviceError, setServiceError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const toggleModal = () => setModalVisible(!isModalVisible)
  const onBlurServiceName = () => validateServiceName()
  const onChangeServiceName = (value: string) => (serviceNameRef.current.value = value)
  const onBlurPriceName = () => {
    validatePrice()
  }
  const onChangePriceName = (value: string) => (priceRef.current.value = value)
  const onBlurDescription = () => {
    validateDescription()
  }
  const onChangeDescription = (value: string) => (descriptionRef.current.value = value)

  const validateServiceName = () => {
    if (!serviceNameRef.current.value) {
      setServiceError('Service name is required')
    } else {
      setServiceError('')
    }
  }
  const validatePrice = () => {
    if (!priceRef.current.value) {
      setPriceError('Price is required')
    } else {
      setPriceError('')
    }
  }
  const validateDescription = () => {
    if (!descriptionRef.current.value) {
      setDescriptionError('Description is required')
    } else {
      setDescriptionError('')
    }
  }

  const getUserAllServices = async () => {
    setIsServiceLoading(true)
    let response = await onGetUserAllServices({ provider_id: '1' ?? '1' })

    console.log('resp is ', response)
    if (response) {
      setServices(response)
      setUserDataProvider({ ...userDataProvider, providerServices: true })
    }

    setIsServiceLoading(false)
  }

  useEffect(() => {
    getUserAllServices()
  }, [])

  const saveService = async () => {
    if (serviceNameRef.current.value && descriptionRef.current.value && priceRef.current.value) {
      let data = {
        name: { en: serviceNameRef.current.value, hi: '', he: '' },
        description: { en: descriptionRef.current.value, hi: '', he: '' },
        price: priceRef.current.value
      }

      setService({ ...(service as Service), ...data })

      // if(userDataProvider.provider_id && userDataProvider.speciality_id){
      setIsLoading(true)
      //  let response= await onCreateProviderServices({name:serviceNameRef.current.value,description:descriptionRef.current.value,price:priceRef.current.value,currency:"USD",provider_id:userDataProvider.provider_id, specialty_id: userDataProvider.speciality_id});

      let response = await onCreateProviderServices({
        name: serviceNameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        provider_id: '1',
        specialty_id: '1'
      })
      setLocalData('USERPROVIDERPROFILE',{
        name: serviceNameRef.current.value,
        description:descriptionRef.current.value,
        price:priceRef.current.value,
      } )
      //Need to check for success and then append
      getUserAllServices()
      setIsLoading(false)
      toggleModal()
      // }
    } else {
      Alert.alert('Please fill all the details')
    }
  }

  const onApprove = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderConfirmation }]
    })
  }

  return {
    userDataProvider,
    serviceNameRef,
    priceRef,
    descriptionRef,
    isLoading,
    isServiceLoading,
    services,
    service,
    onBlurServiceName,
    onChangeServiceName,
    onBlurPriceName,
    onChangePriceName,
    onBlurDescription,
    onChangeDescription,
    saveService,
    isModalVisible,
    toggleModal,
    serviceError,
    priceError,
    descriptionError,
    onApprove
  }
}

export default ProviderAddServicesController
