import React from 'react'
import { Text as RNText, TextProps } from 'react-native'

const Text = ({ title, ...props }: { title: String } & TextProps) => {
  return (
    <RNText {...props}>
      {title}
    </RNText>
  )
}
export default Text
