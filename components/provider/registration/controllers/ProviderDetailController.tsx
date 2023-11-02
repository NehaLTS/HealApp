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
  const [selectedSpecialty, setSelectedSpecialty] = useState({})
  const { providerProfile, setProviderProfile } = UseProviderUserContext()
  const firstNameRef = React.useRef<any>('')
  const lastNameRef = React.useRef<any>('')
  const { setCurrentStep } = UseProviderUserContext()
  const { showToast, renderToast } = useToast()
  const [idPicture, setIdPicture] = useState('')

  const onChangeFirstName = (value: string) => (firstNameRef.current.value = value)
  const onChangeLastName = (value: string) => (lastNameRef.current.value = value)

  const onBlurLastName = () => validateLastName()
  const onBlurFirstName = () => validateFirstName()

  const getImageUrl = (url: string) => setIdPicture(url)

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
    if (!selectedSpecialty) {
      setSpecialtyError('Specialty is required')
    } else {
      setSpecialtyError('')
    }
  }

  const onChangeProviderTypes = (value: string) => {
    setSelectedProvider(value)
    if (!lastNameRef.current.value) validateLastName()
  }
  const onBlurProviderTypes = () => validateProviderType()

  const onChangeSpecialty = (value: string) => setSelectedSpecialty(value)
  const onBlurSpecialty = () => validateSpecialty()

  const onPressNext = () => {
    if ((firstNameRef.current.value?.length ?? 0) > 0 && (lastNameRef.current.value?.length ?? 0) > 0 && (selectedSpecialty?.name?.en?.length ?? 0) > 0 && (selectedProvider?.name?.length ?? 0) > 0 && (idPicture?.length ?? 0) > 0) {
      setProviderProfile({
        ...providerProfile,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        provider: { id: '1', name: selectedProvider.name },
        speciality: { name: selectedSpecialty?.name?.en, id: selectedSpecialty?.id },
        idPicture: idPicture
      })
      setCurrentStep('address')
    } else {
      if (!firstNameRef.current.value?.length) setFirstNameError('First name is required')
      if (!lastNameRef.current.value?.length) setLastNameError('Last name is required')
      if (!selectedSpecialty?.name?.en) setSpecialtyError('Specialty is required')
      if (!selectedProvider?.name) setProviderTypeError('Type of provider is required')
      if (!idPicture?.length) showToast('', 'Please upload ID', 'warning')
    }
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
    renderToast,
    selectedSpecialty,
    idPicture
  }
}

export default ProviderDetailController
