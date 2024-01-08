import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import Header from 'components/common/Header';
import Text from 'components/common/Text';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight } from 'libs/StyleHelper';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import ProviderConfirmationController from '../controllers/ProviderConfirmationController';
import RNModal from 'components/common/Modal';

const ProviderConfirmation = ({ isVisible }: { isVisible: boolean }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { userDataProvider } = UseUserContextProvider();
  const { onPressNext } = ProviderConfirmationController();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />,
    });
  }, [navigation]);

  return (
    <RNModal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationIn={'zoomInUp'}
      animationOut={'zoomOut'}
      animationInTiming={400}
      animationOutTiming={400}
    >
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
    </RNModal>
  );
};

export default ProviderConfirmation;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: getHeight(dimens.marginS),
    marginTop: getHeight(dimens.marginL + dimens.marginM),
    backgroundColor: 'background: rgba(249, 247, 247, 1)',
    paddingVertical: getHeight(dimens.paddingL),
  },
  text: {
    textAlign: 'center',
    fontSize: getHeight(fontSize.textXl),
  },
  number: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'center',
    marginTop: getHeight(dimens.marginS),
  },
  finalIcon: {
    height: getHeight(dimens.imageM),
    width: getHeight(dimens.imageM),
    borderRadius: getHeight(dimens.imageM),
    resizeMode: 'contain',
  },
  queryText: {
    fontSize: getHeight(fontSize.textM),
    marginTop: getHeight(dimens.paddingL),
    textAlign: 'center',
  },
  container: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: getHeight(dimens.marginS),
    paddingVertical: getHeight(dimens.imageS),
    paddingHorizontal: getHeight(dimens.marginL),
    width: '80%',
  },
  imageContainer: {
    alignItems: 'center',
  },
});
