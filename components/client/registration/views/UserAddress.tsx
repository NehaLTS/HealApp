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

const UserAddress = () => {
  const { languageCode } = useTranslationContext();
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } = BasicInformationController({});
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
        inputStyle={styles.input}
      />
      <Input
        placeholder={registration.id_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputId}
      />
      <Text style={styles.text}>{registration.find_doctor_text}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.profileText}>{registration.add_profile}</Text>
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
            style={styles.editProfile}
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

export default UserAddress;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginS),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    marginTop: getHeight(dimens.paddingXs),
  },
  editProfile: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
  },
  input: {
    marginVertical: getHeight(dimens.paddingS),
  },
  inputId: {
    marginTop: getHeight(dimens.paddingS),
  },
});
