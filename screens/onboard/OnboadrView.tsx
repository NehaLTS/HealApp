import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import logo from '../../designToken/svg/logo.png';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import { fontSize } from '../../designToken/fontSizes';
import { colors } from '../../designToken/colors';

const slides = [
  { backgroundColor: colors.white, text: 'Welcome to Heal', circleText: '1' },
  { backgroundColor: colors.white, text: 'Welcome to Heal', circleText: '2' },
  { backgroundColor: colors.white, text: 'Welcome to Heal', circleText: '3' },
];

const OnboardView = () => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        const nextIndex = (currentIndex + 1) % slides.length;
        swiperRef.current.scrollBy(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 3000); // 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <Swiper
      ref={swiperRef}
      style={styles.wrapper}
      autoplay={false}
      loop={false}
    >
      {slides.map((slide, index) => (
        <View key={index} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.text}>{slide.text}</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{slide.circleText}</Text>
          </View>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingLg,
    fontWeight: 'bold',
  },
  logo: {
    width: getWidth(247),
    height: getHeight(252),
    alignSelf: 'center',
  },
  circle: {
    width: getWidth(60),
    height: getHeight(60),
    backgroundColor: colors.primary,
    borderRadius: getHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '15%',
  },
  circleText: {
    fontSize: fontSize.headingLg,
    color: colors.white,
  },
});

export default OnboardView;
