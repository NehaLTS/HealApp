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
    <View style={styles.modalView}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          gap: getWidth(16),
          width: '100%',
        }}
        onPress={onPress}
      >
        <Image
          source={require('../../assets/icon/physio.png')}
          style={styles.icon}
        />
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle} title={doctorName} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: getWidth(10),
            }}
          >
            <Text style={styles.notificationText} title={`Status:`} />
            <Text style={{ color: colors.white }} title={status} />
          </View>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Image
            source={require('../../assets/icon/phonecall.png')}
            style={styles.phoneIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
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
    backgroundColor: colors.primary,
    borderRadius: getHeight(20),
    padding: getHeight(15),
    elevation: getWidth(20),
    shadowColor: colors.black,
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
    gap: getWidth(16),
  },

  notificationContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: getWidth(fontSize.textL),
    fontFamily: fontFamily.medium,
    color: colors.white,
  },

  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: getHeight(12),
    borderRadius: getHeight(30),
    paddingRight: getWidth(13),
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
