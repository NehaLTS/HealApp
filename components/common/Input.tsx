
import React, { forwardRef, useRef, useState } from "react";
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
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { fontFamily } from "designToken/fontFamily";

const Input = forwardRef(({
  placeholder,
  type,
  inputStyle,
  errorMessage,
  containerWidth,
  inputValue,
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
  inputValue: string 
} & TextInputProps, ref) => {
  const [showPassword, setShowPassword] = useState(type === "password" ? true : false);
  const moveText = useRef(new Animated.Value(0)).current;
  const fontSizeAnim = useRef(new Animated.Value(getHeight(fontSize.textL))).current;

  const onFocusHandler = () => moveTextTop();
  const onBlurHandler = () => moveTextBottom()

  const moveTextTop = () => {
    Animated.parallel([
      Animated.timing(moveText, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnim, {
        toValue: getHeight(fontSize.textS),
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const moveTextBottom = () => {
    if (inputValue === '' ){
    Animated.parallel([
      Animated.timing(moveText, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(fontSizeAnim, {
        toValue: getHeight(fontSize.textL),
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()};
  };

  const translateY = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const labelStyle = {
    transform: [
      {
        translateY: translateY,
      },
    ],
  };

  const fontSizeStyle = { fontSize: fontSizeAnim };
  return (
    <View>
      <View style={[styles.inputContainer, inputStyle ,{ borderColor: errorMessage? colors.invalid : colors.primary }]}>
        <Animated.Text style={[styles.label, labelStyle, fontSizeStyle]}>
          {placeholder}
        </Animated.Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.black}
          textContentType={type ?? "password"}
          secureTextEntry={showPassword}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          ref={ref as React.LegacyRef<TextInput>}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={ errorMessage ? require("../../assets/icon/error.png") :require("assets/icon/eyeIcon.png")}
              style={styles.showImage}
            />
          </TouchableOpacity>
        )}
          {errorMessage && type !== "password" && (
          <TouchableOpacity >
            <Image
              source={require("../../assets/icon/error.png")}
              style={styles.errorImage}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    flexDirection: "row",
    height: getHeight(dimens.imageS),
    backgroundColor: colors.offWhite,
    minWidth: '20%'
  },
  input: {
    fontSize: fontSize.textL,
    marginLeft: getHeight(dimens.marginS),
    color: colors.black,
    flex: 1,
  },
  showImage: {
    width: getWidth(dimens.marginM+dimens.borderThin),
    height: getHeight(dimens.sideMargin),
    marginRight: getHeight(dimens.sideMargin),
    resizeMode: 'contain',
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
  },
  label: {
    position: "absolute",
    top: getHeight(dimens.marginS + 1),
    left: getHeight(dimens.paddingXs + dimens.borderThin),
    backgroundColor: colors.offWhite,
    color: colors.black,
    paddingHorizontal: getHeight(dimens.paddingXs + dimens.borderBold),
    fontFamily: fontFamily.regular
  },
  errorImage: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.sideMargin),
    marginRight: getHeight(dimens.marginS),
  },
});

export default Input;
