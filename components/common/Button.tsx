import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import {
  Animated,
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
const Button = ({
  title,
  isPrimary,
  isSmall,
  style,
  width,
  fontSized,
  height,
  ...props
}: {
  title: string;
  isPrimary?: boolean;
  isSmall?: boolean;
  style?: StyleProp<ViewStyle>;
  fontSized?:number
  height?:number
  width?: DimensionValue;
} & TouchableOpacityProps) => {
  const scaleInAnimated = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.timing(scaleInAnimated, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleInAnimated, {
      toValue: 0.9,
      duration: 150,
      useNativeDriver: true,
    }).start(() => handlePressIn());
  };

  const scaleTransformationStyle = {
    transform: [{ scale: scaleInAnimated }],
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        scaleTransformationStyle,
        style,
        {
          width: isSmall ? "auto" : "100%",
          borderColor: isPrimary ? colors.primary : colors.black,
          backgroundColor: isPrimary ? colors.primary : colors.transparent,
          minWidth: width ?? '38%',
          height: height ?? getHeight(dimens.buttonHeight)
        },
      ]}
      {...props}>
      <Text
        style={[
          styles.buttonTitle,
          {
            color: isPrimary ? colors.white : colors.black,
            fontFamily: isSmall || !isPrimary ? fontFamily.regular : fontFamily.semiBold,
            fontSize: fontSized ? fontSized : getHeight(24),
         
          }
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: getWidth(dimens.borderThin),
    alignItems: "center",
    justifyContent: "center",
    height: getWidth(dimens.buttonHeight),
    borderRadius: getWidth(dimens.marginS / dimens.borderBold),
    zIndex: 1,
  },
  buttonTitle: {
    fontSize: getWidth(fontSize.heading),
    lineHeight: getHeight(dimens.marginL),
  },
});

export default Button;
