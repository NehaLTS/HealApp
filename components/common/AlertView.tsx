import { useNavigation } from '@react-navigation/native';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import RNModal from './Modal';
import Text from './Text';

const AlertView = ({ title, onPress }: { title: string, onPress: () => void }) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation()
  return (
    <>
      <RNModal
        isVisible
        backdropOpacity={0}
        animationIn={'zoomInUp'}
        animationOut={'zoomOut'}
        animationInTiming={300}
        animationOutTiming={300}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.message} title={'INFO'} />
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading} title={title} />
              <Text style={styles.subHeading} title={t('try_again_later')} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={t('ok')}
              isPrimary
              isSmall
              fontSized={getHeight(fontSize.textXl)}
              // onPress={() => {
              //   navigation.goBack();
              // }}
              onPress={onPress} />
            {/* <Button
            title={'Cancel'}
            isSmall
            fontSized={18}
            onPress={() => {

            }}
          /> */}
          </View>
        </View>
      </RNModal>

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
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: getHeight(dimens.marginM),
    marginTop: getHeight(dimens.marginL)
  },
  buttonText: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textL),
    color: colors.white,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: getHeight(dimens.marginM),
    borderRadius: getHeight(dimens.marginS),
    // height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
  },
  message: {
    fontSize: getHeight(20),
    fontFamily: fontFamily.medium,
    marginBottom: getHeight(dimens.marginS)

  },
  subHeading: {
    fontSize: getHeight(fontSize.textL),
    alignItems: "center",
    justifyContent: "center",
  },
  subHeadingContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    columnGap: getHeight(8)

  },
});

export default AlertView;
