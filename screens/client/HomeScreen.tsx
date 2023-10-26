import { useNavigation } from "@react-navigation/native";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import Header from "../../components/common/Header";
import { fontSize } from "../../designToken/fontSizes";
import HomeViewController from "./HomeViewController";
import Text from "components/common/Text";
import SearchBox from "components/common/SearchBox";
import CardView from "components/common/CardView";
import { providerList } from "libs/types/ProvierTypes";
import { BannerAd, TestIds, AppOpenAd, InterstitialAd, RewardedAd } from 'react-native-google-mobile-ads';

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { providerList, bannerAds, onPressProviderCard, onPressAdBanner } = HomeViewController();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9743823044590174/2032132976';
  useEffect(() => {
    // Create and load the App Open Ad
    // const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN);
    // appOpenAd.load();

    // Create and load the Interstitial Ad
    const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
    interstitialAd.load();

    // Create and load the Rewarded Ad
    // const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
    // rewardedAd.load();
  }, [InterstitialAd]);

  const getProviderList = () => {
    return providerList.map((item: providerList, index: number) => (
      <View key={index} style={[]}>
        {/* Pass on Press of card and array of data as props*/}
        <CardView providerData={item} onPressProviderCard={onPressProviderCard} />
      </View>
    ));
  };
  const parentWidth = Dimensions.get('window').width - 32;
  const parentHeight = getHeight(147);
  return (
    <View style={styles.container}>
      {/* Banner Advertisement */}
      <View style={{ height: getHeight(147), width: '100%', backgroundColor: 'rgba(217,217,217,255)' }}>
        <BannerAd onAdLoaded={() => console.log('loading....')} unitId={adUnitId} size={`${parentWidth}x${parentHeight}`} />
      </View>
      {/* <TouchableOpacity onPress={onPressAdBanner}>
        <Image source={{
          // uri: 'https://reactnative.dev/img/tiny_logo.png',
          uri: bannerAds?.imageUrl
        }} height={getHeight(147)} width={getWidth(375)} style={{ backgroundColor: 'rgba(217,217,217,255)' }} />
      </TouchableOpacity> */}
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
