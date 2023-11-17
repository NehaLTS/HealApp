import { colors } from "designToken/colors"
import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { getWidth } from "libs/StyleHelper"

const ArrivalTime=({totalTime}:{totalTime:number})=>{
 const timeLeft= useRef<number>(0)
 const [timeToArrive, setTimeToArrive]= useState(totalTime)
useEffect(()=>{
  
    const interval = setInterval(() => {
        console.log('timeLeft.current',timeToArrive)
        if(timeToArrive>0){
        const leftTime= timeToArrive-1;
        // timeLeft.current= leftTime;
        setTimeToArrive(leftTime)
        }
        },1000);
  return ()=>{ clearInterval(interval) }
},[timeToArrive])
return (
    <View style={styles.mainView}>
        <View style={styles.timeBoxView}>
            <Text title={'00'} style={styles.timeText}/>
        </View>
        <View style={styles.timeBoxView}>
            <Text title={`${timeToArrive==0? '00':timeToArrive}`} style={styles.timeText}/>
        </View>
    </View>
)
}

export default ArrivalTime

const styles= StyleSheet.create({
    mainView:{
     alignItems:'center',
     alignSelf:'center',
     flexDirection:'row'  
    },
    timeBoxView:{
        backgroundColor:colors.secondary,
        marginHorizontal:getWidth(2),
        padding:getWidth(5),
        borderRadius:getWidth(10)
    },
    timeText:{
        color:colors.white
    }
})