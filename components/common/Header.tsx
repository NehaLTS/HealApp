import logo from "assets/icon/logo.png";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import LocalizationController from "./LocalizationController";
import Text from "./Text";

// TODO: Need to change dropdown UI later
const Header = ({ title, isHideTitle }: { title?: string; isHideTitle?: boolean }) => {
  const {currentLanguage, isLanguageChanged, onChangeLanguage, handleLanguageChange, setIsLanguageChanged } = LocalizationController();

  return (
    <View style={[styles.headerContainer, { justifyContent: isHideTitle ? 'flex-end' : 'space-between' }]}>
      {title?.length && (
        <>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title} title={title} />
        </>
      )}
      {  /** TODO: Update the title according to selected language  */}
      <Text style={styles.headerRight} onPress={onChangeLanguage} title={currentLanguage} />
      {isLanguageChanged && (
        //  TODO: Update this code in optimized way
        <View style={styles.languageContainer}>
          <Text
            style={[styles.language,{color: currentLanguage ==="EN" ? colors.primary : colors.black}]}
            onPress={() => {handleLanguageChange("en"); setIsLanguageChanged(false)}}
            title={'English'}
          />
          <Text
             style={[styles.language,{color: currentLanguage ==="HE" ? colors.primary : colors.black}]}
            onPress={() => {handleLanguageChange("he"); setIsLanguageChanged(false)}}
            title={'עִברִית'}
          />
          <Text
             style={[styles.language,{color: currentLanguage ==="AR" ? colors.primary : colors.black}]}
            onPress={() => {handleLanguageChange("ar"); setIsLanguageChanged(false)}}
            title={'العربي'}
          />
          <Text
             style={[styles.language,{color: currentLanguage ==="RU" ? colors.primary : colors.black}]}
            onPress={() => {handleLanguageChange("ru"); setIsLanguageChanged(false)}}
            title={'русский'}
          />
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
  },
  headerRight: {
    padding: getHeight(dimens.sideMargin),
    fontSize: getHeight(fontSize.textL),
  },
});
