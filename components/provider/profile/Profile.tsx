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
import { fontSize } from 'designToken/fontSizes';
import { colors } from 'designToken/colors';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text';
import arrowBack from 'assets/icon/arrowBack.png';
import TextButton from 'components/common/TextButton';

const Profile = () => {
  const navigation = useNavigation<any>();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text title={'Personal profile'} style={{ fontSize: fontSize.heading }} />
  );
  const services = [
    { name: 'Service 1', price: '50' },
    { name: 'Service 2', price: '80' },
    { name: 'Service 3', price: '60' },
  ];
  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
        {headerLeft()}
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('assets/icon/addProfileIcon.png')}
            style={styles.avatarImage}
          />
          <Text title={'Eynat Linn'} style={styles.text} />
        </View>
        <View style={styles.divider}></View>
        <View>
          <Text title={'Services you provide'} style={styles.servicesText} />
          {services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Text title={service.name} style={styles.serviceName} />
              <Text title={`${service.price} NIS`} style={styles.serviceName} />
            </View>
          ))}
        </View>
        <View style={styles.addImageContainer}>
          <Image
            source={require('assets/icon/addServicesBlack.png')}
            style={styles.addImage}
          />
          <Text title={'Add another service'} />
        </View>
        <View style={styles.logoutImageContainer}>
          <Image
            source={require('assets/icon/logout.png')}
            style={styles.logoutImage}
          />
          <TextButton
            title={'Log Out'}
            fontSize={getHeight(16)}
            onPress={() => {
              navigation.navigate(NavigationRoutes.IntroStack);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },

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
  },
  text: {
    marginTop: getHeight(dimens.marginM),
    fontSize: getHeight(fontSize.textXl),
  },
  divider: {
    borderWidth: getHeight(0.3),
    borderColor: colors.disabled,
    marginTop: getHeight(dimens.imageXs),
    width: '100%',
    alignSelf: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingVertical: getHeight(dimens.paddingS),
  },
  serviceName: {
    fontSize: getHeight(fontSize.textM),
  },

  servicesText: {
    fontSize: getHeight(20),
    marginVertical: getHeight(10),
  },
  addImage: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageXs),
    resizeMode: 'contain',
  },
  addImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.imageXs),
    paddingVertical: getHeight(dimens.marginM),
  },
  logoutImage: {
    width: getWidth(dimens.marginL),
    height: getHeight(dimens.marginL),
    resizeMode: 'contain',
  },
  logoutImageContainer: {
    position: 'absolute',
    bottom: getHeight(20),
    left: getWidth(dimens.marginM),
    right: getWidth(dimens.marginM),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: getWidth(dimens.marginS),
  },
  logOutText: {
    fontSize: getHeight(fontSize.textL),
  },
});
