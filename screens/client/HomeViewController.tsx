import { useNavigation } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import {
  deleteLocalData,
  getLocalData,
} from 'libs/datastorage/useLocalStorage';
import { Banner, search_provider } from 'libs/types/ProvierTypes';
import { ClientProfile } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Keyboard, Linking } from 'react-native';
import list from '../../strings/en.json';

interface Location {
  latitude: number;
  longitude: number;
}
const HomeViewController = () => {
  const navigation = useNavigation();
  const [bannerAds, setBannerAds] = useState<Banner[]>([]);
  const [isTouchStart, setIsTouchStart] = useState(true);
  const { getBannerAds, searchProviders, searchList } = ClientOrderServices();
  const [isVisible, setIsVisible] = useState(false);
  const [providersList, setProvidersList] = useState<search_provider[]>([]);
  const [searchedList, setSearchedList] = useState<any[]>([]);
  const [searchSpecialist, setSearchSpecialist] = useState<string>('');
  const [isDataNotFound, setIsDataNotFound] = useState<boolean>(true);
  const [location, setLocation] = useState<Location>();
  const [user, setUser] = useState<ClientProfile>();
  const {
    userProfile,
    setUserProfile,

    setCurrentStep,
    setUserId,
    setToken,
    setCurrentLocationOfUser,
    setOrderDetails,
    setRemainingTime,
    providerStatus,
    remainingTime,
    setProviderStatus,
    currentLocationOfUser,
  } = UseClientUserContext();
  const orderList = list.home.providerList;
  const [searchProviderList, setSearchProviderList] = useState<any>();

  //TODO: Vandana to get it from en.json. It's declared in Home under Provider List. Also create a type in this class and pass it here
  const providerList = orderList;

  useEffect(() => {
    getBannerAd();
    // check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((status) => {
    //   if (status === RESULTS.GRANTED) {
    //     // Location permission is already granted
    //     getLocation();
    //   } else {
    //     // Request location permission
    //     requestLocationPermission();
    //   }
    // });
    const user = getLocalData('USERPROFILE');
    // setUser(abc as ClientProfile);
    setUserProfile({
      ...userProfile,
      isPaymentAdded: (user as ClientProfile)?.isPaymentAdded,
    });
  }, []);
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //     },
  //     (error) => {
  //       console.log('Error getting location: ' + error.message);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //     },
  //   );
  // };

  // const requestLocationPermission = async () => {
  //   const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //   if (status === RESULTS.GRANTED) {
  //     // Location permission granted, get the location
  //     getLocation();
  //   } else {
  //     console.log('Location permission not granted');
  //     Alert.alert('Please turn on your permission');
  //   }
  // };

  const onPressBanner = () => Linking.openURL(bannerAds[0]?.destinationUrl);

  const getBannerAd = async () => {
    try {
      const res = await getBannerAds();
      console.log('banner ads', res);
      setBannerAds(res);
    } catch (error) {
      // Handle any errors that occurred during the execution of getBannerAds
      console.error('An error occurred:', error);
    }
  };
  const onSearchDone = async (item: string) => {
    console.log('searchSpecialist in the controller', searchSpecialist);
    const res = await searchProviders({
      name: item,
      latitude: '30.377305039494523',
      longitude: '76.78137416040587',
    });
    console.log('onSearchDone', res);
    if (res?.message) setIsDataNotFound(false);
    else setProvidersList(res);
  };
  const onChange = async (value: string) => {
    const res = await searchList({
      name: searchSpecialist?.toLowerCase(),
    });
    if (res.length > 0) {
      setSearchedList(res);
    }
    console.log('searchList', res);

    setSearchSpecialist(value);
    // setIsDataNotFound(true);
  };
  const onSearch = () => {
    setUserProfile(null);
    setOrderDetails(null);
    setProviderStatus(null);
    setRemainingTime(null);
    deleteLocalData();

    navigation.navigate(NavigationRoutes.IntroStack);
  };
  const onTouchStart = () => setIsTouchStart(false);
  const onBlur = () => setIsTouchStart(true);
  const onPressBack = () => {
    Keyboard.dismiss();
    setSearchSpecialist('');
    setIsTouchStart(true);
  };

  return {
    bannerAds,
    providerList,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    searchSpecialist,
    onChange,
    onPressBanner,
    providersList,
    onSearchDone,
    isDataNotFound,
    onSearch,
    userProfile,
    searchedList,
    searchProviderList,
    setSearchProviderList,
    isVisible,
    setIsVisible,
    providerStatus,
    remainingTime,
    setProviderStatus,
    currentLocationOfUser,
    setCurrentLocationOfUser,
  };
};

export default HomeViewController;
