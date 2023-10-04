import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSize } from '../designToken/fontSizes';
import { lightColors } from '../designToken/colors';
import { getHeight } from '../libs/StyleHelper';
const Buttons = ({ title,isprimary,  ...props }: { title: string , isprimary:boolean}) => {
  return (
        
    <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={{
        borderWidth: getHeight(1),
        borderColor: isprimary ? "rgba(12, 127, 187, 1) ": "black",
        backgroundColor: isprimary ? "rgba(12, 127, 187, 1) ": "transparent",
        alignItems: "center",
        justifyContent: "center",
        height: getHeight(48),
        borderRadius: getHeight(5),
        zIndex: 1
      }}
    >
      <Text
        style={{
          fontSize: getHeight(24),
          color: isprimary ? "white": "black",
          fontWeight: "600",
          lineHeight: getHeight(28),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
</View>
   
        
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: getHeight(30),
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: getHeight(25),

  },
 
});

export default Buttons;
