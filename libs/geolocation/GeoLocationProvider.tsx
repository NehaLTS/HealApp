import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';


// To get the current location
export const onGetLocationCoordinates = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
      // console.error(`Error getting location: ${error}`);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}
const API_KEY = 'YOUR_API_KEY';

const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    );

    if (response.data.results.length > 0) {
      const addressDetails = response.data.results[0];
      console.log('Address details:', addressDetails);
      // You can access specific parts of the address like addressDetails.formatted_address
    } else {
      console.error('No address details found');
    }
  } catch (error) {
    console.error('Error fetching address details:', error);
  }
};