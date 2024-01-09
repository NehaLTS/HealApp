import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Loader, { LoaderLarge } from 'components/common/Loader';
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
import { useTranslation } from 'react-i18next';
import Animated, { FadeInUp } from 'react-native-reanimated';

const OrderHistory = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { OnGetOrderHistory } = AuthServicesProvider();
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
  console.log('userId', userId);
  const chunkSize = 10;
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderHistory, setOrderHistory] = React.useState<OrderList[]>([]);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(0);
  const [allDataLoaded, setAllDataLoaded] = React.useState(false);

  console.log('index+++++', startIndex, endIndex);
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
      title={showDetail?.isVisible ? t('order_details') : t('order_history')}
    />
  );

  const RenderItem = ({
    item,
    index,
    onPress,
  }: {
    item: OrderList;
    index: number;
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

  const getOrderHistory = async (isLoading: boolean) => {
    try {
      if (allDataLoaded === false) {
        setIsLoading(isLoading);
        const res = await OnGetOrderHistory(
          Number(userId),
          startIndex,
          endIndex,
        );
        console.log('res history', res);
        console.log('length', res?.length);
        if (!res?.message) {
          setOrderHistory([...orderHistory, ...res]);
          setStartIndex(endIndex + 1);
          setEndIndex(endIndex + chunkSize);
        } else if (res?.message) {
          setAllDataLoaded(true);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useMemo(() => {
    getOrderHistory(true);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      {showDetail?.isVisible === false ? (
        orderHistory?.length === 0 ? (
          isLoading ? (
            <Loader />
          ) : (
            <Text style={styles.noHistoryText} title={t('no_history_found')} />
          )
        ) : (
          <FlatList
            keyboardShouldPersistTaps="always"
            data={orderHistory}
            horizontal={false}
            style={{ flex: 1 }}
            contentContainerStyle={styles.containerStyle}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={() => getOrderHistory(false)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              !isLoading && !allDataLoaded ? (
                <View style={styles.loaderContainer}>
                  <Loader isSmall />
                </View>
              ) : null
            }
            renderItem={({ item, index }) => (
              <RenderItem
                item={item}
                index={index}
                onPress={() => {
                  setShowDetail({
                    isVisible: true,
                    orderId: item?.order_id?.toString(),
                    patientName: item?.patient_name,
                  });
                }}
              />
            )}
          />
        )
      ) : (
        <OrderDetail
          orderId={showDetail?.orderId ?? ''}
          patientName={showDetail?.patientName ?? ''}
        />
      )}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  arrowBack: {
    width: getHeight(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  headerContainer: {
    flexDirection: 'row',
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
    textAlign: 'left',
  },
  arrowRight: {
    width: getWidth(dimens.marginS),
    height: getHeight(dimens.sideMargin),
    resizeMode: 'center',
    transform: [{ rotate: !I18nManager.isRTL ? '180deg' : '0deg' }],
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
    paddingHorizontal: getWidth(dimens.marginM),
    paddingBottom: getHeight(dimens.marginL),
  },
  listContainer: {
    borderBottomWidth: getHeight(dimens.borderThin),
    paddingVertical: getHeight(dimens.paddingL),
    borderColor: colors.primary,
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: getHeight(dimens.buttonHeight),
  },
  loaderContainer: {
    height: getHeight(dimens.imageS),
    width: '100%',
    justifyContent: 'flex-end',
  },
});
