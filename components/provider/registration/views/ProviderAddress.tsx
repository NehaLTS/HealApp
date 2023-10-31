import Button from 'components/common/Button'
import RNModal from 'components/common/Modal'
import TextButton from 'components/common/TextButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../designToken/colors'
import { dimens } from '../../../../designToken/dimens'
import { fontSize } from '../../../../designToken/fontSizes'
import { getHeight, getWidth } from '../../../../libs/StyleHelper'
import Input from '../../../common/Input'
import SelectImage from '../../../common/SelectImage'
import ProviderAddressController from '../controllers/ProviderAddressController'

const ProviderAddress = () => {
  const { t } = useTranslation()
  const {
    phoneError,
    addressError,
    isVisible,
    setIsVisible,
    setOnSearchAddress,
    providerProfile,
    phoneRef,
    licenseRef,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    onBlurLastName,
    getImageUrl,
    onChangeLastName,
    onBlurAddress,
    onSearchAddress,
    isShowModal,
    onUploadLicense,
    onCloseModal,
    renderToast,
    onPressBack,
    onPressNext
  } = ProviderAddressController()

  const addAddressView = () => (
    <RNModal style={styles.modal} backdropOpacity={1} backdropColor={colors.white} isVisible={isVisible}>
      <View style={styles.addressView}>
        <Input placeholder={t('address')} type={'fullStreetAddress'} inputStyle={[{ minWidth: '82%' }]} onChangeText={setOnSearchAddress} inputValue={onSearchAddress} defaultValue={onSearchAddress} onSubmitEditing={onBlurAddress} autoFocus />
        <TextButton containerStyle={{ width: '18%', alignItems: 'flex-end' }} title="Close" fontSize={fontSize.textL} onPress={() => setIsVisible(false)} />
      </View>
    </RNModal>
  )

  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>{t('Upload license photo')}</Text>
      <TouchableOpacity disabled={!providerProfile?.licensenumber} activeOpacity={providerProfile?.licensepicture ? 1 : 0.5} style={{ opacity: !providerProfile?.licensenumber ? 0.5 : 1 }} onPress={onUploadLicense}>
        <Image source={providerProfile?.licensepicture ? { uri: providerProfile?.licensepicture } : require('../../../../assets/icon/licencesIcon.png')} style={styles.selectedImage} />
      </TouchableOpacity>
      <SelectImage isShowModal={isShowModal} closeModal={onCloseModal} imageUri={getImageUrl} />
    </View>
  )

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      <Button title={t('back')} isSmall width={'30%'} onPress={onPressBack} />
      <Button title={t('next')} isPrimary isSmall width={'30%'} onPress={onPressNext} />
    </View>
  )
  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('Phone Number*')}
          type={'telephoneNumber'}
          keyboardType="number-pad"
          onBlur={onBlurPhoneNumber}
          onChangeText={onChangePhoneNumber}
          ref={phoneRef}
          defaultValue={providerProfile?.phoneNumber}
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
          onBlur={onBlurLastName}
          onChangeText={onChangeLastName}
          ref={licenseRef}
          defaultValue={providerProfile?.licensenumber}
          inputValue={providerProfile?.licensenumber ?? ''}
          returnKeyType={'next'}
          onSubmitEditing={() => setIsVisible(true)}
          onClearInputText={() => licenseRef.current.clear()}
        />
        <Input placeholder={t('address')} inputStyle={styles.input} value={onSearchAddress} errorMessage={addressError} onTouchStart={() => setIsVisible(true)} caretHidden inputValue={onSearchAddress} onClearInputText={() => setOnSearchAddress('')} />
        {getUploadImageView()}
        {addAddressView()}
      </View>
      {getFooterView()}
      {renderToast()}
    </>
  )
}

export default ProviderAddress

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: 'center'
  },
  input: {
    marginTop: getHeight(dimens.marginM + dimens.paddingXs)
  },
  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin)
  },
  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS + 2),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS)
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(dimens.paddingS)
  },
  inputContainer: {
    flex: 0.79
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between'
  }
})
