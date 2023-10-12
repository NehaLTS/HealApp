import Input from "common/Input";
import Text from "components/common/Text";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";
import UserDetailViewController from "../controllers/UserDetailViewController";

const UserDetailView = () => {
  const { t } = useTranslation();
  const {
    userData,
    firstNameRef,
    lastNameRef,
    phoneNumberRef,
    lastNameError,
    phoneNumberError,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    onBlurPhoneNumber,
    firstNameError,
    onChangePhoneNumber,
  } = UserDetailViewController();


  return (
    <>
      <Input
        placeholder={t('first_name')}
        inputStyle={styles.input}
        onBlur={onBlurFirstName}
        onClearInputText={() => firstNameRef.current.clear()}
        errorMessage={firstNameError}
        onChangeText={onChangeFirstName}
        ref={firstNameRef}
        defaultValue={userData.firstname}
        inputValue={userData.firstname ?? ""}
      />
      <Input
        placeholder={t('last_name')}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        onChangeText={onChangeLastName}
        onClearInputText={() => lastNameRef.current.clear()}
        onBlur={onBlurLastName}
        defaultValue={userData.lastname}
        ref={lastNameRef}
        errorMessage={lastNameError}
        inputValue={userData?.lastname ?? ""}
      />
      <Input
        placeholder={t('phone_number')}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        onChangeText={onChangePhoneNumber}
        defaultValue={userData.phone_number}
        onClearInputText={() => phoneNumberRef.current.clear()}
        onBlur={onBlurPhoneNumber}
        ref={phoneNumberRef}
        errorMessage={phoneNumberError}
        inputValue={userData?.phone_number ?? ""}
      />
      <Text style={styles.text} title={t('find_doctor_text')} />
    </>
  );
};

export default UserDetailView;

const styles = StyleSheet.create({
  text: {
    fontSize: getHeight(fontSize.textM),
    paddingTop: getHeight(dimens.paddingXs)
  },
  input: {
    marginTop: getHeight(dimens.paddingS),
  },
  inputPhone: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  inputLastName: {
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
});

