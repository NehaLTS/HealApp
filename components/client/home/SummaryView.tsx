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
            <Text title={"The patient "} style={styles.text}/>
            <Text title={"17 y.o, 054-6178180"} />
          </View>
          <View style={{flexDirection:"row",gap:15}}>
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
        <Text title={"Back pain"} />
      </View>

      <Text title={"Services"} style={styles.text} />
      <Text title={"Basic - 500 NIS"} />
      <Text title={"Voltaren shot - 100 NIS"} style={styles.voltarenText} />
      <View style={{flexDirection:"row"}}> 
        <Text title={"Total"}  style={styles.total}/>
      <Text title={"- 600 NIS"} />
      </View>
     
      <Text
        title={"*If the doctor won’t use your shot, you won’t pay for it"}
        style={styles.payForIt}
      />
      <View style={styles.cardDetail}>
        <Text title={"Paid by card *4545"} style={styles.text} />
        <TextButton
          title={"Change"}
          fontSize={getHeight(fontSize.textL)}
          isActive
         
        />
      </View>

      <Text title={"Estimated arrival"} style={styles.text} />
      <Text title={"60 min"} />

      <View style={styles.instructionContainer}>
        <Text title={"Instructions for arrival"} style={styles.instruction} />
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          // multiline
          // numberOfLines={2}
          inputStyle={styles.description}
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
    marginRight: getHeight(dimens.marginM),
    marginTop: getWidth(dimens.marginS),
  },
  text: {
    fontSize: fontSize.textL,
  },
  symptomsContainer: {
    flex: 0.17,
    marginTop:getHeight(dimens.marginS),
    backgroundColor:"red"

  },

  voltarenText: {
    marginVertical: getHeight(dimens.paddingXs),
  },
  payForIt: {
    marginVertical: getHeight(dimens.paddingXs),
    fontSize: getHeight(fontSize.textS),
  },
  cardDetail: {
     alignItems: "center",
    flex: 0.1,
    flexDirection: "row",
    gap: getWidth(dimens.marginM),
    // backgroundColor:"blue"
   
  },
  instructionContainer: {
    flex: 0.42,
    gap: getWidth(dimens.marginS),
    backgroundColor:"yellow"

  },
  instruction:{
    fontSize: fontSize.textL,
marginTop:getHeight(dimens.sideMargin+dimens.borderBold)
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginS),
  },
 
  container: {
    flex: 0.17,
    justifyContent:"center",
    backgroundColor:"green"


  },
  rowContainer: {
    flexDirection: "row",
    // gap:getHeight(dimens.marginM),
    marginTop:getHeight(dimens.sideMargin),
    backgroundColor:"pink",
    justifyContent:"space-between"

  },
  patientAndAddress: {
    flexDirection: "column",
  
  },
  total:{
    fontFamily:fontFamily.bold
  }
});
