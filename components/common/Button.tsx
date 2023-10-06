import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
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
  ...props
}: {
  title: string;
  isPrimary?: boolean;
  isSmall?: boolean;
  style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          width: isSmall ? "auto" : "100%",
          borderColor: isPrimary ? colors.primary : colors.black,
          backgroundColor: isPrimary ? colors.primary : colors.transparent
        },
      ]}
      {...props}
    >
      <Text
        style={[
          styles.buttonTitle,
          {
            color: isPrimary ? colors.white : colors.black,
            fontWeight:
              isSmall || !isPrimary
                ? fontWeight.light
                : fontWeight.semiBold,
          },
        ]}
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
    borderRadius: getHeight(dimens.marginS / dimens.borderBold),
    zIndex: 1,
    minWidth: '38%'
  },
  buttonTitle: {
    fontSize: getWidth(fontSize.heading),
    lineHeight: getHeight(dimens.marginL),
  },
});

export default Button;
