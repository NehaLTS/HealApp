import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import ProviderPaymentController from '../controllers/ProviderPaymentController';

const ProviderPayment = () => {
  const { t } = useTranslation();
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
    isLoading,
    profilePicture,
    renderToast,
  } = ProviderPaymentController();

  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>{t('add_profile')}</Text>
      <TouchableOpacity
        activeOpacity={profilePicture ? 1 : 0.5}
        onPress={() => setIsShowModal(true)}
      >
        <Image
          source={
            profilePicture
              ? { uri: profilePicture }
              : require('../../../../assets/icon/editprofile.png')
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

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      <Button title={t('back')} isSmall width={'30%'} onPress={onPressBack} />
      <Button
        title={t('next')}
        isPrimary
        isSmall
        width={'30%'}
        onPress={onPressNext}
      />
    </View>
  );

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.inputContainer}>
        <Input
          placeholder={t('business_registration')}
          keyboardType="numeric"
          type="creditCardNumber"
          onBlur={onBlurRegistrationNumber}
          onChangeText={onChangeRegistrationNumber}
          ref={registrationNumberRef}
          defaultValue={registrationNumberRef?.current?.value}
          inputValue={registrationNumberRef?.current?.value}
          errorMessage={registrationError}
          returnKeyType={'next'}
          onSubmitEditing={() => bankNameRef.current.focus()}
          onClearInputText={() => registrationNumberRef.current.clear()}
        />
        <View style={styles.container}>
          <Input
            placeholder={t('bank')}
            inputStyle={styles.inputBank}
            type={'nameSuffix'}
            onBlur={onBlurBankName}
            onChangeText={onChangeBankName}
            ref={bankNameRef}
            defaultValue={bankNameRef?.current?.value}
            inputValue={bankNameRef?.current?.value}
            errorMessage={bankNameError}
            returnKeyType={'next'}
            onSubmitEditing={() => branchRef.current.focus()}
            onClearInputText={() => bankNameRef.current.clear()}
          />
          <Input
            placeholder={t('branch')}
            type={'nameSuffix'}
            inputStyle={styles.inputBranch}
            onBlur={onBlurBranchType}
            onChangeText={onChangeBranchType}
            ref={branchRef}
            defaultValue={branchRef?.current?.value}
            inputValue={branchRef?.current?.value}
            errorMessage={branchError}
            returnKeyType={'next'}
            onSubmitEditing={() => accountRef.current.focus()}
            onClearInputText={() => branchRef.current.clear()}
          />
        </View>
        <Input
          placeholder={t('bank_account')}
          inputStyle={styles.input}
          type="creditCardNumber"
          keyboardType="numeric"
          onBlur={onBlurAccount}
          onChangeText={onChangeAccount}
          ref={accountRef}
          defaultValue={accountRef?.current?.value}
          inputValue={accountRef?.current?.value}
          errorMessage={accountError}
          onClearInputText={() => accountRef.current.clear()}
        />
        {getUploadImageView()}
      </View>
      {getFooterView()}
      {renderToast()}
    </>
  );
};
export default ProviderPayment;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
  },
  inputBank: {
    minWidth: '48%',
  },
  inputBranch: {
    minWidth: '48%',
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
  },
  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin),
  },
  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS + dimens.borderBold),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: getWidth(fontSize.textL),
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0.79,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between',
  },
});
