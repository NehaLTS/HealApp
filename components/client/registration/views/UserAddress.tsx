import Input from "common/Input";
import SelectImage from "common/SelectImage";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { UseUserContext } from "contexts/useUserContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { fontWeight } from "designToken/fontWeights";
import { getTexts } from "libs/OneSkyHelper";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";

const UserAddress = () => {
  const { languageCode } = useTranslationContext();
  const {isShowModal, setIsShowModal } = BasicInformationController({});
  const { registration } = getTexts(languageCode);
  const addressRef = React.useRef<any>("");
  const dobRef = React.useRef<any>("");
  const idNumberRef = React.useRef<any>("");
  const { userData, setUserData } = UseUserContext();
  const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });

  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressError, setAddressError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const validateAddress = (text) => {
    const regex = /^[A-Za-z0-9\s.,/-]+$/;

    if (!regex.test(text)) {
      setAddressError("Invalid address format");
    } else {
      setAddressError("");
    }

    setAddress(text);
  };

  // Function to validate the ID number
  const validateIdNumber = (text) => {
    const regex = /^[0-9]+$/;

    if (!regex.test(text)) {
      setIdNumberError("ID number must contain only numbers");
    } else {
      setIdNumberError("");
    }

    setIdNumber(text);
  };

  const validateDateOfBirth = (text) => {
    // Define a regex pattern for the "DD/MM/YYYY" date format
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    if (!regex.test(text)) {
      setDateOfBirthError("Date of birth must be in DD/MM/YYYY format");
    } else {
      setDateOfBirthError("");
    }

    setDateOfBirth(text);
  };

  return (
    <>

      <Input
        placeholder={registration.address}
        value={address}
        onChangeText={(text) => setAddress(text)}
        errorMessage={addressError}
        inputStyle={styles.input}
        onBlur={() => setUserData({ ...userData, address: addressRef.current.value })}
        onChangeText={(value) => {
          addressRef.current.value = value;
        } }
        ref={addressRef}
        value={userData.address} inputValue={""}      />
      <Input
        placeholder={registration.date_of_birth}
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        errorMessage={dateOfBirthError}
        inputStyle={styles.inputDOB}
        onBlur={() => setUserData({ ...userData, date_of_birth: dobRef.current.value })}
        onChangeText={(value) => dobRef.current.value = value}
        ref={dobRef}
        value={userData.date_of_birth} inputValue={""}      />
      <Input
        placeholder={registration.id_number}
        value={idNumber}
        onChangeText={(text) => setIdNumber(text)}
        errorMessage={idNumberError}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
        onBlur={() => setUserData({ ...userData, id_number: idNumberRef.current.value })}
        onChangeText={(value) => idNumberRef.current.value = value}
        ref={idNumberRef}
        value={userData.id_number} inputValue={""}      />
      <Text style={styles.text}>{registration.find_doctor_text}</Text>
      <View style={styles.innerContainer}>
        <Text
          style={[
            styles.profileText,
            !userData.profile_picture && {
              marginTop: getHeight(dimens.marginS),
            },
          ]}>
          {registration.add_profile}
        </Text>
        <TouchableOpacity
          activeOpacity={userData.profile_picture ? 1 : 0.5}
          onPress={() => !userData.profile_picture && setIsShowModal(true)}
          style={styles.imageContainer}>
          <Image
            source={
              userData.profile_picture
                ? { uri: userData.profile_picture }
                : require("assets/icon/editprofile.png")
            }
            style={
              userData.profile_picture
                ? styles.selectedImage
                : styles.editProfile
            }
          />
        </TouchableOpacity>
        {userData.profile_picture && (
          <TouchableOpacity
            activeOpacity={userData.profile_picture ? 1 : 0.5}
            onPress={() => setIsShowModal(true)}
            style={styles.imageContainer}>
            <Image
              source={require("assets/icon/edit.png")}
              style={styles.editImage}
            />
          </TouchableOpacity>
        )}
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={getImageUrl}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginM),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
  },
  editProfile: {
    height: getHeight(dimens.imageS + dimens.marginS),
    width: getWidth(dimens.imageS + dimens.marginS),
  },
  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    fontWeight: fontWeight.light,
<<<<<<< HEAD
    letterSpacing: getWidth(dimens.borderThin / dimens.borderBold)
=======
    letterSpacing: getWidth(dimens.borderThin / dimens.borderBold),
>>>>>>> f62bfbedb5237233021cff5437f064e4d99a3884
  },
  input: {
    marginTop: getHeight(dimens.paddingS),
  },
  inputDOB: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputIdNumber: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  },
});

export default UserAddress;
