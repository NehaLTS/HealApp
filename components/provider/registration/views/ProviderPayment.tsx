import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../common/Input';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import { dimens } from '../../../../designToken/dimens';
import BasicInformationController from '../controllers/BasicInformationController';
import SelectImage from '../../../common/SelectImage';
import { fontSize } from '../../../../designToken/fontSizes';
import { colors } from '../../../../designToken/colors';
import { SelectList } from 'react-native-dropdown-select-list';

const ProviderPayment = () => {
  const {
    selectedImage,
    setSelectedImage,
    isShowModal,
    setIsShowModal,
  } = BasicInformationController({});


  const [selected, setSelected] = React.useState("");
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  return (
    <>
      <Input
        placeholder="Business registration number"
        keyboardType="numeric"
        type="creditCardNumber"
        inputStyle={styles.cardNumber} inputValue={''} />
      <View style={[styles.container, styles.inputBankDetails]}>
        <SelectList
          setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
          data={data}
          save="value"
          placeholder='bank'
          boxStyles={styles.box}
          dropdownStyles={styles.dropdown}
        />
        <SelectList
          setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
          data={data}
          save="value"
          placeholder='branch'
          boxStyles={styles.box}
          dropdownStyles={styles.dropdown}
          inputStyles={styles.text}
        />

      </View>
      <SelectList
        setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
        data={data}
        save="value"
        boxStyles={styles.box}
        dropdownStyles={styles.dropdown}
        inputStyles={styles.text}
      />
      <View style={styles.iconContainer}>
        <Text style={styles.text}>Add a profile photo</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => !selectedImage && setIsShowModal(true)}

        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/editprofile.png")
            }
            style={styles.selectedImage}
          />
        </TouchableOpacity>
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={setSelectedImage}
        />
      </View>
    </>
  );
};

export default ProviderPayment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    marginTop: getHeight(dimens.marginS),
  },
  cardNumber: {
    marginVertical: getHeight(dimens.sideMargin),
  },
  inputBankDetails: {
    marginBottom: getHeight(dimens.paddingL),
  },
  editImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
  },
  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginM),
    alignItems: 'center',
  },
  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
  },
  box: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    backgroundColor: colors.offWhite,
    borderColor: colors.primary
  },
  dropdown: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    backgroundColor: colors.offWhite,
  }
});
