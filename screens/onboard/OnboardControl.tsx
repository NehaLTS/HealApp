import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import OnboardView from './OnboadrView';
import Swiper from 'react-native-swiper';

const OnboardControl = () => {
  const swipeRef = useRef<Swiper | null>(null); // Declare the type for swiperRef
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Declare the type for currentIndex as number

  useEffect(() => {
    const interval = setInterval(() => {
      if (swipeRef.current) {
        const nextIndex = (currentIndex + 1) % 3;
        swipeRef.current.scrollBy(nextIndex - currentIndex, true);
        setCurrentIndex(nextIndex);
      }
    }, 3000); // 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return <OnboardView currentIndex={currentIndex} />;
};
export default OnboardControl

const styles = StyleSheet.create({})
