import Text from 'common/Text';
import UserPaymentView from 'components/client/registration/views/UserPaymentView';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import NavigationRoutes from 'navigator/NavigationRoutes';

const CardView = ({ item, onPress, index, isSearch }: any) => {
  const navigation = useNavigation();
  const [visibility] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const onPaymentAdd = () => setIsAddPayment(true);
  const { userProfile } = UseClientUserContext();

  useEffect(() => {
    Animated.timing(visibility, {
      toValue: 1,
      duration: index * 200,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [index]);
  const onPressOrder = () => {
    console.log('userProfile?.isPaymentAdded', userProfile?.isPaymentAdded);
    if (userProfile?.isPaymentAdded)
      navigation.navigate(NavigationRoutes.OrderDetails);
    else setModalVisible(true);
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
          <View style={{ flex: 0.3 }} />
          <View style={styles.modalContent}>
            <Text
              style={styles.modalText}
              title={'Please add method\nof payment first'}
            />
            <Button
              title={'Add payment method'}
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
          <UserPaymentView isFromHome />
        </View>
      )}
    </Modal>
  );
  return (
    <>
      {!isSearch ? (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <View style={[styles.servicesContainer, styles.elevation]}>
            <Image
              source={require('assets/icon/doctor.png')}
              style={styles.specialistIcon}
            />
            <Text
              numberOfLines={2}
              style={styles.specialist}
              title={item.name}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.specialistList}>
          <View style={styles.container}>
            <Image
              source={{ uri: item.image_url ?? '' }}
              style={styles.specialistIcon}
            />
            <Text style={styles.specialistSearched} title={item.name} />
          </View>
          <Button
            title={'Order'}
            isPrimary
            isSmall
            width={'25%'}
            fontSized={15}
            height={40}
            onPress={onPressOrder}
          />
        </View>
      )}
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
    marginTop: getHeight(dimens.marginM),
  },
  elevation: {
    elevation: getHeight(dimens.paddingS),
    shadowColor: colors.black,
    marginHorizontal: getWidth(6),
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
