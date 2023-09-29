import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IntroController from "../../screens/intro/IntroController";
import { colors } from "../../designToken/colors";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { dimens } from "../../designToken/dimens";

const Header = () => {
  const { isChangeLanguage, onChangeLanguage, handleLanguageChange } =
    IntroController();
  return (
    <>
    <View
      style={{
        position: "relative",
        paddingHorizontal: getWidth(dimens.marginMd),
        paddingVertical: getHeight(10),
        backgroundColor: colors.white
      }}
    >
      <Text style={styles.language} onPress={onChangeLanguage}>
        EN
      </Text>

      
    </View>
    {isChangeLanguage && (
        <View style={styles.languageContainer}>
          <Text
            style={styles.language}
            onPress={() => handleLanguageChange("en")}
          >
            English
          </Text>
          <Text
            style={styles.language}
            onPress={() => handleLanguageChange("he")}
          >
            עִברִית
          </Text>
          <Text
            style={styles.language}
            onPress={() => handleLanguageChange("ar")}
          >
            العربي
          </Text>
          <Text
            style={styles.language}
            onPress={() => handleLanguageChange("ru")}
          >
            русский
          </Text>
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  language: {
    color: colors.black,
    alignSelf: "flex-end",
    padding: getHeight(5),
    fontSize: getHeight(16),
    paddingRight: 0,
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(125),
    height: getHeight(140),
    padding: getHeight(6),
    borderWidth: getHeight(1),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(10),
    right: getHeight(16),
    backgroundColor: colors.offWhite,
    top: "5%",
  },
});
