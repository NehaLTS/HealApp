import React, { useLayoutEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../../components/common/Button";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { getHeight, getWidth } from "libs/StyleHelper";
import logo from "assets/icon/logo.png";
import IntroController from "./IntroController";
import Header from "../../components/common/Header";
import { fontSize } from "../../designToken/fontSizes";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import { getTexts } from "../../libs/OneSkyHelper";

const IntroScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { continueAsClient, continueAsProvider } = IntroController();
  const { languageCode } = useTranslationContext();
  const { intro } = getTexts(languageCode);
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.welcomeText}>{t("welcome_heal")}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={t("continue_client")}
            isPrimary
            onPress={continueAsClient}
          />
          <Button title={t("continue_provider")} onPress={continueAsClient} />
        </View>
      </View>
    </>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  logoContainer: {
    alignSelf: "center",
    flex: 0.4,
    justifyContent: 'center'
  },
  logo: {
    width: getWidth(dimens.imageL),
    height: getHeight(dimens.imageL)
  },
  welcomeText: {
    fontSize: getHeight(fontSize.headingL),
    color: colors.black,
    alignSelf: "center",
    flex: 0.4
  },
  buttonContainer: {
    gap: getHeight(fontSize.headingL),
    flex: 0.2,
  },
});
