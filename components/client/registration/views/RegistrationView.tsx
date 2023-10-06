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
import RegistrationViewController from "../controllers/RegistrationViewController";
import { getSocialMediaLogin } from "../../login/LoginView";

const RegistrationView = () => {
  const { languageCode } = useTranslationContext();
  const { signIn } = getTexts(languageCode);
  const { onHandleLogin } = LoginController();
  const { email, setEmail, password, setPassword } = RegistrationViewController();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError(null); // Clear the error if it's valid
    }
  };

  const isValidPassword = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };
  
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must contain at least one uppercase letter, one digit, and one special character");
    } else {
      setPasswordError(null); // Clear the error if it's valid
    }
  };
  
  const handleSignUp = () => {
    setEmailError(null);
    setPasswordError(null);

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      // Perform registration logic here
      onHandleLogin(email, password);
    }
  };

  const isValidEmail = (email) => {
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
          onBlur={validateEmail} // Trigger validation on blur
        />
      
        <Input
          placeholder={signIn.password}
          type="password"
          value={password}
          errorMessage={passwordError}
          onChangeText={setPassword}
          inputStyle={styles.password}
          onBlur={validatePassword} // Trigger validation on blur
        />
        <Text style={styles.forgotPassword}>{signIn.forgot_password}</Text>
        <Button
          title={signIn.sign_up}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={handleSignUp}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.signInVia}>{signIn.or_sign_in_via}</Text>
        {getSocialMediaLogin()}
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
  email:{
    marginTop: dimens.paddingL,
  },
  errorText: {
    color: colors.invalid, 
    fontSize: fontSize.textM, 
  },
});
