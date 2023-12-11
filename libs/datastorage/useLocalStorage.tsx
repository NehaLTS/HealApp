import { Order } from 'libs/types/OrderTypes';
import { ClientProfile, ProviderProfile, ProviderServices, UserType, UserTypeProvider } from '../types/UserType';
import { MMKV } from 'react-native-mmkv'
const dataStorage = new MMKV()


type StorageKeys = 'USERPROFILE' | 'USER' | 'PROVIDERSERVICES' | 'ORDER' | 'notificationCount'
type StorageObject = { notificationCount: number, USERPROFILE: ClientProfile | UserTypeProvider | ProviderProfile, USER: any, PROVIDERSERVICES: ProviderServices[], ORDER: Order }

export const setLocalData = <K extends StorageKeys>(key: K, object: Partial<StorageObject[K]>) => {
  const data = getLocalData(key) || {}
  const updatedData = { ...data, ...object }
  console.log("JSON.stringify local", updatedData)
  dataStorage.set(key, JSON.stringify(updatedData))
}

export const getLocalData = <K extends StorageKeys>(key: K): Partial<StorageObject[K]> | undefined => {
  const data = dataStorage.getString(key)
  if (!data) return undefined
  return JSON.parse(data) as Partial<StorageObject[K]>
}


export const deleteLocalData = () => {
  dataStorage.clearAll()
}