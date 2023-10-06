import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { GoogleAuthProvider } from "../../../libs/authsevices/GoogleAuthProvider";
import { FacebookAuthProvider } from "../../../libs/authsevices/FcebookAuthProvider";
import { useApiContext } from "../../../contexts/useApiContext";
import { Alert } from "react-native";
// import { useUserContext } from "contexts/useUserContext";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider()
  const { onFBAuthProcessing } = FacebookAuthProvider()
  const { onLoginUser, onLoginWithGoogle, onLoginWithFB } = useApiContext();
  /** To handle Response from API after authentication request */
  const handleAuthResponse = () => {
    navigation.navigate("HomeView")
  }
  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string) => {
    try {
      const res = await onLoginUser?.(email, password);
      if (res?.isSuccessful === true) {
        handleAuthResponse();
      } else {
        Alert.alert("Login Failed", "Please check your email and password and try again.");
      }

    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("An error occurred during login.");
    }
  }
  /** To handle Google login  button click*/
  const onPressGoogleButton = async () => {
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email
        const googleId = userData.user.providerData[0].uid
        /** To handle Google auth request to API */
        const res = await onLoginWithGoogle?.(email, googleId);
        if (res?.isSuccessful === true) {
          navigation.navigate('BasicInfo')
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }
  /** To handle Facebook login  button click*/
  const onPressFBButton = () => {
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        //TODO: under review with facebook 
        const email = "amanshar@gmail.com"
        const facebookId = "sharm@hmail.com"
        let res = await onLoginWithFB?.(email, facebookId)
        console.log('bhjbhmb', res)
        if (res?.isSuccessful === true) {
          navigation.navigate('BasicInfo')
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }
  /** To handle social media selection button click */
  const onSelectSocialAuth = (index: number) => {
    switch (index) {
      case 0: onPressGoogleButton()
        break;
      case 1: onPressFBButton()
        break;

    }
  }
  return {
    isLanguageChanged,
    onChangeLanguage,
    onPressLoginButton,
    onSelectSocialAuth
  };
};

export default LoginViewController;

