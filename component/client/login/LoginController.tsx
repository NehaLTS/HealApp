import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { UseLoginClient } from "../../../src/api's/UseLoginClient";
import { Alert } from "react-native";
import { getData, storeData } from "../../../src/DataStorage/DataStorage";
import { useUpdateEffect } from "../../useUpdateEffect";
import { GoogleViewController } from "../../../common/googleauth/GoogleButtonViewController";
import { useUserContext } from "../../../contexts/useUserContext";

const LoginController = () => {
  const { useLoginQuery } = UseLoginClient()
  const navigation = useNavigation();
  const [apiData, setApiData] = useState<{ email: string, password: string }>()
  const { data, isFetching, isFetched } = useLoginQuery(apiData)
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
  const { onGoogleLogin } = GoogleViewController()
  const { user, setUser } = useUserContext();

  useUpdateEffect(() => {
    if (data?.token) {
      storeData('user', data);
      setUser(data)
      navigation.navigate("HomeView")
    }
    else if (data?.message) {
      Alert.alert(data?.message)
    }
  }, [isFetched, apiData])
  const handleLogin = (email: string, password: string) => {
    setApiData({ email, password })

  }
  const handleGoogleLogin = () => {
    onGoogleLogin().then((userData) => {
      try {
        console.log('Signed in with Google!', JSON.stringify(userData));
      } catch (err) {
        console.log('Error occurred!');
      }
    })
  }
  const handleFacebookLogin = async () => {
    const userData = await getData('user');
    if (userData) {
      console.log('User data:', user);
      // You can use userData for further processing
    } else {
      console.log('User data not found.');
    }
  }
  return {
    isChangeLanguage,
    onChangeLanguage,
    handleLogin,
    isFetching,
    handleGoogleLogin,
    handleFacebookLogin
  };
};

export default LoginController;
