import { useNavigation } from '@react-navigation/native';
import useToast from 'components/common/useToast';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RegistrationViewController = () => {
  const { onCreateSignUp } = AuthServicesClient();
  const { setUserId, setToken } = UseClientUserContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast, renderToast } = useToast();
  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');
  const deviceToken= getLocalData('USER')?.deviceToken

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { t } = useTranslation();

  const onChangeEmail = (value: string) => {
    emailRef.current.value = value;
    validateEmail();
  };
  const onBlurEmail = () => validateEmail();

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const onBlurPassword = () => {
    validatePassword();
  };

  const validateEmail = () => {
    if (!emailRef.current.value) setEmailError('Email is required');
    else if (!emailPattern.test(emailRef.current.value))
      setEmailError(t('invalid_email'));
    else setEmailError('');
  };

  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validatePassword = () => {
    if (!passwordRef.current.value) {
      setPasswordError(t('password_required'));
    } else if (passwordRef.current.value.length < 5) {
      setPasswordError(t('must_be_8_characters'));
    } else if (!isValidPassword(passwordRef.current.value)) {
      setPasswordError(t(`password_must_have_special_character`));
    } else {
      setPasswordError('');
    }
  };
  const handleSignUp = () => {
    console.log("deviceTokenSignUp", deviceToken)
    if (!emailError && !passwordError)
      onPressSignUp(emailRef.current.value, passwordRef.current.value,deviceToken);
  };

  const onPressSignUp = async (email: string, password: string,device_token:string ) => {
    if (email !== undefined && password !== undefined) {
      setIsLoading(true);
   
      const res = await onCreateSignUp({ email, password, device_token });

      console.log('res is ', res);

      if (res && res.token && res.id) {
        setToken(res.token);
        setUserId(res.id);
      }

      setLocalData('USER', {
        token: res?.token,
        userId: res?.id,
        isClient: true,
      });
      setLocalData('USERPROFILE', {
        email: email,
      });

      if (res?.isSuccessful) {
        setTimeout(() => {
          //TODO: need to check this as it's a workaround for iOS
          navigation.reset({
            index: 0,
            routes: [{ name: 'OnboardDetails' }],
          });
        }, 200);
      } else {
        showToast(t('user_exist'), t('try_signin'), 'error');
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showToast('', t('email_or_password'), 'warning');
    }

    // setIsLoading(false);
  };

  return {
    handleSignUp,
    onPressSignUp,
    isLoading,
    renderToast,
    onChangeEmail,
    onBlurEmail,
    onBlurPassword,
    onChangePassword,
    emailError,
    emailRef,
    passwordError,
    passwordRef,
  };
};

export default RegistrationViewController;
