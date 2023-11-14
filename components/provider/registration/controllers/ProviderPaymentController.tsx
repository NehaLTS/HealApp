import Loader from 'components/common/Loader';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderBankDetails, ProviderProfile } from 'libs/types/UserType';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const ProviderPaymentController = () => {
  const [registrationError, setRegistrationError] = useState('');
  const [bankNameError, setBankNameError] = useState('');
  const [branchError, setBranchError] = useState('');
  const [accountError, setAccountError] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const registrationNumberRef = React.useRef<any>('');
  const bankNameRef = React.useRef<any>('');
  const branchRef = React.useRef<any>('');
  const accountRef = React.useRef<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const { OnUpdateProviderUserDetails } = AuthServicesProvider();

  const { setCurrentStep, setProviderProfile, providerProfile, userId, token } =
    UseProviderUserContext();

  const onBlurRegistrationNumber = () => validateRegistrationNumber();

  const onChangeRegistrationNumber = (value: string) => {
    registrationNumberRef.current.value = value;
    validateRegistrationNumber();
  };

  const onBlurBankName = () => validateBankName();

  const onChangeBankName = (value: string) =>
    (bankNameRef.current.value = value);

  const onBlurBranchType = () => validateBranch();

  const onChangeBranchType = (value: string) =>
    (branchRef.current.value = value);

  const onBlurAccount = () => validateAccount();

  const onChangeAccount = (value: string) => (accountRef.current.value = value);

  const getImageUrl = (url: string) => {};

  const validateRegistrationNumber = () => {
    if (!registrationNumberRef.current.value) {
      setRegistrationError('Registration is required');
    } else {
      setRegistrationError('');
    }
  };

  const validateBankName = () => {
    if (!bankNameRef.current.value) {
      setBankNameError('Bank is required');
    } else {
      setBankNameError('');
    }
  };

  const validateBranch = () => {
    if (!bankNameRef.current.value) {
      setBranchError('Branch is required');
    } else {
      setBranchError('');
    }
  };
  const validateAccount = () => {
    if (!bankNameRef.current.value) {
      setAccountError('Bank Account is required');
    } else {
      setAccountError('');
    }
  };

  const onPressNext = async () => {
    if (
      registrationNumberRef.current.value &&
      bankNameRef.current.value &&
      accountRef.current.value &&
      branchRef.current.value
    ) {
      let bankDetails: ProviderBankDetails = {
        registrationNumber: registrationNumberRef.current.value,
        bankname: bankNameRef.current.value,
        accountnumber: accountRef.current.value,
        branchname: branchRef.current.value,
      };
      setProviderProfile({
        ...(providerProfile as ProviderProfile),
        bankDetails: bankDetails,
      });

      setIsLoading(true);

      const res = await OnUpdateProviderUserDetails?.(
        {
          firstname: providerProfile.firstName ?? '',
          lastname: providerProfile.lastName ?? '',
          address: providerProfile.address ?? '',
          city: '',
          state: '',
          country: '',
          phone_number: providerProfile.phoneNumber ?? '',
          profile_picture: providerProfile.profilePicture ?? '',
          provider_id: userId ?? '',
          provider_type_id: providerProfile.provider.id ?? '',
          license_number: providerProfile.licensenumber ?? '',
          upload_license_picture: providerProfile.licensepicture ?? '',
          bank_name: bankNameRef.current.value,
          branch: branchRef.current.value,
          business_registration_number: registrationNumberRef.current.value,
          account: accountRef.current.value,
        },
        token,
      );

      console.log('response udpate is ', res);

      if (res?.msg) {
        setLocalData('USERPROFILE', {
          firstName: providerProfile.firstName ?? '',
          lastName: providerProfile.lastName ?? '',
          address: providerProfile.address ?? '',
          city: '',
          state: '',
          country: '',
          phoneNumber: providerProfile.phoneNumber ?? '',
          profilePicture: providerProfile.profilePicture ?? '',
          provider: providerProfile.provider,
          speciality: providerProfile.speciality,
          licensenumber: providerProfile.licensenumber ?? '',
          licensepicture: providerProfile.licensepicture ?? '',
          bankDetails: {
            bankname: bankNameRef.current.value,
            branchname: branchRef.current.value,
            registrationNumber: registrationNumberRef.current.value,
            accountnumber: accountRef.current.value,
          },
        });

        if (providerProfile?.provider?.name.en === ('Doctor' || 'Nurse')) {
          setCurrentStep('services');
        } else {
          setCurrentStep('addServices');
        }
      } else {
        Alert.alert('Some Error on Updating the Details. Please try again !!');
      }

      setIsLoading(false);

      console.log('respionse is ', res);

      // setCurrentStep('payment');
    } else {
      if (!registrationNumberRef.current.value)
        setRegistrationError('Registration is required');
      if (!bankNameRef.current.value) setBankNameError('Bank is required');
      if (!accountRef.current.value)
        setAccountError('Bank Account is required');
      if (!branchRef.current.value) setBranchError('Branch is required');
    }
  };

  const onPressBack = () => {
    // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };

  return {
    providerProfile,
    onBlurRegistrationNumber,
    onChangeRegistrationNumber,
    registrationNumberRef,
    registrationError,
    onBlurBankName,
    bankNameRef,
    onChangeBankName,
    bankNameError,
    branchRef,
    onBlurBranchType,
    onChangeBranchType,
    branchError,
    onBlurAccount,
    onChangeAccount,
    accountRef,
    accountError,
    isShowModal,
    getImageUrl,
    onPressNext,
    onPressBack,
    setIsShowModal,
    isLoading,
  };
};

export default ProviderPaymentController;
