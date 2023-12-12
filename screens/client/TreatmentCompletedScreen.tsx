import { useNavigation } from '@react-navigation/native';
import DoctorTipView from 'components/client/home/DoctorTipView';
import RatingView from 'components/client/home/RatingView';
import TreatmentEnd from 'components/client/home/TreatmentEnd';
import React, { useState } from 'react';
import arrowBack from 'assets/icon/arrowBack.png';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { RNHeader } from 'components/common/Header';
import { colors } from 'designToken/colors';

const TreatmentCompletedScreen = () => {
  const [showViews, setShowViews] = useState('Treatmen_End');
  const navigation = useNavigation();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  return (
    <>
      {RNHeader(() => null, headerLeft)}
      <View style={styles.container}>
        {showViews === 'Treatmen_End' && (
          <TreatmentEnd
            onPress={() => {
              setShowViews('Rating_View');
            }}
          />
        )}
        {showViews === 'Rating_View' && (
          <RatingView
            onPress={() => {
              setShowViews('Tip_View');
            }}
          />
        )}
        {showViews === 'Tip_View' && <DoctorTipView onPress={() => {}} />}
      </View>
    </>
  );
};

export default TreatmentCompletedScreen;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
