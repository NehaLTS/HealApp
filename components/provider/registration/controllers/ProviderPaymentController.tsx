import Loader from 'components/common/Loader';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderBankDetails, ProviderProfile } from 'libs/types/UserType';
import uploadImage from 'libs/uploadImage';
import { getImagesPath } from 'libs/utility/Utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';

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
  const { userLocation } = UseClientUserContext();
  const { t } = useTranslation();
  const providerServicesData = getLocalData('PROVIDERSERVICES');

  const { setCurrentStep, setProviderProfile, providerProfile, userId, token } =
    UseProviderUserContext();
  const [profilePicture, setProfilePicture] = useState(
    providerProfile && providerProfile.profilePicture
      ? providerProfile.profilePicture
      : '',
  );
  console.log('providerProfile11', providerProfile);
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

  const getImageUrl = (url: string) => {
    console.log('url333', url);
    setProfilePicture(url);
  };

  const imagePaths = [
    {
      imagePath: providerProfile?.idPicture,
      type: 'idPicture',
    },
    {
      imagePath: providerProfile?.licensepicture,
      type: 'license',
    },
    {
      imagePath: profilePicture,
      type: 'profilePicture',
    },
  ].filter((imageData) => imageData?.imagePath);
  console.log('imagePaths', imagePaths);
  const validateRegistrationNumber = () => {
    if (!registrationNumberRef.current.value) {
      setRegistrationError(t('registration_required'));
    } else {
      setRegistrationError('');
    }
  };

  const validateBankName = () => {
    if (!bankNameRef.current.value) {
      setBankNameError(t('bank_required'));
    } else {
      setBankNameError('');
    }
  };

  const validateBranch = () => {
    if (!bankNameRef.current.value) {
      setBranchError(t('branch_required'));
    } else {
      setBranchError('');
    }
  };
  const validateAccount = () => {
    if (!bankNameRef.current.value) {
      setAccountError(t('bank_account_required'));
    } else {
      setAccountError('');
    }
  };

  const onPressNext = async () => {
    let latitude: string = '';
    let longitude: string = '';

    Geocoder.from(providerProfile?.address ?? '')
      .then((json) => {
        var location = json.results[0].geometry.location;
        latitude = location.lat.toString();
        longitude = location.lng.toString();
        console.log('location....', location);
      })
      .catch((error) => console.warn(error));
    setIsLoading(true);
    await uploadImage(imagePaths)
      .then(async (images) => {
        console.log('Uploaded images:', images);

        if (images?.length > 0) {
          if (
            registrationNumberRef.current.value &&
            bankNameRef.current.value &&
            accountRef.current.value &&
            branchRef.current.value &&
            profilePicture
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
              profilePicture: getImagesPath(images, 'profilePicture'),
              licensepicture: getImagesPath(images, 'license'),
              idPicture: getImagesPath(images, 'idPicture'),
            });

            console.log('providerServicesData', providerServicesData);
            console.log(
              'locationUpdate',
              latitude,
              latitude !== ''
                ? latitude
                : userLocation?.onboardingLocation?.latitude,
            );

            const boddTpUpdate = {
              firstname: providerProfile?.firstName ?? '',
              lastname: providerProfile?.lastName ?? '',
              address: providerProfile?.address ?? '',
              city: '',
              state: '',
              country: '',

              phone_number: providerProfile?.phoneNumber ?? '',
              profile_picture: getImagesPath(images, 'profilePicture') ?? '',
              provider_id: userId ?? '',
              provider_type_id: providerProfile?.provider.id ?? '',
              license_number: providerProfile?.licensenumber ?? '',
              upload_license_picture: providerProfile?.licensepicture ?? '',
              bank_name: bankNameRef.current.value,
              branch: branchRef.current.value,
              business_registration_number:
                registrationNumberRef.current.value,
              account: accountRef.current.value,
              specialty_id: providerProfile.speciality.id,
              latitude:
                latitude !== ''
                  ? latitude
                  : userLocation?.onboardingLocation?.latitude ?? '',
              longitude:
                longitude !== ''
                  ? longitude
                  : userLocation?.onboardingLocation?.longitude ?? '',
            }
            const res = await OnUpdateProviderUserDetails?.(boddTpUpdate, token);

            console.log('response patch', res, boddTpUpdate);

            if (res?.msg) {
              setLocalData('USERPROFILE', {
                firstName: providerProfile.firstName ?? '',
                lastName: providerProfile.lastName ?? '',
                address: providerProfile?.address,
                city: '',
                state: '',
                country: '',
                phoneNumber: providerProfile.phoneNumber ?? '',
                provider: providerProfile.provider,
                speciality: providerProfile.speciality,
                licensenumber: providerProfile.licensenumber ?? '',
                profilePicture: getImagesPath(images, 'profilePicture'),
                licensepicture:
                  getImagesPath(images, 'license')?.length > 0
                    ? getImagesPath(images, 'license')
                    : '',
                idPicture: getImagesPath(images, 'idPicture'),
                bankDetails: {
                  bankname: bankNameRef.current.value,
                  branchname: branchRef.current.value,
                  registrationNumber: registrationNumberRef.current.value,
                  accountnumber: accountRef.current.value,
                },
              });

              if (
                providerProfile?.provider?.name?.en === 'Doctor' ||
                providerProfile?.provider?.name?.en === 'Nurse'
              ) {
                setCurrentStep('services');
              } else {
                setCurrentStep('addServices');
              }
            } else {
              setIsLoading(false);
              Alert.alert(t('some_error'));
            }

            setIsLoading(false);

            console.log('respionse is ', res);

            // setCurrentStep('payment');
          } else {
            setIsLoading(false);
            if (!registrationNumberRef.current.value)
              setRegistrationError(t('registration_required'));
            if (!bankNameRef.current.value)
              setBankNameError(t('bank_required'));
            if (!accountRef.current.value)
              setAccountError(t('bank_account_required'));
            if (!branchRef.current.value) setBranchError(t('branch_required'));
            if (!profilePicture) {
              Alert.alert('Please add Profile picture');
            }
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error uploading images:', error);
      });
  };

  const onPressBack = () => {
    setCurrentStep('address');
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
    profilePicture,
    setIsLoading,
  };
};

export default ProviderPaymentController;
