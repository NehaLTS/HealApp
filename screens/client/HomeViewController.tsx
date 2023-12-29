import { useNavigation } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import { Banner, search_provider } from 'libs/types/ProvierTypes';
import { ClientProfile } from 'libs/types/UserType';
import { useCurrentAddress } from 'libs/useCurrentAddress';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  Linking,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import enList from '../../strings/en.json';
import arList from '../../strings/ar.json';
import heList from '../../strings/he.json';
import ruList from '../../strings/ru.json';
import { useTranslation } from 'react-i18next';

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
  const [user, setUser] = useState<ClientProfile>();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const {
    userProfile,
    setUserProfile,

    setCurrentStep,
    setUserId,
    setToken,
    setUserLocation,
    setOrderDetails,
    setRemainingTime,
    remainingTime,
    userLocation,
  } = UseClientUserContext();
  const { i18n } = useTranslation();

  let providerList;
  switch (i18n.language) {
    case 'ar':
      providerList = arList.home.providerList;
      break;
    case 'he':
      providerList = heList.home.providerList;
      break;
    case 'ru':
      providerList = ruList.home.providerList;
      break;
    default:
      providerList = enList.home.providerList;
      break;
  }

  const [searchProviderList, setSearchProviderList] = useState<any>();
  const locationData = getLocalData('LOCATION');

  const { fetchCurrentAddress } = useCurrentAddress();
  const location = async () => {
    await fetchCurrentAddress()
      .then((address: any) => {
        setUserLocation((prevState) => ({
          ...prevState,
          currentLocation: {
            latitude: address.latitude,
            longitude: address.longitude,
            address: address.address ?? '',
          },
          onboardingLocation: prevState?.onboardingLocation,
        }));
        setLocalData('LOCATION', {
          currentLocation: {
            latitude: address.latitude,
            longitude: address.longitude,
            address: address.address ?? '',
          },
        });
        Sentry.captureMessage(
          `Client Flow userLocation FOR:-${
            userProfile?.firstName ?? ''
          }---- ${address.toString()}`,
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    setUserLocation({ ...locationData });
    location();
    getBannerAd();
    console.log('SetCuree', userLocation);
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
      // console.log('banner ads', res);
      setBannerAds(res);
    } catch (error) {
      // Handle any errors that occurred during the execution of getBannerAds
      console.error('An error occurred:', error);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      setIsDataNotFound(true);
      setProvidersList([]);
    }
  };
  const onChange = async (value: string) => {
    setSearchSpecialist(value);
    const res = await searchList({
      name: value?.toLowerCase(),
    });
    console.log('data on search response', JSON.stringify(res));
    if (res.length > 0) {
      Sentry.captureMessage(
        `Client Flow ON CHANGE SEARCH API  FOR:-${
          userProfile?.firstName ?? ''
        }---- ${res}`,
      );
      console.log('search result', res);

      setSearchedList(res);
    } else {
      setSearchedList([]);
    }
  };

  const onSearchDone = async (item: string) => {
    const res = await searchProviders({
      name: item?.toLowerCase(),
      latitude: '30.377305039494523',
      longitude: '76.78137416040587',
    });
    console.log('onSearchDone', res);
    if (res?.message) {
      setIsDataNotFound(false);
      Sentry.captureMessage(
        `On Search response gave Message' for:-${
          userProfile?.firstName
        }---- ${JSON.stringify(res?.message)}`,
      );
    } else {
      console.log('search response', res);
      Sentry.captureMessage(
        `Search response' for:-${userProfile?.firstName}---- ${JSON.stringify(
          res,
        )}`,
      );
      setProvidersList(res);
    }
  };

  const onLogoutButtonPress = () => {
    setUserProfile({} as ClientProfile);
    deleteLocalData();
    setTimeout(() => {
      navigation.navigate(NavigationRoutes.IntroStack);
      if (dropdownVisible) {
        setDropdownVisible(false);
      }
    }, 2000);
  };

  const onTouchStart = () => setIsTouchStart(false);
  const onBlur = () => {
    // if (providersList?.length === 0) {
    //   setIsTouchStart(true);
    // }
    Keyboard.dismiss();
  };
  const onPressBack = () => {
    Keyboard.dismiss();
    setProvidersList([]);
    setSearchSpecialist('');
    setIsTouchStart(true);
  };

  return {
    providerList,
    bannerAds,
    isTouchStart,
    onPressBack,
    onTouchStart,
    onBlur,
    onChange,
    handleKeyPress,
    searchSpecialist,
    onPressBanner,
    providersList,
    onSearchDone,
    isDataNotFound,
    onLogoutButtonPress,
    searchedList,
    isVisible,
    setIsVisible,
    remainingTime,
    userLocation,
    setSearchProviderList,
    dropdownVisible,
    setDropdownVisible,
    setSearchSpecialist,
  };
};

export default HomeViewController;
