import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IntroController from "../../screens/intro/IntroController";
import { colors } from "../../designToken/colors";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { dimens } from "../../designToken/dimens";
import { fontSize } from "../../designToken/fontSizes";

// TODO: Need to change dropdown UI later
const Header = () => {
  const { isChangeLanguage, onChangeLanguage, handleLanguageChange } =  IntroController();

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
        {'EN'}
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
    padding: getHeight(dimens.borderWidthThick),
    fontSize: getHeight(fontSize.textLg),
    paddingRight: 0,
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(125), //TODO: should define sizes for every Width
    height: getHeight(140), //TODO: should define sizes for every Height
    padding: getHeight(dimens.paddingXs),
    borderWidth: getHeight(dimens.borderWidthThin),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(dimens.marginSm),
    right: getHeight(dimens.paddingMd),
    backgroundColor: colors.offWhite,
    top: dimens.marginLg + dimens.marginSm,
  },
});
