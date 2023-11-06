import AddAddress from 'components/common/AddAddress';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import { LoaderSmall } from 'components/common/Loader';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { Reason, TreatmentMenu, treatment } from 'libs/types/ProvierTypes';
import { OrderDetail } from 'libs/types/UserType';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import OrderFormController from './OrderFormController';

const OrderFormView = ({
  treatmentReason,
  setOrder,
  order,
}: {
  treatmentReason: treatment;
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  order: OrderDetail;
}) => {
  const { t } = useTranslation();
  const {
    activeButton,
    onSelectReasons,
    setIsModalVisible,
    isModalVisible,
    otherReasons,
    handleItemPress,
    activeCheckbox,
    setIsVisible,
    isMeSelected,
    toggleMe,
    isSubmitDetail,
    calculateAgeFromDate,
    ageRef,
    onChangeAge,
    phoneRef,
    onChangePhone,
    onSubmitDetail,
    isVisible,
  } = OrderFormController({ setOrder, order });

  const getReasonsView = () => (
    <>
      <Text title={'Reason'} style={styles.reasonText} />
      <View style={styles.buttonContainer}>
        {treatmentReason?.reason?.length ? (
          treatmentReason?.reason.map((item: Reason, index: number) => (
            <Button
              key={index}
              title={item.name?.en}
              isSmall
              isPrimary={activeButton?.includes?.(item?.reason_id)}
              onPress={() => onSelectReasons(item)}
              width={'30%'}
              fontSized={getHeight(fontSize?.textM)}
              height={getHeight(dimens?.marginL)}
              borderRadius={getWidth(dimens?.marginS)}
              lineHeight={dimens?.sideMargin + dimens?.borderBold}
            />
          ))
        ) : (
          <LoaderSmall style={styles.loader} />
        )}
        <Button
          title={'Other'}
          fontSized={getHeight(fontSize.textM)}
          height={getHeight(dimens.marginL)}
          borderRadius={getWidth(dimens.marginS)}
          lineHeight={dimens.sideMargin + dimens.borderBold}
          onPress={() => setIsModalVisible(true)}
        />
        <Text
          title={
            "*We don't do emergency calls. In case of emergency please call 077-773-45-69"
          }
          style={styles.textSmall}
        />
      </View>

      <Modal
        backdropColor={colors.white}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <Input
          placeholder={'Describe where is the entrance etc.'}
          inputValue={otherReasons?.current?.value}
          multiline
          numberOfLines={4}
          inputStyle={styles.description}
          isDescription
          defaultValue={otherReasons?.current?.value}
          ref={otherReasons}
          onChangeText={(value: string) => (otherReasons.current.value = value)}
          onSubmitDescription={() => {
            setOrder({
              ...order,
              Additional_notes: otherReasons?.current?.value,
            });
          }}
        />
      </Modal>
    </>
  );
  const getTreatmentsView = () => (
    <>
      <Text title={'Treatments menu'} style={styles.reasonText} />
      {(treatmentReason?.treatmentMenu?.length ?? 0) > 0 ? (
        treatmentReason?.treatmentMenu?.map(
          (item: TreatmentMenu, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.checkboxContainer}
              onPress={() => handleItemPress(item, index)} // Call the function with the item
            >
              <View style={styles.checkBox}>
                {activeCheckbox.includes(item?.menu_id) && (
                  <Image
                    source={require('assets/icon/check.png')}
                    style={styles.image}
                  />
                )}
              </View>
              <Text>{item.name.en}</Text>
            </TouchableOpacity>
          ),
        )
      ) : (
        <LoaderSmall style={styles.loader} />
      )}
      <Text
        title={"*If the doctor won't use your shot, you won't pay for it"}
        style={{ ...styles.textSmall, marginBottom: getHeight(dimens.marginL) }}
      />
    </>
  );

  const getAddressView = () => (
    <>
      <Text title={'Address'} style={styles.addressText} />
      <View style={styles.locationContainer}>
        <Image
          source={require('../../../assets/icon/location.png')}
          style={styles.locationIcon}
        />
        <Text style={styles.streetAddress} title={order?.address ?? ''} />
        <TextButton
          title={'Edit'}
          fontSize={getHeight(fontSize.textM)}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </>
  );

  const getHeaderView = () => (
    <>
      <Text style={styles.headingText} title={'For whom is the doctor?'} />
      <View style={styles.button}>
        <Button
          title={'Me'}
          isPrimary={isMeSelected}
          isSmall
          width={'12%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => toggleMe('me')}
        />
        <Button
          title={
            isSubmitDetail
              ? `${calculateAgeFromDate(order?.patient_type?.age)}y.o., ${
                  order?.phonenumber
                }`
              : 'Someone else'
          }
          isPrimary={!isMeSelected}
          isSmall
          width={'40%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => toggleMe('other')}
        />
      </View>
    </>
  );

  return (
    <>
      {getHeaderView()}
      {isSubmitDetail || isMeSelected ? (
        getAddressView()
      ) : (
        <View style={styles.inputContainer}>
          <Input
            ref={ageRef}
            onChangeText={onChangeAge}
            placeholderTextColor={colors.disabledText}
            inputPlaceholder="Their age *"
            style={styles.textInput}
            defaultValue={ageRef?.current?.value}
            maxLength={dimens.borderBold}
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            returnKeyType={'next'}
            onSubmitEditing={() => phoneRef.current.focus()}
          />
          <Input
            ref={phoneRef}
            placeholderTextColor={colors.disabledText}
            inputPlaceholder="Their phone number"
            style={styles.textInput}
            onChangeText={onChangePhone}
            defaultValue={phoneRef?.current?.value}
            maxLength={dimens.marginS}
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            returnKeyType={'done'}
          />
          <TouchableOpacity
            style={styles.arrowIconContainer}
            onPress={onSubmitDetail}
          >
            <Image
              source={require('../../../assets/icon/arrowNext.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {getReasonsView()}
      {getTreatmentsView()}
      <AddAddress
        address={(address: string) => {
          setOrder({
            ...order,
            address: address,
          });
          setIsVisible(false);
        }}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        defaultValue={order?.address}
      />
    </>
  );
};

export default OrderFormView;

const styles = StyleSheet.create({
  headingText: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.paddingS),
  },
  addressText: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getHeight(dimens.marginL),
  },
  reasonText: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
  },
  textSmall: {
    fontSize: getWidth(fontSize.textS),
  },
  checkBox: {
    width: getWidth(dimens.sideMargin + dimens.borderBold),
    height: getWidth(dimens.sideMargin + dimens.borderBold),
    borderRadius: getWidth(dimens.borderThin),
    borderWidth: getWidth(dimens.borderThin),
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    borderWidth: getWidth(dimens.borderThin),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.disabled,
    flexDirection: 'row',
    paddingVertical: getHeight(dimens.paddingXs + dimens.borderBold),
    marginBottom: getHeight(dimens.marginL),
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: getWidth(dimens.marginS + dimens.borderBold),
    marginBottom: getHeight(dimens.marginL),
  },
  checkboxContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.paddingL),
    alignItems: 'center',
    marginBottom: getHeight(dimens.sideMargin),
  },
  button: {
    flexDirection: 'row',
    gap: getWidth(dimens.paddingL + dimens.borderBold),
  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
    marginLeft: getWidth(dimens.marginS),
  },
  inputContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.primary,
    paddingHorizontal: getWidth(10),
    paddingBottom: getWidth(10),
    marginVertical: getHeight(14),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: 'center',
  },
  textInput: {
    borderBottomWidth: getHeight(dimens.borderThin),
    borderBottomColor: colors.disabledText,
    width: '100%',
    color: colors.grey,
  },
  arrowIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: getWidth(dimens.borderBold + dimens.borderBold),
  },
  description: {
    height: getHeight(117),
  },
  image: {
    width: getWidth(dimens.paddingS),
    height: getHeight(dimens.paddingS),
    resizeMode: 'contain',
  },
  streetAddress: {
    paddingHorizontal: getWidth(dimens.sideMargin),
    fontSize: getWidth(fontSize.textM),
    flex: 0.97,
  },
  inputStyle: {
    borderWidth: 0,
    width: '90%',
    backgroundColor: colors.white,
  },
  loader: {
    paddingVertical: getHeight(20),
  },
});
