import { Image, StyleSheet, View  } from "react-native";
import React from "react";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";
import Input from "components/common/Input";
import { fontWeight } from "designToken/fontWeights";
import { fontFamily } from "designToken/fontFamily";

const SummaryView = () => {
  return (
    <>
  
      <View style={styles.textContainer}>
        <Text title={"Order summary"} style={styles.summary} />
        <TextButton
          title={"Edit order"}
          fontSize={getHeight(fontSize.textL)}
          isActive
        />
      </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.patientAndAddress}>
            <Text title={"The patient "} style={styles.text} />
            <Text title={"17 y.o, 054-6178180"} style={styles.textSmall}/>
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Image
              source={require("../../../assets/icon/location.png")}
              style={styles.locationIcon}
            />
            <Text title={"Ahavat Zion, 10, \n Haifa"}style={styles.textSmall} />
          </View>
        </View>
      </View>

      <View style={styles.symptomsContainer}>
        <Text title={"Symptoms "} style={styles.symptomsText} />
        <Text title={"Back pain"} style={styles.textSmall} />
      </View>

      <Text title={"Services"} style={styles.text} />
      <Text title={"Basic - 500 NIS"} style={styles.textSmall} />
      <Text title={"Voltaren shot - 100 NIS"} style={styles.voltaireText} />
      <View style={{ flexDirection: "row" }}>
        <Text title={"Total"} style={styles.total} />
        <Text title={"- 600 NIS"} style={styles.textSmall}/>
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
      <Text title={"60 min"} style={ styles.textSmall} />

      <View style={styles.instructionContainer}>
        <Text title={"Instructions for arrival"} style={styles.instruction} />
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          inputStyle={styles.description}
          placeholderStyle={ styles.textSmall}
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
  symptomsText:{
    fontSize: getWidth(fontSize.textL),
    marginTop: getWidth(dimens.marginS+5),

  },
  symptomsContainer: {
    flex: 0.17,
  },

  voltarenText: {
    marginVertical: getWidth(dimens.paddingXs),
    fontSize:fontSize.textM
  },
  payForIt: {
    marginVertical: getWidth(dimens.paddingXs),
    fontSize: getWidth(fontSize.textS),
  },
  cardDetail: {
    flex: 0.15,
    flexDirection: "row",
    gap: getWidth(dimens.marginM),
    // backgroundColor:"green"

  },
  textPaid: {
     marginTop: getWidth(dimens.sideMargin +6),
    fontSize: fontSize.textL,
  },
  instructionContainer: {
    flex: 0.42,
    gap: getWidth(dimens.marginS),
    // backgroundColor:"red"
  },
  instruction: {
    fontSize: fontSize.textL,
    marginTop: getWidth(dimens.marginM+dimens.paddingXs),
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
    fontSize:fontSize.textM
  },
  textSmall:{
    fontSize:fontSize.textM,
  
  },
});
