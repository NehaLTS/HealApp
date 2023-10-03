import { useState } from 'react';

const BasicInformationController = ({totalSteps}:{totalSteps:number}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const tab = Array(totalSteps).fill(0);
    const handleNext = () => {
      setCurrentStep((prev) => {
        const newStep = prev + 1;
        return newStep < tab.length ? newStep : prev;
      });
    };
    const handleBack = () => {
      setCurrentStep((prev) => {
        const newStep = prev - 1;
        return newStep >= 0 ? newStep : prev;
      });
    };
  return {
    currentStep,
    handleNext,
    handleBack
  }
}

export default BasicInformationController