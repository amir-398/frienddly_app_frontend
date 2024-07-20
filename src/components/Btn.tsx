import FONTS from "@/constants/FONTS";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
/**
 * A button component for React Native applications.
 *
 * @param {BtnProps} props - The props object.
 * @param {string} props.title - The title of the button, displayed as button text.
 * @param {() => void} props.onPress - The function to call when the button is pressed.
 * @param {object} [props.style] - Optional styles for the button container.
 * @param {object} [props.textStyle] - Optional styles for the button text.
 * @returns {JSX.Element} The button component.
 */

export default function Btn({
  title,
  onPress,
  style,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}): JSX.Element {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    padding: 10,
    borderRadius: 20,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontFamily: FONTS.poppinsMedium,
    lineHeight: 22,
  },
});
