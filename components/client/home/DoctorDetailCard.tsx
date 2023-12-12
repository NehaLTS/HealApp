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
                <Text style={styles.rating} title={'4.8'} />
              </View>
              <View style={styles.detailsContainer}>
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
                <Text style={styles.arrivalText} title={status} />
                <Text
                  style={styles.time}
                  title={`${Math.round(
                    time.minutes === 0 ? time.seconds : time.minutes,
                  )}${t(' min')}`}
                />
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
    marginVertical: getHeight(3),
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
  },
  titleText: {
    fontSize: getHeight(fontSize.textM),
  },
  cardDetail: {
    backgroundColor: '#F9FDFF',
    borderRadius: getWidth(5),
    shadowColor: colors.black,
    alignItems: 'center',
    elevation: getWidth(12),
    paddingVertical: getHeight(12),
    paddingHorizontal: getWidth(12),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: getWidth(dimens.marginS),
    shadowColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    elevation: getWidth(7),
    paddingHorizontal: getWidth(dimens.marginM),
    paddingVertical: getWidth(dimens.imageS + dimens.marginS),
    margin: getWidth(dimens.marginS),
  },
  title: {
    fontSize: getWidth(fontSize.textL),
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
    width: '98%',
    flexWrap: 'wrap',
  },
  detailItem: {
    gap: getHeight(dimens.marginM),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  doctorIconContainer: {
    position: 'relative',
    shadowColor: colors.black,
    borderRadius: getWidth(50),
    elevation: getWidth(10),
  },
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(110),
    resizeMode: 'contain',
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(dimens.paddingXs),
    right: getHeight(dimens.paddingXs),
    width: getWidth(dimens.marginM),
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
    borderRadius: getWidth(dimens.marginS),
    shadowColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    elevation: getWidth(dimens.borderBold),
    paddingVertical: getWidth(dimens.marginM),
    paddingHorizontal: getWidth(dimens.marginS),
    marginLeft: getWidth(dimens.imageS + 10),
    marginRight: getWidth(dimens.marginM),
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
    gap: 5,
    justifyContent: 'center',
  },
  cancel: {
    width: getWidth(dimens.marginL),
    height: getHeight(25),
    resizeMode: 'contain',
    position: 'absolute',
    top: -24,
    right: -14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
