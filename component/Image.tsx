import { StyleSheet, Image as RNImage, ImageSourcePropType, ImageProps, ViewStyle } from 'react-native'
import React from 'react'

const Image = ({ source, width, height, ...props }: { source: ImageSourcePropType; width?: number; height?: number } & ImageProps) => {
    const imageStyle: ViewStyle = {
        width: width || 247, 
        height: height || 252, 
    };

    return <RNImage source={source}  style={[imageStyle, styles.image]}  {...props} />
}

export default Image

const styles = StyleSheet.create({
    image:{

    }
})