import React, { useState } from "react";
import {
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
  onShowPassword,
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
  onShowPassword?: () => void;
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string
  containerWidth?: DimensionValue
} & TextInputProps) => {
  const [showPassword, setShowPassword] = useState(true);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <View>
      <View style={[styles.inputContainer, inputStyle ,{ width: containerWidth ?? 'auto' }]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.black}
          textContentType={type ?? "password"}
          secureTextEntry={showPassword}
          {...props}
        />
        {type === "password" && (
          <TouchableOpacity onPress={toggleShowPassword}>
            <Image
              source={require("../../assets/icon/eyeIcon.png")}
              style={styles.showImage}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{'errorMessage'}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    borderWidth: getWidth(dimens.borderBold),
    borderColor: colors.primary,
    borderRadius: getWidth(dimens.marginS),
    flexDirection: "row",
    height: getHeight(dimens.imageS),
    backgroundColor: colors.offWhite,
  },
  input: {
    fontSize: fontSize.textL,
    padding: getHeight(dimens.marginS),
    color: colors.black,
    flex:1
  },
  showImage: {
    width: getWidth(dimens.imageS/ dimens.borderBold),
    height: getHeight(dimens.sideMargin),
    marginRight: getHeight(dimens.marginS),
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
  },
});

export default Input;
