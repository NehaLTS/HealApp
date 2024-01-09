import Button from 'common/Button';
import Input from 'common/Input';
import Loader from 'components/common/Loader';
import TextButton from 'components/common/TextButton';
import { GetSignInFooter } from 'components/provider/login/LoginView';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RegistrationViewController from '../controllers/RegistrationViewController';

const RegistrationView = () => {
  const {
    handleSignUp,
    isLoading,
    renderToast,
    onBlurEmail,
    onBlurPassword,
    onChangeEmail,
    onChangePassword,
    emailError,
    emailRef,
    passwordRef,
    passwordError,
  } = RegistrationViewController();
  const deviceToken = getLocalData('USER')?.deviceToken;

  return (
    <>
      {renderToast()}
      <View style={styles.inputContainer}>
        {isLoading && <Loader />}
        <Input
          ref={emailRef}
          placeholder={t('email')}
          defaultValue={emailRef.current.value}
          errorMessage={emailError}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
          inputValue={emailRef.current.value}
          onBlur={onBlurEmail}
          returnKeyType={'next'}
          onSubmitEditing={() => passwordRef.current.focus()}
          onClearInputText={() => emailRef.current.clear()}
        />

        <Input
          ref={passwordRef}
          placeholder={t('password')}
          type="password"
          defaultValue={passwordRef.current.value}
          errorMessage={passwordError}
          onChangeText={onChangePassword}
          inputStyle={styles.password}
          inputValue={passwordRef.current.value}
          onSubmitEditing={onBlurPassword}
          returnKeyType={'done'}
          onClearInputText={() => passwordRef.current.clear()}
        />
        <TextButton
          fontSize={getHeight(fontSize.textS)}
          isActive
          style={styles.forgotPassword}
          title={t('forgot_password')}
          disabled
        />
        <Button
          title={t('sign_up')}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={
            passwordError.length > 0 ||
            emailError.length > 0 ||
            emailRef.current.value == null ||
            passwordRef.current.value == null
          }
        />
      </View>
      <GetSignInFooter />
    </>
  );
};

export default RegistrationView;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.7,
    paddingTop: getHeight(dimens.marginS),
  },
  images: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageS),
    resizeMode: 'center',
  },
  forgotPassword: {
    textAlign: 'center',
    paddingVertical: getHeight(dimens.paddingS),
    alignSelf: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.18,
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: getHeight(dimens.marginM - 2),
  },
  password: {
    marginTop: dimens.paddingL,
  },
  errorText: {
    color: colors.invalid,
    fontSize: getHeight(fontSize.textM),
  },
  loading: {
    left: '44%',
    top: '13%',
    position: 'absolute',
    zIndex: 1,
  },
});
