import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { UseProviderUserContext } from 'contexts/UseProviderUserContext'
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider'
import useToast from 'components/common/useToast'
import { ProviderBankDetails, ProviderProfile } from 'libs/types/UserType'

const ProviderPaymentController = () => {
  const { providerProfile, setProviderProfile } = UseProviderUserContext()
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
      bankDetails: { registrationNumber: registrationNumberRef.current.value }
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
      bankDetails: { bankname: bankNameRef.current.value }
    } as unknown as ProviderProfile)
  }
  const onChangeBankName = (value: string) => (bankNameRef.current.value = value)

  const onBlurBranchType = () => {
    validateBranch()
    setProviderProfile({
      ...providerProfile,
      bankDetails: { branchname: branchRef?.current?.value }
    } as unknown as ProviderProfile)
  }
  const onChangeBranchType = (value: string) => (branchRef.current.value = value)

  const onBlurAccount = () => {
    validateAccount()
    setProviderProfile({
      ...providerProfile,
      bankDetails: { accountnumber: accountRef?.current?.value }
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
    if (providerProfile?.provider.name === ('Doctor' || 'Nurse')) {
      setCurrentStep('services')
    } else {
      setCurrentStep('addServices')
    }
    // if (
    //   providerProfile?.bank_name &&
    //   providerProfile?.branch &&
    //   providerProfile?.registration &&
    //   providerProfile?.account &&
    //   providerProfile?.profile_picture
    // ) {
    //   setIsLoading(true);
    //   const res = await OnUpdateProviderUserDetails?.({
    //     firstname: providerProfile?.firstname ?? "",
    //     lastname: "saini" ?? "",
    //     address: providerProfile?.address ?? "",
    //     city: "ambala",
    //     state: "haryana",
    //     country: "India",
    //     phone_number: providerProfile?.phone_number ?? "",
    //     profile_picture: providerProfile?.profile_picture ?? "",
    //     provider_id: providerProfile?.provider_id?.toString() ?? "",
    //     provider_type_id: providerProfile?.type_Provider ?? "",
    //     license_number: providerProfile?.license ?? "",
    //     upload_license_picture: providerProfile?.license_photo ?? "",
    //     bank_name: providerProfile?.bank_name ?? "",
    //     branch: providerProfile?.branch ?? "",
    //     business_registration_number: providerProfile?.registration ?? "",
    //     account: providerProfile?.account ?? "",
    //   });

    //   setIsLoading(false);
    //   if (res?.isSuccessful) {
    //        if (providerProfile?.type_Provider === ("Doctor" || "Nurse")) {
    //   setCurrentStep("services");
    //      } else {
    //   setCurrentStep("addServices");
    //      }
    //   }
    // } else {
    //   if (!providerProfile?.registration?.length)
    //     setRegistrationError("Registration is required");
    //   if (!providerProfile?.bank_name?.length)
    //     setBankNameError("Bank name is required");
    //   if (!providerProfile?.branch?.length)
    //     setBranchError("Branch name is required");
    //   if (!providerProfile?.account?.length)
    //     setAccountError("Account number is required");
    //   if (!providerProfile?.profile_picture?.length)
    //     showToast("", "Please upload profile image", "warning");
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
