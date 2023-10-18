import { useNavigation } from "@react-navigation/native";
import { UseUserContextProvider } from "contexts/useUserContextProvider";
import useUpdateEffect from "libs/UseUpdateEffect";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";
import { Alert, BackHandler } from "react-native";

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
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [specialityError, setSpecialityError] = useState("");
  const [providerTypeError, setProviderTypeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [branchError, setBranchError] = useState("");
  const [accountError, setAccountError] = useState("");

  useUpdateEffect(() => {
    if (userDataProvider.firstname?.length) setFirstNameError("");
    if (userDataProvider.lastname?.length) setLastNameError("");
    if (userDataProvider.speciality?.length) setSpecialityError("");
    if (userDataProvider.type_Provider?.length) setProviderTypeError("");

    if (userDataProvider.phone_number?.length) setPhoneError("");
    if (userDataProvider.address?.length) setAddressError("");

    if (!userDataProvider.registration?.length) setRegistrationError("");
    if (userDataProvider.bank_name?.length) setBankNameError("");
    if (userDataProvider.branch?.length) setBranchError("");
    if (userDataProvider.account?.length) setAccountError("");

  }, [userDataProvider])



  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        if (
          (userDataProvider?.firstname?.length ?? 0) > 0 &&
          (userDataProvider.lastname?.length ?? 0) > 0 &&
          (userDataProvider.speciality?.length ?? 0) > 0 &&
          (userDataProvider.type_Provider?.length ?? 0) > 0 &&
          (userDataProvider.id_photo?.length ?? 0) > 0
        ) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        }
        else {
          if (!userDataProvider.firstname?.length) setFirstNameError("First name is required");
          if (!userDataProvider.lastname?.length) setLastNameError("Last name is required");
          if (!userDataProvider.speciality?.length) setSpecialityError("Specialty is required");
          if (!userDataProvider.type_Provider?.length) setProviderTypeError("Type of provider is required");
          if (!userDataProvider.id_photo?.length) Alert.alert("Please Upload ID photo")
        }
      }
      if (currentStep[currentStep.length - 1] === 1) {
        if ((userDataProvider.address && userDataProvider.address.length >= 4) && userDataProvider.phone_number && userDataProvider.license_photo) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        }
        else {
          if (!userDataProvider.phone_number?.length) setPhoneError("Phone number is required");
          if (!userDataProvider.address?.length) setAddressError("Address is required");
          else if (userDataProvider.address?.length) setAddressError("Please fill full address");
          if (!userDataProvider.license_photo?.length) Alert.alert("Please upload License photo")
        }
      }
    }
    if (currentStep[currentStep.length - 1] === 2) {


      if (userDataProvider.bank_name && userDataProvider.branch && userDataProvider.registration && userDataProvider.account && userDataProvider.profile_picture) {
        setIsLoading(true)
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

        setIsLoading(false)
        // if (res?.isSuccessful) {
        setCurrentStep(() => {
          return [0, 1, 2, 3];
        });
        // }
      } else {
        if (!userDataProvider.registration?.length) setRegistrationError("Registration is required");
        if (!userDataProvider.bank_name?.length) setBankNameError("Bank name is required");
        if (!userDataProvider.branch?.length) setBranchError("Branch name is required");
        if (!userDataProvider.account?.length) setAccountError("Account number is required");
        if (!userDataProvider.profile_picture?.length) Alert.alert("Required")
      }
    }
    if (currentStep[currentStep.length - 1] === 3) {
      setIsLoading(false)
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ProviderConfirmation }],
      })
    }
  }


  const onPressBack = () => {
    if (currentStep.length <= 3) {
      setCurrentStep((prev) => prev.slice(0, prev.length - 1));
    }
    if (currentStep.length === 4) {
      BackHandler.exitApp()
      setCurrentStep(() => {
        return [2];
      });
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
    setIsLoading,
    firstNameError,
    lastNameError,
    specialityError,
    providerTypeError,

    phoneError,
    addressError,

    registrationError,
    bankNameError,
    branchError,
    accountError,

  };
};

export default BasicInformationController;
