import useToast from 'components/common/useToast'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import React, { useState } from 'react'

const ProviderDetailController = () => {
  const [firstNameError, setFirstNameError] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const [lastNameError, setLastNameError] = useState('')
  const [providerTypeError, setProviderTypeError] = useState('')
  const [specialtyError, setSpecialtyError] = useState('')
  const [selectedProvider, setSelectedProvider] = useState({})
  const { providerProfile, setProviderProfile } = UseProviderUserContext()
  const firstNameRef = React.useRef<any>('')
  const lastNameRef = React.useRef<any>('')
  const { setCurrentStep } = UseProviderUserContext()
  const { showToast, renderToast } = useToast()

  const onBlurFirstName = () => {
    validateFirstName()
    setProviderProfile({
      ...providerProfile,
      firstName: firstNameRef.current.value
    })
  }
  const onChangeFirstName = (value: string) => (firstNameRef.current.value = value)

  const onBlurLastName = () => {
    validateLastName()
    setProviderProfile({
      ...providerProfile,
      lastName: lastNameRef.current.value
    })
  }
  const onChangeLastName = (value: string) => (lastNameRef.current.value = value)

  const getImageUrl = (url: string) => setProviderProfile({ ...providerProfile, idPicture: url })

  const validateFirstName = () => {
    if (!firstNameRef.current.value) {
      setFirstNameError('First name is required')
    } else {
      setFirstNameError('')
    }
  }

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError('Last name is required')
    } else {
      setLastNameError('')
    }
  }

  const validateProviderType = () => {
    if (!selectedProvider) {
      setProviderTypeError('Provider type is required')
    } else {
      setProviderTypeError('')
    }
  }

  const validateSpecialty = () => {
    if (!providerProfile.speciality) {
      setSpecialtyError('Specialty is required')
    } else {
      setSpecialtyError('')
    }
  }

  const onChangeProviderTypes = (value: string) => {
    setSelectedProvider(value)
    validateLastName()
    setProviderProfile({
      ...providerProfile,
      provider: { id: '1', name: value.name },
      lastName: lastNameRef.current.value
    })
  }
  const onBlurProviderTypes = () => validateProviderType()

  const onChangeSpecialty = (value: string) => {
    setProviderProfile({
      ...providerProfile,
      speciality: {
        name: value?.name?.en,
        id: value?.id
      }
    })
  }
  const onBlurSpecialty = () => validateSpecialty()
  const onPressNext = () => {
    setCurrentStep('address')
    // if (
    //   (providerProfile?.firstname?.length ?? 0) > 0 &&
    //   (providerProfile.lastname?.length ?? 0) > 0 &&
    //   (providerProfile.speciality?.length ?? 0) > 0 &&
    //   (providerProfile.type_Provider?.length ?? 0) > 0 &&
    //   (providerProfile.id_photo?.length ?? 0) > 0
    // ) {
    //   setCurrentStep("address");
    // } else {
    //   if (!providerProfile.firstname?.length)
    //     setFirstNameError("First name is required");
    //   if (!providerProfile.lastname?.length)
    //     setLastNameError("Last name is required");
    //   if (!providerProfile.speciality?.length)
    //     setSpecialtyError("Specialty is required");
    //   if (!providerProfile.type_Provider?.length)
    //     setProviderTypeError("Type of provider is required");
    //   if (!providerProfile.id_photo?.length)
    //     showToast("", "Please upload ID", "warning");
    // }
  }

  return {
    firstNameError,
    isShowModal,
    setIsShowModal,
    lastNameError,
    providerTypeError,
    specialtyError,
    selectedProvider,
    providerProfile,
    getImageUrl,
    onChangeFirstName,
    onBlurFirstName,
    onBlurLastName,
    onChangeLastName,
    onChangeProviderTypes,
    onChangeSpecialty,
    firstNameRef,
    lastNameRef,
    onBlurSpecialty,
    onBlurProviderTypes,
    onPressNext,
    renderToast
  }
}

export default ProviderDetailController
