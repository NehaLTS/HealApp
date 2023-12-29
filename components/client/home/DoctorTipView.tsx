import { StyleSheet, Image, View } from 'react-native';
import React from 'react';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Text from 'components/common/Text';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import Input from 'components/common/Input';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import Button from 'components/common/Button';
import { useTranslation } from 'react-i18next';

const DoctorTipView = ({ onPress }: { onPress: () => void }) => {
  const tipAmounts = ['5 NIS', '10 NIS', '15 NIS', 'Other'];
  const { t } = useTranslation();
  const [addTip, setAddTip] = React.useState<number | null>(null);

  return (
    <>
      <View style={styles.imagecontainer}>
        <Image
          source={require('../../../assets/icon/doctorIcon.png')}
          style={styles.doctorIcon}
        />
        <View style={styles.providerRating}>
          <Image
            source={require('../../../assets/icon/star.png')}
            style={styles.star}
          />
          <Text style={styles.rating} title={'4.8'} />
        </View>
      </View>
      <View style={styles.container}>
        <Text
          title={'Elena Miron, family doctor'}
          style={styles.familyDoctorText}
        />
        <Text
          title={t('liked_services')}
          style={{ fontSize: getHeight(18), marginBottom: getHeight(50) }}
        />
      </View>
      <Text title={t('you_can_leave')} style={styles.tipText} />
      <View style={styles.buttonContainer}>
        {tipAmounts.map((title, index) => (
          <Button
            key={index}
            title={title}
            isSmall
            fontSized={16}
            width={'20%'}
            height={40}
            borderRadius={10}
            isPrimary={addTip === index}
            onPress={() => setAddTip(index)}
          />
        ))}
      </View>
      <View
        style={{
          flex: 0.8,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          title={t('done')}
          isPrimary
          isSmall
          style={{ alignSelf: 'center' }}
          width={'30%'}
          onPress={onPress}
        />
      </View>
    </>
  );
};

export default DoctorTipView;

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(dimens.imageM + dimens.marginL),
    height: getHeight(dimens.imageM + dimens.marginL),
    resizeMode: 'contain',
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
    gap: getWidth(20),
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
    fontSize: getHeight(fontSize.textM),
  },
  star: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    resizeMode: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: getHeight(dimens.marginS),
  },
  tipText: {
    textAlign: 'center',
    marginBottom: getHeight(dimens.marginS + 5),
    fontSize: getHeight(fontSize.textL),
  },
  imagecontainer: {
    alignItems: 'center',
    marginTop: getHeight(dimens.imageXs),
  },
  providerRating: {
    position: 'absolute',
    bottom: 0,
    right: getWidth(112),
  },
});
