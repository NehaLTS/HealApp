import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import logo from '../../designToken/svg/logo.png';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import { fontSize } from '../../designToken/fontSizes';
import { colors } from '../../designToken/colors';
import { fontWeight } from '../../designToken/fontWeights';
import { dimens } from '../../designToken/dimens';
import Button from '../../components/common/Button';
import OnBoardingController from './OnBoardingController';

const slides = [
  { text: 'Welcome to Heal', numbers: '1' },
  { text: 'Welcome to Heal', numbers: '2' },
  { text: 'Welcome to Heal', numbers: '3' },
];

const OnBoardingView = () => {
  const {swiperRef, }=OnBoardingController()

  return (
    <View style={styles.slide}>
      <Swiper
        ref={swiperRef}
        autoplay={false}
        loop={false}
      >
        {slides.map((innercontainer, index) => (
          <View key={index} style={styles.innercontainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>{innercontainer.text}</Text>

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
  buttonContainer:{
     flex: 0.15,
      justifyContent: "center", 
      alignSelf: "center" 
  }

});

export default OnBoardingView;
