import { CommonActions, useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useRef, useState, useMemo } from 'react';
import {
  ClientProfile,
  ProviderProfile,
  ProviderServices,
} from 'libs/types/UserType';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import { checkPermission } from 'libs/Notification';
import LocalizationController from 'components/common/LocalizationController';

const OnBoardingViewController = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const { setUserProfile, setUserId, setToken } = UseClientUserContext();
  const { setAppLanguage } = LocalizationController();

  useMemo(() => {
    checkPermission();
  }, []);

 const setDefaultLanguage = (languageCode:string) =>  setAppLanguage(languageCode)

  const onPressSkip = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.Intro }],
      }),
    );
  };

  const parseClientResponse = async (userResponse: any) => {
    setToken(userResponse.token);
    setUserId(userResponse?.userId);
    const userData: ClientProfile = (await getLocalData(
      'USERPROFILE',
    )) as ClientProfile;

    console.log('useprofile is ', userData);

    setUserProfile(userData as ClientProfile);

    //Handle onboard navigation for the logged In User
    if (!userData.firstName) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NavigationRoutes.ClientStack,
              params: { screen: NavigationRoutes.OnboardDetails },
            },
          ],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NavigationRoutes.ClientStack,
              params: { screen: NavigationRoutes.ClientHome },
            },
          ],
        }),
      );
    }
  };

  const parseProviderResponse = async (
    userData: ProviderProfile,
    providerServices: ProviderServices,
  ) => {
    //Handle onboard navigation for the logged In User
    if (!userData.firstName) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: NavigationRoutes.ProviderStack,
              params: { screen: NavigationRoutes.ProviderOnboardDetails },
            },
          ],
        }),
      );
    } else {
      if (providerServices) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: NavigationRoutes.ProviderStack,
                params: { screen: NavigationRoutes.ProviderHome },
              },
            ],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: NavigationRoutes.ProviderStack,
                params: { screen: NavigationRoutes.ProviderOnboardDetails },
              },
            ],
          }),
        );
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const nextIndex = (currentIndex + 1) % 3;
        swiperRef?.current?.scrollBy?.(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 5000); // 5 seconds
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return { swiperRef, onPressSkip, parseClientResponse, parseProviderResponse, setDefaultLanguage };
};

export default OnBoardingViewController;
