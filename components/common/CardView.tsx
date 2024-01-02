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
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { getProviderImage, getProviderName } from 'libs/utility/Utils';
import { useTranslation } from 'react-i18next';

const CardView = ({ item, index, isSearch }: any) => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const onPaymentAdd = () => setIsAddPayment(true);
  const { userProfile } = UseClientUserContext();
  const { t } = useTranslation();

  const onPressOrder = () => {

    console.log("paymebtDetail added", userProfile?.isPaymentAdded, userProfile?.card_number)
    if (userProfile?.isPaymentAdded && userProfile?.card_number !== undefined) {
      if (item?.provider_type_id === 3) {
        navigation.navigate(NavigationRoutes.HealerHome, {
          supplier: item,
        });
      } else {
        navigation.navigate(NavigationRoutes.OrderDetails, {
          supplier: item,
        });
      }
    } else {
      setModalVisible(true);
    }
  };
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
              title={t('add_payment_method')}
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
          <UserPaymentView isFromHome item={item} isFromSummary onPress={() => {
            setModalVisible(false)
            setIsAddPayment(false)
          }} onPressCancel={() => { setModalVisible(false) }} />
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
        style={{}}
      >
        {!isSearch ? (
          <TouchableOpacity
            style={[styles.servicesContainer, styles.elevation]}
            onPress={onPressOrder}
            activeOpacity={1}
          >
            <Image
              source={getProviderImage(item?.name, item?.provider_type_id)}
              style={styles.specialistIcon}
            />
            <Text
              numberOfLines={2}
              style={styles.specialist}
              title={getProviderName(item?.provider_type_id)}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.specialistList}
            onPress={onPressOrder}
          >
            <View style={styles.container}>
              <Image
                source={getProviderImage(item?.name, item?.provider_type_id)}
                style={styles.specialistIcon}
              />
              <Text
                style={styles.specialistSearched}
                title={getProviderName(item?.provider_type_id)}
              />
            </View>
            <Button
              title={t('order')}
              isPrimary
              isSmall
              width={84}
              fontSized={getHeight(15)}
              height={36}
              onPress={onPressOrder}
            />
          </TouchableOpacity>
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
    marginHorizontal: getWidth(dimens.marginM),
  },
  elevation: {
    elevation: getWidth(dimens.sideMargin),
    shadowColor: colors.black,
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  specialist: {
    fontSize: getHeight(fontSize.textM),
    flex: 1,
    textAlign: 'left',
  },
  specialistSearched: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  specialistList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(dimens.paddingL),
    zIndex: 1,
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
