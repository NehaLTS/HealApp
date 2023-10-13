import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "designToken/colors";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import { dimens } from "designToken/dimens";
import Modal from "react-native-modal/dist/modal";
import Input from "components/common/Input";
import Button from "components/common/Button";
import { fontWeight } from "designToken/fontWeights";
import ProviderAddServicesController from "../controllers/ProviderAddServicesController";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";

const ProviderAddServices = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {onCreateProviderServices} = AuthServicesProvider()
  const  [isLoading, setIsLoading] = useState(false)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {
    userDataProvider,
    serviceNameRef,
    priceRef,
    descriptionRef,
    onBlurServiceName,
    onChangeServiceName,
    onBlurPriceName,
    onChangePriceName,
    onBlurDescription,
    onChangeDescription,
    serviceError,
    priceError,
    descriptionError,
  } = ProviderAddServicesController();
  // const [isService, setIsService] = useState(false);
  const [isServiceAdded, setIsServiceAdded] = useState(false);
  console.log(isServiceAdded);

  const saveService = async() => {
    setIsLoading(true);


    let response= await onCreateProviderServices({name:"",description:"",price:"",currency:"",provider_id: '1' ?? '', specialty_id: '1' ?? ''});
    
    setIsLoading(false);
    toggleModal();
  };
  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Do you provide another {"\n"}services which not on {"\n"}the list?
        </Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require("../../../../assets/icon/add.png")}
            style={styles.addicon}
          />
        </TouchableOpacity>
        <Text style={styles.textAdd}>Add another service</Text>
      </View>

      {!isServiceAdded && (
        <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.8}
          backdropColor={colors.white}>
          <View style={styles.modalContent}>
            <Text style={styles.addService}>Add service</Text>
            <Input
              placeholder={"Name of the service*"}
              onBlur={onBlurServiceName}
              onChangeText={onChangeServiceName}
              ref={serviceNameRef}
              value={userDataProvider.services}
              inputValue={userDataProvider?.services ?? ""}
              errorMessage={serviceError}
            />
            <Input
              placeholder={"Price*"}
              inputStyle={styles.input}
              onBlur={onBlurPriceName}
              onChangeText={onChangePriceName}
              ref={priceRef}
              value={userDataProvider.price}
              inputValue={userDataProvider?.price ?? ""}
              errorMessage={priceError}
            />
            <Input
              placeholder={"Description"}
              inputStyle={styles.description}
              onBlur={onBlurDescription}
              onChangeText={onChangeDescription}
              ref={descriptionRef}
              value={userDataProvider.description}
              inputValue={userDataProvider?.description ?? ""}
              errorMessage={descriptionError}
            />
              <Button
                title={"Save"}
                isPrimary
                isSmall
                width={getWidth(85)}
                style={{ alignSelf:'center', marginVertical: getHeight(dimens.sideMargin + dimens.marginS)}}
                onPress={saveService}
                fontSized={getWidth(15)}
                height={getHeight(34)}
              />
              <TextButton style={{ alignSelf:'center'}} fontSize={getWidth(fontSize.textXl+2)} title={"Cancel"} onPress={toggleModal} />

          </View>
        </Modal>
      )}
      {isServiceAdded && (
        <View style={[styles.serviceContainer, styles.elevation]}>
          <Text style={styles.textView}>{userDataProvider.services ?? ""}</Text>
          <Text style={styles.textView}>
            {userDataProvider.description ?? ""}
          </Text>
          <Text style={styles.textView}> {userDataProvider.price ?? ""}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.modal,
    padding: getHeight(dimens.marginM + 2),
    marginHorizontal: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.sideMargin),
    // alignItems:"center"
  },
  text: {
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),
    // marginTop:20
  },
  addService: {
    textAlign: "center",
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getHeight(20)
  },
  textView: {
    color: colors.black,
    textAlign: "center",
    fontFamily: fontFamily.regular,
    fontSize: getWidth(fontSize.textL),
  },
  container: {
    flex: 0.27,
    flexDirection: "row",
    alignItems: "center",
    gap: getHeight(dimens.marginM),
    marginHorizontal: getHeight(dimens.paddingL),
  },
  addicon: {
    height: dimens.imageS,
    width: dimens.imageS,
  },
  textAdd: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.textXl,
  },
  modalContent: {
    backgroundColor: colors.modal,
    borderRadius: getWidth( dimens.marginS),
    marginBottom: getHeight(dimens.imageS + dimens.imageXs),
    paddingTop: getHeight(dimens.sideMargin),
    paddingBottom: getHeight(dimens.paddingL),
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
  },

  description: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
    height: getHeight(dimens.imageM + dimens.paddingL +10),
    alignItems: "flex-start",
    paddingTop: getHeight(dimens.marginM),
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  serviceContainer: {
    backgroundColor: colors.white,
    margin: getHeight(dimens.marginM),
    padding: getHeight(dimens.sideMargin),
    borderRadius: 5,
  },
  elevation: {
    elevation: getHeight(20),
    shadowColor: colors.black,
  },

  serviceText: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.textL,
  },
  readMoreText: {
    color: colors.black,
    textDecorationLine: "underline",
  },
});

export default ProviderAddServices;
