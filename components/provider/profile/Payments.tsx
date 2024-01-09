import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Loader from 'components/common/Loader';
import SelectYear from 'components/common/SelectYear';
import Text, { AnimatedText } from 'components/common/Text';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

const Payments = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const { GetProviderPayment } = AuthServicesProvider();
  const { userId } = UseProviderUserContext();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log('selectedYear', selectedYear);
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

  const fetchPaymentData = async () => {
    try {
      setIsLoading(true);
      const fetchedPaymentData = await GetProviderPayment(
        userId,
        selectedYear?.toString(),
      );
      console.log('Fetched payment data:', fetchedPaymentData);
      if (fetchedPaymentData) {
        setPaymentData(fetchedPaymentData);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPaymentData();
  }, [selectedYear]);

  const FallingItemView = ({
    title,
    amount,
    index,
  }: {
    title: string;
    amount: string;
    index: number;
  }) => {
    return (
      <Animated.View
        style={styles.itemContainer}
        entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
          .duration(400)
          .delay(400 + index * 100)}
      >
        <AnimatedText
          entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
            .duration(400)
            .delay(600 + index * 100)}
          title={title}
        />
        <AnimatedText
          entering={FadeInRight.duration(400).delay(600 + index * 100)}
          style={styles.price}
          title={`${amount} NIS`}
        />
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
              index={1}
              title={t('earnings')}
              amount={paymentData?.all_earnings?.toString() ?? '0'}
            />
            <FallingItemView
              index={2}
              title={t('relized_earnings')}
              amount={paymentData?.realized_earnings?.toString() ?? '0'}
            />
            <FallingItemView
              index={3}
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
