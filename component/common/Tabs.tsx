import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../designToken/colors";
import { dimes } from "../../designToken/dimes";
import { fontSize } from "../../designToken/fontSizes";
import { getWidth, getHeight } from "../../libs/StyleHelper";

const Tabs = ({ tab,currentStep }: { tab: any, currentStep:any }) => {


  return (
    <View style={styles.container}>
      {tab?.map((item: { title: string }, index: number) => (
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
          <Text style={styles.activeButtonText}>{item?.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: getHeight(16),
    alignSelf:'center',
    paddingVertical: getHeight(10),
    paddingBottom: getHeight(32)
  },
  activeButtonText: {
    fontSize: getWidth(fontSize.textMd),
    color: colors.black,
  },
  activeButtonView: {
    height: getHeight(30),
    width: getWidth(30),
    borderRadius: getWidth(dimes.marginSm),
    alignItems: "center",
    justifyContent: "center",
  },
});
