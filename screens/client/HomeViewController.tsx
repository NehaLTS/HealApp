import { useNavigation } from "@react-navigation/native";
import { ClientOrderServices } from "libs/ClientOrderServices";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
import { Banner, providerList } from '../../libs/types/ProvierTypes'
import { home } from '../../strings/en.json'
const HomeViewController = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [bannerAds, setBannerAds] = useState<Banner>();
  const { getBannerAds } = ClientOrderServices()
  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList: providerList[] = home.providerList;


  useEffect(() => {
    getBannerAd();
  }, [])

  const getBannerAd = async () => {
    try {
      const res = await getBannerAds();
      console.log("resp", res);
      setBannerAds(res)
    } catch (error) {
      // Handle any errors that occurred during the execution of getBannerAds
      console.error("An error occurred:", error);
    }
  }

  const onPressProviderCard = () => {
    console.log('onPressProviderCard')
  }
  const onPressAdBanner = async () => await Linking.openURL('https://google.com')
  return {
    bannerAds,
    providerList,
    onPressProviderCard,
    onPressAdBanner
  };
};

export default HomeViewController;