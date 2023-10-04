import React from "react";
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
import { getSignInFooter } from "../../login/LoginView";
import RegistrationViewController from "../controllers/RegistrationViewController";

const RegistrationView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { onPressLogin } = LoginController();
  const { email, setEmail, password, setPassword } = RegistrationViewController();

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={signIn.email}
          value={email}
          onChangeText={setEmail}
          type="emailAddress"
        />
        <Input
          placeholder={signIn.password}
          type="password"
          value={password}
          onChangeText={setPassword}
          inputStyle={styles.password}
        />
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
        <Button
          title={signIn.sign_up}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={() => onPressLogin(email, password)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
        {getSignInFooter()}
      </View>
    </>
  );
};
export default RegistrationView;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.8,
  },
  images: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageS),
    resizeMode: "center",
  },
  forgotPassword: {
    color: colors.black,
    textAlign: "center",
    paddingVertical: getHeight(dimens.paddingXs + dimens.borderBold),
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
