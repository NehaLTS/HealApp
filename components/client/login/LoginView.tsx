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
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

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
<<<<<<< HEAD
          style={styles.forgotPassword}
          title={t("forgot_password")}
        />
        <Button
          title={isSigninSelected? t("sign_in")  : t("sign_up")}
=======
          title={t("forgot_password")}
          containerStyle={styles.forgotPassword}
        />
        <Button
          title={isSigninSelected ? t("sign_in") : t("sign_up")}
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={handleSignIn}
        />
      </View>
      <View style={styles.footerContainer}>
<<<<<<< HEAD
        <Text style={styles.signInVia}>{t("or_sign_in_via")}</Text>
=======
        <Text style={styles.signInVia} title={t("or_sign_in_via")} />
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
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
<<<<<<< HEAD
    textAlign: "center",
    paddingVertical: getHeight(dimens.paddingS),
=======
    paddingVertical: getHeight(dimens.paddingS),
    alignSelf:'center'
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.18,
  },
  signInVia: {
    letterSpacing: getWidth(0.5),
  },
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.paddingL),
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
