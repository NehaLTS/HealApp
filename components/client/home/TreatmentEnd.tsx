import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from 'components/common/Text'
import { getHeight, getWidth } from 'libs/StyleHelper'
import { dimens } from 'designToken/dimens'

const TreatmentEnd = () => {
  return (
    <View>
      <Text title={"Treatment is ended"} />
      <View style={styles.container}>
        <Image source={require('../../../assets/icon/doctorIcon.png')} style={styles.doctorIcon} />
        {/* <Image source={require("../../../assets/icon/star.png")} style={styles.starIcon} /> */}
        <View>
   
        <Text title={"Elena Miron,\nFamily doctor"} />
        <View style={{flexDirection:"row",gap:20}}>
          <Image source={require('../../../assets/icon/heart.png')} style={styles.heartIcon} />
          <Text title={"Add to favourites"} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default TreatmentEnd

const styles = StyleSheet.create({
  doctorIcon: {
    width: getWidth(110),
    height: getHeight(110),
    resizeMode: "contain",
  },
  starIcon: {
    position: 'absolute',
    bottom: getHeight(0),
    left: getHeight(0),
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap:30
  },
  heartIcon:{
     width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
  }
})