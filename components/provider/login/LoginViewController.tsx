import { useNavigation } from '@react-navigation/native';
import useToast from 'components/common/useToast';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { FacebookAuthProvider } from 'libs/authsevices/FcebookAuthProvider';
import { GoogleAuthProvider } from 'libs/authsevices/GoogleAuthProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider();
  const { onFBAuthProcessing } = FacebookAuthProvider();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {
    OnProviderSignIn,
    onSubmitGoogleAuthRequestProvider,
    onSubmitFBAuthRequestProvider,
  } = AuthServicesProvider();
  const { setToken, setUserId, setProviderProfile, token, userId } =
    UseProviderUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast, renderToast } = useToast();

  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');

  const onChangeEmail = (value: string) => {
    emailRef.current.value = value;
    validateEmail();
  };
  const onBlurEmail = () => validateEmail();

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const onBlurPassword = () => (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const validateEmail = () => {
    if (!emailRef.current.value) {
      setEmailError('Email is required');
    } else if (!emailPattern.test(emailRef.current.value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validatePassword = () => {
    if (!passwordRef.current.value) setPasswordError('Password is required');
    else if (passwordRef.current.value.length < 5)
      setPasswordError('Password must be at least 8 characters');
    else if (!isValidPassword(passwordRef.current.value))
      setPasswordError('Password must contain special characters');
    else setPasswordError('');
  };

  const handleSignIn = () => {
    if (!emailError && !passwordError)
      onPressLoginButton(emailRef.current.value, passwordRef.current.value);
  };

  /** To handle Response from API after authentication request */
  const handleAuthResponse = (response: any) => {
    let userDataProvider = response.user;
    console.log('response.token', response.token);

    console.log('response ', response);


    setToken(response.token);
    setUserId(response.id);
    setProviderProfile({
      firstName: userDataProvider?.firstname,
      lastName: userDataProvider?.lastname,
      phoneNumber: userDataProvider?.phone_number,
      address: userDataProvider?.address,
      city: userDataProvider?.city,
      state: userDataProvider?.state,
      country: userDataProvider?.country,
      profilePicture: userDataProvider?.profile_picture,
      provider_id: userDataProvider?.provider_id,
      email: userDataProvider?.email,
      licensenumber: userDataProvider?.license,
      provider_type_id: userDataProvider?.provider_type_id,
      licensepicture: userDataProvider?.license_photo,
      isSuccessful: userDataProvider?.isSuccessful,
    });

    // setUserDataProvider({ ...userDataProvider, token: response?.token, isSuccessful: response?.isSuccessful });
    setLocalData('USERPROVIDERPROFILE', {
      firstName: userDataProvider?.firstname,
      lastName: userDataProvider?.lastname,
      phoneNumber: userDataProvider?.phone_number,
      address: userDataProvider?.address,
      city: userDataProvider?.city,
      state: userDataProvider?.state,
      country: userDataProvider?.country,
      profilePicture: userDataProvider?.profile_picture,
      provider_id: userDataProvider?.provider_id,
      email: userDataProvider?.email,
      licensenumber: userDataProvider?.license,
      provider_type_id: userDataProvider?.provider_type_id,
      licensepicture: userDataProvider?.license_photo,
      isSuccessful: userDataProvider?.isSuccessful,
    });
    setLocalData('USER', {
      token: response.token,
      userId: response.id,
      isClient: false,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderHome }],
      
    });
    // if (!userDataProvider.firstName || userDataProvider.firstName == '') {
    //   console.log('setToken', token, userId);

    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
    //   });
    // } else {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: NavigationRoutes.ProviderHome }],
    //   });
    // }
  };
  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string) => {
    try {
      if (email != '' || password != '') {
        setIsLoading(true);
        const res = await OnProviderSignIn({ email, password });

        if (res?.isSuccessful === true) {
          handleAuthResponse(res);
        } else {
          showToast(
            'Login Failed',
            'Please check your email and password and try again.',
            'warning',
          );
        }
      } else {
        showToast('', 'Please enter email or password', 'warning');
      }
    } catch (error) {
      Alert.alert('An error occurred during login.');
    }

    setIsLoading(false);
  };
  /** To handle Google login  button click*/
  const onHandleGoogleLogin = async () => {
    setIsLoading(true);
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then(async (userData) => {
      try {
        console.log('vbxcvbnxvb', userData);
        const email = userData?.user?.email;
        const googleId = userData.user.providerData[0].uid;
        /** To handle Google auth request to API */
        const res = await onSubmitGoogleAuthRequestProvider({
          email,
          googleId,
        });
        // setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          setIsLoading(false);
          handleAuthResponse(res);
        } else {
          setIsLoading(false);
          Alert.alert(
            'Login Failed',
            'Please check your email and password and try again.',
          );
        }
      } catch (err) {
        setIsLoading(false);
        console.log('Error occurred!');
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  /** To handle Facebook login  button click*/
  const onHandleFacebookLogin = () => {
    setIsLoading(true);
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email;
        const facebookId = userData.additionalUserInfo?.profile?.id;
        const res = await onSubmitFBAuthRequestProvider({ email, facebookId });
        setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse(res);
        } else {
          setIsLoading(false);
          Alert.alert(
            'Login Failed',
            'Please check your email and password and try again.',
          );
        }
      } catch (err) {
        setIsLoading(false);
        console.log('Error occurred!');
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  /** To handle social media selection button click */
  const onSelectSocialAuth = (index: number) => {
    switch (index) {
      case 0:
        onHandleGoogleLogin();
        break;
      case 1:
        onHandleFacebookLogin();
        break;
    }
  };
  return {
    isLanguageChanged,
    onChangeLanguage,
    onPressLoginButton,
    onHandleGoogleLogin,
    onHandleFacebookLogin,
    onSelectSocialAuth,
    validateEmail,
    setEmail,
    setPassword,
    handleSignIn,
    validatePassword,
    email,
    password,
    emailError,
    passwordError,
    isLoading,
    onChangeEmail,
    onBlurEmail,
    emailRef,
    passwordRef,
    onChangePassword,
    onBlurPassword,
    renderToast,
  };
};

export default LoginViewController;
