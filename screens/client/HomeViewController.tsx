import { ClientOrderServices } from "libs/ClientOrderServices";
import { Banner, search_provider } from "libs/types/ProvierTypes";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Keyboard, Linking } from "react-native";

const HomeViewController = () => {
  const [bannerAds, setBannerAds] = useState<Banner[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);
  const { getBannerAds, searchProviders } = ClientOrderServices()
  const searchRef = useRef<search_provider[]>([]);
  const [onChangeSearch, setOnChangeSearch] = useState<string>('');
  const [isDataNotFound, setIsDataNotFound] = useState<boolean>(true);
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

  useEffect(() => {
    getBannerAd();
  }, []);
  const onPressBanner = () =>
    Linking.openURL(bannerAds[0]?.destinationUrl)


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
  const onSearchDone = async () => {
    const res = await searchProviders({ name: onChangeSearch });
    console.log('bvjcxnb', res)
    searchRef.current = res
    if (res.length > 0) {
      setIsDataNotFound(false)
    }
  }
  // const onChangeSearch = (value: string) => (searchRef.current.value = value);
  const onChange = (value: string) => setOnChangeSearch(value);
  const onTouchStart = async () => {
    setIsTouchStart(false)
  };
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
    onPressBanner,
    searchRef,
    onSearchDone,
    isDataNotFound
  };
};

export default HomeViewController;
