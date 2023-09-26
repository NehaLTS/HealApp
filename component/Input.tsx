import React from 'react';
import { Image, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { lightColors } from '../designToken/colors';
import { fontSize } from '../designToken/fontSizes';

const Input = ({ placeholder, type, onShowPasward, ...props }: { placeholder: string, type?: any, onShowPasward?: () => void } & TextInputProps) => {

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 1)"
        textContentType={type ?? 'name'}
        {...props}
      />
      {type !== 'password' &&
        <TouchableOpacity onPress={onShowPasward}>
          <Image
            source={require('../designToken/svg/show.png')}
            style={styles.showImage}
          />
        </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: lightColors.primary,
    borderRadius: 10,
    flexDirection:'row',
    height: 48,
  },
  input: {
    fontSize: fontSize.textLg,
    padding: 10,
    flex:1
  },
  showImage: {
    width: 30,
    height: 30,
  },

});

export default Input;
