import Button from 'components/common/Button';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { paymentsendToApi } from 'libs/ClientOrderPayment';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { Order } from 'libs/types/OrderTypes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import unLike from '../../../assets/icon/likeOff.png';
import like from '../../../assets/icon/likeOn.png';

const TreatmentEnd = ({
  onPress,
  currentOrder,
}: {
  onPress: () => void;
  currentOrder: Order;
}) => {
  const { t } = useTranslation();
  const [likeProfile, setLikeProfile] = React.useState(false);
  const onLikeProfile = () => {
    setLikeProfile(!likeProfile);
  };

  const payAbleAmount = () => {
    let totalAmount = 0
    let totalCost = currentOrder?.orderServices.map((item, index) => {
      totalAmount = totalAmount + parseFloat(item.servicePrice)
      console.log("approvePAymer", totalAmount)
      return totalAmount
    })
    const lastIndex = totalCost.length - 1;
    const lastValue = totalCost[lastIndex];

    const shotAmounts = lastValue - 500
    const amount = paymentsendToApi(500, shotAmounts)
    return amount
  }


  return (
    <>
      <Text title={t('treatment_end')} style={styles.treatmentText} />
      <View style={styles.imageContainer}>
        <View style={styles.doctorIconContainer}>
          <Image
            source={
              currentOrder?.providerDetails?.providerProfilePicture
                ? { uri: currentOrder?.providerDetails?.providerProfilePicture }
                : require('../../../assets/icon/doctorIcon.png')
            }
            style={styles.doctorIcon}
          />
          <View style={styles.providerRating}>
            <Image
              source={require('../../../assets/icon/star.png')}
              style={styles.starIcon}
            />
            <Text
              style={styles.rating}
              title={currentOrder?.providerDetails?.providerRating}
            />
          </View>
        </View>
        <View>
          <Text
            title={currentOrder?.providerDetails?.providerName}
            style={{
              fontSize: getHeight(fontSize.textXl),
              flexWrap: 'wrap',
              textAlign: 'left',
              minWidth: '50%',
              width: '90%',
            }}
          />
          <View style={styles.container}>
            <TouchableOpacity onPress={onLikeProfile}>
              <Image
                source={likeProfile ? like : unLike}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
            <Text title={t('add_favourites')} style={styles.text} />
          </View>
        </View>
      </View>
      <View style={styles.Container}>
        <Image
          source={require('../../../assets/icon/cardboard.png')}
          style={styles.doctorCard}
        />
        <View style={{ gap: getWidth(10) }}>
          <Text title={t('summary')} style={styles.order} />
          <View style={{ gap: 8 }}>
            {currentOrder?.orderServices.map((item, index) => (
              <Text
                key={index}
                title={`${item?.serviceName} - ${item?.servicePrice}`}
                style={styles.text}
              />
            ))}
            <Text title={`${'App Service Price'} - ${payAbleAmount().appAmount.toString()}`} style={styles.text} />
            <View style={{ flexDirection: 'row' }}>
              <Text title={t('total')} style={styles.total} />
              <Text title={payAbleAmount().totalAmount.toString()} style={styles.text} />
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
          title={t('approve_payment')}
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
    width: getHeight(102),
    height: getHeight(102),
    resizeMode: 'contain',
    borderRadius: getHeight(55),
  },
  doctorCard: {
    width: getWidth(102),
    height: getHeight(102),
    resizeMode: 'contain',
    // marginLeft: getWidth(25),
  },
  starIcon: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginL),
    marginBottom: getHeight(dimens.imageS + dimens.marginL),
    alignItems: 'center',
  },
  Container: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginL),
    marginBottom: getHeight(dimens.imageS + dimens.marginL),
    alignItems: 'center',
  },
  heartIcon: {
    width: getHeight(20),
    height: getHeight(20),
    resizeMode: 'center',
  },
  text: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'left',
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
  },
  order: {
    fontSize: getHeight(20),
    textAlign: 'left',
  },
  rating: {
    fontSize: getHeight(fontSize.textM),
    color: colors.secondary,
    textAlign: 'left',
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: getHeight(fontSize.textM),
  },
  providerRating: {
    position: 'absolute',
    bottom: getHeight(-8),
    right: getWidth(0),
    alignItems: 'center',
  },
});
