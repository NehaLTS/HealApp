import React from 'react';
import { ImageProps, ImageSourcePropType, Image as RNImage, ViewStyle } from 'react-native';
import { getHeight, getWidth } from '../libs/StyleHelper';
import { dimens } from '../designToken/dimens';

const Image = ({ source, width, height, style, ...props }: { source: ImageSourcePropType; width?: number; height?: number; style?: ViewStyle } & ImageProps) => {
    const imageStyle: ViewStyle = {
        width: width ?? getWidth(dimens.imageL), 
        height: height ?? getHeight(dimens.imageL), 
        borderRadius: getHeight( dimens.sideMargin/2), 
    };

    return <RNImage source={source} style={[imageStyle, style]} {...props} />
}

export default Image
