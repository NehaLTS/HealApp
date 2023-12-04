import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface GeocodeResult {
  results: {
    formatted_address: string;
  }[];
}

const useCurrentAddress = () => {
  const { setCurrentLocationOfUser } = UseClientUserContext();

  const getCurrentLocation = (): Promise<Position> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  };

  const getCurrentAddressFromAPI = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    const apiKey = 'AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data: GeocodeResult = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      throw new Error('Error fetching address from API');
    }
  };

  const fetchCurrentAddress = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const location = await getCurrentLocation();
        if (location) {
          const { latitude, longitude } = location.coords;
          const address = await getCurrentAddressFromAPI(latitude, longitude);
          if (address !== null) {
            resolve(address); // Resolve the Promise with the address
          }
        }
      } catch (error) {
        console.error('Error fetching current address:', error);
        reject(error); // Reject the Promise if an error occurs
      }
    });
  };

  return { fetchCurrentAddress };
};

export { useCurrentAddress };
