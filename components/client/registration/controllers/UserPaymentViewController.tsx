import { useNavigation } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import NavigationRoutes from 'navigator/NavigationRoutes';
import React, { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

const UserPaymentViewController = ({ item }: any) => {
  const { userId, userProfile, setUserProfile ,token} = UseClientUserContext();
  const { onCreateCreditCardDetails } = AuthServicesClient();
  const cardNumberRef = React.useRef<any>('');
  const expireDateRef = React.useRef<any>('');
  const cvvRef = React.useRef<any>('');
  const [card, setCard] = useState(userProfile?.card_number ?? '');
  const [expiry, setExpiry] = useState(userProfile?.expire_date ?? '');
  const [cvv, setCvv] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [cardExpiryError, setCardExpiryError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isCardDetails, setIsCardDetails] = useState(false);
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const validateCardNumber = () => {
    if (!card?.length) setCardNumberError(t('card_number_required'));
    else if (card?.length !== 19) {
      setCardNumberError(t('card_number_short'));
    } else setCardNumberError('');
  };

  const validateCardExpiry = () => {
    if (!expiry?.length) setCardExpiryError(t('expiry_number_required'));
    else if (expiry?.length !== 5) {
      setCardExpiryError(t('expiry_number_short'));
    } else setCardExpiryError('');
  };
  const validateCvv = () => {
    if (!cvv?.length) setCvvError(t('cvv_required'));
    else if (cvv?.length !== 3) {
      setCvvError(t('cvv_number_short'));
    } else setCvvError('');
  };

  const trimPaymentValue = (value: string) => value.replace(/[^0-9]/g, '');

  const onChangeCardNumber = (value: string) => {
    validateCardNumber();
    const cleanedText = trimPaymentValue(value);
    let formattedText = '';

    for (let i = 0; i < cleanedText.length; i += 4) {
      formattedText += cleanedText.slice(i, i + 4) + ' ';
    }

    formattedText = formattedText.trim();
    // cardNumberRef.current.setNativeProps({ text: formattedText });
    // cardNumberRef.current.value = formattedText;
    console.log('formattedText', formattedText);
    setCard(formattedText);
  };
  const onChangeExpireDate = (value: string) => {
    validateCardExpiry();
    const cleanedText = trimPaymentValue(value);
    let formattedText = '';
    for (let i = 0; i < cleanedText.length; i += 2) {
      formattedText += cleanedText.slice(i, i + 2) + '/';
    }
    formattedText = formattedText.replace(/\/$/, '');
    // expireDateRef.current.setNativeProps({ text: formattedText });
    // expireDateRef.current.value = formattedText;
    setExpiry(formattedText);
  };

  const onChangeCvv = (value: string) => {
    setCvv(value);
    // cvvRef.current.value = value;
  };

  const onBlurCardNumber = () => validateCardNumber();

  const onBlurExpireDate = () => validateCardExpiry();

  const onBlueCvv = () => validateCvv();

  const onClearCard = () => {
    setCard('');
    expireDateRef.current.focus();
  };
  const onDeleteCard = () => {
    setIsCardDetails(false);
    setCard('');
    setExpiry('');
    setCvv('');
  };

  const onPressNext = async () => {
    if (card?.length && expiry?.length && cvv?.length) {
      setUserProfile({
        ...userProfile,
        card_number: card,
        expire_date: expiry,
      });
      setIsCardDetails(true);
    } else {
      if (!card?.length) setCardNumberError(t('card_number_required'));
      if (!cvv?.length) setCvvError(t('cvv_required'));
      if (!expiry?.length) setCardExpiryError(t('expiry_date_required'));
    }
  };

  const onPressBack = () => {
    setIsCardDetails(false);
  };

  const onPressStartUsingHeal = async (isFromHome: boolean) => {
    if (card?.length === 19 && expiry?.length === 5 && cvv?.length === 3) {
      setIsLoader(true);
      const res = await onCreateCreditCardDetails({
        credit_card_number: card ?? '',
        expire_date: expiry ?? '',
        cvv: cvv ?? '',

        client_id: getLocalData?.('USER')?.userId,
      },
      token);

      if (res?.isSuccessful) {
        //TODO: Vandana to save in Local data with isPaymentAdded as true
        setLocalData('USERPROFILE', {
          isPaymentAdded: true,
          card_number: card,
          expire_date: expiry,
        });
        setIsLoader(false);
        if (isFromHome)
          navigation.navigate(NavigationRoutes.OrderDetails, {
            supplier: item,
          });
        else {
          navigation.reset({
            index: 0,
            routes: [{ name: NavigationRoutes.ClientHome }],
          });
        }
      } else {
        setIsLoader(false);
        Alert.alert(t('error_occurred'));
      }
    }
  };

  return {
    cardNumberRef,
    expireDateRef,
    cvvRef,
    cardNumberError,
    onBlurCardNumber,
    cardExpiryError,
    onBlurExpireDate,
    onBlueCvv,
    onChangeCardNumber,
    onChangeExpireDate,
    onChangeCvv,
    cvvError,
    onClearCard,
    onPressNext,
    onPressBack,
    setIsCardDetails,
    isLoader,
    isCardDetails,
    cardNumber,
    cardExpiry,
    onPressStartUsingHeal,
    userProfile,
    card,
    expiry,
    cvv,
    onDeleteCard,
  };
};

export default UserPaymentViewController;
