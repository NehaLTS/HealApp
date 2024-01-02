import { colors } from 'designToken/colors';
import { fontWeight } from 'designToken/fontWeights';
import { getHeight } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal/dist/modal';

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
  const { t } = useTranslation();

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
      })
      .catch((error: Error) => {
        console.log('error camera', error);
        if (error.message.includes('permission')) {
          Alert.alert(t('camera_permission'));
        }
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
      })
      .catch((error: Error) => {
        console.log('error camera', error);
        if (error.message.includes('permission')) {
          Alert.alert(t('camera_permission'));
        }
      });
  };

  return (
    <Modal
      isVisible={isShowModal}
      style={{ justifyContent: 'flex-end' }}
      onBackdropPress={() => closeModal(false)}
    >
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
              {t('choose_gallery')}
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
              {t('take_photo')}
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
            {t('close')}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SelectImage;
