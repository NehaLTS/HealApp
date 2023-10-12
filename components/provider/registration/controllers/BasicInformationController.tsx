import { useNavigation } from "@react-navigation/native";
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
  const [selectedImage, setSelectedImage] = useState();
  const { OnUpdateProviderUserDetails } = AuthServicesProvider()
  const { userData } = UseUserContext()
  const onPressNext = async () => {

    if (currentStep.length !== totalSteps) {
      setCurrentStep(() => {
        const array = [...currentStep];
        array.push(array[array.length - 1] + 1);
        return array;
      });
      if (currentStep[currentStep.length - 1] === 2) {
        const resUpdateUserProfile = await OnUpdateProviderUserDetails({
          firstname: "aditya",
          lastname: "sharma",
          address: "245254265",
          city: "ambala",
          state: "haryana",
          country: "india",
          phone_number: "9878787878",
          profile_picture: "",
          provider_id: "10",
          provider_type_id: "1",
          license_number: "45345346",
          upload_license_picture: "",
          bank_name: "axis",
          branch: "ambala",
          business_registration_number: "4623478678678242456",
          account: "42342334534545"
        })
        setLocalData("USER", resUpdateUserProfile)
        console.log("resUpdateUserProfile", resUpdateUserProfile)
      }

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
    selectedImage
  };
};

export default BasicInformationController;
