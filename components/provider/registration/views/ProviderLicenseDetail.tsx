import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import React from 'react';
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
import ProviderLicenseDetailController from '../controllers/ProviderLicenseDetailController';

const ProviderLicenseDetail = () => {
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { languageCode } = useTranslationContext(); 
  const { registration } = getTexts(languageCode);
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const { t } = useTranslation();

  const {
    addressRef,
    licenseRef,
    phoneRef,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    onBlurLastName,
    onChangeLastName,
    onBlurAddress,
    onChangeAddress,
    phoneError,
    addressError
  } = ProviderLicenseDetailController()
  const getImageUrl = (url: string) => setUserDataProvider({ ...userDataProvider, license_photo: url });
  return (
    <>
      <Input
        placeholder={t("Phone Number*")}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        // inputStyle={styles.input}
        onBlur={onBlurPhoneNumber}
        onChangeText={onChangePhoneNumber}
        ref={phoneRef}
        value={userDataProvider.phone_number}
        inputValue={userDataProvider?.phone_number ?? ""}
        errorMessage={phoneError}
      />

      <Input
        placeholder={t("License number (for those who have)")}
        type={"nameSuffix"}
        inputStyle={styles.input}
        onBlur={onBlurLastName}
        onChangeText={onChangeLastName}
        ref={licenseRef}
        value={userDataProvider.license}
        inputValue={userDataProvider?.license ?? ""}
      />

      <Input
        placeholder={registration.address}
        inputStyle={styles.input}
        onBlur={onBlurAddress}
        onChangeText={onChangeAddress}
        ref={addressRef}
        value={userDataProvider.address}
        inputValue={userDataProvider?.address ?? ""}
        errorMessage={addressError}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>{t("Upload license photo")}</Text>
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

export default ProviderLicenseDetail;

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
});
