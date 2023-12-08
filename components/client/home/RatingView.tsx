import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const RatingView = ({ onPress }: { onPress: () => void }) => {
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
        <Image
          source={require('../../../assets/icon/star.png')}
          style={styles.star}
        />
        <Text style={styles.rating} title={'4.8'} />
      </View>
      <View style={styles.container}>
        <Text
          title={'Elena Miron, family doctor'}
          style={styles.familyDoctorText}
        />
        <Text
          title={'How do you rate our doctor?'}
          style={{ fontSize: getHeight(18) }}
        />
        <View style={styles.image}>{renderStars(5)}</View>
      </View>

      <Text
        title={'Something else you want to tell us?'}
        style={styles.tellText}
      />
      <Input
        inputPlaceholder={'What did you like about our services?'}
        inputStyle={styles.description}
        placeholderTextColor={colors.grey}
        style={styles.placeholder}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={'Next'}
          isPrimary
          isSmall
          width={'30%'}
          style={{ alignSelf: 'center', marginBottom: 70 }}
        />
      </View>
    </>
  );
};

export default RatingView;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(dimens.imageM + dimens.marginL),
    height: getHeight(dimens.imageM + dimens.marginL),
    resizeMode: 'contain',
  },
  starIcon: {
    height: getHeight(dimens.marginL),
    width: getWidth(dimens.marginL),
  },
  container: {
    alignItems: 'center',
    gap: getHeight(8),
    marginTop: getHeight(dimens.marginL),
  },
  familyDoctorText: {
    fontSize: getHeight(20),
    fontFamily: fontFamily.medium,
  },
  image: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.imageS),
  },
  description: {
    height: '40%',
    backgroundColor: colors.white,
  },
  placeholder: {
    marginTop: getHeight(-80),
    paddingLeft: getWidth(dimens.marginS),
    fontFamily: fontFamily.regular,
    flex: 1,
  },
  rating: {
    position: 'absolute',
    bottom: getHeight(-11),
    right: getWidth(dimens.imageS + dimens.imageS),
    fontSize: getHeight(fontSize.textM),
  },
  star: {
    position: 'absolute',
    bottom: getHeight(dimens.marginS),
    right: getWidth(dimens.imageS + dimens.imageS),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  tellText: {
    textAlign: 'center',
    marginBottom: getHeight(dimens.marginS + 5),
    fontSize: getHeight(fontSize.textL),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
