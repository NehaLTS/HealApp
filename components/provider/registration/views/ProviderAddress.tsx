import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import { fontSize } from '../../../../designToken/fontSizes';
import { dimens } from '../../../../designToken/dimens';
import { fontWeight } from '../../../../designToken/fontWeights';
import { colors } from '../../../../designToken/colors';
import Input from '../../../common/Input';
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';
import { getTexts } from '../../../../libs/OneSkyHelper';
import SelectImage from '../../../common/SelectImage';
import BasicInformationController from '../controllers/BasicInformationController';

const ProviderAddress = () => {
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);




  return (
    <>
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone} inputValue={''}
      />

      <Input
        placeholder="License number (for those who have)"
        type={"nameSuffix"}
        inputStyle={styles.inputLastName} inputValue={''}
      />
      
      <Input
        placeholder={registration.address}
        inputStyle={styles.inputAddress} inputValue={''}
      />

      <View style={styles.iconContainer}>
        <Text style={styles.text}>Upload license photo</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => !selectedImage && setIsShowModal(true)}

        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/licencesIcon.png")
            }
            style={ styles.selectedImage }
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

export default ProviderAddress;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    textAlign: "center"

  },
  inputAddress: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputPhone: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputLastName: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  errorText: {
    color: "red",
    fontSize: fontSize.textS,
    marginTop: getHeight(dimens.paddingXs),
  },
  editImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    // marginTop: getHeight(dimens.marginM),
  },
  iconContainer: {
    flexDirection: "row",
    gap: getHeight(dimens.marginM),
    alignItems: "center",
    marginTop: getHeight(dimens.marginM),
  },

  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),

  },
});