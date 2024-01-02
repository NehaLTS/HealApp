import {
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import arrowBack from 'assets/icon/arrowBack.png';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { useNavigation } from '@react-navigation/native';

const Language = () => {
  const navigation = useNavigation<any>();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => (
    <Text title={'Languages'} style={{ fontSize: fontSize.heading }} />
  );
  const RadioButton = ({
    onPress,
    isSelected,
  }: {
    onPress: () => void;
    isSelected: boolean;
  }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerCircle}>
        <View
          style={[
            styles.innerCircle,
            isSelected && {
              backgroundColor: colors.secondary,
              borderColor: colors.secondary,
            },
          ]}
        />
      </View>
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
            <RadioButton
              onPress={() => setSelectedLanguage('English')}
              isSelected={selectedLanguage === 'English'}
            />
            <Text title="English" style={styles.radioButtonText} />
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton
              onPress={() => setSelectedLanguage('עברית')}
              isSelected={selectedLanguage === 'עברית'}
            />
            <Text title="עברית" style={styles.radioButtonText} />
          </View>
          <View style={styles.radioButtonRow}>
            <RadioButton
              onPress={() => setSelectedLanguage('العربي')}
              isSelected={selectedLanguage === 'العربي'}
            />
            <Text title="العربي" style={styles.radioButtonText} />
          </View>
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
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    zIndex: 1,
    alignItems: 'center',
    padding: getHeight(dimens.marginM),
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
    marginTop: getHeight(dimens.marginM),
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(dimens.marginL),
  },
  radioButtonText: {
    marginLeft: getWidth(dimens.marginM),
    fontSize: getHeight(fontSize.textXl),
  },
});
