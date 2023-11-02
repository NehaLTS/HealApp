import { useNavigation } from '@react-navigation/native';
import logo from 'assets/icon/logo.png';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import { fontSize } from '../../designToken/fontSizes';
import IntroController from './IntroController';
import Text from 'components/common/Text';

const IntroScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { continueAsClient, continueAsProvider } = IntroController();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header isHideTitle />,
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.welcomeText} title={t('welcome_heal')} />
      <View style={styles.buttonContainer}>
        <Button
          title={t('continue_client')}
          isPrimary
          onPress={continueAsClient}
        />
        <Button title={t('continue_provider')} onPress={continueAsProvider} />
      </View>
    </View>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  logo: {
    width: getWidth(dimens.imageL + dimens.imageS),
    height: getHeight(dimens.imageL + dimens.imageS + dimens.imageS),
    alignSelf: 'center',
    flex: 0.4,
    justifyContent: 'center',
    // resizeMode: "contain",
  },
  welcomeText: {
    fontSize: getHeight(fontSize.headingL),
    alignSelf: 'center',
    flex: 0.4,
  },
  buttonContainer: {
    gap: getHeight(fontSize.headingL),
    flex: 0.2,
  },
});
