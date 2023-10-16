import { useNavigation } from "@react-navigation/native";
import { UserType, UseUserContext } from "contexts/useUserContext";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useState } from "react";
import { Alert } from "react-native";
import { FacebookAuthProvider } from "../../../libs/authsevices/FcebookAuthProvider";
import { GoogleAuthProvider } from "../../../libs/authsevices/GoogleAuthProvider";

const LoginViewController = () => {
  const navigation = useNavigation();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged);
  const { onGoogleAuthProcessing } = GoogleAuthProvider()
  const { onFBAuthProcessing } = FacebookAuthProvider()
  const { userData, setUserData } = UseUserContext()
  const { onSubmitAuthRequest, onSubmitFBAuthRequest, onSubmitGoogleAuthRequest } = AuthServicesClient()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const isValidPassword = (password: string) => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
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
      setPasswordError("");
    }
  };

  const handleSignIn = () => {
    if (!emailError && !passwordError) onPressLoginButton(email, password);
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  };  /** To handle Response from API after authentication request */
  const handleAuthResponse = () => {
    console.log(getLocalData('USER')?.user)
    navigation.navigate(NavigationRoutes.ClientHome)
  }
  /** To handle User auth via email and password */
  const onPressLoginButton = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      if (email != '') {
        const res = await onSubmitAuthRequest({ email, password });
        setUserData({ ...userData, token: res?.token, isSuccessful: res?.isSuccessful });
        setLocalData('USER', res)
        setIsLoading(false)
        if (res?.isSuccessful === true) {
          handleAuthResponse();
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
      }
      else {
        setIsLoading(false)
        Alert.alert("Please enter email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("An error occurred during login.");
    }
  }
  /** To handle Google login  button click*/
  const onPressGoogleButton = async () => {
    setIsLoading(true)
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then(async (userData) => {
      try {
        const email = userData?.user?.email ?? ""
        const googleId = userData.user?.uid ?? ""
        /** To handle Google auth request to API */
       
        const res = await onSubmitGoogleAuthRequest({ email, googleId });

        if (res?.isSuccessful === true) {
          setUserData?.({ ...userData, token: res.token });
          setLocalData('USER', res) 
          navigation.navigate('BasicInfo')
          setIsLoading(false)
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
        }
      }
      catch (err) {
        console.log('Error occurred!');
        setIsLoading(false)
      }
    })
  }
  /** To handle Facebook login  button click*/
  const onPressFBButton = () => {
    setIsLoading(true)
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then(async (userData) => {
      try {
        //TODO: under review with facebook
        // const email = "amanshar@gmail.com"
        // const facebookId = "sharm@hmail.com"
        
        const email = userData.user.email
        const facebookId = userData.additionalUserInfo?.profile?.id
        const res = await onSubmitFBAuthRequest({ email, facebookId });
        setUserData?.({ ...userData, token: res.token });
        setLocalData('USER', res)
        if (res?.isSuccessful === true) {
          navigation.navigate('BasicInfo')
          setIsLoading(false)
        } else {
          Alert.alert("Login Failed", "Please check your email and password and try again.");
          setIsLoading(false)
        }
      } catch (err) {
        console.log('Error occurred!');
        
      }
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
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
    isLoading
  };
};

export default LoginViewController;

