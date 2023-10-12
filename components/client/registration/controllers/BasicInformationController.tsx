import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import UserDetailViewController from "./UserDetailViewController";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const [isGetDetail, setIsGetDetail] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onUpdateUserProfile, onCreateCreditCardDetails, onGetCreditCard } = AuthServicesClient()
  const [isGetCardDetails, setIsGetCardDetails] = useState(false);
  const [isCardDetails, setIsCardDetails] = useState(false);
  const [a, setA] = useState('');
  const { userData, setUserData } = UseUserContext()
  const { } = UserDetailViewController();
  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        if (userData.firstname && userData.lastname && userData.phone_number) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        } else {
          Alert.alert('Please fill all the fields')
        }
      }
      if (currentStep[currentStep.length - 1] === 1) {
        if (userData.address && userData.date_of_birth && userData.id_number) {
          // setIsLoading(true)
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
            client_id: userData?.client_id ?? "",
            id_number: userData?.id_number ?? ""
          });
          setUserData({ ...userData, isSuccessful: res?.isSuccessful })
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
            Alert.alert('some error occurred');
          }
        } else {
          Alert.alert('Please fill all the fields')
        }
      }
      // setIsLoading(false)
    }
    if (currentStep[currentStep.length - 1] === 2) {
      console.log("credit_card_number", userData.expire_date, userData.cvv)

      if (userData.credit_card_number && userData.expire_date) {
        setIsLoading(true)
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
          setIsGetDetail(true)
          const getCredit = onGetCreditCard({ client_id: a?.toString() }).then((ur) => { return ur })
          console.log('getCredit', a?.toString())
          setIsGetCardDetails(true)
          setIsCardDetails(true)
          setIsLoading(false)
        }
        else {
          Alert.alert('some error occured+++');
        }
      }
      else {
        console.log('cvhjckvhbno data')
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
    isLoading,
    isCardDetails,
    isGetCardDetails,
    isGetDetail
  };
};


export default BasicInformationController
