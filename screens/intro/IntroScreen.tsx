import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import Button from "../../component/common/Button";
import { colors } from "../../designToken/colors";
import { dimens } from "../../designToken/dimens";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import logo from "../../assets/icon/logo.png";
import IntroController from "./IntroController";
import { getTexts } from "../../libs/OneSkyHelper";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";

const IntroScreen = () => {
  const { isChangeLanguage, onChangeLanguage, continueAsClient, handleLanguageChange } = IntroController();
  const { languageCode } = useTranslationContext()
  const { intro } = getTexts(languageCode)

  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Text
          style={styles.language}
          onPress={onChangeLanguage}
        >
          EN
        </Text>

        {isChangeLanguage && (
          <View style={styles.languageContainer}>
            <Text
              style={styles.language}
              onPress={() => handleLanguageChange('en')}
            >
              English
            </Text>
            <Text
              style={styles.language}
              onPress={() => handleLanguageChange('he')}
            >
              עִברִית
            </Text>
            <Text
              style={styles.language}
              onPress={() => handleLanguageChange('ar')}
            >
              العربي
            </Text>
            <Text
              style={styles.language}
              onPress={() => handleLanguageChange('ru')}
            >
              русский
            </Text>
          </View>
        )}
      </View>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcomeText}>{intro.welcome_heal}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={intro.continue_client} isPrimary onPress={continueAsClient} />
        <Button title={intro.continue_provider} onPress={continueAsClient} />
      </View>
    </View>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginMd),
  },
  language: {
    color: colors.black,
    alignSelf: "flex-end",
    padding: getHeight(5),
    fontSize: getHeight(16),
    paddingRight: 0,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  logo: {
    width: getWidth(247),
    height: getHeight(252),
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: getHeight(26),
    color: colors.black,
    alignSelf: "center",
    paddingTop: getHeight(20),
  },
  buttonContainer: {
    gap: getHeight(30),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: getHeight(25),
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(125),
    maxWidth: getWidth(125),
    height: getHeight(140),
    maxHeight: getHeight(142),
    padding: getHeight(6),
    borderWidth: getHeight(1),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(10),
    alignItems: "flex-end",
    right: 0,
    backgroundColor: colors.white,
    top: "88%",
  },
});
