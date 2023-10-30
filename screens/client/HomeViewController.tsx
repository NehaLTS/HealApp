import { Banner } from "libs/types/ProvierTypes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";

const HomeViewController = () => {
  const [bannerAds, setBannerAds] = useState<Banner[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);
  const [onChangeSearch, setOnChangeSearch] = useState<string> ('');

  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList = [
    {
      id: 1,
      image: "../../assets/icon/doctor.png",
      name: "Doctor - home visit",
    },
    {
      id: 2,
      image: "../../assets/icon/physio.png",
      name: "Physio - home visit",
    },
    {
      id: 3,
      image: "../../assets/icon/nurse.png",
      name: "Nurse - home visit",
    },
    {
      id: 4,
      image: "../../assets/icon/healer.png",
      name: "Alternative medicine",
    },
    {
      id: 5,
      image: "../../assets/icon/doctor.png",
      name: "Doctor - home visit",
    },
    {
      id: 6,
      image: "../../assets/icon/healer.png",
      name: "Alternative medicine",
    },
  ];

  const onChange = (value: string) => setOnChangeSearch(value);
  const onTouchStart = () => setIsTouchStart(false);
  const onBlur = () => setIsTouchStart(true);
  const onPressBack = () => {
    Keyboard.dismiss();
    setOnChangeSearch('')
    setIsTouchStart(true);
  };

  return {
    bannerAds,
    providerList,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChangeSearch,
    onChange,
  };
};

export default HomeViewController;
