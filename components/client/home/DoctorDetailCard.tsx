import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import Text from 'components/common/Text';

const DoctorDetailCard = ({
  isPrimary,
  showBothCards,
}: {
  isPrimary?: boolean;
  showBothCards: boolean;
}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={require('../../../assets/icon/map.png')}
          style={styles.mapImage}
        />

        {isPrimary || showBothCards ? (
          <View style={showBothCards ? styles.cardBoth : styles.card}>
            <Image
              source={require('../../../assets/icon/warning.png')}
              style={showBothCards ? styles.icon : styles.warningIcon}
            />
            <Text
              style={showBothCards ? styles.titleText : styles.title}
              title={
                'Price went up by 50 NIS\nsince we didn’t find an\navailable doctor in your area'
              }
            />
          </View>
        ) : null}

        {isPrimary ? null : (
          <View style={styles.cardDetail}>
            <Text
              style={styles.doctorTitle}
              title={'Elena Miron, family doctor'}
            />
            <Text style={styles.moreInfo} title={'More info'} />
            <View style={styles.detailItem}>
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
              <View style={{ gap: 5, justifyContent: 'center' }}>
                <View style={styles.details}>
                  <Image
                    source={require('../../../assets/icon/phonecall.png')}
                    style={styles.phoneIcon}
                  />
                  <Text style={styles.title} title={'Call the doctor'} />
                </View>
                <Text style={styles.arrivalText} title={'Estimated arrival'} />
                <Text style={styles.min} title={'60 min'} />
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default DoctorDetailCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: getWidth(dimens.marginS),
    shadowColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    elevation: 2,
    paddingHorizontal: getWidth(dimens.marginM),
    paddingVertical: getWidth(dimens.imageS + dimens.marginS),
  },
  title: {
    fontSize: getWidth(fontSize.textL),
  },
  warningIcon: {
    width: getWidth(dimens.imageS + dimens.marginS),
    height: getHeight(dimens.imageS),
  },
  cardDetail: {
    backgroundColor: colors.white,
    borderRadius: getWidth(dimens.marginS),
    shadowColor: colors.black,
    alignItems: 'center',
    elevation: getWidth(dimens.borderBold),
    height: '28%',
    padding: getHeight(dimens.marginM),
    margin: getWidth(dimens.marginL),
  },
  doctorTitle: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  detailItem: {
    gap: getWidth(dimens.imageXs),
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorIconContainer: {
    position: 'relative',
  },
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(110),
    resizeMode: 'contain',
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(dimens.marginS),
    right: getHeight(dimens.marginS),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  phoneIcon: {
    width: getWidth(dimens.sideMargin + 5),
    height: getHeight(dimens.sideMargin + 4),
  },
  arrivalText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.textL,
  },
  min: {
    fontSize: fontSize.textM,
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
    marginLeft: getWidth(dimens.imageS),
  },
  icon: {
    width: getWidth(dimens.marginL + dimens.paddingXs),
    height: getHeight(dimens.marginL),
  },
  titleText: {
    fontSize: fontSize.textM,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginS),
    justifyContent: 'center',
  },
  starIconText: {
    fontSize: fontSize.textL,
    alignSelf: 'flex-end',
    paddingBottom: getHeight(dimens.marginM),
  },
  moreInfo: {
    fontSize: fontSize.textL,
    marginLeft: getWidth(dimens.imageS + dimens.marginM),
  },
  mapImage: {
    width: '100%',
    height: '60%',
    position: 'absolute',
  },
});
