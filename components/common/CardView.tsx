import { useNavigation } from '@react-navigation/native';
import Text from 'common/Text';
import UserPaymentView from 'components/client/registration/views/UserPaymentView';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { getProviderImage } from 'libs/utility/Utils';
import { useTranslation } from 'react-i18next';

const CardView = ({ item, index, isSearch }: any) => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const onPaymentAdd = () => setIsAddPayment(true);
  const { userProfile } = UseClientUserContext();
  const { t } = useTranslation();
  const onPressOrder = () => {
    if (userProfile?.isPaymentAdded) {
      navigation.navigate(NavigationRoutes.OrderDetails, {
        supplier: item,
      });
    } else {
      setModalVisible(true);
    }
  };
  // console.log('userProfile?.isPaymentAdded', userProfile?.isPaymentAdded);
  const paymentModal = () => (
    <Modal
      backdropColor={colors.white}
      backdropOpacity={!isAddPayment ? 0.9 : 1}
      onBackdropPress={() => setModalVisible(false)}
      isVisible={isModalVisible}
      style={styles.modalContainer}
    >
      {!isAddPayment ? (
        <>
          <View style={{ flex: 0.33 }} />
          <View style={styles.modalContent}>
            <Text style={styles.modalText} title={t('please_add_payment')} />

            <Button
              title={t('payment_method')}
              isPrimary
              isSmall
              fontSized={getHeight(15)}
              height={getHeight(40)}
              onPress={onPaymentAdd}
            />
          </View>
        </>
      ) : (
        <View style={styles.paymentContainer}>
          <UserPaymentView isFromHome item={item} />
        </View>
      )}
    </Modal>
  );
  return (
    <>
      <Animated.View
        key={index}
        entering={FadeInUp.duration(200).easing(Easing.ease)}
        exiting={FadeInDown.duration(10).easing(Easing.ease)}
      >
        {!isSearch ? (
          <TouchableOpacity
            style={[styles.servicesContainer, styles.elevation]}
            onPress={onPressOrder}
            activeOpacity={1}
          >
            <Image
              source={getProviderImage(item?.name)}
              style={styles.specialistIcon}
            />
            <Text
              numberOfLines={2}
              style={styles.specialist}
              title={item.name}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.specialistList}>
            <View style={styles.container}>
              <Image
                source={getProviderImage(item?.name?.en)}
                style={styles.specialistIcon}
              />
              <Text style={styles.specialistSearched} title={item?.name?.en} />
            </View>
            <Button
              title={t('order')}
              isPrimary
              isSmall
              width={84}
              fontSized={15}
              height={36}
              onPress={onPressOrder}
            />
          </View>
        )}
      </Animated.View>
      {paymentModal()}
    </>
  );
};

export default CardView;

const styles = StyleSheet.create({
  servicesContainer: {
    backgroundColor: colors.offWhite,
    borderRadius: getHeight(dimens.marginS),
    padding: getHeight(dimens.paddingS),
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginL),
    marginTop: getHeight(dimens.marginS + 8),
  },
  elevation: {
    elevation: getHeight(8),
    shadowColor: colors.black,
    marginHorizontal: getWidth(dimens.paddingXs),
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  specialist: {
    fontSize: getWidth(fontSize.textM),
    flex: 1,
    textAlign: 'left',
  },
  specialistSearched: {
    textAlign: 'center',
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  specialistList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getWidth(dimens.paddingL),
  },
  container: {
    flexDirection: 'row',
    gap: getWidth(20),
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'flex-start',
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.lightGrey,
    borderRadius: getHeight(10),
    padding: getHeight(dimens.sideMargin),
    paddingHorizontal: getHeight(dimens.imageS),
    paddingTop: getHeight(dimens.imageXs),
    gap: getHeight(dimens.marginM),
  },
  modalText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
  },
});
