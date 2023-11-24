import { colors } from 'designToken/colors';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { ReactNode } from 'react';
import {
  Text as RNText,
  StyleProp,
  StyleSheet,
  TextStyle,
  TextProps,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Text as AnimatedTextProps } from 'react-native-reanimated/lib/typescript/Animated';

const Text = ({
  title,
  style,
  children,
  ...props
}: {
  title?: any;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
} & TextProps) => {
  return (
    <RNText {...props} style={[styles.text, style]}>
      {title}
      {children}
    </RNText>
  );
};

export default Text;

export const AnimatedText = ({
  title,
  style,
  children,
  ...props
}: {
  title?: any;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
} & TextProps &
  AnimatedTextProps &
  any) => {
  return (
    <Animated.Text adjustsFontSizeToFit {...props} style={[styles.text, style]}>
      {title}
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.regular,
  },
});
