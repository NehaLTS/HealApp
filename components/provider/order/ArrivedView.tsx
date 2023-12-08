import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';
import RNModal from 'components/common/Modal';
import { AnimatedText } from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated';

const ArrivedView = ({
  order,
  isModalVisible,
  onPressAddService,
  totalPricesOfServices,
  onPressTreatmentEnd,
}: {
  order: any;
  isModalVisible: boolean;
  onPressAddService: () => void;
  totalPricesOfServices: string;
  onPressTreatmentEnd: () => void;
}) => {
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
          title={'You arrived'}
          entering={FadeInUp.duration(400).delay(400)}
        />
        <AnimatedText
          style={{
            ...styles.details,
            marginTop: getHeight(20),
          }}
          title={'Patient'}
          entering={FadeInLeft.duration(400).delay(500)}
        />
        {order?.providerDetail?.length ||
          (order?.providerDetail !== null && (
            <AnimatedText
              style={{ ...styles.details, fontSize: getHeight(fontSize.textL) }}
              title={`${order?.providerDetail?.firstname}  ${order?.providerDetail?.lastname}`}
              entering={FadeInLeft.duration(400).delay(600)}
            />
          ))}
        <AnimatedText
          style={styles.serviceProvidedText}
          title={'Services provided'}
          entering={FadeInUp.duration(400).delay(700)}
        />
        {order?.services?.length &&
          JSON.parse?.(order?.services)?.map?.((item: any, index: number) => (
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addServiceContainer}
          onPress={onPressAddService}
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
            title={`${totalPricesOfServices?.toString()} NIS`}
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
            title={'Treatment is ended'}
            style={styles.takeOrderButton}
            isSmall
            width={getWidth(150)}
            height={getWidth(36)}
            fontSized={getHeight(fontSize.textL)}
            background={colors.white}
            onPress={onPressTreatmentEnd}
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
  smallText: {
    color: colors.white,
    fontSize: getHeight(fontSize.textM),
    alignSelf: 'center',
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
