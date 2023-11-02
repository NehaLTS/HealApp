import { Image, Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";
import Input from "components/common/Input";
import { fontWeight } from "designToken/fontWeights";
import { fontFamily } from "designToken/fontFamily";
import { colors } from "designToken/colors";
import UserPaymentView from "components/client/registration/views/UserPaymentView";
import CardView from "components/common/CardView";
import { UseClientUserContext } from "contexts/UseClientUserContext";
interface SummaryViewProps {
  setShowSummary: (value: boolean) => void;
}
const SummaryView = ({ setShowSummary }: SummaryViewProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { orderDetails, setOrderDetails } = UseClientUserContext()

  const paymentModal = () => (
    <Modal
      backdropColor={colors.white}
      backdropOpacity={1}
      // onBackdropPress={onPaymentAdd}
      isVisible={isVisible}
      style={styles.modalContainer}>
      <View style={styles.paymentContainer}>
        <UserPaymentView isFromHome={true} />
      </View>
    </Modal>
  );
  return (
    <>

      <View style={styles.textContainer}>
        <Text title={"Order summary"} style={styles.summary} />
        <TextButton
          title={"Edit order"}
          fontSize={getHeight(fontSize.textL)}
          isActive
          onPress={() => setShowSummary(false)}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.patientAndAddress}>
            <Text title={"The patient "} style={styles.text} />
            <Text title={"17 y.o, 054-6178180"} style={styles.textSmall} />
          </View>
          <View style={styles.locationContainer}>
            <Image
              source={require("../../../assets/icon/location.png")}
              style={styles.locationIcon}
            />
            <Text title={"Ahavat Zion, 10,\nHaifa"} style={styles.locationText} />
          </View>
        </View>
      </View>

      <View style={styles.symptomsContainer}>
        <Text title={"Symptoms "} style={styles.text} />
        {orderDetails?.reason.map((item, index) => <Text key={index} title={item.name.en} />)}
      </View>

      <Text title={"Services"} style={styles.text} />
      {orderDetails?.services.map((item, index) => <Text key={index} title={item.name.en} />)}
      <View style={{ flexDirection: "row" }}>
        <Text title={"Total"} style={styles.total} />
        <Text title={`600 NIS`} />
      </View>

      <Text
        title={"*If the doctor won’t use your shot, you won’t pay for it"}
        style={styles.payForIt}
      />
      <View style={styles.cardDetail}>
        <Text title={"Paid by card *4545"} style={styles.textPaid} />
        <TextButton
          title={"Change"}
          fontSize={getHeight(fontSize.textL)}
          isActive
          style={styles.textPaid}
          onPress={() => setIsVisible(true)}
        />
      </View>

      <Text title={"Estimated arrival"} style={styles.text} />
      <Text title={"60 min"} style={styles.textSmall} />

      <View style={styles.instructionContainer}>
        <Text title={"Instructions for arrival"} style={styles.instruction} />
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          inputStyle={styles.description}
          onChangeText={(value) => setOrderDetails({ ...orderDetails, Instructions_for_arrival: value })}
          placeholderStyle={styles.textSmall}
        />

      </View>
      {isVisible && paymentModal()}
    </>
  );
};

export default SummaryView;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    gap: getWidth(dimens.marginM),
    alignItems: "center",
    marginTop: getWidth(dimens.marginM),
  },
  summary: {
    fontSize: fontSize.textXl,
  },
  patientDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getWidth(dimens.marginS + dimens.borderBold),
  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: "center",
  },
  patientAddress: {
    flexDirection: "row",
    gap: getWidth(dimens.sideMargin),
    marginRight: getWidth(dimens.marginM),
    marginTop: getWidth(dimens.marginS),
  },
  text: {
    fontSize: getWidth(fontSize.textL),
    marginBottom: getHeight(dimens.borderBold)
  },
  symptomsText: {
    fontSize: getWidth(fontSize.textL),
    marginTop: getWidth(dimens.marginS + 5),
    marginBottom: 5

  },
  symptomsContainer: {
    flex: 0.17,
    marginTop: getWidth(dimens.marginS),

  },
  locationContainer: {
    flexDirection: "row",
    gap: getWidth(dimens.marginS + 5)
  },
  voltaireText: {
    marginVertical: getWidth(dimens.paddingXs),
    fontSize: fontSize.textM
  },
  payForIt: {
    marginVertical: getWidth(dimens.paddingXs),
    fontSize: getWidth(fontSize.textS),
  },
  cardDetail: {
    flex: 0.15,
    flexDirection: "row",
    gap: getWidth(dimens.marginM),
  },
  textPaid: {
    marginTop: getWidth(dimens.sideMargin + dimens.paddingXs),
    fontSize: getWidth(fontSize.textL),
  },
  instructionContainer: {
    flex: 0.42,
    gap: getWidth(dimens.marginS),
  },
  instruction: {
    fontSize: getWidth(fontSize.textL),
    marginTop: getWidth(dimens.marginM + dimens.paddingXs),
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginM),
    backgroundColor: colors.white
  },

  container: {
    flex: 0.17,
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: getWidth(dimens.sideMargin),
    justifyContent: "space-between",
  },
  patientAndAddress: {
    flexDirection: "column",
  },
  total: {
    fontFamily: fontFamily.bold,
    fontSize: getWidth(fontSize.textM)
  },
  textSmall: {
    fontSize: getWidth(fontSize.textM),
    fontFamily: fontFamily.light,
    backgroundColor: colors.white
  },
  locationText: {
    fontSize: getWidth(fontSize.textM),
  },
  voltarenText: {
    marginVertical: getWidth(dimens.paddingXs),
    fontSize: getWidth(fontSize.textM)
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1
  },
  modalContainer: {
    justifyContent: "flex-start",
  },
});
