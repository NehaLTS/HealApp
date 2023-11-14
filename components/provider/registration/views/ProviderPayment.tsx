import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'components/common/Button';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Input from 'common/Input';
import SelectImage from 'common/SelectImage';
import { useTranslation } from 'react-i18next';
import Text from 'components/common/Text';
import ProviderPaymentController from '../controllers/ProviderPaymentController';
import Loader from 'components/common/Loader';
const ProviderPayment = () => {
  const { t } = useTranslation();
  const {
    providerProfile,
    onBlurRegistrationNumber,
    onChangeRegistrationNumber,
    registrationNumberRef,
    registrationError,
    onBlurBankName,
    bankNameRef,
    onChangeBankName,
    bankNameError,
    branchRef,
    onBlurBranchType,
    onChangeBranchType,
    branchError,
    onBlurAccount,
    onChangeAccount,
    accountRef,
    accountError,
    isShowModal,
    setIsShowModal,
    getImageUrl,
    onPressNext,
    onPressBack,
    isLoading,
  } = ProviderPaymentController();

  return (
    <>
      <Input
        placeholder={t('business_registration')}
        keyboardType="numeric"
        type="creditCardNumber"
        onBlur={onBlurRegistrationNumber}
        onChangeText={onChangeRegistrationNumber}
        ref={registrationNumberRef}
        defaultValue={''}
        inputValue={providerProfile?.bankDetails?.registrationNumber ?? ''}
        errorMessage={registrationError}
        returnKeyType={'next'}
        onSubmitEditing={() => bankNameRef.current.focus()}
        onClearInputText={() => registrationNumberRef.current.clear()}
        inputStyle={styles.numberInput}
      />
      <View style={styles.container}>
        <Input
          placeholder={t('bank')}
          inputStyle={styles.inputBank}
          type={'nameSuffix'}
          onBlur={onBlurBankName}
          onChangeText={onChangeBankName}
          ref={bankNameRef}
          defaultValue={''}
          inputValue={providerProfile?.bankDetails?.bankname ?? ''}
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
          defaultValue={''}
          inputValue={providerProfile?.bankDetails?.branchname ?? ''}
          errorMessage={branchError}
          returnKeyType={'next'}
          onSubmitEditing={() => accountRef.current.focus()}
          onClearInputText={() => branchRef.current.clear()}
        />
      </View>
      {isLoading && <Loader />}
      <Input
        placeholder={t('bank_account')}
        inputStyle={styles.input}
        type="creditCardNumber"
        keyboardType="numeric"
        onBlur={onBlurAccount}
        onChangeText={onChangeAccount}
        ref={accountRef}
        defaultValue={''}
        inputValue={providerProfile?.bankDetails?.accountnumber ?? ''}
        errorMessage={accountError}
        onClearInputText={() => accountRef.current.clear()}
        returnKeyType={'done'}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text} title={t('add_profile')} />
        <TouchableOpacity
          activeOpacity={providerProfile?.profilePicture ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}
        >
          <Image
            source={
              providerProfile && providerProfile.profilePicture
                ? { uri: providerProfile.profilePicture }
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

      <View style={styles.footerContainer}>
        {/* <Button title={t('back')} isSmall onPress={onPressBack} width={'30%'} /> */}
        <Button
          title={t('next')}
          isPrimary
          onPress={onPressNext}
          isSmall
          width={'30%'}
        />
      </View>
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
    marginTop: getHeight(dimens.paddingXs),
  },
  inputBranch: {
    minWidth: '48%',
    marginTop: getHeight(dimens.paddingXs),
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
    height: getHeight(dimens.imageS + dimens.paddingXs + 9),
    width: getWidth(dimens.imageS + 8),
    resizeMode: 'contain',
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textL,
    marginTop: getHeight(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + dimens.borderBold),
    width: getWidth(dimens.paddingL),
    marginTop: getHeight(dimens.paddingS),
  },
  footerContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  numberInput: {
    marginTop: getHeight(dimens.marginM),
  },
});
