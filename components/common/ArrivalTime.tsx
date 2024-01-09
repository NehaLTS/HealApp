import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Text from './Text';
import useUpdateEffect from 'libs/UseUpdateEffect';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

const ArrivalTime = ({ totalTime }: { totalTime: number }) => {
  const [time, setTime] = useState({ minutes: totalTime, seconds: 60 });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time.seconds === 0) {
        if (time.minutes === 0) {
          // Timer has reached zero
          clearTimeout(timer);
          return;
        } else {
          setTime({ minutes: time.minutes - 1, seconds: 59 });
        }
      } else {
        setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
      }
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <View style={styles.mainView}>
      <View style={styles.timeBoxView}>
        <Text
          title={`${time.minutes <= 0
            ? '00'
            : time.minutes < 10
              ? `${0}${time.minutes}`
              : time.minutes
            }`}
          style={styles.timeText}
        />
      </View>
      <View style={styles.timeBoxView}>
        <Text
          title={`${time.seconds == 0
            ? '00'
            : time.seconds < 10
              ? `${0}${time.seconds}`
              : time.seconds
            }`}
          style={styles.timeText}
        />
      </View>
    </View>
  );
};

export default ArrivalTime;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: getHeight(dimens.paddingXs + 2),
  },
  timeBoxView: {
    backgroundColor: colors.secondary,
    marginHorizontal: getWidth(2),
    padding: getHeight(6),
    borderRadius: getWidth(5),
    height: getHeight(dimens.marginL + 8),
    alignItems: 'center',
    width: getHeight(dimens.marginL + 8),
  },
  timeText: {
    color: colors.white,
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
});
