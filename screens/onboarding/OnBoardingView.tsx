import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../../components/common/Button';
import { colors } from '../../designToken/colors';
import { dimens } from '../../designToken/dimens';
import { fontSize } from '../../designToken/fontSizes';
import { fontWeight } from '../../designToken/fontWeights';
import logo from '../../assets/icon/logo.png';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import { useNavigation } from '@react-navigation/native';
import OnBoardingViewController from './OnBoardingViewController';
import Header from 'components/common/Header';

const OnBoardingView = () => {
  const { swiperRef, } = OnBoardingViewController()
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
//TODO: static strings changed after make this dynamic
  return (
    <View style={styles.slide}>
      <Swiper
        ref={swiperRef}
        autoplay={false}
        loop={false}
      >
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.innerContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>{'Welcome to Heal'}</Text>
          </View>
        ))}
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button title={'skip'} width={'25%'} onPress={()=> navigation.navigate('Intro')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  innerContainer: {
    backgroundColor: colors.white,
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingL,
    fontWeight: fontWeight.normal,
  },
  logo: {
    width: getWidth(dimens.imageL),
    height: getHeight(dimens.imageL),
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignSelf: "center"
  }

});

export default OnBoardingView;

