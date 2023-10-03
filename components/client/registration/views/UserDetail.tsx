import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { getTexts } from "../../../../libs/OneSkyHelper";

const UserDetail = () => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  return (
    <>
      <Input
        placeholder={registration.first_name}
        type={"name"}
        inputStyle={{ marginVertical: 10 }}
      />
      <Input
        placeholder={registration.last_name}
        type={"nameSuffix"}
        inputStyle={{ marginVertical: 10 }}
      />
      <Input
        placeholder={registration.id_number}
        type={"telephoneNumber"}
        keyboardType="number-pad"
        inputStyle={{ marginVertical: 10 }}
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
    paddingTop: getHeight(5),
  },
});
