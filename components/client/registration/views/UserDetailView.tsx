import Input from "common/Input";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import UserDetailViewController from "../controllers/UserDetailViewController";

const UserDetailView = () => {
  const { t } = useTranslation();
  const {
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
    onPressNext,
    onPressBack,
  } = UserDetailViewController();

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={t("first_name")}
          inputStyle={styles.input}
          onBlur={onBlurFirstName}
          onClearInputText={() => firstNameRef.current.clear()}
          errorMessage={firstNameError}
          onChangeText={onChangeFirstName}
          ref={firstNameRef}
          defaultValue={""}
          inputValue={firstNameRef.current.value}
        />
        <Input
          placeholder={t("last_name")}
          type={"nameSuffix"}
          inputStyle={styles.inputLastName}
          onChangeText={onChangeLastName}
          onClearInputText={() => lastNameRef.current.clear()}
          onBlur={onBlurLastName}
          defaultValue={""}
          ref={lastNameRef}
          errorMessage={lastNameError}
          inputValue={lastNameRef.current.value}
          returnKeyType={"next"}
          onSubmitEditing={() => phoneNumberRef.current.focus()}
        />
        <Input
          placeholder={t("phone_number")}
          type={"telephoneNumber"}
          keyboardType="number-pad"
          inputStyle={styles.inputPhone}
          onChangeText={onChangePhoneNumber}
          defaultValue={""}
          onClearInputText={() => phoneNumberRef.current.clear()}
          onBlur={onBlurPhoneNumber}
          ref={phoneNumberRef}
          errorMessage={phoneNumberError}
          inputValue={phoneNumberRef.current.value}
        />
        <Text style={styles.text} title={t("find_doctor_text")} />
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
    </>
  );
};

export default UserDetailView;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.75,
  },
  text: {
    fontSize: getHeight(fontSize.textM),
    paddingTop: getHeight(dimens.paddingXs),
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
  footerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    flex: 0.12,
    justifyContent: "space-between",
  },
});
