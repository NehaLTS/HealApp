import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../../components/common/Button';
import { colors } from '../../designToken/colors';
import { dimens } from '../../designToken/dimens';
import { fontSize } from '../../designToken/fontSizes';
import { fontWeight } from '../../designToken/fontWeights';
import logo from '../../assets/icon/logo.png';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import { useNavigation } from '@react-navigation/native';
import OnBoardingViewController from './OnBoardingViewController';
import Header from 'components/common/Header';
import { useTranslation } from 'react-i18next';

const OnBoardingView = () => {
  const { swiperRef, onPressSkip} = OnBoardingViewController()
  const navigation = useNavigation()
  const { t } = useTranslation()
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
  //TODO: static strings changed after make this dynamic
  return (
    <View style={styles.slide}>
      <View style={styles.innerContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Swiper
        ref={swiperRef}
        activeDotStyle={styles.activeDotStyle}
        activeDotColor={colors.primary}
        autoplayTimeout={10}
        containerStyle={styles.containerStyle}>
        {[...Array(3)].map((_, index) => (
          <Text key={index} style={styles.text}>
            {t('welcome_heal')}
          </Text>
        ))}
      </Swiper>
      <View style={styles.buttonContainer}>
        <Button
          title={t('skip')}
          width={"25%"}
          onPress={onPressSkip}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  innerContainer: {
    backgroundColor: colors.white,
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.black,
    fontSize: fontSize.headingL,
    fontWeight: fontWeight.normal,
    alignSelf: "center",
  },
  logo: {
    width: getWidth(dimens.imageL),
    height: getHeight(dimens.imageL),
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 0.12
  },
  activeDotStyle:{
    width: getWidth(dimens.sideMargin) 
  },
  containerStyle:{
    flex: 0.48 
  }
});

export default OnBoardingView;
