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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Alert,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import OrderFormController from './OrderFormController';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { getTitle } from 'libs/utility/Utils';

const OrderFormView = ({
  treatmentReason,
  setOrder,
  order,
  hideTreatmentMenu,
  onPressWhenHealer,
  supplier,
}: {
  treatmentReason: Reason[];
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  order: OrderDetail;
  hideTreatmentMenu: boolean;
  onPressWhenHealer: () => void;
  supplier: any;
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
    setIsSubmitDetail,
    isShowIcon,
    setIsShowIcon,
    userLocation,
    setUserLocation,
    otherReasonsRef,
    treatmentMenu
  } = OrderFormController({
    setOrder,
    order,
    onPressWhenHealer,
  });

  const { t, i18n } = useTranslation();
  const [treatmentMenuOfReason, setTreatmentMenuOfReason] = useState<TreatmentMenu[]>([])

  useEffect(() => {
    const getPreselectedReason = treatmentReason?.find(
      (item) => item?.specialty_id === supplier?.specialty_id
    );
    console.log('getPreselectedReason', getPreselectedReason, treatmentReason[0], supplier);

    if (getPreselectedReason !== undefined && getPreselectedReason) {
      setOrder({
        ...order,
        reason: [getPreselectedReason],
      });
      onSelectReasons(getPreselectedReason);
    }
    if (treatmentReason && treatmentReason[0]?.services) setTreatmentMenuOfReason([...treatmentReason[0]?.services])

  }, [treatmentReason]);

  useEffect(() => {
    if (treatmentMenu.length > 0) {
      setTreatmentMenuOfReason([...treatmentMenu])
    }

  }, [treatmentMenu])


  const showFilledData = () => {
    return (
      <View style={styles.modalInputContainer}>
        <Input
          inputPlaceholder={t('describe_where')}
          inputStyle={styles.modalInput}
          placeholderTextColor={colors.grey}
          numberOfLines={2}
          defaultValue={order?.Additional_notes}
          onTouchStart={() => setIsModalVisible(true)}
          caretHidden
          isSearch
          onClearInputText={() => {
            setOrder({ ...order, Additional_notes: '' });
            setOtherReasons('');
          }}
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
        {(treatmentReason as unknown as Reason[])?.length ? (
          (treatmentReason as unknown as Reason[])?.map(
            (item: Reason, index: number) => (
              <Button
                key={index}
                title={getTitle(item?.specialty_name, i18n)}
                isSmall
                isPrimary={activeButton?.includes?.(item?.specialty_id) ?? false}
                onPress={() => onSelectReasons(item)}
                width={'30%'}
                fontSized={getHeight(fontSize?.textM)}
                height={getHeight(dimens?.marginL)}
                borderRadius={getHeight(dimens?.marginS)}
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
            borderRadius={getHeight(dimens.marginS)}
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
      >
        <Input
          ref={otherReasonsRef}
          placeholder={t('describe_symptoms')}
          inputValue={otherReasons ?? ''}
          multiline
          numberOfLines={4}
          inputStyle={[styles.description, styles.placeholder]}
          isDescription
          defaultValue={otherReasons ?? ''}
          onChangeText={(value: string) => setOtherReasons(value)}
          onSubmitDescription={onSubmitDescription}
          onSubmitEditing={onSubmitDescription}
          returnKeyType="done"
          blurOnSubmit
          autoFocus
          onLayout={() => otherReasonsRef?.current?.focus()}
        />
      </Modal>
    </>
  );
  const getTreatmentsView = () => (
    <>
      {console.log("treatmentMenuOfReason", treatmentMenuOfReason, treatmentMenu)}
      <Text title={t('treatments')} style={styles.reasonText} />

      {(treatmentMenuOfReason?.length ?? 0) >
        0 ? (
        treatmentMenuOfReason?.map(
          (item: TreatmentMenu, index: number) => (
            <>
              {/* {item?.heal_id === 1 ? <View
              key={index}
              style={styles.checkboxContainer}>
              <View style={styles.checkBox}>

                <Image
                  source={require('assets/icon/check.png')}
                  style={styles.image}
                />

              </View>
              <Text style={{ fontSize: getHeight(fontSize.textM + 1) }}>
                {getTitle(item?.services_name, i18n)?.charAt(0).toUpperCase() +
                  getTitle(item?.services_name, i18n)?.slice(1)}
              </Text>
              <Text style={{ fontSize: getHeight(fontSize.textM + 1) }}>
                {item.price + " " + item.currency}
              </Text>
            </View> : */}
              <TouchableOpacity
                key={index}
                style={styles.checkboxContainer}

                onPress={() => handleItemPress(item)}
              >
                <View style={styles.checkBox}>
                  {activeCheckbox?.includes(item?.heal_id) && (
                    <Image
                      source={require('assets/icon/check.png')}
                      style={styles.image}
                    />
                  )}
                </View>
                <Text style={{ fontSize: getHeight(fontSize.textM + 1) }}>
                  {getTitle(item?.services_name, i18n)?.charAt(0).toUpperCase() +
                    getTitle(item?.services_name, i18n)?.slice(1)}
                </Text>
                <Text style={{ fontSize: getHeight(fontSize.textM + 1) }}>
                  {item.price + " " + item.currency}
                </Text>
              </TouchableOpacity>
              {/* } */}
            </>
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
        <TouchableOpacity
          onPress={() => {
            setOrder({
              ...order,
              address: userLocation?.currentLocation?.address?.toString() ?? '',
            });
            setUserLocation((prevState) => ({
              ...prevState,
              onboardingLocation: {
                latitude: userLocation?.currentLocation?.latitude,
                longitude: userLocation?.currentLocation?.longitude,
                address:
                  userLocation?.currentLocation?.address?.toString() ?? '',
              },
              currentLocation: prevState?.currentLocation,
            }));
          }}
        >
          <Image
            source={require('../../../assets/icon/location.png')}
            style={styles.locationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: getWidth(dimens.sideMargin),
            flex: 0.97,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setIsVisible(true)}
        >
          <Text
            style={{
              ...styles.streetAddress,
              width: '85%',
              textAlign: 'left',
            }}
            title={order?.address ?? ''}
          />
          <Text style={styles.streetAddress} title={t('edit')} />
          {/* <TextButton
            title={t('edit')}
            fontSize={getHeight(fontSize.textM)}
            onPress={() => setIsVisible(true)}
          /> */}
        </TouchableOpacity>
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
          fontSized={getHeight(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => {
            if (order?.isOrderForOther) onMeTogglePress('me');
          }}
          lineHeight={20}
        />
        <Button
          title={
            isSubmitDetail || order?.patient_type?.type === 'other'
              ? `${calculateAgeFromDate(order?.patient_type?.age)} y.o., ${order?.phonenumber
              }`
              : t('someone_else')
          }
          isPrimary={order?.isOrderForOther}
          isSmall
          fontSized={getHeight(fontSize.textL)}
          height={getHeight(dimens.marginL + 6)}
          onPress={() => {
            if (!order?.isOrderForOther) {
              onMeTogglePress('other');
            }
            // console.log('order?.isOrderForOther', order?.isOrderForOther);
            // console.log('order?.Date_of_birth', order?.patient_type?.age);
            // if (order?.isOrderForOther && order?.patient_type?.age) {
            //   setIsSubmitDetail(!isSubmitDetail);
            // }
          }}
          lineHeight={20}
          style={{ paddingHorizontal: getWidth(10) }}
        />
        {isShowIcon && (
          <TouchableOpacity onPress={() => setIsSubmitDetail(false)}>
            <Image
              source={require('assets/icon/edit.png')}
              style={{
                width: getWidth(25),
                height: getHeight(25),
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
        )}
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
            onSubmitEditing={onSubmitDetail}
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

      {!hideTreatmentMenu && getTreatmentsView()}
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
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(dimens.paddingS),
  },
  addressText: {
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getHeight(dimens.paddingL),
  },
  reasonText: {
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getHeight(dimens.paddingS + dimens.borderBold),
  },
  textSmall: {
    fontSize: getHeight(11),
  },
  checkBox: {
    width: getHeight(20),
    height: getHeight(20),
    borderRadius: getHeight(dimens.borderThin),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    alignItems: 'center',
    borderWidth: getHeight(dimens.borderThin),
    borderRadius: getHeight(dimens.marginS),
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
    gap: getHeight(dimens.marginM),
    alignItems: 'center',
    marginBottom: getHeight(dimens.marginS),
    alignSelf: 'flex-start',
    paddingLeft: getWidth(2),
  },
  button: {
    flexDirection: 'row',
    gap: getWidth(dimens.paddingL + dimens.borderBold),
    alignItems: 'center',
  },
  locationIcon: {
    width: getHeight(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: 'contain',
    marginLeft: getWidth(dimens.marginS),
  },
  inputContainer: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    borderColor: colors.primary,
    paddingHorizontal: getWidth(dimens.marginS),
    paddingBottom: getHeight(dimens.marginS),
    marginTop: getHeight(dimens.marginS + 4),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
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
    width: getHeight(dimens.paddingS),
    height: getHeight(dimens.paddingS),
    resizeMode: 'contain',
  },
  streetAddress: {
    fontSize: getHeight(fontSize.textM),
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
    fontSize: getHeight(fontSize.textM),
    color: colors.grey,
  },
  modalInputContainer: {
    width: '100%',
  },

  modalInput: {
    height: getHeight(dimens.imageS),
    color: colors.black,
    flex: 1,
  },
});
