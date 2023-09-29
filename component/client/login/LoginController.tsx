import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { UseLoginClient } from "../../../src/api's/UseLoginClient";
import { storeData } from "../../../src/DataStorage/DataStorage";
import { useUserContext } from "../../../contexts/useUserContext";
import { AuthServicesProvider } from "../../../libs/authsevices/AuthSevices";
import { GoogleAuthProvider } from "../../../libs/authsevices/GoogleAuthProvider";
import { LoginResponse, RequestUnSuccessful } from "../../../libs/types/AuthRespoonseType";
import { FacebookAuthProvider } from "../../../libs/authsevices/FcebookAuthProvider";

const images = [
  { url: require("../../../assets/icon/google.png") },
  { url: require("../../../assets/icon/facebook.png") },
  { url: require( "../../../assets/icon/apple.png") },
];
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

  const onSocialMediaLogin =(index:number)=>
  {
   switch(index)
   {
    case 0: onGoogleLogin
    break;
    case 1: onFacebookLogin
    break;
      
   }
  }


  return {
    images,
    isChangeLanguage,
    onChangeLanguage,
    onHandleLogin,
    isFetching,
    onHandleGoogleLogin,
    onHandleFacebookLogin,
    onSocialMediaLogin
  };
};

export default LoginController;

