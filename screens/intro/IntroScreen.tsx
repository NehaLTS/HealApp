import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import logo from "../assets/icon/logo.png";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../designToken/colors";
import { dimens } from "../../designToken/dimens";
import { getHeight, getWidth } from "../../libs/StyleHelper";

const IntroScreen = () => {
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const navigation = useNavigation()
  const continueAsClient = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <Text
          style={styles.language}
          onPress={() => setIsChangeLanguage(!isChangeLanguage)}
        >
          EN
        </Text>
        {isChangeLanguage && (
          <View style={styles.languageContainer}>
            <Text style={styles.language}>English</Text>
          </View>
        )}
      </View>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome to Heal</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{
            borderWidth: getHeight(1),
            borderColor: "rgba(12, 127, 187, 1)",
            backgroundColor: "rgba(12, 127, 187, 1)",
            alignItems: "center",
            justifyContent: "center",
            height: getHeight(48),
            borderRadius: getHeight(5),
            zIndex: 1
          }}
          onPress={continueAsClient}
        >
          <Text
            style={{
              fontSize: getHeight(24),
              color: "#fff",
              fontWeight: "600",
              lineHeight: getHeight(28),
            }}
          >
            Continue as a Client
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: getHeight(1),
            alignItems: "center",
            justifyContent: "center",
            height: getHeight(48),
            borderRadius: getHeight(5),
          }}
        >
          <Text
            style={{
              fontSize: getHeight(24),
              color: "#000",
              lineHeight: getHeight(28),
            }}
          >
            Continue as a Provider
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginMd),
  },
  language: {
    color: "#000",
    alignSelf: "flex-end",
    padding: getHeight(5),
    fontSize: getHeight(16),
    paddingRight: 0,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  logo: {
    width: getWidth(247),
    height: getHeight(252),
    alignSelf: "center",
  },
  welcomeText: {
    fontSize: getHeight(26),
    color: "#000",
    alignSelf: "center",
    paddingTop: getHeight(20),
  },
  buttonContainer: {
    gap: getHeight(30),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: getHeight(25),
  },
  languageContainer: {
    position: "absolute",
    width: getWidth(125),
    maxWidth: getWidth(125),
    height: getHeight(140),
    maxHeight: getHeight(142),
    padding: getHeight(6),
    borderWidth: getHeight(1),
    borderColor: "rgba(12, 127, 187, 1)",
    zIndex: 1,
    borderRadius: getHeight(10),
    alignItems: "flex-end",
    right: 0,
    backgroundColor: "#fff",
    top: "88%",
  },
});
