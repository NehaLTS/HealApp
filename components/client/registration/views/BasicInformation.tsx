import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../../../../assets/icon/logo.png";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Button from "../../../common/Button";
import Tabs from "../../../common/Tabs";
import Input from "../../../common/Input";
import { fontWeight } from "../../../../designToken/fontWeights";

const BasicInformation = () => {
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(currentStep);
  const tab = [{ title: "1" }, { title: "2" }, { title: "3" }];
  const handleNext = () => {
    setCurrentStep((prev) => {
      const newStep = prev + 1;
      return newStep < tab.length ? newStep : prev;
    });
  };
  const handleBack = () => {
    setCurrentStep((prev) => {
      const newStep = prev - 1;
      return newStep >= 0 ? newStep : prev;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>Registration</Text>
        <View style={styles.languageContainer}>
          <Text
            style={styles.language}
            onPress={() => setIsChangeLanguage(!isChangeLanguage)}
          >
            EN
          </Text>
          {isChangeLanguage && (
            <View style={styles.languagePopUp}>
              <Text style={styles.language}>English</Text>
            </View>
          )}
        </View>
      </View>
      <Tabs tab={tab} currentStep={currentStep} />
      {currentStep === 0 ? (
        <>
          <View style={{ rowGap: getHeight(26) }}>
            <Input placeholder={"First Name*"} type={"name"} />
            <Input placeholder={"Last Name*"} type={"nameSuffix"} />
            <Input
              placeholder={"ID Number*"}
              type={"telephoneNumber"}
              keyboardType="number-pad"
            />
          </View>
          <Text
            style={{
              fontSize: fontSize.textMd,
              color: colors.black,
              paddingTop: getHeight(5),
            }}
          >
            *It will help us to find a best doctor for you
          </Text>
        </>
      ) : currentStep === 1 ? (
        <>
          <View style={{ rowGap: getHeight(26) }}>
            <Input placeholder={"Address*"} type={"fullStreetAddress"} />
            <Input
              placeholder={"Date of Birth*"}
              type={"telephoneNumber"}
              keyboardType="numeric"
            />
            <Input
              placeholder={"ID Number*"}
              type={"telephoneNumber"}
              keyboardType="number-pad"
            />
          </View>
          <Text
            style={{
              fontSize: fontSize.textMd,
              color: colors.black,
              paddingTop: getHeight(5),
            }}
          >
            *It will help us to find a best doctor for you
          </Text>
          <View style={styles.innerContainer}>
            <Text style={styles.profileText}>Add a profile photo</Text>
            <TouchableOpacity>
              <Image
                source={require("../../../../assets/icon/editprofile.png")}
                style={styles.editProfile}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: getWidth(20),
            }}
          >
            <Image
              source={require("../../../../assets/icon/card.png")}
              style={styles.creditCard}
            />
            <Text style={styles.profileText}>Add credit card</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input placeholder={"Credit Card Number*"} keyboardType='numeric' type='creditCardNumber' />
            <View style={{ flexDirection: "row", columnGap: getHeight(20) }}>
              <Input placeholder={"MM/YY*"} containerWidth={"100%"} />
              <Input placeholder={"CVV*"} containerWidth={"100%"} />
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.googlePayContainer}>
            <Image
              source={require("../../../../assets/icon/googlePay.png")}
              style={styles.googlePay}
            />
            <TouchableOpacity>
              <Text style={styles.profileText}>Add Google Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.footerContainer}>
        <Button title={"Back"} isSmall onPress={handleBack} />
        <Button title={"Next"} isPrimary isSmall onPress={handleNext} />
      </View>
      {currentStep === 2 && (
        <View style={styles.skipForLater}>
          <Text style={styles.skipLaterText}>Skip for later</Text>
        </View>
      )}
    </>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    color: colors.black,
    fontSize: getWidth(fontSize.headingLg),
    lineHeight: getHeight(28),
  },
  language: {
    color: colors.black,
    padding: getHeight(5),
    fontSize: getHeight(16),
    paddingRight: 0,
  },
  languagePopUp: {
    position: "absolute",
    width: getWidth(125),
    maxWidth: getWidth(125),
    height: getHeight(140),
    maxHeight: getHeight(140),
    padding: getHeight(6),
    borderWidth: getHeight(1),
    borderColor: colors.primary,
    zIndex: 1,
    borderRadius: getHeight(10),
    alignItems: "flex-end",
    right: 0,
    backgroundColor: colors.white,
    top: "40%",
  },
  logo: {
    width: getWidth(70),
    height: getHeight(55),
  },
  languageContainer: {
    position: "relative",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    bottom: getHeight(66),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(20),
    marginTop: getHeight(12),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textLg),
    fontWeight: fontWeight.normal,
  },
  editProfile: {
    height: getHeight(60),
    width: getWidth(60),
  },
  divider: {
    height: getWidth(1),
    backgroundColor: colors.black,
    marginTop: getHeight(10),
  },
  googlePay: {
    height: getHeight(32),
    width: getWidth(32),
  },
  inputContainer: {
    gap: getHeight(26),
    marginTop: getHeight(18),
  },
  creditCard: {
    width: getWidth(25),
    height: getHeight(20),
  },
  googlePayContainer: {
    flexDirection: "row",
    gap: getHeight(26),
    alignItems: "center",
    marginTop: getHeight(16),
  },
  skipForLater: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  skipLaterText: {
    color: "black",
    textAlign: "center",
    fontSize: getWidth(18),
    marginBottom: getHeight(30),
  },
});
