import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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
  } = ProviderPaymentController();

  return (
    <>
      <Input
        placeholder={t('Business registration number')}
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
      />
      <View style={styles.container}>
        <Input
          placeholder={'Bank'}
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
          placeholder={'Branch'}
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

      <Input
        placeholder={'Bank account'}
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
        <Text style={styles.text} title={t('Add a profile photo')} />
        <TouchableOpacity
          activeOpacity={providerProfile?.profilePicture ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}
        >
          <Image
            source={
              providerProfile.profilePicture
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
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
    // columnGap:16
  },
  inputBank: {
    minWidth: '48%',
  },
  inputBranch: {
    minWidth: '48%',
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingXs),
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
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    marginTop: getHeight(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
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
