import { CommonActions, useNavigation } from '@react-navigation/native';
import Header from 'components/common/Header';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import logo from '../../assets/icon/logo.png';
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
  const { setToken, setUserId, setProviderProfile, setCurrentStep } =
    UseProviderUserContext();
  const { t } = useTranslation();

  useEffect(() => {
    //  deleteLocalData();
    getLocalUserData();
  }, []);

  const getLocalUserData = async () => {
    const userResponse = await getLocalData('USER');
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

        const userData: ProviderProfile = (await getLocalData(
          'USERPROFILE',
        )) as ProviderProfile;

        console.log('useprofile is ', userData);

        const providerServices = getLocalData('PROVIDERSERVICES');

        console.log('provider services', providerServices);

        if (userData && userData.firstName) {
          if (!providerServices) {
            if (userData?.provider?.name.en === ('Doctor' || 'Nurse')) {
              setCurrentStep('services');
            } else {
              setCurrentStep('addServices');
            }
          }
        }

        setProviderProfile(userData as ProviderProfile);

        parseProviderResponse(userData, providerServices as ProviderServices);
      }
    }

    SplashScreen?.hide();
  };

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
        <Button title={t('skip')} width={'25%'} onPress={onPressSkip} />
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
    width: getWidth(330),
    height: getHeight(380),
    alignSelf: 'center',
    flex: 0.4,
  },
  buttonContainer: {
    flex: 0.12,
    paddingTop: getHeight(dimens.paddingXs),
  },
  activeDotStyle: {
    width: getWidth(dimens.marginM),
  },
  containerStyle: {
    flex: 0.48,
  },
});

export default OnBoardingView;
