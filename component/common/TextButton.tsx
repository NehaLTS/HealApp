import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { getHeight } from "../../libs/StyleHelper";

const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize,
  style,
}: {
  title: string;
  onPress: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        { fontSize: fontSize ?? getHeight(24) },
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
    color: "#000",
  },
});
