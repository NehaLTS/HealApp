import { useNavigation, useRoute } from "@react-navigation/native";
import logo from "assets/icon/logo.png";
import Header from "components/common/Header";
import TextButton from "components/common/TextButton";
import LoginView from "components/provider/login/LoginView";
import RegistrationView from "components/provider/registration/views/RegistrationView";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import NavigationRoutes from "navigator/NavigationRoutes";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import AuthenticatorController from "./AuthenticatorController";

const ProviderAuthenticatorView = () => {
const { languageCode } = useTranslationContext();
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { loginRegisterToggle, isSigninSelected } = AuthenticatorController();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />
    });
  }, [navigation]);
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.toggleContainer}>
            <TextButton
              title={t("sign_in")}
              isActive={isSigninSelected}
              onPress={loginRegisterToggle}
              isCapitalize
            />
            <TextButton
              title={t("sign_up")}
              isActive={!isSigninSelected}
              onPress={loginRegisterToggle}
              isCapitalize
            />
          </View>
          <Text style={styles.loginText}>
            {isSigninSelected
              ? route?.params?.isClient === true
                ? t("client_login")
                : t("provider_login")
              : route?.params?.isClient === true
              ? t("client_sign_up")
              : t("provider_sign_up")}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {isSigninSelected ? <LoginView isSigninSelected={isSigninSelected} /> : <RegistrationView />}
          <View style={styles.footer}>
            <Text style={styles.guestText}>{t("guest_entrance")}</Text>
            <TextButton
              title={
                route?.params?.isClient === true
                  ? t("switch_to_provider")
                  : t("switch_to_client")
              }
              fontSize={getHeight(fontSize.textXl)}
              style={styles.switchToProviderText}
              onPress={() =>
                route?.params?.isClient === true
                  ? navigation.navigate(NavigationRoutes.ProviderStack)
                  : navigation.navigate(NavigationRoutes.ClientStack, {
                      screen: NavigationRoutes.ClientLogin,
                      params: { isClient: true },
                    })
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProviderAuthenticatorView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  container: {
    position: "relative",
    flex: 0.34,
  },
  logo: {
    width: getWidth(dimens.imageM),
    height: getHeight(dimens.imageM),
    alignSelf: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
    alignSelf: "center",
    paddingTop: getHeight(dimens.paddingXs + dimens.borderBold),
  },
  guestText: {
    fontSize: getHeight(fontSize.textXl),
    color: colors.black,
  },
  inputContainer: {
    flex: 0.66,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.1,
  },
  switchToProviderText: {
    color: colors.primary,
  },
});
