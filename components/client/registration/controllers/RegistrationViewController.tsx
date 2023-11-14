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
      setPasswordError('Password must contain special characters');
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
        showToast('User already exist', 'Please try SignIn', 'error');
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showToast('', 'Please enter email or password', 'warning');
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
