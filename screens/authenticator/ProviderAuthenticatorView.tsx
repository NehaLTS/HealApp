import { useNavigation } from "@react-navigation/native";
import logo from "assets/icon/healLogo.png";
import Header from "components/common/Header";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import LoginView from "components/provider/login/LoginView";
import RegistrationView from "components/provider/registration/views/RegistrationView";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import NavigationRoutes from "navigator/NavigationRoutes";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import ProviderAuthenticatorViewController from "./ProviderAuthenticatorViewController";

const ProviderAuthenticatorView = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { loginRegisterToggle, isSigninSelected, OnSwitchToClient, isLoading, onPressGuestEntrance } = ProviderAuthenticatorViewController();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && <ActivityIndicator size={'large'} style={{
        left: '45%',
        top: '40%',
        position: 'absolute',
        zIndex: 1
      }} />}
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.toggleContainer}>
          <TextButton
            title={t("sign_in")}
            isActive={isSigninSelected}
            onPress={() => loginRegisterToggle(1)}
            isCapitalize
          />
          <TextButton
            title={t("sign_up")}
            isActive={!isSigninSelected}
            onPress={() => loginRegisterToggle(2)}
            isCapitalize
          />
        </View>
        <Text style={styles.loginText} title={isSigninSelected ? t("provider_login") : t("provider_sign_up")} />
      </View>
      <View style={styles.inputContainer}>
        {isSigninSelected ? (
          <LoginView isSigninSelected={isSigninSelected} />
        ) : (
          <RegistrationView />
        )}
        <View style={styles.footer}>
          <TextButton
            title={t("guest_entrance")}
            fontSize={getHeight(fontSize.textXl)}
            onPress={onPressGuestEntrance}
          />
          <TextButton
            title={t("switch_to_client")}
            fontSize={getHeight(fontSize.textXl)}
            style={styles.switchToProviderText}
            onPress={OnSwitchToClient}
          />
        </View>
      </View>
    </View>
  );
};

export default ProviderAuthenticatorView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM)
  },
  container: {
    position: "relative",
    flex: 0.34
  },
  logo: {
    width: getWidth(130),
    alignSelf: "center",
    flex: 0.6,
    resizeMode: 'contain'
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 0.2,
  },
  loginText: {
    fontSize: getHeight(fontSize.textXl),
    alignSelf: "center",
    flex: 0.2,
  },
  guestText: {
    fontSize: getHeight(fontSize.textXl)
  },
  inputContainer: {
    flex: 0.66,
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.12
  },
  switchToProviderText: {
    color: colors.primary,
  },
});
