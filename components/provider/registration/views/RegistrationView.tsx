import { getSignInFooter } from "components/provider/login/LoginView";
import { t } from "i18next";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { fontWeight } from "../../../../designToken/fontWeights";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Button from "../../../common/Button";
import Input from "../../../common/Input";
import LoginController from "../../login/LoginController";

const RegistrationView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { onPressLoginButton } = LoginController();
  //TODO: Use useRef
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={t("email")}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder={t("password")}
          type="password"
          value={password}
          onChangeText={setPassword}
          inputStyle={styles.password}
        />
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
        <Button
          title={t("sign_up")}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={() => onPressLoginButton(email, password)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.signInVia}>{t('or_sign_in_via')}</Text>
        {getSignInFooter()}
      </View>
    </>
  );
};
export default RegistrationView;

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
    paddingVertical: getHeight(dimens.paddingS),
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.2,
  },
  signInVia: {
    color: colors.black,
    fontSize: fontSize.textL,
    fontWeight: fontWeight.normal,
  },
  signUpButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.paddingL),
  },
  password: {
    marginTop: dimens.paddingL,
  },
  });
