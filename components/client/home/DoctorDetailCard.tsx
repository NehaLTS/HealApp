import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import Text from 'components/common/Text';
import { getLocalData } from 'libs/datastorage/useLocalStorage';

const DoctorDetailCard = ({
  isPrimary,
  showProvider,
  showBothCards,
}: {
  isPrimary?: boolean;
  showProvider?:boolean;
  showBothCards: boolean;
}) => {
  const localData= getLocalData('USER')
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
            title={
              'Price went up by 50 NIS\nsince we didn’t find an\navailable doctor in your area'
            }
          />
        </View>
      ) : null}

      {showProvider||showBothCards ? (
        <View style={styles.cardDetail}>
          <Text
            style={styles.doctorTitle}
            title={`${localData?.providerLocation?.firstname}${", "}${localData?.providerLocation?.name}`}
          />

          <View style={{}}>
          
       
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
              <View style={styles.detailsContainer}>
                <Text style={styles.moreInfo} title={'More info'} />
                <View style={styles.details}>
                  <Image
                    source={require('../../../assets/icon/phonecall.png')}
                    style={styles.phoneIcon}
                  />
                  <Text style={styles.title} title={'Call the doctor'} />
                </View>
                <Text style={styles.arrivalText} title={'Estimated arrival'} />
                <Text style={styles.time} title={'60 min'} />
              </View>
            </View>
          </View>
        </View>
      ):null}
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
  cardDetail: {
    backgroundColor: colors.grey,
    borderRadius: getWidth(5),
    shadowColor: colors.black,
    alignItems: 'center',
    elevation: getWidth(dimens.borderBold),
    paddingVertical: 10,
    paddingHorizontal:20
  },
  doctorTitle: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  detailItem: {
    gap: getHeight(dimens.marginM),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
    resizeMode: 'contain',
  },
  arrivalText: {
    fontFamily: fontFamily.medium,
    fontSize: getWidth(fontSize.textL),
  },
  time: {
    fontSize: getWidth(fontSize.textM),
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
  titleText: {
    fontSize: getWidth(fontSize.textM),
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(5),
    justifyContent: 'center',
  },
  starIconText: {
    fontSize: getWidth(fontSize.textL),
    alignSelf: 'flex-end',
    paddingBottom: getHeight(dimens.marginM),
  },
  moreInfo: {
    fontSize: getWidth(fontSize.textL),
    marginTop: 10,
    textAlign: 'left',
  },
  detailsContainer: {
    gap: 5,
    justifyContent: 'center',
  },
});
