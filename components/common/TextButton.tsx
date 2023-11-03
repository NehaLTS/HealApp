import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { fontSize } from '../../designToken/fontSizes';
import { getHeight } from '../../libs/StyleHelper';
import Text from './Text';

const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize: fs,
  style,
  isCapitalize,
  containerStyle,
}: {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  isCapitalize?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text
        style={[
          style,
          { fontSize: fs ?? getHeight(fontSize.heading) },
          isActive && { textDecorationLine: 'underline' },
        ]}
        title={isCapitalize ? title?.toLocaleUpperCase() : title}
      />
    </TouchableOpacity>
  );
};

export default TextButton;
