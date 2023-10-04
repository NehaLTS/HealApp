import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import SelectImage from "../../../common/SelectImage";
import BasicInformationController from "../controllers/BasicInformationController";
import { fontWeight } from "../../../../designToken/fontWeights";

const UserAddress = () => {
  const { languageCode } = useTranslationContext();
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
  const { registration } = getTexts(languageCode);

  return (
    <>
      <Input
        placeholder={registration.address}
        type={"fullStreetAddress"}
        inputStyle={styles.input}
      />
      <Input
        placeholder={registration.date_of_birth}
        type={"telephoneNumber"}
        keyboardType="numeric"
        inputStyle={styles.inputDOB}
      />
      <Input
        placeholder={registration.id_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
      />
      <Text style={styles.text}>{registration.find_doctor_text}</Text>
      <View style={styles.innerContainer}>
        <Text style={[styles.profileText, selectedImage === "" && { marginTop: getHeight(dimens.marginS)}]}>{registration.add_profile}</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => !selectedImage && setIsShowModal(true)}
          style={styles.imageContainer}
        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/editprofile.png")
            }
            style={selectedImage ? styles.selectedImage : styles.editProfile}
          />
          {selectedImage && (
            <Image
              source={require("../../../../assets/icon/edit.png")}
              style={styles.editImage}
            />
          )}
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

export default UserAddress;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginM),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL)
  },
  editProfile: {
    height: getHeight(dimens.imageS + dimens.marginS),
    width: getWidth(dimens.imageS + dimens.marginS),
  },
  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    fontWeight: fontWeight.light,
    letterSpacing: getWidth( dimens.borderThin / dimens.borderBold)
  },
  input: {
    marginTop: getHeight(dimens.paddingS),
  },
  inputDOB: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputIdNumber: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(dimens.marginS),
  },
  editImage: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  },
});
