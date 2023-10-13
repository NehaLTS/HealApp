import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import React, { useState } from "react";
import { Alert } from "react-native";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const { onUpdateUserProfile, onCreateCreditCardDetails } = AuthServicesClient()
  const { userData, setUserData } = UseUserContext()
const [loader,setLoader]=useState(false)
  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        setCurrentStep(() => {
          const array = [...currentStep];
          array.push(array[array.length - 1] + 1);
          return array;
        });
      }
      if (currentStep[currentStep.length - 1] === 1) {
        setLoader(true)
        console.log('userData', userData);
        const res = await onUpdateUserProfile?.({
          firstname: userData?.firstname ?? '',
          lastname: userData?.lastname ?? '',
          address: userData?.address ?? "",
          city: userData?.city ?? '',
          state: userData.state ?? '',
          country: userData?.country ?? '',
          profile_picture: userData.profile_picture ?? "",
          date_of_birth: userData?.date_of_birth ?? "",
          phone_number: userData?.phone_number ?? "",
          client_id: userData?.client_id ?? ""
        });
        setUserData({ ...userData, isSuccessful: res?.isSuccessful },)
        setLocalData('USER', res)
        console.log("res", res)
        setLoader(false)
        if (res?.isSuccessful) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        }
        else {
          Alert.alert('some error occorred');
        }
      }
    }
    if (currentStep[currentStep.length - 1] === 2) {
      const res = await onCreateCreditCardDetails({
        credit_card_number: userData?.credit_card_number ?? '',
        expire_date: userData?.expire_date ?? '',
        cvv: userData?.cvv ?? '',
        client_id: userData?.client_id ?? ''
      })
      setUserData({ ...userData, token: res?.token },)
      setLocalData('USER', res)
      console.log('kamal', res)
      if (res?.isSuccessful) {
        setCurrentStep(() => {
          const array = [...currentStep];
          array.push(array[array.length - 1] + 1);
          return array;
        });
      }
      else {
        Alert.alert('some error occured');
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
    loader
  };
};

export default BasicInformationController;
