import { useNavigation } from '@react-navigation/native';
import DoctorTipView from 'components/client/home/DoctorTipView';
import RatingView from 'components/client/home/RatingView';
import TreatmentEnd from 'components/client/home/TreatmentEnd';
import Loader from 'components/common/Loader';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { deleteOrder, getLocalData } from 'libs/datastorage/useLocalStorage';
import { Order } from 'libs/types/OrderTypes';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const TreatmentCompletedScreen = () => {
  const [showViews, setShowViews] = useState('Treatment_End');
  const navigation = useNavigation<any>();
  const { OrderPayment, ProviderRating } = ClientOrderServices();
  const [isLoading, setIsLoading] = React.useState(false);
  const [rating, setRating] = useState(0);
  // const route = useRoute<any>();
  const { userId } = UseClientUserContext();

  const currentOrder: Order = getLocalData('ORDER') as Order;

  //const currentOrder = route?.params?.currentOrder as Order;
  console.log('currentOrder 66666', currentOrder);

  const onApprovePayment = async () => {
    try {
      setIsLoading(true);
      const res = await OrderPayment({
        order_id: currentOrder?.orderId,
      });
      if (res.isSuccessful) {
        setShowViews('Rating_View');
        deleteOrder();
      }
    } catch {
      (err: Error) => console.error('Error catch:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onApproveRating = async () => {
    try {
      setIsLoading(true);
      const res = await ProviderRating({
        provider_id: currentOrder?.providerDetails?.providerId,
        client_id: userId,
        ratings: rating?.toString(),
      });
      if (res?.msg === 'successfully created') {
        setShowViews('Tip_View');
      }
    } catch {
      (err: Error) => console.error('Error catch:', err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.container}>
        {showViews === 'Treatment_End' && (
          <TreatmentEnd
            onPress={onApprovePayment}
            currentOrder={currentOrder}
          />
        )}
        {showViews === 'Rating_View' && (
          <RatingView onPress={onApproveRating} rating={setRating} />
        )}
        {showViews === 'Tip_View' && (
          <DoctorTipView
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: NavigationRoutes.ClientHome }],
              });
            }}
          />
        )}
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
