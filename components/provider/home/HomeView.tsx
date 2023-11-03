import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Header from 'components/common/Header';
import { useNavigation } from '@react-navigation/native';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';

const HomeView = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Provider Screen" />,
    });
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
      }}
    >
      <Text style={{ color: 'black', fontSize: fontSize.heading }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({});
