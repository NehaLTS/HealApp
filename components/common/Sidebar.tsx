import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import RNModal from './Modal';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import profile from 'assets/icon/profile.png';
import history from 'assets/icon/history.png';
import report from 'assets/icon/report.png';
import money from 'assets/icon/money.png';
import support from 'assets/icon/support.png';
import language from 'assets/icon/language.png';
import Text from './Text';
import TextButton from './TextButton';
import { fontSize } from 'designToken/fontSizes';
import { useTranslation } from 'react-i18next';

const Sidebar = ({
  isVisible,
  onClose,
  isProviderProfile,
  onPress,
}: {
  isVisible: boolean;
  onClose: () => void;
  onPress: (title: string) => void;
  isProviderProfile: boolean;
}) => {
  const icons = [profile, history, report, money, support, language];
  console.log('isVisible111', isVisible);
  const { t } = useTranslation()

  const titles = [
    { id: 'Profile', title: t('personal_profile') },
    { id: 'OrderHistory', title: t('order_history') },
    { id: 'Reports', title: t('reports') },
    { id: 'Payments', title: t('payments') },
    { id: 'Support', title: t('support') },
    { id: 'Language', title: t('languages') },
  ];
  return (
    <RNModal
      isVisible={isVisible}
      backdropOpacity={0}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      animationInTiming={300}
      animationOutTiming={300}
      style={{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 0,
      }}
      onBackdropPress={onClose}
    >
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          {titles.map((item, index) => {
            return (
              <TextButton
                fontSize={getHeight(fontSize.textL)}
                key={index}
                style={styles.title}
                title={item.title}
                isRightAlign
                containerStyle={{
                  alignSelf: 'flex-end',
                }}
                onPress={() => onPress(item.id)}
              />
            );
          })}
        </View>
        <View style={styles.iconsContainer}>
          {icons.map((item, index) => {
            return <Image key={index} source={item} style={styles.icons} />;
          })}
        </View>
      </View>
    </RNModal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width > 500 ? '50%' : '80%',
    height: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12, // For Android

  },
  container: {
    gap: getHeight(dimens.marginL),
    paddingTop: getHeight(dimens.marginM),
    paddingRight: getHeight(dimens.marginL + dimens.paddingXs),
  },
  icons: {
    width: getHeight(dimens.marginL),
    height: getHeight(dimens.marginL),
    resizeMode: 'center',
  },
  iconsContainer: {
    backgroundColor: colors.primary,
    height: '100%',
    paddingTop: getHeight(dimens.marginM - 3),
    gap: getHeight(dimens.marginL),
    paddingHorizontal: getWidth(10),
  },
  title: {
    textAlign: 'right',
    height: getHeight(dimens.marginL),
  },
});
