import { useNavigation } from "@react-navigation/native";
import Button from "common/Button";
import Stepper from "common/Stepper";
import Header from "components/common/Header";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getWidth } from "libs/StyleHelper";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";
import UserAddress from "./UserAddress";
import UserDetail from "./UserDetail";
import UserPayment from "./UserPayment";
import { useTranslation } from "react-i18next";

//TODO: static strings are changed after setup i18
const BasicInformation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  // const [userData, setUserData] = React.useState<Partial<UserType>>({});
  const { currentStep, onPressNext, onPressBack } = BasicInformationController({
    totalSteps: 3,
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />,
    });
  }, [navigation]);

  const isLoadingCard = false; //TODO: need to change after binding data
  const isCardDetails = false; //TODO: need to change after binding data

  return (
    <View style={styles.container}>
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
              isLoadingCard || isCardDetails ? "center" : "space-between",
          },
        ]}>
        {!isLoadingCard && !isCardDetails ? (
          <>
            <Button title={t("back")} isSmall onPress={onPressBack} />
            <Button
              title={t("next")}
              isPrimary
              onPress={onPressNext}
              isSmall
            />
          </>
        ) : (
          <Button
            title={
              isLoadingCard ? t("cancel") : t("start_using_heal")
            }
            isPrimary
            isSmall
          />
        )}
      </View>
      {currentStep[currentStep.length - 1] === 2 &&
        !isLoadingCard &&
        !isCardDetails && (
          <Text style={styles.skipLaterText}>
            {t("skip_for_later")}
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
    flex: 0.75,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
