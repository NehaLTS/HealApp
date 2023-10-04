import React from "react";
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
  return (
    <>
      <Input
        placeholder={registration.first_name}
        type={"name"}
        inputStyle={styles.input}
      />
      <Input
        placeholder={registration.last_name}
        type={"nameSuffix"}
        inputStyle={styles.inputLastName}
      />
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputPhone}
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
    letterSpacing:getHeight(dimens.borderThin),
    fontWeight:fontWeight.light,
  },
  input:{
    marginTop: getHeight(dimens.paddingS)
  },
  inputPhone:{
    marginTop: getHeight(dimens.sideMargin+dimens.paddingS)
  },
  inputLastName:{
    marginTop:getHeight(dimens.sideMargin+dimens.paddingS)
  }
});
