// PopupComponent.js
import React, { useState } from "react";
import { Button, View } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { colors } from "../../designToken/colors";
import { getHeight } from "../../libs/StyleHelper";

const SelectImage = ({ imageUri,closeModal }) => {
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(250);

  const handleImagePicker = () => {
    ImagePicker?.openPicker({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        imageUri(image.path);
        setHeight(height);
        setWidth(width);
        closeModal(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCameraPicker = () => {
    ImagePicker.openCamera({
      width,
      height,
      cropping: true,
    })
      .then((image) => {
        imageUri(image.path);
        setHeight(height);
        setWidth(width);
        closeModal(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <View
        style={{
          borderRadius: getHeight(10),
          backgroundColor: colors.white,
          rowGap: getHeight(30),
          height: getHeight(200),
          width:'90%',
          alignSelf:'center',
          position:'absolute', top:'30%',
          justifyContent:'center',
          paddingHorizontal: getHeight(20),
          zIndex:99
        }}
      >
        <Button title="Choose from Gallery" onPress={handleImagePicker} />
        <Button title="Take a Photo" onPress={handleCameraPicker} />
      </View>
  );
};

export default SelectImage;
