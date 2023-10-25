import { useNavigation } from "@react-navigation/native";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import Header from "../../components/common/Header";
import { fontSize } from "../../designToken/fontSizes";
import HomeViewController from "./HomeViewController";
import Text from "components/common/Text";
import SearchBox from "components/common/SearchBox";
import CardView from "components/common/CardView";
import { providerList } from "libs/types/ProvierTypes";

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { providerList, bannerAds, onPressProviderCard, onPressAdBanner } = HomeViewController();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
  const getProviderList = () => {
    return providerList.map((item: providerList, index: number) => (
      <View key={index} style={[]}>
        {/* Pass on Press of card and array of data as props*/}
        <CardView providerData={item} onPressProviderCard={onPressProviderCard} />
      </View>
    ));
  };

  return (
    <View style={styles.container}>

      {/* Banner Advertisement */}
      <TouchableOpacity onPress={onPressAdBanner}>
        <Image source={{
          // uri: 'https://reactnative.dev/img/tiny_logo.png',
          uri: bannerAds?.imageUrl
        }} height={getHeight(147)} width={getWidth(375)} style={{ backgroundColor: 'rgba(217,217,217,255)' }} />
      </TouchableOpacity>
      {/* Pass onPress and handle it in controller of Home */}
      <SearchBox />
      <Text>Which Specialist do you need?</Text>
      {getProviderList()}
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  logo: {
    width: getWidth(dimens.imageL + dimens.imageS),
    height: getHeight(dimens.imageL + dimens.imageS + dimens.imageS),
    alignSelf: "center",
    flex: 0.4,
    justifyContent: "center",
    // resizeMode: "contain",
  },
  welcomeText: {
    fontSize: getHeight(fontSize.headingL),
    alignSelf: "center",
    flex: 0.4,
  },
  buttonContainer: {
    gap: getHeight(fontSize.headingL),
    flex: 0.2,
  },
});
