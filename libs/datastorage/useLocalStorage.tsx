import { UserType } from '../types/UserType';
import { dataStorage } from './LocalStorage'

type StorageKeys = 'USER'
type StorageObject = { USER: UserType }

export const setLocalData = <K extends StorageKeys>(key: K, object: Partial<StorageObject[K]>) => {
  const data = getLocalData(key) || {}
  const updatedData = { ...data, ...object }
  console.log("JSON.stringify(updatedData)", JSON.stringify(updatedData))
  dataStorage.set(key, JSON.stringify(updatedData))
}

export const getLocalData = <K extends StorageKeys>(key: K): Partial<StorageObject[K]> | undefined => {
  const data = dataStorage.getString(key)
  if (!data) return undefined
  return JSON.parse(data) as Partial<StorageObject[K]>
}
