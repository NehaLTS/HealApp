import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import { dimens } from "../../../../designToken/dimens";
import { fontWeight } from "../../../../designToken/fontWeights";

const UserDetail = () => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");


  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
    } else if (!/^[A-Z][a-z]*$/.test(firstName)) {
      setFirstNameError("First letter should start with an uppercase , followed by lowercase ");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
    } else if (!/^[A-Z][a-z]*$/.test(lastName)) {
      setLastNameError("First letter should start with an uppercase , followed by lowercase ");
    } else {
      setLastNameError("");
    }
  };

  const validatePhoneNumber = () => {

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
    } else {
      setPhoneNumberError("");
    }
  };

  return (
    <>
      <Input
        placeholder={registration.first_name}
        type={"name"}
        inputStyle={styles.input}
        value={firstName}
        errorMessage={firstNameError}
        onChangeText={(text) => setFirstName(text)}
        onBlur={validateFirstName}
      />

      <Input
        placeholder={registration.last_name}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
        value={lastName}
        errorMessage={lastNameError}
        onChangeText={(text) => setLastName(text)}
        onBlur={validateLastName}
      />

      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
        value={phoneNumber}
        errorMessage={phoneNumberError}
        onChangeText={(text) => setPhoneNumber(text)}
        onBlur={validatePhoneNumber}
      />


      <Text style={styles.text}>{registration.find_doctor_text}</Text>
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
  errorText: {
    color: "red",
    fontSize: fontSize.textS,
    marginTop: getHeight(dimens.paddingXs),
  },
});