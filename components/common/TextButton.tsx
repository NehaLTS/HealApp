import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { getHeight } from "../../libs/StyleHelper";
import { colors } from "../../designToken/colors";
import { fontSize } from "../../designToken/fontSizes";

const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize: fs,
  style,
}: {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        { fontSize: fs ?? getHeight(fontSize.heading) },
        isActive && { textDecorationLine: "underline" },
      ]}
      onPress={onPress}
    >
      {title}
    </Text>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
  },
});
