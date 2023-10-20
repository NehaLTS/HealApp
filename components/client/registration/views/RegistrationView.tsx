import Button from "common/Button";
import Input from "common/Input";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import RegistrationViewController from "../controllers/RegistrationViewController";
import { GetSignInFooter } from "components/client/login/LoginView";
import { useTranslation } from "react-i18next";

const RegistrationView = () => {
  const { t } = useTranslation();
  const { onPressSignUp, isLoading, renderToast } = RegistrationViewController();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailRef = React.useRef<any>("");
  const passwordRef = React.useRef<any>("");

  console.log('emailRef.current.value', (emailRef.current.value || passwordRef.current.value) === undefined)

  const onChangeEmail = (value: string) => {
    emailRef.current.value = value,
      validateEmail()
  }
  const onBlurEmail = () => { }

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value,
      validatePassword()
  }
  const onBlurPassword = () => { }

  const validateEmail = () => {
    if (!emailRef.current.value) {
      setEmailError("Email is required");
    } else if (!isValidEmail(emailRef.current.value)) {
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
    if (!passwordRef.current.value) {
      setPasswordError("Password is required");
    } else if (passwordRef.current.value?.length < 5) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!isValidPassword(passwordRef.current.value)) {
      setPasswordError("Password must contain special characters");
    } else {
      setPasswordError('');
    }
  };
  const handleSignUp = () => {
    setIsLoadingGoogle(true)
    if (!emailError && !passwordError) onPressSignUp(emailRef.current.value, passwordRef.current.value)
    setIsLoadingGoogle(false)

  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };

  return (
    <>
      {renderToast()}
      <View style={styles.inputContainer}>
        {(isLoading || isLoadingGoogle) && <ActivityIndicator style={styles.loading} size={'large'} />}
        <Input
          ref={emailRef}
          placeholder={t("email")}
          defaultValue={emailRef.current.value}
          errorMessage={emailError}
          onChangeText={onChangeEmail}
          type="emailAddress"
          inputValue={emailRef.current.value}
          onBlur={onBlurEmail}
          returnKeyType={"next"}
          onSubmitEditing={() => passwordRef.current.focus()}
          onClearInputText={() => emailRef.current.clear()}
        />

        <Input
          ref={passwordRef}
          placeholder={t("password")}
          type="password"
          defaultValue={passwordRef.current.value}
          errorMessage={passwordError}
          onChangeText={onChangePassword}
          inputStyle={styles.password}
          inputValue={passwordRef.current.value}
          onSubmitEditing={onBlurPassword}
          returnKeyType={"done"}
          onClearInputText={() => passwordRef.current.clear()}
        />
        <TextButton
          fontSize={getWidth(fontSize.textS)}
          isActive
          title={t("forgot_password")}
          containerStyle={styles.forgotPassword}
        />
        <Button
          title={t("sign_up")}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={(passwordError?.length > 0 || emailError?.length > 0)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text title={t("or_sign_in_via")} />
        <GetSignInFooter loading={setIsLoadingGoogle} />
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
    paddingVertical: getHeight(dimens.paddingS),
    alignSelf: 'center'
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.18,
  },
  signUpButton: {
    alignSelf: "center",
    marginTop: getHeight(dimens.marginM),
  },
  password: {
    marginTop: dimens.paddingL + dimens.borderBold,
  },
  loading: {
    left: '44%',
    top: '13%',
    position: 'absolute',
    zIndex: 1
  },
  email: {
    marginTop: dimens.paddingL,
  },
});
