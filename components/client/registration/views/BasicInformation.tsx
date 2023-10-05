import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "designToken/colors";
import { fontSize } from "designToken/fontSizes";
import { getWidth } from "libs/StyleHelper";
import Button from "common/Button";
import BasicInformationController from "../controllers/BasicInformationController";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { getTexts } from "libs/OneSkyHelper";
import UserDetail from "./UserDetail";
import UserAddress from "./UserAddress";
import UserPayment from "./UserPayment";
import Stepper from "common/Stepper";

//TODO: static strings are changed after setup i18
const BasicInformation = () => {
  const { languageCode } = useTranslationContext();
  const { currentStep, onPressNext, onPressBack } = BasicInformationController({
    totalSteps: 3,
  });
  const { registration, common } = getTexts(languageCode);
  const isLoadingCard = false; //TODO: need to change after binding data
  const isCardDetails = false; //TODO: need to change after binding data

  return (
    <>
      <Stepper currentStep={currentStep} totalStep={3} />
      <View style={styles.inputContainer}>
        {currentStep[currentStep.length - 1] === 0 ? (
          <UserDetail />
        ) : currentStep[currentStep.length - 1] === 1 ? (
          <UserAddress />
        ) : (
          <UserPayment />
        )}
      </View>
      <View
        style={[
          styles.footerContainer,
          {
            justifyContent:
              (isLoadingCard || isCardDetails) ? "center" : "space-between",
          },
        ]}
      >
        {(!isLoadingCard && !isCardDetails) ? (
          <>
            <Button title={registration.back} isSmall onPress={onPressBack} />
            <Button
              title={registration.next}
              isPrimary
              onPress={onPressNext}
              isSmall
            />
          </>
        ) : (
          <Button
            title={isLoadingCard ? common.cancel : registration.start_using_heal}
            isPrimary
            width={isLoadingCard ? '35%' : '65%'}
          />
        )}
      </View>
      {currentStep[currentStep.length - 1] === 2 && !isLoadingCard && !isCardDetails && (
        <Text style={styles.skipLaterText}>{registration.skip_for_later}</Text>
      )}
    </>
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
    flex: 0.75,
  },
});
