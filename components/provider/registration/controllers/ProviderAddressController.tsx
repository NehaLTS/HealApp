import useToast from 'components/common/useToast'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import React, { useState } from 'react'

const ProviderAddressController = () => {
  const [phoneError, setPhoneError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [onSearchAddress, setOnSearchAddress] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const phoneRef = React.useRef<any>('')
  const licenseRef = React.useRef<any>('')
  const { showToast, renderToast } = useToast()
  const { providerProfile, setProviderProfile, setCurrentStep } = UseProviderUserContext()

  const onBlurPhoneNumber = () => {
    validatePhoneNumber()
    setProviderProfile({
      ...providerProfile,
      phoneNumber: phoneRef.current.value
    })
  }
  const onChangePhoneNumber = (value: string) => (phoneRef.current.value = value)

  const onBlurLastName = () =>
    setProviderProfile({
      ...providerProfile,
      licensenumber: licenseRef.current.value
    })
  const onChangeLastName = (value: string) => (licenseRef.current.value = value)

  const onBlurAddress = () => {
    validateAddress()
    setProviderProfile({
      ...providerProfile,
      address: onSearchAddress
    })
    setIsVisible(false)
  }

  const getImageUrl = (url: string) => setProviderProfile({ ...providerProfile, licensepicture: url })

  const validatePhoneNumber = () => {
    if (!phoneRef.current.value) {
      setPhoneError('Phone number is required')
    } else {
      setPhoneError('')
    }
  }

  const validateAddress = () => {
    if (onSearchAddress?.length === 0) {
      setAddressError('Address is required')
    } else if (onSearchAddress?.length < 4) {
      setAddressError('Please fill full address')
    } else {
      setAddressError('')
    }
  }

  const onUploadLicense = () =>  setIsShowModal(true)
  const onCloseModal = () => {setIsVisible(false),setIsShowModal(false)}

  const onPressBack = () => {
    setCurrentStep('details')
  }

  const onPressNext = () => {
    setCurrentStep('payment')
    // if (providerProfile.address && providerProfile.address.length >= 4 && providerProfile.phoneNumber && providerProfile.licensepicture) {
    //   setCurrentStep('payment')
    // } else {
    //   if (!providerProfile?.phoneNumber?.length) setPhoneError('Phone number is required')
    //   if (!providerProfile?.address?.length) setAddressError('Address is required')
    //   if (providerProfile?.licensenumber?.length && !providerProfile?.licensepicture?.length) {
    //     showToast('', 'Please upload license', 'warning')
    //   }
    // }
  }

  return {
    phoneError,
    addressError,
    isVisible,
    setIsVisible,
    setOnSearchAddress,
    providerProfile,
    phoneRef,
    licenseRef,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    onBlurLastName,
    getImageUrl,
    onChangeLastName,
    onBlurAddress,
    onSearchAddress,
    isShowModal,
    onUploadLicense,
    onCloseModal,
    renderToast,
    onPressBack,
    onPressNext
  }
}

export default ProviderAddressController
