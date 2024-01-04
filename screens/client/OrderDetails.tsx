import arrowBack from 'assets/icon/arrowBack.png';
import OrderFormView from 'components/client/home/OrderFormView';
import SummaryView from 'components/client/home/SummaryView';
import Button from 'components/common/Button';
import { RNHeader } from 'components/common/Header';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  I18nManager,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OrderDetailsController from './OrderDetailsController';
import { useTranslation } from 'react-i18next';
import { getProviderImage, getProviderName } from 'libs/utility/Utils';
import NavigationRoutes from 'navigator/NavigationRoutes';
import Loader from 'components/common/Loader';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import { Order } from 'libs/types/OrderTypes';

const OrderDetails = () => {
  const {
    handleNextButtonPress,
    showSummary,
    setShowSummary,
    treatmentReason,
    navigation,
    supplier,
    order,
    setOrder,
    isLoading,
    heardDetail,
  } = OrderDetailsController();
  const { t } = useTranslation();
  const [pendingOrder, setPendingOrder] = useState<boolean>(false);
  useEffect(() => {
    const currentOrder: Order = getLocalData('ORDER') as Order;

    console.log('called here currentOrder  ', currentOrder);

    if (currentOrder?.orderId !== undefined && currentOrder?.orderId !== '') {
      console.log('called here 1111');
      setPendingOrder(true);
    }
  }, []);
  console.log('pendingOrder', pendingOrder);
  const HeaderTitle = () => (
    <View style={styles.servicesContainer}>
      <Image
        source={getProviderImage(supplier?.name, supplier?.provider_type_id)}
        style={styles.specialistIcon}
      />
      <Text
        numberOfLines={2}
        style={styles.specialist}
        title={getProviderName(supplier?.provider_type_id)}
      />
    </View>
  );
  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={{
          padding: I18nManager.isRTL ? getWidth(20) : getWidth(20),
          paddingLeft: getWidth(0),
          zIndex: 1,
        }}
        onPress={() => {
          if (showSummary) {
            setShowSummary(false);
          } else {
            navigation.navigate(NavigationRoutes.ClientHome);
          }
        }}
      >
        <Image source={arrowBack} style={styles.arrowBack} />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    if (showSummary) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        setShowSummary(false);
        return true;
      });
    } else {
      BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.goBack();
        return true;
      });
    }
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => false);
  }, [showSummary]);

  return (
    <>
      {RNHeader(HeaderTitle, HeaderLeft, () => null, showSummary)}
      {isLoading && <Loader />}
      <KeyboardAvoidingView
        style={styles.mainContainer}
        contentContainerStyle={{
          backgroundColor: colors.white,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
          contentContainerStyle={{
            paddingVertical: getHeight(dimens.marginL),
          }}
        >
          {showSummary ? (
            <SummaryView
              setShowSummary={setShowSummary}
              order={order}
              setOrder={setOrder}
              healerDetail={heardDetail}
              isHealer={supplier.name == 'Alternative medicine'}
            />
          ) : (
            <OrderFormView
              treatmentReason={treatmentReason}
              setOrder={setOrder}
              order={order}
              hideTreatmentMenu={supplier.name === 'Alternative medicine'}
              onPressWhenHealer={() => handleNextButtonPress()}
              supplier={supplier}
            />
          )}
          {/* {supplier.name == "Alternative medicine" && !showSummary ? <></> : */}
          <Button
            title={showSummary ? t('order') : t('next')}
            isPrimary
            isSmall
            style={styles.buttonOrder}
            onPress={handleNextButtonPress}
            width={'30%'}
            disabled={isLoading || pendingOrder}
          />
          {/* } */}
          {showSummary && (
            <Text title={t('no_fee')} numberOfLines={1} style={styles.text} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
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
    resizeMode: 'contain',
    top: 8,
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  header: {
    backgroundColor: colors.white,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.sideMargin),
    paddingTop: getHeight(dimens.marginS + 3),
    width: I18nManager.isRTL ? '86%' : '100%',
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS - 1),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  specialist: {
    fontSize: getHeight(fontSize.textXl),
    textAlign: 'left',
  },
  buttonOrder: {
    alignSelf: 'center',
    marginTop: getHeight(dimens.marginL),
  },
  text: {
    fontSize: getHeight(fontSize.textS),
    marginTop: getWidth(4),
    textAlign: 'center',
  },
});
