import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import Modal from './Modal';
import Button from './Button';

const Alert = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text title={'Yes'} style={{ textAlign: 'center' }} />
      </TouchableOpacity>
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.message} title={'INFO'} />
            <ScrollView style={styles.subHeadingContainer}>
              <Text
                style={styles.subHeading}
                title={
                  'need to cho check this as it s a workaround need to cho check this as it s a workaround'
                }
              />
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={'Ok'}
              isPrimary
              isSmall
              fontSized={18}
              width={'100%'}
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <Button
              title={'Cancel'}
              isSmall
              fontSized={18}
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: getHeight(fontSize.textXl),
    marginBottom: getHeight(dimens.marginL),
    fontFamily: fontFamily.medium,
  },
  buttonContainer: {
    gap: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textL),
    color: colors.white,
  },
  modalContent: {
    backgroundColor: colors.disabled,
    padding: getHeight(dimens.marginM),
    borderRadius: getHeight(dimens.marginS),
    height: '45%',
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
  },
  message: {
    fontSize: getHeight(20),
    fontFamily: fontFamily.medium,
    marginBottom: 6,
  },
  subHeading: {
    fontSize: getHeight(fontSize.textL),
    color: colors.grey,
  },
  subHeadingContainer: {
    marginBottom: 15,
    height: '50%',
  },
});

export default Alert;
