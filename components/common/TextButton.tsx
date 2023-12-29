import React, { FunctionComponent } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Animated, { AnimatedProps, FadeInLeft } from 'react-native-reanimated';
import { fontSize } from '../../designToken/fontSizes';
import { getHeight } from '../../libs/StyleHelper';
import Text from './Text';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize: fs,
  style,
  isCapitalize,
  containerStyle,
  ...props
}: {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  isCapitalize?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
} & FunctionComponent<AnimatedProps<TouchableOpacity>> &
  TouchableOpacityProps &
  any) => {
  return (
    <AnimatedTouchable onPress={onPress} style={containerStyle} {...props}>
      <Text
        style={[
          style,
          styles.title,
          { fontSize: fs ?? getHeight(fontSize.heading) },
          isActive && { textDecorationLine: 'underline' },
        ]}
        title={isCapitalize ? title?.toLocaleUpperCase() : title}
      />
    </AnimatedTouchable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
  },
});
