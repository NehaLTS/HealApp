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
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { getTexts } from "../../../../libs/OneSkyHelper";
import BasicInformationController from "../controllers/BasicInformationController";

const BasicInformation = () => {
  const [isChangeLanguage, setIsChangeLanguage, ] = useState(false);
 const {handleLanguageChange}=BasicInformationController();
  const [currentStep, setCurrentStep] = useState(0);
  const { languageCode } = useTranslationContext()
  const { registration } = getTexts(languageCode)

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
    <Text style={styles.header}>{registration.registration}</Text>
    {/* <View style={styles.languageContainer}>
      <Text
        style={styles.language}
        onPress={() => setIsChangeLanguage(!isChangeLanguage)}
      >
        EN
      </Text>
      {isChangeLanguage && (
      <View style={styles.languageContainer}>
        <Text
          style={styles.language}
          onPress={() => handleLanguageChange('en')}
        >
          English
        </Text>
        <Text
          style={styles.language}
          onPress={() => handleLanguageChange('he')}
        >
          עִברִית
        </Text>
        <Text
          style={styles.language}
          onPress={() => handleLanguageChange('ar')}
        >
          العربي
        </Text>
        <Text
          style={styles.language}
          onPress={() => handleLanguageChange('ru')}
        >
          русский
        </Text>
      </View>
    )}
    </View> */}
  </View>
      <Tabs tab={tab} currentStep={currentStep} />
      {currentStep === 0 ? (
        <>
          <View style={{ rowGap: getHeight(26) }}>
            <Input placeholder={registration.first_name} type={"name"} />
            <Input placeholder={registration.last_name} type={"nameSuffix"} />
            <Input
              placeholder={registration.id_number}
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
          >{registration.it_will_help_us_to_find_a_best_doctor_for_you}
          </Text>
        </>
      ) : currentStep === 1 ? (
        <>
          <View style={{ rowGap: getHeight(26) }}>
            <Input placeholder={registration.address} type={"fullStreetAddress"} />
            <Input
              placeholder={registration.date_of_birth}
              type={"telephoneNumber"}
              keyboardType="numeric"
            />
            <Input
              placeholder={registration.id_number}
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
          >{registration.it_will_help_us_to_find_a_best_doctor_for_you}
          </Text>
          <View style={styles.innerContainer}>
            <Text style={styles.profileText}>{registration.add_a_profile_photo}</Text>
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
            <Text style={styles.profileText}>{registration.add_credit_card}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input placeholder={registration.credit_card_number} keyboardType='numeric' type='creditCardNumber' />
            <View style={{ flexDirection: "row", columnGap: getHeight(20) }}>
              <Input placeholder={registration.mm_yy} containerWidth={"100%"} />
              <Input placeholder={registration.cvv} containerWidth={"100%"} />
            </View>
            <View style={styles.divider} />
          </View>
          <View style={styles.googlePayContainer}>
            <Image
              source={require("../../../../assets/icon/googlePay.png")}
              style={styles.googlePay}
            />
            <TouchableOpacity>
              <Text style={styles.profileText}>{registration.add_google_pay}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.footerContainer}>
        <Button title={registration.back} isSmall onPress={handleBack} />
        <Button title={registration.next} isPrimary isSmall onPress={handleNext} />
      </View>
      {currentStep === 2 && (
        <View style={styles.skipForLater}>
          <Text style={styles.skipLaterText}>{registration.skip_for_later}</Text>
        </View>
      )}
    </>
  );
};

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
   
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
  // languagePopUp: {
  //   position: "absolute",
  //   width: getWidth(125),
  //   maxWidth: getWidth(125),
  //   height: getHeight(140),
  //   maxHeight: getHeight(140),
  //   padding: getHeight(6),
  //   borderWidth: getHeight(1),
  //   borderColor: colors.primary,
  //   zIndex: 1,
  //   borderRadius: getHeight(10),
  //   alignItems: "flex-end",
  //   right: 0,
  //   backgroundColor: colors.white,
  //   top: "40%",
  // },
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
