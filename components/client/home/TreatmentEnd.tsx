import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from 'components/common/Text';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { fontFamily } from 'designToken/fontFamily';
import { colors } from 'designToken/colors';
import Button from 'components/common/Button';

const TreatmentEnd = () => {
  return (
    <>
      <Text title={'Treatment is ended'} style={styles.treatmentText} />
      <View style={styles.imageContainer}>
        <View style={styles.doctorIconContainer}>
          <Image
            source={require('../../../assets/icon/doctorIcon.png')}
            style={styles.doctorIcon}
          />
          <Image
            source={require('../../../assets/icon/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.rating} title={'4.8'} />
        </View>
        <View>
          <Text
            title={'Elena Miron,\nFamily doctor'}
            style={{ fontSize: getHeight(fontSize.textXl) }}
          />
          <View style={styles.container}>
            <Image
              source={require('../../../assets/icon/heart.png')}
              style={styles.heartIcon}
            />
            <Text title={'Add to favourites'} style={styles.text} />
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/icon/cardboard.png')}
          style={styles.doctorCard}
        />

        <View style={{ gap: 10 }}>
          <Text title={'Order summary'} style={styles.order} />
          <View style={{ gap: 8 }}>
            <Text title={'Basic - 500 NIS'} style={styles.text} />
            <Text title={'Voltaren shot - 100 NIS'} style={styles.text} />
            <View style={{ flexDirection: 'row' }}>
              <Text title={'Total'} style={styles.total} />
              <Text title={' - 600 NIS'} style={styles.text} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.8,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          title={'Approve payment'}
          isPrimary
          isSmall
          style={{ alignSelf: 'center' }}
          width={'80%'}
        />
      </View>
    </>
  );
};

export default TreatmentEnd;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(110),
    resizeMode: 'contain',
  },
  doctorCard: {
    width: getWidth(100),
    height: getHeight(110),
    resizeMode: 'contain',
    marginLeft: getWidth(25),
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(dimens.marginS),
    right: getHeight(dimens.marginS),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  imageContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.imageXs),
    justifyContent: 'center',
    marginBottom: getHeight(dimens.imageS + dimens.marginL),
  },
  heartIcon: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'center',
  },
  text: {
    fontSize: getHeight(fontSize.textM),
  },
  treatmentText: {
    textAlign: 'center',
    fontSize: getHeight(20),
    fontFamily: fontFamily.semiBold,
    marginVertical: getHeight(dimens.imageXs),
  },
  container: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  doctorIconContainer: {
    position: 'relative',
  },
  order: {
    fontSize: getHeight(20),
  },
  rating: {
    position: 'absolute',
    bottom: getHeight(-11),
    right: getHeight(dimens.paddingXs + 2),
    fontSize: getHeight(fontSize.textM),
    color: colors.secondary,
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: getWidth(fontSize.textM),
  },
});
