import LoginViewController from "LoginViewController";
import Button from "common/Button";
import Input from "common/Input";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const LoginView = ({ isSigninSelected }: { isSigninSelected: boolean }) => {
  const { t } = useTranslation();
  const {
    validateEmail,
    setEmail,
    setPassword,
    handleSignIn,
    validatePassword,
    email,
    password,
    emailError,
    passwordError,
    isLoading,
  } = LoginViewController();
  return (
    <>
      <View style={styles.inputContainer}>
        {isLoading && (<ActivityIndicator style={styles.loading} size={"large"} /> )}
        <Input
          placeholder={t("email")}
          value={email}
          errorMessage={emailError}
          onChangeText={setEmail}
          type="emailAddress"
          inputValue={email}
          onBlur={validateEmail}
          onClearInputText={() => setEmail("")}
        />

        <Input
          placeholder={t("password")}
          type="password"
          value={password}
          errorMessage={passwordError}
          onChangeText={setPassword}
          inputStyle={styles.password}
          inputValue={password}
          onSubmitEditing={validatePassword}
          onClearInputText={() => setPassword("")}
        />
        <TextButton
          fontSize={getWidth(fontSize.textS)}
          isActive
          title={t("forgot_password")}
          containerStyle={styles.forgotPassword}
        />
        <Button
          title={t("sign_in")}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={handleSignIn}
          disabled={ (email && password) ==="" || (passwordError.length > 0 || emailError.length > 0)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text title={t("or_sign_in_via")} />
        {getSignInFooter()}
      </View>
    </>
  );
};
export default LoginView;
const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.7,
  },
  images: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageS),
    resizeMode: "center",
  },
  forgotPassword: {
    paddingVertical: getHeight(dimens.paddingS),
    alignSelf: "center",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.18,
  },
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.marginM),
  },
  password: {
    marginTop: dimens.paddingL + dimens.borderBold,
  },
  loading: {
    left: "44%",
    top: "13%",
    position: "absolute",
    zIndex: 1,
  },
  email: {
    marginTop: dimens.paddingL,
  },
});

//TODO: Better way to use it with Signin as well as Signup as footer
export const getSignInFooter = () => {
  const images = [
    { url: require("assets/icon/google.png") },
    { url: require("assets/icon/facebook.png") },
    { url: require("assets/icon/apple.png") },
  ];
  const { onSelectSocialAuth, isLoading: socialAuthLoading } = LoginViewController();
  return (
    <>
      {socialAuthLoading && (<ActivityIndicator style={{
    left: "44%",
    top: "-335%",
    position: "absolute",
    zIndex: 1,
  }} size={"large"} />)}
      {images.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectSocialAuth(index)}>
          <Image source={item.url} style={styles.images} />
        </TouchableOpacity>
      ))}
    </>
  );
};
