import doctor from 'assets/icon/doctor.png';
import nurse from 'assets/icon/nurse.png';
import healer from 'assets/icon/healer.png';
import clinic from 'assets/icon/clinic.png';
import physio from 'assets/icon/physio.png';
import doctorOnline from 'assets/icon/doctorOnline.png';
import { PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

export const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/;
export const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const numericPattern = /^\d+$/;
export const generateRandomName = () => {
  let randomstring = Math.random().toString(36).slice(2);
  return randomstring;
};

export const getProviderImage = (type: string) => {
  const image = type.includes('Doctor')
    ? doctor
    : type?.includes('Nurse')
    ? nurse
    : type?.includes('Healer') || type?.includes('Alternative')
    ? healer
    : type?.includes('Physio')
    ? physio
    : type?.includes('Clinics')
    ? clinic
    : doctorOnline;
  return image;
};

export const checkLocationPermission = () :Promise<boolean>=> {
  return check(
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_ALWAYS,
  )
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return false;
        case RESULTS.DENIED:
          return false;
        case RESULTS.LIMITED:
          return false;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          return false;
      }
    })
    .catch((error) => {

      console.log("permission check error ",error)
      return false;
    });

    
};
