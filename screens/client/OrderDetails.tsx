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
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OrderDetailsController from './OrderDetailsController';
import { useTranslation } from 'react-i18next';
import { getProviderImage } from 'libs/utility/Utils';

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
  } = OrderDetailsController();
  const { t } = useTranslation();
  const HeaderTitle = () => (
    <View style={styles.servicesContainer}>
      <Image
        source={getProviderImage(
          supplier?.name?.length ? supplier?.name : supplier?.name?.en,
        )}
        style={styles.specialistIcon}
      />
      <Text
        numberOfLines={2}
        style={styles.specialist}
        title={supplier?.name?.length ? supplier?.name : supplier?.name?.en}
      />
    </View>
  );
  const HeaderLeft = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={arrowBack} style={styles.arrowBack} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {RNHeader(HeaderTitle, HeaderLeft)}
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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
              treatmentReason={treatmentReason ?? []}
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
            <Text title={t('no_fee')} numberOfLines={1} style={styles.text} />
          )}
        </ScrollView>
      </View>
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
  },
  header: {
    backgroundColor: colors.white,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.sideMargin),
    paddingTop: getHeight(dimens.marginS + 3),
    width: '100%',
    marginLeft: getWidth(50),
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS - 1),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: 'contain',
  },
  specialist: {
    fontSize: getWidth(fontSize.textXl),
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
