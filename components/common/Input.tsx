import React, { forwardRef, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  DimensionValue,
  I18nManager,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { fontFamily } from 'designToken/fontFamily';

const Input = forwardRef(
  (
    {
      placeholder,
      type,
      inputStyle,
      errorMessage,
      containerWidth,
      inputValue,
      onClearInputText,
      onPressCalender,
      isToHideCross,
      isDescription,
      onSubmitDescription,
      inputPlaceholder,
      ...props
    }: {
      placeholder?: string;
      type?:
        | 'creditCardNumber'
        | 'emailAddress'
        | 'fullStreetAddress'
        | 'name'
        | 'nameSuffix'
        | 'telephoneNumber'
        | 'password'
        | 'numeric'
        | 'dateOfBirth';
      inputStyle?: StyleProp<TextStyle>;
      errorMessage?: string;
      containerWidth?: DimensionValue;
      inputValue?: string;
      isToHideCross?: boolean;
      onClearInputText?: () => void;
      onPressCalender?: () => void;
      onSubmitDescription?: () => void;
      isDescription?: boolean;
      inputPlaceholder?: string;
    } & TextInputProps,
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(
      type === 'password' ? true : false,
    );
    const moveText = useRef(new Animated.Value(inputValue ? 1 : 0)).current;
    const fontSizeAnim = useRef(
      new Animated.Value(
        inputValue
          ? getWidth(fontSize.textS)
          : placeholder?.includes('License')
          ? getWidth(fontSize.textM)
          : getWidth(fontSize.textL - 1),
      ),
    ).current;

    const onFocusHandler = () => moveTextTop();
    const onBlurHandler = () => moveTextBottom();
    const moveTextTop = () => {
      Animated.parallel([
        Animated.timing(moveText, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fontSizeAnim, {
          toValue: getWidth(fontSize.textS),
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    };
    const moveTextBottom = () => {
      if (inputValue === '') {
        Animated.parallel([
          Animated.timing(moveText, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(fontSizeAnim, {
            toValue: getWidth(fontSize.textL),
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      }
    };

    const translateY = moveText.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    const labelStyle = {
      transform: [
        {
          translateY: translateY,
        },
      ],
    };

    const fontSizeStyle = { fontSize: fontSizeAnim };
    return (
      <View>
        <View
          style={[
            styles.inputContainer,
            inputStyle,
            { borderColor: errorMessage ? colors.invalid : colors.primary },
          ]}
        >
          {!inputPlaceholder?.length && (
            <Animated.Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.label, labelStyle, fontSizeStyle]}
            >
              {placeholder}
            </Animated.Text>
          )}
          {isDescription && (
            <TouchableOpacity
              onPress={onSubmitDescription}
              style={styles.arrowIconContainer}
            >
              <Image
                source={require('assets/icon/arrowNext.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.black}
            textContentType={type ?? 'password'}
            secureTextEntry={showPassword}
            placeholder={inputPlaceholder}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            ref={ref as React.LegacyRef<TextInput>}
            editable
            {...props}
          />
          {!errorMessage && type === 'password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={require('assets/icon/eyeIcon.png')}
                style={styles.showImage}
              />
            </TouchableOpacity>
          )}
          {errorMessage && type !== ('password' && 'dateOfBirth') && (
            <TouchableOpacity onPress={onClearInputText}>
              <Image
                source={require('../../assets/icon/error.png')}
                style={styles.errorImage}
              />
            </TouchableOpacity>
          )}
          {type === 'dateOfBirth' && (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.birthDate}
              onPress={() => {
                onPressCalender?.();
                onFocusHandler();
              }}
            >
              <Image
                source={require('assets/icon/calender_icon.png')}
                style={styles.datePicker}
              />
            </TouchableOpacity>
          )}
        </View>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    flexDirection: 'row',
    height: getHeight(dimens.imageS),
    backgroundColor: colors.offWhite,
    minWidth: '24%',
  },
  input: {
    fontSize: fontSize.textL,
    marginLeft: getHeight(dimens.marginS),
    color: colors.black,
    flex: 1,
    textAlignVertical: 'top',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  showImage: {
    width: getWidth(dimens.marginM + dimens.borderThin),
    height: getHeight(dimens.sideMargin),
    marginRight: getHeight(dimens.sideMargin),
    resizeMode: 'contain',
  },
  datePicker: {
    width: getWidth(30),
    height: getHeight(30),
    marginRight: getHeight(dimens.paddingXs),
    resizeMode: 'contain',
  },
  errorMessage: {
    color: colors.invalid,
    paddingTop: getHeight(dimens.paddingXs),
    fontSize: getWidth(fontSize.textS),
    textAlign: 'left',
  },
  label: {
    position: 'absolute',
    top: getHeight(dimens.marginS + 1),
    left: getHeight(dimens.paddingXs + dimens.borderThin),
    backgroundColor: colors.offWhite,
    color: colors.black,
    paddingHorizontal: getHeight(dimens.paddingXs + dimens.borderBold),
    fontFamily: fontFamily.regular,
    fontSize: getHeight(fontSize.textL),
    maxWidth: '90%',
  },
  errorImage: {
    width: getWidth(dimens.sideMargin),
    height: getHeight(dimens.sideMargin),
    marginRight: getHeight(dimens.marginS),
    resizeMode: 'contain',
  },
  birthDate: { alignItems: 'flex-end', position: 'absolute', width: '100%' },
  arrowIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,
    padding: getHeight(4),
  },
  arrowIcon: {
    height: getHeight(dimens.marginL + dimens.paddingXs),
    width: getWidth(dimens.marginL + dimens.paddingXs),
    resizeMode: 'center',
  },
});

export default Input;
