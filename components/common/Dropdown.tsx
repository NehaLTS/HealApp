import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";
import Text from "./Text";

const Dropdown = ({
  data,
  labelField,
  valueField,
  onChange,
  errorMessage,
  ...props
}: {
  data: [];
  labelField: string;
  valueField: string;
  onChange: () => void;
  errorMessage: string;
} & any) => {
  return (
    <>
      <RNDropdown
        data={data}
        labelField={labelField}
        valueField={valueField}
        onChange={onChange}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={{ marginRight: 10, height: 25, width: 25, marginTop: 4 }}
        iconColor={colors.black}
        {...props}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(50),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.marginM + dimens.paddingXs),
    paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),
  },
  box: {
    borderWidth: getHeight(dimens.borderBold),
    borderRadius: getHeight(dimens.marginS),
    backgroundColor: colors.offWhite,
    height: getHeight(dimens.imageS),
    borderColor: colors.primary,
    marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
  },
  placeholderStyle: {
    fontSize: fontSize.textL,
    color: colors.black,
  },
  selectedTextStyle: {
    fontSize: getWidth(fontSize.textL),
    color: colors.black,
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
    fontSize: getWidth(fontSize.textS),
  },
});
