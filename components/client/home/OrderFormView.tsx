import AddAddress from 'components/common/AddAddress';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Loader from 'components/common/Loader';
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
import {
  ActivityIndicator,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import OrderFormController from './OrderFormController';

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
    onMeTogglePress,
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
    phoneError,
    ageError,
    setOtherReasons,
  } = OrderFormController({ setOrder, order });
  const { t } = useTranslation();

  const showFilledData = () => {
    return (
      <View style={styles.modalInputContainer}>
        <Input
          inputPlaceholder={t('describe_where')}
          inputStyle={styles.modalInput}
          placeholderTextColor={colors.grey}
          style={styles.modalInput}
          numberOfLines={2}
          defaultValue={order?.Additional_notes}
          onTouchStart={() => setIsModalVisible(true)}
          caretHidden
        />
      </View>
    );
  };
  const getReasonsView = () => (
    <>
      <Text title={t('reason')} style={styles.reasonText} />
      <View
        style={{
          ...styles.buttonContainer,
          justifyContent: !(treatmentReason as unknown as treatment)?.reason
            ?.length
            ? 'center'
            : 'space-between',
        }}
      >
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
                fontSized={getWidth(fontSize?.textM)}
                height={getHeight(dimens?.marginL)}
                borderRadius={getWidth(dimens?.marginS)}
                lineHeight={dimens?.sideMargin + dimens?.borderBold}
              />
            ),
          )
        ) : (
          <ActivityIndicator
            style={styles.loader}
            size={'large'}
            color={colors.primary}
          />
        )}
        {order?.Additional_notes.length === 0 ? (
          <Button
            title={t('other')}
            fontSized={getHeight(fontSize.textM + 1)}
            height={getHeight(dimens.marginL)}
            borderRadius={getWidth(dimens.marginS)}
            lineHeight={dimens.sideMargin + dimens.borderBold}
            onPress={() => setIsModalVisible(true)}
          />
        ) : (
          showFilledData()
        )}
        <Text
          title={t('emergency_calls')}
          style={styles.textSmall}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={1}
        />
      </View>
      <View style={styles.divider} />
      <Modal
        backdropColor={colors.white}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={{ flex: 0.93 }}
      >
        <Input
          placeholder={t('describe_symptoms')}
          inputValue={otherReasons ?? ''}
          multiline
          numberOfLines={4}
          inputStyle={[styles.description, styles.placeholder]}
          isDescription
          defaultValue={otherReasons ?? ''}
          onChangeText={(value: string) => setOtherReasons(value)}
          onSubmitDescription={onSubmitDescription}
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
              onPress={() => handleItemPress(item)}
            >
              <View style={styles.checkBox}>
                {activeCheckbox.includes(item?.menu_id) && (
                  <Image
                    source={require('assets/icon/check.png')}
                    style={styles.image}
                  />
                )}
              </View>
              <Text style={{ fontSize: getWidth(fontSize.textM + 1) }}>
                {item?.name?.en.charAt(0).toUpperCase() +
                  item?.name?.en.slice(1)}
              </Text>
            </TouchableOpacity>
          ),
        )
      ) : (
        <ActivityIndicator
          style={styles.loader}
          size={'large'}
          color={colors.primary}
        />
      )}
      <Text
        title={t('if_the_doctor')}
        style={{ ...styles.textSmall }}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={1}
      />
    </>
  );

  const getAddressView = () => (
    <>
      <Text title={t('address')} style={styles.addressText} />
      <View style={styles.locationContainer}>
        <Image
          source={require('../../../assets/icon/location.png')}
          style={styles.locationIcon}
        />
        <Text style={styles.streetAddress} title={order?.address ?? ''} />
        <TextButton
          title={t('edit')}
          fontSize={getWidth(fontSize.textM)}
          onPress={() => setIsVisible(true)}
        />
      </View>
    </>
  );

  const selectPatentTypeView = () => (
    <>
      <Text style={styles.headingText} title={t('for_whom')} />
      <View style={styles.button}>
        <Button
          title={t('me')}
          isPrimary={!order?.isOrderForOther}
          isSmall
          width={'12%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => {
            if (order?.isOrderForOther) onMeTogglePress('me');
          }}
          lineHeight={20}
        />
        <Button
          title={
            isSubmitDetail || order?.patient_type?.type === 'other'
              ? `${calculateAgeFromDate(order?.patient_type?.age)} y.o., ${
                  order?.phonenumber
                }`
              : t('someone_else')
          }
          isPrimary={order?.isOrderForOther}
          isSmall
          width={'45%'}
          fontSized={getWidth(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => {
            if (!order?.isOrderForOther) onMeTogglePress('other');
          }}
          lineHeight={20}
          style={{ paddingHorizontal: getWidth(10) }}
        />
      </View>
    </>
  );

  return (
    <>
      {selectPatentTypeView()}
      {isSubmitDetail || !order?.isOrderForOther ? (
        getAddressView()
      ) : (
        <View style={styles.inputContainer}>
          <Input
            ref={ageRef}
            onChangeText={onChangeAge}
            placeholderTextColor={colors.disabledText}
            inputPlaceholder={t('age')}
            style={{
              ...styles.textInput,
              borderBottomColor: ageError
                ? colors.invalid
                : colors.disabledText,
            }}
            defaultValue={
              order?.patient_type?.age
                ? calculateAgeFromDate(order?.patient_type?.age)?.toString()
                : ''
            }
            maxLength={3}
            keyboardType="numeric"
            inputStyle={styles.inputStyle}
            returnKeyType={'next'}
            onSubmitEditing={() => phoneRef.current.focus()}
          />
          <Input
            ref={phoneRef}
            placeholderTextColor={colors.disabledText}
            inputPlaceholder={t('number')}
            style={{
              ...styles.textInput,
              borderBottomColor: phoneError
                ? colors.invalid
                : colors.disabledText,
            }}
            onChangeText={onChangePhone}
            defaultValue={order?.phonenumber}
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
    marginTop: getHeight(dimens.paddingL),
  },
  reasonText: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getHeight(dimens.paddingS + dimens.borderBold),
  },
  textSmall: {
    fontSize: getWidth(fontSize.textS - 1),
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
    marginBottom: getHeight(dimens.paddingS),
    width: '100%',
    paddingHorizontal: getWidth(dimens.borderBold),
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
    alignSelf: 'flex-start',
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
    marginTop: getHeight(dimens.marginS + 4),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: 'center',
  },
  textInput: {
    borderBottomWidth: getHeight(dimens.borderThin),
    width: '90%',
    color: colors.grey,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    textAlignVertical: 'bottom',
    paddingBottom: getHeight(dimens.marginS),
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
    textAlign: 'left',
  },
  inputStyle: {
    borderWidth: 0,
    width: '90%',
    backgroundColor: colors.white,
  },
  loader: {
    paddingVertical: getHeight(dimens.marginM),
    alignSelf: 'center',
  },
  divider: {
    height: getWidth(dimens.borderThin),
    backgroundColor: colors.disabled,
    marginTop: getHeight(dimens.paddingXs),
    marginBottom: getHeight(dimens.paddingXs),
    width: '80%',
    alignSelf: 'center',
  },
  placeholder: {
    fontSize: getWidth(fontSize.textM),
    color: colors.grey,
  },
  modalInputContainer: {
    marginTop: getHeight(dimens.paddingS),
    marginBottom: getHeight(dimens.paddingS),
    width: '100%',
  },
  modalInputLabel: {
    fontSize: getWidth(fontSize.textM),
    marginBottom: getHeight(dimens.paddingS),
  },
  modalInput: {
    height: getHeight(dimens.imageS + dimens.marginS),
    color: colors.black,
  },
});
