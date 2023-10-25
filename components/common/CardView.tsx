import { getHeight, getWidth } from "libs/StyleHelper";
import { providerList } from "libs/types/ProvierTypes";
import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
interface props {
  providerData: providerList,
  onPressProviderCard: () => void
}
const CardView = ({ providerData, onPressProviderCard }: props) => {
  return (
    <TouchableOpacity onPress={onPressProviderCard} style={styles.cardStyle}>
      <Image source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
        // uri: providerData?.image
      }} height={getHeight(20)} width={getWidth(20)} style={{ backgroundColor: 'rgba(217,217,217,255)' }} />
      <Text>{providerData.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row'
  }
});

export default CardView;
