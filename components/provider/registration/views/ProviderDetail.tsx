import Text from 'components/common/Text';
import Button from 'components/common/Button';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../../../designToken/colors';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import ProviderDetailController from '../controllers/ProviderDetailController';
import { useTranslation } from 'react-i18next';
import { ProviderSpeciality, ProviderType } from 'libs/types/UserType';

const ProviderDetail = () => {
  const { t } = useTranslation();
  const {
    firstNameRef,
    lastNameRef,
    providerProfile,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    firstNameError,
    lastNameError,
    providerTypeList,
    selectedProvider,
    onChangeProviderType,
    providerTypeError,
    isShowModal,
    getImageUrl,
    setIsShowModal,
    idPicture,
    onChangeSpeciality,
    specialityError,
    selectedSpecialty,
    specialityList,
    onPressBack,
    onPressNext,
  } = ProviderDetailController();

  const renderSpecialityItems = (item: ProviderSpeciality) => {
    return <Text style={styles.textItem} title={item?.name.en} />;
  };

  const renderProviderItems = (item: ProviderType) => {
    return <Text style={styles.textItem} title={item?.name.en} />;
  };

  return (
    <>
      <Input
        placeholder={t('first_name')}
        onBlur={onBlurFirstName}
        onChangeText={onChangeFirstName}
        ref={firstNameRef}
        defaultValue={''}
        inputValue={providerProfile?.firstName ?? ''}
        errorMessage={firstNameError}
        returnKeyType={'next'}
        onSubmitEditing={() => lastNameRef.current.focus()}
        onClearInputText={() => firstNameRef.current.clear()}
      />

      <Input
        placeholder={t('last_name')}
        type={'nameSuffix'}
        inputStyle={styles.inputLastName}
        onChangeText={onChangeLastName}
        onBlur={onBlurLastName}
        defaultValue={''}
        ref={lastNameRef}
        inputValue={providerProfile?.lastName ?? ''}
        errorMessage={lastNameError}
        onClearInputText={() => lastNameRef.current.clear()}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={{ marginRight: 10, height: 25, width: 25, marginTop: 4 }}
        iconColor={colors.black}
        // selectedStyle={styles.box}
        data={providerTypeList}
        labelField={'name'}
        valueField='name'
        placeholder="Type of provider"
        value={selectedProvider}
        onChange={onChangeProviderType}
        renderItem={renderProviderItems}
      />

      {providerTypeError != '' && (
        <Text style={styles.errorMessage} title={providerTypeError} />
      )}

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={{ marginRight: 10, height: 25, width: 25, marginTop: 4 }}
        iconColor={colors.black}
        // selectedStyle={styles.box}
        data={specialityList}
        labelField='name'
        valueField='name'
        placeholder="Specialty"
        value={selectedSpecialty}
        onChange={onChangeSpeciality}
        renderItem={renderSpecialityItems}
      />
      {specialityError != '' && (
        <Text style={styles.errorMessage} title={specialityError} />
      )}

      <View style={styles.iconContainer}>
        <Text style={styles.text} title={'Upload ID photo'} />
        <TouchableOpacity
          activeOpacity={idPicture ? 1 : 0.5}
          onPress={() => setIsShowModal(true)}
        >
          <Image
            source={
              idPicture
                ? { uri: idPicture }
                : require('../../../../assets/icon/uploadProfile.png')
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

export default ProviderDetail;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    textAlign: 'center',
  },

  inputLastName: {
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
  box: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  placeholderStyle: {
    fontSize: fontSize.textL,
    color: colors.black,
  },
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(50),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),
  },
  icon: {
    marginRight: 5,
  },
  textItem: {
    flex: 1,
    fontSize: fontSize.textL,
    color: colors.black,
    padding: getHeight(dimens.marginS),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),
  },
  selectedTextStyle: {
    fontSize: fontSize.textL,
    color: colors.black,
  },
  iconStyle: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  editBlueImage: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
    marginBottom: getHeight(dimens.paddingXs),
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    flex: 0.12,
    justifyContent: 'space-between',
  },
});
