import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from 'components/common/Text';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { fontFamily } from 'designToken/fontFamily';
import { colors } from 'designToken/colors';
import Button from 'components/common/Button';
import { Order } from 'libs/types/OrderTypes';

const TreatmentEnd = ({
  onPress,
  currentOrder,
}: {
  onPress: () => void;
  currentOrder: Order;
}) => {
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
          <Text
            style={styles.rating}
            title={currentOrder?.providerDetails?.providerRating}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text
            title={currentOrder?.providerDetails?.providerName}
            style={{
              fontSize: getHeight(fontSize.textXl),
              width: '70%',
              flexWrap: 'wrap',
            }}
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

      <View style={styles.Container}>
        <Image
          source={require('../../../assets/icon/cardboard.png')}
          style={styles.doctorCard}
        />

        <View
          style={{
            gap: 10,
            marginLeft: getWidth(20),
          }}
        >
          <Text title={'Order summary'} style={styles.order} />
          <View style={{ gap: 8 }}>
            {currentOrder?.orderServices.map((item, index) => (
              <Text
                key={index}
                title={`${item?.serviceName} - ${item?.servicePrice}`}
                style={styles.text}
              />
            ))}
            <View style={{ flexDirection: 'row' }}>
              <Text title={'Total - '} style={styles.total} />
              <Text title={currentOrder?.orderPrice} style={styles.text} />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.7,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          title={'Approve payment'}
          isPrimary
          isSmall
          style={{ alignSelf: 'center' }}
          width={'80%'}
          onPress={onPress}
        />
      </View>
    </>
  );
};

export default TreatmentEnd;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(120),
    resizeMode: 'contain',
  },
  doctorCard: {
    width: getWidth(100),
    height: getHeight(110),
    resizeMode: 'contain',
    // marginLeft: getWidth(25),
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(dimens.marginS),
    right: getHeight(dimens.marginS + 8),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  imageContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.imageXs),
    justifyContent: 'center',
    marginBottom: getHeight(dimens.imageS + dimens.marginL),
  },
  Container: {
    flexDirection: 'row',
    gap: getHeight(dimens.imageXs),
    justifyContent: 'center',
    marginBottom: getHeight(dimens.imageS + dimens.marginL),
  },
  heartIcon: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
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
    gap: getWidth(dimens.marginS),
    marginTop: 25,
  },
  doctorIconContainer: {
    position: 'relative',
    width: '45%',
    alignItems: 'center',
    marginLeft: getHeight(20),
  },
  order: {
    fontSize: getHeight(20),
  },
  rating: {
    position: 'absolute',
    bottom: getHeight(-11),
    right: getHeight(dimens.paddingXs),
    fontSize: getHeight(fontSize.textM),
    color: colors.secondary,
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: getHeight(fontSize.textM),
  },
});
