import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const ProviderArrivalInfo = ({
  onPress,
  status,
  doctorName,
}: {
  onPress: () => void;
  status: string;
  doctorName: string;
}) => {
  return (
    <TouchableOpacity style={styles.modalView} onPress={onPress}>
      <View style={styles.modalContainer}>
        <Image
          source={require('../../assets/icon/physio.png')}
          style={styles.icon}
        />
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle} title={doctorName} />
          <Text style={styles.notificationText} title={`Status:  ${status}`} />
        </View>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Image
          source={require('../../assets/icon/phonecall.png')}
          style={styles.phoneIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProviderArrivalInfo;

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: getWidth(10),
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: colors.primary,
    borderRadius: getHeight(20),
    padding: getHeight(10),
    elevation: getWidth(20),
    shadowColor: colors.black,
    width: '100%',
    paddingVertical: getHeight(15),
    alignItems: 'center',
    flexDirection: 'row',
    gap: getWidth(10),
    justifyContent: 'space-between',
  },
  notificationText: {
    fontFamily: fontFamily.medium,
    fontSize: getWidth(fontSize.textM),
    color: colors.white,
  },
  icon: {
    height: getHeight(55),
    width: getHeight(55),
    resizeMode: 'center',
    borderRadius: getHeight(30),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(10),
  },

  notificationContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.medium,
    color: colors.white,
    flexWrap: 'wrap',
  },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: getHeight(12),
    borderRadius: getHeight(30),
  },
  phoneIcon: {
    width: getHeight(16),
    height: getHeight(16),
    resizeMode: 'contain',
  },
  callButtonText: {
    color: colors.white,
  },
});
