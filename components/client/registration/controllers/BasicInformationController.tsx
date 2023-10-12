import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

const BasicInformationController =  ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const { onUpdateUserProfile, onCreateCreditCardDetails,onGetCreditCard } = AuthServicesClient()
  const { userData, setUserData } = UseUserContext()
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isGetCardDetails, setIsGetCardDetails] = useState(false);
  const [isCardDetails, setIsCardDetails] = useState(false);
  const [a, setA] = useState('');

  // useEffect(()=>{
 

  // },[isSuccessful])

  console.log('isGetCardDetailss',isGetCardDetails)
  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        setCurrentStep(() => {
          const array = [...currentStep];
          array.push(array[array.length - 1] + 1);
          return array;
        });
      }
      else if (currentStep[currentStep.length - 1] === 1) {
        console.log("first step")
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
      console.log("ncjkxnvjkn",userData.client_id,userData.token)
      setisLoading(true)
        const res = await onCreateCreditCardDetails({
          credit_card_number: userData?.credit_card_number ?? '',
          expire_date: userData?.expire_date ?? '',
          cvv: userData?.cvv ?? '',
          client_id: userData?.client_id ?? ''
        })
        setUserData({ ...userData, token: res?.token },)
        setLocalData('USER', res)
        console.log('kamal+++++++++++++', res)
        if (res?.isSuccessful) {
          const getCredit= onGetCreditCard({client_id: a?.toString()}).then((ur)=>{return ur})
          console.log('getCredit',a?.toString())
          setIsGetCardDetails(true)
          setIsCardDetails(true)
          setisLoading(false)
        }
        else {
          Alert.alert('some error occured+++');
        }
      }
      else {
        console.log('cvhjckvhbno data')
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
    isLoading,
    isCardDetails,
    isGetCardDetails
  };
};


export default BasicInformationController
