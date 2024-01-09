import UserPaymentView from 'components/client/registration/views/UserPaymentView';
import Input from 'components/common/Input';
import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { OrderDetail } from 'libs/types/UserType';
import React from 'react';
import {
  Dimensions,
  I18nManager,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import SummaryViewController from './SummaryViewController';
import { useTranslation } from 'react-i18next';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { healerType } from 'libs/types/OrderTypes';
import { getTitle } from 'libs/utility/Utils';
interface SummaryViewProps {
  setShowSummary: (value: boolean) => void;
  order: OrderDetail;
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  healerDetail?: healerType;
  isHealer?: boolean;
}
const SummaryView = ({
  setShowSummary,
  order,
  setOrder,
  healerDetail,
  isHealer,
}: SummaryViewProps) => {
  const {
    isVisible,
    calculateAgeFromDate,
    totalPrice,
    setIsVisible,
    arrivalRef,
  } = SummaryViewController({ order });
  const { userProfile } = UseClientUserContext();
  const { t, i18n } = useTranslation();
  console.log('order', order?.services);

  const formatNumber = (num: number) => {
    num = parseFloat(num?.toString());
    return num.toFixed(2).replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
  };

  const serviceCharge: string = formatNumber((totalPrice ?? 0) * 0.025);

  const paymentModal = () => (
    <Modal
      backdropColor={colors.white}
      backdropOpacity={1}
      isVisible={isVisible}
      style={styles.modalContainer}
      animationInTiming={400}
      animationIn={'fadeInUp'}
    >
      <View style={styles.paymentContainer}>
        <UserPaymentView
          isFromHome={true}
          onPress={() => setIsVisible(false)}
          onPressCancel={() => setIsVisible(false)}
          isFromSummary
        />
      </View>
    </Modal>
  );

  const getSummaryHeader = () => (
    <View style={styles.textContainer}>
      <Text title={t('summary')} style={styles.summaryText} />
      <TextButton
        title={t('edit_order')}
        fontSize={getHeight(fontSize.textL)}
        isActive
        onPress={() => setShowSummary(false)}
      />
    </View>
  );

  const getPersonalDetail = () => (
    <View style={styles.rowContainer}>
      <View style={styles.patientAndAddress}>
        <Text title={t('patient')} style={styles.text} />
        <Text
          title={`${calculateAgeFromDate(
            !order?.isOrderForOther
              ? userProfile?.date_of_birth ?? ''
              : order?.patient_type?.age,
          )} y.o, ${!order?.isOrderForOther
            ? userProfile?.phoneNumber
            : order?.phonenumber
            }`}
          style={styles.textSmall}
        />
      </View>
      <View style={styles.locationContainer}>
        <Image
          source={require('../../../assets/icon/location.png')}
          style={styles.locationIcon}
        />
        <Text title={order?.address} style={styles.locationText} />
      </View>
    </View>
  );

  const SymptomsView = () => (
    <View style={styles.symptomsContainer}>
      <Text title={t('symptoms')} style={styles.symptomsText} />
      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
        {order?.reason.map((item, index) => (
          <Text
            key={index}
            title={
              order?.reason?.length > 1
                ? `${index !== order?.reason?.length - 1
                  ? `${getTitle(item?.specialty_name, i18n)}, `
                  : `${getTitle(item?.specialty_name, i18n)}`
                }`
                : getTitle(item?.specialty_name, i18n)
            }
            style={styles.textSmall}
          />
        ))}
        <Text title={order?.Additional_notes} style={styles.textSmall} />
      </View>
    </View>
  );

  const getServicesView = () => (
    <>
      <Text title={t('services')} style={styles.text} />
      {order?.services.map((item, index) => (
        <Text
          key={index}
          title={
            getTitle(item?.services_name, i18n)?.charAt(0)?.toUpperCase() +
            getTitle(item?.services_name, i18n)?.slice(1) +
            ' - ' +
            `${item?.price} NIS`
          }
          style={styles.voltaireText}
        />
      ))}
      <Text
        title={`Service charges - ${serviceCharge}`}
        style={styles.voltaireText}
      />
      <View style={{ flexDirection: 'row', alignItems: "center" }}>
        <Text title={t('total')} style={styles.total} />
        <Text
          title={`${formatNumber(
            (totalPrice ?? 0) + Number(serviceCharge),
          )} NIS`}
          style={styles.Small}
        />
      </View>
      <Text title={t('if_the_doctor')} style={styles.payForIt} />
    </>
  );

  const getCardView = () => (
    <View style={styles.cardDetail}>
      <Text
        title={
          `${t('paid_card')}${userProfile?.card_number?.slice?.(-4)}` ?? ''
        }
        style={styles.text}
      />
      <TextButton
        title={t('change')}
        fontSize={getHeight(fontSize.textL)}
        isActive
        style={styles.changeText}
        onPress={() => setIsVisible(true)}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
      {getSummaryHeader()}
      {getPersonalDetail()}
      {SymptomsView()}
      {!isHealer && getServicesView()}
      {getCardView()}
      <Text title={t('arrival')} style={styles.text} />
      <Text title={t('60_min')} style={styles.textSmall} />
      <View style={styles.instructionContainer}>
        <Text title={t('instructions_for')} style={styles.instruction} />
        <Input
          inputPlaceholder={t('describe_where')}
          inputValue={order?.Instructions_for_arrival}
          defaultValue={order?.Instructions_for_arrival}
          inputStyle={styles.description}
          placeholderTextColor={colors.grey}
          ref={arrivalRef}
          onChangeText={(value: string) => (arrivalRef.current.value = value)}
          onSubmitEditing={() =>
            setOrder({
              ...order,
              Instructions_for_arrival: arrivalRef.current.value,
            })
          }
          style={styles.placeholder}
          multiline
          returnKeyType="done"
          blurOnSubmit
        />
      </View>
      {isVisible && paymentModal()}
    </KeyboardAvoidingView>
  );
};
export default SummaryView;
const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.imageS),
  },
  summaryText: {
    fontSize: getHeight(fontSize.textXl),
    fontFamily: fontFamily.medium,
  },
  locationIcon: {
    width: getHeight(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
  },
  text: {
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  changeText: {
    fontSize: getHeight(fontSize.textL),
  },
  symptomsText: {
    fontSize: getHeight(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  symptomsContainer: {
    marginBottom: getWidth(dimens.marginM),
  },
  locationContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
  },
  voltaireText: {
    marginVertical: getHeight(4),
    fontSize: getHeight(fontSize.textM),
    textAlign: 'left',
    fontFamily: fontFamily.light,
  },
  payForIt: {
    fontSize: getHeight(fontSize.textS),
    marginTop: getHeight(6),
  },
  cardDetail: {
    flexDirection: 'row',
    gap: getWidth(dimens.imageXs + 4),
    marginTop: getWidth(dimens.marginM),
    marginBottom: getWidth(dimens.marginM),
  },
  instructionContainer: {
    gap: getWidth(dimens.paddingXs),
    marginBottom: getHeight(dimens.marginS),
  },

  instruction: {
    fontSize: getHeight(fontSize.textL),
    marginTop: getWidth(dimens.marginM),
    fontFamily: fontFamily.medium,
    textAlign: 'left',
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginS),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.marginM),
    gap: getWidth(20),
  },
  patientAndAddress: {
    flexDirection: 'column',
    minWidth: Dimensions.get('screen').width > 500 ? '29%' : '47%',
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: getHeight(fontSize.textM),
    marginVertical: getHeight(5),
  },
  Small: {
    fontSize: getHeight(fontSize.textM),
    fontFamily: fontFamily.light,
    marginVertical: getHeight(5),
  },
  textSmall: {
    fontSize: getHeight(fontSize.textM),
    fontFamily: fontFamily.light,
    backgroundColor: colors.white,
    marginTop: getHeight(dimens.borderBold),
    textAlign: 'left',
  },
  locationText: {
    fontSize: getHeight(fontSize.textM),
    width: '55%',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-start',
  },
  placeholder: {
    paddingLeft: getWidth(dimens.marginS),
    fontFamily: fontFamily.regular,
    color: colors.black,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
