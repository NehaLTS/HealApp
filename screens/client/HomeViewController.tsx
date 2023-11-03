import { useNavigation } from "@react-navigation/native";
import { ClientOrderServices } from "libs/ClientOrderServices";
import { deleteLocalData, getLocalData } from "libs/datastorage/useLocalStorage";
import { Banner, search_provider } from "libs/types/ProvierTypes";
import { ClientProfile } from "libs/types/UserType";
import NavigationRoutes from "navigator/NavigationRoutes";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Linking } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";

interface Location {
  latitude: number
  longitude: number
}
const HomeViewController = () => {
  const navigation = useNavigation()
  const [bannerAds, setBannerAds] = useState<Banner[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);
  const { getBannerAds, searchProviders } = ClientOrderServices()
  const [providersList, setProvidersList] = useState<search_provider[]>([])
  const [onChangeSearch, setOnChangeSearch] = useState<string>('');
  const [isDataNotFound, setIsDataNotFound] = useState<boolean>(true);
  const [location, setLocation] = useState<Location>();
  const [user, setUser] = useState<ClientProfile>();

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
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((status) => {
      if (status === RESULTS.GRANTED) {
        // Location permission is already granted
        getLocation();
      } else {
        // Request location permission
        requestLocationPermission();
      }
    });
    const abc = getLocalData('USERPROFILE')
    setUser(abc)
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };



  const requestLocationPermission = async () => {
    const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status === RESULTS.GRANTED) {
      // Location permission granted, get the location
      getLocation();
    } else {
      console.log('Location permission not granted');
      Alert.alert("Please turn on your permission")
    }
  };

  const onPressBanner = () => Linking.openURL(bannerAds[0]?.destinationUrl)


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
    const res = await searchProviders({ name: onChangeSearch, latitude: location?.latitude.toString() ?? '', longitude: location?.longitude.toString() ?? '' });
    console.log('onSearchDone', res)
    if (res?.message)
      setIsDataNotFound(false)
    else
      setProvidersList(res)

  }
  const onChange = (value: string) => {
    setOnChangeSearch(value)
    setIsDataNotFound(true)
  };
  const onSearch = () => {
    deleteLocalData(),
      navigation.navigate(NavigationRoutes.IntroStack)
  }
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
    providersList,
    onSearchDone,
    isDataNotFound,
    onSearch,
    user
  };
};

export default HomeViewController;

