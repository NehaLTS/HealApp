import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense } from 'react'
import { getHeight } from '../libs/StyleHelper'
import { useNavigation } from '@react-navigation/native'
console.log('Screen2 ***********')
const Screen2 = () => {

  const navigation = useNavigation()
  const goToScreen1 = () => {
    // Alert.alert('kjhk')
    navigation.navigate('ProviderStack');
  };
  return (
    <Suspense fallback={<Text style={{fontSize:30, marginTop:50}} >Loading</Text>}>
    <TouchableOpacity
         style={{
           borderWidth: getHeight(1),
           borderColor: "red",
           backgroundColor: "rgba(12, 127, 187, 1)",
           alignItems: "center",
           justifyContent: "center",
           height: getHeight(48),
           borderRadius: getHeight(5),
         }}
         onPress={()=> goToScreen1()}
       >
         <Text
           style={{
             fontSize: getHeight(24),
             color: "#fff",
             fontWeight: "600",
             lineHeight: getHeight(28),
           }}
         >
           navigate to screen3
         </Text>
       </TouchableOpacity>
       </Suspense>
  )
}

export default Screen2

const styles = StyleSheet.create({})