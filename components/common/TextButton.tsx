import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { colors } from "designToken/colors";
import { fontSize } from "../../designToken/fontSizes";

const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize: fs,
  style,
  isCapitalize
}: {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  isCapitalize?: boolean
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.text,
          style,
          { fontSize: fs ?? getHeight(fontSize.heading) },
          isActive && { textDecorationLine: "underline" },
        ]}
      >
        {isCapitalize ? title?.toLocaleUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    letterSpacing: getWidth(0.5)
  },
});
