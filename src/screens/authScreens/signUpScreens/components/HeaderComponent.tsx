import logo from "@/assets/logo/logo.png";
import FONTS from "@/constants/FONTS";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
export default function HeaderComponent({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "10%",
    marginBottom: 20,
  },
  logo: {
    width: "60%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.poppinsMedium,
    color: "#000",
    marginTop: -25,
  },
});
