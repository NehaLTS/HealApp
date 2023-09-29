import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import logo from "../../../assets/icon/logo.png";
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
  const { images } = LoginController()
  const { isChangeLanguage, onChangeLanguage, onHandleLogin, isFetching,onSocialMediaLogin, onHandleGoogleLogin, onHandleFacebookLogin } = LoginController();
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.input }>
        <Input placeholder={"Email*"} value={email} onChangeText={(e) => setEmail(e)} />
        <Input placeholder="Password*" type="password" value={password} onChangeText={(e) => setPassword(e)} />
        </View>
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={signIn.sign_in}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={() => onHandleLogin(email, password)}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
          {images.map((item, index) => (
            <TouchableOpacity key={index } 
            onPress={()=>onSocialMediaLogin(index)}
            >
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
