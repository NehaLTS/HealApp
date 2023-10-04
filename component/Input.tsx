import React from 'react';
import { Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { colors } from '../designToken/colors';
import { fontSize } from '../designToken/fontSizes';
import { getHeight, getWidth } from '../libs/StyleHelper';
import show from '../designToken/svg/show.png'
import { dimens } from '../designToken/dimens';
const Input = ({ placeholder, type, onShowPassword, ...props }: { placeholder: string, type?: any, onShowPassword?: () => void } & TextInputProps) => {

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 1)"
        textContentType={type ?? 'name'}
        secureTextEntry={type === 'password'}
        {...props}
      />
      {type === 'password' &&
        <TouchableOpacity onPress={onShowPassword}>
          <Image
            source={show}
            style={styles.showImage}
          />
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderWidth: getWidth(dimens.borderBold),
    borderColor: colors.primary,
    borderRadius: getWidth(dimens.marginS),
    flexDirection: 'row',
    height: getHeight(dimens.imageS),
  },
  input: {
    fontSize: fontSize.textLg,
    padding: dimens.paddingXs,
    flex: 1,
    color: colors.black
  },
  showImage: {
    width: getWidth(dimens.paddingL+dimens.borderThin),
    height: getHeight(dimens.paddingL+dimens.borderThin),
    borderWidth: getWidth(dimens.borderBold),
    right: dimens.paddingS,
  },

});

export default Input;
