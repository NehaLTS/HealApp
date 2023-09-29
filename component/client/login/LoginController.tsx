import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { UseLoginClient } from "../../../src/api's/UseLoginClient";
import { storeData } from "../../../src/DataStorage/DataStorage";
import { useUserContext } from "../../../contexts/useUserContext";
import { AuthServicesProvider } from "../../../libs/authsevices/AuthSevices";
import { GoogleAuthProvider } from "../../../libs/authsevices/GoogleAuthProvider";
import { LoginResponse, RequestUnSuccessful } from "../../../libs/types/AuthRespoonseType";
import { FacebookAuthProvider } from "../../../libs/authsevices/FcebookAuthProvider";

const LoginController = () => {
  const { useLoginQuery } = UseLoginClient()
  const navigation = useNavigation();
  const [apiData, setApiData] = useState<{ email: string, password: string }>()
  const { isFetching } = useLoginQuery(apiData)
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const { onGoogleLogin } = GoogleAuthProvider()
  const { onFacebookLogin } = FacebookAuthProvider()
  const { setUser } = useUserContext();
  const { handleLogin, handleGoogleLogin, handleFacebookLogin, handleAppleLogin } = AuthServicesProvider();
  const onLoginSuccessful = (data: any) => {
    storeData('user', data);
    setUser(data)
    navigation.navigate("HomeView")

  }
  const onHandleLogin = (email: string, password: string) => {
    handleLogin({ email, password }).then((res: LoginResponse | RequestUnSuccessful) => {
      if (res?.token) {
        onLoginSuccessful(res)
      }
      else {
        //todo show error alert
      }

    })

  }
  const onHandleGoogleLogin = () => {
    onGoogleLogin().then((userData) => {
      try {
        const email = userData?.user?.email
        const googleId = userData.user.providerData[0].uid
        handleGoogleLogin({ email, googleId }).then((res) => {
          onLoginSuccessful(res)
        })
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }

  const onHandleFacebookLogin = () => {
    onFacebookLogin().then((userData) => {
      try {
        //todo under review with facebook
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


  return {
    isChangeLanguage,
    onChangeLanguage,
    onHandleLogin,
    isFetching,
    onHandleGoogleLogin,
    onHandleFacebookLogin,
  };
};

export default LoginController;

