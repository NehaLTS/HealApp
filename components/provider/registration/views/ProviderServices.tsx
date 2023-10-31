import Button from 'components/common/Button'
import Loader from 'components/common/Loader'
import Text from 'components/common/Text'
import { colors } from 'designToken/colors'
import { dimens } from 'designToken/dimens'
import { fontSize } from 'designToken/fontSizes'
import { t } from 'i18next'
import { getHeight, getWidth } from 'libs/StyleHelper'
import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import ProviderServicesController from '../controllers/ProviderServicesController'

const ProviderServices = () => {
  const { onPressBack, onPressNext, services, isLoading, isPrescriptionSelected, onCheckedPress, onPrescriptionSelected } = ProviderServicesController()

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      <Button title={t('back')} isSmall width={'30%'} onPress={onPressBack} />
      <Button title={t('next')} isPrimary isSmall width={'30%'} onPress={onPressNext} />
    </View>
  )

  const getServicesView = () => (
    <>
      <Text style={styles.textS} title={t('Services you provide')} />
      <View style={styles.servicesContainer}>
        {services.length > 0 ? (
          <ScrollView contentContainerStyle={{ paddingBottom: getHeight(dimens.marginM) }} style={{ height: '100%' }}>
            {services.map((item, index) => (
              <View key={index} style={styles.serviceRow}>
                <Text style={styles.serviceText} title={item.name.en} />
                <View style={styles.serviceRight}>
                  <Text style={styles.serviceText} title={'$ ' + item.price} />
                  <TouchableOpacity onPress={() => onCheckedPress(index)}>
                    {!item.isChecked ? (
                      <View style={styles.checkbox} />
                    ) : (
                      <View style={[styles.checkbox, { alignItems: 'center', justifyContent: 'center' }]}>
                        <Image source={require('assets/icon/check.png')} style={{ width: getWidth(16), height: getHeight(10) }} />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.textServices} title={t('No Services')} />
        )}
      </View>
    </>
  )

  const RadioButton = ({ onPress, isChecked }: { onPress: () => void; isChecked: boolean }) => (
    <TouchableOpacity onPress={onPress}>
      {!isChecked ? (
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      ) : (
        <View style={styles.outerCircle}>
          <View style={[styles.innerCircle, { backgroundColor: colors.secondary, borderColor: colors.secondary }]} />
        </View>
      )}
    </TouchableOpacity>
  )

  const addPrescriptionView = () => (
    <View style={styles.container}>
      <Text style={styles.text} title={t('yes')} />
      <RadioButton onPress={() => onPrescriptionSelected(true)} isChecked={isPrescriptionSelected} />
      <Text style={styles.textServices} title={t('no')} />
      <RadioButton onPress={() => onPrescriptionSelected(false)} isChecked={!isPrescriptionSelected} />
    </View>
  )

  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.inputContainer}>
        <Text style={styles.text} title={t('Authority to add a prescription')} />
        {addPrescriptionView()}
        {getServicesView()}
      </View>
      {getFooterView()}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: getHeight(10),
    marginTop: getHeight(dimens.sideMargin),
    alignItems: 'center'
  },
  text: {
    fontSize: fontSize.textM
  },
  select: {
    height: dimens.marginL + 2,
    width: dimens.marginL + 2,
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS)
  },
  textS: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(dimens.sideMargin),
    marginTop: getHeight(dimens.imageS)
  },
  serviceText: {
    fontSize: getWidth(fontSize.textM)
  },
  servicesContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.primary,
    height: '70%',
    justifyContent: 'center'
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: getHeight(dimens.marginS),
    paddingTop: getHeight(dimens.paddingL - 2)
  },
  serviceRight: {
    flexDirection: 'row',
    gap: getHeight(dimens.sideMargin - 2),
    alignItems: 'center'
  },
  checkbox: {
    width: getWidth(dimens.marginL - 3),
    height: getHeight(dimens.marginL - 3),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black
  },
  textServices: {
    fontSize: getWidth(fontSize.textXl),
    textAlign: 'center'
  },
  inputContainer: {
    flex: 0.79
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between'
  },
  outerCircle: {
    width: getWidth(dimens.marginL),
    height: getWidth(dimens.marginL),
    borderRadius: getWidth(dimens.imageS),
    borderColor: colors.black,
    borderWidth: getWidth(dimens.borderBold),
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    width: getWidth(16),
    height: getWidth(16),
    minWidth: getWidth(16),
    minHeight: getWidth(16),
    borderRadius: getWidth(10),
    borderColor: colors.black,
    borderWidth: getWidth(dimens.borderBold),
    alignSelf: 'center'
  }
})

export default ProviderServices
