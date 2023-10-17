import Button from "common/Button";
import Input from "common/Input";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LoginViewController from "./LoginViewController";

const LoginView = ({ isSigninSelected }: { isSigninSelected: boolean }) => {
  const { t } = useTranslation();
  const {
    handleSignIn,
    email,
    password,
    emailError,
    passwordError,
    isLoading,
    onChangeEmail,
    onBlurEmail,
    emailRef,
    passwordRef,
    onChangePassword,
    onBlurPassword
  } = LoginViewController();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)

  return (
    <>
      <View style={styles.inputContainer}>
        {isLoading|| isLoadingGoogle && (<ActivityIndicator style={styles.loading} size={"large"} />)}
        <Input
         ref={emailRef}
          placeholder={t("email")}
          defaultValue={emailRef.current.value}
          errorMessage={emailError}
          onChangeText={onChangeEmail}
          type="emailAddress"
          inputValue={emailRef.current.value}
          onBlur={onBlurEmail}
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
          onClearInputText={() => emailRef.current.clear()}
        />

        <Input
          ref={passwordRef}
          placeholder={t("password")}
          type="password"
          defaultValue={passwordRef.current.value}
          errorMessage={passwordError}
          onChangeText={onChangePassword}
          inputStyle={styles.password}
          inputValue={passwordRef.current.value}
          onSubmitEditing={onBlurPassword}
          returnKeyType={"done"}
          onClearInputText={() => passwordRef.current.clear()}
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
          disabled={(emailRef.current.value && passwordRef.current.value) === undefined || (passwordError.length > 0 || emailError.length > 0)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text title={t("or_sign_in_via")} />
        <GetSignInFooter loading={setIsLoadingGoogle} />
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
  loading: {
    left: '44%',
    top: '13%',
    position: 'absolute',
    zIndex: 1
  },
});

//TODO: Better way to use it with Signin as well as Signup as footer
export const GetSignInFooter = ({loading}:any) => {
  const images = [
    { url: require("assets/icon/google.png") },
    { url: require("assets/icon/facebook.png") },
    { url: require("assets/icon/apple.png") },
  ];
  const { onSelectSocialAuth, isLoading } = LoginViewController();
  loading(isLoading)
  return (
    <>
      {images.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectSocialAuth(index)}>
          <Image source={item.url} style={styles.images} />
        </TouchableOpacity>
      ))}
    </>
  );
};
