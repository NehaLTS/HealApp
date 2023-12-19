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
    profilePicture,
    setIsLoading,
  } = ProviderPaymentController();

  return (
    <>
      {isLoading && <Loader />}
      <Input
        placeholder={t('business_registration')}
        keyboardType="numeric"
        type="creditCardNumber"
        onBlur={onBlurRegistrationNumber}
        onChangeText={onChangeRegistrationNumber}
        ref={registrationNumberRef}
        defaultValue={providerProfile?.bankDetails?.registrationNumber ?? ''}
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
          defaultValue={providerProfile?.bankDetails?.bankname ?? ''}
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
          defaultValue={providerProfile?.bankDetails?.branchname ?? ''}
          inputValue={providerProfile?.bankDetails?.branchname ?? ''}
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
        defaultValue={providerProfile?.bankDetails?.accountnumber ?? ''}
        inputValue={providerProfile?.bankDetails?.accountnumber ?? ''}
        errorMessage={accountError}
        onClearInputText={() => accountRef.current.clear()}
        returnKeyType={'done'}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text} title={t('add_profile')} />
        <TouchableOpacity
          activeOpacity={profilePicture ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}
        >
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require('assets/icon/editprofile.png')
            }
            style={profilePicture ? styles.selectedImage : styles.editProfile}
          />
        </TouchableOpacity>
        {profilePicture && (
          <TouchableOpacity
            activeOpacity={profilePicture ? 1 : 0.5}
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
          isLoading={setIsLoading}
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
    </>
  );
};
export default ProviderPayment;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeight(dimens.marginL),
  },
  inputBank: {
    minWidth: '48%',
  },
  inputBranch: {
    minWidth: '48%',
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
  text: {
    fontSize: getHeight(fontSize.textL),
    marginTop: getHeight(dimens.marginS),
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
    marginTop: getHeight(dimens.paddingS),
  },
  editProfile: {
    height: getHeight(dimens.imageS + 8),
    width: getWidth(dimens.imageS + dimens.marginS),
    resizeMode: 'contain',
  },
  footerContainer: {
    flex: 0.8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  numberInput: {
    // marginTop: getHeight(10),
  },
});
