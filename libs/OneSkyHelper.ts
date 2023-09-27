import OneSkyStrings from '../src/lang/OneSky.json'
const XXX = 'XXX'
type Printable = string | number

export const getTexts = (languageCode: keyof typeof OneSkyStrings | string) => {
    const lang = Object.keys(OneSkyStrings).find((langu) => langu.includes(languageCode))
    const obj = OneSkyStrings[lang as keyof typeof OneSkyStrings]
    // Invariant(obj, () => `Invalid language code ${lang}`)
    const { translation } = obj
    return translation
}

export const formatText = (text: string, params: Printable[]): string => {
    const paramString = params.map((p) => p?.toString())
    return text?.split(XXX)?.reduce(
        (a, b, i) => ({
            res: a.res + b + (paramString[a.i] || '')?.toString(),
            i: i + 1
        }),
        { res: '', i: 0 }
    ).res
}