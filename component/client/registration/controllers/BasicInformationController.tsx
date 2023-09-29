import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';

const BasicInformationController = () => {
    const [isChangeLanguage, setIsChangeLanguage] = useState(false);
    const onChangeLanguage = () => setIsChangeLanguage(!isChangeLanguage);
    const { setLanguageCode } = useTranslationContext();
    const handleLanguageChange = (lng: string) => {
      setLanguageCode(lng);
      setIsChangeLanguage(!isChangeLanguage);
    };
    return {
      isChangeLanguage,
      onChangeLanguage,
      handleLanguageChange,
    };
  };


export default BasicInformationController

const styles = StyleSheet.create({})