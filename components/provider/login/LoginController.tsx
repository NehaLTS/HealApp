import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { GoogleAuthProvider } from '../../../libs/authsevices/GoogleAuthProvider';
import { FacebookAuthProvider } from '../../../libs/authsevices/FcebookAuthProvider';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { UserType } from 'libs/types/UserType';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import NavigationRoutes from 'navigator/NavigationRoutes';

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider();
  const { onFBAuthProcessing } = FacebookAuthProvider();
  const {
    OnProviderSignIn,
    onSubmitGoogleAuthRequestProvider,
    onSubmitFBAuthRequestProvider,
  } = AuthServicesProvider();
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider();
  const { t, i18n } = useTranslation();
  /** To handle Response from API after authentication request */
  const handleAuthResponse = () => {
    navigation.navigate(NavigationRoutes.ClientHome);
  };
  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string) => {
    try {
      const res = await OnProviderSignIn({ email, password });
      setUserDataProvider({
        ...userDataProvider,
        token: res?.token,
        isSuccessful: res?.isSuccessful,
      });
      setLocalData('USER', res);
      if (res?.isSuccessful === true) {
        handleAuthResponse();
      } else {
        Alert.alert(
          'Login Failed',
          'Please check your email and password and try again.',
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login.');
    }
  };
  // const handleLanguageChange = (lng: string) => {
  //   i18n.changeLanguage(lng)
  //   // setLocalData('USER', {  })
  //   // setLocalData('USER', {  })
  //   setLocalData('USER', {
  //     ...getLocalData('USER')?.user,
  //     user: {
  //       language: lng
  //     }
  //   }) as unknown as UserType
  // };
  /** To handle Google login  button click*/
  const onPressGoogleButton = async () => {
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
        setUserDataProvider?.({ ...userDataProvider, token: res.token });
        setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse();
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
  /** To handle Facebook login  button click*/
  const onPressFBButton = () => {
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        console.log('vhxjvchxbv', userData);
        //TODO: under review with facebook
        // const email = "amanshar@gmail.com"
        // const facebookId = "sharm@hmail.com"
        const email = userData?.user?.email;
        const facebookId = userData?.user?.providerData[0]?.uid;
        const res = await onSubmitFBAuthRequestProvider({ email, facebookId });
        setUserDataProvider({ ...userDataProvider, token: res.token });
        setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse();
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
  };
};

export default LoginViewController;
