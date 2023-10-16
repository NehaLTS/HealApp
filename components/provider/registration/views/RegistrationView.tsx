import TextButton from "components/common/TextButton";
import { getSignInFooter } from "components/provider/login/LoginView";
import { t } from "i18next";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { fontWeight } from "../../../../designToken/fontWeights";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Button from "../../../common/Button";
import Input from "../../../common/Input";
import RegistrationViewController from "../controllers/RegistrationViewController";
import Text from "components/common/Text";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useNavigation } from "@react-navigation/native";

const RegistrationView = () => {
  const { onPressSignUpProvider, isLoading } = RegistrationViewController();
  const navigation = useNavigation()
  // const { onPressSignUp } = RegistrationViewController();
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

  const handleSignUp = () => {
    if (!emailError && !passwordError) onPressSignUpProvider(email, password)
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        {isLoading && <ActivityIndicator size={'large'} style={styles.loading} />}
        <Input
          placeholder={t("email")}
          defaultValue={email}
          errorMessage={emailError}
          onChangeText={setEmail}
          type="emailAddress"
          inputValue={email}
          onBlur={validateEmail}
          returnKeyType={"next"}
          onClearInputText={() => setEmail('')}
        />
        <Input
          placeholder={t("password")}
          type="password"
          defaultValue={password}
          errorMessage={passwordError}
          onChangeText={setPassword}
          inputStyle={styles.password}
          inputValue={password}
          onSubmitEditing={validatePassword}
          onClearInputText={() => setPassword('')}

        />
        <TextButton
          fontSize={getWidth(fontSize.textS)}
          isActive
          style={styles.forgotPassword}
          title={t("forgot_password")}
        />
        <Button
          title={t("sign_up")}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={ (email && password) ==="" || (passwordError.length > 0 || emailError.length > 0)}
        />
      </View>
      <View style={styles.footerContainer}>
        <Text title={t("or_sign_in_via")} />
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
    paddingVertical: getHeight(dimens.paddingS)
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
    marginTop: dimens.paddingL,
  },
  errorText: {
    color: colors.invalid,
    fontSize: fontSize.textM,
  },
  loading: {
    left: '44%',
    top: '13%',
    position: 'absolute',
    zIndex: 1
  }
});
