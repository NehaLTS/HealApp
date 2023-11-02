import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useTranslationContext } from '../../contexts/UseTranslationsContext'
import { getLocalData, setLocalData } from '../../libs/datastorage/useLocalStorage'
import { UserType } from '../../libs/types/UserType'
import NavigationRoutes from '../../navigator/NavigationRoutes'

const IntroController = () => {
  const navigation = useNavigation<any>()
  const [isLanguageChanged, setIsLanguageChanged] = useState(false)
  const { setLanguageCode } = useTranslationContext()
  const continueAsClient = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: NavigationRoutes.ClientStack,
          params: { isClient: true }
        }
      ]
    })
  }
  const continueAsProvider = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderStack }]
    })
  }
  const onChangeLanguage = () => setIsLanguageChanged(!isLanguageChanged)

  const handleLanguageChange = (lng: string) => {
    setLanguageCode(lng)
    setLocalData('USER', {
      ...getLocalData('USER')?.user,
      user: {
        language: lng
      }
    }) as unknown as UserType
  }

  return {
    isLanguageChanged,
    onChangeLanguage,
    continueAsClient,
    handleLanguageChange,
    continueAsProvider
  }
}

export default IntroController
