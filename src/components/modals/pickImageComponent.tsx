import React from "react";
import { Modal, StyleSheet, Text } from "react-native";

export default function pickImageComponent({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: any;
}) {
  return (
    <Modal visible={isVisible} onRequestClose={() => setIsVisible(false)}>
      <Text>pickImageComponent</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({});
