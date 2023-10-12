import axios from 'axios';

// Replace 'YOUR_API_KEY' with your actual Google Geocoding API key
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
