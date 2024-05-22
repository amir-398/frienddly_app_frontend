import FONTS from "@/constants/FONTS";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
}) {
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
