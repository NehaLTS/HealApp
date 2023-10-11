import { useNavigation } from '@react-navigation/native';
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

const OnBoardingView = () => {
  const {swiperRef, onPressSkip} = OnBoardingViewController()
  const navigation = useNavigation()
  const { t } = useTranslation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);

    //TODO: need to  create separate component
  const FadeInText = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false
        }
      ).start();
    }, [fadeAnim]);
    return (
      <Animated.Text
        style={[styles.text,{
          
          ...props.style,
          opacity: fadeAnim,
        }]}
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
        containerStyle={styles.containerStyle}>
        {[...Array(3)].map((_, index) => (
          <FadeInText key={index} style={{flex: 0.48 }}>
            {t("welcome_heal")}
           </FadeInText>
        ))}
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button
          title={t('skip')}
          width={"25%"}
          onPress={onPressSkip}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingL,
    fontWeight: fontWeight.normal,
    alignSelf: "center",
    fontFamily: "Montserrat-Regular"
  },
  logo: {
    width: getWidth(dimens.imageL),
    height: getHeight(dimens.imageL),
    alignSelf: "center",
    flex: 0.4,
  },
  buttonContainer: {
    flex: 0.12,
    paddingTop: getHeight(dimens.paddingXs)
  },
  activeDotStyle:{
    width: getWidth(dimens.sideMargin) 
  },
  containerStyle:{
    flex: 0.48
  }
});

export default OnBoardingView;
