import { colors } from "designToken/colors";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { Text as RNText, StyleProp, StyleSheet, TextStyle } from "react-native";

const Text = ( {title, style, ...props}:{title: any, style?: StyleProp<TextStyle>}&any) => {
  return <RNText {...props} style={[styles.text, style]}>{title}</RNText>
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.regular
  },
});
