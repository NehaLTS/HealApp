import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getWidth } from 'libs/StyleHelper';
import { useTranslation } from "react-i18next";

const LoaderText = () => {
  const {t} = useTranslation();
  return (
    <Text style={styles.loaderText}>{t("loader")}</Text>
  )
}

export default LoaderText

const styles = StyleSheet.create({
    loaderText: {
        fontSize: fontSize.textL,
        color: colors.black,
        letterSpacing: getWidth(0.5),
      },
})