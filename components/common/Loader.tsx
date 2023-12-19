import { colors } from 'designToken/colors';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import RNModal from './Modal';
const Loader = ({ isSmall }: { isSmall?: boolean }) => {
  return (
    <>
      {isSmall ? (
        <ActivityIndicator
          style={styles.loading}
          size={'large'}
          color={colors.primary}
        />
      ) : (
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
      )}
    </>
  );
};
export default Loader;
export const LoaderLarge = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 6500,
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
        bottom: '18%',
        zIndex: 1,
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        source={require('assets/icon/circle.png')}
        style={{
          width: getWidth(280),
          height: getHeight(280),
          resizeMode: 'center',
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

export const DotLoader = () => {
  const [dot1Animation] = useState(new Animated.Value(0));
  const [dot2Animation] = useState(new Animated.Value(0));
  const [dot3Animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const animateDots = () => {
      const timingConfig = {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      };

      const createAnimation = (animation, delay) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animation, { ...timingConfig, toValue: 1 }),
            Animated.timing(animation, { ...timingConfig, toValue: 0 }),
          ]),
        );
      };

      const dot1 = createAnimation(dot1Animation, 0);
      const dot2 = createAnimation(dot2Animation, 200);
      const dot3 = createAnimation(dot3Animation, 400);

      Animated.parallel([dot1, dot2, dot3]).start();
    };

    animateDots();
  }, [dot1Animation, dot2Animation, dot3Animation]);

  const dotStyle = (animation) => {
    const dotSize = 10;
    return {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: colors.primary,
      marginHorizontal: 5,
      transform: [
        {
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
          }),
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dotStyle(dot1Animation)]} />
      <Animated.View style={[styles.dot, dotStyle(dot2Animation)]} />
      <Animated.View style={[styles.dot, dotStyle(dot3Animation)]} />
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  dot: {
    width: getWidth(10),
    height: getWidth(10),
    borderRadius: getHeight(10),
    backgroundColor: colors.primary,
  },
});
