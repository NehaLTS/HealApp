import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { useState } from "react";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const [isShowModal, setIsShowModal] = useState(false);
  const { onAuthUpdateUserProfile } = useApiContext()
  const { onUpdateUserProfile
  } = AuthServicesProvider()
  const { userData } = UseUserContext()
  const onPressNext = async () => {

    if (currentStep.length !== totalSteps) {
      setCurrentStep(() => {
        const array = [...currentStep];
        array.push(array[array.length - 1] + 1);
        return array;
      });
      if (currentStep[currentStep.length - 1] === 1) {
        const res = await onUpdateUserProfile?.({
          firstname: userData?.firstname ?? '',
          lastname: userData?.lastname ?? '',
          address: userData?.address ?? "",
          city: userData?.city ?? '',
          state: userData.state ?? '',
          country: userData?.country ?? '',
          profile_picture: userData.profile_picture ?? "https://firebasestorage.googleapis.com/v0/b/heal-app-ccd03.appspot.com/o/pexels-pixabay-220453.jpg?alt=media&token=109a02dd-bb7e-45f9-913c-980cf161b7e7&_gl=1*17m1xy4*_ga*ODA1NTM0NzYzLjE2OTYzMTY0OTk.*_ga_CW55HF8NVT*MTY5NjMxNjQ5OC4xLjEuMTY5NjMxNzY5My4zOC4wLjA.",
          date_of_birth: userData?.date_of_birth ?? "",
          phone_number: userData?.phone_number ?? "",
          client_id: userData?.client_id ?? ""
        });
        setLocalData('USER', res)
        // const res = await onAuthUpdateUserProfile?.(userData?.firstname ?? '', userData.lastname ?? '', userData.address ?? '', userData.city ?? '', userData.state ?? "", userData.country ?? '', userData.profile_picture ?? "", userData.date_of_birth ?? '', userData.phone_number ?? "", userData.client_id ?? "")
        console.log("res", res)
      }
    }
  };
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
  };
};

export default BasicInformationController;
