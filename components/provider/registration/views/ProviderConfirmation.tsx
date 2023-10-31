import { useNavigation } from '@react-navigation/native'
import Header from 'components/common/Header'
import Text from 'components/common/Text'
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { colors } from 'designToken/colors'
import { dimens } from 'designToken/dimens'
import { fontSize } from 'designToken/fontSizes'
import { getHeight, getWidth } from 'libs/StyleHelper'
import React, { useLayoutEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'

const ProviderConfirmation = () => {
  const navigation = useNavigation()
  const { userDataProvider } = UseUserContextProvider()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ alignItems: 'center', paddingTop: getHeight(50) }}>
        <Image source={userDataProvider.profile_picture?.length ? { uri: userDataProvider.profile_picture } : require('../../../../assets/icon/provider.png')} style={styles.finalIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your form was successfully submitted and now waiting{'\n'} for the approval.{'\n'}
          We'll get back to you{'\n'}
          within 7 days.
        </Text>
        <Text style={styles.queryText}>
          If you have any questions{'\n'}
          feel free to call us
        </Text>
        <Text style={styles.number}>+972-555-00-11</Text>
      </View>
    </View>
  )
}

export default ProviderConfirmation

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.modal,
    padding: getHeight(dimens.marginM + 2),
    marginHorizontal: getHeight(30),
    marginTop: getHeight(50)
  },
  text: {
    textAlign: 'center',
    fontSize: getWidth(fontSize.textXl)
  },
  number: {
    fontSize: fontSize.textM,
    textAlign: 'center',
    marginTop: getHeight(dimens.marginS)
  },
  finalIcon: {
    height: dimens.imageM,
    width: dimens.imageM,
    borderRadius: getWidth(dimens.imageM)
  },
  queryText: {
    fontSize: fontSize.textM,
    marginTop: getHeight(dimens.paddingL),
    textAlign: 'center'
  }
})
