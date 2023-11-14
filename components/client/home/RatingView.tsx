import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Text from 'components/common/Text';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import Input from 'components/common/Input';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';

const RatingView = () => {
  const renderStars = (numStars: number) => {
    const stars = Array.from({ length: numStars }).map((_, index) => (
      <Image
        key={index}
        source={require('../../../assets/icon/ratingStar.png')}
        style={styles.starIcon}
      />
    ));
    return stars;
  };

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/icon/doctorIcon.png')}
          style={styles.doctorIcon}
        />
      </View>
      <View style={styles.container}>
        <Text
          title={'Elena Miron, family doctor'}
          style={styles.familyDoctorText}
        />
        <Text
          title={'How do you rate our doctor?'}
          style={{ fontSize: getWidth(18) }}
        />
        <View style={styles.image}>{renderStars(5)}</View>
      </View>

      <Text
        title={'Something else you want to tell us?'}
        style={{
          textAlign: 'center',
          marginBottom: 20,
          fontSize: fontSize.textL,
        }}
      />
      <Input
        inputPlaceholder={'What did you like about our services?'}
        inputStyle={styles.description}
        placeholderTextColor={colors.grey}
        style={styles.placeholder}
        // placeholderStyle={styles.placeholder}
        numberOfLines={1}
      />
    </>
  );
};

export default RatingView;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(110),
    resizeMode: 'contain',
  },
  starIcon: {
    height: getHeight(dimens.marginL),
    width: getWidth(dimens.marginL),
  },
  container: {
    alignItems: 'center',
    gap: getHeight(10),
    marginTop: getHeight(20),
  },
  familyDoctorText: {
    fontSize: getWidth(20),
    fontFamily: fontFamily.medium,
  },
  image: {
    flexDirection: 'row',
    gap: getHeight(20),
    marginTop: getHeight(20),
    marginBottom: getHeight(50),
  },
  description: {
    height: '45%',
    backgroundColor: colors.white,
  },

  placeholder: {
    marginTop: getHeight(-80),
    paddingLeft: 15,
  },
});
