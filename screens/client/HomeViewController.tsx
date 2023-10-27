import { useNavigation } from "@react-navigation/native";
import { ClientOrderServices } from "libs/ClientOrderServices";
import { Banner } from "libs/types/ProvierTypes";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";
import { providerList } from '../../libs/types/ProvierTypes'
import { home } from '../../strings/en.json'

const HomeViewController = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [bannerAds, setBannerAds] = useState<Banner[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);
  const { getBannerAds } = ClientOrderServices()
  const searchRef = React.useRef<any>("");

  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList: providerList[] = home.providerList;

  useEffect(() => {
    getBannerAd();
  }, []);

  const getBannerAd = async () => {
    try {
      const res = await getBannerAds();
      console.log("resp", res);
      setBannerAds(res)
    } catch (error) {
      // Handle any errors that occurred during the execution of getBannerAds
      console.error("An error occurred:", error);
    }
  };

  const onChangeSearch = (value: string) => (searchRef.current.value = value);
  const onTouchStart = () => setIsTouchStart(false);
  const onBlur = () => setIsTouchStart(true);
  const onPressBack = () => {
    Keyboard.dismiss();
    setIsTouchStart(true);
    searchRef.current.value = "";
    searchRef.current.clear();
  };


  return {
    bannerAds,
    providerList,
    searchRef,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChangeSearch,
  };
};

export default HomeViewController;
