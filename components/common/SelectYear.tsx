import arrowNext from 'assets/icon/arrowNextPri.png';
import calendar from 'assets/icon/calendar.png';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const SelectYear = ({
  setYear,
}: {
  setYear: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<number>(currentYear);

  const onPressBack = () => {
    setSelectedYear((prev) => prev - 1);
    setYear((prev: number) => prev - 1);
  };
  const onPressNext = () => {
    setSelectedYear((prev) => prev + 1);
    setYear((prev: number) => prev + 1);
  };

  return (
    <View style={styles.yearPickerContainer}>
      <View style={styles.yearContainer}>
        <Image source={calendar} style={styles.calendar} />
        <Text style={styles.yearText} title={selectedYear} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.arrowContainer, styles.arrowBackContainer]}
          onPress={onPressBack}
        >
          <Image source={arrowNext} style={styles.backImage} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.arrowContainer, styles.arrowNextContainer]}
          onPress={onPressNext}
        >
          <Image source={arrowNext} style={styles.nextImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectYear;

const styles = StyleSheet.create({
  calendar: {
    width: getWidth(dimens.paddingL - dimens.borderBold),
    height: getHeight(dimens.paddingL - dimens.borderBold),
    resizeMode: 'center',
  },
  yearText: {},
  backImage: {
    width: getWidth(8),
    height: getHeight(13),
    resizeMode: 'center',
    transform: [{ rotate: '180deg' }],
  },
  nextImage: {
    width: getWidth(8),
    height: getHeight(13),
    resizeMode: 'center',
  },
  yearPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getHeight(dimens.sideMargin),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.primary,
    borderRadius: getHeight(dimens.marginS),
    justifyContent: 'space-between',
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: getHeight(dimens.sideMargin),
  },
  arrowContainer: {
    paddingVertical: getHeight(dimens.sideMargin + dimens.borderBold),
    paddingHorizontal: getHeight(dimens.marginM),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowBackContainer: {
    borderLeftWidth: getWidth(dimens.borderThin),
    borderColor: colors.primary,
    borderRadius: getHeight(dimens.marginS),
  },
  arrowNextContainer: {
    borderLeftWidth: getWidth(dimens.borderThin),
    borderColor: colors.primary,
  },
});
