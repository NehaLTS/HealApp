import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTranslationContext } from "../../../../contexts/UseTranslationsContext";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { fontWeight } from "../../../../designToken/fontWeights";
import { getTexts } from "../../../../libs/OneSkyHelper";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import LoaderText from "../../../common/LoaderText";

const UserPayment = () => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const isLoading = false; //TODO: need to change after binding data
  const isGetCardDetails = true; //TODO: need to change after binding data

  return (
    <>
      <View style={styles.container}>
        {!isGetCardDetails && !isLoading && (
          <>
            <Image
              source={require("../../../../assets/icon/card.png")}
              style={styles.creditCard}
            />
            <Text style={styles.profileText}>
              {isLoading
                ? registration.add_credit_card
                : registration.check_credit_card}
            </Text>
          </>
        )}
      </View>
      {!isLoading ? (
        isGetCardDetails ? (
          <>
            <View style={styles.innerContainer}>
              <Image
                source={require("../../../../assets/icon/masterCard.png")}
                style={styles.googlePay}
              />
              <Text style={styles.profileText}>Master-card</Text>
              <View style={styles.cardIcons}>
                <Image
                  source={require("../../../../assets/icon/edit.png")}
                  style={styles.cardImages}
                />
                <Image
                  source={require("../../../../assets/icon/cancel.png")}
                  style={styles.cardImages}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <Text style={styles.cardDetail}>**** **** ***** 1234</Text>
              <Text style={styles.cardDetail}>Expires 03/26</Text>
            </View>
          </>
        ) : (
          <>
            <Input
              placeholder={registration.credit_card_number}
              keyboardType="numeric"
              type="creditCardNumber"
              inputStyle={styles.cardNumber}
            />
            <View style={[styles.container, styles.inputDateAndCvv]}>
              <Input
                placeholder={registration.mm_yy}
                containerWidth={getWidth(dimens.imageS + dimens.imageS)}
              />
              <Input
                placeholder={registration.cvv}
                containerWidth={getWidth(dimens.imageXs + dimens.imageXs)}
              />
            </View>
          </>
        )
      ) : (
        <View style={styles.loader}>
          <LoaderText />
        </View>
      )}
      {!isLoading && (
        <>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.googlePayContainer}>
            <Image
              source={require("../../../../assets/icon/googlePay.png")}
              style={styles.googlePay}
            />
            <Text style={styles.profileText}>
              {registration.add_google_pay}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default UserPayment;

const styles = StyleSheet.create({
  divider: {
    height: getWidth(dimens.borderThin),
    backgroundColor: colors.grey,
    marginTop: getHeight(dimens.marginS),
  },
  googlePay: {
    height: getHeight(dimens.marginL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
  },
  inputContainer: {
    gap: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.marginM - dimens.borderBold),
  },
  creditCard: {
    width: getWidth(dimens.paddingL),
    height: getHeight(dimens.marginM),
  },
  googlePayContainer: {
    flexDirection: "row",
    gap: getHeight(dimens.sideMargin),
    alignItems: "center",
    marginTop: getHeight(dimens.sideMargin),
  },
  skipForLater: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  skipLaterText: {
    color: colors.black,
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.marginL),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    fontWeight: fontWeight.normal,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(dimens.marginM),
    marginTop: getHeight(dimens.marginS),
  },
  cardDetail:{
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    fontWeight: fontWeight.light,
  },
  cardNumber: {
    marginVertical: getHeight(dimens.sideMargin),
  },
  inputDateAndCvv: {
    marginBottom: getHeight(dimens.paddingL),
  },
  loader: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    gap: getHeight(dimens.marginM),
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.paddingXs),
  },
  cardImages:{
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  }
});
