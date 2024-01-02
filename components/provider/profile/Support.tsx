import {
  I18nManager,
  Image,
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

const Support = () => {
  const navigation = useNavigation<any>();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text title={'Support'} style={{ fontSize: fontSize.heading }} />
  );
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
          <View style={styles.innerContainer}>
            <Text
              title={'Chat with us'}
              style={{ fontSize: getHeight(fontSize.textXl) }}
            />
            <Image
              source={require('assets/icon/whatsappIcon.png')}
              style={styles.iconImage}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Support;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    zIndex: 1,
    alignItems: 'center',
    padding: getHeight(20),
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
    minHeight: getHeight(dimens.imageS + 10),
    borderColor: 'rgba(96, 214, 105, 1)',
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
});
