import { useNavigation } from "@react-navigation/native";
import avatar from "assets/icon/avatar.png";
import arrowBack from "assets/icon/arrowBack.png";
import logo from "assets/icon/healLogo.png";
import location from "assets/icon/location.png";
import noSearchResult from "assets/icon/searchFallback.png";
import Button from "components/common/Button";
import CardView from "components/common/CardView";
import SearchBox from "components/common/SearchBox";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import HomeViewController from "./HomeViewController";
import ProviderAddServices from "components/provider/registration/views/ProviderAddServices";
import { BannerAd, TestIds, AppOpenAd, InterstitialAd, RewardedAd } from 'react-native-google-mobile-ads';
import { ClientOrderServices } from "libs/ClientOrderServices";

const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    providerList,
    bannerAds,
    searchRef,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChangeSearch,
  } = HomeViewController();
  const { searchProviders } = ClientOrderServices()
  const isDataNotFound = true;
  const parentWidth = Dimensions.get('window').width - 32;
  const parentHeight = getHeight(147);
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerTitle}>
            <Image source={location} style={styles.location} />
            <Text numberOfLines={2}>Your current location</Text>
          </View>
          <TextButton
            isActive
            title="Change"
            fontSize={getWidth(fontSize.textM)}
          />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={onPressBack}>
          <Image
            source={
              !isTouchStart || searchRef?.current?.value ? arrowBack : logo
            }
            style={
              !isTouchStart || searchRef?.current?.value
                ? styles.arrowBack
                : styles.logo
            }
          />
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerRight: () => (
        <TouchableHighlight underlayColor="transparent">
          <Image source={avatar} style={styles.avatar} />
        </TouchableHighlight>
      ),
    });
  }, [navigation, isTouchStart]);

  const getProviderList = () => {
    // Pass on Press of card and array of data as props*/

    return (
      <>
        <Text style={styles.searchHeading}>Which Specialist do you need?</Text>
        {providerList.map((item: any, index: number) => (
          <Animated.View
            key={index}
            entering={FadeInUp.duration(200).easing(Easing.ease)}
            exiting={FadeInDown.duration(10).easing(Easing.ease)}>
            <CardView item={item} index={index} />
          </Animated.View>

        ))}
      </>
    );
  };
  const getProviderSearchList = () => {
    // Pass on Press of card and array of data as props*/
    return providerList.map((item: any, index: number) => (
      <Animated.View
        key={index}
        entering={FadeInUp.duration(200).easing(Easing.ease)}
        exiting={FadeInDown.duration(10).easing(Easing.ease)}>
        <CardView item={item} index={index} isSearch />
      </Animated.View>
    ));
  };
  const noSearchedList = () => {
    return (
      <View style={styles.imageContainer}>
        <Text title={"No search results"} style={styles.noSearchText} />
        <Image source={noSearchResult} style={styles.searching} />
        <Button
          title={"Back to search"}
          isPrimary
          isSmall
          width={"70%"}
          onPress={onPressBack}
        />
      </View>
    );
  };

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Banner Advertisement */}
      {isTouchStart && !searchRef?.current?.value && (
        <Image
          style={styles.banner}
          source={require("assets/icon/google.png")}
        />
      )}
      {/* <View style={{ height: getHeight(147), width: '100%', backgroundColor: 'rgba(217,217,217,255)' }}>
        <BannerAd onAdLoaded={() => console.log('loading....')} unitId={adUnitId} size={`${parentWidth}x${parentHeight}`} />
      </View> */}
      <SearchBox
        isTouchStart={isTouchStart && !searchRef?.current?.value}
        placeholder="What treatment do you need?"
        onTouchStart={onTouchStart}
        onBlur={onBlur}
        onChangeText={onChangeSearch}
        ref={searchRef}
        defaultValue={searchRef.current.value}
      />
      {!searchRef?.current?.value
        ? getProviderList()
        : isDataNotFound
          ? getProviderSearchList()
          // ? searchProviders({ name: 'Fever' })
          : noSearchedList()}
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  banner: {
    width: "100%",
    backgroundColor: colors.lightGrey,
    height: getHeight(dimens.imageM),
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "center",
    marginTop: getHeight(dimens.marginS),
  },
  searchHeading: {
    alignSelf: "center",
    fontSize: getHeight(fontSize.textXl),
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(40),
    resizeMode: "contain",
  },
  avatar: {
    height: getHeight(45),
    width: getWidth(45),
    resizeMode: "contain",
  },
  header: {
    backgroundColor: colors.white,
  },
  location: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: "center",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: dimens.paddingS,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  noSearchText: {
    textAlign: "center",
    fontSize: getHeight(fontSize.headingL),
    marginVertical: getHeight(dimens.imageXs),
  },
  searching: {
    width: getWidth(176),
    height: getHeight(332),
    resizeMode: "center",
    marginTop: getHeight(dimens.marginS),
  },
  imageContainer: {
    alignItems: "center",
    gap: getHeight(dimens.marginL),
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: "center",
  },
});
