import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSize } from '../designToken/fontSizes';
import { colors  } from '../designToken/colors';
import { getHeight } from '../libs/StyleHelper';
import { dimens } from '../designToken/dimens';
import { fontWeight } from '../designToken/fontWeights';
const Button = ({ title,isprimary,  ...props }: { title: string , isprimary?:boolean}) => {
  return (
        
    <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={[styles.title ,{ borderColor: isprimary ? colors.primary: colors.black,
      backgroundColor: isprimary ? colors.primary: "transparent",}]}>
      <Text
        style={[styles.text,{ color: isprimary ? colors.white: colors.black,}]}> {title} </Text>
    </TouchableOpacity>
</View>
   
        
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: getHeight(dimens.marginL),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: getHeight(dimens.paddingL+dimens.borderThin),

  },
  title:{
    borderWidth: getHeight(dimens.borderThin),
    alignItems: "center",
    justifyContent: "center",
    height: getHeight(dimens.imageS),
    borderRadius: getHeight(5),
    zIndex: 1
  },
  text:{
    fontSize: getHeight(fontSize.heading),
    fontWeight:fontWeight.semiBold,
    lineHeight: getHeight(dimens.sideMargin+dimens.paddingS),
  }
 
});

export default Button;
