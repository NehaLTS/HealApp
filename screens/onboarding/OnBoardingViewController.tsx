import { CommonActions, useNavigation } from '@react-navigation/native';
import LocalizationController from 'components/common/LocalizationController';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { checkPermission } from 'libs/Notification';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import {
  ClientProfile,
  ProviderProfile,
  ProviderServices,
} from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

const OnBoardingViewController = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const { setUserProfile, setUserId, setToken } = UseClientUserContext();
  const { setAppLanguage } = LocalizationController();

  useMemo(() => {
    checkPermission();
  }, []);

  const setDefaultLanguage = (languageCode: string) =>
    setAppLanguage(languageCode);

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
    if (userData && userData.firstName) {
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
    } else {
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
    }
  };

  const parseProviderResponse = async (
    userData: ProviderProfile,
    providerServices: any,
  ) => {
    //Handle onboard navigation for the logged In User
    if (userData && userData.firstName) {
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

  return {
    swiperRef,
    onPressSkip,
    parseClientResponse,
    parseProviderResponse,
    setDefaultLanguage,
  };
};

export default OnBoardingViewController;
