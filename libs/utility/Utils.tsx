import doctor from 'assets/icon/doctor.png';
import nurse from 'assets/icon/nurse.png';
import healer from 'assets/icon/healer.png';
import clinic from 'assets/icon/clinic.png';
import physio from 'assets/icon/physio.png';
import doctorOnline from 'assets/icon/doctorOnline.png';
import { PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import enList from '../../strings/en.json';
import arList from '../../strings/ar.json';
import heList from '../../strings/he.json';
import ruList from '../../strings/ru.json';
import { HealLanguageType } from 'libs/types/UserType';

export const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/;
export const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
export const numericPattern = /^\d+$/;
export const generateRandomName = () => {
  let randomstring = Math.random().toString(36).slice(2);
  return randomstring;
};

export const getProviderImage = (type: string, id: number) => {
  const image =
    type?.includes('Doctor') || id === 1
      ? doctor
      : type?.includes('Nurse') || id === 2
      ? nurse
      : type?.includes('Healer') || type?.includes('Alternative') || id === 3
      ? healer
      : type?.includes('Physio') || id === 4
      ? physio
      : type?.includes('Clinics')
      ? clinic
      : doctorOnline;
  return image;
};

export const getTitle = (item: HealLanguageType, i18n: any) => {
  const title = item?.[i18n.language]?.length
    ? item?.[i18n.language]
    : item?.en;
  return title;
};

export const getProviderName = (id: number) => {
  const { i18n } = useTranslation();
  const provider = () => {
    switch (i18n.language) {
      case 'ar':
        return arList.home.providerList?.find(
          (item) => item?.provider_type_id === id,
        )?.name;
      case 'he':
        return heList.home.providerList?.find(
          (item) => item?.provider_type_id === id,
        )?.name;
      case 'ru':
        return ruList.home.providerList?.find(
          (item) => item?.provider_type_id === id,
        )?.name;
      default:
        return enList.home.providerList?.find(
          (item) => item?.provider_type_id === id,
        )?.name;
    }
  };
  return provider();
};

export const checkLocationPermission = (): Promise<boolean> => {
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
      console.log('permission check error ', error);
      return false;
    });
};

// export const getGemomatrichLocationFromPlaceId = async (placeId: any) => {

//   const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`;

//   try {
//     const response = await fetch(detailsUrl);
//     const data = await response.json();
//     if (
//       data.result &&
//       data.result.geometry &&
//       data.result.geometry.location
//     ) {
//       const { lat, lng } = data.result.geometry.location;
//       const geomatricLocation = { latitude: lat, longitude: lng }

//       console.log('Latitude:', lat, 'Longitude:', lng);
//       return geomatricLocation
//     } else {
//       console.error('Place details unavailable or incomplete:', data);

//     }
//   } catch (error) {
//     console.error('Error fetching place details:', error);
//   }
// }
