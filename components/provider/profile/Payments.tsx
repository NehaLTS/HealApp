import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Loader from 'components/common/Loader';
import SelectYear from 'components/common/SelectYear';
import Text from 'components/common/Text';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Payments = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear();
  const { GetProviderPayment } = AuthServicesProvider();
  const { userId } = UseProviderUserContext()
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fallAnimation] = useState(new Animated.Value(-100));
  console.log('selectedYear', selectedYear)
  const [paymentData, setPaymentData] = useState({
    all_earnings: 0,
    payment_to_heal: 0,
    realized_earnings: 0,
  });
  console.log('paymentData', paymentData);
  const headerLeft = () => (
    <TouchableOpacity
      style={styles.arrowBackButton}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => <Text style={styles.title} title={t('payments')} />;

  const ItemView = ({ title, amount }: { title: string; amount: string }) => {
    return (
      <View style={styles.itemContainer}>
        <Text title={title} />
        <Text style={styles.price} title={`${amount} NIS`} />
      </View>
    );
  };
  const fetchPaymentData = async () => {
    try {
      //true
      setIsLoading(true)
      const fetchedPaymentData = await GetProviderPayment('50', selectedYear?.toString());
      console.log('Fetched payment data:', fetchedPaymentData);
      if (fetchedPaymentData) {
        setPaymentData(fetchedPaymentData);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchPaymentData();
  }, [selectedYear]);
  useEffect(() => {
    Animated.timing(fallAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [isLoading]);

  const FallingItemView = ({ title, amount }: { title: string, amount: string }) => {
    return (
      <Animated.View
        style={{
          transform: [{ translateY: fallAnimation }],
        }}
      >
        <ItemView title={title} amount={amount} />
      </Animated.View>
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        <SelectYear setYear={setSelectedYear} />
        {!isLoading ? (
          <View
            style={{
              gap: getHeight(dimens.sideMargin),
              marginTop: getHeight(dimens.imageS + dimens.marginS),
            }}
          >
            <FallingItemView
              title={t('earnings')}
              amount={paymentData?.all_earnings?.toString() ?? '0'}
            />
            <FallingItemView
              title={t('relized_earnings')}
              amount={paymentData?.realized_earnings?.toString() ?? '0'}
            />
            <FallingItemView
              title={t('payments_heal')}
              amount={paymentData?.payment_to_heal?.toString() ?? '0'}
            />
          </View>
        ) : (
          <Loader />
        )}

      </View>
    </>
  );
};
export default Payments;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  container: {
    paddingTop: getHeight(dimens.marginL),
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
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
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    textAlign: 'right',
  },
  arrowBackButton: {
    paddingRight: getWidth(dimens.sideMargin),
    paddingVertical: getHeight(dimens.marginS / dimens.borderBold),
  },
});
