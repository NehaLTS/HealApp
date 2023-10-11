import { useNavigation } from "@react-navigation/native";
import Button from "common/Button";
import Stepper from "common/Stepper";
import Header from "components/common/Header";
import Text from "components/common/Text";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getWidth } from "libs/StyleHelper";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";
import UserAddressView from "./UserAddressView";
import UserDetailView from "./UserDetailView";
import UserPaymentView from "./UserPaymentView";

//TODO: static strings are changed after setup i18
const BasicInformation = () => {
  const navigation = useNavigation();
  const {t} = useTranslation()
  const { currentStep, onPressNext, onPressBack } = BasicInformationController({
    totalSteps: 3,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('registration')} />,
    });
  }, [navigation]);
  const isCurrentStep = currentStep[currentStep.length - 1]
  const isLoading = false; //TODO: need to change after binding data
  const isCardDetails = false; //TODO: need to change after binding data

  return (
    <View style={styles.container}>
      <Stepper currentStep={currentStep} totalStep={3} />
      <View style={styles.inputContainer}>
        {isCurrentStep === 0 ? <UserDetailView /> : isCurrentStep === 1 ? <UserPaymentView /> : <UserPaymentView />}
      </View>
      <View
        style={[
          styles.footerContainer,
          {justifyContent: isLoading || isCardDetails ? "center" : "space-between"}
        ]}>
        {!isLoading && !isCardDetails ? (
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
            title={isLoading ? t("cancel") : t("start_using_heal")}
            isPrimary
            isSmall
            style={{paddingHorizontal: !isLoading ? getWidth(20) : 0}}
          />
        )}
      </View>
      {currentStep[currentStep.length - 1] === 2 && !isLoading && !isCardDetails && (
         <Text style={styles.skipLaterText} title={t('skip_for_later')} />
      )}
    </View>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    flex: 0.12
  },
  skipLaterText: {
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),
    flex: 0.08,
    alignSelf:'center'
  },
  inputContainer: {
    flex: 0.75,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
