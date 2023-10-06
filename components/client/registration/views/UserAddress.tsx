import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import SelectImage from "../../../common/SelectImage";
import BasicInformationController from "../controllers/BasicInformationController";
import { fontWeight } from "../../../../designToken/fontWeights";

const UserAddress = () => {
  const { languageCode } = useTranslationContext();
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { registration } = getTexts(languageCode);

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
        onBlur={validateAddress}
      />
      <Input
        placeholder={registration.date_of_birth}
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        errorMessage={dateOfBirthError}
        inputStyle={styles.inputDOB}
        onBlur={validateDateOfBirth}
      />
      <Input
        placeholder={registration.id_number}
        value={idNumber}
        onChangeText={(text) => setIdNumber(text)}
        errorMessage={idNumberError}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
        onBlur={validateIdNumber}
      />
      <Text style={styles.text}>{registration.find_doctor_text}</Text>
      <View style={styles.innerContainer}>
        <Text style={[styles.profileText, selectedImage === "" && { marginTop: getHeight(dimens.marginS) }]}>{registration.add_profile}</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => !selectedImage && setIsShowModal(true)}
          style={styles.imageContainer}
        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/editprofile.png")
            }
            style={selectedImage ? styles.selectedImage : styles.editProfile}
          />
          {selectedImage && (
            <Image
              source={require("../../../../assets/icon/edit.png")}
              style={styles.editImage}
            />
          )}
        </TouchableOpacity>
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={setSelectedImage}
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
    fontSize: getWidth(fontSize.textL)
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
    letterSpacing: getWidth(dimens.borderThin / dimens.borderBold)
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
