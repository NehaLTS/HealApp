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
import DatePicker from 'react-native-date-picker'

const UserAddressView = () => {
  const { t } = useTranslation();
  const {
    userData,
    isShowModal,
    setIsShowModal,
    addressRef,
    birthDateRef,
    idNumberRef,
    onBlurAddress,
    onBlurBirthDate,
    onBlurIdNumber,
    onChangeAddress,
    onChangeBirthDate,
    onChangeIdNumber,
    getImageUrl,
    addressError,
    dateOfBirthError,
    idNumberError
  } = UserAddressViewController();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [firstOpenDialog, setFirstOpenDialog] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
const formatDigit = (digit:string) =>
{
  if(digit.length===1)
  return "0"+digit;
else
return digit;
}
  const formatBirthDate=()=>
  {
    return formatDigit(date.getDate().toString())+"-"+formatDigit((date.getMonth()+1).toString())
    +"-"+formatDigit(date.getFullYear().toString() ?? "")
  }
  return (
    <>
    {open &&<DatePicker
         modal
         mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setDate(date)
          setOpen(false)

        }}
        onCancel={() => {
          setOpen(false)
        }}
        onDateChange={setDate}
         />}
      <Input
        placeholder={t("address")}
        type={"fullStreetAddress"}
        inputStyle={styles.input}
        onBlur={onBlurAddress}
        onClearInputText={() => addressRef.current.clear()}
        onChangeText={onChangeAddress}
        ref={addressRef}
        defaultValue={userData.address}
        errorMessage={addressError}
        inputValue={addressRef.current.value}
      />
      <TouchableOpacity onPress={()=>{setFirstOpenDialog(false); setOpen(true);}}>
      <Input
        placeholder={t("date_of_birth")}
        keyboardType="numeric"
        errorMessage={dateOfBirthError}
        inputStyle={styles.inputDOB}
        onBlur={onBlurBirthDate}
        onChangeText={onChangeBirthDate}
        ref={birthDateRef}
        defaultValue={firstOpenDialog ?"":formatBirthDate()}
        inputValue={birthDateRef.current.value}
      />
      </TouchableOpacity>
      <Input
        placeholder={t("id_number")}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputIdNumber}
        onBlur={onBlurIdNumber}
        onChangeText={onChangeIdNumber}
        ref={idNumberRef}
        onClearInputText={() => idNumberRef.current.clear()}
        defaultValue={userData.id_number}
        errorMessage={idNumberError}
        inputValue={idNumberRef.current.value}
      />
      {/* {open &&
        <DatePicker
          date={selectedDate}
          onDateChange={handleDateChange}
        />} */}
      <Text style={styles.text} title={t("find_doctor_text")} />
      <View style={styles.innerContainer}>
        <Text
          style={[!userData.profile_picture && { marginTop: getHeight(dimens.marginS) }]}
          title={t("add_profile")}
        />
        <TouchableOpacity
          activeOpacity={userData.profile_picture ? 1 : 0.5}
          onPress={() => !userData.profile_picture && setIsShowModal(true)}
          style={[styles.imageContainer, { marginLeft: getWidth(dimens.paddingXs) }]}>
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
  },
  selectedImage: {
    height: getHeight(dimens.imageS),
    width: getWidth(dimens.imageS),
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textM,
    paddingTop: getHeight(dimens.paddingXs)
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
    gap: getWidth(dimens.marginS)
  },
  editImage: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  },
});
