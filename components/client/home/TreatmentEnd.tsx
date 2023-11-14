import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from 'components/common/Text';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { fontFamily } from 'designToken/fontFamily';

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
        </View>
        <View>
          <Text title={'Elena Miron,\nFamily doctor'} />
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

        <View style={styles.details}>
          <Text title={'Order summary'} style={styles.order} />
          <View style={styles.listContainer}>
            <View style={{ gap: 10 }}>
              <Text title={'Basic - 500 NIS'} style={styles.text} />
              <Text title={'Voltaren shot - 100 NIS'} style={styles.text} />
              <Text title={'Total - 600 NIS'} style={styles.text} />
            </View>
          </View>
        </View>
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
    width: getWidth(70),
    height: getHeight(130),
    resizeMode: 'contain',
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
    gap: getWidth(dimens.marginL),
    justifyContent: 'center',
    marginBottom: 50,
  },
  heartIcon: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
  },
  text: {
    fontSize: getWidth(fontSize.textM),
  },
  treatmentText: {
    textAlign: 'center',
    fontSize: getWidth(20),
    fontFamily: fontFamily.semiBold,
    marginVertical: getHeight(dimens.imageXs),
  },
  container: {
    flexDirection: 'row',
    gap: getWidth(dimens.marginS),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  doctorIconContainer: {
    position: 'relative',
  },
  order: {
    fontSize: getWidth(20),
  },
  details: {
    alignItems: 'center',
    gap: getWidth(5),
    justifyContent: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.marginS),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
