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

  const addAddressView = () => {
    return (
      <View style={styles.addressView}>
        <Input
          placeholder={t('address')}
          type={'fullStreetAddress'}
          inputStyle={[{ minWidth: '82%' }]}
          onClearInputText={() => addressRef.current.clear()}
          onChangeText={onChangeAddress}
          inputValue={onSearchAddress}
          value={onSearchAddress}
          onSubmitEditing={() => setIsShowAddressodal(false)}
          autoFocus
        />
        <TextButton
          containerStyle={{ width: '18%', alignItems: 'flex-end' }}
          title={t('close')}
          fontSize={fontSize.textL}
          onPress={() => setIsShowAddressodal(false)}
        />
      </View>
    );
  };

  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>{t('upload_license')}</Text>
      <TouchableOpacity
        disabled={!licenseRef.current?.value}
        activeOpacity={licensePicture ? 1 : 0.5}
        style={{ opacity: !licenseRef.current?.value ? 0.5 : 1 }}
        onPress={() => setIsShowModal(true)}
      >
        <Image
          source={
            licensePicture
              ? { uri: licensePicture }
              : require('../../../../assets/icon/licencesIcon.png')
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
          onSubmitEditing={() => {
            setIsShowAddressodal(true);
          }}
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
          onSubmitEditing={() => {
            setIsShowModal(true);
          }}
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
        address={setOnSearchAddress}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        defaultValue={onSearchAddress}
      />
      {/* <RNModal
        style={styles.modal}
        backdropOpacity={1}
        backdropColor={colors.white}
        isVisible={isShowAddressodal}
      >
        {addAddressView()}
      </RNModal> */}
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
    height: getHeight(dimens.imageS + dimens.paddingXs + 8),
    width: getWidth(dimens.imageS + 8),
    resizeMode: 'contain',
    borderRadius: getHeight(dimens.paddingS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + dimens.borderBold),
    width: getWidth(dimens.paddingL),
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
    marginTop: getHeight(dimens.marginS),
  },
});
