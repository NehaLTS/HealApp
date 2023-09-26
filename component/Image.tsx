import { StyleSheet, Image as RNImage, ImageSourcePropType, ImageProps } from 'react-native'
import React from 'react'

const Image = ({ source, ...props }: { source: ImageSourcePropType } & ImageProps) => {
    return <RNImage source={source} {...props} />
}

export default Image

const styles = StyleSheet.create({})