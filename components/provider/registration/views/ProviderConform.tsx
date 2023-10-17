import { useNavigation } from '@react-navigation/native'
import Header from 'components/common/Header'
import Text from 'components/common/Text'
import { UseUserContextProvider } from 'contexts/useUserContextProvider'
import { colors } from 'designToken/colors'
import { dimens } from 'designToken/dimens'
import { fontFamily } from 'designToken/fontFamily'
import { fontSize } from 'designToken/fontSizes'
import { getHeight, getWidth } from 'libs/StyleHelper'
import React, { useLayoutEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'

const ProviderConform = () => {
  const navigation = useNavigation();
  const { userDataProvider } = UseUserContextProvider()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Registration" />,
    });
  }, [navigation]);
  return (
    <View style={{flex:1, backgroundColor: colors.white}}>
      <View style={{ alignItems: "center", paddingTop: getHeight(50) }}>
        <Image
          source={userDataProvider.profile_picture?.length ? {uri:userDataProvider.profile_picture } : require("../../../../assets/icon/provider.png")}
          style={styles.finalicon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Your form was successfully
          submitted and now waiting{"\n"} for the approval.{"\n"}
          We'll get back to you{"\n"}
          within 7 days.</Text>
        <Text style={styles.querytext}>If you have any questions{"\n"}
          feel free to call us</Text>
          <Text style={styles.number}>+972-555-00-11</Text>
      </View>
    </View>
  )
}

export default ProviderConform

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor:colors.modal,
    padding: getHeight(dimens.marginM + 2),
    marginHorizontal: getHeight(30),
    marginTop: getHeight(50),


  },
  text: {
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),

  },
 number:{
fontSize:fontSize.textM,
textAlign:"center",
marginTop:getHeight(dimens.marginS)
 },
  finalicon: {
    height: dimens.imageM,
    width: dimens.imageM,
    borderRadius: getWidth(dimens.imageM)

  },
  querytext:{
    fontSize:fontSize.textM,
    marginTop:getHeight(dimens.paddingL),
    textAlign: "center",
  }
 
})