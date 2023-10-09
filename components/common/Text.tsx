import { colors } from "designToken/colors";
import { getWidth } from "libs/StyleHelper";
import React from "react";
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from "react-native";

const Text = ( {title, style}:{title: string, style?: StyleProp<TextStyle>}) => {
  return <RNText style={[styles.text, style]}>{title}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    letterSpacing: getWidth(1),
  },
});
