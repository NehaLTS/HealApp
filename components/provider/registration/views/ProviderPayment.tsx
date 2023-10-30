import Button from 'components/common/Button'
import Text from 'components/common/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../../designToken/colors'
import { dimens } from '../../../../designToken/dimens'
import { fontSize } from '../../../../designToken/fontSizes'
import { getHeight, getWidth } from '../../../../libs/StyleHelper'
import Input from '../../../common/Input'
import SelectImage from '../../../common/SelectImage'
import ProviderPaymentController from '../controllers/ProviderPaymentController'
import Loader from 'components/common/Loader'

const ProviderPayment = () => {
  const { t } = useTranslation()
  const {
    providerProfile,
    registrationError,
    bankNameError,
    branchError,
    accountError,
    isShowModal,
    setIsShowModal,
    registrationNumberRef,
    bankNameRef,
    branchRef,
    accountRef,
    onBlurRegistrationNumber,
    onChangeRegistrationNumber,
    onBlurBankName,
    onChangeBankName,
    onBlurBranchType,
    onChangeBranchType,
    onBlurAccount,
    onChangeAccount,
    getImageUrl,
    onPressBack,
    onPressNext,
    isLoading
  } = ProviderPaymentController()

  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>{t('Add a profile photo')}</Text>
      <TouchableOpacity activeOpacity={providerProfile?.profilePicture ? 1 : 0.5} onPress={() => setIsShowModal(true)}>
        <Image source={providerProfile?.profilePicture ? { uri: providerProfile?.profilePicture } : require('../../../../assets/icon/editprofile.png')} style={styles.selectedImage} />
      </TouchableOpacity>
      <SelectImage isShowModal={isShowModal} closeModal={setIsShowModal} imageUri={getImageUrl} />
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
      {isLoading && <Loader />}
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('Business registration number')}
          keyboardType="numeric"
          type="creditCardNumber"
          onBlur={onBlurRegistrationNumber}
          onChangeText={onChangeRegistrationNumber}
          ref={registrationNumberRef}
          defaultValue={providerProfile?.bankDetails?.registrationNumber}
          inputValue={providerProfile?.bankDetails?.registrationNumber ?? ''}
          errorMessage={registrationError}
          returnKeyType={'next'}
          onSubmitEditing={() => bankNameRef.current.focus()}
          onClearInputText={() => registrationNumberRef.current.clear()}
        />
        <View style={styles.container}>
          <Input
            placeholder={'Bank'}
            inputStyle={styles.inputBank}
            type={'nameSuffix'}
            onBlur={onBlurBankName}
            onChangeText={onChangeBankName}
            ref={bankNameRef}
            defaultValue={providerProfile?.bankDetails?.bankname}
            inputValue={providerProfile?.bankDetails?.bankname ?? ''}
            errorMessage={bankNameError}
            returnKeyType={'next'}
            onSubmitEditing={() => branchRef.current.focus()}
            onClearInputText={() => bankNameRef.current.clear()}
          />
          <Input
            placeholder={'Branch'}
            type={'nameSuffix'}
            inputStyle={styles.inputBranch}
            onBlur={onBlurBranchType}
            onChangeText={onChangeBranchType}
            ref={branchRef}
            defaultValue={providerProfile?.bankDetails?.branchname}
            inputValue={providerProfile?.bankDetails?.branchname ?? ''}
            errorMessage={branchError}
            returnKeyType={'next'}
            onSubmitEditing={() => accountRef.current.focus()}
            onClearInputText={() => branchRef.current.clear()}
          />
        </View>
        <Input
          placeholder={'Bank account'}
          inputStyle={styles.input}
          type="creditCardNumber"
          keyboardType="numeric"
          onBlur={onBlurAccount}
          onChangeText={onChangeAccount}
          ref={accountRef}
          defaultValue={providerProfile?.bankDetails?.accountnumber}
          inputValue={providerProfile?.bankDetails?.accountnumber ?? ''}
          errorMessage={accountError}
          onClearInputText={() => accountRef.current.clear()}
        />
        {getUploadImageView()}
      </View>
      {getFooterView()}
    </>
  )
}
export default ProviderPayment
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeight(dimens.marginM + dimens.paddingXs)
  },
  inputBank: {
    minWidth: '48%'
  },
  inputBranch: {
    minWidth: '48%'
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingXs)
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
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    marginTop: getHeight(dimens.marginS)
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
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
