import { useNavigation } from '@react-navigation/native';
import useToast from 'components/common/useToast';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { FacebookAuthProvider } from 'libs/authsevices/FcebookAuthProvider';
import { GoogleAuthProvider } from 'libs/authsevices/GoogleAuthProvider';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderProfile } from 'libs/types/UserType';
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
  const device_Token = getLocalData('USER')?.deviceToken;

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

  const onBlurPassword = () => {
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
    else setPasswordError('');
  };

  const handleSignIn = () => {
    if (!emailError && !passwordError)
      onPressLoginButton(
        emailRef.current.value,
        passwordRef.current.value,
        device_Token,
      );
  };

  /** To handle Response from API after authentication request */
  const handleAuthResponse = (response: any, profilePicture?: string) => {
    console.log('response ** ', JSON.stringify(response));
    let userDataProvider = response.user;
    setToken(response.token);
    setUserId(response.id);
    setProviderProfile({
      firstName: userDataProvider?.firstName,
      lastName: userDataProvider?.lastName,
      phoneNumber: userDataProvider?.phoneNumber,
      address: userDataProvider?.address,
      city: userDataProvider?.city,
      state: userDataProvider?.state,
      country: userDataProvider?.country,
      profilePicture: userDataProvider.profile_picture
        ? userDataProvider.profile_picture
        : profilePicture,
      email: userDataProvider?.email,
      licensenumber: userDataProvider?.licensenumber,
      bankDetails: userDataProvider.bankDetails,
      services: userDataProvider.services,
      idPicture: userDataProvider.idPicture,
      provider: userDataProvider.provider,
      speciality: userDataProvider.speciality,
      licensepicture: userDataProvider?.licensepicture,
    });
    setLocalData('USERPROFILE', {
      firstName: userDataProvider?.firstName,
      lastName: userDataProvider?.lastName,
      phoneNumber: userDataProvider?.phoneNumber,
      address: userDataProvider?.address,
      city: userDataProvider?.city,
      state: userDataProvider?.state,
      country: userDataProvider?.country,
      profilePicture: userDataProvider.profile_picture
        ? userDataProvider.profile_picture
        : profilePicture,
      email: userDataProvider?.email,
      licensenumber: userDataProvider?.licensenumber,
      bankDetails: userDataProvider.bankDetails,
      idPicture: userDataProvider.idPicture,
      provider: userDataProvider.provider,
      speciality: userDataProvider.speciality,
      licensepicture: userDataProvider?.licensepicture,
      isSuccessful: true,
    } as unknown as ProviderProfile);

    setLocalData('USER', {
      token: response.token,
      userId: response.id,
      isClient: false,
    });

    console.log('before local save', userDataProvider?.services);
    setLocalData('PROVIDERSERVICES', userDataProvider?.services);

    if (!userDataProvider.firstName || userDataProvider.firstName == '') {
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ProviderOnboardDetails }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ProviderHome }],
      });
    }
  };
  /** To handle User auth via email and password */
  const onPressLoginButton = async (
    email: string,
    password: string,
    device_token: string,
  ) => {
    try {
      if (email != '' || password != '') {
        setIsLoading(true);
        const res = await OnProviderSignIn({ email, password, device_token });
        console.log('res is Provider SignIn', res);

        if (res?.isSuccessful === true) {
          setIsLoading(false);
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
      console.log('error is ', error);
      Alert.alert(t('error_occurred_login'));
    }

    setIsLoading(false);
  };

  /** To handle Google login  button click*/
  const onHandleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      let userData = await onGoogleAuthProcessing();
      console.log('vbxcvbnxvb', userData);
      const email = userData?.user?.email ?? '';
      const googleId = userData.user.providerData[0].uid;

      /** To handle Google auth request to API */
      console.log('GoogleSgnUpuserData', userData);
      if (email && googleId) {
        const res = await onSubmitGoogleAuthRequestProvider({
          email,
          googleId,
          device_token: device_Token,
        });
        console.log('GoogleSgnUp', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse(res, userData?.user?.photoURL ?? '');
        } else {
          setIsLoading(false);

          Alert.alert(t('login_failed'), t('check_email_and_password'));
        }
      }
    } catch (err) {
      console.log('Error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  /** To handle Facebook login  button click*/
  const onHandleFacebookLogin = () => {
    setIsLoading(true);
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email ?? '';
        const facebookId = userData.additionalUserInfo?.profile?.id;
        const res = await onSubmitFBAuthRequestProvider({
          email,
          facebookId,
          device_token: device_Token,
        });
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
