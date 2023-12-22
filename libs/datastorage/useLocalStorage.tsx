import { ClientOrder, Order, ProviderOrder } from 'libs/types/OrderTypes';
import { MMKV } from 'react-native-mmkv';
import {
  AddToWallet,
  ClientProfile,
  ProviderProfile,
  ProviderServices,
  UserTypeProvider,
  userLocation,
  userlocationType,
} from '../types/UserType';
const dataStorage = new MMKV();

type StorageKeys =
  | 'USERPROFILE'
  | 'USER'
  | 'PROVIDERSERVICES'
  | 'ORDER'
  | 'PROVIDERORDER'
  | 'LOCATION'
  | 'WALLETDETAIL';
type StorageObject = {
  USERPROFILE: ClientProfile | UserTypeProvider | ProviderProfile;
  USER: any;
  PROVIDERSERVICES: ProviderServices[];
  ORDER: Order | ClientOrder;
  PROVIDERORDER: ProviderOrder;
  LOCATION: userLocation;
  WALLETDETAIL: AddToWallet;
};

export const setLocalData = <K extends StorageKeys>(
  key: K,
  object: Partial<StorageObject[K]>,
) => {
  const data = getLocalData(key) || {};
  const updatedData = { ...data, ...object };
  console.log('JSON.stringify local', updatedData);
  dataStorage.set(key, JSON.stringify(updatedData));
};

export const getLocalData = <K extends StorageKeys>(
  key: K,
): Partial<StorageObject[K]> | undefined => {
  const data = dataStorage.getString(key);
  if (!data) return undefined;
  return JSON.parse(data) as Partial<StorageObject[K]>;
};

export const deleteLocalData = () => {
  dataStorage.clearAll();
};

export const deleteOrder = () => {
  dataStorage.delete('ORDER');
};
