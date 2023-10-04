import React from 'react'
import { Text as RNText, TextProps, StyleSheet } from 'react-native'
import { getHeight } from '../../libs/StyleHelper'
import { fontSize } from '../../designToken/fontSizes'
import { colors } from '../../designToken/colors'

const Text = ({ title, style, ...props }: { title: string } & TextProps) => {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {title}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: getHeight(fontSize.textLg),       
    color: colors.black,    
  },
})

export default Text
