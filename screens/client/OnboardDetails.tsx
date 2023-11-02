import { useNavigation } from '@react-navigation/native'
import Stepper from 'common/Stepper'
import Header from 'components/common/Header'
import { UseClientUserContext } from 'contexts/UseClientUserContext'
import { colors } from 'designToken/colors'
import { dimens } from 'designToken/dimens'
import { getWidth } from 'libs/StyleHelper'
import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import UserAddressView from '../../components/client/registration/views/UserAddressView'
import UserDetailView from '../../components/client/registration/views/UserDetailView'
import UserPaymentView from '../../components/client/registration/views/UserPaymentView'

const OnboardDetails = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={t('registration')} />
    })
  }, [navigation])

  const { currentStep } = UseClientUserContext()
  return (
    <View style={styles.container}>
      <Stepper currentStep={currentStep} totalStep={['details', 'address', 'payment']} />
      {currentStep === 'details' && <UserDetailView />}
      {currentStep === 'address' && <UserAddressView />}
      {currentStep === 'payment' && <UserPaymentView />}
    </View>
  )
}

export default OnboardDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM)
  }
})
