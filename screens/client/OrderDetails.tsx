import { useNavigation, useRoute } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import specialistIcon from 'assets/icon/doctor.png';
import DoctorDetailCard from 'components/client/home/DoctorDetailCard';
import OrderFormView from 'components/client/home/OrderFormView';
import SummaryView from 'components/client/home/SummaryView';
import TreatmentEnd from 'components/client/home/TreatmentEnd';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useLayoutEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OrderDetailsController from './OrderDetailsController';
import { ClientProfile, OrderDetail } from 'libs/types/UserType';
import { getLocalData } from 'libs/datastorage/useLocalStorage';

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { supplier } = route.params;
  useLayoutEffect(() => {}, [navigation]);
  const {
    handleNextButtonPress,
    showSummary,
    setShowSummary,
    treatmentReason,
  } = OrderDetailsController();

  const userProfile = getLocalData?.('USERPROFILE');

  const [order, setOrder] = useState<OrderDetail>({
    client_id: '',
    patient_type: { type: 'me', age: '' },
    patient_name: '',
    address: '',
    city: (userProfile as ClientProfile)?.city ?? '',
    phonenumber: '',
    Date_of_birth: '',
    services: [],
    symptoms: '',
    Additional_notes: '',
    Estimate_arrival: '60',
    Instructions_for_arrival: '',
    Payment_mode: '',
    TotalCost: '',
    menu_id: '',
    reason: [],
  });
  console.log('order**********', order);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <View style={styles.servicesContainer}>
          <Image
            source={require('assets/icon/physio.png')}
            style={styles.specialistIcon}
          />
          <Text
            numberOfLines={2}
            style={styles.specialist}
            title={supplier?.name}
          />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowBack} style={styles.arrowBack} />
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerRight: null,
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: getHeight(dimens.marginL) }}
      >
        {showSummary ? (
          <SummaryView
            setShowSummary={setShowSummary}
            order={order}
            setOrder={setOrder}
          />
        ) : (
          <OrderFormView
            treatmentReason={treatmentReason}
            setOrder={setOrder}
            order={order}
          />
        )}
        <Button
          title={showSummary ? 'Order' : 'Next'}
          isPrimary
          isSmall
          style={styles.buttonOrder}
          onPress={handleNextButtonPress}
          width={'30%'}
        />
        {showSummary && (
          <Text
            title={'*No fee will be collected within 3 minutes after order'}
            style={styles.text}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },

  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    top: 8,
  },
  header: {
    backgroundColor: colors.white,
  },
  next: {
    alignSelf: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.sideMargin),
    paddingTop: getHeight(dimens.marginS),
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  specialist: {
    fontSize: getWidth(fontSize.textXl),
  },
  buttonOrder: {
    alignSelf: 'center',
  },
  text: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getWidth(4),
    textAlign: 'center',
  },
});
