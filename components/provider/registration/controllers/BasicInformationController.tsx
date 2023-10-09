import { useState } from "react";

const BasicInformationController = ({ totalSteps }: { totalSteps?: number }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const tab = Array(totalSteps).fill(0);
  const onPressNext = () => {
    setCurrentStep((prev) => {
      const newStep = prev + 1;
      return newStep < tab.length ? newStep : prev;
    });
  };
  const onPressBack = () => {
    setCurrentStep((prev) => {
      const newStep = prev - 1;
      return newStep >= 0 ? newStep : prev;
    });
  };
  
  return {
    currentStep,
    onPressNext,
    onPressBack,
    selectedImage,
    setSelectedImage,
    isShowModal,
    setIsShowModal
  };
};

export default BasicInformationController;
