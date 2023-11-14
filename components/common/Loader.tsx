import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import RNModal from './Modal';

const Loader = () => {
  return (
    <RNModal
      isVisible
      backdropOpacity={0.2}
      animationIn={'fadeIn'}
      animationInTiming={5}
    >
      <ActivityIndicator style={styles.loading} size={'large'} />
    </RNModal>
  );
};
export default Loader;
const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
  },
});
