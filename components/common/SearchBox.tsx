import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { forwardRef } from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

const SearchBox = forwardRef(
  (
    {
      isTouchStart,
      ...props
    }: {
      isTouchStart?: boolean;
    } & TextInputProps,
    ref,
  ) => {
    return (
      <View
        style={[
          styles.inputContainer,
          {
            marginBottom: !isTouchStart
              ? getHeight(dimens.marginM)
              : getHeight(dimens.marginL),
          },
        ]}
      >
        {isTouchStart && (
          <Image
            source={require('../../assets/icon/searchIcon.png')}
            style={styles.searchIcon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.black}
          ref={ref as React.LegacyRef<TextInput>}
          {...props}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderWidth: getWidth(dimens.borderThin),
    borderRadius: getHeight(dimens.marginS),
    borderColor: colors.primary,
    flexDirection: 'row',
    marginVertical: getHeight(dimens.marginL),
    zIndex: 1,
    marginHorizontal: getWidth(dimens.marginM),
  },
  input: {
    fontSize: getHeight(fontSize.textM),
    color: colors.black,
    flex: 1,
    alignSelf: 'flex-end',
    borderRadius: getHeight(dimens.marginS),
    marginLeft: getHeight(dimens.marginS),
    fontFamily: fontFamily.regular,
    height: getHeight(36),
    paddingVertical: getWidth(dimens.paddingXs),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  searchIcon: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    marginLeft: getHeight(dimens.marginS),
    marginRight: getHeight(dimens.paddingXs - 2),
    resizeMode: 'contain',
  },
  removeImage: {
    height: getHeight(20),
    width: getHeight(20),
    resizeMode: 'center',
  },
});

export default SearchBox;
