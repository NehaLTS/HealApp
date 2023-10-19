import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';
import { colors } from '../../../../designToken/colors';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getTexts } from '../../../../libs/OneSkyHelper';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import BasicInformationController from '../controllers/BasicInformationController';

const ProviderAddress = ({
  phoneError: phError,
  addressError: adError,
}: any) => {
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const { t } = useTranslation();
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const phoneRef = React.useRef<any>("");
  const licenseRef = React.useRef<any>("");
  const addressRef = React.useRef<any>("");

  const onBlurPhoneNumber = () => setUserDataProvider({ ...userDataProvider, phone_number: phoneRef.current.value })
  const onChangePhoneNumber = (value: string) => { phoneRef.current.value = value, validatePhoneNumber(); }

  const onBlurLastName = () => setUserDataProvider({ ...userDataProvider, license: licenseRef.current.value })
  const onChangeLastName = (value: string) => licenseRef.current.value = value

  const onBlurAddress = () => setUserDataProvider({ ...userDataProvider, address: addressRef.current.value })
  const onChangeAddress = (value: string) => {
    addressRef.current.value = value, validateAddress();
  }

  const getImageUrl = (url: string) => setUserDataProvider({ ...userDataProvider, license_photo: url });
  console.log('userDataProvider', userDataProvider)

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
    } else if (addressRef.current.value?.length < 4) {
      setAddressError('Please fill full address')
    }
    else {
      setAddressError("");
    }
  };


  return (
    <>
      <Input
        placeholder={t("phone_number")}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        // inputStyle={styles.input}
        onBlur={onBlurPhoneNumber}
        onChangeText={onChangePhoneNumber}
        ref={phoneRef}
        defaultValue={userDataProvider.phone_number}
        inputValue={userDataProvider?.phone_number ?? ""}
        errorMessage={phError?.length ? phError : phoneError}
        returnKeyType={"next"}
        onSubmitEditing={() => licenseRef.current.focus()}
        onClearInputText={() => phoneRef.current.clear()}

      />

      <Input
        placeholder={t("license_number")}
        type={"nameSuffix"}
        inputStyle={styles.input}
        onBlur={onBlurLastName}
        onChangeText={onChangeLastName}
        ref={licenseRef}
        defaultValue={userDataProvider.license}
        inputValue={userDataProvider?.license ?? ""}
        returnKeyType={"next"}
        onSubmitEditing={() => addressRef.current.focus()}
        onClearInputText={() => licenseRef.current.clear()}


      />

      <Input
        placeholder={t("address")}
        inputStyle={styles.input}
        onBlur={onBlurAddress}
        onChangeText={onChangeAddress}
        ref={addressRef}
        defaultValue={userDataProvider.address}
        inputValue={userDataProvider?.address ?? ""}
        errorMessage={adError?.length ? adError : addressError}
        onClearInputText={() => addressRef.current.clear()}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>{t("upload_license")}</Text>
        <TouchableOpacity
          activeOpacity={userDataProvider.license_photo ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}

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
        {userDataProvider.license_photo && <TouchableOpacity onPress={() => setIsShowModal(true)}>
          <Image
            source={require("assets/icon/circumEditBlue.png")}
            style={styles.editImage}
          />
        </TouchableOpacity>}
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
    fontSize: fontSize.textL,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: "center",
  },
  input: {
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
  },

  iconContainer: {
    flexDirection: "row",
    gap: getHeight(dimens.marginS),
    alignItems: "center",
    marginTop: getHeight(dimens.sideMargin),
  },

  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS + 2),
    resizeMode: "cover",
    borderRadius: getHeight(dimens.paddingS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
    marginTop: getHeight(dimens.paddingS)
  },
});
