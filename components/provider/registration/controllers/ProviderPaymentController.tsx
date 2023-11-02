import useToast from 'components/common/useToast'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import { setLocalData } from 'libs/datastorage/useLocalStorage'
import { ProviderProfile } from 'libs/types/UserType'
import React, { useState } from 'react'
import { Alert } from 'react-native'

const ProviderPaymentController = () => {
  const { providerProfile, setProviderProfile, userId } = UseProviderUserContext()
  const { setCurrentStep } = UseProviderUserContext()
  const { OnUpdateProviderUserDetails } = AuthServicesProvider()
  const [registrationError, setRegistrationError] = useState('')
  const [bankNameError, setBankNameError] = useState('')
  const [branchError, setBranchError] = useState('')
  const [accountError, setAccountError] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const registrationNumberRef = React.useRef<any>('')
  const bankNameRef = React.useRef<any>('')
  const branchRef = React.useRef<any>('')
  const accountRef = React.useRef<any>('')
  const { showToast, renderToast } = useToast()
  const [profilePicture, setProfilePicture] = useState('')

  const onBlurRegistrationNumber = () => validateRegistrationNumber()

  const onChangeRegistrationNumber = (value: string) => {
    registrationNumberRef.current.value = value
    validateRegistrationNumber()
  }
  const onBlurBankName = () => validateBankName()
  const onChangeBankName = (value: string) => (bankNameRef.current.value = value)
  const onBlurBranchType = () => validateBranch()
  const onChangeBranchType = (value: string) => (branchRef.current.value = value)
  const onBlurAccount = () => validateAccount()
  const onChangeAccount = (value: string) => (accountRef.current.value = value)
  const getImageUrl = (url: string) => setProfilePicture(url)

  const validateRegistrationNumber = () => {
    if (!registrationNumberRef.current.value) {
      setRegistrationError('Registration is required')
    } else {
      setRegistrationError('')
    }
  }

  const validateBankName = () => {
    if (!bankNameRef.current.value) {
      setBankNameError('Bank is required')
    } else {
      setBankNameError('')
    }
  }

  const validateBranch = () => {
    if (!bankNameRef.current.value) {
      setBranchError('Branch is required')
    } else {
      setBranchError('')
    }
  }
  const validateAccount = () => {
    if (!bankNameRef.current.value) {
      setAccountError('Bank Account is required')
    } else {
      setAccountError('')
    }
  }

  const onPressBack = () => setCurrentStep('address')

  const onPressNext = async () => {
    if (bankNameRef.current.value && branchRef?.current?.value && registrationNumberRef.current.value && accountRef?.current?.value && profilePicture) {
      setIsLoading(true)
      const res = await OnUpdateProviderUserDetails?.({
        firstname: providerProfile?.firstName ?? '',
        lastname: providerProfile?.lastName ?? '',
        address: providerProfile?.address ?? '',
        city: 'ambala',
        state: 'haryana',
        country: 'India',
        phone_number: providerProfile?.phoneNumber ?? '',
        profile_picture: providerProfile?.profilePicture ?? '',
        provider_id: userId ?? '',
        provider_type_id: providerProfile?.provider?.id ?? '',
        license_number: providerProfile?.licensenumber ?? '',
        upload_license_picture: providerProfile?.licensepicture ?? '',
        bank_name: providerProfile?.bankDetails?.bankname ?? '',
        branch: providerProfile?.bankDetails?.branchname ?? '',
        business_registration_number: providerProfile?.bankDetails?.registrationNumber ?? '',
        account: providerProfile?.bankDetails?.accountnumber ?? ''
      })
      console.log('first***', res)
      setProviderProfile({
        ...providerProfile,
        ...{ bankDetails: { ...providerProfile.bankDetails, registrationNumber: registrationNumberRef.current.value ?? '' } },
        ...{ bankDetails: { ...providerProfile.bankDetails, bankname: bankNameRef.current.value ?? '' } },
        ...{ bankDetails: { ...providerProfile.bankDetails, branchname: branchRef?.current?.value ?? '' } },
        ...{ bankDetails: { ...providerProfile.bankDetails, accountnumber: accountRef?.current?.value } },
        profilePicture: profilePicture
      } as unknown as ProviderProfile)

      setLocalData('USERPROVIDERPROFILE', {
        firstName: providerProfile?.firstName,
        lastName: 'saini',
        address: providerProfile?.address,
        city: 'ambala',
        state: 'haryana',
        country: 'India',
        phoneNumber: providerProfile?.phoneNumber,
        profilePicture: providerProfile?.profilePicture,
        provider_id: userId,
        provider_type_id: providerProfile?.provider?.id,
        licensenumber: providerProfile?.licensenumber,
        licensepicture: providerProfile?.licensepicture,
        bankName: providerProfile?.bankDetails?.bankname,
        branch: providerProfile?.bankDetails?.branchname,
        business_registration_number: providerProfile?.bankDetails?.registrationNumber,
        account: providerProfile?.bankDetails?.accountnumber
      })
      setIsLoading(false)
      if (res?.isSuccessful) {
        Alert.alert('isSuccessful')
        if (providerProfile?.provider?.name === ('Doctor' || 'Nurse')) {
          setCurrentStep('services')
        } else {
          setCurrentStep('addServices')
        }
      }
    } else {
      if (!registrationNumberRef.current.value) setRegistrationError('Registration is required')
      if (!bankNameRef.current.value) setBankNameError('Bank name is required')
      if (!branchRef?.current?.value) setBranchError('Branch name is required')
      if (!accountRef?.current?.value) setAccountError('Account number is required')
      if (!profilePicture?.length) showToast('', 'Please upload profile image', 'warning')
    }
  }

  return {
    providerProfile,
    registrationError,
    bankNameError,
    branchError,
    accountError,
    isShowModal,
    setIsShowModal,
    registrationNumberRef,
    bankNameRef,
    branchRef,
    accountRef,
    onBlurRegistrationNumber,
    onChangeRegistrationNumber,
    onBlurBankName,
    onChangeBankName,
    onBlurBranchType,
    onChangeBranchType,
    onBlurAccount,
    onChangeAccount,
    getImageUrl,
    onPressBack,
    onPressNext,
    isLoading,
    profilePicture,
    renderToast
  }
}

export default ProviderPaymentController
