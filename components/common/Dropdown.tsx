import { colors } from 'designToken/colors'
import { dimens } from 'designToken/dimens'
import { fontSize } from 'designToken/fontSizes'
import { getHeight, getWidth } from 'libs/StyleHelper'
import React from 'react'
import { I18nManager, StyleSheet } from 'react-native'
import { Dropdown as RNDropdown } from 'react-native-element-dropdown'
import Text from './Text'
import { fontFamily } from 'designToken/fontFamily'

const Dropdown = ({
  data,
  labelField,
  valueField,
  onChange,
  errorMessage,
  ...props
}: {
  data: []
  labelField: string
  valueField: string
  onChange: () => void
  errorMessage: string
} & any) => {
  return (
    <>
      <RNDropdown
        data={data}
        labelField={labelField}
        valueField={valueField}
        onChange={onChange}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedTextStyle}
        itemContainerStyle={[I18nManager.isRTL && { minWidth: '100%', alignItems: 'flex-start' }]}
        containerStyle={[I18nManager.isRTL && { flexDirection: 'row-reverse', justifyContent: 'flex-end' }]}
        iconStyle={[styles.iconStyle, I18nManager.isRTL ? { left: 0 } : { right: 0 }]}
        iconColor={colors.black}
        activeColor={colors.disabled}
        fontFamily={fontFamily.regular}
        {...props}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
    paddingHorizontal: getHeight(dimens.paddingS + dimens.borderBold)
  },
  box: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS)
  },
  selectedTextStyle: {
    fontSize: getWidth(fontSize.textL),
    color: colors.black,
    fontFamily: fontFamily.regular,
    minWidth: '100%',
    textAlign: 'left'
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
    fontSize: getWidth(fontSize.textS)
  },
  iconStyle: {
    height: getHeight(26),
    width: getWidth(26),
    marginTop: getHeight(4),
    position: 'absolute',
    right: 0
  },
  placeholder: {
    color: colors.black
  }
})
