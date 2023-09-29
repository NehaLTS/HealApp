import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import logo from "../../../assets/icon/logo.png";
import { colors } from "../../../designToken/colors";
import { dimens } from "../../../designToken/dimens";
import { fontSize } from "../../../designToken/fontSizes";
import { getHeight, getWidth } from "../../../libs/StyleHelper";
import { UseLoginClient } from "../../../src/api's/UseLoginClient";
import Button from "../../common/Button";
import Input from "../../common/Input";
import TextButton from "../../common/TextButton";
import LoginController from "./LoginController";
import { FacebookAuthProvider } from "../../../common/authprovider/FcebookAuthProvider";
import { GoogleViewController } from "../../../common/authprovider/GoogleAuthProvider";


const LoginView = () => {
  const navigation = useNavigation();
  const {onFacebookButtonPress} = FacebookAuthProvider()
  const { isChangeLanguage, onChangeLanguage } = LoginController();
  const { onGoogleLogin } = GoogleViewController()
  const { useLoginQuery } = UseLoginClient()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [apiData, setApiData] = useState<{ email: string, password: string }>()
  const { data, error, isFetched, isFetching, isLoading } = useLoginQuery(apiData)

  const handleLogin = async () => {
    await setApiData({ email, password })
    if (!error)
      await navigation.navigate("HomeView")
    else {
      Alert.alert('something went wrong')
    }
  }
  return (

    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.languageContainer}>
          <Text style={styles.language} onPress={onChangeLanguage}>EN</Text>
          {isChangeLanguage && (
            <View style={styles.languagePopUp}>
              <Text style={styles.language}>English</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.toggleContainer}>
        <TextButton title={"SIGN IN"} onPress={() => { }} isActive={true} />
        <TextButton title={"SIGN UP"} onPress={() => { }} />
      </View>
      <Text style={styles.loginText}>Client Login</Text>
      <View style={styles.inputContainer}>
        <Input placeholder={"Email*"} value={email} onChangeText={(e) => setEmail(e)} />
        <Input placeholder="Password*" type="password" value={password} onChangeText={(e) => setPassword(e)} />
      </View>
      <TextButton
        title="Forgot password?"
        onPress={() => { }}
        fontSize={getHeight(fontSize.textSm)}
        isActive
        style={styles.forgotText}
      />
      {isFetching ? <ActivityIndicator style={{ top: getHeight(20) }} size='large' color={colors.primary} /> : <Button title={"Sign In"} isPrimary isSmall style={styles.signInButton} onPress={handleLogin} />}

      <View style={styles.footerContainer}>
        <View style={styles.signInViaContainer}>
          <Text style={styles.signInViaText}>Or sign in via</Text>
          <TouchableOpacity onPress={() => {
            onGoogleLogin().then((userData) => {
              try {
                console.log('Signed in with Google!', JSON.stringify(userData));
              } catch (err) {
                console.log('Error occurred!');
              }
            })
          }}>
            <Image
              source={require("../../../assets/icon/google.png")}
              style={{ width: getWidth(40), height: getHeight(40) }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            onFacebookButtonPress().then((userData)=>{
              try {
                console.log('Signed in with Facebook!', JSON.stringify(userData));
              } catch (err) {
                console.log('Error occurred!');
              }
            })
          }}>
            <Image
              source={require("../../../assets/icon/facebook.png")}
              style={{ width: getWidth(40), height: getHeight(40) }}
            />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/icon/apple.png")}
            style={{ width: getWidth(40), height: getHeight(50) }}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.loginText}>Guest Entrance</Text>
          <TextButton
            title="Switch to Provider"
            onPress={() => { }}
            fontSize={getHeight(fontSize.textXl)}
            style={[styles.loginText, styles.switchProvider]}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginMd),
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  language: {
    color: colors.black,
    alignSelf: "flex-end",
    padding: getHeight(5),
    fontSize: getHeight(16),
    paddingRight: 0,
  },
  languagePopUp: {
    position: "absolute",
    width: getWidth(125),
    maxWidth: getWidth(125),
    height: getHeight(140),
    maxHeight: getHeight(142),
    padding: getHeight(6),
    borderWidth: getHeight(1),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(10),
    alignItems: "flex-end",
    right: 0,
    backgroundColor: colors.white,
    top: "88%",
  },
  logo: {
    width: getWidth(195),
    height: getHeight(185),
    top: getHeight(-16),
  },
  languageContainer: {
    position: "absolute",
    right: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loginText: {
    fontSize: getHeight(18),
    color: colors.black,
    alignSelf: "center",
    paddingTop: getHeight(12),
  },
  inputContainer: {
    paddingTop: getHeight(dimens.paddingLg + dimens.marginSm),
    rowGap: getHeight(26),
    paddingBottom: getHeight(dimens.paddingSm),
  },
  forgotText: {
    alignSelf: "center",
  },
  signInButton: {
    marginTop: getHeight(36),
    alignSelf: "center",
  },
  signInViaText: {
    fontSize: getHeight(fontSize.textLg),
    color: colors.black,
    width: "35%",
  },
  signInViaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchProvider: {
    color: colors.primary,
  },
  footerContainer: {
    flex: 0.88,
    justifyContent: "flex-end",
    rowGap: getHeight(10),
  },
});
