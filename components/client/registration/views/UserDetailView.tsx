import Input from "common/Input";
import Text from "components/common/Text";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import UserDetailViewController from "../controllers/UserDetailViewController";

const UserDetailView = () => {
  const { t } = useTranslation();
  const {
    userData,
    firstNameRef,
    lastNameRef,
    phoneNumberRef,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    onBlurPhoneNumber,
    onChangePhoneNumber,
  } = UserDetailViewController();

  return (
    <>
      <Input
        placeholder={t('first_name')}
        inputStyle={styles.input}
        onBlur={onBlurFirstName}
        onChangeText={onChangeFirstName}
        ref={firstNameRef}
        value={userData.firstname}
        inputValue={userData?.firstname ?? ""}
      />
      <Input
        placeholder={t('last_name')}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        onChangeText={onChangeLastName}
        onBlur={onBlurLastName}
        value={userData.lastname}
        ref={lastNameRef}
        inputValue={userData?.lastname ?? ""}
      />
      <Input
        placeholder={t('phone_number')}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        onChangeText={onChangePhoneNumber}
        value={userData.phone_number}
        onBlur={onBlurPhoneNumber}
        ref={phoneNumberRef}
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
