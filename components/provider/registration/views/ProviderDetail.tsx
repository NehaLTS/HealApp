import Text from 'components/common/Text';
import Button from 'components/common/Button';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../../../designToken/colors';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import ProviderDetailController from '../controllers/ProviderDetailController';
import { useTranslation } from 'react-i18next';
import { ProviderSpeciality, ProviderType } from 'libs/types/UserType';
import Dropdown from 'components/common/Dropdown';
import { fontFamily } from 'designToken/fontFamily';

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
        defaultValue={
          providerProfile?.firstName ? providerProfile?.firstName : ''
        }
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
        defaultValue={
          providerProfile?.firstName ? providerProfile?.firstName : ''
        }
        ref={lastNameRef}
        inputValue={providerProfile?.lastName ?? ''}
        errorMessage={lastNameError}
        onClearInputText={() => lastNameRef.current.clear()}
        returnKeyType={'next'}
      />

      <Dropdown
        data={providerTypeList}
        labelField="name.en"
        valueField="name.en"
        placeholder={t('type_of_provider')}
        value={selectedProvider}
        onChange={onChangeProviderType}
        renderItem={renderProviderItems}
        errorMessage={providerTypeError}
      />

      <Dropdown
        data={specialityList}
        labelField="name.en"
        valueField="name.en"
        placeholder={t('specialty')}
        value={selectedSpecialty}
        onChange={onChangeSpeciality}
        renderItem={renderSpecialityItems}
        errorMessage={specialityError}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text} title={t('upload_id_photo')} />
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
            style={idPicture ? styles.selectedImage : styles.editProfile}
          />
        </TouchableOpacity>
        {idPicture && (
          <TouchableOpacity
            activeOpacity={idPicture ? 1 : 0.5}
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

      <View style={styles.footerContainer}>
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
    fontSize: getHeight(fontSize.textL),
    color: colors.black,
    textAlign: 'center',
  },

  inputLastName: {
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
  box: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  placeholderStyle: {
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(50),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.marginL),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),
  },
  icon: {
    marginRight: 5,
  },
  textItem: {
    flex: 1,
    fontSize: getHeight(fontSize.textL),
    color: colors.black,
    padding: getHeight(dimens.marginS),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),
  },
  selectedTextStyle: {
    fontSize: fontSize.textL,
    color: colors.black,
    fontFamily: fontFamily.regular,
  },
  iconStyle: {
    width: getHeight(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
  },
  footerContainer: {
    flex: 0.8,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  arrowIcon: {
    marginRight: getWidth(dimens.marginS),
    height: getHeight(dimens.marginM + 5),
    width: getWidth(dimens.marginM + 5),
    resizeMode: 'contain',
    marginTop: getHeight(dimens.borderBold + dimens.borderBold),
  },
  input: {
    // marginTop: getHeight(dimens.marginS),
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
    // paddingLeft: getWidth(5)
  },
  editProfile: {
    height: getHeight(dimens.imageS + 8),
    width: getWidth(dimens.imageS + dimens.marginS),
    resizeMode: 'contain',
  },
});
