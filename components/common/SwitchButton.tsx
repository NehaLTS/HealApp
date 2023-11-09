import { colors } from 'designToken/colors';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  Extrapolate,
  interpolateColor,
} from 'react-native-reanimated';

const InterpolateXInput = [0, 1];

const AnimatedSwitchButton = ({
  onChange,
  containerStyle,
  toggleOffColor = colors.secondary,
  toggleOnColor = colors.secondary,
  height = getHeight(55),
  width = getWidth(93),
}: any) => {
  const BUTTON_WIDTH = width;
  const BUTTON_HEIGHT = height;
  const [toggled, setToggled] = useState(false);
  const shareValue = useSharedValue(toggled ? 1 : 0);
  const containerScale = {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
  };
  const switchScale = {
    height: getHeight(28),
    width: getHeight(28),
  };

  const onChangeToggle = () => {
    setToggled(!toggled);
    onChange?.(!toggled);
  };

  const onPressSwitch = () => {
    if (shareValue.value === 0) {
      shareValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.5, 1),
      });
      onChangeToggle();
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.5, 1),
      });
      onChangeToggle();
    }
  };

  const switchAreaStyles = useAnimatedStyle(() => {
    return {
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
        toggleOffColor,
        toggleOnColor,
      ]),
    };
  });

  return (
    <TouchableOpacity
      onPress={onPressSwitch}
      activeOpacity={1}
      style={[styles.containerStyle, containerScale, containerStyle]}
    >
      <Animated.View
        style={[styles.switchButton, switchScale, switchAreaStyles]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondary,
    borderRadius: getWidth(50),
    borderWidth: getWidth(5),
  },
  switchButton: {
    position: 'absolute',
    left: getWidth(5),
    borderRadius: 50,
  },
});

export default AnimatedSwitchButton;
