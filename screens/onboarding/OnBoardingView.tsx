import { CommonActions, useNavigation } from '@react-navigation/native';
import Header from 'components/common/Header';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import logo from '../../assets/icon/healLogo.png';
import Button from '../../components/common/Button';
import { colors } from '../../designToken/colors';
import { dimens } from '../../designToken/dimens';
import { fontSize } from '../../designToken/fontSizes';
import { fontWeight } from '../../designToken/fontWeights';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import OnBoardingViewController from './OnBoardingViewController';
import SplashScreen from 'react-native-splash-screen';
import {
  deleteLocalData,
  getLocalData,
} from 'libs/datastorage/useLocalStorage';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderProfile, ProviderServices } from 'libs/types/UserType';

const OnBoardingView = () => {
  const {
    swiperRef,
    onPressSkip,
    parseClientResponse,
    parseProviderResponse,
    setDefaultLanguage,
  } = OnBoardingViewController();
  const navigation = useNavigation();

  const { t } = useTranslation();
  const userResponse = getLocalData('USER');
  const userData: ProviderProfile = getLocalData(
    'USERPROFILE',
  ) as ProviderProfile;
  const providerServices = getLocalData('PROVIDERSERVICES');
  const { setToken, setUserId, setProviderProfile, setCurrentStep } =
    UseProviderUserContext();

  const getLocalUserData = () => {
    console.log('token is ', userResponse?.token);

    const userLanguage = userResponse?.user?.language ?? 'en';
    console.log('user language is ', userLanguage);

    setDefaultLanguage(userLanguage);

    //if token is there, user is LoggedIn
    if (userResponse?.token != null) {
      if (userResponse?.isClient) parseClientResponse(userResponse);
      else {
        setToken(userResponse.token);

        //TODO : GURPREET/SAGAR to check HARDCODED ID SET HERE
        if (userResponse?.userId) {
          setUserId(userResponse?.userId);
        } else {
          setUserId('4');
        }

        console.log('useprofile is', userData);

        console.log('provider services', providerServices?.['0']);
        if (userData && userData.firstName) {
          if (!providerServices?.['0']) {
            if (userData?.provider?.name?.en === ('Doctor' || 'Nurse')) {
              setCurrentStep('services');
            } else {
              setCurrentStep('addServices');
            }
          }
        }

        setProviderProfile(userData as ProviderProfile);

        parseProviderResponse(userData, providerServices?.['0']);
      }
    }

    SplashScreen?.hide();
  };
  useEffect(() => {
    // deleteLocalData();
    getLocalUserData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);

  //TODO: need to  create separate component
  const FadeInText = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, [fadeAnim]);
    return (
      <Animated.Text
        style={[
          styles.text,
          {
            ...props.style,
            opacity: fadeAnim,
          },
        ]}
      >
        {props.children}
      </Animated.Text>
    );
  };
  return (
    <View style={styles.slide}>
      <Image source={logo} style={styles.logo} />
      <Swiper
        ref={swiperRef}
        activeDotStyle={styles.activeDotStyle}
        activeDotColor={colors.primary}
        containerStyle={styles.containerStyle}
      >
        {[...Array(3)].map((_, index) => (
          <FadeInText key={index} style={{ flex: 0.48 }}>
            {t('welcome_heal')}
          </FadeInText>
        ))}
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button title={t('skip')} width={'24%'} onPress={onPressSkip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingL,
    fontWeight: fontWeight.normal,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  logo: {
    // width: getWidth(300),
    // height: getHeight(380),
    alignSelf: 'center',
    flex: 0.3,
    resizeMode: 'center',
    marginBottom: getHeight(20),
  },
  buttonContainer: {
    flex: 0.12,
    paddingTop: getHeight(dimens.paddingXs),
  },
  activeDotStyle: {
    width: getHeight(dimens.marginM),
  },
  containerStyle: {
    flex: 0.48,
  },
});

export default OnBoardingView;
