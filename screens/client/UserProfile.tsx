import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { RNHeader } from 'components/common/Header';
import arrowBack from 'assets/icon/arrowBack.png';
import { dimens } from 'designToken/dimens';
import { useNavigation } from '@react-navigation/native';
import TextButton from 'components/common/TextButton';
import { t } from 'i18next';
import UserProfileController from './UserProfileController';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { fontWeight } from 'designToken/fontWeights';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import { PaymentHistoryType } from 'libs/types/UserType';
import AddPaymentToWallet from 'components/client/home/AddPaymentToWallet';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

const UserProfile = () => {
  const { userProfile, onLogoutButtonPress, paymentHistoryData } =
    UserProfileController();
  const navigation = useNavigation();
  const [showPaymentHistory, setShowPaymentHistory] = useState<boolean>(false);
  const [showAddToWallet, setShowAddToWallet] = useState<boolean>(false);
  const walletData = getLocalData('WALLETDETAIL');

  const renderItem = ({
    item,
    index,
  }: {
    item: PaymentHistoryType;
    index: number;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: getWidth(2),
          justifyContent: 'space-between',
          padding: getWidth(10),
        }}
      >
        <Text title={item.transaction_type} style={styles.paymentHistoryText} />
        <View style={{ flexDirection: 'row' }}>
          <Text title={item.amount} style={styles.paymentHistoryText} />
          <Text
            title={
              item.transaction_type === 'debit'
                ? '-'
                : item.transaction_type === 'credit'
                ? '+'
                : ''
            }
            style={[
              {
                fontWeight: 'bold',
                color:
                  item.transaction_type === 'debit'
                    ? colors.invalid
                    : item.transaction_type === 'credit'
                    ? 'green'
                    : '',
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-start', marginBottom: getHeight(30) }}
        onPress={() => navigation.goBack()}
      >
        <Image source={arrowBack} style={styles.arrowBack} />
      </TouchableOpacity>
      <View style={{ width: '100%' }}>
        <Text
          title={`${'Name: '}${userProfile.firstName}`}
          style={styles.textStyle}
        />
        <Text
          title={`${'Wallet: '}${walletData?.wallet_amount ?? '0'}`}
          style={styles.textStyle}
        />
        <TextButton
          title={'Add Payment'}
          onPress={() => {
            setShowAddToWallet(!showAddToWallet);
          }}
          fontSize={fontSize.textXl}
          containerStyle={{
            backgroundColor: colors.disabled,
            padding: getHeight(20),
            marginTop: getHeight(20),
          }}
        />
        {showAddToWallet && <AddPaymentToWallet isShowInputView={true} />}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            setShowPaymentHistory(!showPaymentHistory);
          }}
        >
          <Text title={'Payment history'} style={styles.textStyle} />
          <Image
            source={arrowBack}
            style={[
              styles.arrowBack,
              {
                transform: [
                  { rotate: showPaymentHistory ? '270deg' : '180deg' },
                ],
              },
            ]}
          />
        </TouchableOpacity>
        {showPaymentHistory && (
          <View
            style={{ height: getHeight(400), backgroundColor: colors.disabled }}
          >
            <FlatList data={paymentHistoryData} renderItem={renderItem} />
          </View>
        )}
      </View>
      <TextButton
        title={t('logout')}
        onPress={onLogoutButtonPress}
        fontSize={fontSize.textXl}
        containerStyle={{
          backgroundColor: colors.disabled,
          padding: getHeight(20),
          marginTop: getHeight(20),
        }}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: getHeight(20),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
  },
  textStyle: {
    fontSize: fontSize.textXl,
    color: colors.disabledText,
    fontWeight: '800',
    marginVertical: getHeight(5),
  },
  paymentHistoryText: {
    fontSize: fontSize.textM,
    color: colors.disabledText,
    fontWeight: '700',
    marginVertical: getHeight(2),
  },
});
