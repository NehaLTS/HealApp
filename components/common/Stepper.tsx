import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "designToken/colors";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";

const Stepper = ({ currentStep , totalStep }: { currentStep:number[], totalStep: number }) => {
  const step = Array(totalStep).fill(0);
  return (
    <View style={styles.container}>
      {step?.map((_, index: number) => (
        <View
          key={index}
          style={[
            styles.activeButtonView,
            {
              backgroundColor:
              currentStep?.includes(index) ? colors.secondary : colors.disabled,
            },
          ]}
        >
          <Text style={styles.activeButtonText}>{index+1}</Text>
        </View>
      ))}
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: getHeight(dimens.sideMargin),
    alignSelf:'center',
    paddingVertical: getHeight(dimens.paddingXs),
    flex:0.05,
    alignItems:"center",
    marginBottom:getHeight(dimens.paddingS),
    paddingTop: getHeight(dimens.paddingXs + dimens.borderThin),
  },
  activeButtonText: {
    fontSize: getWidth(fontSize.textM),
    color: colors.black,
  },
  activeButtonView: {
    height: getHeight(dimens.marginL),
    width: getHeight(dimens.marginL),
    borderRadius: getWidth(dimens.marginS),
    alignItems: "center",
    justifyContent: "center",
  },
});
