import { useState } from "react";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const [currentStep, setCurrentStep] = useState([0]);
  const [isShowModal, setIsShowModal] = useState(false);
  const onPressNext = () => {
    if (currentStep.length !== totalSteps) {
      setCurrentStep(() => {
        const array = [...currentStep];
        array.push(array[array.length - 1] + 1);
        return array;
      });
    }
  };
  const onPressBack = () => {
    if (currentStep.length > 1) {
      setCurrentStep((prev) => prev.slice(0, prev.length - 1));
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
