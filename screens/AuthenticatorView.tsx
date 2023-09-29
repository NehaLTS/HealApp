import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../assets/icon/logo.png";
import Header from "../component/common/Header";
import TextButton from "../component/common/TextButton";
import { colors } from "../designToken/colors";
import { dimens } from "../designToken/dimens";
import { fontSize } from "../designToken/fontSizes";
import { getHeight, getWidth } from "../libs/StyleHelper";
import LoginView from "../component/client/login/LoginView";
import { getTexts } from "../libs/OneSkyHelper";
import { useTranslationContext } from "../contexts/UseTranslationsContext";

const AuthenticatorView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  return (
    <>
      <Header />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.toggleContainer}>
            <TextButton title={signIn.sign_in} isActive />
            <TextButton title={signIn.sign_up}  />
          </View>
          <Text style={styles.loginText}>{signIn.client_login}</Text>
        </View>
        <View style={styles.inputContainer}>
          <LoginView />
          <View style={styles.footer}>
            <Text style={styles.guestText}>{signIn.guest_entrance}</Text>
            <TextButton
              title={signIn.switch_to_provider}
              fontSize={getHeight(fontSize.textXl)}
              style={[styles.switchProvider]}
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
    paddingHorizontal: getWidth(dimens.marginMd),
  },
  container: {
    position: "relative",
    flex: 0.35,
  },
  imageContainer: {
    alignItems: "center",
  },
  logo: {
    width: getWidth(dimens.imageMd),
    height: getHeight(dimens.imageMd),
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
    alignSelf: "center",
    paddingTop: getHeight(dimens.marginSm),
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
    flex:0.1
  },
  switchProvider: {
    color: colors.primary,
  },
});
