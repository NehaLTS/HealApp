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
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import OrderFormController from './OrderFormController';
import { fontFamily } from 'designToken/fontFamily';
import { useTranslation } from 'react-i18next';

const OrderFormView = ({
  treatmentReason,
  setOrder,
  order,
}: {
  treatmentReason: treatment[];
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  order: OrderDetail;
}) => {
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
    onChangeAddress,
    onSubmitDescription,
  } = OrderFormController({ setOrder, order });
  const { t } = useTranslation();

  const getReasonsView = () => (
    <>
      <Text title={t('reason')} style={styles.reasonText} />
      <View style={styles.buttonContainer}>
        {(treatmentReason as unknown as treatment)?.reason?.length ? (
          (treatmentReason as unknown as treatment)?.reason.map(
            (item: Reason, index: number) => (
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
            ),
          )
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
        <Text title={t('we_don’t')} style={styles.textSmall} />
      </View>
      <View style={styles.divider} />
      <Modal
        backdropColor={colors.white}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ flex: 0.93 }}
      >
        <Input
          placeholder={t('describe_where')}
          inputValue={otherReasons?.current?.value}
          multiline
          numberOfLines={4}
          inputStyle={styles.description}
          isDescription
          defaultValue={otherReasons?.current?.value}
          ref={otherReasons}
          onChangeText={(value: string) => (otherReasons.current.value = value)}
          onSubmitDescription={onSubmitDescription}
          placeholderStyle={styles.placeholder}
        />
      </Modal>
    </>
  );
  const getTreatmentsView = () => (
    <>
      <Text title={t('treatments')} style={styles.reasonText} />
      {((treatmentReason as unknown as treatment)?.treatmentMenu?.length ?? 0) >
      0 ? (
        (treatmentReason as unknown as treatment)?.treatmentMenu?.map(
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
              <Text style={{ fontSize: fontSize.textM }}>
                {' '}
                {item.name.en.charAt(0).toUpperCase() + item.name.en.slice(1)}
              </Text>
            </TouchableOpacity>
          ),
        )
      ) : (
        <LoaderSmall style={styles.loader} />
      )}
      <Text
        title={t('if_the_doctor')}
        style={{ ...styles.textSmall }}
        numberOfLines={1}
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
      <Text style={styles.headingText} title={t('for_whom')} />
      <View style={styles.button}>
        <Button
          title={t('me')}
          isPrimary={isMeSelected}
          isSmall
          width={'12%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => toggleMe('me')}
          lineHeight={20}
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
          width={'45%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => toggleMe('other')}
          lineHeight={20}
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
            inputPlaceholder={t('age')}
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
            inputPlaceholder={t('number')}
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
        address={onChangeAddress}
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
    marginTop: getHeight(dimens.paddingS + 3),
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
    marginBottom: getHeight(dimens.paddingS + 3),
    width: '100%',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: getWidth(dimens.marginS + dimens.borderBold),
    marginBottom: getHeight(dimens.paddingS + 3),
  },
  checkboxContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.marginM),
    alignItems: 'center',
    marginBottom: getHeight(dimens.marginS),
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
    paddingHorizontal: getWidth(dimens.marginS),
    paddingBottom: getWidth(dimens.marginS),
    marginVertical: getHeight(dimens.marginS + 4),
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
  divider: {
    height: getWidth(dimens.borderThin),
    backgroundColor: colors.black,
    marginTop: getHeight(dimens.marginS),
    marginBottom: getHeight(dimens.paddingXs),
  },
  placeholder: {
    fontSize: getWidth(fontSize.textM),
    color: colors.grey,
  },
});
