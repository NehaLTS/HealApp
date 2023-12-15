import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { colors } from 'designToken/colors';
import { fontWeight } from 'designToken/fontWeights';
import { getHeight, getWidth } from 'libs/StyleHelper';
import Modal from 'react-native-modal/dist/modal';
import uploadImage from 'libs/uploadImage';

const SelectImage = ({
  imageUri,
  closeModal,
  isShowModal,
}: {
  imageUri: (path: string) => void;
  closeModal: (path: boolean) => void;
  isShowModal: boolean;
}) => {
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(250);

  const handleImagePicker = () => {
    ImagePicker?.openPicker?.({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        imageUri(image?.path ?? '');
        setHeight(height);
        setWidth(width);
        closeModal(false);
        console.log('gallery image******', image);
      })
      .catch((error) => {
        console.log('error gallery', error);
      });
  };

  const handleCameraPicker = () => {
    ImagePicker?.openCamera?.({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        image.path.length && imageUri(image?.path ?? '');
        setHeight(height);
        setWidth(width);
        closeModal(false);
        console.log('camera image******', image);
        // console.log(image)
        // const imagePath = image?.path;
        // const folderName = 'images/users';
        // const fileName = 'profile.jpg';
        // uploadImage(imagePath, folderName, fileName)
        //   .then((downloadURL) => {
        //     // Handle the downloadURL as needed
        //     console.log('Download URL:', downloadURL);

        //   })
        //   .catch((error) => {
        //     // Handle any errors
        //     console.error('Error uploading image:', error);
        //   });
      })
      .catch((error: Error) => {
        console.log('error camera', error);

        if (error.message.includes('permission')) {
          Alert.alert('Please give Camera Permission from Settings');
        }
      });
  };

  return (
    <Modal isVisible={isShowModal} style={{ justifyContent: 'flex-end' }}>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          rowGap: getHeight(10),
        }}
      >
        <View
          style={{
            borderRadius: getHeight(10),
            backgroundColor: colors.white,
          }}
        >
          <TouchableOpacity
            onPress={handleImagePicker}
            style={{
              paddingVertical: getHeight(16),
              borderBottomWidth: getHeight(1),
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: getHeight(16),
                color: colors.black,
                fontWeight: fontWeight.semiBold,
              }}
            >
              {'Choose from Gallery'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCameraPicker}
            style={{
              paddingVertical: getHeight(16),
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: getHeight(16),
                color: colors.black,
                fontWeight: fontWeight.semiBold,
              }}
            >
              {'Take a Photo'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => closeModal(false)}
          style={{
            paddingVertical: getHeight(16),
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: getHeight(10),
          }}
        >
          <Text
            style={{
              fontSize: getHeight(16),
              color: colors.invalid,
              fontWeight: fontWeight.semiBold,
            }}
          >
            {'Close'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SelectImage;
