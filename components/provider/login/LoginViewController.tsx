import { useNavigation } from '@react-navigation/native';
import useToast from 'components/common/useToast';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { FacebookAuthProvider } from 'libs/authsevices/FcebookAuthProvider';
import { GoogleAuthProvider } from 'libs/authsevices/GoogleAuthProvider';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const device_Token= getLocalData('USER')?.deviceToken

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
      setEmailError(t('email_required'));
    } else if (!emailPattern.test(emailRef.current.value)) {
      setEmailError(t('invalid_email'));
    } else {
      setEmailError('');
    }
  };
  const isValidPassword = (password: string) => passwordPattern.test(password);

  const validatePassword = () => {
    if (!passwordRef.current.value) setPasswordError(t('password_required'));
    else if (passwordRef.current.value.length < 5)
      setPasswordError(t('must_be_8_characters'));
    else if (!isValidPassword(passwordRef.current.value))
      setPasswordError(t(`password_must_have_special_character`));
    else setPasswordError('');
  };

  const handleSignIn = () => {
    if (!emailError && !passwordError)
      onPressLoginButton(emailRef.current.value, passwordRef.current.value ,device_Token);
  };

  /** To handle Response from API after authentication request */
  const handleAuthResponse = (response: any, profilePicture?: string) => {
    let userDataProvider = response.user;

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
      profilePicture: userDataProvider.profile_picture
        ? userDataProvider.profile_picture
        : profilePicture,
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
      profilePicture: userDataProvider.profile_picture
        ? userDataProvider.profile_picture
        : profilePicture,
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
  const onPressLoginButton = async (email: string, password: string, device_token:string) => {
    try {
      if (email != '' || password != '') {
        setIsLoading(true);
        const res = await OnProviderSignIn({ email, password,device_token });
        console.log('res is ', res);

        if (res?.isSuccessful === true) {
          handleAuthResponse(res, '');
        } else {
          showToast(
            t('login_failed'),
            t('check_email_and_password'),
            'warning',
          );
        }
      } else {
        showToast('', t('email_or_password'), 'warning');
      }
    } catch (error) {
      Alert.alert(t('error_occurred_login'));
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
        const email = userData?.user?.email ?? '';
        const googleId = userData.user.providerData[0].uid;
        /** To handle Google auth request to API */
        const res = await onSubmitGoogleAuthRequestProvider({
          email,
          googleId,
        });
        // setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          setIsLoading(false);
          handleAuthResponse(res, userData?.user?.photoURL ?? '');
        } else {
          setIsLoading(false);
          Alert.alert(t('login_failed'), t('check_email_and_password'));
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
        const email = userData?.user?.email ?? '';
        const facebookId = userData.additionalUserInfo?.profile?.id;
        const res = await onSubmitFBAuthRequestProvider({ email, facebookId });
        setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse(res, '');
        } else {
          setIsLoading(false);
          Alert.alert(t('login_failed'), t('check_email_and_password'));
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
