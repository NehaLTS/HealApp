import useToast from 'components/common/useToast'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import { setLocalData } from 'libs/datastorage/useLocalStorage'
import { ProviderProfile } from 'libs/types/UserType'
import React, { useState } from 'react'

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

  console.log('providerProfile', providerProfile)
  const onBlurRegistrationNumber = () => {
    validateRegistrationNumber()
    setProviderProfile({
      ...providerProfile,
      ...{ bankDetails: { ...providerProfile.bankDetails, registrationNumber: registrationNumberRef.current.value ?? ''} }
    } as unknown as ProviderProfile)
  }
  const onChangeRegistrationNumber = (value: string) => {
    registrationNumberRef.current.value = value
    validateRegistrationNumber()
  }

  const onBlurBankName = () => {
    validateBankName()
    setProviderProfile({
      ...providerProfile,
      ...{ bankDetails: { ...providerProfile.bankDetails, bankname: bankNameRef.current.value ?? ''} }
    } as unknown as ProviderProfile)
  }
  const onChangeBankName = (value: string) => (bankNameRef.current.value = value)

  const onBlurBranchType = () => {
    validateBranch()
    setProviderProfile({
      ...providerProfile,
      ...{ bankDetails: { ...providerProfile.bankDetails, branchname: branchRef?.current?.value ?? ''} }
    } as unknown as ProviderProfile)
  }
  const onChangeBranchType = (value: string) => (branchRef.current.value = value)

  const onBlurAccount = () => {
    validateAccount()
    setProviderProfile({
      ...providerProfile,
      ...{ bankDetails: { ...providerProfile.bankDetails, accountnumber: accountRef?.current?.value } }
    } as unknown as ProviderProfile)
  }
  const onChangeAccount = (value: string) => (accountRef.current.value = value)

  const getImageUrl = (url: string) => setProviderProfile({ ...providerProfile, profilePicture: url })

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

  const onPressBack = () => {
    setCurrentStep('address')
  }

  const onPressNext = async () => {
    if (providerProfile?.provider?.name === ('Doctor' || 'Nurse')) {
      setCurrentStep('services')
    } else {
      setCurrentStep('addServices')
    }
    // if (providerProfile?.bankDetails?.bankname && providerProfile?.bankDetails?.branchname && providerProfile?.bankDetails?.registrationNumber && providerProfile?.bankDetails?.accountnumber && providerProfile?.profilePicture) {
      setIsLoading(true)
      const res = await OnUpdateProviderUserDetails?.({
        firstname: providerProfile?.firstName ?? '',
        lastname: 'saini' ?? '',
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
      const bankName = providerProfile?.bankDetails?.bankname;

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
        bankname: providerProfile?.bankDetails?.bankname ,
        branch: providerProfile?.bankDetails?.branchname,
        business_registration_number: providerProfile?.bankDetails?.registrationNumber ,
        account: providerProfile?.bankDetails?.accountnumber
      })
      //   setIsLoading(false)
      //   if (res?.isSuccessful) {
      //     if (providerProfile?.provider.name === ('Doctor' || 'Nurse')) {
      //       setCurrentStep('services')
      //     } else {
      //       setCurrentStep('addServices')
      //     }
      //   }
      // } else {
      //   if (!providerProfile?.bankDetails?.registrationNumber?.length) setRegistrationError('Registration is required')
      //   if (!providerProfile?.bankDetails?.bankname?.length) setBankNameError('Bank name is required')
      //   if (!providerProfile?.bankDetails?.branchname?.length) setBranchError('Branch name is required')
      //   if (!providerProfile?.bankDetails?.accountnumber?.length) setAccountError('Account number is required')
      //   if (!providerProfile?.profilePicture?.length) showToast('', 'Please upload profile image', 'warning')
      // }
    // }
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
      isLoading
    }
  }

  export default ProviderPaymentController
