import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TextButton from 'components/common/TextButton';
import Modal from 'components/common/Modal';
import Text from 'components/common/Text';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { fontFamily } from 'designToken/fontFamily';

const ProviderArrivalInfo = ({ onPress, status, doctorName, time}:{ onPress:()=>void, status:string, doctorName:string, time:string}) => {

  return (
   
        <TouchableOpacity style={styles.modalView} onPress={onPress}>
            <Image
              source={require('../../assets/icon/physio.png')}
              style={styles.icon}
            />
            <View style={styles.notificationContainer}>
              <Text
                style={styles.notificationTitle}
                title={doctorName}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.notificationText} title={status} />
                <Text style={styles.notificationText} title={`Time:${time} min`} />
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Image
                  source={require('../../assets/icon/phonecall.png')}
                  style={styles.phoneIcon}
                />
                <Text style={styles.callButtonText} title={'Call the doctor'} />
              </TouchableOpacity>
            </View>
        </TouchableOpacity>
  );
};

export default ProviderArrivalInfo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.modal,
    borderRadius: getHeight(20),
    padding: getHeight(15),
    elevation: 5,
    shadowColor:'brown',
    alignItems: 'center',
    flexDirection: 'row',
    gap: getWidth(16),
  },
  notificationText: {
    fontSize: getWidth(fontSize.textS),
  },
  icon: {
    height: getHeight(90),
    width: getWidth(70),
    resizeMode: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(16),
  },

  notificationContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: getWidth(fontSize.textM),
    fontFamily: fontFamily.medium,
  },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  phoneIcon: {
    width: getWidth(16),
    height: getHeight(16),
    marginRight: getWidth(10),
    resizeMode: 'contain',
  },
  callButtonText: {
    fontSize: getWidth(fontSize.textM),
    color: colors.primary,
  },
});
