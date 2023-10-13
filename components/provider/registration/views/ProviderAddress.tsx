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
import { UseUserContextProvider } from 'contexts/useUserContextProvider';

const ProviderAddress = () => {
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");


  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const phoneRef = React.useRef<any>("");
  const licenseRef = React.useRef<any>("");
  const addressRef = React.useRef<any>("");

  const onBlurPhoneNumber = () => { validatePhoneNumber(); setUserDataProvider({ ...userDataProvider, phone_number: phoneRef.current.value }) }
  const onChangePhoneNumber = (value: string) => phoneRef.current.value = value

  const onBlurLastName = () => setUserDataProvider({ ...userDataProvider, license: licenseRef.current.value })
  const onChangeLastName = (value: string) => licenseRef.current.value = value

  const onBlurAddress = () => { validateAddress(); setUserDataProvider({ ...userDataProvider, address: addressRef.current.value }) }
  const onChangeAddress = (value: string) => addressRef.current.value = value

  const getImageUrl = (url: string) => setUserDataProvider({ ...userDataProvider, license_photo: url });
  console.log('userDataProvider',userDataProvider)

  const validatePhoneNumber = () => {
    if (!phoneRef.current.value) {
      setPhoneError("Phone number is required");
    } else {
      setPhoneError("");
    }
  };

  const validateAddress = () => {
    if (!addressRef.current.value) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };


  return (
    <>
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        onBlur={onBlurPhoneNumber}
        onChangeText={onChangePhoneNumber}
        ref={phoneRef}
        value={userDataProvider.phone_number}
        inputValue={userDataProvider?.phone_number ?? ""}
        errorMessage={phoneError}
      />

      <Input
        placeholder="License number (for those who have)"
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        onBlur={onBlurLastName}
        onChangeText={onChangeLastName}
        ref={licenseRef}
        value={userDataProvider.license}
        inputValue={userDataProvider?.license ?? ""}
      />

      <Input
        placeholder={registration.address}
        inputStyle={styles.inputAddress}
        onBlur={onBlurAddress}
        onChangeText={onChangeAddress}
        ref={addressRef}
        value={userDataProvider.address}
        inputValue={userDataProvider?.address ?? ""}
        errorMessage={addressError}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>Upload license photo</Text>
        <TouchableOpacity
          activeOpacity={userDataProvider.license_photo ? 1 : 0.5}
          onPress={() => !userDataProvider.license_photo && setIsShowModal(true)}

        >
          <Image
            source={
              userDataProvider.license_photo
                ? { uri: userDataProvider.license_photo }
                : require("../../../../assets/icon/licencesIcon.png")
            }
            style={styles.selectedImage}
          />
        </TouchableOpacity>
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={getImageUrl}
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