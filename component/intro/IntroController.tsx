import { useState } from 'react';
import { useTranslationContext } from '../../contexts/UseTranslationsContext';

export const IntroController = () => {
    const [isChangeLanguage, setIsChangeLanguage] = useState(false);
    const { setLanguageCode } = useTranslationContext();

    const handleLanguageChange = (lng: string) => {
        setLanguageCode(lng);
        setIsChangeLanguage(!isChangeLanguage);
    };

    const handleButtonPress = () => {
        setIsChangeLanguage(!isChangeLanguage);
    };

    return { isChangeLanguage, handleLanguageChange, handleButtonPress };
};