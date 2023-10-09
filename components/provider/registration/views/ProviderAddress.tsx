import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import { fontSize } from '../../../../designToken/fontSizes';
import { dimens } from '../../../../designToken/dimens';
import { fontWeight } from '../../../../designToken/fontWeights';
import { colors } from '../../../../designToken/colors';
import Input from '../../../common/Input';
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';
import { getTexts } from '../../../../libs/OneSkyHelper';
import SelectImage from '../../../common/SelectImage';
import BasicInformationController from '../controllers/BasicInformationController';

const ProviderAddress = () => {
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseNumberError, setLicenseNumberError] = useState("");




  const validateAddress = (text) => {
    const regex = /^[A-Za-z0-9\s.,/-]+$/;

    if (!regex.test(text)) {
      setAddressError("Invalid address format");
    } else {
      setAddressError("");
    }

    setAddress(text);
  };

  const validatePhoneNumber = () => {

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
    } else {
      setPhoneNumberError("");
    }
  };
  const validateLicenseNumber = (text) => {
    const regex = /^\d+$/;

    if (!regex.test(text)) {
      setLicenseNumberError("Invalid license number format");
    } else {
      setLicenseNumberError("");
    }

    setLicenseNumber(text);
  };


  return (
    <>
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        value={phoneNumber}
        errorMessage={phoneNumberError}
        onChangeText={(text) => setPhoneNumber(text)}
        onBlur={validatePhoneNumber}
      />

      <Input
        placeholder="License number (for those who have)"
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        value={licenseNumber}
        errorMessage={licenseNumberError}
        onChangeText={(text) => validateLicenseNumber(text)}
        onBlur={() => validateLicenseNumber(licenseNumber)}
      />
      <Input
        placeholder={registration.address}
        value={address}
        onChangeText={(text) => setAddress(text)}
        errorMessage={addressError}
        inputStyle={styles.inputAddress}
        onBlur={validateAddress}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>Upload license photo</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => !selectedImage && setIsShowModal(true)}

        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/licencesIcon.png")
            }
            style={selectedImage ? styles.selectedImage : styles.editImage}
          />
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

export default ProviderAddress;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: "center"

  },
  inputAddress: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputPhone: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputLastName: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  errorText: {
    color: "red",
    fontSize: fontSize.textS,
    marginTop: getHeight(dimens.paddingXs),
  },
  editImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    // marginTop: getHeight(dimens.marginM),
  },
  iconContainer: {
    flexDirection: "row",
    gap: getHeight(dimens.marginM),
    alignItems: "center",
    marginTop: getHeight(dimens.marginM),
  },

  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),

  },
});