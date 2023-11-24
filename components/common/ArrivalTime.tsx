import { colors } from "designToken/colors"
import { dimens } from "designToken/dimens"
import { fontFamily } from "designToken/fontFamily"
import { fontSize } from "designToken/fontSizes"
import { getHeight, getWidth } from "libs/StyleHelper"
import { setLocalData } from "libs/datastorage/useLocalStorage"
import React, { useEffect, useRef, useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import Text from "./Text"
import useUpdateEffect from "libs/UseUpdateEffect"
import { UseClientUserContext } from "contexts/UseClientUserContext"

const ArrivalTime=({totalTime, remainingSeconds}:{totalTime:number, remainingSeconds:number})=>{
 const [timeToArrive, setTimeToArrive]= useState(totalTime)
 const [seconds, setSeconds]= useState(remainingSeconds)
 const timeOutRef = useRef<NodeJS.Timeout | undefined>()
 const minuteRef= useRef<NodeJS.Timeout | undefined>()
 const{setProviderStatus , setRemainingTime}= UseClientUserContext()

 useEffect(()=>{
    minuteRef.current= setInterval(() => {
        console.log('timeLeft.current',timeToArrive)
        if(timeToArrive>0){
        const leftTime= timeToArrive-1;
        setTimeToArrive(leftTime)
        }
        },60000);
  return ()=>{
     clearInterval(minuteRef.current)
 }
},[timeToArrive])


    useEffect(()=>{
        timeOutRef.current = setInterval(() => {
            console.log('timeLeft.seconds',seconds)
            if(seconds>0){  
            const leftSeconds= seconds-1;
            setSeconds(leftSeconds)
            setRemainingTime({minutes:timeToArrive,seconds: seconds})} 
            else if(timeToArrive>0){ setSeconds(60)} 
            },1000);
            return ()=>{clearInterval(timeOutRef.current)}  
    },[seconds])

 useUpdateEffect(()=>{
    if(seconds===0&& timeToArrive<0){
        setProviderStatus('arrived')
        setLocalData('ORDER', { providerDetail:''})
    clearInterval(timeOutRef.current)
    }
 },[seconds])

 
 useUpdateEffect(()=>{
    if( timeToArrive<0){
     
    clearInterval(minuteRef.current)
    }
 },[timeToArrive])

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