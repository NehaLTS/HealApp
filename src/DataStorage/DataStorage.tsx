// import { dataStorage } from './Store'

// // type StorageKeys = 'USER' | 'CHALLENGE' | 'LESSON' | 'RECENTSEARCH'
// // type StorageObject = { USER: UserType; CHALLENGE: UserAndResult; LESSON: LessonType; RECENTSEARCH: Search }
// type StorageKeys = 'USER' | 'LANGUAGE'
// type StorageObject = { USER: {}, LANGUAGE: string }
// export const setLocalData = <K extends StorageKeys>(key: K, object: Partial<StorageObject[K]>) => {
//     const data = getLocalData(key) || {}
//     const updatedData = { ...data, ...object }
//     console.log("JSON.stringify(updatedData)", JSON.stringify(updatedData))
//     dataStorage.set(key, JSON.stringify(updatedData))
// }

// export const getLocalData = <K extends StorageKeys>(key: K): Partial<StorageObject[K]> | undefined => {
//     const data = dataStorage.getString(key)
//     if (!data) return undefined
//     return JSON.parse(data) as Partial<StorageObject[K]>
// }
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DataStorage = () => {
    return (
        <View>
            <Text>DataStorage</Text>
        </View>
    )
}

export default DataStorage

const styles = StyleSheet.create({})