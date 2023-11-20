import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import RNModal from './Modal';
import { colors } from 'designToken/colors';
import { getHeight, getWidth } from 'libs/StyleHelper';
const Loader = () => {
  return (
    <RNModal
      isVisible
      backdropOpacity={0.2}
      animationIn={'fadeIn'}
      animationInTiming={5}
    >
      <ActivityIndicator
        style={styles.loading}
        size={'large'}
        color={colors.primary}
      />
    </RNModal>
  );
};
export default Loader;
export const LoaderLarge = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View
      style={{
        position: 'absolute',
        top: '12%',
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        source={require('assets/icon/circle.png')}
        style={{
          width: getWidth(280),
          height: getWidth(280),
          resizeMode: 'center',
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
  },
});