import OneSkyStrings from '../src/lang/OneSky.json'

export const getTexts = (languageCode: keyof typeof OneSkyStrings | string) => {
    const lang = Object.keys(OneSkyStrings).find((langu) => langu.includes(languageCode))
    const obj = OneSkyStrings[lang as keyof typeof OneSkyStrings]
    // Invariant(obj, () => `Invalid language code ${lang}`)
    const { translation } = obj
    return translation
}
