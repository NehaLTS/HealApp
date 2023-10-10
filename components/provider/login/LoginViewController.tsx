import { useNavigation } from "@react-navigation/native";
import { useApiContext } from "contexts/useApiContext";
import { UseUserContextProvider } from "contexts/useUserContextProvider";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { FacebookAuthProvider } from "libs/authsevices/FcebookAuthProvider";
import { GoogleAuthProvider } from "libs/authsevices/GoogleAuthProvider";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { useState } from "react";
import { Alert } from "react-native";

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider()
  const { onFBAuthProcessing } = FacebookAuthProvider()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { OnProviderSignIn, onSubmitGoogleAuthRequestProvider, onSubmitFBAuthRequestProvider } = AuthServicesProvider();
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError('');
    }
  };

  const isValidPassword = (password: string) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 8 characters");
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must contain special characters");
    } else {
      setPasswordError('');
    }
  };

  const handleSignIn = () => {
    if (!emailError && !passwordError) onPressLoginButton(email, password)
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };
  /** To handle Response from API after authentication request */
  const handleAuthResponse = () => {
    navigation.navigate("HomeView")
  }
  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string) => {
    console.log("yegfjusdfj", email, password)
    try {
      const res = await OnProviderSignIn({ email, password });
      setUserDataProvider({ ...userDataProvider, token: res?.token, isSuccessful: res?.isSuccessful });
      setLocalData('USER', res)
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
  const onHandleGoogleLogin = () => {
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then(async (userData) => {
      try {
        console.log("vbxcvbnxvb", userData)
        const email = userData?.user?.email
        const googleId = userData.user.providerData[0].uid
        /** To handle Google auth request to API */
        const res = await onSubmitGoogleAuthRequestProvider({ email, googleId });
        setUserDataProvider?.({ ...userDataProvider, token: res.token });
        setLocalData('USER', res);
        if (res?.isSuccessful === true) {
          handleAuthResponse()
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }
  /** To handle Facebook login  button click*/
  const onHandleFacebookLogin = () => {
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email
        const facebookId = userData?.user?.providerData[0]?.uid
        const res = await onSubmitFBAuthRequestProvider({ email, facebookId });
        setUserDataProvider({ ...userDataProvider, token: res.token });
        setLocalData('USER', res)
        if (res?.isSuccessful === true) {
          handleAuthResponse()
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
      case 0: onHandleGoogleLogin()
        break;
      case 1: onHandleFacebookLogin()
        break;

    }
  }
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
  };
};

export default LoginViewController;

