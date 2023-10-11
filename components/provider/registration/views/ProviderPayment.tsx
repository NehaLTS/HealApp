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
import { Dropdown } from 'react-native-element-dropdown';

const ProviderPayment = () => {
  const {
    selectedImage,
    setSelectedImage,
    isShowModal,
    setIsShowModal,
  } = BasicInformationController({});

  const [value, setValue] = useState(null);
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const renderItem = item => {
    return (
      <Text style={styles.textItem}>{item.label}</Text>
    );
  };

  return (
    <>
      <Input
        placeholder="Business registration number"
        keyboardType="numeric"
        type="creditCardNumber"
        inputStyle={styles.cardNumber} inputValue={''} />
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown1}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={{ marginRight: 10, height: 25, width: 25 }}
          iconColor={{ colors: colors.black }}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Bank"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          renderItem={renderItem}
        />
        <Dropdown
          style={styles.dropdown2}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={{ marginRight: 10, height: 25, width: 25 }}
          iconColor={{ colors: colors.black }}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Branch"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          renderItem={renderItem}
        />

      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={{ marginRight: 10, height: 25, width: 25 }}
        iconColor={{ colors: colors.black }}
        selectedStyle={styles.box}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Bank account"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
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
    marginTop: getHeight(dimens.marginS),
    justifyContent: "space-between"

  },
  cardNumber: {
    marginVertical: getHeight(dimens.sideMargin),
  },

  editImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
  },
  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginM),
    alignItems: 'center',
    marginTop: getHeight(dimens.marginM)
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

  placeholderStyle: {
    fontSize: 16,
    color: colors.black
  },
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: 50,
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingLeft: 20,

  },
  dropdown1: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: 50,
    borderColor: colors.primary,
    paddingLeft: 20,
    width: getHeight(120)
  },
  dropdown2: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: 50,
    borderColor: colors.primary,
    paddingLeft: 20,
    width:getHeight (200)
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingLeft: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
