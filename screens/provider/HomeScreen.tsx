import * as Sentry from '@sentry/react-native';
import avatar from 'assets/icon/avatar.png';
import logo from 'assets/icon/healLogo.png';
import waze from 'assets/icon/waze.png';
import Button from 'components/common/Button';
import RNModal from 'components/common/Modal';
import SelectImage from 'components/common/SelectImage';
import ToggleButton from 'components/common/SwitchButton';
import Text, { AnimatedText } from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import ArrivedView from 'components/provider/order/ArrivedView';
import TakeOrderView from 'components/provider/order/TakeOrderView';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { createNotificationListeners } from 'libs/Notification';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import { ProviderProfile } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useToast from 'components/common/useToast';
import { ProviderOrderReceive } from 'libs/types/OrderTypes';
import {
  Alert,
  DeviceEventEmitter,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInUp,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HomeScreenControlller from './HomeScreenController';
import NavigationRoutes from 'navigator/NavigationRoutes';
import RNRestart from 'react-native-restart';
import { paymentsendToApi } from 'libs/ClientOrderPayment';
import AddNewService from 'components/common/AddNewService';
import { getTitle } from 'libs/utility/Utils';
import Sidebar from 'components/common/Sidebar';

const HomeScreen = () => {
  const localData = getLocalData('USERPROFILE');
  const available = getLocalData('USER');
  const order = getLocalData('PROVIDERORDER');
  const { t, i18n } = useTranslation();
  const [isAvailable, setIsAvailable] = useState(
    available?.isProviderAvailable,
  );
  const languageRef = React.useRef<any>(i18n.language);

  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(
    order?.extraData?.isSeeMore ?? false,
  );
  const [isArrived, setIsArrived] = useState(
    order?.extraData?.isArrived ?? false,
  );
  const [isVisibleLicense, setIsVisibleLicense] = useState(false);
  const [notification, setNotification] = useState(
    order?.extraData?.isNotification ?? false,
  );
  console.log('notification', notification);
  console.log(' isNotification ', order);
  const [isAddDocument, setIsAddDocument] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus ?? '');
  const [isShowModal, setIsShowModal] = useState(false);
  const [totalPricesOfServices, setTotalPricesOfServices] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showTreatmentFinished, setShowTreatmentFinished] = useState(false);
  const [showStillAvailable, setShowStillAvailable] = useState(false);
  const locationData = getLocalData('LOCATION');

  const { showToast, renderToast } = useToast();
  console.log('showStillAvailable', showStillAvailable);
  console.log('showTreatmentFinished', showTreatmentFinished);
  const {
    acceptOrder,
    setAcceptOrder,
    OnPressTakeOrder,
    updateLocation,
    providerLocation,
    navigation,
    TreatementEnded,
    providerDaySummary,
    getSummaryofDay,
    setProviderProfile,
    servicesFromApi,
    getProviderServices,
    onPressProfileTab,
    showSidebar,
    setShowSidebar,
  } = HomeScreenControlller();
  const modalHeight = useSharedValue(
    getHeight(order?.extraData?.modalHeight ?? 360),
  );
  const { providerAvailabilityStatus } = AuthServicesProvider();
  const { userId, token, providerProfile, setUserLocation } =
    UseProviderUserContext();
  console.log('order?.OrderReceive?.services', order?.OrderReceive?.services);
  const eventServices =
    order && order?.OrderReceive && order?.OrderReceive?.services
      ? JSON.parse(order?.OrderReceive?.services)
      : '';
  const [services, setServices] = useState<any[]>([
    {
      name: eventServices?.service_name?.en ?? '',
      description: { en: '', hi: '', he: '' },
      price: eventServices?.services?.service_price ?? '',
      id: eventServices?.services?.menu_id ?? -1,
    },
  ]);

  useEffect(() => {
    setUserLocation({ ...locationData });
    createNotificationListeners();
  }, []);
  // const ser = JSON.stringify(order?.eventData?.services);
  console.log('firstname++++++++++++++++', order);
  // Sentry.captureMessage(
  //   `Provider notification order data for:-${providerProfile?.firstName}---- ${order}`,
  // );

  console.log('services', eventServices.services);
  const getImageUrl = (url: string) => setLicensePicture(url);
  const onPressUpload = () => {
    if (licensePicture?.length) {
      setLocalData('USERPROFILE', {
        licensepicture: licensePicture,
      });
      setIsAvailable(true);
      setLocalData('USER', { isProviderAvailable: true });
      setIsAddDocument(false);
      setIsVisibleLicense(false);
    }
  };

  const handleAddDocument = () => {
    setIsAddDocument(true);
  };
  const onConfirmCancelOrder = (pressOn: string) => {
    if (pressOn === 'yes') {
      setIsCancelOrder(false);
      setAcceptOrder(false);
      setIsArrived(false);
      // setIsAvailable(false);
      setNotification(false);
      setIsSeeMore(false);
      modalHeight.value = withSpring(getHeight(360));
      // setLocalData('USER', { isProviderAvailable: false });

      setLocalData('PROVIDERORDER', {
        extraData: {
          modalHeight: 360,
          isCancelOrder: true,
          isArrived: false,
          orderAccepted: false,
          isSeeMore: false,
          isNotification: false,
        },
        orderStatus: '',
        OrderReceive: {} as ProviderOrderReceive,
      });
    } else {
      setIsCancelOrder(false);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isCancelOrder: false,
        },
      });
    }
  };

  useEffect(() => {
    // onConfirmCancelOrder('yes');
    DeviceEventEmitter.addListener('ProviderOrderListener', (event) => {
      console.log('status of event', event?.data?.status);
      console.log(
        'providerNotification **** 0000 ***** 00000',
        JSON.stringify(event),
      );
      // console.log('isArrived', isArrived);
      // console.log('orderStatus', orderStatus);
      // console.log('isSeeMore', isSeeMore);
      // setServices(order?.eventData?.services ?? [])
      // Sentry.captureMessage(
      //   `Provider notification event first time for:-${providerProfile?.firstName}---- ${event}`,
      // );
      if (event.data?.status === 'Payment Done') {
        // setIsCancelOrder(false);
        // setAcceptOrder(false);
        // setIsArrived(false);
        // setIsAvailable(false);
        setNotification(false);
        // setIsSeeMore(false);
        // setShowTreatmentFinished(false);
        // modalHeight.value = withSpring(getHeight(360));
        // setLocalData('USER', { isProviderAvailable: false });

        // setLocalData('PROVIDERORDER', {
        //   extraData: {
        //     modalHeight: 360,
        //     isCancelOrder: true,
        //     isArrived: false,
        //     orderAccepted: false,
        //     isSeeMore: false,
        //     isNotification: false,
        //   },
        //   orderStatus: '',
        //   OrderReceive: {} as ProviderOrderReceive,
        // });
        showToast('Payment Done!', 'Your Payment is done ', '');
      }
      if (event.data?.status === 'Order created') {
        setServices(event?.data?.services ?? []);
        setLocalData('PROVIDERORDER', {
          OrderReceive: {
            address: event.data.address,
            firstname: event.data.firstname,
            lastname: event.data.lastname,
            phone_number: event.data.phone_numbe,
            providerId: event.data.providerId,
            distance: event.data.distance,
            symptoms: event.data.symptoms,
            services: event.data.services,
            time: event.data.time,
          },
          latitude: event.data.latitude,
          longitude: event.data.longitude,
          orderId: event.data.orderId,
        });

        console.log('event?.data?.services', event?.data?.services);
        setNotification(true);
      }
      setOrderStatus(event.data?.status);

      setLocalData('PROVIDERORDER', {
        // extraData: {
        //   isNotification: true,
        // },
        orderStatus: event.data.status,
      });
      if (event.data.status === 'Arrived' || orderStatus === 'Arrived Order') {
        console.log('event.data.status', event.data.status);
        setTotalPricesOfServices(totalPrice());
        setIsArrived(true);
        setLocalData('PROVIDERORDER', {
          orderStatus: event.data.status,
          extraData: {
            isArrived: true,
            totalPrice: totalPrice(),
          },
        });
      }
    });

    console.log('PROVIDERORDER', JSON.stringify(order));
    console.log('order status **********', orderStatus, isArrived);
    if (acceptOrder && !isArrived) {
      console.log('accept', acceptOrder);
      updateLocation();
    }

    return () => {
      DeviceEventEmitter.removeAllListeners('OrderListener');
    };
  }, [acceptOrder || isArrived || orderStatus]);

  useEffect(() => {
    getSummaryofDay();
  }, [orderStatus === 'Payment Done']);
  const onPressToggle = (available: boolean, isLogout?: boolean) => {
    console.log('available', available);
    //TODO: Uncomment this code to add license number
    // if ((localData as ProviderProfile)?.licensenumber === '') {
    //   setIsVisibleLicense(true);
    // } else {
    setLocalData('USER', {
      isProviderAvailable: available,
    });
    setIsAvailable(available);
    const availability = available ? 1 : 0;

    providerAvailabilityStatus(
      { provider_id: userId, availability: availability.toString() },
      token,
    ).then((res) => {
      Sentry.captureMessage(
        `first notification available status for:-${providerProfile?.firstName}---- ${res}`,
      );
      console.log('availabitity status', JSON.stringify(res), available);
    });
    if (!isLogout) {
      getSummaryofDay();
    }
    // }
  };

  const onLogoutButtonPress = () => {
    onPressToggle(false, true);
  };

  const onPressSeeMore = () => {
    if (isSeeMore) {
      modalHeight.value = withSpring(getHeight(360));
      setIsSeeMore(false);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isSeeMore: false,
          modalHeight: 360,
        },
      });
    } else {
      modalHeight.value = withSpring(getHeight(652));
      setIsSeeMore(true);

      setLocalData('PROVIDERORDER', {
        extraData: {
          isSeeMore: true,
          modalHeight: 652,
        },
      });
    }
  };

  const totalPrice = (services?: any) => {
    if (order && eventServices?.length > 0) {
      const servicesArray = services ?? eventServices;

      // Calculate the total service price
      const totalServicePrice = servicesArray.reduce(
        (total: number, service: { service_price: string }) => {
          // Ensure that the service_price is a number before adding it to the total
          const servicePrice = parseFloat(service.service_price) || 0;
          return total + servicePrice;
        },
        0,
      );
      console.log('totalPrice', JSON.stringify(totalServicePrice));
      return JSON.stringify(totalServicePrice);
    } else {
      return '';
    }
  };
  const onPressCancelOrder = () => {
    setIsCancelOrder(true);
  };
  const onPressTreatmentEnd = async (services?: any) => {
    if (!isArrived) {
      OnPressTakeOrder();
      modalHeight.value = withSpring(getHeight(652));
      setIsSeeMore(true);

      setLocalData('PROVIDERORDER', {
        extraData: {
          modalHeight: 652,
          isSeeMore: true,
        },
      });
    } else {
      const shotAmounts = parseFloat(totalPrice(services)) - 500;
      const amount = paymentsendToApi(500, shotAmounts);
      console.log(amount, 'amount at treatment end');
      await TreatementEnded({
        order_id: order?.orderId ?? '1',
        total_order_price: amount.totalAmount.toString(),
        TotalCost: amount.orderAmount.toString(),
        service_charge: amount.appAmount.toString(),
        currency: 'NIS',
        treatment_completed: 'completed',
      })
        .then((res) => {
          console.log('Treatement Ended response', res);
          if (res?.isSuccessful) {
            // onPressToggle(false);
            setShowTreatmentFinished(true);
            setAcceptOrder(false);
            setIsArrived(false);
            // setIsAvailable(false);
            setNotification(false);
            modalHeight.value = withSpring(getHeight(360));
            setIsSeeMore(false);
            // setLocalData('USER', { isProviderAvailable: false });
            setLocalData('PROVIDERORDER', {
              extraData: {
                modalHeight: 360,
                isSeeMore: false,
                isNotification: false,
                isArrived: false,
                orderAccepted: false,
              },
              orderStatus: '',
              OrderReceive: {} as ProviderOrderReceive,
            });
            Sentry.captureMessage(
              `Provider notification event TREATMENT END BUTTON PRESSED for:-${providerProfile?.firstName}----`,
            );
          }
        })
        .catch((err) => console.error('treatement ended error', err));
    }
  };

  const orderDetailView = () => (
    <>
      <AnimatedText
        style={{
          ...styles.details,
          fontSize: getHeight(fontSize.heading),
          textAlign: 'center',
          marginBottom: getHeight(20),
        }}
        title={t('new_order')}
        entering={FadeInUp.duration(400).delay(400)}
      />
      {order &&
        order?.OrderReceive?.symptoms?.length > 0 &&
        JSON?.parse(order?.OrderReceive?.symptoms)?.map?.(
          (item: any, index: number) => (
            <AnimatedText
              key={index}
              style={{ ...styles.details }}
              title={item?.name}
              entering={FadeInLeft.duration(400).delay(500)}
            />
          ),
        )}
      {order?.OrderReceive?.services?.length > 0 && (
        <>
          <AnimatedText
            style={{
              ...styles.details,
              borderBottomWidth: getWidth(0.5),
              borderColor: colors.offWhite,
              paddingBottom: getHeight(16),
              fontSize: getHeight(fontSize.textXl - 1),
            }}
            title={`${t('ordered')} `}
            entering={FadeInLeft.duration(400).delay(600)}
          >
            {JSON.parse?.(order?.OrderReceive?.services)?.map?.(
              (service: any, index: number) => (
                <AnimatedText
                  key={index}
                  style={styles.details}
                  title={
                    eventServices?.length > 1
                      ? `${
                          index !== eventServices?.length - 1
                            ? ` ${getTitle(service?.service_name, i18n)}, `
                            : ` ${getTitle(service?.service_name, i18n)}`
                        }`
                      : getTitle(service?.service_name, i18n)
                  }
                  entering={FadeInLeft.duration(400).delay(700)}
                />
              ),
            )}
          </AnimatedText>
        </>
      )}
      <AnimatedText
        style={styles.otherDetails}
        title={`${order?.OrderReceive?.firstname}  ${
          order?.OrderReceive?.lastname
        }    ${
          order?.OrderReceive?.distance !== 'undefined'
            ? order?.OrderReceive?.time
            : 0
        } km, ~${
          order?.OrderReceive?.time !== 'undefined'
            ? order?.OrderReceive?.time
            : 0
        } min`}
        entering={FadeInLeft.duration(400).delay(600)}
      />
      <AnimatedText
        style={{
          ...styles.otherDetails,
          borderBottomWidth: getWidth(0.5),
          borderColor: colors.offWhite,
          paddingBottom: getHeight(16),
        }}
        title={order?.OrderReceive?.address}
        entering={FadeInLeft.duration(400).delay(800)}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: getHeight(14),
          marginBottom: acceptOrder
            ? getHeight(dimens.marginM)
            : getHeight(dimens.marginL),
          alignItems: 'center',
        }}
      >
        <TextButton
          title={t('see_waze')}
          fontSize={getHeight(fontSize.textXl)}
          style={{
            ...styles.seeOnWaze,
          }}
          entering={FadeInLeft.duration(400).delay(1000)}
        />
        <Animated.Image
          source={waze}
          style={{
            width: getWidth(18),
            height: getHeight(20),
            resizeMode: 'center',
          }}
          entering={FadeInLeft.duration(400).delay(1180)}
        />
      </View>
    </>
  );
  const getNewOrderView = () => (
    <RNModal
      coverScreen
      isVisible={notification && isAvailable}
      style={styles.modal}
      backdropOpacity={0.5}
      backdropColor={colors.transparent}
    >
      <Animated.View
        style={{
          ...styles.modalView,
          height: modalHeight,
        }}
      >
        {isSeeMore ? (
          orderDetailView()
        ) : (
          <>
            {order?.OrderReceive?.symptoms?.length &&
              JSON.parse?.(order?.OrderReceive?.symptoms)?.map?.(
                (item: any, index: number) => (
                  <AnimatedText
                    key={index}
                    style={{ ...styles.details, marginTop: getHeight(20) }}
                    title={item?.name ?? ''}
                    entering={FadeInLeft.duration(400).delay(500)}
                  />
                ),
              )}
            {order?.OrderReceive?.services?.length && (
              <>
                <AnimatedText
                  style={styles.details}
                  title={`${t('ordered')} `}
                  entering={FadeInLeft.duration(400).delay(600)}
                >
                  {JSON.parse?.(order?.OrderReceive?.services)?.map?.(
                    (service: any, index: number) => (
                      <AnimatedText
                        key={index}
                        style={styles.details}
                        title={
                          eventServices?.length > 1
                            ? `${
                                index !== eventServices?.length - 1
                                  ? ` ${getTitle(
                                      service?.service_name,
                                      i18n,
                                    )}, `
                                  : ` ${getTitle(service?.service_name, i18n)}`
                              }`
                            : getTitle(service?.service_name, i18n)
                        }
                        entering={FadeInLeft.duration(400).delay(700)}
                      />
                    ),
                  )}
                </AnimatedText>
              </>
            )}
            <AnimatedText
              style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
              title={`${order?.OrderReceive?.firstname}  ${
                order?.OrderReceive?.lastname
              }    ${
                order?.OrderReceive?.distance !== 'undefined'
                  ? order?.OrderReceive?.time
                  : 0
              } km, ~${
                order?.OrderReceive?.time !== 'undefined'
                  ? order?.OrderReceive?.time
                  : 0
              } min`}
              entering={FadeInLeft.duration(400).delay(700)}
            />
          </>
        )}
        <TextButton
          title={isSeeMore ? t('less_details') : t('see_details')}
          fontSize={getHeight(fontSize.textXl)}
          style={styles.seeMoreButton}
          onPress={onPressSeeMore}
          entering={FadeInLeft.duration(400).delay(800)}
        />
        <View
          style={{
            ...styles.footerContainer,
            gap: acceptOrder ? getHeight(10) : getHeight(dimens.marginM),
            bottom: isArrived ? getHeight(dimens.marginL) : 0,
          }}
        >
          <Button
            title={t('take_order')}
            style={styles.takeOrderButton}
            isSmall
            width={getHeight(150)}
            height={getHeight(36)}
            fontSized={getHeight(fontSize.textL)}
            background={colors.white}
            onPress={onPressTreatmentEnd}
          />
          <TextButton
            title={t('cancel_order')}
            fontSize={getHeight(fontSize.textL)}
            style={styles.cancelOrderButton}
            onPress={onPressCancelOrder}
          />
        </View>
      </Animated.View>
    </RNModal>
  );

  const getCancelOrderView = () => (
    <RNModal
      isVisible={isCancelOrder}
      style={styles.cancelModal}
      backdropOpacity={0.4}
      animationIn={'zoomInUp'}
    >
      <View style={styles.cancelOrderView}>
        <Text style={styles.cancelOrderText} title={t('you_want_cancel')} />
        <View style={styles.buttonContainer}>
          <Button
            title={t('yes')}
            style={styles.takeOrderButton}
            isSmall
            width={getHeight(80)}
            height={getHeight(36)}
            fontSized={getHeight(fontSize.textL)}
            onPress={() => onConfirmCancelOrder('yes')}
          />
          <Button
            title={t('no')}
            style={styles.takeOrderButton}
            isSmall
            width={getHeight(80)}
            height={getHeight(36)}
            fontSized={getHeight(fontSize.textL)}
            onPress={() => onConfirmCancelOrder('no')}
          />
        </View>
      </View>
    </RNModal>
  );

  const getMissingDocsView = () => (
    <RNModal
      // isVisible={isVisibleLicense}
      isVisible={false}
      style={styles.addDocsModal}
      animationIn={'zoomInUp'}
    >
      <View
        style={{ ...styles.addDocsView, flex: isAddDocument ? 0.45 : 0.37 }}
      >
        {isAddDocument ? (
          <>
            <Text style={styles.addDocument} title={t('adding_documents')} />
            <Text title={t('upload_license')} />
            <TouchableOpacity
              activeOpacity={licensePicture ? 1 : 0.5}
              onPress={() => setIsShowModal(true)}
            >
              <Image
                source={
                  licensePicture
                    ? { uri: licensePicture }
                    : require('assets/icon/licencesIcon.png')
                }
                style={styles.selectedImage}
              />
            </TouchableOpacity>
            <SelectImage
              isShowModal={isShowModal}
              closeModal={setIsShowModal}
              imageUri={getImageUrl}
            />
          </>
        ) : (
          <>
            <Text
              style={styles.addDocsText}
              title={t('still_receive_patients_some_documents')}
            />
          </>
        )}
        <Button
          title={isAddDocument ? t('upload') : t('add_documents')}
          style={styles.takeOrderButton}
          isSmall
          isPrimary
          height={getHeight(36)}
          fontSized={getHeight(fontSize.textL - dimens.borderThin)}
          onPress={isAddDocument ? onPressUpload : handleAddDocument}
        />
      </View>
    </RNModal>
  );

  const DetailCard = (title: string, subTitle: string) => (
    <View style={styles.detailCardContainer}>
      <Text style={styles.title} title={title} />
      <Text title={subTitle} />
    </View>
  );
  const FadeInText = ({
    title,
    isActive,
  }: {
    title: string;
    isActive: boolean;
  }) => {
    return (
      <Text style={[isActive ? styles.isAvailable : styles.notAvailable]}>
        {title}
      </Text>
    );
  };

  const headerRight = () => (
    <TouchableOpacity onPressIn={() => setShowSidebar(true)}>
      <Image source={avatar} style={styles.avatar} />
    </TouchableOpacity>
  );
  const headerLeft = () => <Image source={logo} style={styles.logo} />;
  const treatmentFinished = () => (
    <>
      <Text title={t('treatment_finished')} style={styles.end} />
      <Button
        title={t('confirm')}
        isPrimary
        isSmall
        style={{ alignSelf: 'center' }}
        width={'30%'}
        fontSized={getHeight(15)}
        height={40}
        onPress={() => {
          setShowStillAvailable(true);
          setShowTreatmentFinished(false);
        }}
      />
    </>
  );
  const stillAvailable = () => (
    <>
      <Text title={t('you_stay_on_duty')} style={styles.end} />
      <Button
        title={t('ok')}
        isPrimary
        isSmall
        style={{ alignSelf: 'center' }}
        width={'20%'}
        fontSized={getHeight(15)}
        height={40}
        onPress={() => {
          setShowStillAvailable(false);
        }}
      />
    </>
  );
  const outsideClick = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };
  return (
    <>
      <Sidebar
        isVisible={showSidebar}
        onClose={() => setShowSidebar(false)}
        isProviderProfile
        onPress={onPressProfileTab}
      />
      <View style={styles.header}>
        {headerLeft()}
        {headerRight()}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={outsideClick}
      >
        {/* <View> */}
        <View style={styles.headerContainer}>
          <FadeInText title={t('not_available')} isActive={!isAvailable} />
          <ToggleButton
            onChange={onPressToggle}
            isDisabled={(localData as ProviderProfile)?.licensenumber === ''}
            defaultValue={isAvailable}
          />
          <FadeInText title={t('available')} isActive={isAvailable} />
        </View>
        {!showTreatmentFinished && !showStillAvailable && (
          <Text
            style={styles.switchToggleText}
            title={isAvailable ? t('now_you_available') : t('switch_toggle')}
          />
        )}

        <View style={styles.cardContainer}>
          {isAvailable ? (
            !showTreatmentFinished && !showStillAvailable ? (
              <>
                <Text
                  style={styles.middleOrderText}
                  title={
                    isCancelOrder
                      ? t('order_is_cancelled')
                      : notification
                      ? t('new_order')
                      : t('no_orders_yet')
                  }
                />
              </>
            ) : showTreatmentFinished ? (
              treatmentFinished()
            ) : (
              stillAvailable()
            )
          ) : (
            <>
              {DetailCard(
                providerDaySummary?.providerDetails?.orderDetails?.total_clients.toString() ??
                  '0',
                t('clients_today'),
              )}
              {DetailCard(
                providerDaySummary?.providerDetails?.orderDetails
                  ?.avg_arrival_time !== undefined
                  ? `${providerDaySummary?.providerDetails?.orderDetails?.avg_arrival_time.toString()}${' min'}`
                  : '0 min',
                t('arrival_time'),
              )}
              {DetailCard(
                providerDaySummary?.providerDetails?.walletDetails
                  ?.wallet_amount !== undefined
                  ? `${providerDaySummary?.providerDetails?.walletDetails?.wallet_amount.toString()}${' ₪'}`
                  : '0 ₪',
                t('balance'),
              )}
            </>
          )}

          {getNewOrderView()}
          {getCancelOrderView()}
          {getMissingDocsView()}
        </View>
        {/* </View> */}
        <ArrivedView
          order={order}
          isModalVisible={isArrived}
          servicesFromApi={servicesFromApi}
          totalPricesOfServices={totalPricesOfServices}
          onPressTreatmentEnd={onPressTreatmentEnd}
          addAnotherService={getProviderServices}
        />

        <TakeOrderView
          order={order}
          onPressSeeMore={onPressSeeMore}
          isModalVisible={acceptOrder}
          onPressCancelOrder={onPressCancelOrder}
          onPressUpdateArrive={() => {
            updateLocation(true);
            setIsArrived(true);
            setLocalData('PROVIDERORDER', {
              orderStatus: 'Arrived',
              extraData: {
                isArrived: true,
                totalPrice: totalPrice(),
              },
            });
          }}
        />
      </TouchableOpacity>

      {renderToast()}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  headerContainer: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.13,
    zIndex: 999,
  },
  notAvailable: {
    textAlign: 'center',
    minWidth: '25%',
    fontFamily: fontFamily.medium,
    fontSize: getHeight(fontSize.textXl),
  },
  modal: {
    justifyContent: 'flex-end',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  addDocsModal: {
    justifyContent: 'center',
  },
  cancelModal: {
    justifyContent: 'flex-end',
    flex: 0.9,
  },
  modalView: {
    minHeight: '46%',
    backgroundColor: colors.primary,
    borderTopLeftRadius: getHeight(dimens.marginL),
    borderTopEndRadius: getHeight(dimens.marginL),
    paddingHorizontal: getHeight(dimens.marginM),
    paddingTop: getWidth(dimens.paddingL),
  },
  details: {
    color: colors.white,
    marginBottom: getHeight(dimens.paddingS),
    fontSize: getHeight(fontSize.textXl),
    textAlign: 'left',
  },
  smallText: {
    color: colors.white,
    fontSize: getHeight(fontSize.textM),
    alignSelf: 'center',
  },
  otherDetails: {
    color: colors.white,
    marginBottom: getHeight(dimens.paddingS),
    fontSize: getHeight(fontSize.textL),
    paddingLeft: getWidth(3),
    textAlign: 'left',
  },
  takeOrderButton: {
    backgroundColor: colors.white,
    width: getWidth(150),
    height: getWidth(36),
    alignSelf: 'center',
    paddingHorizontal: getWidth(dimens.marginM),
  },
  seeMoreButton: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    marginTop: getHeight(dimens.marginS),
  },
  seeOnWaze: {
    color: colors.white,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  footerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: getHeight(dimens.paddingL),
  },
  cancelOrderView: {
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: getHeight(dimens.marginL),
    padding: getHeight(dimens.marginL),
    borderRightColor: colors.offWhite,
    borderRadius: getHeight(dimens.marginS),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  available: {
    minWidth: '25%',
    textAlign: 'center',
  },
  isAvailable: {
    color: colors.secondary,
    fontFamily: fontFamily.semiBold,
    minWidth: '25%',
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
  },
  cancelOrderText: {
    fontSize: getHeight(fontSize.heading),
    textAlign: 'center',
    color: colors.primary,
    fontFamily: fontFamily.medium,
  },
  cancelOrderButton: {
    color: colors.white,
    alignSelf: 'center',
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(40),
    resizeMode: 'contain',
  },
  avatar: {
    height: getHeight(45),
    width: getWidth(45),
    resizeMode: 'contain',
  },
  switchToggleText: {
    textAlign: 'center',
    flex: 0.14,
    textAlignVertical: 'center',
  },
  middleOrderText: {
    fontSize: getHeight(fontSize.heading),
    flex: 0.5,
    verticalAlign: 'middle',
  },
  detailCardContainer: {
    width: '100%',
    padding: getHeight(dimens.marginL),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
  },
  title: {
    fontSize: getHeight(fontSize.headingL),
    color: colors.primary,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  cardContainer: {
    flex: 0.73,
    gap: getHeight(dimens.marginM + dimens.paddingXs),
    paddingTop: getHeight(20),
    alignItems: 'center',
  },
  addDocsView: {
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    gap: getHeight(dimens.marginL),
    borderRadius: getHeight(dimens.marginS),
  },
  addDocsText: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  selectedImage: {
    height: getHeight(dimens.imageM / 2),
    width: getHeight(dimens.imageM / 2),
    resizeMode: 'center',
    borderRadius: getHeight(dimens.paddingS),
  },
  addDocument: {
    fontSize: getHeight(fontSize.heading - 2),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  timerContainer: {
    borderWidth: getHeight(1),
    borderColor: colors.offWhite,
    borderRadius: getHeight(50),
    height: getHeight(70),
    width: getHeight(70),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: getHeight(10),
  },
  timerText: {
    color: colors.white,
  },
  servicesProvided: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(dimens.marginL),
  },
  servicesLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    height: getHeight(dimens.marginL),
    width: getWidth(dimens.marginL),
    resizeMode: 'contain',
  },
  textAdd: {
    fontSize: getHeight(fontSize.textL),
    color: colors.white,
  },
  addServiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.imageXs),
    borderTopWidth: getWidth(1),
    borderColor: colors.white,
    paddingVertical: getHeight(24),
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginL),
  },
  totalAmount: {
    color: colors.white,
    fontSize: getHeight(fontSize.textXl),
  },
  serviceProvidedText: {
    fontSize: getHeight(20),
    textAlign: 'center',
    marginVertical: getHeight(dimens.marginL),
    marginBottom: getHeight(dimens.imageXs),
    color: colors.white,
    paddingLeft: getWidth(3),
  },
  locationMarker: {
    width: getWidth(32),
    height: getWidth(32),
  },
  dropdown: {
    position: 'absolute',
    top: getHeight(45),
    right: getHeight(0),
    backgroundColor: colors.offWhite,
    borderRadius: getHeight(5),
    borderWidth: getHeight(1),
    borderColor: colors.primary,
    padding: getHeight(10),
    width: getHeight(100),
    zIndex: 9999,
  },
  end: {
    fontSize: getHeight(fontSize.textL),
    textAlign: 'center',
    fontFamily: fontFamily.light,
    marginBottom: getHeight(dimens.marginL),
    marginTop: getHeight(dimens.marginM),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 91,
    paddingHorizontal: getHeight(20),
    paddingVertical: getWidth(10),
  },
  logout: {
    textAlign: 'center',
  },
});
