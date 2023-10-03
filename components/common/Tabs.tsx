import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../designToken/colors";
import { fontSize } from "../../designToken/fontSizes";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { dimens } from "../../designToken/dimens";

const Tabs = ({ currentStep , totalStep }: { currentStep:any, totalStep: number }) => {
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
                index === currentStep ? colors.secondary : colors.disabled,
            },
          ]}
        >
          <Text style={styles.activeButtonText}>{index+1}</Text>
        </View>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: getHeight(dimens.sideMargin),
    alignSelf:'center',
    paddingVertical: getHeight(dimens.paddingXs),
    paddingBottom: getHeight(dimens.marginM + dimens.paddingXs),
    flex:0.03
  },
  activeButtonText: {
    fontSize: getWidth(fontSize.textM),
    color: colors.black,
  },
  activeButtonView: {
    height: getHeight(30),
    width: getWidth(30),
    borderRadius: getWidth(dimens.paddingXs),
    alignItems: "center",
    justifyContent: "center",
  },
});
