import logo from "assets/icon/logo.png";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LocalizationController from "./LocalizationController";

// TODO: Need to change dropdown UI later
const Header = ({ title, isHideTitle }: { title?: string; isHideTitle?: boolean }) => {
  const [currentLanguage, setCurrentLanguage ] = useState('EN')
  const { isLanguageChanged, onChangeLanguage, handleLanguageChange, setIsLanguageChanged } = LocalizationController();

  return (
    <View style={[styles.headerContainer, { justifyContent: isHideTitle ? 'flex-end' : 'space-between' }]}>
      {title?.length && (
        <>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
        </>
      )}
      {  /** TODO: Update the title according to selected language  */}
      <Text style={styles.headerRight} onPress={onChangeLanguage}>
        {currentLanguage}
      </Text>
      {isLanguageChanged && (
        //  TODO: Update this code in optimized way
        <View style={styles.languageContainer}>
          <Text
            style={[styles.language,{color: currentLanguage ==="EN" ? colors.primary : colors.black}]}
            onPress={() => {setCurrentLanguage('EN') ;handleLanguageChange("en"); setIsLanguageChanged(false)}}
          >
            English
          </Text>
          <Text
             style={[styles.language,{color: currentLanguage ==="HE" ? colors.primary : colors.black}]}
            onPress={() => {setCurrentLanguage('HE') ;handleLanguageChange("he"); setIsLanguageChanged(false)}}
          >
            עִברִית
          </Text>
          <Text
             style={[styles.language,{color: currentLanguage ==="AR" ? colors.primary : colors.black}]}
            onPress={() => {setCurrentLanguage('AR') ;handleLanguageChange("ar"); setIsLanguageChanged(false)}}
          >
            العربي
          </Text>
          <Text
             style={[styles.language,{color: currentLanguage ==="RU" ? colors.primary : colors.black}]}
            onPress={() => {setCurrentLanguage('RU') ;handleLanguageChange("ru"); setIsLanguageChanged(false)}}
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
    alignSelf: "flex-end",
    padding: getHeight(dimens.borderThin),
    fontSize: getHeight(fontSize.textL),
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(120), //TODO: should define sizes for every Width
    height: getWidth(142), //TODO: should define sizes for every Height
    padding: getWidth(dimens.marginS),
    maxWidth: getWidth(120),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(dimens.marginS),
    right: getHeight(dimens.sideMargin),
    backgroundColor: colors.offWhite,
    top: dimens.marginL + dimens.marginS,
    justifyContent:'space-between'
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(dimens.imageS),
    marginLeft: getWidth(dimens.sideMargin),
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
