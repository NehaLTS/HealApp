import Input from 'common/Input';
import Text from 'components/common/Text';
import { useTranslationContext } from 'contexts/UseTranslationsContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import logo from 'assets/icon/healLogo.png';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import TextButton from 'components/common/TextButton';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useTranslation } from 'react-i18next';
import UserPaymentViewController from '../controllers/UserPaymentViewController';

//TODO: * are changed after setup i18 and static data i changes after binding data
const UserPaymentView = ({
  isFromHome,
  item,
  onPress,
}: {
  isFromHome?: boolean;
  item?: any;
  onPress?: () => void;
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { languageCode } = useTranslationContext();
  const {
    cardNumberRef,
    expireDateRef,
    cvvRef,
    onBlurCardNumber,
    onBlurExpireDate,
    onBlueCvv,
    onChangeCardNumber,
    onChangeExpireDate,
    onChangeCvv,
    cardNumberError,
    cvvError,
    cardExpiryError,
    onPressNext,
    onPressBack,
    setIsCardDetails,
    isLoader: isLoading,
    isCardDetails,
    cardExpiry,
    userProfile,
    onPressStartUsingHeal,
    card,
    expiry,
    cvv,
    onClearCard,
    onDeleteCard,
  } = UserPaymentViewController({ item });

  return (
    <>
      {isFromHome && (
        <View
          style={{
            flexDirection: 'row',
            gap: getHeight(dimens.imageXs),
            marginBottom: getHeight(dimens.imageXs + 2),
          }}
        >
          <Image source={logo} style={styles.logo} />
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            style={styles.title}
            title={t('payment_method')}
          />
        </View>
      )}
      <View style={styles.inputsContainer}>
        <View style={styles.container}>
          {!isCardDetails && (
            <>
              <Image
                source={require('assets/icon/card.png')}
                style={styles.creditCard}
              />
              <Text title={t('add_credit_card')} />
            </>
          )}
        </View>
        {isCardDetails ? (
          <>
            {isLoading && <Loader />}
            <View style={styles.innerContainer}>
              <Image
                source={require('assets/icon/masterCard.png')}
                style={styles.googlePay}
              />
              <Text title={t('master_card')} />
              <View style={styles.cardIcons}>
                <TouchableOpacity onPress={() => setIsCardDetails(false)}>
                  <Image
                    source={require('assets/icon/edit.png')}
                    style={styles.cardImages}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDeleteCard}>
                  <Image
                    source={require('assets/icon/cancel.png')}
                    style={styles.cardImages}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text
                style={styles.cardDetail}
                title={'**** **** **** ' + card?.slice?.(-4)}
              />
              <Text
                style={styles.cardDetail}
                title={`${t('expires')} ` + expiry}
              />
            </View>
          </>
        ) : (
          <>
            <Input
              placeholder={t('credit_card_number')}
              keyboardType="numeric"
              inputStyle={styles.cardNumber}
              onBlur={onBlurCardNumber}
              onChangeText={onChangeCardNumber}
              // ref={cardNumberRef}
              defaultValue={card}
              errorMessage={cardNumberError}
              inputValue={card}
              returnKeyType={'next'}
              onSubmitEditing={() => expireDateRef.current.focus()}
              // onClearInputText={() => cardNumberRef?.current?.clear()}
              onClearInputText={onClearCard}
              maxLength={19}
            />
            <View style={[styles.container, styles.inputDateAndCvv]}>
              <Input
                keyboardType="numeric"
                placeholder={t('mm_yy')}
                inputStyle={styles.expireDate}
                onBlur={onBlurExpireDate}
                // onClearInputText={() => expireDateRef.current.clear()}
                onChangeText={onChangeExpireDate}
                ref={expireDateRef}
                errorMessage={cardExpiryError}
                defaultValue={expiry}
                inputValue={expiry}
                returnKeyType={'next'}
                onSubmitEditing={() => cvvRef.current.focus()}
                maxLength={5}
              />
              <Input
                keyboardType="numeric"
                type="creditCardNumber"
                placeholder={t('cvv')}
                onBlur={onBlueCvv}
                errorMessage={cvvError}
                ref={cvvRef}
                onChangeText={onChangeCvv}
                defaultValue={cvv ?? ''}
                inputValue={cvv ?? ''}
                maxLength={3}
                returnKeyType={'done'}
              />
            </View>
          </>
        )}
        <>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.googlePayContainer}>
            <Image
              source={require('assets/icon/googlePay.png')}
              style={styles.googlePay}
            />
            <Text title={t('add_google_pay')} />
          </TouchableOpacity>
        </>
      </View>
      <View
        style={[
          styles.footerContainer,
          {
            justifyContent: isCardDetails || isFromHome ? 'center' : 'center',
            flex: 0.1,
          },
        ]}
      >
        {!isCardDetails ? (
          <>
            {/* {!isFromHome && (
              <Button
                title={t('back')}
                isSmall
                onPress={onPressBack}
                width={'30%'}
              />
            )} */}
            <Button
              title={t('next')}
              isPrimary
              onPress={onPressNext}
              isSmall
              width={'30%'}
            />
          </>
        ) : (
          <Button
            title={isFromHome ? t('next') : t('start_using_heal')}
            isPrimary
            isSmall
            style={{ paddingHorizontal: getWidth(10) }}
            onPress={() => {
              onPressStartUsingHeal(isFromHome ?? false);
              onPress?.();
            }}
            width={'70%'}
          />
        )}
      </View>
      {!isCardDetails && !isFromHome && (
        <TextButton
          fontSize={getWidth(fontSize.textXl)}
          containerStyle={{ flex: 0.08 }}
          style={styles.skipLaterText}
          title={t('skip_for_later')}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: NavigationRoutes.ClientHome }],
            })
          }
        />
      )}
    </>
  );
};

export default UserPaymentView;

const styles = StyleSheet.create({
  divider: {
    height: getWidth(dimens.borderThin),
    backgroundColor: colors.grey,
    marginTop: getHeight(dimens.marginS),
    marginBottom: getHeight(dimens.paddingXs),
  },
  googlePay: {
    height: getHeight(dimens.paddingL + dimens.borderBold),
    width: getWidth(dimens.marginL + dimens.borderBold),
  },
  inputContainer: {
    gap: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.paddingS + dimens.paddingXs),
  },
  creditCard: {
    width: getWidth(dimens.paddingL),
    height: getHeight(dimens.marginM),
  },
  googlePayContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.sideMargin),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin),
  },
  skipForLater: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  skipLaterText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.marginL),
    verticalAlign: 'middle',
    height: '100%',
  },
  text: {
    fontSize: getWidth(fontSize.textM),
    color: colors.black,
    paddingTop: getHeight(dimens.paddingXs),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    marginTop: getHeight(dimens.marginS),
  },
  cardDetail: {
    fontFamily: fontFamily.light,
  },
  cardNumber: {
    marginTop: getHeight(dimens.sideMargin + dimens.borderBold),
  },
  inputDateAndCvv: {
    marginBottom: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.paddingL + 2),
  },
  loader: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    gap: getHeight(dimens.paddingL),
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    marginBottom: getHeight(dimens.paddingS),
  },
  cardImages: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
  },
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getHeight(dimens.marginM + dimens.borderBold),
    marginBottom: getHeight(dimens.borderBold),
  },
  expireDate: {
    minWidth: '30%',
  },
  loading: {
    left: '44%',
    top: '50%',
    position: 'absolute',
    zIndex: 1,
  },
  inputsContainer: {
    flex: 0.75,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    flex: 0.12,
    justifyContent: 'center',
  },
  logo: {
    width: getWidth(dimens.imageS),
    height: getHeight(dimens.imageS),
    resizeMode: 'center',
  },
  title: {
    fontSize: getWidth(fontSize.headingL),
    textAlign: 'center',
  },
});
