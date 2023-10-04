import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import { dimens } from "../../../../designToken/dimens";

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
        inputStyle={styles.input}
      />
      <Input
        placeholder={registration.phone_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={styles.inputId}
      />
      <Text style={styles.text}>
        {registration.it_will_help_us_to_find_a_best_doctor_for_you}
      </Text>
    </>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs)
  },
  input:{
    marginVertical: getHeight(dimens.marginS)
  },
  inputId:{
    marginTop: getHeight(dimens.marginS)
  }
});
