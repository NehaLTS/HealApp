import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../../../common/Input';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import { dimens } from '../../../../designToken/dimens';
import BasicInformationController from '../controllers/BasicInformationController';
import SelectImage from '../../../common/SelectImage';
import { fontSize } from '../../../../designToken/fontSizes';
import { colors } from '../../../../designToken/colors';
import { Dropdown } from 'react-native-element-dropdown';

// Import your custom Dropdown component
// Replace with the correct path

const ProviderPayment = () => {
  const {
    selectedImage,
    setSelectedImage,
    isShowModal,
    setIsShowModal,
  } = BasicInformationController({});

  const [selectedBank, setSelectedBank] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const bankItems = [
    { label: 'Bank 1', value: 'bank1' },
    { label: 'Bank 2', value: 'bank2' },
    { label: 'Bank 3', value: 'bank3' },
  ];

  const branchItems = [
    { label: 'Branch 1', value: 'branch1' },
    { label: 'Branch 2', value: 'branch2' },
    { label: 'Branch 3', value: 'branch3' },
  ];

  return (
    <>
      <Input
        placeholder="Business registration number"
        keyboardType="numeric"
        type="creditCardNumber"
        inputStyle={styles.cardNumber}
      />
      <View style={[styles.container, styles.inputBankDetails]}>
        <Dropdown
          label="Select Bank"
          data={bankItems}
          value={selectedBank}
          onChange={(value) => setSelectedBank(value)}
      
          containerStyle={styles.dropdownContainer} // Style for the dropdown container
          labelStyle={styles.dropdownLabel} // Style for the label
          dropdownStyle={styles.dropdownMenu} // Style for the dropdown menu
          itemStyle={styles.dropdownItem} // Style for each dropdown item
        />
       
      </View>
      <Input
        placeholder="Bank account"
        keyboardType="numeric"
        type="creditCardNumber"
        inputStyle={styles.cardNumber}
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
            style={selectedImage ? styles.selectedImage : styles.editImage}
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
  arrowImage: {
    // Specify your arrow image style here
    height: 20, // Adjust the height as needed
    width: 20, // Adjust the width as needed
  },
  dropdownContainer: {
    // Style for the dropdown container
    flex: 0.7,
    height: 40, // Adjust the height as needed
  },
  dropdown: {
    // Style for the dropdown (if needed)
    borderWidth: getWidth(dimens.borderBold),
    borderColor: colors.primary,
    borderRadius: getWidth(dimens.marginS),
    backgroundColor: colors.offWhite,
  },
  dropdownItem: {
    // Style for each dropdown item (if needed)
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    // Style for the label (if needed)
    fontSize: fontSize.textM,
    color: colors.black,
  },
  dropdownMenu: {
    // Style for the dropdown menu (if needed)
    // borderWidth: getWidth(dimens.borderBold),
    // borderColor: colors.primary,
    // borderRadius: getWidth(dimens.marginS),
    // backgroundColor: colors.offWhite,
  },
});
