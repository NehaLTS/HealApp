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
  type?: | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';
  onShowPassword?: () => void;
  inputStyle?: StyleProp<TextStyle>;
  errorMessage?: string
  containerWidth?: DimensionValue
} & TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <View>
      <View style={[styles.inputContainer, { width: containerWidth ?? 'auto' }]}>
        <TextInput
          style={[styles.input, inputStyle]}
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
    borderWidth: getWidth(2),
    borderColor: colors.primary,
    borderRadius: getWidth(10),
    flexDirection: "row",
    height: getHeight(50),
    backgroundColor: colors.offWhite
  },
  input: {
    fontSize: fontSize.textLg,
    padding: getHeight(10),
    color: colors.black,
    flex:1
  },
  showImage: {
    width: getWidth(24),
    height: getHeight(16),
    marginRight: getHeight(10),
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(4),
  },
});

export default Input;
