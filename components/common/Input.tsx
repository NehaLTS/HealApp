import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  DimensionValue,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../designToken/colors";
import { fontSize } from "../../designToken/fontSizes";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { dimens } from "../../designToken/dimens";

const Input = ({
  placeholder,
  type,
  inputStyle,
  errorMessage,
  containerWidth,
  ...props
}: {
  placeholder: string;
  type?: 
  | 'creditCardNumber'
  | 'emailAddress'
  | 'fullStreetAddress'
  | 'name'
  | 'nameSuffix'
  | 'telephoneNumber'
  | 'password';
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
  containerWidth?: DimensionValue;
} & TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword(!showPassword);
  const moveText = useRef(new Animated.Value(0)).current;
  const fontSizeAnim = useRef(new Animated.Value(getHeight(16))).current;

  const onFocusHandler = () =>  moveTextTop();
  const onBlurHandler = () => moveTextBottom()

  const moveTextTop = () => {
    Animated.parallel([
      Animated.timing(moveText, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnim, {
        toValue: 12,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const moveTextBottom = () => {
    Animated.parallel([
      Animated.timing(moveText, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnim, {
        toValue: getHeight(16), 
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const labelStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const fontSizeStyle = {
    fontSize: fontSizeAnim,
  };
  return (
    <View>
      <View
        style={[styles.inputContainer, { width: containerWidth ?? "auto" }]}
      >
        <Animated.Text style={[styles.label, labelStyle, fontSizeStyle]}>
          {placeholder}
        </Animated.Text>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholderTextColor={colors.black}
          textContentType={type ?? "password"}
          secureTextEntry={showPassword}
          editable={true}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          blurOnSubmit
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={onShowPassword}>
            <Image
              source={require("../../assets/icon/eyeIcon.png")}
              style={styles.showImage}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorMessage}>{"errorMessage"}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    borderWidth: getWidth(dimens.borderBold),
    borderColor: colors.primary,
    borderRadius: getWidth(10),
    flexDirection: "row",
    height: getHeight(50),
    backgroundColor: colors.offWhite,
  },
  input: {
    fontSize: fontSize.textL,
    padding: getHeight(dimens.paddingXs),
    color: colors.black,
    flex: 1,
  },
  showImage: {
    width: getWidth(24),
    height: getHeight(16),
    marginRight: getHeight(dimens.marginS),
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(4),
  },
  label: {
    position: "absolute",
    top: getHeight(10),
    left: getHeight(8),
    backgroundColor: colors.offWhite,
    color: colors.black,
    paddingHorizontal: getHeight(8)
  },
});

export default Input;
