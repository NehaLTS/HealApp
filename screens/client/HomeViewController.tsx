import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HomeViewController = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [bannerAds, setBannerAds] = useState<string[]>([]);

  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList :any = [];
 

    useEffect(() => {
     getBannerAds();
  }, [])

  const getBannerAds = () => {
  
}


  return {
  bannerAds,
  providerList
  };
};

export default HomeViewController;