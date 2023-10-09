import Input from "common/Input";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { UseUserContext } from "contexts/useUserContext";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getTexts } from "libs/OneSkyHelper";
import { getHeight } from "libs/StyleHelper";
import React from "react";
import { StyleSheet } from "react-native";
import BasicInformationController from "../controllers/BasicInformationController";
import Text from "components/common/Text";

const UserDetail = () => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const { userData, setUserData } = UseUserContext();
  const { firstNameRef, lastNameRef, phoneNumberRef } = BasicInformationController({});

  return (
    <>
      <Input
        placeholder={registration.first_name}
        inputStyle={styles.input}
        onBlur={() => setUserData({ ...userData, firstname: firstNameRef.current.value })}
        onChangeText={(value) => firstNameRef.current.value = value}
        ref={firstNameRef}
        value={userData.firstname} 
        inputValue={userData?.firstname ?? ''}
        />
      <Input
        placeholder={registration.last_name}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        onChangeText={(value) => lastNameRef.current.value = value}
        onBlur={() => setUserData({ ...userData, lastname: lastNameRef.current.value })}
        value={userData.lastname}
        ref={lastNameRef}
        inputValue={userData?.lastname ?? ''}
      />
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        onChangeText={(value) => phoneNumberRef.current.value = value}
        value={userData.phone_number}
        onBlur={() => setUserData({...userData, phone_number: phoneNumberRef.current.value})}
        ref={phoneNumberRef}
        inputValue={userData?.phone_number ?? ''}
      />
      <Text style={styles.text} title={registration.find_doctor_text} />
    </>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  text: {
    fontSize: getHeight( fontSize.textM),
    paddingTop: getHeight(dimens.paddingXs),
    letterSpacing: getHeight(0.5)
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
