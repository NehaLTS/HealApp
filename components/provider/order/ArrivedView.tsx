import AddNewService from 'components/common/AddNewService';
import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';
import RNModal from 'components/common/Modal';
import { AnimatedText } from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { TreatmentMenu } from 'libs/types/ProvierTypes';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';
import ProviderServices from '../registration/views/ProviderServices';

const ArrivedView = ({
  order,
  isModalVisible,
  totalPricesOfServices,
  onPressTreatmentEnd,
}: {
  order: any;
  isModalVisible: boolean;
  totalPricesOfServices: string;
  onPressTreatmentEnd: (services?: any) => void;
}) => {
  const [updatedServices, setUpdatedServices] = React.useState<any[]>(order?.OrderReceive?.services)
  const [activeCheckbox, setActiveCheckbox] = React.useState<boolean[]>([]);
  console.log("updatedServices trea", updatedServices, activeCheckbox)
  const [isVisible, setIsVisible] = React.useState(false);

  // Function to initialize checkboxes and selected items when order details are available


  useEffect(() => {
    console.log("hiii")

    if (order && order.OrderReceive && order.OrderReceive?.services?.length > 0) {
      setUpdatedServices(order.OrderReceive?.service)
      const initialCheckboxes = Array(order.OrderReceive.services.length).fill(true);
      setActiveCheckbox(initialCheckboxes);

      console.log("hiii", updatedServices)
      // Initialize selected items based on initial checkboxes
      // const initialSelectedItems = order.OrderReceive.services.filter((item, index: number) => initialCheckboxes[index]);
      // setUpdatedServices(initialSelectedItems);
    }
  }, [order]);

  // Function to handle checkbox press
  const onPressCheckBox = (item: any, index: number) => {

    console.log('order.OrderReceive?.services', order.OrderReceive?.services, updatedServices, item.menu_id)
    const updatedCheckboxes = [...activeCheckbox];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setActiveCheckbox(updatedCheckboxes);
    const orderService = JSON.parse(order.OrderReceive?.services)
    let newArray = orderService.filter(itemSelected => itemSelected.menu_id !== item.menu_id);
    // const newItem = updatedServices as unknown as any
    // if (!itemToSet) {
    //   newItem.push(orderService[index])
    //   setUpdatedServices(newItem)


    // } else {

    // }
    setUpdatedServices(newArray)
    console.log(orderService[index], newArray, "typeOf orderService change, newArray")
    // setUpdatedServices(updatedServices.filter((itemInside) => {
    //   itemInside !== item
    // }))

    // Update selected items based on checked checkboxes
    // const updatedSelectedItems = order?.OrderReceive?.services?.filter((_, i) => updatedCheckboxes[i]) ?? [];
    // setSelectedItems(updatedSelectedItems);
    // if (
    //   updatedServices.find((selectedItem) => selectedItem.menu_id === item.menu_id)
    // ) {
    //   updatedSelectedMenu = updatedServices.filter(
    //     (selectedItem) => selectedItem.menu_id !== item.menu_id,
    //   );
    // } else {
    //   updatedSelectedMenu = [...updatedServices, item];
    // }
    // Update selected items based on checkbox status
    // const updatedSelectedItems = order.OrderReceive.services.filter((item, i: number) => updatedCheckboxes[i]);
    // setUpdatedServices(updatedSelectedItems);
    console.log("updatedSelectedItems..ttt.", newArray)
  };
  const onPressAddService = () => {
    setIsVisible(true)
  }

  const AddNewServicesData = (data: any) => {
    console.log("data new services", data)

  }

  return (
    <RNModal
      coverScreen
      isVisible={isModalVisible}
      style={styles.modal}
      backdropOpacity={0.5}
      backdropColor={colors.transparent}
    >
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
          entering={FadeInLeft.duration(400).delay(500)}
        />
        {order?.order?.OrderReceive?.length ||
          (order?.OrderReceive !== null && (
            <AnimatedText
              style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
              title={`${order?.OrderReceive?.firstname}  ${order?.OrderReceive?.lastname}`}
              entering={FadeInLeft.duration(400).delay(600)}
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
                  title={`${item?.service_name ?? ''}`}
                  entering={FadeInLeft.duration(400).delay(800)}
                />
                <View style={styles.servicesLeftView}>
                  <AnimatedText
                    style={styles.smallText}
                    title={`${item?.service_price} NIS`}
                    entering={FadeInLeft.duration(400).delay(900)}
                  />
                  <Checkbox isWhite isChecked={activeCheckbox[index]} onPress={() => onPressCheckBox(item, index)} />
                </View>
              </View>
            ),
          )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addServiceContainer}
          onPress={onPressAddService}
          disabled={false}
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
            entering={FadeInLeft.duration(400).delay(500)}
          />
          <AnimatedText
            style={styles.totalAmount}
            title={`${Number(parseFloat(totalPricesOfServices).toFixed(5))?.toString()} NIS`}
            entering={FadeInLeft.duration(400).delay(500)}
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
              console.log(updatedServices, "....updatedServices")
              onPressTreatmentEnd(updatedServices)
            }}
          />
        </View>
      </Animated.View>
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
    gap: getWidth(20),
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
});
