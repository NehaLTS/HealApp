import React, { createContext } from 'react'
export interface TranslationContextFields {
    languageCode: string
    setLanguageCode: React.Dispatch<React.SetStateAction<string>>
}

export const TranslationContext = createContext<TranslationContextFields>({} as TranslationContextFields)

export const useTranslationContext = (): TranslationContextFields => {
    const context = React.useContext(TranslationContext)

    if (!context) throw new Error('useTranslationContext must be used inside TranslationContext.Provider')

    return context
}