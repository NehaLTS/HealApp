import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { t } from 'i18next';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Input from './Input';
import RNModal from './Modal';
import TextButton from './TextButton';
import { dimens } from 'designToken/dimens';

const AddAddress = ({
  address,
  isVisible,
  onClose,
  defaultValue,
}: {
  address: (address: string) => void;
  isVisible: boolean;
  onClose: () => void;
  defaultValue: string;
}) => {
  const [searchAddress, setSearchAddress] = useState('');
  return (
    <RNModal
      style={styles.modal}
      backdropOpacity={1}
      backdropColor={colors.white}
      isVisible={isVisible}
    >
      <View style={styles.addressView}>
        <Input
          placeholder={t('address')}
          type={'fullStreetAddress'}
          inputStyle={[{ minWidth: '82%' }]}
          onClearInputText={() => setSearchAddress('')}
          onChangeText={setSearchAddress}
          inputValue={defaultValue}
          defaultValue={defaultValue}
          onSubmitEditing={() => {
            onClose();
            address(searchAddress);
          }}
          autoFocus
        />
        <TextButton
          containerStyle={{ width: '18%', alignItems: 'flex-end' }}
          title={t('close')}
          fontSize={getWidth(fontSize.textL)}
          onPress={onClose}
        />
      </View>
    </RNModal>
  );
};
export default AddAddress;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(dimens.paddingS),
  },
});
