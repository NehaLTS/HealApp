import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import arrowBack from 'assets/icon/arrowBack.png';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { UserType } from 'contexts/useUserContext';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import RNRestart from 'react-native-restart';
import LocalizationController from 'components/common/LocalizationController';


const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { t, i18n
  } = useTranslation()
  const { onGetProviderLanguage } = AuthServicesProvider();
  const { userId } = UseProviderUserContext();


  const handleLanguageChange = (lng: string) => {
    console.log('Selected language code:', lng);
    console.log("first", i18n.language !== lng)
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);

      console.log('entered (I18nManager.isRTL ', I18nManager.isRTL);

      if (I18nManager.isRTL && (lng == 'en' || lng == 'ru')) {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
        // SplashScreen.show();
        RNRestart.restart();
      } else if (!I18nManager.isRTL && (lng == 'he' || lng == 'ar')) {
        // SplashScreen.show();
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
        RNRestart.restart();
      }
      setLocalData('USER', {
        ...getLocalData('USER')?.user,
        user: {
          language: lng,
        },
      }) as unknown as UserType;
    }
  };

  const getLaunguageCode = (language: string) => {
    switch (language) {
      case 'English':
        return 'en'
      case 'עברית':
        return 'he'
      case 'العربي':
        return 'ar'
      default:
        return 'en'
    }
  }
  const updateProviderLanguage = (userId: string, language: string) => {
    console.log("Current language:", i18n.language);
    console.log("Desired language:", language);
    setSelectedLanguage(language);
    const languageCode = getLaunguageCode(language)
    console.log("languageCode", languageCode);
    onGetProviderLanguage(userId, language)
      .then((response) => {
        handleLanguageChange(languageCode)
        console.log('API Response', response);
      })
      .catch((error) => {
        console.error('Error updating language:', error);
      });
  };

  const headerLeft = () => (
    <TouchableOpacity style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text
      style={styles.title}
      title={t('languages')}
    />
  );
  useEffect(() => {
    const selectedLang = getLocalData('USER')?.user.language || 'English';
    setSelectedLanguage(selectedLang);
  }, []);


  const RadioButton = ({ language }: { language: string }) => (
    <TouchableOpacity
      onPress={() => updateProviderLanguage(userId, language)}
      style={styles.radioButtonRow}
    >
      <View style={styles.outerCircle}>
        <View
          style={[
            styles.innerCircle,
            {
              backgroundColor:
                selectedLanguage === language ? colors.secondary : 'transparent',
              borderColor: selectedLanguage === language ? colors.secondary : 'black',
            },
          ]}
        />
      </View>
      <Text title={t(language)} style={styles.radioButtonText} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        <View style={styles.radioButtonGroup}>
          <View style={styles.radioButtonRow}>
            <RadioButton language={'English'} />
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton language={'עברית'}
            />
          </View>
          <RadioButton language={'العربي'} />
        </View>
      </View>
    </>
  );
};

export default Language;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: getWidth(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingTop: getHeight(dimens.marginM),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  outerCircle: {
    width: getHeight(dimens.marginL),
    height: getHeight(dimens.marginL),
    borderRadius: getHeight(dimens.imageS),
    borderColor: colors.black,
    borderWidth: getHeight(dimens.borderBold),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: getHeight(dimens.sideMargin),
    height: getHeight(dimens.sideMargin),
    minWidth: getHeight(dimens.sideMargin),
    minHeight: getHeight(dimens.sideMargin),
    borderRadius: getHeight(dimens.marginS),
    borderColor: colors.black,
    borderWidth: getHeight(dimens.borderBold),
    alignSelf: 'center',
  },
  radioButtonGroup: {
    marginTop: getHeight(dimens.imageS),
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(dimens.marginS + 5),
  },
  radioButtonText: {
    marginLeft: getWidth(dimens.marginM),
    fontSize: getHeight(fontSize.textXl),
  },
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  backArrow: {
    paddingRight: getWidth(15),
    paddingVertical: getHeight(5),
  }
});
