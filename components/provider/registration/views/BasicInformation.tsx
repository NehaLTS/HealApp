import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View,ActivityIndicator } from "react-native";
import { colors } from "designToken/colors";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import Button from "common/Button";
import BasicInformationController from "../controllers/BasicInformationController";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { getTexts } from "libs/OneSkyHelper";

import Stepper from "common/Stepper";
import { UserContext, UserType } from "contexts/useUserContext";
import { useNavigation } from "@react-navigation/native";
import Header from "components/common/Header";
import { dimens } from "designToken/dimens";
import ProviderDetail from "./ProviderDetail";
import ProviderAddress from "./ProviderAddress";
import ProviderPayment from "./ProviderPayment";
import ProviderServices from "./ProviderServices";
import { t } from "i18next";
import ProviderAddServies from "./ProviderAddServices";
import { UseUserContextProvider } from "contexts/useUserContextProvider";

//TODO: static strings are changed after setup i18
const BasicInformation = () => {
  const navigation = useNavigation();
  // const [userData, setUserData] = React.useState<Partial<UserType>>({});
  const { languageCode } = useTranslationContext();
  const { currentStep, onPressNext, onPressBack,isLoading,setIsLoading } = BasicInformationController({
    totalSteps: 5,
  });
  const { userDataProvider } = UseUserContextProvider()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />,
    });
  }, [navigation]);
  const { registration, common } = getTexts(languageCode);
  const isLoadingCard = false; //TODO: need to change after binding data
  const isCardDetails = false; //TODO: need to change after binding data


  return (
    <View style={styles.container}>
      {isLoading &&<ActivityIndicator style={{position:'absolute', top:'50%', left:'50%', zIndex:1}} color={colors.primary} size={'large'} />}
      <Stepper currentStep={currentStep} totalStep={5} />
      <View style={styles.inputContainer}>
        {currentStep[currentStep.length - 1] === 0 ? (
          <ProviderDetail />
         
        ) : currentStep[currentStep.length - 1] === 1 ? (
          <ProviderAddress />
        ) : currentStep[currentStep.length - 1] === 2 ? ( 
          <ProviderPayment />
        ):currentStep[currentStep.length - 1] === 3 ?(
          (userDataProvider.type_Provider== "Doctor" || userDataProvider.type_Provider== "Nurse")? <ProviderServices/>:<ProviderAddServies/>        ):(
          <ProviderAddServies/>
        )}
      </View>
      <View
        style={[
          styles.footerContainer,
          {
            justifyContent:
              isLoadingCard || isCardDetails ? "center" : "space-between",
          },
        ]}>
        {!isLoadingCard && !isCardDetails ? (
          <>
           <Button title={t('back')} isSmall onPress={onPressBack} width={'30%'} />
            <Button
              title={t("next")}
              isPrimary
              onPress={onPressNext}
              isSmall
              width={'30%'}
            />
          </>
        ) : (
          <Button
            title={
              isLoadingCard ? common.cancel : registration.start_using_heal
            }
            isPrimary
            isSmall
          />
        )}
      </View>
    {currentStep[currentStep.length - 1] === 5 &&
        !isLoadingCard &&
        !isCardDetails && (
          <Text style={styles.skipLaterText}>
            {registration.skip_for_later}
          </Text>
        )}
    </View>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 0.1,
  },
  skipLaterText: {
    color: colors.black,
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),
    flex: 0.1,
  },
  inputContainer: {
    flex: 0.79,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
    paddingTop:getHeight(dimens.marginS)
  },
});
