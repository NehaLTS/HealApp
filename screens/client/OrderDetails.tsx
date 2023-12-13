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
import React, { useEffect } from 'react';
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
import { getProviderImage } from 'libs/utility/Utils';
import NavigationRoutes from 'navigator/NavigationRoutes';
import Loader from 'components/common/Loader';

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
  } = OrderDetailsController();
  const { t } = useTranslation();
  const HeaderTitle = () => (
    <View style={styles.servicesContainer}>
      <Image
        source={getProviderImage(supplier?.name)}
        style={styles.specialistIcon}
      />
      <Text
        numberOfLines={2}
        style={styles.specialist}
        title={supplier?.name}
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
            />
          ) : (
            <OrderFormView
              treatmentReason={treatmentReason}
              setOrder={setOrder}
              order={order}
            />
          )}
          <Button
            title={showSummary ? t('order') : t('next')}
            isPrimary
            isSmall
            style={styles.buttonOrder}
            onPress={handleNextButtonPress}
            width={'30%'}
            disabled={isLoading}
          />
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
    height: '100%',
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'contain',
    top: 8,
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
    fontSize: getWidth(fontSize.textXl),
    textAlign: 'left',
  },
  buttonOrder: {
    alignSelf: 'center',
    marginTop: getHeight(dimens.marginL),
  },
  text: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getWidth(4),
    textAlign: 'center',
  },
});
