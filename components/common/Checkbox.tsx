import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { colors } from 'designToken/colors';

const Checkbox = ({
  isWhite,
  isChecked,
}: {
  isWhite?: boolean;
  isChecked?: boolean;
}) => {
  const [activeCheckbox, setActiveCheckbox] = React.useState(
    isChecked ?? false,
  );
  return (
    <TouchableOpacity
      style={{ ...styles.checkboxContainer }}
      onPress={() => setActiveCheckbox(!activeCheckbox)}
    >
      <View
        style={[
          styles.checkBox,
          isWhite && {
            width: getHeight(27),
            height: getHeight(27),
            borderColor: colors.white,
          },
        ]}
      >
        {activeCheckbox && (
          <Image
            source={
              isWhite
                ? require('assets/icon/checkWhite.png')
                : require('assets/icon/check.png')
            }
            style={styles.image}
          />
        )}
      </View>
      {!isWhite && (
        <Text style={{ fontSize: getHeight(fontSize.textM + 1) }}>text</Text>
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    gap: getWidth(dimens.marginM),
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    width: getWidth(dimens.paddingS),
    height: getHeight(dimens.paddingS),
    resizeMode: 'contain',
  },
  checkBox: {
    width: getHeight(dimens.sideMargin + dimens.borderBold),
    height: getHeight(dimens.sideMargin + dimens.borderBold),
    borderRadius: getHeight(dimens.borderThin),
    borderWidth: getWidth(dimens.borderThin),
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
