// PopupComponent.js
import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker, {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';

const Camera = () => {
  const [selectedImage, setSelectedImage] = useState();

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response?.assets?.[0]?.uri;
        console.log('source', uri);
        console.log('response', response);
        setSelectedImage(uri);
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled taking a photo');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setSelectedImage(source);
      }
    });
  };

  return (
    <>
      <Modal isVisible={isPopupVisible}>
        <View>
          <Text>Choose an option</Text>
          <Button title="Open Gallery" onPress={openGallery} />
          <Button title="Open Camera" onPress={openCamera} />
          <Button title="Close" onPress={closePopup} />
          {selectedImage ? (
            <Image source={selectedImage} style={{ width: 48, height: 48 }} />
          ) : null}
        </View>
      </Modal>
      <View>
        <Button title="Open Popup" onPress={openPopup} />
      </View>
    </>
  );
};

export default Camera;
