import { Dimensions } from 'react-native'

export const FIGMA_WINDOW_WIDTH = 412
export const FIGMA_WINDOW_HEIGHT = 796

export const getWidth = (figmaWidth: number) => {
  const windowWidth = Dimensions.get('window').width
  return (windowWidth / FIGMA_WINDOW_WIDTH) * figmaWidth
}
export const getHeight = (figmaHeight: number) => {
  const windowHeight = Dimensions.get('window').height
  return (windowHeight / FIGMA_WINDOW_HEIGHT) * figmaHeight
}
