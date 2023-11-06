import { useTranslationContext } from 'contexts/UseTranslationsContext';
import { getTexts } from 'libs/OneSkyHelper';
import { getWidth } from 'libs/StyleHelper';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import { colors } from 'designToken/colors';

export const LoaderText = () => {
  const { languageCode } = useTranslationContext();
  const { common } = getTexts(languageCode);
  return <Text style={styles.loaderText} title={common.loader} />;
};

export const LoaderSmall = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <ActivityIndicator
      size={'large'}
      color={colors?.primary}
      style={[style, { alignItems: 'center', flex: 1 }]}
    />
  );
};

const styles = StyleSheet.create({
  loaderText: {
    letterSpacing: getWidth(0.5),
  },
});
