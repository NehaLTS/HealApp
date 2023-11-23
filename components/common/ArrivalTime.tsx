import { colors } from "designToken/colors"
import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { getHeight, getWidth } from "libs/StyleHelper"
import { dimens } from "designToken/dimens"
import { fontSize } from "designToken/fontSizes"
import { fontFamily } from "designToken/fontFamily"

const ArrivalTime=({totalTime}:{totalTime:number})=>{
 const timeLeft= useRef<number>(0)
 const [timeToArrive, setTimeToArrive]= useState(totalTime)
 const [seconds, setSeconds]= useState(60)
useEffect(()=>{
  
    const interval = setInterval(() => {
        console.log('timeLeft.current',timeToArrive)
        if(timeToArrive>0){
        const leftTime= timeToArrive-1;
        // timeLeft.current= leftTime;
        setTimeToArrive(leftTime)
        }
        },60000);
    

  return ()=>{
     clearInterval(interval)

 }
},[timeToArrive])

useEffect(()=>{
  
        const secondsInterval = setInterval(() => {
            console.log('timeLeft.seconds',seconds)
            if(seconds>0){
            const leftSeconds= seconds-1;
            // timeLeft.current= leftTime;
            setSeconds(leftSeconds)
            }else{
                if(timeToArrive>0){
                setSeconds(60)
                }
            }
            },1000);

  return ()=>{
   
     clearInterval(secondsInterval)
 }
},[seconds])

return (
    <View style={styles.mainView}>
        <View style={styles.timeBoxView}>
            <Text title={`${timeToArrive<=0? '00':timeToArrive<10?`${0}${timeToArrive}`:timeToArrive}`} style={styles.timeText}/>
        </View>
        <View style={styles.timeBoxView}>
            <Text title={`${seconds==0? '00':seconds<10?`${0}${seconds}`:seconds}`} style={styles.timeText}/>
        </View>
    </View>
)
}

export default ArrivalTime

const styles= StyleSheet.create({
    mainView: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: getHeight(dimens.paddingXs + 2),
      },
      timeBoxView: {
        backgroundColor: colors.secondary,
        marginHorizontal: getWidth(2),
        padding: getWidth(6),
        borderRadius: getWidth(5),
        height: getHeight(dimens.marginL + 8),
        alignItems: 'center',
        width: getWidth(dimens.marginL + dimens.paddingXs),
      },
      timeText: {
        color: colors.white,
        fontSize: getHeight(fontSize.textL),
        fontFamily: fontFamily.medium,
      },
})