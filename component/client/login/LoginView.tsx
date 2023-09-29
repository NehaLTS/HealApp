import React from "react";
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

const LoginView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { images } = LoginController();

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.input }>
          <Input placeholder={signIn.email} />
          <Input placeholder={signIn.password} type="password" />
        </View>
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={signIn.sign_in}
          isPrimary
          isSmall
          style={styles.signInButton}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
          {images.map((item, index) => (
            <TouchableOpacity key={index}>
              <Image source={item.url} style={styles.images} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingTop: getHeight(dimens.marginSm),
  },
  signInVia: {
    color: colors.black,
    fontSize: fontSize.textLg,
    fontWeight: fontWeight.normal,
  },
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.marginSm),
  },
  buttonContainer: {
    flex: 0.55,
    gap: getHeight(dimens.paddingLg),
  },
  input:{ 
    gap: dimens.paddingLg 
  }
});
