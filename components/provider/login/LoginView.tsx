import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { fontWeight } from "designToken/fontWeights";
import { getTexts } from "libs/OneSkyHelper";
import { getHeight, getWidth } from "libs/StyleHelper";
import Button from "common/Button";
import Input from "common/Input";
import LoginViewController from "./LoginViewController";

const LoginView = () => {
  const { languageCode } = useTranslationContext();
  //TODO: Update according to new translation ie i18Next, once done.
  const { signIn } = getTexts(languageCode);
  const { onPressLoginButton } = LoginViewController();
  //TODO Use useRef
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        <Button
          title={signIn.sign_in}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={() => onPressLoginButton(email, password)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
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
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.paddingL),
  },
  password: {
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