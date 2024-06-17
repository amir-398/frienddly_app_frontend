import logo from "@/assets/logo/logo.png";
import FONTS from "@/constants/FONTS";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
export default function HeaderComponent({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "20%",
    marginBottom: 20,
  },
  logoContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  logo: {
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.poppinsMedium,
    color: "#000",
    marginTop: -25,
    textAlign: "center",
  },
});
