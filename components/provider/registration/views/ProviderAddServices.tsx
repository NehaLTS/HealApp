import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
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
import { Name, Service } from "libs/types/ProvierTypes";
import { UseUserContextProvider } from "contexts/useUserContextProvider";

const ProviderAddServices = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { onCreateProviderServices, onGetUserAllServices } =
    AuthServicesProvider();
  const {  setUserDataProvider } = UseUserContextProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [service, setService] = useState<Service>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const {
    userDataProvider,
    serviceNameRef,
    priceRef,
    descriptionRef,
    // onBlurServiceName,
    // onChangeServiceName,
    // onBlurPriceName,
    // onChangePriceName,
    // onBlurDescription,
    // onChangeDescription,
    // serviceError,
    // priceError,
    // descriptionError,
  } = ProviderAddServicesController();
  // const [isService, setIsService] = useState(false);

  const [isServiceAdded, setIsServiceAdded] = useState(false);
  console.log(isServiceAdded);

  ////////TEMP ADDED HERE NEED TO MOVE TO CONTROLLERS
  const [serviceError, setServiceError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const onBlurServiceName = () => {
    validateServiceName();

  };
  const onChangeServiceName = (value: string) =>
    (serviceNameRef.current.value = value);
  const onBlurPriceName = () => {
    validatePrice();

  };
  const onChangePriceName = (value: string) => (priceRef.current.value = value);
  const onBlurDescription = () => {
    validateDescription();

  };
  const onChangeDescription = (value: string) =>
    (descriptionRef.current.value = value);

  const validateServiceName = () => {
    if (!serviceNameRef.current.value) {
      setServiceError("Service name is required");
    } else {
      setServiceError("");
    }
  };
  const validatePrice = () => {
    if (!priceRef.current.value) {
      setPriceError("Price is required");
    } else {
      setPriceError("");
    }
  };
  const validateDescription = () => {
    if (!descriptionRef.current.value) {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  };

  ////////////

  const getUserAllServices = async () => {
    setIsServiceLoading(true);
    let response = await onGetUserAllServices({ provider_id: "1" ?? "1" });

    console.log("resp is ", response);
    if (response) {
      setServices(response);
      setUserDataProvider({...userDataProvider, providerServices:true })
    }

    setIsServiceLoading(false);
  };

  useEffect(() => {
    getUserAllServices();
  }, []);

  const saveService = async () => {
    if (serviceNameRef.current.value && descriptionRef.current.value && priceRef.current.value) {

      let data = {
        name: { en: serviceNameRef.current.value, hi: "", he: "" },
        description: { en: descriptionRef.current.value, hi: "", he: "" },
        price: priceRef.current.value
      }

      setService({ ...service as Service, ...data })

      // if(userDataProvider.provider_id && userDataProvider.speciality_id){
      setIsLoading(true);
      //  let response= await onCreateProviderServices({name:serviceNameRef.current.value,description:descriptionRef.current.value,price:priceRef.current.value,currency:"USD",provider_id:userDataProvider.provider_id, specialty_id: userDataProvider.speciality_id});


      let response = await onCreateProviderServices({ name: serviceNameRef.current.value, description: descriptionRef.current.value, price: priceRef.current.value, provider_id: '1', specialty_id: '1' });

      console.log("response is ", response)

      //Need to check for success and then append
      getUserAllServices();
      setIsLoading(false);
      toggleModal();
      // }
    } else {
      Alert.alert("Please fill all the details");
    }

  };

  const getAllServices = () => {
    return services.map((item, index) => (
      <View key={index} style={[styles.serviceContainer, styles.elevation]}>
        <Text
          style={[
            { marginBottom: getHeight(14), fontFamily: fontFamily.medium },
          ]}>
          {item.name.en} $ {item.price}
        </Text>
        <Text style={styles.textView}>{item.description.en}</Text>
      </View>
    ));
  };

  return (
    <>

      <ScrollView>
        {services && services.length > 0 ? (
          <>{getAllServices()}</>
        ) : (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Do you provide another {"\n"}services which not on {"\n"}the
                list?
              </Text>
            </View>
          </>
        )}
        <View style={styles.container}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={require("../../../../assets/icon/add.png")}
              style={styles.addicon}
            />
          </TouchableOpacity>
          <Text style={styles.textAdd}>Add another service</Text>
        </View>
      </ScrollView>

        {!isServiceAdded && (
          <Modal
            isVisible={isModalVisible}
            backdropOpacity={0.8}
            backdropColor={colors.white}>
              
      <KeyboardAvoidingView  keyboardVerticalOffset={-50} behavior={'padding'} style={{ flex: 0.8 }}>
            <View style={styles.modalContent}>
              <Text style={styles.addService}>Add service</Text>
              <Input
                placeholder={"Name of the service*"}
                onBlur={onBlurServiceName}
                onChangeText={onChangeServiceName}
                ref={serviceNameRef}
                defaultValue={service?.name?.en}
                inputValue={""}
                errorMessage={serviceError}
                returnKeyType={"next"}
                onSubmitEditing={() => priceRef.current.focus()}
                onClearInputText={() => serviceNameRef.current.clear()}

              />
              <Input
                placeholder={"Price*"}
                inputStyle={styles.input}
                onBlur={onBlurPriceName}
                onChangeText={onChangePriceName}
                ref={priceRef}
                defaultValue={service?.price}
                inputValue={""}
                errorMessage={priceError}
                keyboardType="numeric"
                returnKeyType={"next"}
                onSubmitEditing={() => descriptionRef.current.focus()}
                onClearInputText={() => priceRef.current.clear()}

              />
              <Input
                placeholder={"Description"}
                inputStyle={styles.description}
                onBlur={onBlurDescription}
                onChangeText={onChangeDescription}
                ref={descriptionRef}
                defaultValue={service?.description?.en}
                inputValue={""}
                errorMessage={descriptionError}
                onClearInputText={() => descriptionRef.current.clear()}

              />
              <Button
                title={"Save"}
                isPrimary
                isSmall
                width={getWidth(85)}
                style={{
                  alignSelf: "center",
                  marginVertical: getHeight(dimens.sideMargin + dimens.marginS),
                }}
                onPress={saveService}
                fontSized={getWidth(15)}
                height={getHeight(34)}
              />
              <TextButton
                style={{ alignSelf: "center" }}
                fontSize={getWidth(fontSize.textXl + 2)}
                title={"Cancel"}
                onPress={toggleModal}
              />
            </View>
            </KeyboardAvoidingView>
          </Modal>
        )}
      {/* {isServiceAdded && (
        <View style={[styles.serviceContainer, styles.elevation]}>
          <Text style={styles.textView}>{userDataProvider.services ?? ""}</Text>
          <Text style={styles.textView}>
            {userDataProvider.description ?? ""}
          </Text>
          <Text style={styles.textView}> {userDataProvider.price ?? ""}</Text>
        </View>
      )} */}

    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: colors.modal,
    padding: getHeight(dimens.marginM + 2),
    marginHorizontal: getHeight(dimens.paddingL),
    marginTop: getHeight(dimens.sideMargin),
    marginBottom: getHeight(dimens.marginL),
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
    marginBottom: getHeight(20),
  },
  textView: {
    color: colors.black,
    // textAlign: "center",
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
    borderRadius: getWidth(dimens.marginS),
    marginBottom: getHeight(dimens.imageS + dimens.imageXs),
    paddingTop: getHeight(dimens.sideMargin),
    paddingBottom: getHeight(dimens.paddingL),
  },
  input: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
  },

  description: {
    marginTop: getHeight(dimens.sideMargin + dimens.marginS),
    height: getHeight(dimens.imageM + dimens.paddingL + 10),
    alignItems: "flex-start",
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
    marginTop: 10,
  },
  elevation: {
    elevation: getHeight(12),
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
