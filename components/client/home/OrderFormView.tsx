
import Button from "components/common/Button";
import Input from "components/common/Input";
import Text from "components/common/Text";
import TextButton from "components/common/TextButton";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "react-native-modal";
import OrderDetailsController from "../../../screens/client/OrderDetailsController";
import { OrderDetail, UseClientUserContext } from "contexts/UseClientUserContext";
import { useTranslation } from "react-i18next";
import RNModal from "components/common/Modal";

const OrderFormView = () => {
  const { t } = useTranslation();
  const [isMeSelected, setIsMeSelected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDetail, setIsSubmitDetail] = useState(false);
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState<any[]>([]);
  const ageRef = React.useRef<any>("");
  const phoneRef = React.useRef<any>("");
  const {orderDetails, setOrderDetails, userProfile } = UseClientUserContext()
  const otherReasons = React.useRef<any>('')
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState("");
  


  const onChangeAge = (value: string) => ageRef.current.value = value
  const onChangePhone = (value: string) => phoneRef.current.value = value
  const onSubmitDetail = () => {
    setIsSubmitDetail(true)
  }

  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveButton.indexOf(item.id);

    if (itemIndex !== -1) {
      // The button is already selected, so remove it
      updatedActiveButton.splice(itemIndex, 1);
    } else {
      // The button is not selected, so add it
      updatedActiveButton.push(item.id);
    }
    setActiveButton(updatedActiveButton); // Update the state with the new array
    setSelectedResourceType((prev)=> [...prev, item]);
    
    setOrderDetails?.({...orderDetails, reason: selectedResourceType })
  };
console.log('userProfile?.address',userProfile?.address)
  const reasons = [
    { title: 'Back pain', id: 1 },
    { title: 'Heart pain', id: 2 },
    { title: 'Arrhythmia', id: 3 },
    { title: 'Headache', id: 4 },
    { title: 'Leg pain', id: 5 },
    { title: 'Vomiting', id: 6 },
  ];
  const treatmentsData = [
    { id: 1 ,label: "Visit - 500 NIS" },
    { id: 2,label: "Voltaren shot  - 100 NIS" },
    { id: 3,label: "Clacksen shot  - 100 NIS" },
  ];
  const toggleMe = () => {
    setIsMeSelected(true);
  };

  const [selectedMenu, setSelectedMenu] = useState<{ id: number; label: string }[]>([]);

  const handleItemPress = (item: { id: number; label: string }) => {
    if (selectedMenu.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedMenu(selectedMenu.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      setSelectedMenu([...selectedMenu, item]);
    }

    setOrderDetails({...orderDetails, services: selectedMenu })
  };

  const toggleSomeoneElse = () => {
    setIsMeSelected(false);
  };
  const getReasonsView = () => (
    <>
      <Text title={"Reason"} style={styles.addressText} />
      <View style={styles.buttonContainer}>
        {reasons?.map((item: any, index: number) => (
          <Button
            key={index}
            title={item.title}
            isSmall
            isPrimary={activeButton.includes(item.id)}
            onPress={() => onSelectReasons(item)}
            width={"28%"}
            fontSized={getHeight(fontSize.textM)}
            height={getHeight(dimens.marginL)}
            borderRadius={getWidth(dimens.marginS)}
            lineHeight={dimens.sideMargin + dimens.borderBold}
          />
        ))}
        <Button
          title={"Other"}
          fontSized={getHeight(fontSize.textM)}
          height={getHeight(dimens.marginL)}
          borderRadius={getWidth(dimens.marginS)}
          lineHeight={dimens.sideMargin + dimens.borderBold}
          onPress={() => setIsModalVisible(true)}
        />
        <Text
          title={
            "*We don't do emergency calls. In case of emergency please call 077-773-45-69"
          }
          style={styles.textSmall}
        />
      </View>

      <Modal
        backdropColor={colors.white}
        isVisible={isModalVisible}
        // avoidKeyboard
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          multiline
          numberOfLines={4}
          inputStyle={styles.description}
          isDescription
          defaultValue={otherReasons?.current?.value}
          ref={otherReasons}
          onChangeText={(value:string)=> otherReasons.current.value = value}
          onSubmitDescription={() => {
            setOrderDetails({...orderDetails, Additional_notes: otherReasons?.current?.value })

           }}
        />
      </Modal>
    </>
  );
  const getTreatmentsView = () => (
    <>
      <Text title={"Treatments menu"} style={styles.menuText} />
      <View style={styles.container}>
      {treatmentsData.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => handleItemPress(item)} // Call the function with the item
        >
          <View style={styles.checkBox} />
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
        <Text
          title={"*If the doctor won’t use your shot, you won’t pay for it"}
          style={styles.textSmall}
        />
      </View>
    </>
  );

  const addAddressView = () => {
    return (
      <RNModal
        style={styles.modal}
        backdropOpacity={1}
        backdropColor={colors.white}
        isVisible={isVisible}>
      <View style={styles.addressView}>
        <Input
          placeholder={t("address")}
          type={"fullStreetAddress"}
          inputStyle={[{ minWidth: "82%" }]}
          onClearInputText={() => setOnSearchAddress('')}
          onChangeText={setOnSearchAddress}
          inputValue={onSearchAddress}
          value={onSearchAddress}
          onSubmitEditing={() => setIsVisible(false)}
          autoFocus
        />
        <TextButton
          containerStyle={{ width: "18%", alignItems: "flex-end" }}
          title="Close"
          fontSize={fontSize.textL}
          onPress={() => setIsVisible(false)}
        />
      </View>
      </RNModal>
    );
  };

  return (
    <>

      <Text style={styles.text} title={"For whom is the doctor?"} />
      <View style={styles.button}>
        <Button
          title={"Me"}
          isPrimary={isMeSelected}
          isSmall
          width={"12%"}
          fontSized={fontSize.textL}
          height={getHeight(dimens.marginL + 4)}
          onPress={toggleMe}
        />
        <Button
          title={isSubmitDetail ? `${ageRef?.current?.value}y.o., ${phoneRef?.current?.value}` : "Someone else"}
          isPrimary={!isMeSelected}
          isSmall
          width={"40%"}
          fontSized={fontSize.textL}
          height={getHeight(dimens.marginL + 4)}
          onPress={toggleSomeoneElse}
        />
      </View>
      
      <View
        style={[
          styles.addressContainer,
          { justifyContent: !isMeSelected ? "flex-start" : "center" },
        ]}>
        {isMeSelected &&
          <>
            <Text title={"Address"} style={styles.addressText} />
            <View style={styles.locationContainer}>
              <Image
                source={require("../../../assets/icon/location.png")}
                style={styles.locationIcon}
              />
              <Text
                style={{ flex: 0.80, paddingLeft: getWidth(dimens.sideMargin) }}
                title={userProfile?.address ?? ''}
              />
              <TextButton
                containerStyle={{ flex: 0.1 }}
                title={"Edit"}
                fontSize={getHeight(fontSize.textM)}
                onPress={()=>setIsVisible(true)}
              />
            </View>
          </>
        }
        {!isMeSelected && (
          isSubmitDetail ? (<>
            <Text title={"Address"} style={styles.addressText} />
            <View style={styles.locationContainer}>
              <Image
                source={require("../../../assets/icon/location.png")}
                style={styles.locationIcon}
              />
              <Text
                style={{ flex: 0.84, paddingLeft: getWidth(dimens.sideMargin) }}
                title={userProfile?.address ?? ''}
              />
              <TextButton
                containerStyle={{ flex: 0.1 }}
                title={"Edit"}
                fontSize={getHeight(fontSize.textM)}
              />
            </View>
          </>) : (
          <View style={styles.inputContainer}>
            <TextInput
              ref={ageRef}
              onChangeText={onChangeAge}
              placeholderTextColor={colors.disabledText}
              placeholder="Their age *"
              style={styles.textInput}
              defaultValue={ageRef?.current?.value}
              maxLength={2}
            />
            <TextInput
              ref={phoneRef}
              placeholderTextColor={colors.disabledText}
              placeholder="Their phone number"
              style={styles.textInput}
              onChangeText={onChangePhone}
              defaultValue={phoneRef?.current?.value}
              maxLength={10}
            />
            <TouchableOpacity style={styles.arrowIconContainer} onPress={onSubmitDetail} >
              <Image
                source={require("../../../assets/icon/arrowNext.png")}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>))}
      </View>
      {getReasonsView()}
      {getTreatmentsView()}
      {addAddressView()}
    </>
  );
};

export default OrderFormView;

const styles = StyleSheet.create({
  text: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getWidth(dimens.marginL + 4),
  },
  addressText: {
    fontSize: fontSize.textXl,
    marginBottom: getWidth(dimens.paddingS),
  },
  textSmall: {
    fontSize: getWidth(fontSize.textS),
  },
  checkBox: {
    width: getWidth(dimens.sideMargin + dimens.borderBold),
    height: getHeight(dimens.sideMargin + dimens.borderBold),
    borderRadius: getWidth(dimens.borderThin),
    borderWidth: getWidth(dimens.borderThin),
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  locationContainer: {
    alignItems: "center",
    borderWidth: getWidth(dimens.borderThin),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.disabled,
    flexDirection: "row",
  
    // paddingHorizontal: getWidth(dimens.paddingS),
    paddingVertical: getHeight(dimens.paddingXs + dimens.borderBold),
    //  flex: 0.2,
  },
  innerBox: {
    alignItems: "center",
    gap: getWidth(dimens.marginS),
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 0.37,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: getWidth(dimens.marginS + dimens.borderBold),
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: getWidth(dimens.paddingL),
    alignItems: "center",
  },
  addressContainer: {
    flex: 0.25,
    justifyContent: "center",
    marginTop: getHeight(dimens.paddingXs)
  },
  button: {
    flexDirection: "row",
    gap: getWidth(dimens.marginL),
  },
  container: {
    flex: 0.29,
    gap: getWidth(dimens.sideMargin),
    marginTop: getHeight(dimens.paddingXs),

  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: "contain",
    flex: 0.07,
    marginLeft:getWidth(dimens.marginS)
  },
  menuText: {
    fontSize: getWidth(fontSize.textXl),
  },
  inputContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.primary,
    flex: 1,
    marginTop: getWidth(dimens.marginS),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: "center",
  },
  textInput: {
    borderBottomWidth: getHeight(dimens.borderThin),
    borderBottomColor: colors.disabledText,
    width: getWidth(dimens.imageM + dimens.imageS),
    marginLeft: getWidth(dimens.marginS),
    fontSize: fontSize.textL,
    color: colors.grey,
    paddingBottom: 0,
    paddingTop: getWidth(dimens.sideMargin)

  },
  arrowIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: getWidth(4),
  },
  description: {
    height: getHeight(117),
  },
  modal:{ 
    flex: 1, 
    justifyContent: "flex-start" 
  },
  addressView:{
    flexDirection: "row",
     alignItems: "center",
     marginTop: getHeight(dimens.paddingS),
  }

});
