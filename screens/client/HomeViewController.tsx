import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";

const HomeViewController = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [bannerAds, setBannerAds] = useState<string[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);

  const searchRef = React.useRef<any>("");

  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList: any = [
    {
      iconSource: require("../../assets/icon/doctor.png"),
      title: "Doctor - home visit",
    },
    {
      iconSource: require("../../assets/icon/physio.png"),
      title: "Physio - home visit",
    },
    {
      iconSource: require("../../assets/icon/nurse.png"),
      title: "Nurse - home visit",
    },
    {
      iconSource: require("../../assets/icon/healer.png"),
      title: "Alternative medicine",
    },
    {
      iconSource: require("../../assets/icon/doctor.png"),
      title: "Doctor - home visit",
    },
    {
      iconSource: require("../../assets/icon/healer.png"),
      title: "Alternative medicine",
    },
  ];

  useEffect(() => {
    getBannerAds();
  }, []);

  const getBannerAds = () => {};

  const onChangeSearch = (value: string) => (searchRef.current.value = value);
  const onTouchStart = () => setIsTouchStart(false);
  const onBlur = () => setIsTouchStart(true);
  const onPressBack = () => {
    Keyboard.dismiss() ;
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
