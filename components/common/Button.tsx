import React from "react";
import { DimensionValue, StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { fontWeight } from "designToken/fontWeights";
import { getHeight, getWidth } from "libs/StyleHelper";
const Button = ({
  title,
  isPrimary,
  isSmall,
  style,
  width,
  ...props
}: {
  title: string;
  isPrimary?: boolean;
  isSmall?: boolean;
  style?: StyleProp<ViewStyle>
  width?: DimensionValue
} & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          width: width ?? isSmall ? '30%' :  '100%',
          borderColor: isPrimary ? colors.primary : colors.black,
          backgroundColor: isPrimary ? colors.primary : colors.transparent,
        },
      ]}
      {...props}
    >
      <Text
        style={{
          fontSize: getWidth(fontSize.heading),
          color: isPrimary ? colors.white : colors.black,
          lineHeight: getHeight(dimens.marginL),
          fontWeight: (width || isSmall || !isPrimary) ? fontWeight.light : fontWeight.semiBold,
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: getHeight(dimens.borderThin),
    alignItems: "center",
    justifyContent: "center",
    height: getHeight(dimens.imageS),
    borderRadius: getHeight(dimens.marginS/dimens.borderBold),
    zIndex: 1,
    minWidth: '30%',
    paddingHorizontal: getWidth(dimens.marginM)
  },
});

export default Button;
