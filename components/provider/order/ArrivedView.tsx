import AddNewService from 'components/common/AddNewService';
import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';
import RNModal from 'components/common/Modal';
import Text, { AnimatedText } from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect } from 'react';
import {
  Alert,
  I18nManager,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import { ProviderServices } from 'libs/types/UserType';
import { getTitle } from 'libs/utility/Utils';
import { useTranslation } from 'react-i18next';
import { TreatmentMenu } from 'libs/types/ProvierTypes';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { totalPrice } from 'libs/OrderPayment';
import Loader from 'components/common/Loader';

const ArrivedView = ({
  order,
  isModalVisible,
  totalPricesOfServices,
  onPressTreatmentEnd,
  servicesFromApi,
  addAnotherService,
  isLoading,
}: {
  order: any;
  isModalVisible: boolean;
  totalPricesOfServices: string;
  onPressTreatmentEnd: (services?: any) => void;
  servicesFromApi: ProviderServices[];
  addAnotherService: () => void;
  isLoading: boolean;
}) => {
  const [activeCheckbox, setActiveCheckbox] = React.useState<boolean[]>([]);

  const [isVisible, setIsVisible] = React.useState(false);
  const { i18n } = useTranslation();
  const [orderTotalPrice, setOrderTotalPrice] = React.useState(
    totalPricesOfServices,
  );
  const [newServices, setNewServices] = React.useState();
  const { removeService, addServiceWhenTreatmentEnd } = AuthServicesProvider();
  // Function to initialize checkboxes and selected items when order details are available
  const [updatedServices, setUpdatedServices] = React.useState<any>(
    order &&
      order?.OrderReceive &&
      order?.OrderReceive?.services?.length &&
      JSON.parse?.(order?.OrderReceive?.services),
  );
  console.log(
    'updatedServices trea',
    updatedServices,
    activeCheckbox,
    'totalPricesOfServices',
    totalPricesOfServices,
  );
  useEffect(() => {
    console.log('hiii');

    if (
      order &&
      order.OrderReceive &&
      order.OrderReceive?.services?.length > 0
    ) {
      setUpdatedServices(JSON.parse?.(order?.OrderReceive?.services));
      setOrderTotalPrice(
        totalPrice(JSON.parse?.(order?.OrderReceive?.services)),
      );
      const initialCheckboxes = Array(order.OrderReceive.services.length).fill(
        true,
      );
      setActiveCheckbox(initialCheckboxes);
    }
  }, [order && order.OrderReceive]);

  // Function to handle checkbox press
  const onPressCheckBox = (item: any, index: number) => {
    console.log('order.OrderReceive?.services', updatedServices, item.menu_id);
    const updatedCheckboxes = [...activeCheckbox];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setActiveCheckbox(updatedCheckboxes);

    let newArray: any[] = [];
    if (
      updatedServices?.find(
        (selectedItem: { menu_id: any }) =>
          selectedItem.menu_id === item.menu_id,
      )
    ) {
      newArray = updatedServices.filter(
        (selectedItem: { menu_id: any }) =>
          selectedItem.menu_id !== item.menu_id,
      );
      removeService({ order_id: order.orderId, services: item.menu_id }).then(
        (res) => {
          console.log(res, 'removeServices');
        },
      );
    } else {
      newArray = [...updatedServices, item];
      addServiceWhenTreatmentEnd({
        order_id: order.orderId,
        services: item.menu_id,
      }).then((res) => {
        console.log('AddServices', res);
      });
    }

    setUpdatedServices(newArray);
    setOrderTotalPrice(totalPrice(newArray));
    console.log(newArray, 'typeOf orderService change, newArray');
  };
  const onPressAddService = () => {
    setIsVisible(true);

    addAnotherService();
  };

  const getServicesView = () => (
    <>
      <Text style={styles.textS} title={t('services_you')} />
      <View style={styles.servicesContainer}>
        {servicesFromApi?.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.containerStyle}
            style={{ height: '100%' }}
          >
            {servicesFromApi.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text
                  style={styles.serviceText}
                  title={getTitle(item?.name, i18n)}
                />
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceText} title={'$ ' + item.price} />
                  <Checkbox
                    isChecked={activeCheckbox[index]}
                    onPress={() => onPressCheckBox(item, index)}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textServices} title={t('no_services')} />
        )}
      </View>
    </>
  );
  const addAnotherSevicesModal = () => {
    return (
      <Modal visible={isVisible}>
        <View>
          {getServicesView()}
          <Button
            title={'Save'}
            style={styles.takeOrderButton}
            isSmall
            width={getHeight(150)}
            height={getHeight(36)}
            fontSized={getHeight(fontSize.textL)}
            background={colors.white}
            onPress={() => {
              setIsVisible(false);
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <RNModal
      coverScreen
      isVisible={isModalVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      backdropColor={colors.transparent}
    >
      {isLoading && (
        <View style={styles.loader}>
          <Loader isSmall color={colors.white} />
        </View>
      )}
      <Animated.View
        style={{
          ...styles.modalView,
          height: getHeight(652),
        }}
      >
        <AnimatedText
          style={{
            ...styles.details,
            fontSize: getHeight(fontSize.heading),
            textAlign: 'center',
            marginBottom: 0,
          }}
          title={t('you_arrived')}
          entering={FadeInUp.duration(400).delay(400)}
        />
        <AnimatedText
          style={{
            ...styles.details,
            marginTop: getHeight(20),
          }}
          title={t('patient_text')}
          entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
            .duration(400)
            .delay(500)}
        />
        {order?.order?.OrderReceive?.length ||
          (order?.OrderReceive !== null && (
            <AnimatedText
              style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
              title={`${order?.OrderReceive?.firstname}  ${order?.OrderReceive?.lastname}`}
              entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                .duration(400)
                .delay(600)}
            />
          ))}
        <AnimatedText
          style={styles.serviceProvidedText}
          title={t('services_provided')}
          entering={FadeInUp.duration(400).delay(700)}
        />
        {order &&
          order?.OrderReceive &&
          order?.OrderReceive?.services?.length &&
          JSON.parse?.(order?.OrderReceive?.services)?.map?.(
            (item: any, index: number) => (
              <View key={index} style={styles.servicesProvided}>
                <AnimatedText
                  style={{ ...styles.smallText }}
                  title={`${getTitle(item?.name, i18n)}`}
                  entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                    .duration(400)
                    .delay(800)}
                />
                <View style={styles.servicesLeftView}>
                  <AnimatedText
                    style={styles.smallText}
                    title={`${item?.service_price} NIS`}
                    entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
                      .duration(400)
                      .delay(900)}
                  />

                  {item.menu_id == 1 ? (
                    <Checkbox isWhite isChecked={true} onPress={() => {}} />
                  ) : (
                    <Checkbox
                      isWhite
                      isChecked={activeCheckbox[index]}
                      onPress={() => onPressCheckBox(item, index)}
                    />
                  )}
                </View>
              </View>
            ),
          )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addServiceContainer}
          onPress={onPressAddService}
          disabled={true}
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
            title={t('total_text')}
            entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
              .duration(400)
              .delay(500)}
          />
          <AnimatedText
            style={styles.totalAmount}
            title={`${orderTotalPrice} NIS`}
            entering={(I18nManager.isRTL ? FadeInRight : FadeInLeft)
              .duration(400)
              .delay(500)}
          />
        </View>
        <View
          style={{
            ...styles.footerContainer,
            gap: getHeight(dimens.marginM),
            bottom: getHeight(dimens.marginL),
          }}
        >
          <Button
            title={t('treatment_ended')}
            style={styles.takeOrderButton}
            isSmall
            width={getHeight(150)}
            height={getHeight(36)}
            fontSized={getHeight(fontSize.textL)}
            background={colors.white}
            onPress={() => {
              console.log(updatedServices, '....updatedServices');
              onPressTreatmentEnd(updatedServices);
            }}
          />
        </View>
      </Animated.View>
      {addAnotherSevicesModal()}
    </RNModal>
  );
};

export default ArrivedView;

const styles = StyleSheet.create({
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
  servicesProvided: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(dimens.marginL),
  },
  servicesLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(20),
  },
  addIcon: {
    height: getHeight(dimens.marginL),
    width: getHeight(dimens.marginL),
    resizeMode: 'contain',
  },
  textAdd: {
    fontSize: getHeight(fontSize.textL),
    color: colors.white,
  },
  smallText: {
    color: colors.white,
    fontSize: getHeight(fontSize.textM),
    alignSelf: 'center',
    textAlign: 'left',
  },
  serviceProvidedText: {
    fontSize: getHeight(20),
    textAlign: 'center',
    marginVertical: getHeight(dimens.marginL),
    marginBottom: getHeight(dimens.imageXs),
    color: colors.white,
    paddingLeft: getWidth(3),
  },
  addServiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.imageXs),
    borderTopWidth: getHeight(1),
    borderColor: colors.white,
    paddingVertical: getHeight(24),
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.marginL),
  },
  totalAmount: {
    color: colors.white,
    fontSize: getHeight(fontSize.textXl),
  },
  containerStyle: {
    paddingBottom: getHeight(dimens.marginM),
  },
  takeOrderButton: {
    backgroundColor: colors.white,
    width: getWidth(150),
    height: getWidth(36),
    alignSelf: 'center',
    paddingHorizontal: getWidth(dimens.marginM),
  },
  cancelOrderButton: {
    color: colors.white,
    alignSelf: 'center',
  },
  footerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginVertical: getHeight(dimens.paddingL),
  },
  serviceText: {
    fontSize: getHeight(fontSize.textM),
  },
  servicesContainer: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(5),
    borderColor: colors.primary,
    height: '65%',
    justifyContent: 'center',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHeight(dimens.marginS),
    paddingTop: getHeight(dimens.paddingL - dimens.borderBold),
  },
  serviceRight: {
    flexDirection: 'row',
    gap: getHeight(dimens.sideMargin - dimens.borderBold),
    alignItems: 'center',
  },
  text: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'left',
  },
  select: {
    height: getHeight(dimens.marginL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS),
  },
  textS: {
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(dimens.sideMargin),
    marginTop: getHeight(dimens.imageXs),
    textAlign: 'left',
  },
  textAuthority: {
    fontSize: getHeight(fontSize.textXl),
  },
  textServices: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
