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
interface SummaryViewProps {
  setShowSummary: (value: boolean) => void;
  order: OrderDetail;
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
}
const SummaryView = ({ setShowSummary, order, setOrder }: SummaryViewProps) => {
  const {
    isVisible,
    calculateAgeFromDate,
    totalPrice,
    setIsVisible,
    arrivalRef,
  } = SummaryViewController({ order });
  const { userProfile } = UseClientUserContext();
  const { t } = useTranslation();

  const paymentModal = () => (
    <Modal
      backdropColor={colors.white}
      backdropOpacity={1}
      isVisible={isVisible}
      style={styles.modalContainer}
    >
      <View style={styles.paymentContainer}>
        <UserPaymentView
          isFromHome={true}
          onPress={() => setIsVisible(false)}
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
          )} y.o, ${
            !order?.isOrderForOther
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
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {order?.reason.map((item, index) => (
          <Text
            key={index}
            title={item.length <= 1 ? item.name.en : `${item.name.en},`}
            style={styles.textSmall}
          />
        ))}
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
            item?.name?.en.charAt(0).toUpperCase() +
            item?.name?.en.slice(1) +
            ' - ' +
            item?.price
          }
          style={styles.voltaireText}
        />
      ))}
      <View style={{ flexDirection: 'row' }}>
        <Text title={t('total')} style={styles.total} />
        <Text title={`${totalPrice} NIS`} style={styles.Small} />
      </View>
      <Text
        title={t('if_the_doctor')}
        style={styles.payForIt}
        numberOfLines={1}
      />
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
    <KeyboardAvoidingView
      behavior={'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
    >
      {getSummaryHeader()}
      {getPersonalDetail()}
      {SymptomsView()}
      {getServicesView()}
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
          numberOfLines={2}
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
    fontSize: fontSize.textXl,
    fontFamily: fontFamily.medium,
  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
  },
  text: {
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  changeText: {
    fontSize: getWidth(fontSize.textL),
  },
  symptomsText: {
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.medium,
  },
  symptomsContainer: {
    marginBottom: getWidth(dimens.marginM),
  },
  locationContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.marginS + 5),
    marginBottom: 10,
    alignItems: 'center',
  },
  voltaireText: {
    marginVertical: 5,
    fontSize: fontSize.textM,
    textAlign: 'left',
  },
  payForIt: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getHeight(dimens.borderBold),
  },
  cardDetail: {
    flexDirection: 'row',
    gap: getWidth(dimens.imageXs + 4),
    marginTop: getWidth(dimens.marginM),
    marginBottom: getWidth(dimens.marginM),
  },
  instructionContainer: {
    gap: getWidth(dimens.paddingXs),
    marginBottom: getHeight(dimens.imageS + dimens.marginM),
  },

  instruction: {
    fontSize: getWidth(fontSize.textL),
    marginTop: getWidth(dimens.marginM),
    fontFamily: fontFamily.medium,
    textAlign: 'left',
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginS),
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: getWidth(dimens.marginM),
    marginBottom: getWidth(dimens.marginM),
    justifyContent: 'space-between',
  },
  patientAndAddress: {
    flexDirection: 'column',
    width: '50%',
  },
  total: {
    fontFamily: fontFamily.medium,
    fontSize: getWidth(fontSize.textM),
    marginVertical: 4,
  },
  Small: {
    fontSize: getWidth(fontSize.textM),
    fontFamily: fontFamily.light,
    marginVertical: 4,
  },
  textSmall: {
    fontSize: getWidth(fontSize.textM),
    fontFamily: fontFamily.light,
    backgroundColor: colors.white,
    marginTop: 2,
    textAlign: 'left',
  },
  locationText: {
    fontSize: getWidth(fontSize.textM),
    width: '60%',
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
    marginTop: getHeight(-20),
    paddingLeft: getWidth(10),
    fontFamily: fontFamily.regular,
    color: colors.black,
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
