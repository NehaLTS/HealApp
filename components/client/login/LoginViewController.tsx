import { useNavigation } from '@react-navigation/native';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useState } from 'react';
import { Alert } from 'react-native';
import { FacebookAuthProvider } from '../../../libs/authsevices/FcebookAuthProvider';
import { GoogleAuthProvider } from '../../../libs/authsevices/GoogleAuthProvider';
import React from 'react';
import { emailPattern, passwordPattern } from 'libs/utility/Utils';
import useToast from 'components/common/useToast';
import { useTranslation } from 'react-i18next';

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider();
  const { onFBAuthProcessing } = FacebookAuthProvider();
  const { setUserProfile, setUserId, setToken, userProfile } =
    UseClientUserContext();
  // const { userData, setUserData } = UseUserContext()
  const {
    onSubmitAuthRequest,
    onSubmitFBAuthRequest,
    onSubmitGoogleAuthRequest,
  } = AuthServicesClient();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = React.useRef<any>('');
  const passwordRef = React.useRef<any>('');
  const { showToast, renderToast } = useToast();
  const { t } = useTranslation();
  const device_Token= getLocalData('USER')?.deviceToken

  const onChangeEmail = (value: string) => {
    emailRef.current.value = value;
    validateEmail();
  };
  const onBlurEmail = () => validateEmail();

  const onChangePassword = (value: string) => {
    passwordRef.current.value = value;
    validatePassword();
  };
  const onBlurPassword = () => validatePassword();

  const validateEmail = () => {
    if (!emailRef.current.value) setEmailError(t('email_required'));
    else if (!emailPattern.test(emailRef.current.value))
      setEmailError(t('invalid_email'));
    else setEmailError('');
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
      onPressLoginButton(emailRef.current.value, passwordRef.current.value, device_Token);
  };

  /** To handle Response from API after authentication request */

  //TODO: Kamal needs to change any to type

  const handleAuthSuccessResponse = (
    response: any,
    profilePicture?: string,
  ) => {
    let userDetails = response.user;
    //save details in context
    setToken(response.token);
    console.log("response.token", response.token)
    setUserId(response.id);
    setUserProfile({
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      phoneNumber: userDetails.phone_number,
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      country: userDetails.country,
      profilePicture: userDetails.profile_picture
        ? userDetails.profile_picture
        : profilePicture,
      date_of_birth: userDetails.date_of_birth,
      idNumber: userDetails.id_number,
      email: userDetails.email,
    });

    setLocalData('USERPROFILE', {
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      phoneNumber: userDetails.phone_number,
      address: userDetails.address,
      city: userDetails.city,
      state: userDetails.state,
      country: userDetails.country,
      profilePicture: userDetails.profile_picture
        ? userDetails.profile_picture
        : profilePicture,
      date_of_birth: userDetails.date_of_birth,
      idNumber: userDetails.id_number,
      email: userDetails.email,
    });
    setLocalData('USER', {
      token: response.token,
      userId: response.id,
      isClient: true,
    });

    //if first name is empty navigate to onboard else to Home
    if (!userDetails.firstname || userDetails.firstname == '') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardDetails' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ClientHome }],
      });
    }

    //navigation.navigate(NavigationRoutes.ClientHome);
  };

  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string, device_token:string) => {
    try {
      if (email != '' || password != '') {
        setIsLoading(true);
        const res = await onSubmitAuthRequest({ email, password, device_token});
        console.log('sign in client by email and password', res);
        setIsLoading(false);
        if (res?.isSuccessful === true) handleAuthSuccessResponse(res, '');
        else
          showToast(
            'Login Failed',
            'Please check your email and password and try again.',
            'error',
          );
      }
      // else  showToast("", "Please enter email or password", "warning")
    } catch (error) {
      setIsLoading(false);

      console.log('error is ', error);
      Alert.alert('An error occurred during login.');
    }
  };
  /** To handle Google login  button click*/
  const onPressGoogleButton = async () => {
    setIsLoading(true);
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email ?? '';
        const googleId = userData.user?.uid ?? '';
        /** To handle Google auth request to API */
        const res = await onSubmitGoogleAuthRequest({ email, googleId });

        setIsLoading(false);
        if (res?.isSuccessful === true) {
          handleAuthSuccessResponse(res, userData?.user?.photoURL);
        } else {
          Alert.alert(
            'Login Failed',
            'Please check your email and password and try again.',
          );
        }
      } catch (err) {
        console.log('Error occurred!');
        setIsLoading(false);
      }
    });
  };
  /** To handle Facebook login  button click*/
  const onPressFBButton = () => {
    setIsLoading(true);
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        const email = userData.user.email;
        const facebookId = userData.additionalUserInfo?.profile?.id;
        const res = await onSubmitFBAuthRequest({ email, facebookId });
        setIsLoading(false);

        if (res?.isSuccessful === true) {
          handleAuthSuccessResponse(res, '');
        } else {
          Alert.alert(
            'Login Failed',
            'Please check your email and password and try again.',
          );
        }
      } catch (err) {
        console.log('Error occurred!');
      }
    });
  };
  /** To handle social media selection button click */
  const onSelectSocialAuth = (index: number) => {
    switch (index) {
      case 0:
        onPressGoogleButton();
        break;
      case 1:
        onPressFBButton();
        break;
    }
  };
  return {
    isLanguageChanged,
    onChangeLanguage,
    onPressLoginButton,
    onSelectSocialAuth,
    handleSignIn,
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
