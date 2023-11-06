import UserPaymentView from 'components/client/registration/views/UserPaymentView';
import Input from 'components/common/Input';
import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { OrderDetail } from 'libs/types/UserType';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
interface SummaryViewProps {
  setShowSummary: (value: boolean) => void;
  order: OrderDetail;
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
}
const SummaryView = ({ setShowSummary, order, setOrder }: SummaryViewProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { orderDetails, setOrderDetails } = UseClientUserContext();
  console.log('arrivalRef.current.value', order);
  const arrivalRef = React.useRef<any>('');
  const totalPrice: number = order?.services.reduce(
    (total, item) => total + parseInt(item.price, 10),
    0,
  );

  function calculateAgeFromDate(dateString: string) {
    const parts = dateString.split(' ');
    if (parts.length < 4) {
      return NaN;
    }
    const year = parseInt(parts[3], 10);
    const currentDate = new Date();
    if (isNaN(year)) {
      return NaN;
    }
    const age = currentDate.getFullYear() - year;
    return age;
  }

  const paymentModal = () => (
    <Modal
      backdropColor={colors.white}
      backdropOpacity={1}
      isVisible={isVisible}
      style={styles.modalContainer}
    >
      <View style={styles.paymentContainer}>
        <UserPaymentView isFromHome={true} />
      </View>
    </Modal>
  );
  return (
    <>
      <KeyboardAvoidingView
        behavior={'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 70}
        style={{ flex: 0.97 }}
      >
        <View style={styles.textContainer}>
          <Text title={'Order summary'} style={styles.summaryText} />
          <TextButton
            title={'Edit order'}
            fontSize={getHeight(fontSize.textL)}
            isActive
            onPress={() => setShowSummary(false)}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.patientAndAddress}>
            <Text title={'The patient '} style={styles.text} />
            <Text
              title={`${calculateAgeFromDate(order?.patient_type?.age)} y.o, ${
                order?.phonenumber
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
        <View style={styles.symptomsContainer}>
          <Text title={'Symptoms '} style={styles.symptomsText} />
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
        <Text title={'Services'} style={styles.text} />
        {order?.services.map((item, index) => (
          <Text
            key={index}
            title={item?.name?.en + ' ' + item?.price}
            style={styles.voltaireText}
          />
        ))}
        <View style={{ flexDirection: 'row' }}>
          <Text title={'Total - '} style={styles.total} />
          <Text title={`${totalPrice} NIS`} style={styles.Small} />
        </View>
        <Text
          title={'*If the doctor won’t use your shot, you won’t pay for it'}
          style={styles.payForIt}
        />
        <View style={styles.cardDetail}>
          <Text title={'Paid by card *4545'} style={styles.text} />
          <TextButton
            title={'Change'}
            fontSize={getHeight(fontSize.textL)}
            isActive
            style={styles.changeText}
            onPress={() => setIsVisible(true)}
          />
        </View>
        <Text title={'Estimated arrival'} style={styles.text} />
        <Text title={'60 min'} style={styles.textSmall} />
        <View style={styles.instructionContainer}>
          <Text title={'Instructions for arrival'} style={styles.instruction} />
          <Input
            placeholder={'Describe where is the entrance etc.'}
            inputValue={order?.Instructions_for_arrival}
            defaultValue={order?.Instructions_for_arrival}
            inputStyle={styles.description}
            ref={arrivalRef}
            onChangeText={(value: string) => (arrivalRef.current.value = value)}
            onSubmitEditing={() =>
              setOrder({
                ...order,
                Instructions_for_arrival: arrivalRef.current.value,
              })
            }
            placeholderStyle={styles.textSmall}
          />
        </View>
        {isVisible && paymentModal()}
      </KeyboardAvoidingView>
    </>
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
  },
  payForIt: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getHeight(dimens.borderBold),
  },
  cardDetail: {
    flexDirection: 'row',
    gap: getWidth(dimens.imageS),
    marginTop: getWidth(dimens.marginM),
    marginBottom: getWidth(dimens.marginM),
  },
  instructionContainer: {
    gap: getWidth(dimens.marginS),
  },
  instruction: {
    fontSize: getWidth(fontSize.textL),
    marginTop: getWidth(dimens.marginM),
    fontFamily: fontFamily.medium,
  },
  description: {
    height: getHeight(dimens.imageS + dimens.marginS),
    backgroundColor: colors.white,
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
  },
  locationText: {
    fontSize: getWidth(fontSize.textM),
    width: '60%',
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  voltarenText: {
    marginVertical: getWidth(3),
    fontSize: getWidth(fontSize.textM),
  },
  paymentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-start',
  },
});
