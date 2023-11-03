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
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { useTranslation } from "react-i18next";
import RNModal from "components/common/Modal";
import OrderFormController from "./OrderFormController";
import { Reason, TreatmentMenu, treatment } from "libs/types/ProvierTypes";
import { getLocalData } from "libs/datastorage/useLocalStorage";
import { OrderDetail } from "libs/types/UserType";

const OrderFormView = ({
  treatmentReason,
  setOrder,
  order,
}: {
  treatmentReason?: treatment[];
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  order: OrderDetail;
}) => {
  const uniqueReasonIds: number[] = [];

  // Loop through the data array
  order?.reason.forEach((item) => {
    if (!uniqueReasonIds.includes(item.reason_id)) {
      uniqueReasonIds.push(item.reason_id);
    }
  });

  const uniqueMenuIds: number[] = [];

  // Loop through the data array
  order?.services?.forEach((item) => {
    if (!uniqueMenuIds.includes(item.menu_id)) {
      uniqueMenuIds.push(item.menu_id);
    }
  });
  const { t } = useTranslation();
  const [isMeSelected, setIsMeSelected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDetail, setIsSubmitDetail] = useState(false);
  const [activeButton, setActiveButton] = useState<number[]>(uniqueReasonIds);
  const [activeCheckbox, setActiveCheckbox] = useState<number[]>(uniqueMenuIds);
  const [selectedResourceType, setSelectedResourceType] = useState<any[]>(
    order?.reason
  );
  const [selectedMenu, setSelectedMenu] = useState<TreatmentMenu[]>(
    order?.services
  );
  const ageRef = React.useRef<any>("");
  const phoneRef = React.useRef<any>("");
  const otherReasons = React.useRef<any>("");
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState("");
  const [isCheckedStates, setIsCheckedStates] = useState(
    new Array(treatmentReason?.treatmentMenu?.length).fill(false)
  );

  console.log("isCheckedStates", isCheckedStates);

  function calculateBirthDate(age) {
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const birthDate = new Date(birthYear, 0, 1, 0, 0, 0, 0);
    birthDate.setMinutes(birthDate.getMinutes() + 330);
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = birthDate.toLocaleString("en-US", options);
    return formattedDate;
  }

  function calculateAgeFromDate(dateString) {
    const parts = dateString.split(" ");
    if (parts.length < 4) {
      return NaN;
    }
    const year = parseInt(parts[3], 10);
    const currentDate = new Date();
    if (isNaN(year)) {
      return NaN;
    }
    const age = currentDate.getFullYear() - year;
    return age;
  }

  const onChangeAge = (value: string) => (ageRef.current.value = value);
  const onChangePhone = (value: string) => (phoneRef.current.value = value);
  const onSubmitDetail = () => {
    setOrder({
      ...order,
      patient_type: {
        type: "other",
        age: String(calculateBirthDate(ageRef.current.value)),
      },
      phonenumber: phoneRef?.current?.value,
    });
    setIsSubmitDetail(true);
  };

  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveButton.indexOf(item.reason_id);

    if (itemIndex !== -1) {
      updatedActiveButton.splice(itemIndex, 1);
    } else {
      updatedActiveButton.push(item.reason_id);
    }
    setActiveButton(updatedActiveButton);
    setSelectedResourceType((prev) => [...prev, item]);
    setOrder({
      ...order,
      reason: [...selectedResourceType, item],
    });
  };

  const toggleMe = (item) => {
    if (item === "me") setIsMeSelected(true);
    else setIsMeSelected(false);
    setOrder({
      ...order,
      patient_type: item,
    });
  };

  console.log("selectedMenu", selectedMenu);
  const handleItemPress = (item: TreatmentMenu, index: number) => {
    const updatedActiveCheckbox = [...activeCheckbox]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveCheckbox.indexOf(item?.menu_id);
    let updatedSelectedMenu;
    if (itemIndex !== -1) {
      updatedActiveCheckbox.splice(itemIndex, 1);
    } else {
      updatedActiveCheckbox.push(item.menu_id);
    }
    setActiveCheckbox(updatedActiveCheckbox);
    if (
      selectedMenu.find((selectedItem) => selectedItem.menu_id === item.menu_id)
    ) {
      updatedSelectedMenu = selectedMenu.filter(
        (selectedItem) => selectedItem.menu_id !== item.menu_id
      );
    } else {
      updatedSelectedMenu = [...selectedMenu, item];
    }
    setSelectedMenu(updatedSelectedMenu);
    setOrder({
      ...order,
      services: [...selectedMenu, item],
    });
  };

  const getReasonsView = () => (
    <>
      <Text title={"Reason"} style={styles.addressText} />
      <View style={styles.buttonContainer}>
        {treatmentReason?.reason?.length ? (
          treatmentReason?.reason.map((item: Reason, index: number) => (
            <Button
              key={index}
              title={item.name?.en}
              isSmall
              isPrimary={activeButton.includes(item?.reason_id)}
              onPress={() => onSelectReasons(item)}
              width={"28%"}
              fontSized={getHeight(fontSize?.textM)}
              height={getHeight(dimens?.marginL)}
              borderRadius={getWidth(dimens?.marginS)}
              lineHeight={dimens?.sideMargin + dimens?.borderBold}
            />
          ))
        ) : (
          <ActivityIndicator
            size={"large"}
            color={colors?.primary}
            style={{ alignItems: "center", flex: 1 }}
          />
        )}
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
        onBackdropPress={() => setIsModalVisible(false)}>
        <Input
          placeholder={"Describe where is the entrance etc."}
          inputValue={""}
          multiline
          numberOfLines={4}
          inputStyle={styles.description}
          isDescription
          defaultValue={otherReasons?.current?.value}
          ref={otherReasons}
          onChangeText={(value: string) => (otherReasons.current.value = value)}
          onSubmitDescription={() => {
            setOrder({
              ...order,
              Additional_notes: otherReasons?.current?.value,
            });
          }}
        />
      </Modal>
    </>
  );
  const getTreatmentsView = () => (
    <>
      <Text title={"Treatments menu"} style={styles.menuText} />
      <View style={styles.container}>
        {treatmentReason?.treatmentMenu?.length > 0 ? (
          treatmentReason?.treatmentMenu?.map(
            (item: TreatmentMenu, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxContainer}
                onPress={() => handleItemPress(item, index)} // Call the function with the item
              >
                <View style={styles.checkBox}>
                  {activeCheckbox.includes(item?.menu_id) && (
                    <Image
                      source={require("assets/icon/check.png")}
                      style={styles.image}
                    />
                  )}
                </View>
                <Text>{item.name.en}</Text>
              </TouchableOpacity>
            )
          )
        ) : (
          <ActivityIndicator
            size={"large"}
            color={colors?.primary}
            style={{ alignItems: "center", flex: 1 }}
          />
        )}
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
            onClearInputText={() => setOnSearchAddress("")}
            onChangeText={setOnSearchAddress}
            inputValue={order.address}
            defaultValue={order.address}
            onSubmitEditing={() => {
              setOrder({
                ...order,
                address: onSearchAddress,
              });
              setIsVisible(false);
            }}
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
      <KeyboardAvoidingView
        behavior={"height"}
        keyboardVerticalOffset={-200}
        style={{ flex: 0.96 }}>
        <Text style={styles.text} title={"For whom is the doctor?"} />
        <View style={styles.button}>
          <Button
            title={"Me"}
            isPrimary={isMeSelected}
            isSmall
            width={"12%"}
            fontSized={fontSize.textL}
            height={getHeight(dimens.marginL + 4)}
            onPress={() => toggleMe("me")}
          />
          <Button
            title={
              isSubmitDetail
                ? `${calculateAgeFromDate(order?.patient_type?.age)}y.o., ${
                    order?.phonenumber
                  }`
                : "Someone else"
            }
            isPrimary={!isMeSelected}
            isSmall
            width={"40%"}
            fontSized={fontSize.textL}
            height={getHeight(dimens.marginL + 4)}
            onPress={() => toggleMe("other")}
          />
        </View>

        <View
          style={[
            styles.addressContainer,
            { justifyContent: !isMeSelected ? "center" : "center" },
          ]}>
          {isMeSelected && (
            <>
              <Text title={"Address"} style={styles.addressText} />
              <View style={{ ...styles.locationContainer }}>
                <Image
                  source={require("../../../assets/icon/location.png")}
                  style={styles.locationIcon}
                />
                <Text
                  style={styles.streetAddress}
                  numberOfLines={1}
                  title={order?.address ?? ""}
                />
                <TextButton
                  containerStyle={{ flex: 0.1 }}
                  title={"Edit"}
                  fontSize={getHeight(fontSize.textM)}
                  onPress={() => setIsVisible(true)}
                />
              </View>
            </>
          )}
          {!isMeSelected &&
            (isSubmitDetail ? (
              <>
                <Text title={"Address"} style={styles.addressText} />
                <View style={{ ...styles.locationContainer, borderRadius: 1 }}>
                  <Image
                    source={require("../../../assets/icon/location.png")}
                    style={styles.locationIcon}
                  />
                  <Text
                    style={styles.street}
                    numberOfLines={1}
                    title={order?.address ?? ""}
                  />
                  <TextButton
                    containerStyle={{ flex: 0.15 }}
                    title={"Edit"}
                    fontSize={getHeight(fontSize.textM)}
                  />
                </View>
              </>
            ) : (
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
                <TouchableOpacity
                  style={styles.arrowIconContainer}
                  onPress={onSubmitDetail}>
                  <Image
                    source={require("../../../assets/icon/arrowNext.png")}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </View>
        {getReasonsView()}
        {getTreatmentsView()}
        {addAddressView()}
      </KeyboardAvoidingView>
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
    flex: 0.38,
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
    marginTop: getHeight(dimens.paddingXs),
  },
  button: {
    flexDirection: "row",
    gap: getWidth(dimens.marginL),
  },
  container: {
    flex: 0.31,
    gap: getWidth(dimens.sideMargin),
    marginTop: getHeight(dimens.marginS),
  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: "contain",
    flex: 0.07,
    marginLeft: getWidth(dimens.marginS),
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
    paddingTop: getWidth(dimens.sideMargin),
  },
  arrowIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: getWidth(dimens.borderBold + dimens.borderBold),
  },
  description: {
    height: getHeight(117),
  },
  modal: {
    flex: 1,
    justifyContent: "flex-start",
  },
  addressView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(dimens.paddingS),
  },
  image: {
    width: getWidth(12),
    height: getHeight(12),
  },
  streetAddress: {
    flex: 0.8,
    paddingLeft: getWidth(dimens.sideMargin),
    fontSize: getWidth(fontSize.textM),
  },
  list: {
    fontSize: getWidth(fontSize.textM),
  },
  street: {
    flex: 0.84,
    paddingLeft: getWidth(dimens.sideMargin),
    fontSize: getWidth(fontSize.textM),
  },
});
