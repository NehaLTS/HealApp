import Button from 'components/common/Button'
import Dropdown from 'components/common/Dropdown'
import Text from 'components/common/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext'
import { colors } from '../../../../designToken/colors'
import { dimens } from '../../../../designToken/dimens'
import { fontSize } from '../../../../designToken/fontSizes'
import { getTexts } from '../../../../libs/OneSkyHelper'
import { getHeight, getWidth } from '../../../../libs/StyleHelper'
import Input from '../../../common/Input'
import SelectImage from '../../../common/SelectImage'
import ProviderDetailController from '../controllers/ProviderDetailController'

const ProviderDetail = () => {
  const { t } = useTranslation()
  const { languageCode } = useTranslationContext()
  const { registration } = getTexts(languageCode)
  const {
    firstNameError,
    isShowModal,
    setIsShowModal,
    lastNameError,
    providerTypeError,
    specialtyError,
    selectedProvider,
    providerProfile,
    getImageUrl,
    onChangeFirstName,
    onBlurFirstName,
    onBlurLastName,
    onChangeLastName,
    onChangeProviderTypes,
    onChangeSpecialty,
    firstNameRef,
    lastNameRef,
    onBlurSpecialty,
    onBlurProviderTypes,
    onPressNext,
    renderToast
  } = ProviderDetailController()

  console.log('idPicture', providerProfile)
  const data = [
    {
      id: 1,
      name: {
        en: 'Doctor',
        hi: 'चिकित्सक',
        he: ''
      },
      specialties: [
        {
          id: 1,
          name: {
            en: 'Stomach And Digestion',
            hi: 'पेट और पाचन',
            he: ''
          }
        },
        {
          id: 2,
          name: {
            en: 'Gernaral and Physician',
            hi: 'गर्नराल और चिकित्सक',
            he: ''
          }
        },
        {
          id: 3,
          name: {
            en: 'Dermatology',
            hi: 'त्वचा विज्ञान',
            he: ''
          }
        },
        {
          id: 5,
          name: {
            ' en': 'orthopedist',
            hi: '',
            he: ''
          }
        }
      ]
    },
    {
      id: 2,
      name: {
        en: 'Nurse',
        hi: 'देखभाल करना',
        he: ''
      },
      specialties: [
        {
          id: 7,
          name: {
            en: 'Pediatric Nursing',
            hi: '',
            he: ' '
          }
        },
        {
          id: 8,
          name: {
            en: 'Labor and Delivery Nursing',
            hi: '',
            he: ''
          }
        },
        {
          id: 9,
          name: {
            en: 'Cardiac Nursing',
            hi: '',
            he: ''
          }
        },
        {
          id: 10,
          name: {
            en: 'Oncology Nursing',
            hi: '',
            he: ''
          }
        },
        {
          id: 11,
          name: {
            en: 'Nurse Practitioner',
            hi: '',
            he: ''
          }
        }
      ]
    },
    {
      id: 3,
      name: {
        en: 'Healer',
        hi: 'आरोग्य करनेवाला',
        he: ''
      },
      specialties: []
    },
    {
      id: 4,
      name: {
        en: 'Physio',
        hi: 'फिजियो',
        he: ''
      },
      specialties: [
        {
          id: 4,
          name: {
            en: 'Neuromusculoskeletal',
            hi: '',
            he: ''
          }
        },
        {
          id: 6,
          name: {
            en: 'Dermatology',
            hi: '',
            he: ''
          }
        },
        {
          id: 12,
          name: {
            en: "Women's Health Physiotherapy",
            hi: '',
            he: ''
          }
        },
        {
          id: 13,
          name: {
            en: 'Pain Management',
            hi: '',
            he: ''
          }
        }
      ]
    }
  ]

  const renderItem = (item: { name: { en: any } }) => {
    return <Text style={styles.textItem}>{item?.name.en}</Text>
  }

  const renderItems = (item: { name: any } | { name: { en: any } }) => {
    return <Text style={styles.textItem}>{item?.name || item?.name.en}</Text>
  }

  const getUploadImageView = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.text}>Upload ID photo</Text>
      <TouchableOpacity activeOpacity={providerProfile?.idPicture ? 1 : 0.5} onPress={() => setIsShowModal(true)}>
        <Image source={providerProfile?.idPicture ? { uri: providerProfile?.idPicture } : require('../../../../assets/icon/uploadProfile.png')} style={styles.selectedImage} />
      </TouchableOpacity>
      <SelectImage isShowModal={isShowModal} closeModal={setIsShowModal} imageUri={getImageUrl} />
    </View>
  )

  const getFooterView = () => (
    <View style={styles.footerContainer}>
      <Button disabled title={t('back')} isSmall width={'30%'} />
      <Button title={t('next')} isPrimary isSmall width={'30%'} onPress={onPressNext} />
    </View>
  )

  return (
    <>
      <View style={styles.inputContainer}>
        <Input
          placeholder={registration.first_name}
          onBlur={onBlurFirstName}
          onChangeText={onChangeFirstName}
          ref={firstNameRef}
          defaultValue={providerProfile?.firstName}
          inputValue={providerProfile?.firstName ?? ''}
          errorMessage={firstNameError}
          returnKeyType={'next'}
          onSubmitEditing={() => lastNameRef.current.focus()}
          onClearInputText={() => firstNameRef.current.clear()}
        />
        <Input
          placeholder={registration.last_name}
          type={'nameSuffix'}
          inputStyle={styles.inputLastName}
          onChangeText={onChangeLastName}
          onBlur={onBlurLastName}
          defaultValue={providerProfile?.lastName}
          ref={lastNameRef}
          inputValue={providerProfile?.lastName ?? ''}
          errorMessage={lastNameError}
          onClearInputText={() => lastNameRef.current.clear()}
        />
        <Dropdown
          data={[{ name: 'Doctor' }, { name: 'Nurse' }, { name: 'Healer' }, { name: 'Physio' }, { name: 'Other' }]}
          labelField={'name'}
          valueField="name"
          placeholder="Type of provider"
          value={providerProfile?.provider?.name}
          onChange={onChangeProviderTypes}
          renderItem={renderItems}
          errorMessage={providerTypeError}
          onBlur={onBlurProviderTypes}
        />
        <Dropdown
          data={data.find((item) => item.name.en === selectedProvider?.name)?.specialties || []}
          labelField="name.en"
          valueField="name.en"
          placeholder="Specialty"
          value={providerProfile?.speciality?.name}
          onChange={onChangeSpecialty}
          renderItem={renderItem}
          errorMessage={specialtyError}
          onBlur={onBlurSpecialty}
        />

        {getUploadImageView()}
      </View>
      {getFooterView()}
      {renderToast()}
    </>
  )
}

export default ProviderDetail

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    textAlign: 'center'
  },

  inputLastName: {
    marginTop: getHeight(dimens.marginM + dimens.paddingXs)
  },

  iconContainer: {
    flexDirection: 'row',
    gap: getHeight(dimens.marginS),
    alignItems: 'center',
    marginTop: getHeight(dimens.sideMargin)
  },

  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS + 2),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.paddingS)
  },
  box: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS)
  },
  placeholderStyle: {
    fontSize: fontSize.textL,
    color: colors.black
  },
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(50),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold)
  },
  icon: {
    marginRight: 5
  },
  textItem: {
    flex: 1,
    fontSize: fontSize.textL,
    color: colors.black,
    padding: getHeight(dimens.marginS),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold)
  },
  selectedTextStyle: {
    fontSize: fontSize.textL,
    color: colors.black
  },
  iconStyle: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM)
  },
  editBlueImage: {
    height: getHeight(dimens.paddingL),
    width: getWidth(dimens.paddingL),
    marginBottom: getHeight(dimens.paddingXs)
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
  }
})
