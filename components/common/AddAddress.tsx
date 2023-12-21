import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Input from './Input';
import RNModal from './Modal';
import TextButton from './TextButton';
import { dimens } from 'designToken/dimens';
import Text from './Text';
import location from 'assets/icon/location.png';
import { useTranslation } from 'react-i18next';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import Loader from './Loader';
// import { getGemomatrichLocationFromPlaceId } from 'libs/utility/Utils';

const AddAddress = ({
  address,
  isVisible,
  onClose,
  defaultValue,
}: {
  address: (address: string, latitude: string, longitude: string) => void;
  isVisible: boolean;
  onClose: () => void;
  defaultValue: string;
}) => {
  const { userLocation, setUserProfile } = UseClientUserContext();
  const [searchAddress, setSearchAddress] = useState(
    defaultValue || userLocation?.currentLocation?.address,
  );
  const [addressValue, setAddressValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = React.useRef<any>('');
  const { t } = useTranslation();
  const apiKey = 'AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o';

  // const abc = () => {
  //   inputRef.current?.focus();
  // };
  // useEffect(() => {
  //   // inputRef.current?.focus();
  //   abc();
  // }, []);

  const handleInputChange = async (text: string) => {
    setAddressValue(text);

    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}`;
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = async (selectedPrediction: any) => {
    setSearchAddress(selectedPrediction.description);
    console.log('setSearchAddress', selectedPrediction.description);

    onClose();
    const placeId = selectedPrediction?.place_id;

    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`;

    try {
      const response = await fetch(detailsUrl);
      const data = await response.json();
      if (
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const { lat, lng } = data.result.geometry.location;
        const geomatricLocation = { latitude: lat, longitude: lng };
        address(selectedPrediction.description, lat.toString(), lng.toString());

        console.log('Latitude:', lat, 'Longitude:', lng);
        return geomatricLocation;
      } else {
        console.error('Place details unavailable or incomplete:', data);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
    // getGemomatrichLocationFromPlaceId(placeId).then((res) => {
    //   address(selectedPrediction.description, res?.latitude.toString(), res?.longitude.toString());
    // })
  };

  return (
    <RNModal
      style={styles.modal}
      backdropOpacity={1}
      backdropColor={colors.white}
      isVisible={isVisible}
      animationInTiming={600}
      backdropTransitionInTiming={400}
      animationIn={'fadeInUp'}
      onShow={() => inputRef.current.focus()}
    >
      <View style={styles.addressView}>
        <Input
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
          inputPlaceholder={t('search_address')}
          type={'fullStreetAddress'}
          inputStyle={[{ minWidth: '84%' }]}
          onChangeText={handleInputChange}
          defaultValue={searchAddress}
          autoFocus={true}
          isSearch={(searchAddress?.length ?? 0) > 2}
          onClearInputText={() => setSearchAddress('')}
        />
        <TextButton
          containerStyle={styles.closeButton}
          title={t('close')}
          fontSize={getHeight(fontSize.textL)}
          onPress={onClose}
        />
      </View>
      {suggestions.length > 0 ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          data={suggestions}
          contentContainerStyle={{ paddingTop: getHeight(dimens.marginS) }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.addressContainer}
              onPress={() => handleSuggestionSelect(item)}
            >
              <Image source={location} style={styles.location} />
              <Text style={styles.addressText} title={item?.description} />
            </TouchableOpacity>
          )}
        />
      ) : addressValue.length === 0 ? (
        <Text style={styles.addressNotFound} title={t('your_address')} />
      ) : addressValue.length > 0 && isLoading ? (
        <Loader isSmall />
      ) : (
        <Text style={styles.addressNotFound} title={t('address_not_found')} />
      )}
    </RNModal>
  );
};
export default AddAddress;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
  },
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(dimens.paddingS),
  },
  addressContainer: {
    marginVertical: getHeight(dimens.marginS),
    flexDirection: 'row',
    alignItems: 'center',
    gap: getWidth(dimens.marginS),
  },
  location: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.sideMargin),
    resizeMode: 'center',
  },
  addressText: {
    flexWrap: 'wrap',
    width: '91%',
    fontSize: getHeight(fontSize.textM),
    textAlign: 'left',
  },
  closeButton: {
    width: '16%',
    alignItems: 'flex-end',
  },
  addressNotFound: {
    fontSize: getHeight(fontSize.textM),
    textAlign: 'center',
    marginTop: getHeight(dimens.buttonHeight),
  },
});
