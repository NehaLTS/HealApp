import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import SelectImage from "../../../common/SelectImage";
import BasicInformationController from "../controllers/BasicInformationController";
import { UseUserContextProvider } from "contexts/useUserContextProvider";
import { t } from "i18next";
import Text from "components/common/Text";
const ProviderPayment = () => {
  
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
    BasicInformationController({});
    const [registrationError, setRegistrationError] = useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [branchError, setBranchError] = useState("");
    const [accountError, setAccountError] = useState("");

console.log('userDataProvider',userDataProvider)

    const registrationNumberRef = React.useRef<any>("");
    const bankNameRef = React.useRef<any>("");
    const branchRef = React.useRef<any>("");
    const accountRef = React.useRef<any>("");

    const onBlurRegistrationNumber= () => { validateRegistrationNumber(); setUserDataProvider({ ...userDataProvider, registration: registrationNumberRef.current.value }) }
    const onChangeRegistrationNumber= (value: string) => registrationNumberRef.current.value = value

    const onBlurBankName = () => { validateBankName(); setUserDataProvider({ ...userDataProvider, bank_name: bankNameRef.current.value }) }
    const onChangeBankName = (value: string) => bankNameRef.current.value = value

    const onBlurBranchType = () => { validateBranch(); setUserDataProvider({ ...userDataProvider, branch: branchRef?.current?.value }) }
    const onChangeBranchType = (value: string) => branchRef.current.value = value

    const onBlurAccount = () => { validateAccount(); setUserDataProvider({ ...userDataProvider, account: accountRef?.current?.value }) }
    const onChangeAccount = (value: string) => accountRef.current.value = value

    const getImageUrl = (url: string) =>
    setUserDataProvider({ ...userDataProvider, profile_picture: url });


    const validateRegistrationNumber = () => {
      if (!registrationNumberRef.current.value) {
        setRegistrationError("Registration is required");
      } else {
        setRegistrationError("");
      }
    };
  
    const validateBankName = () => {
      if (!bankNameRef.current.value) {
        setBankNameError("Bank is required");
      } else {
        setBankNameError("");
      }
    };
    const validateBranch = () => {
      if (!bankNameRef.current.value) {
        setBranchError("Branch is required");
      } else {
        setBranchError("");
      }
    };
    const validateAccount = () => {
      if (!bankNameRef.current.value) {
        setAccountError("Bank Account is required");
      } else {
        setAccountError("");
      }
    };


  return (
    <>
      <Input
        placeholder={t("Business registration number")}
        keyboardType="numeric"
        type="creditCardNumber"
        onBlur={onBlurRegistrationNumber}
        onChangeText={onChangeRegistrationNumber}
        ref={registrationNumberRef}
        value={userDataProvider.registration}
        inputValue={userDataProvider?.registration ?? ""}
        errorMessage={registrationError}
      />
      <View style={styles.container}>
        <Input
          placeholder={"Bank"}
          inputStyle={styles.inputBank}
          type={"nameSuffix"}
          onBlur={onBlurBankName}
        onChangeText={onChangeBankName}
        ref={bankNameRef}
        value={userDataProvider.bank_name}
        inputValue={userDataProvider?.bank_name ?? ""}
        errorMessage={bankNameError}
        />
        <Input
          placeholder={"Branch"}
          type={"nameSuffix"}
          inputStyle={styles.inputBranch}
          onBlur={onBlurBranchType}
        onChangeText={onChangeBranchType}
        ref={branchRef}
        value={userDataProvider.branch}
        inputValue={userDataProvider?.branch ?? ""}
        errorMessage={branchError}
        />
      </View>
      <Input
        placeholder={"Bank account"}
        inputStyle={styles.input}
        type="creditCardNumber"
        keyboardType="numeric"
        onBlur={onBlurAccount}
        onChangeText={onChangeAccount}
        ref={accountRef}
        value={userDataProvider.account}
        inputValue={userDataProvider?.account ?? ""}
        errorMessage={accountError}
      />
      {/* <View style={styles.container}>
        <Input
          placeholder={t("Bank")}
          inputStyle={styles.inputBank}
          type={"nameSuffix"}
          inputValue={""}
        />
        <Input
          placeholder={t("Branch")}
          type={"nameSuffix"}
          inputStyle={styles.inputBranch}
          inputValue={""}
        />
      </View>
      <Input
        placeholder={t("Bank account")}
        inputStyle={styles.input}
        type={"nameSuffix"}
        inputValue={""}
      /> */}

      <View style={styles.iconContainer}>
        <Text style={styles.text}>{t("Add a profile photo")}</Text>
        <TouchableOpacity
          activeOpacity={userDataProvider.profile_picture ? 1 : 0.5}
          onPress={() => !userDataProvider.profile_picture && setIsShowModal(true)}>
          <Image
            source={
              userDataProvider.profile_picture
                ? { uri: userDataProvider.profile_picture }
                : require("../../../../assets/icon/editprofile.png")
            }
            style={styles.selectedImage}
          />
        </TouchableOpacity>
        <SelectImage
          isShowModal={isShowModal}
          closeModal={setIsShowModal}
          imageUri={getImageUrl}
        />
      </View>
    </>
  );
};
export default ProviderPayment;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:"space-between",
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
  },
  inputBank: {
    minWidth:"35%"
  },
  inputBranch: {
  minWidth:"60%"
  },
  input:{
    marginTop: getHeight(dimens.sideMargin + dimens.paddingXs),
  },
  iconContainer: {
    flexDirection: "row",
    gap: getHeight(dimens.marginS),
    alignItems: "center",
    marginTop: getHeight(dimens.sideMargin),
  },
  selectedImage: {
    height: getHeight(dimens.imageS + dimens.paddingS),
    width: getWidth(dimens.imageS + dimens.paddingS+2),
    resizeMode: "cover",
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    marginTop:getHeight(dimens.marginS)
  },
});







