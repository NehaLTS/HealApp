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
import LoginViewController from "LoginViewController";
import TextButton from "components/common/TextButton";

const LoginView = ({isSigninSelected}) => {
  const { languageCode } = useTranslationContext();
  //TODO: Update according to new translation ie i18Next, once done.
  const { signIn } = getTexts(languageCode);
  const { onPressLoginButton } = LoginViewController();
  //TODO Use useRef
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError('');
    }
  };

  const isValidPassword = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must contain special characters");
    } else {
      setPasswordError('');
    }
  };
  
  const handleSignIn = () => {
    if (!emailError && !passwordError) onPressLoginButton(email, password)
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={signIn.email}
          value={email}
          errorMessage={emailError}
          inputStyle={styles.email}
          onChangeText={setEmail}
          type="emailAddress"
          inputValue={email}
          onBlur={validateEmail}
        />
      
        <Input
          placeholder={signIn.password}
          type="password"
          value={password}
          errorMessage={passwordError}
          onChangeText={setPassword}
          inputStyle={styles.password}
          inputValue={password}
          onSubmitEditing={validatePassword}
        />
        <TextButton
          fontSize={getWidth(fontSize.textS)}
          isActive
          style={styles.forgotPassword}
          title={signIn.forgot_password}
        />
        <Button
          title={isSigninSelected? signIn.sign_in  :signIn.sign_up}
          isPrimary
          isSmall
          style={styles.signInButton}
          onPress={handleSignIn}
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
  signInButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.paddingL),
  },
  password: {
    marginTop: dimens.paddingL,
  },
  email:{
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
