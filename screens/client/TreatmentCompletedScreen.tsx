import { useNavigation, useRoute } from '@react-navigation/native';
import DoctorTipView from 'components/client/home/DoctorTipView';
import RatingView from 'components/client/home/RatingView';
import TreatmentEnd from 'components/client/home/TreatmentEnd';
import React, { useState } from 'react';
import arrowBack from 'assets/icon/arrowBack.png';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { RNHeader } from 'components/common/Header';
import { colors } from 'designToken/colors';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import Loader from 'components/common/Loader';
import { Order } from 'libs/types/OrderTypes';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';

const TreatmentCompletedScreen = () => {
  const [showViews, setShowViews] = useState('Treatmen_End');
  const navigation = useNavigation();
  const { OrderPayment, ProviderRating } = ClientOrderServices();
  const [isLoading, setIsLoading] = React.useState(false);
  const [rating, setRating] = useState(0);
  const route = useRoute<any>();

  const currentOrder: Order = getLocalData('ORDER') as Order;

  //const currentOrder = route?.params?.currentOrder as Order;
  console.log('currentOrder 66666', currentOrder);

  const onApprovePayment = async () => {
    try {
      setIsLoading(true);
      await OrderPayment({
        order_id: currentOrder?.orderId,
      })
        .then((res) => {
          console.log('object', res);
          // if (res.isSucessfull) {
          setShowViews('Rating_View');
          setLocalData('ORDER', {
            orderId: '',
            providerDetails: undefined,
            orderPrice: '',
            orderStatus: '',
            orderServices: [],
            message: '',
          });
          // }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch {
      console.error('Error:');
    } finally {
      setIsLoading(false);
    }
  };

  const onApproveRating = async () => {
    try {
      setIsLoading(true);
      await ProviderRating({
        provider_id: '1',
        client_id: '1',
        ratings: rating?.toString(),
      })
        .then((res) => {
          console.log('object', res);
          if (res.isSucessfull) {
            setShowViews('Tip_View');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch {
      console.error('Error:');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.container}>
        {showViews === 'Treatmen_End' && (
          <TreatmentEnd
            onPress={onApprovePayment}
            currentOrder={currentOrder}
          />
        )}
        {showViews === 'Rating_View' && (
          <RatingView onPress={onApproveRating} rating={setRating} />
        )}
        {showViews === 'Tip_View' && <DoctorTipView onPress={() => {}} />}
      </View>
    </>
  );
};

export default TreatmentCompletedScreen;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
});
