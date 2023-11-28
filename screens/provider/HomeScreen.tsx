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
import { ProviderProfile } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  DeviceEventEmitter,
  Image,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInUp,
  ZoomIn,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HomeScreenControlller from './HomeScreenController';
import { useTranslation } from 'react-i18next';
import Checkbox from 'components/common/Checkbox';

const HomeScreen = () => {
  const localData = getLocalData('USERPROFILE');
  const available = getLocalData('USER');
  const [isAvailable, setIsAvailable] = useState(
    available?.isProviderAvailable,
  );
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  // const [isOrderCanceled, setIsOrderCanceled] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [isVisibleLicense, setIsVisibleLicense] = useState(false);
  const [notification, setNotification] = useState(false);
  const [isAddDocument, setIsAddDocument] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const { acceptOrder, OnPressTakeOrder, updateLocation } =
    HomeScreenControlller();
  const { t } = useTranslation();
  useEffect(() => {
    createNotificationListeners();
  }, []);

  const modalHeight = useSharedValue(getHeight(360));

  const getImageUrl = (url: string) => setLicensePicture(url);
  const onPressUpload = () => {
    if (licensePicture?.length) {
      setLocalData('USERPROFILE', {
        licensepicture: licensePicture,
      });
      setIsAvailable(true);
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
    } else {
      setIsCancelOrder(false);
    }
  };

  useEffect(() => {
    DeviceEventEmitter.addListener('DoctorNotification', (event) => {
      setNotification(true);
    });

    const interval = setInterval(() => {
      if (acceptOrder) {
        Alert.alert('updateLocation api hit after 1 minute');
        console.log('accept', acceptOrder);
        updateLocation();
      }
    }, 100000);

    return () => {
      clearInterval(interval);
      DeviceEventEmitter.removeAllListeners('DoctorNotification');
    };
  }, [acceptOrder]);

  const onPressToggle = (available: boolean) => {
    if ((localData as ProviderProfile)?.licensenumber === '') {
      setIsVisibleLicense(true);
    } else {
      setLocalData('USER', {
        isProviderAvailable: available,
      });
      setIsAvailable(available);
    }
  };
  const onPressSeeMore = () => {
    if (isSeeMore) {
      modalHeight.value = withSpring(getHeight(360));
      setIsSeeMore(false);
    } else {
      modalHeight.value = withSpring(getHeight(652));
      setIsSeeMore(true);
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
      return `${minutes}:${
        remainingSeconds < 10 ? '0' : ''
      }${remainingSeconds}`;
    };

    return (
      <AnimatedText style={styles.timerText} title={formatTime(seconds)} />
    );
  };

  const onPressCancelOrder = () => {
    setIsCancelOrder(true);
  };

  const servicesProvided = [
    { serviceName: 'Service', price: '50' },
    { serviceName: 'Service', price: '100' },
  ];
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
      <AnimatedText
        style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
        title={'Ilana Vexler'}
        entering={FadeInLeft.duration(400).delay(600)}
      />
      <AnimatedText
        style={styles.serviceProvidedText}
        title={'Services provided'}
        entering={FadeInUp.duration(400).delay(700)}
      />
      {servicesProvided.map((item, index) => (
        <View key={index} style={styles.servicesProvided}>
          <View style={styles.servicesLeftView}>
            <AnimatedText
              style={{ ...styles.smallText, minWidth: getWidth(90) }}
              title={`${item?.serviceName} ${index}`}
              entering={FadeInLeft.duration(400).delay(800)}
            />
            <AnimatedText
              style={styles.smallText}
              title={`${item?.price} NIS`}
              entering={FadeInLeft.duration(400).delay(900)}
            />
          </View>
          <Checkbox isWhite />
        </View>
      ))}
      <TouchableOpacity activeOpacity={0.8} style={styles.addServiceContainer}>
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
          title={'410 NIS'}
          entering={FadeInLeft.duration(400).delay(500)}
        />
      </View>
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
      <AnimatedText
        style={{ ...styles.details, marginTop: getHeight(20) }}
        title={t('chest_pain')}
        entering={FadeInLeft.duration(400).delay(500)}
      />
      <AnimatedText
        style={{
          ...styles.details,
          borderBottomWidth: getWidth(0.5),
          borderColor: colors.offWhite,
          paddingBottom: getHeight(16),
          fontSize: getHeight(fontSize.textXl - 1),
        }}
        title={`Ordered voltaren shot, clacksen shot`}
        entering={FadeInLeft.duration(400).delay(600)}
      />
      <AnimatedText
        style={styles.otherDetails}
        title={`${'Ilana Vexler'}  ${'2'}km, ~${'30'}min`}
        entering={FadeInLeft.duration(400).delay(700)}
      />
      <AnimatedText
        style={styles.otherDetails}
        title={'Haifa, Zionut st. 2'}
        entering={FadeInLeft.duration(400).delay(800)}
      />
      <AnimatedText
        style={{
          ...styles.otherDetails,
          borderBottomWidth: getWidth(0.5),
          borderColor: colors.offWhite,
          paddingBottom: getHeight(16),
        }}
        title={'3 entrance from the right, 3rd floor, ap.6'}
        entering={FadeInLeft.duration(400).delay(900)}
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
      isVisible={notification && isAvailable}
      style={styles.modal}
      backdropOpacity={1}
      backdropColor={colors.transparent}
    >
      {!isSeeMore && (
        <AnimatedText
          style={{
            ...styles.details,
            fontSize: getHeight(fontSize.heading),
            textAlign: 'center',
            marginBottom: getHeight(40),
            color: colors.black,
          }}
          title={'You have a new order!'}
        />
      )}
      <Animated.View style={{ ...styles.modalView, height: modalHeight }}>
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
          <>{orderDetailView()}</>
        ) : (
          <>
            <Text style={styles.details} title={t('chest_pain')} />
            <Text
              style={styles.details}
              title={`Ordered: ${t(' voltaren_shot')}`}
            />
            <Text
              style={{ ...styles.details, fontSize: getWidth(fontSize.textL) }}
              title={`${'Ilana Vexler'}    ${'2'} km, ${'~ 30'} min`}
            />
          </>
        )}
        {!acceptOrder && (
          <TextButton
            title={isSeeMore ? t('less_details') : t('see_details')}
            fontSize={getHeight(fontSize.textXl)}
            style={styles.seeMoreButton}
            onPress={onPressSeeMore}
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
                OnPressTakeOrder();
                modalHeight.value = withSpring(getHeight(652));
                setIsSeeMore(true);
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
              fontSize={getWidth(fontSize.textL)}
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
      backdropOpacity={0.4}
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
        <View style={styles.cardContainer}>
          {DetailCard('2', 'Clients today')}
          {DetailCard('25 min', 'Average arrival time')}
          {DetailCard('560 ₪', 'My balance')}
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
});
