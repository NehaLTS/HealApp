import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { fontWeight } from "../../../../designToken/fontWeights";

const UserPayment = () => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/icon/card.png")}
          style={styles.creditCard}
        />
        <Text style={styles.profileText}>{registration.add_credit_card}</Text>
      </View>
      <Input
        placeholder={registration.credit_card_number}
        keyboardType="numeric"
        type="creditCardNumber"
        inputStyle={{ marginHorizontal: 10 }}
      />
      <View style={{ flexDirection: "row", columnGap: getHeight(20) }}>
        <Input placeholder={registration.mm_yy} containerWidth={100} />
        <Input placeholder={registration.cvv} containerWidth={80} />
      </View>
      <View style={styles.divider} />
      <View style={styles.googlePayContainer}>
        <Image
          source={require("../../../../assets/icon/googlePay.png")}
          style={styles.googlePay}
        />
        <TouchableOpacity>
          <Text style={styles.profileText}>{registration.add_google_pay}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UserPayment;

const styles = StyleSheet.create({
  divider: {
    height: getWidth(1),
    backgroundColor: colors.black,
    marginTop: getHeight(10),
  },
  googlePay: {
    height: getHeight(32),
    width: getWidth(32),
  },
  inputContainer: {
    gap: getHeight(26),
    marginTop: getHeight(18),
  },
  creditCard: {
    width: getWidth(25),
    height: getHeight(20),
  },
  googlePayContainer: {
    flexDirection: "row",
    gap: getHeight(26),
    alignItems: "center",
    marginTop: getHeight(16),
  },
  skipForLater: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  skipLaterText: {
    color: colors.black,
    textAlign: "center",
    fontSize: getWidth(18),
    marginBottom: getHeight(30),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(5),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    fontWeight: fontWeight.normal,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(20),
  },
});
