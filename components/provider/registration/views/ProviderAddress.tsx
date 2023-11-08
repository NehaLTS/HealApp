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
          title="Close"
          fontSize={fontSize.textL}
          onPress={() => setIsShowAddressodal(false)}
        />
      </View>
    );
  };

  return (
    <>
      <Input
        placeholder={t('Phone Number*')}
        type={'telephoneNumber'}
        keyboardType="number-pad"
        onBlur={onBlurPhoneNumber}
        onChangeText={onChangePhoneNumber}
        ref={phoneRef}
        defaultValue={''}
        inputValue={providerProfile?.phoneNumber ?? ''}
        errorMessage={phoneError}
        returnKeyType={'next'}
        onSubmitEditing={() => licenseRef.current.focus()}
        onClearInputText={() => phoneRef.current.clear()}
      />

      <Input
        placeholder={t('License number (for those who have)')}
        type={'nameSuffix'}
        inputStyle={styles.input}
        // onBlur={onBlurPhoneNumber}
        onChangeText={onChangeLicenseNumber}
        ref={licenseRef}
        defaultValue={''}
        inputValue={providerProfile?.licensenumber ?? ''}
        returnKeyType={'next'}
        onSubmitEditing={() => addressRef.current.focus()}
        onClearInputText={() => licenseRef.current.clear()}
      />

      <Input
        placeholder={t('address')}
        inputStyle={styles.input}
        value={onSearchAddress}
        errorMessage={addressError}
        onTouchStart={() => setIsShowAddressodal(true)}
        caretHidden
        inputValue={onSearchAddress}
        onClearInputText={() => setOnSearchAddress('')}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>{t('Upload license photo')}</Text>
        <TouchableOpacity
          activeOpacity={licensePicture ? 1 : 0.5}
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

      <RNModal
        style={styles.modal}
        backdropOpacity={1}
        backdropColor={colors.white}
        isVisible={isShowAddressodal}
      >
        {addAddressView()}
      </RNModal>
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
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
  },

  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin),
  },

  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS + 2),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
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
});
