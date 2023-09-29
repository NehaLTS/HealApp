import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../../component/common/Button";
import { colors } from "../../designToken/colors";
import { dimens } from "../../designToken/dimens";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import logo from "../../assets/icon/logo.png";
import IntroController from "./IntroController";
import { getTexts } from "../../libs/OneSkyHelper";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import Header from "../../component/common/Header";
import { fontSize } from "../../designToken/fontSizes";

const IntroScreen = () => {
  const { continueAsClient } = IntroController();
  const { languageCode } = useTranslationContext();
  const { intro } = getTexts(languageCode);

  return (
    <>
    <Header />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
          <Text style={styles.welcomeText}>{intro.welcome_heal}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={intro.continue_client}
            isPrimary
            onPress={continueAsClient}
          />
          <Button title={intro.continue_provider} onPress={continueAsClient} />
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
    paddingHorizontal: getWidth(dimens.marginMd),
  },
  logoContainer: {
    alignSelf: "center",
    flex: 0.4,
    justifyContent:'center'
  },
  logo: {
  width: getWidth(dimens.imageLg),
  height: getHeight(dimens.imageLg)
  },
  welcomeText: {
    fontSize: getHeight(fontSize.headingLg),
    color: colors.black,
    alignSelf: "center",
    flex:0.4
  },
  buttonContainer: {
    gap: getHeight(fontSize.headingLg),
    flex: 0.2,
  },
});
