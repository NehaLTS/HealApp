<<<<<<< HEAD
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
=======
import React from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
import { fontSize } from "../../designToken/fontSizes";
import { getHeight } from "../../libs/StyleHelper";
import Text from "./Text";

const TextButton = ({
  title,
  onPress,
  isActive,
  fontSize: fs,
  style,
<<<<<<< HEAD
  isCapitalize
=======
  isCapitalize,
  containerStyle
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
}: {
  title: string;
  onPress?: () => void;
  isActive?: boolean;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  isCapitalize?: boolean
<<<<<<< HEAD
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={[
          styles.text,
=======
  containerStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text
        style={[
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
          style,
          { fontSize: fs ?? getHeight(fontSize.heading) },
          isActive && { textDecorationLine: "underline" },
        ]}
<<<<<<< HEAD
      >
        {isCapitalize ? title?.toLocaleUpperCase() : title}
      </Text>
=======
        title={isCapitalize ? title?.toLocaleUpperCase() : title}
      />
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
    </TouchableOpacity>
  );
};

export default TextButton;

<<<<<<< HEAD
const styles = StyleSheet.create({
  text: {
    color: colors.black,
    letterSpacing: getWidth(0.5)
  },
});
=======
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
