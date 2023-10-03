import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslationContext } from "../../../contexts/UseTranslationsContext";
import { colors } from "../../../designToken/colors";
import { dimens } from "../../../designToken/dimens";
import { fontSize } from "../../../designToken/fontSizes";
import { fontWeight } from "../../../designToken/fontWeights";
import { getTexts } from "../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../libs/StyleHelper";
import Button from "../../common/Button";
import Input from "../../common/Input";
import LoginController from "./LoginController";

const LoginView = ({ isSignInButton }: { isSignInButton: boolean }) => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { images, onHandleLogin, onSelectSocialAuth } = LoginController();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const getSocialMediaLogin = () =>
    images.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => onSelectSocialAuth(index)}>
        <Image source={item.url} style={styles.images} />
      </TouchableOpacity>
    ));
  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={signIn.email}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder={signIn.password}
          type="password"
          value={password}
          onChangeText={setPassword}
          inputStyle={styles.password}
        />
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
      </View >
      <View style={styles.buttonContainer}>
        <Button
          title={isSignInButton ? signIn.sign_in : signIn.sign_up}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={() => onHandleLogin(email, password)}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
          {getSocialMediaLogin()}
        </View >
      </View >
    </>
  );
};
export default LoginView;
const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.35,
  },
  images: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageXs),
  },
  forgotPassword: {
    color: colors.black,
    textAlign: "center",
    paddingTop: getHeight(dimens.paddingXs),
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: getHeight(dimens.marginS),
  },
  signInVia: {
    color: colors.black,
    fontSize: fontSize.textLg,
    fontWeight: fontWeight.normal,
  },
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.marginS),
  },
  buttonContainer: {
    flex: 0.55,
    gap: getHeight(dimens.paddingL),
  },
  password: {
    marginTop: dimens.paddingL,
  }
});
