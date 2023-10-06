import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { UseUserContext } from "contexts/useUserContext";
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
  const { userData } = UseUserContext()
  const onPressNext = () => {
    if (currentStep.length !== totalSteps) {
      setCurrentStep(() => {
        const array = [...currentStep];
        array.push(array[array.length - 1] + 1);
        return array;
      });
    }
    else if (currentStep) {
      console.log("hvjkcbvjkcbngj", userData)
      const res = onAuthUpdateUserProfile?.(userData?.firstname ?? '', userData.lastname ?? '', userData.address ?? '', userData.city ?? '', userData.state ?? "", userData.country ?? '', userData.profile_picture ?? "", userData.date_of_birth ?? '', userData.phone_number ?? "", userData.client_id ?? "")
      console.log("res", res)
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
