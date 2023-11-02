import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal, { ModalProps } from 'react-native-modal/dist/modal';

const RNModal = ({
  children,
  ...props
}: { children?: React.ReactNode } & Partial<ModalProps>) => {
  return <Modal {...props}>{children}</Modal>;
};

export default RNModal;

const styles = StyleSheet.create({});
