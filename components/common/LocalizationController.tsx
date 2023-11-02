import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { I18nManager, NativeModules } from 'react-native'
import NavigationRoutes from '../../navigator/NavigationRoutes'

const LocalizationController = () => {
  const navigation = useNavigation<any>()
  const [isLanguageChanged, setIsLanguageChanged] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('EN')
  const { i18n } = useTranslation()

  const languageRestart = async () => {
    if (i18n.language === 'ar' || i18n.language === 'he') {
      await I18nManager.forceRTL(true)
      await I18nManager.allowRTL(true)
    } else if (i18n.language === 'en' || i18n.language === 'ru') {
      await I18nManager.forceRTL(false)
      await I18nManager.allowRTL(false)
    }
    try {
      await AsyncStorage.setItem('myDataKey', i18n.language)
    } catch (error) {
      console.error(error)
    }
    NativeModules.DevSettings.reload()
  }

  const continueAsClient = () => {
    navigation.navigate(NavigationRoutes.ClientStack, {
      screen: NavigationRoutes.ClientLogin,
      params: { isClient: true }
    })
  }

  const retrieveData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('myDataKey')
      if (storedData !== null) {
        setCurrentLanguage(storedData)
        i18n.changeLanguage(storedData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    retrieveData()
  }, [i18n?.language])

  const continueAsProvider = () => navigation.navigate(NavigationRoutes.ProviderStack)
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged)

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng)
    languageRestart()
  }

  return {
    currentLanguage,
    isLanguageChanged,
    onChangeLanguage,
    continueAsClient,
    handleLanguageChange,
    continueAsProvider,
    setIsLanguageChanged
  }
}

export default LocalizationController
