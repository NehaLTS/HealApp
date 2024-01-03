import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { OrderDetails } from 'libs/types/ProvierTypes';
import { getTitle } from 'libs/utility/Utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';

const filledStar = require('assets/icon/star.png');
const unfilledStar = require('assets/icon/ratingStar.png');

const OrderDetail = ({
  orderId,
  patientName,
}: {
  orderId: string;
  patientName: string;
}) => {
  const { i18n, t } = useTranslation();
  const { OnGetOrderDetails } = AuthServicesProvider();
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState<OrderDetails | null>(
    null,
  );
  console.log('orderId123', orderId);
  const totalPrice: number | undefined = orderDetails?.modifiedServices.reduce(
    (total, item) => total + parseFloat(item?.service_price || '0'),
    0,
  );

  const parsedData = () => {
    if (orderDetails !== null) {
      return JSON.parse(orderDetails?.symptoms);
    }
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Image
        key={i}
        style={styles.star}
        source={
          i <= Number(orderDetails?.ratings ?? 0) ? filledStar : unfilledStar
        }
      />,
    );
  }
  console.log('orderDetails', orderDetails);

  const getOrderDetails = async () => {
    try {
      setIsLoading(true);
      const res = await OnGetOrderDetails(orderId);
      console.log('res1111', res);
      setOrderDetails(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useMemo(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.container}>
        <Text style={styles.clientName}>{patientName}</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.callReason}>Reason of call</Text>
          <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
            {orderDetails?.symptoms?.length &&
              parsedData()?.map?.((item: any, index: number) => (
                <Text
                  key={index}
                  title={
                    item?.name
                    // parsedData()?.length > 1
                    //   ? `${
                    //       index !== orderDetails?.symptoms?.length - 1
                    //         ? `${getTitle(item?.name, i18n)}, `
                    //         : `${getTitle(item?.name, i18n)}`
                    //     }`
                    //   : getTitle(item?.name, i18n)
                  }
                />
              ))}
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.callReason}>Services provided</Text>
          {orderDetails?.modifiedServices?.map((item, index) => {
            return (
              <View key={index} style={styles.serviceContainer}>
                <Text style={styles.serviceName}>
                  {getTitle(item?.name, i18n)}
                </Text>
                <Text>{`${item?.service_price} NIS`}</Text>
              </View>
            );
          })}
          <View style={styles.serviceContainer}>
            <Text
              style={{ ...styles.serviceName, fontFamily: fontFamily.medium }}
            >
              {t('total')}
            </Text>
            <Text>{`${totalPrice} NIS`}</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.callReason}>Address</Text>
          <Text>{orderDetails?.address}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.callReason}>Rating given</Text>
          <View style={styles.starContainer}>{stars}</View>
        </View>
      </View>
    </>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: getHeight(30),
    paddingHorizontal: getWidth(dimens.marginM),
  },
  clientName: {
    textAlign: 'center',
  },
  callReason: {
    fontSize: getHeight(fontSize.textXl),
  },
  itemContainer: {
    paddingVertical: getHeight(dimens.paddingL),
    borderBottomWidth: getHeight(1),
    borderColor: colors.primary,
    rowGap: getHeight(14),
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    minWidth: '40%',
  },
  star: {
    width: getHeight(20),
    height: getHeight(20),
    resizeMode: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(5),
  },
});
