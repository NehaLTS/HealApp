import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTranslationContext } from '../../contexts/UseTranslationsContext';
import { colors } from '../../designToken/colors';
import { fontSize } from '../../designToken/fontSizes';
import { getTexts } from '../../libs/OneSkyHelper';
import { getWidth } from '../../libs/StyleHelper';

const LoaderText = () => {
    const { languageCode } = useTranslationContext();
    const { common } = getTexts(languageCode);
  return (
    <Text style={styles.loaderText}>{common.loader}</Text>
  )
}

export default LoaderText

const styles = StyleSheet.create({
    loaderText: {
        fontSize: fontSize.textL,
        color: colors.black,
        letterSpacing: getWidth(0.5),
      },
})