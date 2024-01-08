import {
  I18nManager,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { colors } from 'designToken/colors';
import Text from 'components/common/Text';
import { fontSize } from 'designToken/fontSizes';
import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation()

  const headerLeft = () => (
    <TouchableOpacity style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text
      style={styles.title}
      title={t('support')}
    />
  );
  const handleChatWithUs = () => {
    const whatsappLink = 'whatsapp://send?phone=123456789';

    Linking.canOpenURL(whatsappLink).then((supported) => {
      if (supported) {
        return Linking.openURL(whatsappLink);
      } else {
        console.error("WhatsApp is not installed on your device");
      }
    }).catch((err) => console.error('An error occurred', err));
  };
  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('assets/icon/provider.png')}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.chatContainer}>
          <TouchableOpacity onPress={handleChatWithUs} style={styles.innerContainer}>
            <Text
              title={t('chat_with')}
              style={{ fontSize: getHeight(fontSize.textXl) }}
            />
            <Image
              source={require('assets/icon/whatsappIcon.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Support;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: getWidth(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingTop: getHeight(dimens.marginM),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  avatarImage: {
    width: getWidth(dimens.imageM),
    height: getHeight(dimens.imageM),
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: getHeight(dimens.marginL),
  },
  chatContainer: {
    alignItems: 'center',
    borderWidth: getHeight(dimens.borderThin),
    borderRadius: getHeight(dimens.marginS),
    flexDirection: 'row',
    minHeight: getHeight(dimens.imageS + 5),
    borderColor: colors.green,
    backgroundColor: colors.white,
    marginTop: getHeight(dimens.imageXs),
  },
  iconImage: {
    width: getWidth(dimens.marginL + 8),
    height: getHeight(dimens.marginL + 8),
    resizeMode: 'contain',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: getHeight(dimens.marginS),
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  backArrow: {
    paddingRight: getWidth(15),
    paddingVertical: getHeight(5),
  }
});
