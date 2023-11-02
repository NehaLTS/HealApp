import { useNavigation } from '@react-navigation/native';
import Header from 'components/common/Header';
import Text from 'components/common/Text';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';

const ProviderConfirmation = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { userDataProvider } = UseUserContextProvider();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            userDataProvider.profile_picture?.length
              ? { uri: userDataProvider.profile_picture }
              : require('../../../../assets/icon/provider.png')
          }
          style={styles.finalIcon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{t('waiting_text')}</Text>
        <Text style={styles.queryText}>{t('ask_question_text')}</Text>
        <Text style={styles.number}>+972-555-00-11</Text>
      </View>
    </View>
  );
};

export default ProviderConfirmation;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.modal,
    padding: getHeight(dimens.marginM + dimens.borderBold),
    marginHorizontal: getHeight(dimens.marginS),
    marginTop: getHeight(dimens.marginL + dimens.marginM),
  },
  text: {
    textAlign: 'center',
    fontSize: getWidth(fontSize.textXl),
  },
  number: {
    fontSize: fontSize.textM,
    textAlign: 'center',
    marginTop: getHeight(dimens.marginS),
  },
  finalIcon: {
    height: dimens.imageM,
    width: dimens.imageM,
    borderRadius: getWidth(dimens.imageM),
  },
  queryText: {
    fontSize: fontSize.textM,
    marginTop: getHeight(dimens.paddingL),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: getHeight(dimens.marginL + dimens.marginM),
  },
});