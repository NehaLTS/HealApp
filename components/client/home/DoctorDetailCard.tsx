import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { PROVIDERDETAILS } from 'libs/types/OrderTypes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const DoctorDetailCard = ({
  isPrimary,
  showProvider,
  showBothCards,
  status,
  time,
  providerData,
  onPressCard,
}: {
  isPrimary?: boolean;
  showProvider?: boolean;
  showBothCards: boolean;
  status?: string;
  time: {
    hour: number;
    minutes: number;
    seconds: number;
    remainig: number;
  };
  providerData: PROVIDERDETAILS;
  onPressCard: () => void;
}) => {
  const { t } = useTranslation();
  console.log('ratingData', providerData);
  return (
    <>
      {isPrimary || showBothCards ? (
        <View style={showBothCards ? styles.cardBoth : styles.card}>
          <Image
            source={require('../../../assets/icon/warning.png')}
            style={showBothCards ? styles.icon : styles.warningIcon}
          />
          <Text
            style={showBothCards ? styles.titleText : styles.title}
            title={t('price_went_up_by_50_NIS')}
          />
        </View>
      ) : null}

      {showProvider || showBothCards ? (
        <View style={styles.cardDetail}>
          <View style={styles.container}>
            <Text
              style={styles.doctorTitle}
              title={`${providerData?.providerName}`}
            />
            <TouchableOpacity onPress={onPressCard}>
              <Image
                source={require('../../../assets/icon/cancel.png')}
                style={styles.cancel}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <View style={styles.detailItem}>
              <View style={styles.doctorIconContainer}>
                {providerData && providerData?.providerProfilePicture ? (
                  <Image
                    source={{ uri: providerData?.providerProfilePicture }}
                    style={styles.doctorIcon}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/icon/doctorIcon.png')}
                    style={styles.doctorIcon}
                  />
                )}

                <Image
                  source={require('../../../assets/icon/star.png')}
                  style={styles.starIcon}
                />
                <Text
                  style={styles.rating}
                  title={providerData.providerRating}
                />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.arrivalText} title={status} />
                <Text
                  style={styles.time}
                  title={`${Math.round(
                    time.minutes === 0 ? time.seconds : time.minutes,
                  )}${t(' min')}`}
                />
                <TouchableOpacity
                  style={styles.details}
                  onPress={() => {
                    Linking.openURL(`tel:${providerData?.phoneNumber}`);
                  }}
                >
                  <Image
                    source={require('../../../assets/icon/phonecall.png')}
                    style={styles.phoneIcon}
                  />
                  <Text style={styles.title} title={t('call_doctor')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DoctorDetailCard;

const styles = StyleSheet.create({
  arrivalText: {
    fontFamily: fontFamily.semiBold,
    fontSize: getHeight(fontSize.textL),
  },
  rating: {
    position: 'absolute',
    bottom: getHeight(-16),
    right: getHeight(dimens.paddingXs + 2),
    fontSize: getHeight(fontSize.textL),
  },
  moreInfo: {
    fontSize: getHeight(fontSize.textL),
    marginTop: getHeight(dimens.borderBold),
    textAlign: 'left',
    marginBottom: getHeight(dimens.marginS + 8),
  },
  time: {
    fontSize: getHeight(fontSize.textM),
    fontFamily: fontFamily.light,
    marginBottom: getHeight(dimens.marginS),
  },
  titleText: {
    fontSize: getHeight(fontSize.textM),
  },
  cardDetail: {
    backgroundColor: colors.offWhite,
    borderRadius: getHeight(5),
    shadowColor: colors.black,
    // alignItems: 'center',
    elevation: getHeight(12),
    paddingVertical: getWidth(12),
    paddingHorizontal: getWidth(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: getHeight(dimens.marginS),
    shadowColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    elevation: getHeight(7),
    paddingHorizontal: getWidth(dimens.marginM),
    paddingVertical: getWidth(dimens.imageS + dimens.marginS),
    margin: getWidth(dimens.marginS),
  },
  title: {
    fontSize: getHeight(fontSize.textL),
  },
  warningIcon: {
    width: getWidth(dimens.imageS + 3),
    height: getHeight(dimens.imageS),
    resizeMode: 'contain',
  },

  doctorTitle: {
    fontSize: getHeight(20),
    color: colors.black,
    fontFamily: fontFamily.medium,
    width: '50%',
    flexWrap: 'wrap',
  },
  detailItem: {
    gap: getWidth(dimens.marginM),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: getWidth(10),
  },

  doctorIconContainer: {
    position: 'relative',
    shadowColor: colors.black,
    borderRadius: getHeight(50),
    elevation: getHeight(15),
  },
  doctorIcon: {
    width: getHeight(110),
    height: getHeight(110),
    resizeMode: 'contain',
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(dimens.paddingXs),
    right: getHeight(dimens.paddingXs),
    width: getHeight(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
  },
  phoneIcon: {
    width: getWidth(dimens.sideMargin + 5),
    height: getHeight(dimens.sideMargin + 4),
    resizeMode: 'contain',
  },
  cardBoth: {
    backgroundColor: colors.white,
    borderRadius: getHeight(dimens.marginS),
    shadowColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    elevation: getHeight(dimens.borderBold),
    paddingVertical: getWidth(dimens.marginM),
    paddingHorizontal: getWidth(dimens.marginS),
    marginLeft: getHeight(dimens.imageS + 10),
    marginRight: getHeight(dimens.marginM),
  },
  icon: {
    width: getWidth(dimens.marginL + dimens.paddingXs),
    height: getHeight(dimens.marginL),
    resizeMode: 'contain',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(5),
    justifyContent: 'center',
  },
  detailsContainer: {
    gap: getWidth(5),
    justifyContent: 'center',
  },
  cancel: {
    width: getHeight(dimens.marginL),
    height: getHeight(28),
    resizeMode: 'contain',
    position: 'absolute',
    top: getHeight(-13),
    left: getWidth(70),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
