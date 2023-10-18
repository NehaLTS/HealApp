import React, { useState } from "react";
import {Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { colors } from "designToken/colors";
import { fontWeight } from "designToken/fontWeights";
import { getHeight } from "libs/StyleHelper";
import Modal from "react-native-modal/dist/modal";

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCameraPicker = () => {
    ImagePicker?.openCamera?.({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        image.path.length &&  imageUri(image?.path ?? '');
        setHeight(height);
        setWidth(width);
        closeModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal isVisible={isShowModal} style={{justifyContent:'flex-end'}} >
        <View
          style={{
            width: "100%",
            position: "absolute",
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
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: getHeight(16),
                  color: colors.black,
                  fontWeight: fontWeight.semiBold,
                }}
              >
                {"Choose from Gallery"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCameraPicker}
              style={{
                paddingVertical: getHeight(16),
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: getHeight(16),
                  color: colors.black,
                  fontWeight: fontWeight.semiBold,
                }}
              >
                {"Take a Photo"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => closeModal(false)}
            style={{
              paddingVertical: getHeight(16),
              alignItems: "center",
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
              {"Close"}
            </Text>
          </TouchableOpacity>
        </View>
    </Modal>
  );
};

export default SelectImage;
