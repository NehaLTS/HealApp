import Input from "common/Input";
import SelectImage from "common/SelectImage";
import Text from "components/common/Text";
import { UseUserContext } from "contexts/useUserContext";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { getTexts } from "libs/OneSkyHelper";

const UserAddress = () => {
  const {isShowModal, setIsShowModal, addressRef, birthDateRef, idNumberRef } = BasicInformationController({});
  const { userData, setUserData } = UseUserContext();
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });
  const { t } = useTranslation();
  return (
    <>
      <Input
        placeholder={t("address")}
        type={"fullStreetAddress"}
        inputStyle={styles.input}
        onBlur={() => setUserData({ ...userData, address: addressRef.current.value })}
        onChangeText={(value) => addressRef.current.value = value}
        ref={addressRef}
        value={userData.address}
        inputValue={addressRef.current.value}
      />
      <Input
        placeholder={t("date_of_birth")}
        type={"telephoneNumber"}
        keyboardType="numeric"
        inputStyle={styles.inputDOB}
        onBlur={() => setUserData({ ...userData, date_of_birth: birthDateRef.current.value })}
        onChangeText={(value) => birthDateRef.current.value = value}
        ref={birthDateRef}
        value={userData.date_of_birth}
        inputValue={birthDateRef.current.value}
      />
      <Input
        placeholder={t("id_number")}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
        onBlur={() => setUserData({ ...userData, id_number: idNumberRef.current.value })}
        onChangeText={(value) => idNumberRef.current.value = value}
        ref={idNumberRef}
        value={userData.id_number}
        inputValue={idNumberRef.current.value}
      />
      <Text style={styles.text} title={registration.find_doctor_text} />
      <View style={styles.innerContainer}>
        <Text
          style={[
            !userData.profile_picture && {
              marginTop: getHeight(dimens.marginS),
            },
          ]} 
          title={registration.add_profile}
          />
        <TouchableOpacity
          activeOpacity={userData.profile_picture ? 1 : 0.5}
          onPress={() => !userData.profile_picture && setIsShowModal(true)}
          style={styles.imageContainer}>
          <Image
            source={
              userData.profile_picture
                ? { uri: userData.profile_picture }
                : require("assets/icon/editprofile.png")
            }
            style={
              userData.profile_picture
                ? styles.selectedImage
                : styles.editProfile
            }
          />
        </TouchableOpacity>
        {userData.profile_picture && (
          <TouchableOpacity
            activeOpacity={userData.profile_picture ? 1 : 0.5}
            onPress={() => setIsShowModal(true)}
            style={styles.imageContainer}>
            <Image
              source={require("assets/icon/edit.png")}
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
    paddingTop: getHeight(dimens.paddingXs),
    letterSpacing: getWidth(0.5),
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
