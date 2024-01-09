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
import Text from './Text';

const AlertView = ({ titles }: { titles: string[] }) => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation()
  return (
    <>

      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.message} title={'INFO'} />
          <View style={styles.subHeadingContainer}>
            {titles.map((title: string, index: any) => (
              <Text key={index} style={styles.subHeading} title={title} />
            ))}

          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t('ok')}
            // isPrimary
            isSmall
            fontSized={getHeight(fontSize.textXl)}
            onPress={() => {
              navigation.goBack();
            }}
          />
          {/* <Button
            title={'Cancel'}
            isSmall
            fontSized={18}
            onPress={() => {

            }}
          /> */}
        </View>
      </View>
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
    // gap: 60,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: getHeight(dimens.marginL)

  },
  buttonText: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textL),
    color: colors.white,
  },
  modalContent: {
    backgroundColor: colors.lightGrey,
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
    marginBottom: 6,
  },
  subHeading: {
    fontSize: getHeight(fontSize.textL),
    alignItems: "center",
    justifyContent: "center",
  },
  subHeadingContainer: {
    marginBottom: 10,
    height: '50%',
    alignItems: "center",
    justifyContent: "center",

  },
});

export default AlertView;
