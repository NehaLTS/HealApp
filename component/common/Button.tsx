import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from "react-native";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { fontWeight } from "../../designToken/fontWeights";
const Button = ({
  title,
  isPrimary,
  isSmall,
  style,
  ...props
}: {
  title: string;
  isPrimary?: boolean;
  isSmall?: boolean;
  style?:  StyleProp<ViewStyle>
} & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          width: isSmall ? 'auto'  : '100%',
          borderColor: isPrimary ? "rgba(12, 127, 187, 1) " : "black",
          backgroundColor: isPrimary ? "rgba(12, 127, 187, 1) " : "transparent",
          paddingHorizontal:  getWidth(20), 
        },
      ]}
      {...props}
    >
      <Text
        style={{
          fontSize: getHeight(24),
          color: isPrimary ? "white" : "black",
          lineHeight: getHeight(28),
          fontWeight: (isSmall || !isPrimary) ? fontWeight.light : fontWeight.semiBold,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: getHeight(1),
    alignItems: "center",
    justifyContent: "center",
    height: getHeight(48),
    borderRadius: getHeight(5),
    zIndex: 1,
  },
});

export default Button;
