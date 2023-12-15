import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../designToken/colors';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import TextButton from 'components/common/TextButton';
import RNModal from 'components/common/Modal';
import { useTranslation } from 'react-i18next';
import ProviderAddressController from '../controllers/ProviderAddressController';
import Button from 'components/common/Button';
import AddAddress from 'components/common/AddAddress';

const ProviderAddress = () => {
  const { t } = useTranslation();
  const {
    addressRef,
    providerProfile,
    licenseRef,
    phoneRef,
    onChangePhoneNumber,
    onBlurPhoneNumber,
    onBlurAddress,
    onChangeAddress,
    phoneError,
    addressError,
    licenseError,
    licensePicture,
    onChangeLicenseNumber,
    isShowModal,
    getImageUrl,
    setIsShowModal,
    onSearchAddress,
    setOnSearchAddress,
    isShowAddressodal,
    setIsShowAddressodal,
    onPressNext,
    onPressBack,
    isVisible,
    setIsVisible,
  } = ProviderAddressController();

  console.log(
    'licenseRef.current?.value?.length',
    licenseRef.current?.value?.length,
  );
  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>{t('upload_license')}</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={{ opacity: 1 }}
        onPress={() => setIsShowModal(true)}
      >
        <Image
          source={
            licensePicture
              ? { uri: licensePicture }
              : require('../../../../assets/icon/licencesIcon.png')
          }
          style={licensePicture ? styles.selectedImage : styles.editProfile}
        />
      </TouchableOpacity>
      {licensePicture && (
        <TouchableOpacity
          activeOpacity={licensePicture ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}
          style={[styles.imageContainer, { paddingLeft: getWidth(5) }]}
        >
          <Image
            source={require('assets/icon/circumEditBlue.png')}
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
  );

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('phone_number')}
          type={'telephoneNumber'}
          keyboardType="number-pad"
          onBlur={onBlurPhoneNumber}
          onChangeText={onChangePhoneNumber}
          ref={phoneRef}
          defaultValue={''}
          inputValue={providerProfile?.phoneNumber ?? ''}
          errorMessage={phoneError}
          returnKeyType={'next'}
          onClearInputText={() => phoneRef.current.clear()}
          inputStyle={styles.inputPhone}
          maxLength={10}
        />

        <Input
          placeholder={t('license_number')}
          type={'nameSuffix'}
          keyboardType="number-pad"
          inputStyle={styles.input}
          onBlur={onBlurPhoneNumber}
          onChangeText={(v) => onChangeLicenseNumber(v)}
          ref={licenseRef}
          defaultValue={''}
          inputValue={providerProfile?.licensenumber ?? ''}
          returnKeyType={'done'}
          onClearInputText={() => licenseRef.current.clear()}
          maxLength={10}
        />

        <Input
          placeholder={t('address')}
          inputStyle={styles.input}
          defaultValue={onSearchAddress}
          errorMessage={addressError}
          onTouchStart={() => setIsVisible(true)}
          caretHidden
          inputValue={onSearchAddress}
          onClearInputText={() => setOnSearchAddress('')}
        />
        {getUploadImageView()}
      </View>
      <View style={styles.footerContainer}>
        <Button title={t('back')} isSmall onPress={onPressBack} width={'30%'} />
        <Button
          title={t('next')}
          isPrimary
          onPress={onPressNext}
          isSmall
          width={'30%'}
        />
      </View>
      <AddAddress
        address={onChangeAddress}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        defaultValue={onSearchAddress ?? ''}
      />
    </>
  );
};

export default ProviderAddress;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: 'center',
  },
  input: {
    marginTop: getHeight(dimens.marginL),
  },

  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin),
  },

  selectedImage: {
    height: getHeight(dimens.imageS + 8),
    width: getWidth(dimens.imageS + 2),
    borderRadius: getHeight(dimens.paddingS),
    resizeMode: 'contain',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
  },
  editProfile: {
    height: getHeight(dimens.imageS + 8),
    width: getWidth(dimens.imageS + dimens.marginS),
    resizeMode: 'contain',
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(dimens.paddingS),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    flex: 0.12,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 0.75,
  },
  inputPhone: {
    // marginTop: getHeight(dimens.marginS),
  },
});
