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
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderProfile } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Sidebar from 'components/common/Sidebar';
import useToast from 'components/common/useToast';
import { getTitle } from 'libs/utility/Utils';
import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import HomeScreenControlller from './HomeScreenController';
import ProviderConfirmation from 'components/provider/registration/views/ProviderConfirmation';

const HomeScreen = () => {
  const localData = getLocalData('USERPROFILE');
  const order = getLocalData('PROVIDERORDER');

  const { t, i18n } = useTranslation();
  console.log('order...', order);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showStillAvailable, setShowStillAvailable] = useState(false);
  const locationData = getLocalData('LOCATION');
  const { renderToast } = useToast();

  const {
    acceptOrder,

    orderAccept,
    updateLocation,
    providerDaySummary,
    servicesFromApi,
    getProviderServices,
    onPressProfileTab,
    onPressTreatmentEnd,
    showSidebar,
    setShowSidebar,
    modalHeight,
    onPressCancelOrder,
    notification,
    isAvailable,
    isSeeMore,
    onPressSeeMore,
    onConfirmCancelOrder,
    getImageUrl,
    handleAddDocument,
    onPressToggle,
    onPressUpload,
    totalPricesOfServices,
    licensePicture,
    isCancelOrder,
    isAddDocument,
    isArrived,
    setIsArrived,
    isLoading,
    showTreatmentFinished,
    setShowTreatmentFinished,
    profileOnHold,
  } = HomeScreenControlller();
  console.log('profileOnHold', profileOnHold);
  const { setUserLocation } = UseProviderUserContext();
  const eventServices =
    order && order?.OrderReceive && order?.OrderReceive?.services
      ? JSON.parse(order?.OrderReceive?.services)
      : '';

  useEffect(() => {
    setUserLocation({ ...locationData });
    createNotificationListeners();
  }, []);

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
              title={`${getTitle(item?.name, i18n)}` ?? ''}
              entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                .duration(400)
                .delay(500)}
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
            entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
              .duration(400)
              .delay(600)}
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
                            ? ` ${getTitle(service?.name, i18n)}, `
                            : ` ${getTitle(service?.name, i18n)}`
                        }`
                      : getTitle(service?.name, i18n)
                  }
                  entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                    .duration(400)
                    .delay(700)}
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
        entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
          .duration(400)
          .delay(600)}
      />
      <AnimatedText
        style={{
          ...styles.otherDetails,
          borderBottomWidth: getWidth(0.5),
          borderColor: colors.offWhite,
          paddingBottom: getHeight(16),
        }}
        title={order?.OrderReceive?.address}
        entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
          .duration(400)
          .delay(800)}
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
          entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
            .duration(400)
            .delay(1000)}
        />
        <Animated.Image
          source={waze}
          style={{
            width: getWidth(18),
            height: getHeight(20),
            resizeMode: 'center',
          }}
          entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
            .duration(400)
            .delay(1180)}
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
                    title={`${getTitle(item?.name, i18n)}` ?? ''}
                    entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                      .duration(400)
                      .delay(500)}
                  />
                ),
              )}
            {order?.OrderReceive?.services?.length && (
              <>
                <AnimatedText
                  style={styles.details}
                  title={`${t('ordered')} `}
                  entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                    .duration(400)
                    .delay(600)}
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
                                  ? ` ${getTitle(service?.name, i18n)}, `
                                  : ` ${getTitle(service?.name, i18n)}`
                              }`
                            : getTitle(service?.name, i18n)
                        }
                        entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                          .duration(400)
                          .delay(700)}
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
              entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                .duration(400)
                .delay(700)}
            />
          </>
        )}
        <TextButton
          title={isSeeMore ? t('less_details') : t('see_details')}
          fontSize={getHeight(fontSize.textXl)}
          style={styles.seeMoreButton}
          onPress={onPressSeeMore}
          entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
            .duration(400)
            .delay(800)}
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
            onPress={orderAccept}
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
      {profileOnHold && <ProviderConfirmation isVisible={profileOnHold} />}
      <View style={styles.header}>
        {headerLeft()}
        {headerRight()}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={outsideClick}
      >
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
          isLoading={isLoading}
        />
        <TakeOrderView
          order={order}
          onPressSeeMore={onPressSeeMore}
          isModalVisible={acceptOrder}
          onPressCancelOrder={onPressCancelOrder}
          isLoading={isLoading}
          onPressUpdateArrive={() => {
            updateLocation(true);
            setIsArrived(true);
            setLocalData('PROVIDERORDER', {
              orderStatus: 'Arrived',
              extraData: {
                isArrived: true,
                totalPrice: totalPricesOfServices,
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
