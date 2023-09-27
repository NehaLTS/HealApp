import React from 'react';
import { Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { colors } from '../designToken/colors';
import { fontSize } from '../designToken/fontSizes';
import { getHeight, getWidth } from '../libs/StyleHelper';
import showSvg from '../designToken/svg/show.svg'
import { SvgUri } from 'react-native-svg';

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
          <SvgUri
            width={40}
            height={40}
            uri={showSvg}
         
          />
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderWidth: getWidth(2),
    borderColor: colors.primary,
    borderRadius: getWidth(10),
    flexDirection:'row',
    height: getHeight(48),
  },
  input: {
    fontSize: fontSize.textLg,
    padding: 10,
    flex:1,
    color:"black"
  },


});

export default Input;
