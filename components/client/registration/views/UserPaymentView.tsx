import Input from "common/Input";
import Loader from "components/common/Loader";
import Text from "components/common/Text";
import { useTranslationContext } from "contexts/UseTranslationsContext";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getTexts } from "libs/OneSkyHelper";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from "react-native";

import UserPaymentViewController from "../controllers/UserPaymentViewController";

//TODO: * are changed after setup i18 and static data i changes after binding data
const UserPaymentView = ({ isLoading, isGetCardDetails,
  cardError,
  expireDateError,
  evvError: cvvErrormessage,
  setIsGetCardDetails,
  setIsCardDetails
}: {
  isLoading: boolean, isGetCardDetails: boolean,
  cardError: string,
  expireDateError: string,
  evvError: string,
  setIsGetCardDetails: React.Dispatch<React.SetStateAction<boolean>>
  setIsCardDetails: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { languageCode } = useTranslationContext();
  const { registration } = getTexts(languageCode);
  const {
    userData,
    cardNumberRef,
    expireDateRef,
    cvvRef,
    onBlurCardNumber,
    onBlurExpireDate,
    onBlueCvv,
    onChangeCardNumber,
    onChangeExpireDate,
    onChangeCvv,
    cardNumberError,
    cvvError,
    cardExpiry,
    onClearCard
  } = UserPaymentViewController();

  // const isLoading = false; //TODO: need to change after binding data
  // const isGetCardDetails = false; //TODO: need to change after binding data
  console.log("isloading", isLoading, isGetCardDetails)
  const last4Digits = !userData?.credit_card_number ? '' : userData?.credit_card_number.slice(-4);
  const cardNumber = "**** **** ***** " + last4Digits;
  return (
    <>
      <View style={styles.container}>
        {!isGetCardDetails && (
          <>
            <Image
              source={require("assets/icon/card.png")}
              style={styles.creditCard}
            />
            <Text
              title={
                !isLoading
                  ? registration.add_credit_card
                  : registration.check_credit_card
              }
            />
          </>
        )}
      </View>
      {!isLoading ? (
        isGetCardDetails ? (
          <>
            <View style={styles.innerContainer}>
              <Image
                source={require("assets/icon/masterCard.png")}
                style={styles.googlePay}
              />
              <Text title="Master-card" />
              <View style={styles.cardIcons}>
                <TouchableOpacity onPress={() => { setIsGetCardDetails(false), setIsCardDetails(false) }}>
                  <Image
                    source={require("assets/icon/edit.png")}
                    style={styles.cardImages}
                  />
                </TouchableOpacity>
                <Image
                  source={require("assets/icon/cancel.png")}
                  style={styles.cardImages}
                />
              </View>
            </View>
            {/* <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDetail} title="**** **** ***** 1234" />
              <Text
                style={styles.cardDetail}
                title={`${registration.expires} 03/26`}
              />
            </View> */}

            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDetail} title={cardNumber} />
              <Text
                style={styles.cardDetail}
                title={`${registration.expires} ` + userData.expire_date}
              />
            </View>
          </>
        ) : (
          <>
            <Input
              placeholder={registration.credit_card_number}
              keyboardType="numeric"
              inputStyle={styles.cardNumber}
              onBlur={onBlurCardNumber} 
              onChangeText={onChangeCardNumber}
              ref={cardNumberRef}
              defaultValue={cardNumberRef.current.value}
              errorMessage={cardError.length ? cardError : cardNumberError}
              inputValue={cardNumberRef.current.value}
              returnKeyType={"next"}
              onSubmitEditing={() => expireDateRef.current.focus()}
              // onClearInputText={() => cardNumberRef?.current?.clear()}
              onClearInputText={onClearCard}
              maxLength={19}
            />
            <View style={[styles.container, styles.inputDateAndCvv]}>
              <Input
                keyboardType="numeric"
                placeholder={registration.mm_yy}
                inputStyle={styles.expireDate}
                onBlur={onBlurExpireDate}
                onClearInputText={() => expireDateRef.current.clear()}
                onChangeText={onChangeExpireDate}
                ref={expireDateRef}
                errorMessage={expireDateError.length ? expireDateError : cardExpiry}
                defaultValue={userData.expire_date}
                inputValue={userData?.expire_date ?? ""}
                returnKeyType={"next"}
                onSubmitEditing={() => cvvRef.current.focus()}
                maxLength={5}
              />
              <Input
                keyboardType="numeric"
                type="creditCardNumber"
                placeholder={registration.cvv}
                onBlur={onBlueCvv}
                // errorMessage={cvvErrormessage.length ? cvvErrormessage : cvvError}
                onClearInputText={() => cvvRef.current.clear()}
                onChangeText={onChangeCvv}
                ref={cvvRef}
                defaultValue={userData.cvv}
                inputValue={userData?.cvv ?? ""}
                maxLength={3}
              />
            </View>
          </>
        )
      ) : (
        <ActivityIndicator style={styles.loading} size={'large'} />
      )}
      {!isLoading && (
        <>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.googlePayContainer}>
            <Image
              source={require("assets/icon/googlePay.png")}
              style={styles.googlePay}
            />
            <Text title={registration.add_google_pay} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default UserPaymentView;

const styles = StyleSheet.create({
  divider: {
    height: getWidth(dimens.borderThin),
    backgroundColor: colors.grey,
    marginTop: getHeight(dimens.marginS),
    marginBottom: getHeight(dimens.paddingXs),
  },
  googlePay: {
    height: getHeight(dimens.paddingL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
  },
  inputContainer: {
    gap: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.paddingS + dimens.paddingXs),
  },
  creditCard: {
    width: getWidth(dimens.paddingL),
    height: getHeight(dimens.marginM),
  },
  googlePayContainer: {
    flexDirection: "row",
    gap: getWidth(dimens.sideMargin),
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
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(dimens.marginM),
    marginTop: getHeight(dimens.marginS),
  },
  cardDetail: {
    fontFamily: fontFamily.light
  },
  cardNumber: {
    marginTop: getHeight(dimens.sideMargin + dimens.borderBold),
  },
  inputDateAndCvv: {
    marginBottom: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.paddingL + 2),
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
    gap: getHeight(dimens.paddingL),
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.paddingS),
  },
  cardImages: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  },
  cardDetailContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM + dimens.borderBold),
    marginBottom: getHeight(dimens.borderBold),
  },
  expireDate: {
    minWidth: "30%",

  },
  loading: {
    left: '44%',
    top: '50%',
    position: 'absolute',
    zIndex: 1
  },
});
