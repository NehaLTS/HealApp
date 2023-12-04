import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal, { ModalProps } from 'react-native-modal/dist/modal';
const RNModal = ({
  children,
  ...props
}: { children?: React.ReactNode } & Partial<ModalProps>) => {
  return (
    <Modal
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      animationInTiming={800}
      animationOutTiming={800}
      {...props}
    >
      {children}
    </Modal>
  );
};
export default RNModal;
