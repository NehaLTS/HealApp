import { Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";
import Input from "components/common/Input";
import { fontWeight } from "designToken/fontWeights";
import { fontFamily } from "designToken/fontFamily";
import { UseClientUserContext } from "contexts/UseClientUserContext";
interface SummaryViewProps {
  setShowSummary: (value: boolean) => void;
}

const SummaryView = ({ setShowSummary }: SummaryViewProps) => {
  const { orderDetails, setOrderDetails } = UseClientUserContext()

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
            <Text title={"17 y.o, 054-6178180"} />
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Image
              source={require("../../../assets/icon/location.png")}
              style={styles.locationIcon}
            />
            <Text title={"Ahavat Zion, 10, \n Haifa"} />
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
        />
      </View>

      <Text title={"Estimated arrival"} style={styles.text} />
      <Text title={"60 min"} />

      <View style={styles.instructionContainer}>
        <Text title={"Instructions for arrival"} style={styles.instruction} />
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          inputStyle={styles.description}
          onChangeText={(value) => setOrderDetails({ ...orderDetails, Instructions_for_arrival: value })}
        />
      </View>
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
    marginTop: getWidth(dimens.marginS + 2),
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
  },
  symptomsContainer: {
    flex: 0.17,
    marginTop: getWidth(dimens.marginS),

  },

  voltarenText: {
    marginVertical: getWidth(dimens.paddingXs),
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
    marginTop: getWidth(dimens.sideMargin + 6),
    fontSize: fontSize.textL,
  },
  instructionContainer: {
    flex: 0.41,
    gap: getWidth(dimens.marginS),
  },
  instruction: {
    fontSize: fontSize.textL,
    marginTop: getWidth(dimens.sideMargin + 7),
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginS),

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
  },

});
