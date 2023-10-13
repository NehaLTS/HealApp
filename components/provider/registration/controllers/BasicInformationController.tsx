import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { UseUserContext } from "contexts/useUserContext";
import { UseUserContextProvider } from "contexts/useUserContextProvider";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { useState } from "react";
import { Alert } from "react-native";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const { userDataProvider } = UseUserContextProvider()
  const { OnUpdateProviderUserDetails } = AuthServicesProvider()

  console.log('userDataProvider********', userDataProvider)

  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        if (
        (userDataProvider?.firstname?.length ??0) > 0 && 
        (userDataProvider.lastname?.length ??0) > 0 && 
        (userDataProvider.speciality?.length ??0) > 0 && 
        (userDataProvider.type_Provider?.length  ??0) > 0 && 
       ( userDataProvider.id_photo?.length ??0) > 0
        ) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        }
        else {
          Alert.alert('Please fill all the fields')
        }
      }
      if (currentStep[currentStep.length - 1] === 1) {
        // if (userDataProvider.address && userDataProvider.phone_number&&userDataProvider.license_photo ) {
        setCurrentStep(() => {
          const array = [...currentStep];
          array.push(array[array.length - 1] + 1);
          return array;
        });
        // }
        // else {
        //   Alert.alert('Please fill all the fields')
        // }
      }
    }
    if (currentStep[currentStep.length - 1] === 2) {
      setIsLoading(true)

      // if (userDataProvider.bank_name && userDataProvider.branch&& userDataProvider.registration && userDataProvider.account && userDataProvider.profile_picture) {
      const res = await OnUpdateProviderUserDetails?.({
        firstname: userDataProvider.firstname ?? '',
        lastname: 'saini' ?? '',
        address: userDataProvider.address ?? '',
        city: 'ambala',
        state: 'haryana',
        country: 'India',
        phone_number: userDataProvider.phone_number ?? '',
        profile_picture: userDataProvider.profile_picture ?? '',
        provider_id: userDataProvider.provider_id?.toString() ?? '',
        provider_type_id: userDataProvider.type_Provider ?? '',
        license_number: userDataProvider.license ?? '',
        upload_license_picture: userDataProvider.license_photo ?? '',
        bank_name: userDataProvider.bank_name ?? '',
        branch: userDataProvider.branch ?? '',
        business_registration_number: userDataProvider.registration ?? '',
        account: userDataProvider.account ?? ''
      })

      console.log('response++++++', res)

      // if (res?.isSuccessful) {
      setCurrentStep(() => {
        const array = [...currentStep];
        array.push(array[array.length - 1] + 1);
        return array;
      });
      // }
    }
    if (currentStep[currentStep.length - 1] === 2) {
      setIsLoading(false)
    }
  }


  const onPressBack = () => {
    if (currentStep.length > 1) {
      setCurrentStep((prev) => prev.slice(0, prev.length - 1));
    }
    if (currentStep.length === 1) {
      navigation.goBack()
    }
  };


  return {
    currentStep,
    onPressNext,
    onPressBack,
    isShowModal,
    setIsShowModal,
    setSelectedImage,
    selectedImage,
    isLoading,
    setIsLoading
  };
};

export default BasicInformationController;
