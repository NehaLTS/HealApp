import { useTranslationContext } from "contexts/UseTranslationsContext";
import { getTexts } from "libs/OneSkyHelper";
import { getWidth } from "libs/StyleHelper";
import React from "react";
import { StyleSheet } from "react-native";
import Text from "./Text";

const LoaderText = () => {
  const { languageCode } = useTranslationContext();
  const { common } = getTexts(languageCode);
  return <Text style={styles.loaderText} title={common.loader} />;
};

export default LoaderText;

const styles = StyleSheet.create({
  loaderText: {
    letterSpacing: getWidth(0.5),
  },
});
