import mobile from 'assets/icon/mobile.png';
import waze from 'assets/icon/waze.png';
import Button from 'components/common/Button';
import { RNHeader } from 'components/common/Header';
import RNModal from 'components/common/Modal';
import SelectImage from 'components/common/SelectImage';
import ToggleButton from 'components/common/SwitchButton';
import Text, { AnimatedText } from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { createNotificationListeners } from 'libs/Notification';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderProfile, ProviderServices } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Linking,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeOutLeft,
  ZoomIn,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HomeScreenControlller from './HomeScreenController';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/common/Checkbox';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import AddNewService from 'components/common/AddNewService';
import AddAddress from 'components/common/AddAddress';
import messaging from '@react-native-firebase/messaging';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

const HomeScreen = () => {
  const localData = getLocalData('USERPROFILE');
  const available = getLocalData('USER');
  const order = getLocalData('ORDER');
  const [isAvailable, setIsAvailable] = useState(
    available?.isProviderAvailable,
  );

  const [isCancelOrder, setIsCancelOrder] = useState(
    order?.isCancelOrder ?? false,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(order?.isSeeMore ?? false);
  const [isArrived, setIsArrived] = useState(order?.isArrived ?? false);
  const [isVisibleLicense, setIsVisibleLicense] = useState(false);
  const [notification, setNotification] = useState(
    order?.isNotification ?? false,
  );
  const [isAddDocument, setIsAddDocument] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus ?? '');
  const [isShowModal, setIsShowModal] = useState(false);
  const [totalPricesOfServices, setTotalPricesOfServices] = useState('')
  const {
    acceptOrder,
    setAcceptOrder,
    OnPressTakeOrder,
    updateLocation,
    providerLocation,
  } = HomeScreenControlller();
  const modalHeight = useSharedValue(getHeight(order?.modalHeight ?? 360));
  console.log('acceptOrder', acceptOrder);
  console.log('isArrived', isArrived);
  console.log('orderStatus', orderStatus);
  console.log('isSeeMore', isSeeMore);
  console.log(
    'modalHeight11',
    modalHeight.value?.toString(),
    order?.modalHeight,
  );

  const { providerAvailabilityStatus } = AuthServicesProvider();
  const { userId, token } = UseProviderUserContext();
  const [services, setServices] = useState<any[]>([
    {
      name: order?.eventData?.services?.service_name ?? '',
      description: { en: '', hi: '', he: '' },
      price: order?.eventData?.services?.service_price ?? '',
      id: order?.eventData?.services?.menu_id ?? -1,
    },
  ]);
  const [showServices, setShowServices] = useState(false)
  const { t } = useTranslation();
  useEffect(() => {
    createNotificationListeners();
  }, []);
  // const ser = JSON.stringify(order?.eventData?.services);
  console.log('firstname++++++++++++++++', order);

  console.log('services', order?.eventData?.services);
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
      setNotification(false);
      setLocalData('ORDER', { isNotification: false, isCancelOrder: false });
    } else {
      setIsCancelOrder(false);
      setLocalData('ORDER', { isCancelOrder: false });
    }
  };

  const subscribrToTopicMessaging = () => {
    // const admin = require('firebase-admin');

    const message = {
      data: {
        type: 'warning',
        content: 'A new weather warning has been created!',
      },
      topic: 'weather',
    };
  };

  useEffect(() => {

    DeviceEventEmitter.addListener('DoctorNotification', (event) => {
      // console.log('acceptOrder', acceptOrder);
      // console.log('isArrived', isArrived);
      // console.log('orderStatus', orderStatus);
      // console.log('isSeeMore', isSeeMore);
      // setServices(order?.eventData?.services ?? [])
      if (event.notification?.title === 'Send Order') {
        setServices(event?.data?.services ?? [])
        setLocalData('ORDER', {
          services: event?.data?.services,
          providerDetail: {
            firstname: event?.data?.firstname,
            lastname: event?.data?.lastname,
            providerId: event?.data?.providerId,
          }
        })
        setTimeout(() => {
          setShowServices(true)
        }, 1000);

        console.log("event?.data?.services", event?.data?.services)

      }
      setOrderStatus(event.notification?.title);
      console.log('providerNotification **** 0000 ***** 00000', event);
      setNotification(true);
      setLocalData('ORDER', {
        isNotification: true,
        orderStatus: event.notification?.title,
      });
      if (
        event.notification?.title === 'Arrived Order' ||
        orderStatus === 'Arrived Order'
      ) {
        setTotalPricesOfServices(totalPrice())
        setIsArrived(true);
        setLocalData('ORDER', { isArrived: true });
      }
    });
    // messaging().subscribeToTopic('healApp').then((res) => console.log('Subscribed fom the topic!', res));
    // if (acceptOrder) {
    // subscribrToTopicMessaging()
    // }
    console.log('order status **********', orderStatus, isArrived);
    if (acceptOrder && !isArrived) {
      console.log('accept', acceptOrder);
      updateLocation();
    }

    return () => {
      DeviceEventEmitter.removeAllListeners('DoctorNotification');
    };
  }, [acceptOrder || isArrived || orderStatus]);

  const onPressToggle = (available: boolean) => {
    if ((localData as ProviderProfile)?.licensenumber === '') {
      setIsVisibleLicense(true);
    } else {
      setLocalData('USER', {
        isProviderAvailable: available,
      });
      setIsAvailable(available);
      const availability = available ? 1 : 0;

      providerAvailabilityStatus(
        { provider_id: userId, availability: availability.toString() },
        token,
      ).then((res) => {
        console.log('availabitity status', JSON.stringify(res), available);
      });
    }
  };
  const onPressSeeMore = () => {
    if (isSeeMore) {
      modalHeight.value = withSpring(getHeight(360));
      setIsSeeMore(false);
      setLocalData('ORDER', {
        isSeeMore: false,
        modalHeight: 360,
      });
    } else {
      modalHeight.value = withSpring(getHeight(652));
      setIsSeeMore(true);
      setLocalData('ORDER', {
        isSeeMore: true,
        modalHeight: 652,
      });
    }
  };

  const CountdownTimer = () => {
    const [seconds, setSeconds] = useState(300);
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [seconds]);

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = time % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''
        }${remainingSeconds}`;
    };

    return (
      <AnimatedText style={styles.timerText} title={formatTime(seconds)} />
    );
  };
  const totalPrice = () => {
    if (order && order?.services?.length > 0) {
      const servicesArray = JSON.parse(order?.services);

      // Calculate the total service price
      const totalServicePrice = servicesArray.reduce((total, service) => {
        // Ensure that the service_price is a number before adding it to the total
        const servicePrice = parseFloat(service.service_price) || 0;
        return total + servicePrice;
      }, 0);
      console.log('totalPrice', JSON.stringify(totalServicePrice))
      return JSON.stringify(totalServicePrice)
    } else {
      return ''
    }
  }
  const onPressCancelOrder = () => {
    setIsCancelOrder(true);
    setAcceptOrder(false);
    setIsArrived(false);
    setIsAvailable(false);
    setNotification(false);
    setIsSeeMore(false);
    modalHeight.value = withSpring(getHeight(360));
    setLocalData('USER', { isProviderAvailable: false });
    setLocalData('ORDER', {
      modalHeight: 360,
      isCancelOrder: true,
      isArrived: false,
      orderAccepted: false,
      eventData: '',
      orderStatus: '',
      isSeeMore: false,
      isNotification: false,
    });
  };

  const arrivedView = () => (
    <>
      <AnimatedText
        style={{
          ...styles.details,
          marginTop: getHeight(20),
        }}
        title={'Patient'}
        entering={FadeInLeft.duration(400).delay(500)}
      />
      {order?.providerDetail?.length || order?.providerDetail !== null &&
        <AnimatedText
          style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
          title={`${order?.providerDetail?.firstname}  ${order?.providerDetail?.lastname}`}
          entering={FadeInLeft.duration(400).delay(600)}
        />}
      <AnimatedText
        style={styles.serviceProvidedText}
        title={'Services provided'}
        entering={FadeInUp.duration(400).delay(700)}
      />
      {console.log('service in retunr', order?.services)}
      {showServices &&
        <>
          {order?.services?.length &&
            JSON.parse?.(order?.services)?.map?.((item, index) => (
              <View key={index} style={styles.servicesProvided}>
                <View style={styles.servicesLeftView}>
                  <AnimatedText
                    style={{ ...styles.smallText, minWidth: getWidth(90) }}
                    title={`${item?.service_name ?? ''}`}
                    entering={FadeInLeft.duration(400).delay(800)}
                  />
                  <AnimatedText
                    style={styles.smallText}
                    title={`${item?.service_price} NIS`}
                    entering={FadeInLeft.duration(400).delay(900)}
                  />
                </View>
                <Checkbox isWhite isChecked={true} />
              </View>
            ))}
        </>
      }
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addServiceContainer}
        onPress={() => setIsVisible(true)}
      >
        <Image
          source={require('assets/icon/addServiceWhite.png')}
          style={styles.addIcon}
        />
        <Text style={styles.textAdd}>{t('add_another_service')}</Text>
      </TouchableOpacity>
      <View style={styles.totalContainer}>
        <AnimatedText
          style={styles.smallText}
          title={'Total'}
          entering={FadeInLeft.duration(400).delay(500)}
        />
        <AnimatedText
          style={styles.totalAmount}
          title={`${totalPricesOfServices} NIS`}
          entering={FadeInLeft.duration(400).delay(500)}
        />
      </View>
      <AddNewService
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        newService={setServices}
      />
    </>
  );

  const orderDetailView = () => (
    <>
      {acceptOrder && (
        <AnimatedText
          style={{ ...styles.smallText, marginBottom: getHeight(10) }}
          title={'*Client has 5 minutes to cancel an order for free'}
          entering={ZoomIn.duration(400).delay(300)}
          numberOfLines={1}
        />
      )}

      {order &&
        order?.eventData?.symptoms?.length > 0 &&
        JSON?.parse(order?.eventData?.symptoms)?.map?.(
          (item: any, index: number) => (
            <AnimatedText
              key={index}
              style={{ ...styles.details, marginTop: getHeight(20) }}
              title={item?.name}
              entering={FadeInLeft.duration(400).delay(500)}
            />
          ),
        )}
      {order?.eventData?.services && (
        <>
          <AnimatedText
            style={{
              ...styles.details,
              borderBottomWidth: getWidth(0.5),
              borderColor: colors.offWhite,
              paddingBottom: getHeight(16),
              fontSize: getHeight(fontSize.textXl - 1),
            }}
            title={`Ordered: `}
            entering={FadeInLeft.duration(400).delay(600)}
          >
            {JSON.parse?.(order?.eventData?.services)?.map?.(
              (service: any, index: number) => (
                <AnimatedText
                  key={index}
                  style={styles.details}
                  title={
                    JSON.parse?.(order?.eventData?.services)?.length > 1
                      ? `${index !==
                        JSON.parse?.(order?.eventData?.services)?.length - 1
                        ? ` ${service?.service_name}, `
                        : ` ${service?.service_name}`
                      }`
                      : service?.service_name
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
        title={`${order?.eventData?.firstname}  ${order?.eventData?.lastname
          }    ${order?.eventData?.distance !== 'undefined'
            ? order?.eventData?.time
            : 0
          } km, ~${order?.eventData?.time !== 'undefined' ? order?.eventData?.time : 0
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
        title={order?.eventData?.address}
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
          title={'See on Waze '}
          fontSize={getHeight(fontSize.textXl)}
          style={{
            ...styles.seeOnWaze,
          }}
          onPress={onPressSeeMore}
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
      {acceptOrder && (
        <View
          style={{
            flexDirection: 'row',
            gap: getHeight(14),
            marginBottom: getHeight(dimens.marginL),
            alignItems: 'center',
          }}
        >
          <TextButton
            title={'Call the client'}
            onPress={() => {
              Linking.openURL(`tel:${order?.eventData?.phone_number}`);
            }}
            fontSize={getHeight(fontSize.textXl)}
            style={styles.seeOnWaze}
            entering={FadeInLeft.duration(400).delay(1100)}
          />
          <Animated.Image
            source={mobile}
            style={{
              width: getWidth(18),
              height: getHeight(20),
              resizeMode: 'center',
            }}
            entering={FadeInLeft.duration(400).delay(1180)}
          />
        </View>
      )}
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
          height: modalHeight.value,
        }}
      >
        {console.log(
          'height: modalHeight',
          modalHeight?.value?.toString(),
          'isSeeMore',
          isSeeMore,
        )}
        {isSeeMore && (
          <AnimatedText
            style={{
              ...styles.details,
              fontSize: getHeight(fontSize.heading),
              textAlign: 'center',
              marginBottom: 0,
            }}
            title={
              isArrived
                ? 'You arrived'
                : acceptOrder
                  ? 'Order accepted'
                  : 'You have a new order!'
            }
            entering={FadeInUp.duration(400).delay(400)}
          />
        )}
        {isArrived ? (
          arrivedView()
        ) : isSeeMore ? (
          orderDetailView()
        ) : (
          <>
            {order?.eventData?.symptoms?.length &&
              JSON.parse?.(order?.eventData?.symptoms)?.map?.(
                (item: any, index: number) => (
                  <AnimatedText
                    key={index}
                    style={{ ...styles.details, marginTop: getHeight(20) }}
                    title={item?.name}
                    entering={FadeInLeft.duration(400).delay(500)}
                  />
                ),
              )}
            {order?.eventData?.services && (
              <>
                <AnimatedText
                  style={styles.details}
                  title={`Ordered: `}
                  entering={FadeInLeft.duration(400).delay(600)}
                >
                  {JSON.parse?.(order?.eventData?.services)?.map?.(
                    (service: any, index: number) => (
                      <AnimatedText
                        key={index}
                        style={styles.details}
                        title={
                          JSON.parse?.(order?.eventData?.services)?.length > 1
                            ? `${index !==
                              JSON.parse?.(order?.eventData?.services)
                                ?.length -
                              1
                              ? ` ${service?.service_name}, `
                              : ` ${service?.service_name}`
                            }`
                            : service?.service_name
                        }
                        entering={FadeInLeft.duration(400).delay(700)}
                      />
                    ),
                  )}
                </AnimatedText>
              </>
            )}
            <AnimatedText
              style={{ ...styles.details, fontSize: getWidth(fontSize.textL) }}
              title={`${order?.eventData?.firstname}  ${order?.eventData?.lastname
                }    ${order?.eventData?.distance !== 'undefined'
                  ? order?.eventData?.time
                  : 0
                } km, ~${order?.eventData?.time !== 'undefined'
                  ? order?.eventData?.time
                  : 0
                } min`}
              entering={FadeInLeft.duration(400).delay(700)}
            />
          </>
        )}
        {!acceptOrder && (
          <TextButton
            title={isSeeMore ? t('less_details') : t('see_details')}
            fontSize={getHeight(fontSize.textXl)}
            style={styles.seeMoreButton}
            onPress={onPressSeeMore}
            entering={FadeInLeft.duration(400).delay(800)}
          />
        )}
        <View
          style={{
            ...styles.footerContainer,
            gap: acceptOrder ? getHeight(10) : getHeight(dimens.marginM),
            bottom: isArrived ? getHeight(dimens.marginL) : 0,
          }}
        >
          {(!acceptOrder || isArrived) && (
            <Button
              title={isArrived ? 'Treatment is ended' : t('take_order')}
              style={styles.takeOrderButton}
              isSmall
              width={getWidth(150)}
              height={getWidth(36)}
              fontSized={getHeight(fontSize.textL)}
              background={colors.white}
              onPress={() => {
                if (!isArrived) {
                  OnPressTakeOrder();
                  modalHeight.value = withSpring(getHeight(652));
                  setIsSeeMore(true);
                  setLocalData('ORDER', {
                    modalHeight: 652,
                    isSeeMore: true,
                  });
                } else {
                  setAcceptOrder(false);
                  setIsArrived(false);
                  setIsAvailable(false);
                  setNotification(false);
                  modalHeight.value = withSpring(getHeight(360));
                  setIsSeeMore(false);
                  setLocalData('USER', { isProviderAvailable: false });
                  setLocalData('ORDER', {
                    modalHeight: 360,
                    eventData: '',
                    orderStatus: '',
                    isSeeMore: false,
                    isNotification: false,
                    isArrived: false,
                    orderAccepted: false,
                    services: '',
                    providerDetail: null
                  });
                }
              }}
            />
          )}

          {acceptOrder && !isArrived && (
            <>
              <View style={styles.timerContainer}>
                <CountdownTimer />
              </View>
              <AnimatedText
                style={styles.smallText}
                title={t('you_have_5_minutes')}
                entering={ZoomIn.duration(400).delay(400)}
                numberOfLines={1}
              />
            </>
          )}
          {!isArrived && (
            <TextButton
              title={t('cancel_order')}
              fontSize={getHeight(fontSize.textL)}
              style={styles.cancelOrderButton}
              onPress={onPressCancelOrder}
            />
          )}
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
            width={getWidth(80)}
            height={getWidth(36)}
            fontSized={getWidth(fontSize.textL)}
            onPress={() => onConfirmCancelOrder('yes')}
          />
          <Button
            title={t('no')}
            style={styles.takeOrderButton}
            isSmall
            width={getWidth(80)}
            height={getWidth(36)}
            fontSized={getWidth(fontSize.textL)}
            onPress={() => onConfirmCancelOrder('no')}
          />
        </View>
      </View>
    </RNModal>
  );

  const getMissingDocsView = () => (
    <RNModal
      isVisible={isVisibleLicense}
      style={styles.addDocsModal}
      backdropOpacity={1}
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
          height={getWidth(36)}
          fontSized={getWidth(fontSize.textL - dimens.borderThin)}
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
    const [fadeAnim] = useState(new RNAnimated.Value(0));
    useEffect(() => {
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: false,
      }).start();
    }, [fadeAnim]);
    return (
      <RNAnimated.Text
        style={[
          isActive ? styles.isAvailable : styles.notAvailable,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {title}
      </RNAnimated.Text>
    );
  };

  return (
    <>
      {RNHeader()}
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <FadeInText title={t('not_available')} isActive={!isAvailable} />
          <ToggleButton
            onChange={onPressToggle}
            isDisabled={(localData as ProviderProfile)?.licensenumber === ''}
            defaultValue={isAvailable}
          />
          <FadeInText title={t('available')} isActive={isAvailable} />
        </View>
        <Text
          style={styles.switchToggleText}
          title={isAvailable ? t('now_you_available') : t('switch_toggle')}
        />
        {/* <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          showsTraffic
          focusable
          showsBuildings
          showsIndoors
          initialRegion={providerLocation}
          region={providerLocation}
          style={{ flex: 1 }}
        >


          {providerLocation
            &&
            (
              <Marker
                coordinate={{
                  latitude: providerLocation ? providerLocation?.latitude : parseFloat(currentLocationOfUser?.latitude),
                  longitude: providerLocation ? providerLocation?.longitude : parseFloat(currentLocationOfUser?.longitude)
                }}
              >

                <Image
                  source={require('../../assets/icon/LocationMarker.png')}
                  resizeMode="contain"
                  style={styles.locationMarker}
                />



              </Marker>
            )}
        </MapView> */}
        <View style={styles.cardContainer}>
          {isAvailable ? (
            <Text
              style={styles.middleOrderText}
              title={
                notification ? 'You have a new order!' : 'No orders ...yet'
              }
            />
          ) : (
            <>
              {DetailCard('2', 'Clients today')}
              {DetailCard('25 min', 'Average arrival time')}
              {DetailCard('560 ₪', 'My balance')}
            </>
          )}
          {getNewOrderView()}
          {getCancelOrderView()}
          {getMissingDocsView()}
        </View>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.13,
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
    padding: getWidth(dimens.marginL),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
  },
  title: {
    fontSize: getHeight(fontSize.headingL),
    color: colors.primary,
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
    fontSize: getWidth(fontSize.textL),
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
});
