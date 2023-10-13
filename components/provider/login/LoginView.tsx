import Button from "common/Button";
import Input from "common/Input";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LoginViewController from "./LoginViewController";

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
  } = LoginViewController();

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={t("email")}
          value={email}
          errorMessage={emailError}
          onChangeText={setEmail}
          type="emailAddress"
          inputValue={email}
          onBlur={validateEmail}
          onClearInputText={()=> setEmail('')}
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
        />
        <TextButton
          fontSize={getWidth(fontSize.textS)}
          isActive
          style={styles.forgotPassword}
          title={t("forgot_password")}
        />
        <Button
          title={isSigninSelected ? t("sign_in") : t("sign_up")}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={handleSignIn}
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
    textAlign: "center",
    paddingVertical: getHeight(dimens.paddingS)
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
    marginTop: dimens.paddingL,
  },
  email:{
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
  const { onSelectSocialAuth } = LoginViewController();
  return images.map((item, index) => (
    <TouchableOpacity key={index} onPress={() => onSelectSocialAuth(index)}>
      <Image source={item.url} style={styles.images} />
    </TouchableOpacity>
  ));
};
