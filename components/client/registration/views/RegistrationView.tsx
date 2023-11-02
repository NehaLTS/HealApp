import Button from 'common/Button'
import Input from 'common/Input'
import Text from 'components/common/Text'
import TextButton from 'components/common/TextButton'
import { dimens } from 'designToken/dimens'
import { fontSize } from 'designToken/fontSizes'
import { t } from 'i18next'
import { getHeight, getWidth } from 'libs/StyleHelper'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import RegistrationViewController from '../controllers/RegistrationViewController'
import { GetSignInFooter } from 'components/client/login/LoginView'
import Loader from 'components/common/Loader'

const RegistrationView = () => {
  const { handleSignUp, isLoading, renderToast, onBlurEmail, onBlurPassword, onChangeEmail, onChangePassword, emailError, emailRef, passwordRef, passwordError } = RegistrationViewController()
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)

  return (
    <>
      {renderToast()}
      <View style={styles.inputContainer}>
        {(isLoading || isLoadingGoogle) && <Loader />}
        <Input
          ref={emailRef}
          placeholder={t('email')}
          defaultValue={emailRef.current.value}
          errorMessage={emailError}
          onChangeText={onChangeEmail}
          type="emailAddress"
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
        <TextButton fontSize={getWidth(fontSize.textS)} isActive title={t('forgot_password')} containerStyle={styles.forgotPassword} />
        <Button
          title={t('sign_up')}
          isPrimary
          isSmall
          style={styles.signUpButton}
          onPress={handleSignUp}
          //  disabled={(passwordError.length > 0 || emailError.length > 0 || emailRef.current.value==null || passwordRef.current.value==null)}
        />
      </View>
      <GetSignInFooter />
    </>
  )
}

export default RegistrationView

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.7
  },
  images: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageS),
    resizeMode: 'center'
  },
  forgotPassword: {
    paddingVertical: getHeight(dimens.paddingS),
    alignSelf: 'center'
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.18
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: getHeight(dimens.marginM)
  },
  password: {
    marginTop: dimens.paddingL + dimens.borderBold
  },
  loading: {
    left: '44%',
    top: '13%',
    position: 'absolute',
    zIndex: 1
  },
  email: {
    marginTop: dimens.paddingL
  }
})
