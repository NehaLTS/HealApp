import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React from 'react';
import { useState } from 'react';
import useToast from 'components/common/useToast';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import { setLocalData } from 'libs/datastorage/useLocalStorage';

const RegistrationViewController = () => {

  const navigation = useNavigation();
  const { OnProviderCreateSignUp } = AuthServicesProvider();
    const { setToken, setUserId } =
    UseProviderUserContext();
  const { showToast, renderToast } = useToast();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');


  const onChangeEmail = (value: string) => {
    emailRef.current.value = value;
    validateEmail();
  };
  const onBlurEmail = () => {
    validateEmail();
  };

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const onBlurPassword = () => {
    validatePassword();
  };



  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validateEmail = () => {
if (!emailRef.current.value) setEmailError('Email is required');
    else if (!emailPattern.test(emailRef.current.value))
      setEmailError('Invalid email address');
    else setEmailError('');

  };

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
      onPressSignUpProvider(emailRef.current.value, passwordRef.current.value,"Test");

    //  navigation.reset({
    //         index: 0,
    //         routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
    //       });
          
  };

  const onPressSignUpProvider = async (email: string, password: string,device_token:string) => {
    setIsLoading(true);
    if (email !== undefined && password != undefined) {
      const res = await OnProviderCreateSignUp({ email, password,device_token });

      console.log("response is ",res);
      if (res && res.token && res.id) {
        setToken(res.token);
        setUserId(res.id);
      }

      setLocalData('USER', {
        token: res?.token,
        userId: res?.id,
        isClient: false,
      });
      setLocalData('USERPROFILE', {
        email: email,
      });

      if (res?.isSuccessful) {
        setTimeout(() => {
          //TODO: need to check this as it's a workaround for iOS
          navigation.reset({
            index: 0,
            routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
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

   
  };
 return {
    handleSignUp,
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
