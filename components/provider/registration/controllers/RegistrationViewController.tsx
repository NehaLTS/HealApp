import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider, } from 'libs/authsevices/AuthServiceProvider';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React from 'react';
import { useState } from 'react';
import useToast from 'components/common/useToast';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { Alert } from 'react-native';

const RegistrationViewController = () => {

  const navigation = useNavigation();
  const { OnProviderCreateSignUp, OrderRequst } = AuthServicesProvider();
    const { setToken, setUserId } =
    UseProviderUserContext();
    const { userDataProvider, setUserDataProvider } = UseUserContextProvider();
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
    // if (!emailError && !passwordError)
    //   onPressSignUpProvider(emailRef.current.value, passwordRef.current.value);
    OrderRequst({ status:"accept",
    client_id:"2",
    provider_id:"124",
    latitude:"30.37775529243538",
    longitude:"76.77481109532673"}).then((res)=>{console.log("ordereAccepted", res)})
    //  navigation.reset({
    //         index: 0,
    //         routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
    //       });
          
  };

  const onPressSignUpProvider = async (email: string, password: string, device_token:string) => {
    setIsLoading(true);
    Alert.alert("tokenecvise", device_token)
    if (email !== undefined && password != undefined) {
      const response = await OnProviderCreateSignUp({ email, password, device_token}); //api
      console.log("res is Providerjdsdfsdjj ", response);

      if (response && response.token && response.provider_id) {
        setToken(response.token);
        setUserId(response.provider_id);
      }

      setLocalData('USER', {
        token: response?.token,
        userId: response?.provider_id,
        isClient: false,
      });
      setLocalData('USERPROVIDERPROFILE', {
        email: email,
      });

      setUserDataProvider({
        ...userDataProvider,
        isSuccessful: response?.isSuccessful,
        provider_id: response.provider_id ?? '',
        token: response?.token ?? '',
      });
      if (response.isSuccessful){
       
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationRoutes.ProviderHome }],
          
        });
      }
      else {
        showToast('User already exist', 'Please try SignIn', 'error');
      }
    } else {
      showToast('', 'Please enter email or password', 'warning');
    }
    setIsLoading(false);
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
    onPressSignUpProvider
  };
};
export default RegistrationViewController;
