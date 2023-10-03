import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/icon/logo.png";
import LoginView from "../../components/client/login/LoginView";
import Header from "../../components/common/Header";
import TextButton from "../../components/common/TextButton";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import { colors } from "../../designToken/colors";
import { dimens } from "../../designToken/dimens";
import { fontSize } from "../../designToken/fontSizes";
import { getTexts } from "../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import AuthenticatorController from "./AuthenticatorController";

const AuthenticatorView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { loginRegisterToggle, isSignInButton } = AuthenticatorController()

  return (
    <>
      <Header />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.toggleContainer}>
            <TextButton title={signIn.sign_in} isActive={isSignInButton} onPress={loginRegisterToggle} />
            <TextButton title={signIn.sign_up} isActive={!isSignInButton} onPress={loginRegisterToggle}  />
          </View>
          <Text style={styles.loginText}>{signIn.client_login}</Text>
        </View>
        <View style={styles.inputContainer}>
          <LoginView isSignInButton={isSignInButton} />
          <View style={styles.footer}>
            <Text style={styles.guestText}>{signIn.guest_entrance}</Text>
            <TextButton
              title={signIn.switch_to_provider}
              fontSize={getHeight(fontSize.textXl)}
              style={styles.switchToProviderText}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default AuthenticatorView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  container: {
    position: "relative",
    flex: 0.35,
  },
  logo: {
    width: getWidth(dimens.imageM),
    height: getHeight(dimens.imageM),
    alignSelf:'center'
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
    alignSelf: "center",
    paddingTop: getHeight(dimens.marginS),
  },
  guestText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
  },
  inputContainer: {
    flex: 0.65,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.1
  },
  switchToProviderText: {
    color: colors.primary,
  },
});
