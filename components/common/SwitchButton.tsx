import { colors } from 'designToken/colors';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ToggleButton = ({
  onChange,
  isDisabled,
  defaultValue,
}: {
  onChange: (i: boolean) => void;
  isDisabled: boolean;
  defaultValue: boolean;
}) => {
  const [isEnabled, setIsEnabled] = useState(defaultValue ?? false);
  const toggleValue = useSharedValue(defaultValue ? 1 : 0);

  useEffect(() => {
    setIsEnabled(defaultValue ?? false);
    toggleValue.value = withTiming(defaultValue ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [defaultValue, toggleValue]);

  const toggleSwitch = useCallback(() => {
    if (!isDisabled) {
      setIsEnabled((prevState) => !prevState);
    }
    onChange?.(!isEnabled);
    toggleValue.value = withTiming(isEnabled ? 0 : 1, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isEnabled, isDisabled, onChange, toggleValue]);

  const handlePosition = useAnimatedStyle(() => {
    const translateX = interpolate(
      toggleValue.value,
      [0, 1],
      [0, 35],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={toggleSwitch}
      style={styles.button}
    >
      <Animated.View style={[styles.handle, handlePosition]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: getWidth(92),
    height: getHeight(55),
    borderRadius: getHeight(50),
    borderWidth: getWidth(5),
    borderColor: colors.secondary,
    justifyContent: 'center',
    paddingHorizontal: getWidth(10),
  },
  handle: {
    width: getWidth(28),
    height: getWidth(28),
    borderRadius: getWidth(20),
    backgroundColor: colors.secondary,
  },
});

export default ToggleButton;
