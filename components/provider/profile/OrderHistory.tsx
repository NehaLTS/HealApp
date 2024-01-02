import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Loader from 'components/common/Loader';
import Text from 'components/common/Text';
import OrderDetail from 'components/provider/profile/OrderDetail';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { OrderHistory as OrderList } from 'libs/types/OrderTypes';
import React from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const OrderHistory = () => {
  const navigation = useNavigation();
  const { onGetOrderHistory } = AuthServicesProvider();
  const { userId } = UseProviderUserContext();
  const [showDetail, setShowDetail] = React.useState<{
    isVisible?: boolean;
    orderId?: string;
    patientName?: string;
  }>({
    isVisible: false,
    orderId: '',
    patientName: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderHistory, setOrderHistory] = React.useState<OrderList[]>([]);

  const headerLeft = () => (
    <TouchableOpacity
      style={{
        paddingRight: getWidth(15),
        paddingVertical: getHeight(5),
      }}
      onPress={onPressBack}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text
      style={styles.title}
      title={showDetail ? 'Order details' : 'Order history'}
    />
  );

  const RenderItem = ({
    item,
    onPress,
  }: {
    item: OrderList;
    onPress: () => void;
  }) => {
    const date = new Date(item?.created_date_time);
    const formattedDate = date?.toISOString?.()?.split('T')?.[0];
    return (
      <View style={styles.listContainer}>
        <Text
          style={styles.dateTitle}
          title={formattedDate?.length ? formattedDate : ''}
        />
        <TouchableOpacity style={styles.detailContainer} onPress={onPress}>
          <View style={styles.nameContainer}>
            <Text style={styles.doctorName} title={item?.patient_name} />
            <Text title={`${item?.TotalCost} NIS`} />
          </View>
          <Image source={arrowBack} style={styles.arrowRight} />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressBack = () => {
    if (showDetail?.isVisible) {
      setShowDetail({ isVisible: false });
    } else {
      navigation.goBack();
    }
  };

  const getOrderHistory = async () => {
    try {
      setIsLoading(true);
      const res = await onGetOrderHistory(Number(userId), 1, 10);
      console.log('res', res);
      setOrderHistory(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  React.useMemo(() => {
    getOrderHistory();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      {!showDetail?.isVisible ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          data={orderHistory}
          style={{ flex: 1 }}
          contentContainerStyle={styles.containerStyle}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              onPress={() => {
                console.log('item?.orderId', item?.order_id);
                setShowDetail({
                  isVisible: true,
                  orderId: item?.order_id?.toString(),
                  patientName: item?.patient_name,
                });
              }}
            />
          )}
        />
      ) : (
        <OrderDetail
          orderId={showDetail?.orderId ?? ''}
          patientName={showDetail?.patientName ?? ''}
        />
      )}
    </>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: getWidth(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingTop: getHeight(dimens.sideMargin),
  },
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  dateTitle: {
    fontFamily: fontFamily.medium,
  },
  arrowRight: {
    transform: [{ rotate: '180deg' }],
    width: getWidth(dimens.marginS),
    height: getHeight(dimens.sideMargin),
    resizeMode: 'center',
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: getHeight(dimens.sideMargin),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    minWidth: '45%',
  },
  containerStyle: {
    paddingTop: getHeight(dimens.marginS),
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  listContainer: {
    borderBottomWidth: getHeight(dimens.borderThin),
    paddingVertical: getHeight(dimens.paddingL),
    borderColor: colors.primary,
  },
});
