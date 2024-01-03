import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import Text from './Text';
import { colors } from 'designToken/colors';
import { fontFamily } from 'designToken/fontFamily';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const showToast = (title = '', message: string, toastType: string) => {
    setType(toastType);
    setMessage(message);
    setIsVisible(true);
    setTitle(title);
    setTimeout(() => {
      hideToast();
    }, 4000);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  const renderToast = () => {
    return (
      <Modal
        isVisible={isVisible}
        backdropColor="transparent"
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        onBackdropPress={() => setIsVisible(false)}
      >
        <View
          style={{
            borderRadius: getHeight(dimens.paddingXs),
            backgroundColor:
              type === 'error'
                ? '#C74244'
                : type === 'warning'
                ? '#DF944A'
                : '#3EAAC5',
            width: '100%',
            justifyContent: 'center',
            paddingVertical: getHeight(dimens.marginS),
            paddingHorizontal: getHeight(dimens.sideMargin),
            gap: getHeight(4),
            minHeight: getHeight(50),
          }}
        >
          {title !== '' && (
            <Text
              style={{
                color: colors.white,
                fontSize:
                  Dimensions.get('window').width > 500
                    ? getHeight(fontSize.textM)
                    : getHeight(fontSize.textS),
                fontFamily: fontFamily.bold,
              }}
            >
              {title}
            </Text>
          )}
          <Text
            style={{
              color: colors.white,
              fontSize:
                Dimensions.get('window').width > 500
                  ? getHeight(fontSize.textM)
                  : getHeight(fontSize.textS),
              fontFamily: fontFamily.medium,
            }}
          >
            {message}
          </Text>
        </View>
      </Modal>
    );
  };

  return {
    showToast,
    hideToast,
    renderToast,
  };
};

export default useToast;
