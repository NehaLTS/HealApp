import { colors } from "designToken/colors"
import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { getHeight, getWidth } from "libs/StyleHelper"

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
            <Text title={`${timeToArrive==0? '00':timeToArrive}`} style={styles.timeText}/>
        </View>
        <View style={styles.timeBoxView}>
            <Text title={`${seconds==0? '00':seconds}`} style={styles.timeText}/>
        </View>
    </View>
)
}

export default ArrivalTime

const styles= StyleSheet.create({
    mainView:{
     alignItems:'center',
     alignSelf:'center',
     flexDirection:'row', 
     marginBottom:getHeight(5) 
 
    },
    timeBoxView:{
        backgroundColor:colors.secondary,
        marginHorizontal:getWidth(2),
        padding:getWidth(5),
        borderRadius:getWidth(10),
        height:getHeight(36),
        alignItems:'center',
        width:getWidth(30)
    },
    timeText:{
        color:colors.white
    }
})