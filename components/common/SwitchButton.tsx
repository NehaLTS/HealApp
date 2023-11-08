import { colors } from 'designToken/colors';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedSwitchButton = ({
  onChange,
}: {
  onChange: (e: boolean) => void;
}) => {
  const InterpolateXInput = [0, 1];
  const [toggled, setToggled] = useState(false);
  const shareValue = useSharedValue(toggled ? 1 : 0);

  const onChangeToggle = () => {
    setToggled(!toggled);
    onChange?.(!toggled);
  };

  const onPressSwitch = () => {
    shareValue.value = withTiming(toggled ? 0 : 1, {
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.5, 1),
    });
    onChangeToggle();
  };

  const switchAreaStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shareValue.value,
          InterpolateXInput,
          [1, 44],
          Extrapolate.CLAMP,
        ),
      },
    ],
    backgroundColor: interpolateColor(shareValue.value, InterpolateXInput, [
      colors.secondary, // toggle Off Color
      colors.secondary, // toggle On Color
    ]),
  }));

  return (
    <TouchableOpacity
      onPress={onPressSwitch}
      activeOpacity={1}
      style={styles.container}
    >
      <Animated.View style={[styles.switchButton, switchAreaStyles]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderRadius: getWidth(50),
    borderWidth: getWidth(5),
    width: getHeight(93),
    height: getHeight(55),
  },
  switchButton: {
    position: 'absolute',
    left: getWidth(5),
    borderRadius: 50,
    width: getWidth(28),
    height: getWidth(28),
  },
});

export default AnimatedSwitchButton;
