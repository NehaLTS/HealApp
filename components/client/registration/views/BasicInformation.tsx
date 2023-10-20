import { useNavigation } from "@react-navigation/native";
import Stepper from "common/Stepper";
import Header from "components/common/Header";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { getWidth } from "libs/StyleHelper";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import UserAddressView from "./UserAddressView";
import UserDetailView from "./UserDetailView";
import UserPaymentView from "./UserPaymentView";
import { RegistrationContext, registrationStep } from "contexts/UseRegistrationContext";

//TODO: static strings are changed after setup i18
const BasicInformation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation()
  const stepperStep = [1]

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('registration')} />,
    });
  }, [navigation]);

  const isCurrentStep = stepperStep[stepperStep.length - 1]
  const [currentStep, setCurrentStep]=useState<registrationStep>('details')

  return (
    <RegistrationContext.Provider value={{currentStep, setCurrentStep}}>
    <View style={styles.container}>
      <Stepper currentStep={currentStep} totalStep={['details','address','payment']} />
      {currentStep === 'details' && <UserDetailView />}
      {currentStep === 'address' &&<UserAddressView />}
      {currentStep === 'payment' &&<UserPaymentView />}
    </View>
    </RegistrationContext.Provider>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
