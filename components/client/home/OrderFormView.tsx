
import Button from "components/common/Button";
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
  View
} from "react-native";

const OrderFormView = () => {
  const [isMeSelected, setIsMeSelected] = useState(true);
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState();
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
    setSelectedResourceType(item);
    setActiveButton(updatedActiveButton); // Update the state with the new array
  };
  const reasons = [
    { title: 'Back pain', id: 1 },
    { title: 'Heart pain', id: 2 },
    { title: 'Arrhythmia', id: 3 },
    { title: 'Headache', id: 4 },
    { title: 'Leg pain', id: 5 },
    { title: 'Vomiting', id: 6 },
  ];
  const treatmentsData = [
    { label: "Visit - 500 NIS" },
    { label: "Voltaren shot  - 100 NIS" },
    { label: "Clacksen shot  - 100 NIS" },
  ];
  const toggleMe = () => {
    setIsMeSelected(true);
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
            lineHeight={dimens.sideMargin+dimens.borderBold}
          />
        ))}
 {/* {reasons?.map((item: any, index: number) => (
        <Button
          key={index}
          isPrimary={activeButton.includes(item.id)}
          onPress={() => onSelectReasons(item)}
          title={item.title}
          isSmall
        />
      ))} */}
        <Button
          title={"Other"}
          fontSized={getHeight(fontSize.textM)}
          height={getHeight(dimens.marginL)}
          borderRadius={getWidth(dimens.marginS)}
          lineHeight={dimens.sideMargin+dimens.borderBold}
        />
        <Text
          title={
            "*We don't do emergency calls. In case of emergency please call 077-773-45-69"
          }
          style={styles.textSmall}
        />
      </View>
    </>
  );
  const getTreatmentsView = () => (
    <>
      <Text title={"Treatments menu"} style={styles.menuText} />
      <View style={styles.container}>
        {treatmentsData.map((item, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <View style={styles.checkBox}></View>
            <Text title={item.label} />
          </View>
        ))}
        <Text
          title={"*If the doctor won’t use your shot, you won’t pay for it"}
          style={styles.textSmall}
        />
      </View>
    </>
  );

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
          height={getHeight(dimens.marginL+4)}
          onPress={toggleMe}
        />
        <Button
          title={"Someone else"}
          isPrimary={!isMeSelected}
          isSmall
          width={"40%"}
          fontSized={fontSize.textL}
          height={getHeight(dimens.marginL+4)}
          onPress={toggleSomeoneElse}
        />
      </View>
      <View
        style={[
          styles.addressContainer,
          { justifyContent: !isMeSelected ? "flex-start" : "center" },
        ]}>
        {isMeSelected ? (
          <>
            <Text title={"Address"} style={styles.addressText} />
            <View style={styles.locationContainer}>
              <Image
                source={require("../../../assets/icon/location.png")}
                style={styles.locationIcon}
              />
              <Text
                style={{ flex: 0.84, paddingLeft: getWidth(dimens.sideMargin) }}
                title={"Ramban st. 2, Haifa"}
              />
              <TextButton
                containerStyle={{ flex: 0.1 }}
                title={"Edit"}
                fontSize={getHeight(fontSize.textM)}
              />
            </View>
          </>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput placeholder="Their age *" style={styles.textInput} />
            <TextInput
              placeholder="Their phone number"
              style={styles.textInput}
            />
            <View style={styles.arrowIconContainer}>
              <Image
                source={require("../../../assets/icon/arrowNext.png")}
                style={styles.arrowIcon}
              />
            </View>
          </View>
        )}
      </View>
      {getReasonsView()}
      {getTreatmentsView()}
    </>
  );
};

export default OrderFormView;

const styles = StyleSheet.create({
  text: {
    fontSize: getWidth(fontSize.textXl),
    marginBottom: getWidth(dimens.paddingS),
    marginTop: getHeight(dimens.marginL+4),
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
    paddingHorizontal: getWidth(dimens.paddingS),
    paddingVertical: getHeight(dimens.paddingXs+dimens.borderBold),
    // flex: 0.2,
  },
  innerBox: {
    alignItems: "center",
    gap: getWidth(dimens.marginS),
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 0.36,
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
    marginTop:getHeight(dimens.paddingXs)
  },
  button: {
    flexDirection: "row",
    gap: getWidth(dimens.marginL),
  },
  container: {
    flex: 0.28,
    gap: getWidth(dimens.sideMargin),
    marginTop: getHeight(dimens.paddingXs),
 
  },
  locationIcon: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.marginM),
    resizeMode: "contain",
    flex: 0.06,
  },
  menuText: {
    fontSize: getWidth(fontSize.textXl),
  },
  inputContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    borderColor: colors.primary,
    flex: 1,
    marginTop: getHeight(dimens.marginS),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: "center",
  },
  textInput: {
    borderBottomWidth: getHeight(dimens.borderThin),
    borderBottomColor: colors.black,
    width: getWidth(dimens.imageM + dimens.imageS),
    marginLeft: getWidth(dimens.marginS),
    fontSize: fontSize.textL,
    color: colors.grey,
    
  },
  arrowIconContainer: {
    alignItems: "flex-end",
    bottom: getHeight(dimens.marginL),
    right: getHeight(dimens.marginS),
  },
});
