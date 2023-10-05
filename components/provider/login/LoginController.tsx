import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { storeData } from "../../../src/DataStorage/DataStorage";
import { useUserContext } from "../../../contexts/useUserContext";
import { AuthServicesProvider } from "../../../libs/authsevices/AuthServiceProvider";
import { GoogleAuthProvider } from "../../../libs/authsevices/GoogleAuthProvider";
import { LoginResponse, RequestUnSuccessful } from "../../../libs/types/AuthRespoonseType";
import { FacebookAuthProvider } from "../../../libs/authsevices/FcebookAuthProvider";

const LoginController = () => {
  const navigation = useNavigation();
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const { onGoogleAuthProcessing } = GoogleAuthProvider()
  const { onFBAuthProcessing } = FacebookAuthProvider()
  const { setUser } = useUserContext();
  const { onSubmitAuthRequest, onSubmitGoogleAuthRequest } = AuthServicesProvider();

  /** To handle Response from API after authentication request */
  const handleAuthResponse = (data: any) => {
    storeData('user', data);
    setUser(data)
    navigation.navigate("HomeView")
  }
  /** To handle User auth via email and password */
  const onHandleLogin = (email: string, password: string) => {
    /** To Request api  */
    onSubmitAuthRequest({ email, password }).then((res: LoginResponse | RequestUnSuccessful) => {
      //TODO handle issuccess
      if (res?.token) {
        handleAuthResponse(res)
      }
      else {
        //todo show error alert
      }

    })

  }
  /** To handle Google login  button click*/
  const onHandleGoogleLogin = () => {
    /** To process Google login from firestore */
    onGoogleAuthProcessing().then((userData) => {
      try {
        const email = userData?.user?.email
        const googleId = userData.user.providerData[0].uid
        /** To handle Google auth request to API */
        onSubmitGoogleAuthRequest({ email, googleId }).then((res) => {
          handleAuthResponse(res)
        })
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }
  /** To handle Facebook login  button click*/
  const onHandleFacebookLogin = () => {
    /** To process Facebook login from firestore */

    onFBAuthProcessing().then((userData) => {
      try {
        //TODO: under review with facebook 

        // const email = userData?.user?.email
        // const googleId = userData.user.providerData[0].uid
        // handleFacebookLogin({ email, googleId }).then((res) => {
        //   console.log("facebook", res)
        //   onLoginSuccessful(res)
        // })
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
    isChangeLanguage,
    onChangeLanguage,
    onHandleLogin,
    onHandleGoogleLogin,
    onHandleFacebookLogin,
    onSelectSocialAuth
  };
};

export default LoginController;

