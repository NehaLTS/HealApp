import { useNavigation } from '@react-navigation/native';
import logo from 'assets/icon/healLogo.png';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LocalizationController from './LocalizationController';
import RNModal from './Modal';
import Text from './Text';

export const defaultHeaderStyle = {
  headerShadowVisible: false,
  title: '',
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTintColor: 'transparent',
  headerBackVisible: false,
};
const languages = [
  { code: 'en', name: 'English', title: 'English' },
  { code: 'he', name: 'Hebrew', title: 'עִברִית' },
  { code: 'ar', name: 'Arabic', title: 'العربي' },
  { code: 'ru', name: 'Russian', title: 'русский' },
];

const Header = ({
  title,
  isHideTitle,
}: {
  title?: string;
  isHideTitle?: boolean;
}) => {
  const {
    currentLanguage,
    isLanguageChanged,
    onChangeLanguage,
    handleLanguageChange,
    setIsLanguageChanged,
  } = LocalizationController();

  return (
    <View
      style={[
        styles.headerContainer,
        { justifyContent: isHideTitle ? 'flex-end' : 'space-between' },
      ]}
    >
      {title && (
        <>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title} title={title} />
        </>
      )}
      <Text
        style={styles.headerRight}
        onPress={onChangeLanguage}
        title={currentLanguage.toUpperCase()}
      />
      <RNModal
        onBackdropPress={() => setIsLanguageChanged(false)}
        isVisible={isLanguageChanged}
        backdropOpacity={0}
        animationIn={'zoomInUp'}
        animationOut={'zoomOut'}
        animationInTiming={300}
        animationOutTiming={300}
      >
        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => {
                handleLanguageChange(lang.code);
                setIsLanguageChanged(false);
              }}
            >
              <Text
                style={[
                  styles.language,
                  {
                    color:
                      currentLanguage === lang.code
                        ? colors.primary
                        : colors.black,
                  },
                ]}
                title={lang.title}
              />
            </TouchableOpacity>
          ))}
        </View>
      </RNModal>
    </View>
  );
};

export default Header;

export const RNHeader = (
  headerTitle?: () => React.ReactNode,
  headerLeft?: () => React.ReactNode,
  headerRight?: () => React.ReactNode,
  dependency?: any,
) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: headerTitle ?? '',
      headerLeft: headerLeft,
      headerStyle: styles.header,
      headerRight: headerRight,
    });
  }, [navigation, dependency]);
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    paddingLeft: getWidth(16),
    zIndex: 1,
  },
  language: {
    alignSelf: 'flex-end',
    padding: getHeight(dimens.borderThin),
    fontSize: getHeight(fontSize.textL),
  },
  languageContainer: {
    position: 'absolute',
    width: getHeight(120), //TODO: should define sizes for every Width
    height: getHeight(142), //TODO: should define sizes for every Height
    padding: getHeight(dimens.marginS),
    maxWidth: getHeight(120),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.primary,
    borderRadius: getHeight(dimens.marginS),
    right: 0,
    backgroundColor: colors.offWhite,
    top: dimens.marginL,
    justifyContent: 'space-between',
  },
  logo: {
    width: '10%',
    height: getHeight(43),
    resizeMode: 'contain',
  },
  avatar: {
    height: getHeight(45),
    width: getWidth(45),
    resizeMode: 'contain',
  },
  title: {
    fontSize: getHeight(fontSize.headingL),
  },
  headerRight: {
    paddingHorizontal: getWidth(dimens.sideMargin),
    fontSize: getHeight(fontSize.textL),
    paddingVertical: getHeight(dimens.sideMargin),
  },
  header: {
    backgroundColor: colors.white,
  },
});
