import Input from "common/Input";
import { UseUserContext } from "contexts/useUserContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { fontWeight } from "designToken/fontWeights";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

const UserDetail = () => {
  const firstNameRef = React.useRef<any>("");
  const lastNameRef = React.useRef<any>("");
  const phoneNumberRef = React.useRef<any>("");
  const { userData, setUserData } = UseUserContext();
  const {t} = useTranslation();

  return (
    <>
      <Input
        placeholder={t("first_name")}
        inputStyle={styles.input}
        onBlur={() =>
          setUserData({ ...userData, firstname: firstNameRef.current.value })
        }
        onChangeText={(value) => firstNameRef.current.value = value}
        ref={firstNameRef}
        value={userData.firstname}
      />
      <Input
        placeholder={t("last_name")}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        onChangeText={(value) => lastNameRef.current.value = value}
        onBlur={() =>
          setUserData({ ...userData, lastname: lastNameRef.current.value })
        }
        value={userData.lastname}
        ref={lastNameRef}
      />
      <Input
        placeholder={t("phone_number")}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        onChangeText={(value) => phoneNumberRef.current.value = value}
        value={userData.phone_number}
        onBlur={() =>
          setUserData({
            ...userData,
            phone_number: phoneNumberRef.current.value,
          })
        }
        ref={phoneNumberRef}
      />
      <Text style={styles.text}>{t("find_doctor_text")}</Text>
    </>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
    letterSpacing: getHeight(dimens.borderThin),
    fontWeight: fontWeight.light,
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
