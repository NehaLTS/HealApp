import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { getWidth } from "../../../../libs/StyleHelper";
import Button from "../../../common/Button";
import Tabs from "../../../common/Tabs";
import BasicInformationController from "../controllers/BasicInformationController";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { getTexts } from "../../../../libs/OneSkyHelper";
import UserDetail from "./UserDetail";
import UserAddress from "./UserAddress";
import UserPayment from "./UserPayment";

const BasicInformation = () => {
  const { languageCode } = useTranslationContext();
  const { currentStep, onPressNext, onPressBack } = BasicInformationController({
    totalSteps: 3,
  });
  const { registration } = getTexts(languageCode);

  return (
    <>
      <Tabs currentStep={currentStep} totalStep={3} />
      <View style={styles.inputContainer}>
        {currentStep === 0 ? ( 
          <UserDetail />
        ) : currentStep === 1 ? (
          <UserAddress />
        ) : (
          <UserPayment />
        )}
      </View>
      <View style={styles.footerContainer}>
        <Button title={registration.back} isSmall onPress={onPressBack} />
        <Button
          title={registration.next}
          isPrimary
          isSmall
          onPress={onPressNext}
        />
      </View>
      {currentStep === 2 && (
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
    justifyContent: "space-between",
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
