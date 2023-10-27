import Input from "common/Input";
import SelectImage from "common/SelectImage";
import Text from "components/common/Text";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import UserAddressViewController from "../controllers/UserAddressViewController";
import DatePicker from "react-native-date-picker";
import Button from "components/common/Button";
import RNModal from "components/common/Modal";
import { colors } from "designToken/colors";
import TextButton from "components/common/TextButton";

const UserAddressView = () => {
  const { t } = useTranslation();
  const {
    isShowModal,
    setIsShowModal,
    addressRef,
    dateOfBirth,
    setDateOfBirth,
    idNumberRef,
    onBlurAddress,
    profilePicture,
    onBlurIdNumber,
    onChangeAddress,
    onChangeIdNumber,
    getImageUrl,
    addressError,
    dateOfBirthError,
    idNumberError,
    onPressNext,
    onPressBack,
    birthDateRef,
    setOnSearchAddress,
    setIsVisible,
    isVisible,
    onSearchAddress
  } = UserAddressViewController();
  const currentDate = new Date();

  const [open, setOpen] = useState(false);
  const [firstOpenDialog, setFirstOpenDialog] = useState(true);
  const [date, setDate] = useState(
    new Date(new Date().getFullYear() - 15, 0, 1)
  );
  const originalDate = new Date(dateOfBirth ?? "");
  const formattedDate = originalDate
    .toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    })
    .replace(/ /g, "-");

  const maxDate = new Date(
    currentDate.getFullYear() - 15,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const addAddressView = () => {
    return (
      <View style={styles.addressView}>
        <Input
          placeholder={t("address")}
          type={"fullStreetAddress"}
          inputStyle={[{ minWidth: "82%" }]}
          onClearInputText={() => addressRef.current.clear()}
          onChangeText={setOnSearchAddress}
          inputValue={onSearchAddress}
          value={onSearchAddress}
          onSubmitEditing={() => setIsVisible(false)}
          autoFocus
        />
        <TextButton
          containerStyle={{ width: "18%", alignItems: "flex-end" }}
          title="Close"
          fontSize={fontSize.textL}
          onPress={() => setIsVisible(false)}
        />
      </View>
    );
  };

  return (
    <>
      {open && (
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setDateOfBirth(date.toString());
            setDate(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          maximumDate={maxDate}
        />
      )}
      <View style={styles.inputContainer}>
        <Input
          placeholder={t("address")}
          inputStyle={styles.input}
          value={onSearchAddress}
          errorMessage={addressError}
          onTouchStart={() => setIsVisible(true)}
          caretHidden
          inputValue={onSearchAddress}
          onClearInputText={()=>setOnSearchAddress('')}
        />
        <Input
          placeholder={t("date_of_birth")}
          keyboardType="numeric"
          errorMessage={dateOfBirthError}
          inputStyle={styles.inputDOB}
          onBlur={() => {}}
          onChangeText={() => {}}
          onClearInputText={() => birthDateRef.current.clear()}
          ref={birthDateRef}
          defaultValue={formattedDate === "Invalid-Date" ? "" : formattedDate}
          inputValue={dateOfBirth?.toString() ?? ""}
          onPressCalender={() => {
            setFirstOpenDialog(false);
            setOpen(true);
          }}
          type="dateOfBirth"
          returnKeyType={"next"}
          editable={false}
          onSubmitEditing={() => idNumberRef.current.focus()}
        />

        <Input
          placeholder={t("id_number")}
          type={"telephoneNumber"}
          keyboardType="number-pad"
          inputStyle={styles.inputIdNumber}
          onBlur={onBlurIdNumber}
          onChangeText={onChangeIdNumber}
          ref={idNumberRef}
          onClearInputText={() => idNumberRef.current.clear()}
          defaultValue={""}
          errorMessage={idNumberError}
          inputValue={idNumberRef.current.value}
        />
        <Text style={styles.text} title={t("find_doctor_text")} />
        <View style={styles.innerContainer}>
          <Text
            style={[
              !profilePicture && { marginTop: getHeight(dimens.marginS) },
            ]}
            title={t("add_profile")}
          />
          <TouchableOpacity
            activeOpacity={profilePicture ? 1 : 0.5}
            onPress={() => !profilePicture && setIsShowModal(true)}
            style={[
              styles.imageContainer,
              { marginLeft: getWidth(dimens.paddingXs) },
            ]}>
            <Image
              source={
                profilePicture
                  ? { uri: profilePicture }
                  : require("assets/icon/editprofile.png")
              }
              style={profilePicture ? styles.selectedImage : styles.editProfile}
            />
          </TouchableOpacity>
          {profilePicture && (
            <TouchableOpacity
              activeOpacity={profilePicture ? 1 : 0.5}
              onPress={() => setIsShowModal(true)}
              style={[styles.imageContainer, { paddingLeft: getWidth(5) }]}>
              <Image
                source={require("assets/icon/circumEditBlue.png")}
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
      </View>
      <View style={styles.footerContainer}>
        <Button title={t("back")} isSmall onPress={onPressBack} width={"30%"} />
        <Button
          title={t("next")}
          isPrimary
          onPress={onPressNext}
          isSmall
          width={"30%"}
        />
      </View>
      <RNModal
        style={styles.modal}
        backdropOpacity={1}
        backdropColor={colors.white}
        isVisible={isVisible}>
        {addAddressView()}
      </RNModal>
    </>
  );
};

export default UserAddressView;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginS),
    marginTop: getHeight(dimens.marginS),
  },
  editProfile: {
    height: getHeight(dimens.imageS + dimens.marginS),
    width: getWidth(dimens.imageS + dimens.marginS),
    resizeMode: "contain",
  },
  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textM,
    paddingTop: getHeight(dimens.paddingXs),
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
    height: getHeight(dimens.paddingL + 2),
    width: getWidth(dimens.paddingL),
    // paddingLeft: getWidth(5)
  },
  inputContainer: {
    flex: 0.75,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    flex: 0.12,
    justifyContent: "space-between",
  },
  modal:{ 
    flex: 1, 
    justifyContent: "flex-start" 
  },
  addressView:{
    flexDirection: "row",
     alignItems: "center",
     marginTop: getHeight(dimens.paddingS),
  }
});
