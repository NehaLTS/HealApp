import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../designToken/colors";
import { dimens } from "../../../../designToken/dimens";
import { fontSize } from "../../../../designToken/fontSizes";
import { getHeight, getWidth } from "../../../../libs/StyleHelper";
import Input from "../../../common/Input";
import SelectImage from "../../../common/SelectImage";
import BasicInformationController from "../controllers/BasicInformationController";
import Text from "components/common/Text";
import { UseUserContextProvider } from "contexts/useUserContextProvider";
import { useTranslation } from "react-i18next";
import ProviderBankDetailController from "../controllers/ProviderBankDetailController";
const ProviderBankDetail = () => {
  const {  isShowModal, setIsShowModal } =
    BasicInformationController({});
    const { t } = useTranslation();
    const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const {
    bankNameRef,
    registrationNumberRef,
    branchRef,
    accountRef,
    onBlurRegistrationNumber,
    onChangeRegistrationNumber,
    onBlurBankName,
    onChangeBankName,
    onBlurBranchType,
    onChangeBranchType,
    onBlurAccount,
    onChangeAccount,
    registrationError,
    bankNameError,
    branchError,
    accountError
  } = ProviderBankDetailController();


  const getImageUrl = (url: string) =>
    setUserDataProvider({ ...userDataProvider, profile_picture: url });

  return (
    <>
      <Input
        placeholder={t("Business registration number")}
        keyboardType="numeric"
        type="creditCardNumber"
        onBlur={onBlurRegistrationNumber}
        onChangeText={onChangeRegistrationNumber}
        ref={registrationNumberRef}
        defaultValue={userDataProvider.registration}
        inputValue={userDataProvider?.registration ?? ""}
        errorMessage={registrationError}
      />
      <View style={styles.container}>
        <Input
          placeholder={t("Bank")}
          inputStyle={styles.inputBank}
          type={"nameSuffix"}
          onBlur={onBlurBankName}
          onChangeText={onChangeBankName}
          ref={bankNameRef}
          defaultValue={userDataProvider.bank_name}
          inputValue={userDataProvider?.bank_name ?? ""}
          errorMessage={bankNameError}
        />
        <Input
          placeholder={t("Branch")}
          type={"nameSuffix"}
          inputStyle={styles.inputBranch}
          onBlur={onBlurBranchType}
          onChangeText={onChangeBranchType}
          ref={branchRef}
          defaultValue={userDataProvider.branch}
          inputValue={userDataProvider?.branch ?? ""}
          errorMessage={branchError}
        />
      </View>
      <Input
        placeholder={t("Bank account")}
        keyboardType="numeric"
        inputStyle={styles.input}
        type={"nameSuffix"}
        onBlur={onBlurAccount}
        onChangeText={onChangeAccount}
        ref={accountRef}
        defaultValue={userDataProvider.account}
        inputValue={userDataProvider?.account ?? ""}
        errorMessage={accountError}
      />
    
      <View style={styles.iconContainer}>
        <Text style={styles.text}>{t("Add a profile photo")}</Text>
        <TouchableOpacity
          activeOpacity={userDataProvider?.profile_picture ? 1 : 0.5}
          onPress={() => !userDataProvider?.profile_picture && setIsShowModal(true)}>
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
export default ProviderBankDetail;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
  },
  inputBank: {
    minWidth: "35%"
  },
  inputBranch: {
    minWidth: "60%"
  },
  input: {
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
    width: getWidth(dimens.imageS + dimens.paddingS + 2),
    resizeMode: "cover",
    borderRadius: getHeight(dimens.paddingS),
  },
  text: {
    fontSize: fontSize.textL,
    color: colors.black,
    marginTop: getHeight(dimens.marginS)
  },
});







