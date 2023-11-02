import { useNavigation } from '@react-navigation/native';
import useToast from 'components/common/useToast';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { useState } from 'react';
import { Alert } from 'react-native';
import React from 'react';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

const RegistrationViewController = () => {
  const { onCreateSignUp } = AuthServicesClient();
  const { setUserId, setToken } = UseClientUserContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast, renderToast } = useToast();
  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
      setEmailError('Invalid email address');
    else setEmailError('');
  };

  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validatePassword = () => {
    if (!passwordRef.current.value) {
      setPasswordError('Password is required');
    } else if (passwordRef.current.value.length < 5) {
      setPasswordError('Password must be at least 8 characters');
    } else if (!isValidPassword(passwordRef.current.value)) {
      setPasswordError(
        `Password must have at least one special character(@#$!%*?&), one digit(0-9), one uppercase(A-Z)`,
      );
    } else {
      setPasswordError('');
    }
  };
  const handleSignUp = () => {
    if (!emailError && !passwordError)
      onPressSignUp(emailRef.current.value, passwordRef.current.value);
  };

  const onPressSignUp = async (email: string, password: string) => {
    if (email !== undefined && password !== undefined) {
      setIsLoading(true);
      const res = await onCreateSignUp({ email, password });

      console.log('res is ', res);

      if (res && res.token && res.client_id) {
        setToken(res.token);
        setUserId(res.client_id);
      }

      setLocalData('USER', {
        token: res?.token,
        userId: res?.client_id,
        isClient: true,
      });
      setLocalData('USERPROFILE', {
        email: email,
      });
      setIsLoading(false);
      if (res?.isSuccessful) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardDetails' }],
        });
      } else {
        showToast('User already exist', 'Please try SignIn', 'error');
      }
    } else {
      setIsLoading(false);
      showToast('', 'Please enter email or password', 'warning');
    }
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
