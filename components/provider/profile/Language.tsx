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
import Loader from 'components/common/Loader';

const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { t, i18n } = useTranslation();
  const { UpdateProviderLanguage } = AuthServicesProvider();
  const { userId } = UseProviderUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (lng: string) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
      if (I18nManager.isRTL && (lng == 'en' || lng == 'ru')) {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
        RNRestart.Restart();
      } else if (!I18nManager.isRTL && (lng == 'he' || lng == 'ar')) {
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
        RNRestart.Restart();
      }
      setLocalData('USER', {
        ...getLocalData('USER')?.user,
        user: {
          language: lng,
        },
      }) as unknown as UserType;
    }
  };

  const getLanguageCode = (language: string) => {
    switch (language) {
      case 'עברית':
        return 'he';
      case 'العربي':
        return 'ar';
      default:
        return 'en';
    }
  };

  const updateProviderLanguage = async (userId: string, language: string) => {
    const languageCode = getLanguageCode(language);

    try {
      setIsLoading(true);
      setSelectedLanguage(languageCode);
      const res = await UpdateProviderLanguage(userId, language);
      console.log('UpdateProviderLanguage', res);
      if (res?.isSuccessful) {
        handleLanguageChange(languageCode);
      }
    } catch {
      (err: Error) => {
        console.error(err.message);
      };
    } finally {
      setIsLoading(false);
    }
  };

  const headerLeft = () => (
    <TouchableOpacity
      style={styles.backArrow}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text style={styles.title} title={t('languages')} />
  );
  useEffect(() => {
    const selectedLang = getLocalData('USER')?.user?.language || 'en';
    setSelectedLanguage(selectedLang);
  }, []);

  const RadioButton = ({ language }: { language: string }) => {
    const languageCode = getLanguageCode(language);

    return (
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
                  selectedLanguage === languageCode
                    ? colors.secondary
                    : colors.transparent,
                borderColor:
                  selectedLanguage === languageCode
                    ? colors.secondary
                    : colors.black,
              },
            ]}
          />
        </View>
        <Text title={t(language)} style={styles.radioButtonText} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        {['English', 'עברית', 'العربي'].map((language) => (
          <RadioButton key={language} language={language} />
        ))}
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
    padding: getHeight(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getHeight(dimens.marginM),
    paddingTop: getHeight(dimens.marginM),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
    gap: getHeight(dimens.marginL),
    paddingTop: getHeight(dimens.imageS),
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
    width: getHeight(dimens.sideMargin + 2),
    height: getHeight(dimens.sideMargin + 2),
    minWidth: getHeight(dimens.sideMargin + 2),
    minHeight: getHeight(dimens.sideMargin + 2),
    borderRadius: getHeight(dimens.marginS + 2),
    borderColor: colors.black,
    borderWidth: getHeight(dimens.borderBold),
    alignSelf: 'center',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});
