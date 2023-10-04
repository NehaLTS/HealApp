import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../../components/common/Button';
import { colors } from '../../designToken/colors';
import { dimens } from '../../designToken/dimens';
import { fontSize } from '../../designToken/fontSizes';
import { fontWeight } from '../../designToken/fontWeights';
import logo from '../../assets/icon/logo.png';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import OnBoardingController from './OnBoardingController';

const OnBoardingView = () => {
  const { swiperRef, } = OnBoardingController()

  return (
    <View style={styles.slide}>
      <Swiper
        ref={swiperRef}
        autoplay={false}
        loop={false}
      >
        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.innercontainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>{'Welcome to Heal'}</Text> {/* TODO: changed after make this dynamic */}
          </View>
        ))}
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button title={'skip'} />
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
  innercontainer: {
    backgroundColor: colors.white,
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingLg,
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
