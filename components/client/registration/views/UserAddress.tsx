import Input from "common/Input";
import SelectImage from "common/SelectImage";
import { UseUserContext } from "contexts/useUserContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { fontWeight } from "designToken/fontWeights";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";

const UserAddress = () => {
  const {isShowModal, setIsShowModal } = BasicInformationController({});
  const addressRef = React.useRef<any>("");
  const dobRef = React.useRef<any>("");
  const idNumberRef = React.useRef<any>("");
  const { userData, setUserData } = UseUserContext();
  const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });

  return (
    <>
      <Input
        placeholder={registration.address}
        type={"fullStreetAddress"}
        inputStyle={styles.input}
        onBlur={() =>
          setUserData({ ...userData, address: addressRef.current.value })
        }
        onChangeText={(value) => {
          addressRef.current.value = value;
        }}
        ref={addressRef}
        value={userData.address}
      />
      <Input
        placeholder={registration.date_of_birth}
        type={"telephoneNumber"}
        keyboardType="numeric"
        inputStyle={styles.inputDOB}
        onBlur={() =>setUserData({ ...userData, date_of_birth: dobRef.current.value })}
        onChangeText={(value) => dobRef.current.value = value}
        ref={dobRef}
        value={userData.date_of_birth}
      />
      <Input
        placeholder={registration.id_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
        onBlur={() =>setUserData({ ...userData, id_number: idNumberRef.current.value })}
        onChangeText={(value) => idNumberRef.current.value = value}
        ref={idNumberRef}
        value={userData.id_number}
      />
      <Text style={styles.text}>{registration.find_doctor_text}</Text>
      <View style={styles.innerContainer}>
        <Text
          style={[
            styles.profileText,
            !userData.profile_picture && {
              marginTop: getHeight(dimens.marginS),
            },
          ]}>
          {registration.add_profile}
        </Text>
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
    marginTop: getHeight(dimens.marginM),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
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
    letterSpacing: getWidth(dimens.borderThin / dimens.borderBold),
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
