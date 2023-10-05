import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import IntroController from "../../screens/intro/IntroController";
import { colors } from "designToken/colors";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import logo from "assets/icon/logo.png";

// TODO: Need to change dropdown UI later
const Header = ({ title, isHideTitle }: { title?: string;isHideTitle?: boolean }) => {
  const { isLanguageChanged, onChangeLanguage, handleLanguageChange } = IntroController();

  return (
    <View style={[styles.headerContainer, { justifyContent: isHideTitle ? 'flex-end' : 'space-between'}]}>
      {title?.length && (
        <>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    {  /** TODO: Update the title according to selected language  */}
      <Text style={styles.headerRight} onPress={onChangeLanguage}>
        {"EN"}
      </Text>
      {isLanguageChanged && (
      //  TODO: Update this code in optimized way
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
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    width: "100%",
  },
  language: {
    color: colors.black,
    alignSelf: "flex-end",
    padding: getHeight(dimens.borderThin),
    fontSize: getHeight(fontSize.textL),
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(125), //TODO: should define sizes for every Width
    height: getHeight(140), //TODO: should define sizes for every Height
    padding: getHeight(dimens.paddingXs),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(dimens.marginS),
    right: getHeight(dimens.sideMargin),
    backgroundColor: colors.offWhite,
    top: dimens.marginL + dimens.marginS,
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(dimens.imageS),
    marginLeft: getWidth( dimens.sideMargin)
  },
  title: {
    fontSize: fontSize.headingL,
    color: colors.black,
  },
  headerRight: {
    color: colors.black,
    padding: getHeight(dimens.sideMargin),
    fontSize: getHeight(fontSize.textL),
  },
});
