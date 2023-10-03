import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../designToken/colors";
import { fontSize } from "../../../../designToken/fontSizes";
import { fontWeight } from "../../../../designToken/fontWeights";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import SelectImage from "../../../common/SelectImage";

const UserAddress = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  return (
    <>
      <View style={{ rowGap: getHeight(26) }}>
        <Input placeholder={"Address*"} type={"fullStreetAddress"} />
        <Input
          placeholder={"Date of Birth*"}
          type={"telephoneNumber"}
          keyboardType="numeric"
        />
        <Input
          placeholder={"ID Number*"}
          type={"telephoneNumber"}
          keyboardType="number-pad"
        />
      </View>
      <Text style={styles.text}>
        *It will help us to find a best doctor for you
      </Text>
      <View style={styles.innerContainer}>
        <Text style={styles.profileText}>Add a profile photo</Text>
        <TouchableOpacity
          activeOpacity={selectedImage ? 1 : 0.5}
          onPress={() => {
            !selectedImage && setIsShowModal(true);
          }}
        >
          <Image
            source={
              selectedImage
                ? { uri: selectedImage }
                : require("../../../../assets/icon/editprofile.png")
            }
            style={styles.editProfile}
          />
        </TouchableOpacity>
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={setSelectedImage}
        />
      </View>
    </>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(20),
    marginTop: getHeight(12),
  },
  profileText: {
    color: colors.black,
    fontSize: getWidth(fontSize.textL),
    fontWeight: fontWeight.normal,
  },
  editProfile: {
    height: getHeight(60),
    width: getWidth(60),
  },
  text: {
    fontSize: fontSize.textM,
    color: colors.black,
    paddingTop: getHeight(5),
  },
});
